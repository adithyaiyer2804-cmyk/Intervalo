import React from 'react';
import { ThemeConfig, UserProfile, BreakSettings } from '../types/index.ts';
import { ThemeIcon } from './ThemeIcon.tsx';
import { BrandLogo } from './BrandLogo.tsx';
import { soundEngine } from '../services/soundEngine.ts';
import { calculateErgonomicStrainIndex, formatTime, getNextRewardMilestone } from '../utils/rewards.ts';
import { REAL_LIFE_VOUCHERS } from '../data/vouchers.ts';

interface DashboardViewProps {
  theme: ThemeConfig;
  user: UserProfile;
  settings: BreakSettings;
  timerSecondsRemaining: number;
  isTimerRunning: boolean;
  sittingMinutesToday: number;
  onToggleTimer: () => void;
  onTriggerBreak: () => void;
  onOpenClockPicker: () => void;
  onOpenThemeModal: () => void;
  onOpenRewards: () => void;
  onSelectTargetReward: (voucherId: string) => void;
  onLogout: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  theme,
  user,
  settings,
  timerSecondsRemaining,
  isTimerRunning,
  sittingMinutesToday,
  onToggleTimer,
  onTriggerBreak,
  onOpenClockPicker,
  onOpenThemeModal,
  onOpenRewards,
  onSelectTargetReward,
  onLogout,
}) => {
  const [isGoalPickerOpen, setIsGoalPickerOpen] = React.useState(false);

  const strainInfo = calculateErgonomicStrainIndex(
    sittingMinutesToday,
    user.totalBreaks
  );

  const milestone = getNextRewardMilestone(user.points, REAL_LIFE_VOUCHERS, user.targetVoucherId);

  const handleStartBreak = () => {
    soundEngine.playThemeSound(theme.id);
    onTriggerBreak();
  };

  const handlePickGoal = (voucherId: string) => {
    soundEngine.playCelebration();
    onSelectTargetReward(voucherId);
    setIsGoalPickerOpen(false);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Profile Card showing authenticated User Name */}
      <div
        className={`rounded-3xl p-4.5 border ${theme.cardBgClass} ${theme.borderClass} relative overflow-hidden`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg flex-shrink-0"
              style={{
                backgroundColor: `${theme.primaryColor}22`,
                borderColor: `${theme.primaryColor}66`,
                color: theme.primaryColor,
              }}
            >
              <ThemeIcon name={theme.navIcons.dashboard} size={26} color={theme.primaryColor} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white truncate">{user.name}</h2>
                <span
                  className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/10 flex-shrink-0"
                  style={{ color: theme.primaryColor }}
                >
                  {theme.userTitle}
                </span>
              </div>
              <p className="text-sm text-white/70 truncate mt-0.5">
                {user.email || 'Sedentary Strain Defense Active'}
              </p>
            </div>
          </div>

          {/* User Account Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={onLogout}
              title="Logout / Switch Account"
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 text-xs font-bold border border-white/10 transition-all"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Sub-row action pills */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={onOpenClockPicker}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/90 text-xs font-bold border border-white/5 transition-all"
          >
            <span>⏰</span>
            <span>{settings.intervalMinutes}m Timer</span>
          </button>

          <button
            type="button"
            onClick={() => setIsGoalPickerOpen(true)}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/90 text-xs font-bold border border-white/5 transition-all"
          >
            <span>🎯</span>
            <span>Choose Goal</span>
          </button>

          <button
            type="button"
            onClick={onOpenRewards}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 text-xs font-bold border border-white/5 transition-all"
          >
            <span>🎁</span>
            <span>{user.points} Pts</span>
          </button>
        </div>
      </div>

      {/* Next Reward Unlock Progress Card (With Choose Reward feature) */}
      {milestone && (
        <div
          className={`p-5 rounded-3xl border ${theme.cardBgClass} ${theme.borderClass} relative overflow-hidden shadow-xl space-y-3.5`}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{milestone.isCustomGoal ? '🎯' : '🎁'}</span>
              <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                {milestone.isCustomGoal ? 'Your Chosen Reward Goal' : 'Next Reward Milestone'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsGoalPickerOpen(true)}
                className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all"
              >
                Change Goal ▾
              </button>
              <span
                className="text-xs font-black px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30"
              >
                {milestone.allUnlocked
                  ? 'Goal Reached!'
                  : `${milestone.pointsNeeded} Pts Left`}
              </span>
            </div>
          </div>

          {/* Target Company & Voucher Info with Real Brand Logo */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-black/40 border border-white/10">
            <div
              className="w-13 h-13 rounded-xl flex items-center justify-center p-1.5 shadow-md border border-white/15 flex-shrink-0"
              style={{
                backgroundColor: `${milestone.nextVoucher.brandColor}33`,
                borderColor: `${milestone.nextVoucher.brandColor}66`,
              }}
            >
              <BrandLogo brand={milestone.nextVoucher.brand} size={30} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-white truncate">
                  {milestone.nextVoucher.brand}
                </span>
                <span className="text-sm font-black text-emerald-400">
                  {milestone.nextVoucher.originalValue}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white/90 truncate mt-0.5">
                {milestone.nextVoucher.title}
              </h4>
              <div className="text-xs text-white/60 mt-1">
                Goal Target: <strong className="text-white">{milestone.nextVoucher.pointsRequired} Pts</strong>
              </div>
            </div>
          </div>

          {/* Reward Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-bold">
              <span className="text-white/80">
                Progress: <strong className="text-white">{user.points}</strong> / {milestone.nextVoucher.pointsRequired} Pts
              </span>
              <span style={{ color: theme.primaryColor }} className="text-sm font-black">
                {milestone.progressPercent}%
              </span>
            </div>

            <div className="w-full h-3.5 rounded-full bg-black/60 overflow-hidden border border-white/10 p-0.5">
              <div
                className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-amber-500 via-emerald-400 to-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                style={{ width: `${milestone.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Action & Motivation Prompt */}
          <div className="flex items-center justify-between pt-1">
            <p className="text-sm text-white/80 leading-relaxed">
              {milestone.allUnlocked
                ? '🏆 You have earned enough points to claim this goal!'
                : `⚡ Only ${milestone.pointsNeeded} pts to go (~${milestone.breaksNeeded} desk break${milestone.breaksNeeded > 1 ? 's' : ''})!`}
            </p>
            <button
              type="button"
              onClick={onOpenRewards}
              className="text-sm font-black text-amber-300 hover:text-amber-200 underline underline-offset-2 whitespace-nowrap ml-2"
            >
              All Coupons (₹) →
            </button>
          </div>

          {/* Quick claim alert if user already has enough points for other vouchers */}
          {milestone.claimableCount > 0 && (
            <div
              onClick={onOpenRewards}
              className="cursor-pointer p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between text-sm text-emerald-300 hover:bg-emerald-500/25 transition-all"
            >
              <div className="flex items-center gap-2">
                <span>🎉</span>
                <span className="font-bold">
                  {milestone.claimableCount} coupon{milestone.claimableCount > 1 ? 's' : ''} ready to redeem right now!
                </span>
              </div>
              <span className="font-black text-xs uppercase tracking-wider">
                Redeem →
              </span>
            </div>
          )}
        </div>
      )}

      {/* Target Reward Goal Picker Modal */}
      {isGoalPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md max-h-[85vh] rounded-3xl bg-[#0b121e] border border-white/20 p-5 text-white shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <span>🎯</span> Choose Your Reward Goal
                </h3>
                <p className="text-sm text-white/70 mt-0.5">
                  Select the real-world coupon you want to work towards
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsGoalPickerOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1">
              {REAL_LIFE_VOUCHERS.map((v) => {
                const isSelected = (user.targetVoucherId || milestone?.nextVoucher.id) === v.id;
                const canAfford = user.points >= v.pointsRequired;
                return (
                  <div
                    key={v.id}
                    onClick={() => handlePickGoal(v.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3.5 ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.25)]'
                        : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center p-1.5 border border-white/15 flex-shrink-0"
                        style={{ backgroundColor: `${v.brandColor}33` }}
                      >
                        <BrandLogo brand={v.brand} size={28} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-white">{v.brand}</span>
                          <span className="text-sm font-bold text-emerald-400">{v.originalValue}</span>
                          {isSelected && (
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-400 text-black">
                              Target Goal
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-medium text-white/85 truncate mt-0.5">{v.title}</h4>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-black text-amber-300">{v.pointsRequired} Pts</div>
                      <div className="text-xs text-white/60 mt-0.5">
                        {canAfford ? '✓ Claimable' : `Need ${v.pointsRequired - user.points}`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 text-right">
              <button
                type="button"
                onClick={() => setIsGoalPickerOpen(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overview | The Realm (matching user screenshot) */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-sm font-black tracking-wider uppercase text-white/80">
            Overview | <span style={{ color: theme.primaryColor }}>{theme.realmLabel}</span>
          </span>
          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
            <span>🔥</span>
            <span>{user.streakDays} Day Streak</span>
          </span>
        </div>

        {/* Chair Strain Gauge Card */}
        <div
          className={`p-5 rounded-3xl border ${theme.cardBgClass} ${theme.borderClass} space-y-3.5`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-white/70 uppercase font-bold tracking-wider">
                STATIC CHAIR STRAIN INDEX
              </div>
              <div className="flex items-baseline gap-2.5 mt-1">
                <span
                  className="text-3xl font-black"
                  style={{
                    color:
                      strainInfo.status === 'low'
                        ? '#34d399'
                        : strainInfo.status === 'moderate'
                        ? '#fbbf24'
                        : '#f87171',
                  }}
                >
                  {strainInfo.score}%
                </span>
                <span className="text-sm font-bold text-white/90">{strainInfo.label}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-white/60">Sitting Today:</span>
              <div className="text-base font-black text-white mt-0.5">{sittingMinutesToday} mins</div>
            </div>
          </div>

          {/* Strain Progress Meter */}
          <div className="w-full h-3 rounded-full bg-black/60 overflow-hidden border border-white/10">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${strainInfo.score}%`,
                backgroundColor:
                  strainInfo.status === 'low'
                    ? '#10b981'
                    : strainInfo.status === 'moderate'
                    ? '#f59e0b'
                    : '#ef4444',
              }}
            />
          </div>

          <p className="text-sm text-white/80 leading-relaxed font-normal">
            {strainInfo.status === 'low'
              ? 'Great job keeping spinal circulation active with scheduled breaks!'
              : strainInfo.status === 'moderate'
              ? 'Neck and lower lumbar discs are accumulating pressure. Time for a posture reset.'
              : 'Severe static chair strain detected! Stand up immediately and decompress your spine.'}
          </p>
        </div>

        {/* Active Timer Countdown Box */}
        <div className="p-5 rounded-3xl bg-black/45 border border-white/15 text-center relative overflow-hidden">
          <div className="text-xs uppercase tracking-widest text-white/60 font-bold mb-1">
            NEXT POSTURE BREAK IN
          </div>

          <div
            className="text-5xl font-black tracking-tight my-2 font-mono"
            style={{ color: theme.primaryColor }}
          >
            {formatTime(timerSecondsRemaining)}
          </div>

          <div className="flex items-center justify-center gap-3 mt-3.5">
            <button
              type="button"
              onClick={onToggleTimer}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/10 transition-all"
            >
              {isTimerRunning ? '⏸ Pause Timer' : '▶ Start Work Timer'}
            </button>

            <button
              type="button"
              onClick={onOpenClockPicker}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/90 text-sm font-semibold border border-white/10 flex items-center gap-1.5 transition-all"
            >
              <span>⚙️</span>
              <span>Change Time</span>
            </button>
          </div>
        </div>

        {/* Thematic Primary Action Button (Bespoke per Theme) */}
        <button
          type="button"
          onClick={handleStartBreak}
          className={`w-full py-4 px-4 rounded-2xl text-center text-sm tracking-wider uppercase font-black transition-all transform active:scale-98 flex items-center justify-center gap-2.5 ${theme.buttonClass}`}
        >
          <ThemeIcon name={theme.navIcons.breaks} size={22} />
          <span>{theme.breakButtonText}</span>
        </button>

        {/* Daily Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 pt-2">
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
            <div className="text-xs text-white/60 uppercase font-bold">Breaks Taken</div>
            <div className="text-xl font-black text-white mt-1">
              {user.totalBreaks} / {settings.targetBreaksPerDay}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
            <div className="text-xs text-white/60 uppercase font-bold">Mins Rested</div>
            <div className="text-xl font-black text-white mt-1">{user.totalMinutesRested}m</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
            <div className="text-xs text-white/60 uppercase font-bold">Posture Score</div>
            <div className="text-xl font-black text-emerald-400 mt-1">
              {user.postureScore}/100
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
