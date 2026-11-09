import React, { useState } from 'react';
import { ThemeConfig, UserProfile } from '../types/index.ts';
import { ThemeIcon } from './ThemeIcon.tsx';
import { soundEngine } from '../services/soundEngine.ts';
import { haptics } from '../services/haptics.ts';

interface HeaderProps {
  theme: ThemeConfig;
  user: UserProfile;
  isMuted: boolean;
  isHapticsEnabled: boolean;
  onToggleMute: () => void;
  onToggleHaptics: () => void;
  onOpenThemeModal: () => void;
  onOpenClockPicker: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  user,
  isMuted,
  isHapticsEnabled,
  onToggleMute,
  onToggleHaptics,
  onOpenThemeModal,
  onOpenClockPicker,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Static Chair Alert', time: '10m ago', text: 'You have been seated for 45 mins. Cervical spine pressure increasing.', unread: true },
    { id: 2, title: 'Voucher Reward Drop', time: '1h ago', text: 'Starbucks ₹250 & Herman Miller coupons now claimable with 250 points!', unread: true },
    { id: 3, title: 'Streak Bonus Active', time: '3h ago', text: '3-day ergonomics streak achieved! 1.3x point multiplier enabled.', unread: true },
    { id: 4, title: 'Hydration & Posture Sync', time: '5h ago', text: 'Drink 250ml water and complete 20-20-20 optic reset.', unread: true },
    { id: 5, title: 'Campus Ergonomics Hub', time: '1d ago', text: 'New group challenges added for WFH workers & college students.', unread: false },
    { id: 6, title: 'Theme Vault Unlocked', time: '1d ago', text: 'Corporate Executive, Minimalist Studio, Ergonomic Wellness & Pop-culture themes are ready.', unread: false },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 px-3.5 pt-3.5 pb-2.5 backdrop-blur-2xl bg-black/80 border-b border-white/10">
        <div className="max-w-md mx-auto space-y-2.5">
          {/* Row 1: Brand Logo + Character Avatar Badge */}
          <div className="flex items-center justify-between">
            {/* Intervalo Brand Title with stylish interval hourglass icon */}
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center border shadow-md relative"
                style={{
                  backgroundColor: `${theme.primaryColor}22`,
                  borderColor: `${theme.primaryColor}66`,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 3H18M6 21H18M7 3C7 9 12 12 12 12C12 12 17 9 17 3M7 21C7 15 12 12 12 12C12 12 17 15 17 21"
                    stroke={theme.primaryColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="16" r="1.5" fill={theme.accentColor} />
                </svg>
              </div>

              <div>
                <h1 className="text-lg font-black tracking-wider text-white flex items-center gap-2">
                  <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                    INTERVALO
                  </span>
                </h1>
                <p className="text-xs text-white/65 tracking-wide font-medium">
                  Posture Breaks &amp; Rewards
                </p>
              </div>
            </div>

            {/* Character Avatar Badge in Glowing Circular Ring */}
            <button
              type="button"
              onClick={onOpenThemeModal}
              title={`Active Theme: ${theme.name}. Click to change.`}
              className="group relative cursor-pointer focus:outline-none"
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center border-2 shadow-lg transition-transform group-hover:scale-105"
                style={{
                  borderColor: theme.primaryColor,
                  boxShadow: `0 0 15px ${theme.primaryColor}66`,
                  backgroundColor: `${theme.secondaryColor}88`,
                }}
              >
                <ThemeIcon name={theme.avatarIcon || theme.navIcons.dashboard} size={28} />
              </div>
              <span
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border border-black flex items-center justify-center text-[9px]"
                style={{ backgroundColor: theme.primaryColor }}
              >
                ✓
              </span>
            </button>
          </div>

          {/* Row 2: Profile Status & Utility Toolbar */}
          <div className="flex items-center justify-between pt-1.5 border-t border-white/10">
            {/* Profile | STATUS Badge */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white/80">Profile</span>
              <span className="text-white/40">|</span>
              <span
                className="text-xs font-black uppercase tracking-wider flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10"
                style={{ color: theme.primaryColor }}
              >
                <span>🛡️</span>
                <span>{theme.userTitle}</span>
              </span>
            </div>

            {/* Toolbar Buttons: Bell (6), Timer, Sound, Haptics, Themes (QR pass removed per user request) */}
            <div className="flex items-center gap-2">
              {/* Notification Bell with Badge 6 */}
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(true);
                  haptics.light();
                  soundEngine.playClick();
                }}
                aria-label="Open notifications"
                className="relative w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-all border border-white/10"
                title="Notifications"
              >
                <span>🔔</span>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-black text-[9px] font-black flex items-center justify-center shadow-sm">
                  6
                </span>
              </button>

              {/* Clock Timer Picker */}
              <button
                type="button"
                onClick={onOpenClockPicker}
                aria-label="Set break interval"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-all border border-white/10"
                title="Set Break Interval"
              >
                <span>⏰</span>
              </button>

              {/* Haptics Toggle */}
              <button
                type="button"
                onClick={() => {
                  onToggleHaptics();
                  haptics.light();
                }}
                aria-label="Toggle haptics"
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all border ${
                  isHapticsEnabled
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                    : 'bg-white/10 text-white/40 border-white/10'
                }`}
                title={isHapticsEnabled ? 'Haptics: Enabled' : 'Haptics: Disabled'}
              >
                <span>📳</span>
              </button>

              {/* Sound Toggle */}
              <button
                type="button"
                onClick={() => {
                  onToggleMute();
                  if (isMuted) soundEngine.playClick();
                }}
                aria-label="Toggle audio"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-all border border-white/10"
                title={isMuted ? 'Audio Muted' : 'Theme Audio On'}
              >
                <span>{isMuted ? '🔇' : '🔊'}</span>
              </button>

              {/* Theme Vault */}
              <button
                type="button"
                onClick={onOpenThemeModal}
                aria-label="Open themes vault"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-all border border-white/10"
                title="Switch Theme"
              >
                <span>🎨</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* NOTIFICATIONS MODAL (Triggered by 🔔 badge 6) */}
      {/* ======================================================== */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md max-h-[85vh] flex flex-col rounded-3xl bg-[#0b121e] border border-white/20 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔔</span>
                <div>
                  <h3 className="text-sm font-black text-white">Notifications &amp; Decrees</h3>
                  <p className="text-[11px] text-white/60">6 alerts regarding breaks &amp; rewards</p>
                </div>
              </div>
              <button
                onClick={() => setShowNotifications(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    n.unread
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-white/[0.03] border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-white">{n.title}</span>
                    <span className="text-xs text-white/50">{n.time}</span>
                  </div>
                  <p className="text-sm text-white/75 mt-1.5 leading-relaxed">{n.text}</p>
                </div>
              ))}
            </div>

            <div className="px-5 py-3.5 border-t border-white/10 bg-black/50 text-right">
              <button
                onClick={() => setShowNotifications(false)}
                className="px-5 py-2 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
