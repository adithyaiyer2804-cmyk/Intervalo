export type ThemeId =
  | 'doom'
  | 'spiderman'
  | 'luffy'
  | 'ramayan'
  | 'friends'
  | 'office'
  | 'matrix'
  | 'synthwave'
  | 'minimal'
  | 'midnight'
  | 'halloween'
  | 'executive'
  | 'nordic'
  | 'biophilic'
  | 'obsidian';

export type UserRole = 'wfh' | 'student';

export interface UserProfile {
  name: string;
  email?: string;
  role: UserRole;
  points: number;
  streakDays: number;
  totalBreaks: number;
  totalMinutesRested: number;
  postureScore: number;
  activeTheme: ThemeId;
  soundEnabled: boolean;
  claimedVoucherIds: string[];
  targetVoucherId?: string;
  isAuthenticated: boolean;
  authProvider?: 'google' | 'email';
}

export interface BreakSettings {
  intervalMinutes: number;
  breakDurationMinutes: number;
  notifySound: boolean;
  targetBreaksPerDay: number;
}

export interface Voucher {
  id: string;
  brand: string;
  brandColor: string;
  category: 'Food & Drinks' | 'Gift Card' | 'Fitness & Health' | 'Work & Tech';
  title: string;
  description: string;
  pointsRequired: number;
  originalValue: string;
  couponCode: string;
  expiryDays: number;
  terms: string[];
  popular?: boolean;
}

export interface ClaimedVoucher extends Voucher {
  claimedAt: string;
  expiresAt: string;
  isUsed: boolean;
}

export interface StretchExercise {
  id: string;
  title: string;
  targetArea: string;
  durationSec: number;
  instructions: string[];
  benefits: string;
  recommendedFor: 'all' | 'wfh' | 'student';
  repsText: string;
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subName: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  bgClass: string;
  cardBgClass: string;
  borderClass: string;
  buttonClass: string;
  glowClass: string;
  userTitle: string;
  decreesLabel: string;
  realmLabel: string;
  breakButtonText: string;
  backgroundImage: string;
  avatarIcon: string;
  frameStyle: string;
  paletteDots: [string, string, string];
  navIcons: {
    dashboard: string;
    breaks: string;
    rewards: string;
    guide: string;
    profile: string;
  };
  sfxType:
    | 'doom'
    | 'spiderman'
    | 'luffy'
    | 'ramayan'
    | 'friends'
    | 'office'
    | 'matrix'
    | 'synthwave'
    | 'minimal'
    | 'midnight'
    | 'halloween'
    | 'executive'
    | 'nordic'
    | 'biophilic'
    | 'obsidian'
    | 'click';
  heroBannerText: string;
  accentEmoji: string;
}
