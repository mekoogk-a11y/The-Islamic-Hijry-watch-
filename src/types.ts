export interface HijriDateInfo {
  day: number;
  monthIndex: number; // 0 to 11
  monthNameAr: string;
  monthNameEn: string;
  year: number;
  dayNameAr: string;
  dayNameEn: string;
  gregorianDate: Date;
  gregorianFormattedAr: string;
  gregorianFormattedEn: string;
  isSacredMonth: boolean;
  sacredMonthTitle?: string;
  isWhiteDay: boolean; // 13, 14, 15
  islamicEvent?: string;
  daysInMonth: number;
}

export type MoonPhaseType =
  | 'new_moon' // محاق
  | 'waxing_crescent' // هلال متزايد
  | 'first_quarter' // تربيع أول
  | 'waxing_gibbous' // أحدب متزايد
  | 'full_moon' // بدر
  | 'waning_gibbous' // أحدب متناقص
  | 'last_quarter' // تربيع أخير
  | 'waning_crescent'; // هلال متناقص

export interface MoonPhaseInfo {
  phase: MoonPhaseType;
  nameAr: string;
  nameEn: string;
  symbol: string;
  illumination: number; // 0 to 100%
  ageInDays: number; // 0 to 29.53
  isBadr: boolean;
  nextFullMoonDate: string;
  nextNewMoonDate: string;
  descriptionAr: string;
}

export interface HijriMonthMeta {
  index: number; // 0 to 11 (0 = Muharram, 11 = Dhu al-Hijjah)
  number: number; // 1 to 12
  nameAr: string;
  nameEn: string;
  isSacred: boolean;
  seasonOrSignificanceAr: string;
  colorTheme: string;
}

export interface IslamicEvent {
  monthIndex: number; // 0 to 11
  day: number;
  titleAr: string;
  descriptionAr: string;
  type: 'major' | 'fasting' | 'historical';
}

export interface AppSettings {
  hijriAdjustment: number; // -2, -1, 0, +1, +2
  theme: 'dark' | 'light';
  notificationsEnabled: boolean;
  notificationTime: string;
  language: 'ar' | 'en';
  soundEffects: boolean;
}
