import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBreakPoints,
  calculateErgonomicStrainIndex,
  canRedeemVoucher,
  formatTime,
  formatMinutesToReadable,
  getRecommendedInterval,
  getNextRewardMilestone
} from './rewards.ts';

test('calculateBreakPoints handles 0 or negative duration safely', () => {
  assert.equal(calculateBreakPoints(0), 0);
  assert.equal(calculateBreakPoints(-10), 0);
});

test('calculateBreakPoints adds time bonus, stretch bonus and streak multiplier', () => {
  // Base 30 + (120s / 60 * 10 = 20) + (2 stretches * 15 = 30) = 80 raw
  // Streak 0 -> multiplier 1.0 -> 80
  const pointsNoStreak = calculateBreakPoints(120, 2, 0);
  assert.equal(pointsNoStreak, 80);

  // With 10 day streak -> +50% max multiplier -> 80 * 1.5 = 120
  const pointsWithStreak = calculateBreakPoints(120, 2, 10);
  assert.equal(pointsWithStreak, 120);
});

test('calculateErgonomicStrainIndex classifies risk levels accurately', () => {
  // Low sitting, breaks taken
  const lowStrain = calculateErgonomicStrainIndex(20, 1);
  assert.equal(lowStrain.status, 'low');

  // Moderate sitting without sufficient breaks
  const modStrain = calculateErgonomicStrainIndex(60, 0);
  assert.equal(modStrain.status, 'moderate');

  // Severe prolonged static sitting
  const highStrain = calculateErgonomicStrainIndex(150, 0);
  assert.equal(highStrain.status, 'high');
});

test('canRedeemVoucher checks balance requirements', () => {
  assert.equal(canRedeemVoucher(350, 300), true);
  assert.equal(canRedeemVoucher(300, 300), true);
  assert.equal(canRedeemVoucher(299, 300), false);
  assert.equal(canRedeemVoucher(0, 100), false);
});

test('formatTime formats minutes and seconds with padding', () => {
  assert.equal(formatTime(0), '00:00');
  assert.equal(formatTime(65), '01:05');
  assert.equal(formatTime(300), '05:00');
});

test('formatMinutesToReadable outputs clean durations', () => {
  assert.equal(formatMinutesToReadable(25), '25m');
  assert.equal(formatMinutesToReadable(60), '1h');
  assert.equal(formatMinutesToReadable(90), '1h 30m');
});

test('getRecommendedInterval adjusts for student vs wfh role', () => {
  const student = getRecommendedInterval('student');
  assert.equal(student.intervalMinutes, 25);

  const wfh = getRecommendedInterval('wfh');
  assert.equal(wfh.intervalMinutes, 45);
});

test('getNextRewardMilestone accurately calculates target, deficit and progress', () => {
  const mockVouchers = [
    {
      id: 'v1',
      brand: 'Starbucks',
      brandColor: '#00704a',
      category: 'Food & Drinks' as const,
      title: '₹250 Voucher',
      description: 'Test',
      pointsRequired: 150,
      originalValue: '₹250',
      couponCode: 'TEST150',
      expiryDays: 30,
      terms: [],
    },
    {
      id: 'v2',
      brand: 'Nike',
      brandColor: '#e11d48',
      category: 'Fitness & Health' as const,
      title: '₹750 Voucher',
      description: 'Test',
      pointsRequired: 300,
      originalValue: '₹750',
      couponCode: 'TEST300',
      expiryDays: 30,
      terms: [],
    },
  ];

  // User has 100 points -> Target is v1 (150 pts), deficit is 50, 0 claimable
  const p1 = getNextRewardMilestone(100, mockVouchers);
  assert.ok(p1);
  assert.equal(p1.nextVoucher.id, 'v1');
  assert.equal(p1.pointsNeeded, 50);
  assert.equal(p1.claimableCount, 0);
  assert.equal(p1.allUnlocked, false);

  // User has 200 points -> v1 is claimable, target is v2 (300 pts), deficit is 100, 1 claimable
  const p2 = getNextRewardMilestone(200, mockVouchers);
  assert.ok(p2);
  assert.equal(p2.nextVoucher.id, 'v2');
  assert.equal(p2.pointsNeeded, 100);
  assert.equal(p2.claimableCount, 1);
  assert.equal(p2.allUnlocked, false);

  // User has 500 points -> all unlocked
  const p3 = getNextRewardMilestone(500, mockVouchers);
  assert.ok(p3);
  assert.equal(p3.allUnlocked, true);
  assert.equal(p3.claimableCount, 2);
  assert.equal(p3.pointsNeeded, 0);

  // User explicitly selects v2 as custom target even when at 100 points
  const pCustom = getNextRewardMilestone(100, mockVouchers, 'v2');
  assert.ok(pCustom);
  assert.equal(pCustom.nextVoucher.id, 'v2');
  assert.equal(pCustom.pointsNeeded, 200);
  assert.equal(pCustom.progressPercent, 33);
  assert.equal(pCustom.isCustomGoal, true);
});
