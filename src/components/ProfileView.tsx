import React, { useState } from 'react';
import { ThemeConfig, UserProfile, BreakSettings } from '../types/index.ts';
import { ThemeIcon } from './ThemeIcon.tsx';
import { soundEngine } from '../services/soundEngine.ts';
import { haptics } from '../services/haptics.ts';

interface ProfileViewProps {
  theme: ThemeConfig;
  user: UserProfile;
  settings: BreakSettings;
  isHapticsEnabled: boolean;
  onToggleHaptics: () => void;
  onUpdateName: (name: string) => void;
  onToggleRole?: () => void;
  onOpenClockPicker: () => void;
  onOpenThemeModal: () => void;
  onAddBonusPoints: (points: number) => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  theme,
  user,
  settings,
  isHapticsEnabled,
  onToggleHaptics,
  onUpdateName,
  onToggleRole,
  onOpenClockPicker,
  onOpenThemeModal,
  onAddBonusPoints,
  onLogout,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(user.name);

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const handleTestHaptic = () => {
    haptics.success();
    soundEngine.playThemeSound(theme.id);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Profile Header Card */}
      <div
        className={`p-5 rounded-3xl border ${theme.cardBgClass} ${theme.borderClass} relative overflow-hidden`}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center border shadow-xl"
            style={{
              backgroundColor: `${theme.primaryColor}30`,
              borderColor: `${theme.primaryColor}80`,
              color: theme.primaryColor,
            }}
          >
            <ThemeIcon name={theme.navIcons.profile} size={32} color={theme.primaryColor} />
          </div>

          <div className="flex-1">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="px-2.5 py-1 rounded-lg bg-black/50 border border-white/20 text-white text-sm font-bold w-full"
                />
                <button
                  type="button"
                  onClick={handleSaveName}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500 text-black text-xs font-bold"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">{user.name}</h2>
                <button
                  type="button"
                  onClick={() => setIsEditingName(true)}
                  aria-label="Edit name"
                  className="text-xs text-white/50 hover:text-white"
                >
                  ✏️
                </button>
              </div>
            )}
            <div
              className="text-xs font-black tracking-wider uppercase mt-0.5"
              style={{ color: theme.primaryColor }}
            >
              {theme.userTitle}
            </div>
            <div className="text-sm text-white/70 mt-1 truncate">
              {user.email ? (
                <span>Signed in as <strong className="text-white">{user.email}</strong></span>
              ) : (
                <span>Active Theme: <strong className="text-white">{theme.name}</strong></span>
              )}
            </div>
          </div>
        </div>

        {/* Account Info Bar */}
        <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white">
              {user.authProvider === 'google' ? 'Google Account Connected' : 'Email Session'}
            </div>
            <div className="text-sm text-emerald-400 font-semibold mt-0.5">
              ✓ Synchronized with Intervalo Cloud
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/15 transition-all"
          >
            Logout / Switch
          </button>
        </div>
      </div>

      {/* Quick Test / Demo Bonus Points Generator */}
      <div className="p-4.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <span>✨</span> Test Voucher Redemption
          </div>
          <p className="text-sm text-white/70 mt-0.5">Add test points to redeem real vouchers right now</p>
        </div>
        <button
          type="button"
          onClick={() => {
            soundEngine.playCelebration();
            onAddBonusPoints(200);
          }}
          className={`px-4 py-2 rounded-xl text-sm font-black uppercase ${theme.buttonClass}`}
        >
          +200 Pts
        </button>
      </div>

      {/* Course Context Card (Design Thinking & Methodology) */}
      <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🎓</span>
          <span className="text-xs font-extrabold text-indigo-300 uppercase tracking-wider">
            Design Thinking &amp; Methodology Project
          </span>
        </div>
        <div className="text-sm text-white font-bold">Problem Statement:</div>
        <p className="text-sm text-white/80 leading-relaxed font-normal">
          Physical and cognitive pressure on individuals bound to static desk chairs during prolonged
          WFH and study sessions, causing spinal strain, headaches, and mental exhaustion.
        </p>

        <div className="text-sm text-white font-bold pt-1">Solution Architecture (Intervalo):</div>
        <p className="text-sm text-white/80 leading-relaxed font-normal">
          Intervalo uses a gamified behavioral micro-break reward loop that converts ergonomic stretches into real-life
          Rupee vouchers (Amazon, Starbucks, Nike, Swiggy) with tailored corporate and pop-culture themes to sustain intrinsic motivation.
        </p>
      </div>

      {/* App Settings Menu with Haptics */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-white/70 uppercase tracking-wider px-1">
          Haptics, Audio &amp; Preferences
        </h3>

        {/* Haptics Vibration Setting Card */}
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <span className="text-2xl">📳</span>
            <div>
              <div className="text-sm font-bold text-white">Device Haptic Feedback</div>
              <div className="text-xs text-white/65 mt-0.5">
                Vibrate on theme triggers, jutsu seals, web thwips, and rewards
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTestHaptic}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
            >
              Test Haptic
            </button>
            <button
              type="button"
              onClick={onToggleHaptics}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                isHapticsEnabled ? 'bg-emerald-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isHapticsEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <div
          onClick={onOpenClockPicker}
          className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 cursor-pointer flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-3.5">
            <span className="text-xl">⏰</span>
            <div>
              <div className="text-sm font-bold text-white">Custom Break Interval</div>
              <div className="text-xs text-white/65 mt-0.5">
                Current: Every {settings.intervalMinutes} mins for {settings.breakDurationMinutes} mins
              </div>
            </div>
          </div>
          <span className="text-sm text-white/60">&gt;</span>
        </div>

        <div
          onClick={onOpenThemeModal}
          className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 cursor-pointer flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-3.5">
            <span className="text-xl">🎨</span>
            <div>
              <div className="text-sm font-bold text-white">Theme &amp; SFX Vault</div>
              <div className="text-xs text-white/65 mt-0.5">
                Corporate Executive, Minimalist Studio, Ergonomic Wellness, Enterprise Luxury
              </div>
            </div>
          </div>
          <span className="text-sm text-white/60">&gt;</span>
        </div>
      </div>
    </div>
  );
};
