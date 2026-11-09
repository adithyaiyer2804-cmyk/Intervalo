import { UserProfile, Voucher, UserRole } from '../types/index.ts';

/**
 * Calculates points awarded for taking an ergonomic break.
 * Base: 30 pts.
 * Bonus: +10 pts per 60 seconds rested.
 * Bonus: +5 pts per completed stretch exercise.
 * Streak multiplier: +5% per streak day up to +50% max.
 */
export function calculateBreakPoints(
  durationSeconds: number,
  completedStretchesCount: number = 0,
  streakDays: number = 0
): number {
  if (durationSeconds <= 0) return 0;
  
  const basePoints = 30;
  const timeBonus = Math.floor(durationSeconds / 60) * 10;
  const stretchBonus = Math.min(completedStretchesCount * 15, 60);
  const rawPoints = basePoints + timeBonus + stretchBonus;

  // Streak bonus: 5% per day up to 50% max
  const streakMultiplier = 1 + Math.min(streakDays * 0.05, 0.5);
  return Math.round(rawPoints * streakMultiplier);
}

/**
 * Calculates ergonomic strain index (0 to 100) based on continuous sitting hours and breaks taken.
 * 0-35: Optimal (Green)
 * 36-70: Moderate Strain (Yellow)
 * 71-100: Critical Ergonomic Hazard (Red / Static Chair lock)
 */
export function calculateErgonomicStrainIndex(
  sittingMinutes: number,
  breaksTakenToday: number
): { score: number; status: 'low' | 'moderate' | 'high'; label: string } {
  // Sitting without breaks builds up ~1.2 points per minute
  // Each break reduces strain index by 25 points
  const rawStrain = Math.max(0, sittingMinutes * 1.0 - breaksTakenToday * 25);
  const score = Math.min(100, Math.max(5, Math.round(rawStrain)));

  if (score < 40) {
    return { score, status: 'low', label: 'Healthy & Flexible' };
  } else if (score < 75) {
    return { score, status: 'moderate', label: 'Static Posture Strain' };
  } else {
    return { score, status: 'high', label: 'Severe Lumbar/Cervical Risk' };
  }
}

/**
 * Verifies if user has enough points to redeem voucher.
 */
export function canRedeemVoucher(userPoints: number, voucherCost: number): boolean {
  return userPoints >= voucherCost && voucherCost > 0;
}

/**
 * Formats seconds into MM:SS.
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(Math.max(0, seconds) / 60);
  const secs = Math.max(0, seconds) % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formats hours and minutes into digital 12h/24h or duration text.
 */
export function formatMinutesToReadable(totalMinutes: number): string {
  if (totalMinutes < 60) {
    return `${totalMinutes}m`;
  }
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

/**
 * Recommends optimal break interval based on role and continuous work.
 */
export function getRecommendedInterval(role: UserRole): { intervalMinutes: number; reason: string } {
  if (role === 'student') {
    return {
      intervalMinutes: 25,
      reason: 'Optimal Pomodoro interval for retention, cervical neck relief, and eye resets during study.',
    };
  }
  return {
    intervalMinutes: 45,
    reason: 'Ergonomic 45/5 cadence recommended by occupational health specialists to prevent spinal disc compression.',
  };
}

export interface RewardMilestoneInfo {
  nextVoucher: Voucher;
  claimableCount: number;
  pointsNeeded: number;
  progressPercent: number;
  breaksNeeded: number;
  allUnlocked: boolean;
  isCustomGoal: boolean;
}

/**
 * Calculates user's progress toward their target voucher reward.
 * If targetVoucherId is provided and exists, progress is tracked against that chosen reward.
 * Otherwise, it tracks against the next upcoming voucher above current points.
 */
export function getNextRewardMilestone(
  userPoints: number,
  vouchers: Voucher[],
  targetVoucherId?: string
): RewardMilestoneInfo | null {
  if (!vouchers || vouchers.length === 0) return null;

  const sorted = [...vouchers].sort((a, b) => a.pointsRequired - b.pointsRequired);
  const claimableCount = sorted.filter((v) => v.pointsRequired <= userPoints).length;

  // Check if user has explicitly chosen a target reward
  if (targetVoucherId) {
    const chosenVoucher = vouchers.find((v) => v.id === targetVoucherId);
    if (chosenVoucher) {
      const pointsNeeded = Math.max(0, chosenVoucher.pointsRequired - userPoints);
      const progressPercent = Math.min(
        100,
        Math.max(0, Math.round((userPoints / chosenVoucher.pointsRequired) * 100))
      );
      const breaksNeeded = pointsNeeded === 0 ? 0 : Math.max(1, Math.ceil(pointsNeeded / 35));
      const allUnlocked = userPoints >= chosenVoucher.pointsRequired;

      return {
        nextVoucher: chosenVoucher,
        claimableCount,
        pointsNeeded,
        progressPercent,
        breaksNeeded,
        allUnlocked,
        isCustomGoal: true,
      };
    }
  }

  // Fallback to finding first voucher user cannot yet afford
  const nextTarget = sorted.find((v) => v.pointsRequired > userPoints);

  if (!nextTarget) {
    // User can afford all vouchers! Highest voucher is milestone
    const topVoucher = sorted[sorted.length - 1];
    return {
      nextVoucher: topVoucher,
      claimableCount,
      pointsNeeded: 0,
      progressPercent: 100,
      breaksNeeded: 0,
      allUnlocked: true,
      isCustomGoal: false,
    };
  }

  const pointsNeeded = Math.max(0, nextTarget.pointsRequired - userPoints);
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((userPoints / nextTarget.pointsRequired) * 100))
  );
  const breaksNeeded = Math.max(1, Math.ceil(pointsNeeded / 35));

  return {
    nextVoucher: nextTarget,
    claimableCount,
    pointsNeeded,
    progressPercent,
    breaksNeeded,
    allUnlocked: false,
    isCustomGoal: false,
  };
}
