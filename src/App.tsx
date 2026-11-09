import React, { useState, useEffect } from 'react';
import { THEMES } from './data/themes.ts';
import { REAL_LIFE_VOUCHERS } from './data/vouchers.ts';
import { ThemeId, UserProfile, BreakSettings, Voucher, ClaimedVoucher } from './types/index.ts';
import { Header } from './components/Header.tsx';
import { BottomNav, NavTab } from './components/BottomNav.tsx';
import { DashboardView } from './components/DashboardView.tsx';
import { RewardsView } from './components/RewardsView.tsx';
import { PostureGuideView } from './components/PostureGuideView.tsx';
import { ProfileView } from './components/ProfileView.tsx';
import { ThemeModal } from './components/ThemeModal.tsx';
import { ClockTimePicker } from './components/ClockTimePicker.tsx';
import { ActiveBreakModal } from './components/ActiveBreakModal.tsx';
import { LoginPage } from './components/LoginPage.tsx';
import { soundEngine } from './services/soundEngine.ts';
import { haptics } from './services/haptics.ts';

export default function App() {
  // User state with local storage persistence
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('intervalo_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          isAuthenticated: parsed.isAuthenticated ?? false,
        };
      } catch {
        // fallback
      }
    }
    return {
      name: 'Adithya',
      email: 'ai7432@srmist.edu.in',
      role: 'wfh',
      points: 380,
      streakDays: 4,
      totalBreaks: 3,
      totalMinutesRested: 25,
      postureScore: 86,
      activeTheme: 'executive',
      soundEnabled: true,
      claimedVoucherIds: ['sbux-venti-coffee'],
      targetVoucherId: 'hm-aeron-₹2500',
      isAuthenticated: true,
      authProvider: 'google',
    };
  });

  // Theme state - default to executive or user's active theme
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>(() => {
    if (user.activeTheme && THEMES[user.activeTheme]) {
      return user.activeTheme;
    }
    return 'executive';
  });
  const activeTheme = THEMES[currentThemeId] || THEMES.executive || THEMES.doom;

  // Navigation tab
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  // Audio mute & Haptics state
  const [isMuted, setIsMuted] = useState(false);
  const [isHapticsEnabled, setIsHapticsEnabled] = useState(() => haptics.isEnabled());

  // Claimed vouchers list
  const [claimedVouchers, setClaimedVouchers] = useState<ClaimedVoucher[]>(() => {
    const saved = localStorage.getItem('intervalo_vouchers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        ...REAL_LIFE_VOUCHERS[0],
        claimedAt: new Date(Date.now() - 86400000).toISOString(),
        expiresAt: new Date(Date.now() + 29 * 86400000).toISOString(),
        isUsed: false,
      },
    ];
  });

  // Settings
  const [settings, setSettings] = useState<BreakSettings>(() => {
    const saved = localStorage.getItem('intervalo_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      intervalMinutes: 45,
      breakDurationMinutes: 5,
      notifySound: true,
      targetBreaksPerDay: 6,
    };
  });

  // Timer states
  const [timerSecondsRemaining, setTimerSecondsRemaining] = useState<number>(
    settings.intervalMinutes * 60
  );
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [sittingMinutesToday] = useState<number>(85);

  // Modals
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isClockPickerOpen, setIsClockPickerOpen] = useState(false);
  const [isActiveBreakModalOpen, setIsActiveBreakModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('intervalo_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('intervalo_vouchers', JSON.stringify(claimedVouchers));
  }, [claimedVouchers]);

  useEffect(() => {
    localStorage.setItem('intervalo_settings', JSON.stringify(settings));
  }, [settings]);

  // Handle active work timer tick
  useEffect(() => {
    if (!isTimerRunning || isActiveBreakModalOpen || !user.isAuthenticated) return;

    const interval = setInterval(() => {
      setTimerSecondsRemaining((prev) => {
        if (prev <= 1) {
          soundEngine.playThemeSound(currentThemeId);
          setIsActiveBreakModalOpen(true);
          return settings.intervalMinutes * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, isActiveBreakModalOpen, currentThemeId, settings.intervalMinutes, user.isAuthenticated]);

  // Audio mute sync
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  };

  // Haptics vibration sync
  const handleToggleHaptics = () => {
    const nextHaptics = !isHapticsEnabled;
    setIsHapticsEnabled(nextHaptics);
    haptics.setEnabled(nextHaptics);
  };

  // Switch Theme
  const handleSelectTheme = (themeId: ThemeId) => {
    setCurrentThemeId(themeId);
    setUser((prev) => ({ ...prev, activeTheme: themeId }));
  };

  // Save custom timer from clock picker
  const handleSaveCustomInterval = (intervalMins: number, breakDurationMins: number) => {
    setSettings((prev) => ({
      ...prev,
      intervalMinutes: intervalMins,
      breakDurationMinutes: breakDurationMins,
    }));
    setTimerSecondsRemaining(intervalMins * 60);
    setIsTimerRunning(true);
  };

  // Complete a break
  const handleCompleteBreak = (earnedPoints: number, minutesRested: number) => {
    setIsActiveBreakModalOpen(false);
    setUser((prev) => ({
      ...prev,
      points: prev.points + earnedPoints,
      totalBreaks: prev.totalBreaks + 1,
      totalMinutesRested: prev.totalMinutesRested + minutesRested,
      streakDays: prev.streakDays + 1,
      postureScore: Math.min(100, prev.postureScore + 3),
    }));
    setTimerSecondsRemaining(settings.intervalMinutes * 60);
    setIsTimerRunning(true);
  };

  // Redeem voucher
  const handleRedeemVoucher = (voucher: Voucher) => {
    setUser((prev) => ({
      ...prev,
      points: prev.points - voucher.pointsRequired,
      claimedVoucherIds: [...prev.claimedVoucherIds, voucher.id],
    }));

    const claimed: ClaimedVoucher = {
      ...voucher,
      claimedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + voucher.expiryDays * 86400000).toISOString(),
      isUsed: false,
    };
    setClaimedVouchers((prev) => [claimed, ...prev]);
  };

  // Choose Target Reward
  const handleSelectTargetReward = (voucherId: string) => {
    setUser((prev) => ({
      ...prev,
      targetVoucherId: voucherId,
    }));
  };

  // Login handler
  const handleLogin = (name: string, email: string, provider: 'google' | 'email') => {
    setUser((prev) => ({
      ...prev,
      name,
      email,
      isAuthenticated: true,
      authProvider: provider,
    }));
  };

  // Logout handler
  const handleLogout = () => {
    soundEngine.playClick();
    setUser((prev) => ({
      ...prev,
      isAuthenticated: false,
    }));
  };

  // If user is logged out, render the Login Page
  if (!user.isAuthenticated) {
    return <LoginPage theme={activeTheme} onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen relative text-white font-sans transition-colors duration-500 flex flex-col justify-between overflow-x-hidden">
      {/* Cinematic Thematic Background Image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700 pointer-events-none transform scale-105"
        style={{
          backgroundImage: `url(${activeTheme.backgroundImage})`,
        }}
      >
        {/* Thematic color gradient and dark atmospheric vignette */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${activeTheme.bgClass} opacity-80 backdrop-blur-[1px]`}
        />
        <div className="absolute inset-0 bg-black/45" />
        {/* Radial highlight matching primary theme color */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 15%, ${activeTheme.primaryColor}28 0%, transparent 75%)`,
          }}
        />
      </div>

      {/* Main Container - Centered sleek mobile frame with fluid width */}
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col relative z-10 shadow-2xl min-h-screen">
        {/* Top Header */}
        <Header
          theme={activeTheme}
          user={user}
          isMuted={isMuted}
          isHapticsEnabled={isHapticsEnabled}
          onToggleMute={handleToggleMute}
          onToggleHaptics={handleToggleHaptics}
          onOpenThemeModal={() => setIsThemeModalOpen(true)}
          onOpenClockPicker={() => setIsClockPickerOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-3.5 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              theme={activeTheme}
              user={user}
              settings={settings}
              timerSecondsRemaining={timerSecondsRemaining}
              isTimerRunning={isTimerRunning}
              sittingMinutesToday={sittingMinutesToday}
              onToggleTimer={() => setIsTimerRunning(!isTimerRunning)}
              onTriggerBreak={() => setIsActiveBreakModalOpen(true)}
              onOpenClockPicker={() => setIsClockPickerOpen(true)}
              onOpenThemeModal={() => setIsThemeModalOpen(true)}
              onOpenRewards={() => setActiveTab('rewards')}
              onSelectTargetReward={handleSelectTargetReward}
              onLogout={handleLogout}
            />
          )}

          {activeTab === 'breaks' && (
            <div className="space-y-4 pb-24">
              <div
                className={`p-5 rounded-3xl border ${activeTheme.cardBgClass} ${activeTheme.borderClass}`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xl">⏱️</span>
                  <span
                    className="text-xs font-extrabold uppercase tracking-widest"
                    style={{ color: activeTheme.primaryColor }}
                  >
                    CUSTOM BREAK CLOCK
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white">Posture Schedule</h2>
                <p className="text-sm text-white/80 mt-1.5 leading-relaxed">
                  Work interval: <strong className="text-white">{settings.intervalMinutes}m</strong> | Break length: <strong className="text-white">{settings.breakDurationMinutes}m</strong>
                </p>

                <div className="mt-4 flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsClockPickerOpen(true)}
                    className={`flex-1 py-3.5 rounded-xl text-sm uppercase font-extrabold ${activeTheme.buttonClass}`}
                  >
                    ⏰ Change Interval Clock
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsActiveBreakModalOpen(true)}
                    className="flex-1 py-3.5 rounded-xl text-sm uppercase font-bold bg-white/10 hover:bg-white/20 text-white"
                  >
                    Start Break Now
                  </button>
                </div>
              </div>

              {/* Universal Ergonomics Protocol */}
              <div className="p-4.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>💡</span> Ergonomic Micro-Break Protocol
                </div>
                <p className="text-white/80 leading-relaxed text-sm font-normal">
                  Setting your break interval to {settings.intervalMinutes} mins prevents spinal disc compression and maintains vital cerebral oxygenation. Each completed break earns points toward your chosen reward goal!
                </p>
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <RewardsView
              theme={activeTheme}
              user={user}
              claimedVouchers={claimedVouchers}
              onRedeem={handleRedeemVoucher}
              onNavigateHome={() => setActiveTab('dashboard')}
              onSelectTargetReward={handleSelectTargetReward}
            />
          )}

          {activeTab === 'guide' && (
            <PostureGuideView
              theme={activeTheme}
              userRole={user.role}
              onStartStretchSession={() => setIsActiveBreakModalOpen(true)}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              theme={activeTheme}
              user={user}
              settings={settings}
              isHapticsEnabled={isHapticsEnabled}
              onToggleHaptics={handleToggleHaptics}
              onUpdateName={(name) => setUser((prev) => ({ ...prev, name }))}
              onOpenClockPicker={() => setIsClockPickerOpen(true)}
              onOpenThemeModal={() => setIsThemeModalOpen(true)}
              onAddBonusPoints={(points) =>
                setUser((prev) => ({ ...prev, points: prev.points + points }))
              }
              onLogout={handleLogout}
            />
          )}
        </main>

        {/* Custom Themed Bottom Navigation with Flutter/Material Crests */}
        <BottomNav
          theme={activeTheme}
          currentTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          onOpenBreakReminder={() => setActiveTab('breaks')}
        />
      </div>

      {/* Theme Vault Modal */}
      {isThemeModalOpen && (
        <ThemeModal
          currentTheme={activeTheme}
          onSelectTheme={handleSelectTheme}
          onClose={() => setIsThemeModalOpen(false)}
        />
      )}

      {/* Clock Time Picker Modal */}
      {isClockPickerOpen && (
        <ClockTimePicker
          theme={activeTheme}
          initialMinutes={settings.intervalMinutes}
          initialBreakDuration={settings.breakDurationMinutes}
          onSave={handleSaveCustomInterval}
          onClose={() => setIsClockPickerOpen(false)}
        />
      )}

      {/* Active Guided Break Modal */}
      {isActiveBreakModalOpen && (
        <ActiveBreakModal
          theme={activeTheme}
          userRole={user.role}
          streakDays={user.streakDays}
          breakDurationMinutes={settings.breakDurationMinutes}
          onCompleteBreak={handleCompleteBreak}
          onCancel={() => setIsActiveBreakModalOpen(false)}
        />
      )}
    </div>
  );
}
