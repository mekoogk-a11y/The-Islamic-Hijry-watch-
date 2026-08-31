import { HijriDateInfo, HijriMonthMeta, IslamicEvent, MoonPhaseInfo, MoonPhaseType } from '../types';

export const HIJRI_MONTHS: HijriMonthMeta[] = [
  { index: 0, number: 1, nameAr: 'محرّم', nameEn: 'Muharram', isSacred: true, seasonOrSignificanceAr: 'فاتحة السنة الهجرية ومن الأشهر الحُرم', colorTheme: '#d4af37' },
  { index: 1, number: 2, nameAr: 'صفر', nameEn: 'Safar', isSacred: false, seasonOrSignificanceAr: 'الشهر الثاني من السنة الهجرية', colorTheme: '#64748b' },
  { index: 2, number: 3, nameAr: 'ربيع الأول', nameEn: 'Rabiʻ al-Awwal', isSacred: false, seasonOrSignificanceAr: 'شهر مولد النبي ﷺ والربيع النبوي', colorTheme: '#10b981' },
  { index: 3, number: 4, nameAr: 'ربيع الآخر', nameEn: 'Rabiʻ al-Thani', isSacred: false, seasonOrSignificanceAr: 'الشهر الرابع من السنة الهجرية', colorTheme: '#059669' },
  { index: 4, number: 5, nameAr: 'جمادى الأولى', nameEn: 'Jumada al-Ula', isSacred: false, seasonOrSignificanceAr: 'الشهر الخامس من السنة الهجرية', colorTheme: '#0284c7' },
  { index: 5, number: 6, nameAr: 'جمادى الآخرة', nameEn: 'Jumada al-Akhirah', isSacred: false, seasonOrSignificanceAr: 'الشهر السادس من السنة الهجرية', colorTheme: '#2563eb' },
  { index: 6, number: 7, nameAr: 'رجب', nameEn: 'Rajab', isSacred: true, seasonOrSignificanceAr: 'رجب الأصمّ، شهر الفرد ومن الأشهر الحُرم', colorTheme: '#f59e0b' },
  { index: 7, number: 8, nameAr: 'شعبان', nameEn: 'Shaʻban', isSacred: false, seasonOrSignificanceAr: 'تُرفع فيه الأعمال إلى رب العالمين', colorTheme: '#8b5cf6' },
  { index: 8, number: 9, nameAr: 'رمضان', nameEn: 'Ramadan', isSacred: false, seasonOrSignificanceAr: 'سيد الشهور، شهر الصيام وليلة القدر والقرآن', colorTheme: '#eab308' },
  { index: 9, number: 10, nameAr: 'شوال', nameEn: 'Shawwal', isSacred: false, seasonOrSignificanceAr: 'مستهله عيد الفطر ويسن فيه صيام الست', colorTheme: '#ec4899' },
  { index: 10, number: 11, nameAr: 'ذو القعدة', nameEn: 'Dhu al-Qiʻdah', isSacred: true, seasonOrSignificanceAr: 'قعود عن القتال وهو من الأشهر الحُرم', colorTheme: '#d97706' },
  { index: 11, number: 12, nameAr: 'ذو الحجة', nameEn: 'Dhu al-Hijjah', isSacred: true, seasonOrSignificanceAr: 'شهر الحج الأكبر وعيد الأضحى والأيام الفاضلة', colorTheme: '#f59e0b' },
];

export const ISLAMIC_EVENTS: IslamicEvent[] = [
  { monthIndex: 0, day: 1, titleAr: 'رأس السنة الهجرية', descriptionAr: 'بداية العام الهجري الجديد المبارك', type: 'major' },
  { monthIndex: 0, day: 9, titleAr: 'تاسوعاء', descriptionAr: 'صيام تاسوعاء سنة نبوية', type: 'fasting' },
  { monthIndex: 0, day: 10, titleAr: 'يوم عاشوراء', descriptionAr: 'يوم نجى الله فيه موسى عليه السلام، ويُسن صيامه', type: 'fasting' },
  { monthIndex: 2, day: 12, titleAr: 'المولد النبوي الشريف', descriptionAr: 'ذكرى مولد خير الأنام محمد ﷺ', type: 'major' },
  { monthIndex: 6, day: 27, titleAr: 'ذكرى الإسراء والمعراج', descriptionAr: 'معجزة الإسراء والمعراج وفرض الصلوات الخمس', type: 'historical' },
  { monthIndex: 7, day: 15, titleAr: 'ليلة النصف من شعبان', descriptionAr: 'ليلة مباركة تحول فيها القبلة وترجى فيها المغفرة', type: 'major' },
  { monthIndex: 8, day: 1, titleAr: 'غرة شهر رمضان المبارك', descriptionAr: 'أول أيام شهر الصيام والرحمة والغفران', type: 'major' },
  { monthIndex: 8, day: 17, titleAr: 'ذكرى غزوة بدر الكبرى', descriptionAr: 'يوم الفرقان يوم التقى الجمعان', type: 'historical' },
  { monthIndex: 8, day: 20, titleAr: 'فتح مكة المكرمة', descriptionAr: 'نصر الله المبين وإعزاز دينه', type: 'historical' },
  { monthIndex: 8, day: 27, titleAr: 'ليلة القدر (أرجى الليالي)', descriptionAr: 'خير من ألف شهر، تنزل الملائكة والروح فيها', type: 'major' },
  { monthIndex: 9, day: 1, titleAr: 'عيد الفطر المبارك', descriptionAr: 'جائزة الصائمين وفرحة إتمام شهر رمضان', type: 'major' },
  { monthIndex: 11, day: 1, titleAr: 'بداية العشر الأوائل من ذي الحجة', descriptionAr: 'أفضل أيام الدنيا والعمل الصالح فيها أحب إلى الله', type: 'major' },
  { monthIndex: 11, day: 8, titleAr: 'يوم التروية', descriptionAr: 'انطلاق الحجاج إلى منى في مناسك الحج', type: 'major' },
  { monthIndex: 11, day: 9, titleAr: 'يوم عرفة', descriptionAr: 'ركن الحج الأعظم، ويوم مغفرة الذنوب والعتق من النار', type: 'major' },
  { monthIndex: 11, day: 10, titleAr: 'عيد الأضحى المبارك', descriptionAr: 'يوم النحر الأكبر وفرحة المسلمين وذبح الأضاحي', type: 'major' },
  { monthIndex: 11, day: 11, titleAr: 'أول أيام التشريق', descriptionAr: 'أيام أكل وشرب وذكر لله تعالى', type: 'historical' },
  { monthIndex: 11, day: 12, titleAr: 'ثاني أيام التشريق', descriptionAr: 'يوم النفر الأول للمتعجلين', type: 'historical' },
  { monthIndex: 11, day: 13, titleAr: 'ثالث أيام التشريق', descriptionAr: 'ختام مناسك الحج', type: 'historical' },
];

const ARABIC_DAYS = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const ENGLISH_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ARABIC_GREG_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

/**
 * High-precision Hijri & Gregorian date calculation
 */
export function getHijriDate(date: Date = new Date(), adjustmentDays: number = 0): HijriDateInfo {
  // Apply manual adjustment in milliseconds
  const targetDate = new Date(date.getTime() + adjustmentDays * 24 * 60 * 60 * 1000);

  let hDay = 1;
  let hMonthIndex = 0;
  let hYear = 1448;

  try {
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    const parts = formatter.formatToParts(targetDate);
    for (const part of parts) {
      if (part.type === 'day') hDay = parseInt(part.value, 10);
      if (part.type === 'month') hMonthIndex = parseInt(part.value, 10) - 1;
      if (part.type === 'year') hYear = parseInt(part.value, 10);
    }
  } catch {
    // Fallback algorithmic calculation if Intl format is not supported
    const jd = getJulianDate(targetDate);
    const calculated = julianToHijri(jd);
    hDay = calculated.day;
    hMonthIndex = calculated.monthIndex;
    hYear = calculated.year;
  }

  // Bound check
  if (hMonthIndex < 0 || hMonthIndex > 11) {
    hMonthIndex = ((hMonthIndex % 12) + 12) % 12;
  }

  const monthMeta = HIJRI_MONTHS[hMonthIndex] || HIJRI_MONTHS[0];
  const dayOfWeek = targetDate.getDay();
  const isWhiteDay = hDay === 13 || hDay === 14 || hDay === 15;

  const islamicEvent = ISLAMIC_EVENTS.find(e => e.monthIndex === hMonthIndex && e.day === hDay)?.titleAr;

  const gregDay = targetDate.getDate();
  const gregMonthAr = ARABIC_GREG_MONTHS[targetDate.getMonth()];
  const gregYear = targetDate.getFullYear();
  const gregorianFormattedAr = `${gregDay} ${gregMonthAr} ${gregYear} م`;
  const gregorianFormattedEn = targetDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  // Estimated days in current Hijri month (alternating 30/29 or calculated)
  const daysInMonth = getDaysInHijriMonth(hYear, hMonthIndex);

  return {
    day: hDay,
    monthIndex: hMonthIndex,
    monthNameAr: monthMeta.nameAr,
    monthNameEn: monthMeta.nameEn,
    year: hYear,
    dayNameAr: ARABIC_DAYS[dayOfWeek],
    dayNameEn: ENGLISH_DAYS[dayOfWeek],
    gregorianDate: targetDate,
    gregorianFormattedAr,
    gregorianFormattedEn,
    isSacredMonth: monthMeta.isSacred,
    sacredMonthTitle: monthMeta.isSacred ? 'من الأشهر الحُرُم' : undefined,
    isWhiteDay,
    islamicEvent,
    daysInMonth,
  };
}

/**
 * Astronomical Lunar Phase Calculation
 */
export function getMoonPhase(date: Date = new Date(), adjustmentDays: number = 0): MoonPhaseInfo {
  const targetDate = new Date(date.getTime() + adjustmentDays * 24 * 60 * 60 * 1000);
  
  // Known reference new moon: 2000-01-06 18:14 UTC
  const refDate = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
  const synodicMonth = 29.53058867; // Days in a lunar cycle
  
  const diffDays = (targetDate.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24);
  let age = diffDays % synodicMonth;
  if (age < 0) age += synodicMonth;

  // Illumination calculation (Cosine curve)
  const angle = (age / synodicMonth) * 2 * Math.PI;
  const illumination = Math.round(((1 - Math.cos(angle)) / 2) * 1000) / 10; // 0 to 100%

  let phase: MoonPhaseType;
  let nameAr = '';
  let nameEn = '';
  let symbol = '🌕';
  let descriptionAr = '';

  if (age < 1.84566) {
    phase = 'new_moon';
    nameAr = 'محاق';
    nameEn = 'New Moon';
    symbol = '🌑';
    descriptionAr = 'القمر في أدنى مستويات الرؤية، محاذٍ للشمس إيذاناً بولادة الشهر القمري الجديد.';
  } else if (age < 5.53699) {
    phase = 'waxing_crescent';
    nameAr = 'هلال متزايد';
    nameEn = 'Waxing Crescent';
    symbol = '🌒';
    descriptionAr = 'قوس النور الهلالي يزداد ضياءً في الأفق الغربي بعد غروب الشمس.';
  } else if (age < 9.22831) {
    phase = 'first_quarter';
    nameAr = 'تربيع أول';
    nameEn = 'First Quarter';
    symbol = '🌓';
    descriptionAr = 'نصف القرص القمري مضاء تماماً، يعبر منتصف السماء عند الغروب.';
  } else if (age < 12.91963) {
    phase = 'waxing_gibbous';
    nameAr = 'أحدب متزايد';
    nameEn = 'Waxing Gibbous';
    symbol = '🌔';
    descriptionAr = 'النور يغمر غالبية وجه القمر متجهاً نحو الاكتمال والبدر المنير.';
  } else if (age < 16.61096) {
    phase = 'full_moon';
    nameAr = 'بدر مكتمل';
    nameEn = 'Full Moon';
    symbol = '🌕';
    descriptionAr = 'ليلة البدر التمام، القمر في أبهى حلله يضيء السماء من المغيب حتى الشروق (الأيام البيض).';
  } else if (age < 20.30228) {
    phase = 'waning_gibbous';
    nameAr = 'أحدب متناقص';
    nameEn = 'Waning Gibbous';
    symbol = '🌖';
    descriptionAr = 'يبدأ ضياء القمر بالتناقص التدريجي بعد ليلة البدر التمام.';
  } else if (age < 23.99361) {
    phase = 'last_quarter';
    nameAr = 'تربيع أخير';
    nameEn = 'Last Quarter';
    symbol = '🌗';
    descriptionAr = 'نصف القرص المقابل مضاء، يشرق في منتصف الليل تقريباً.';
  } else if (age < 27.68493) {
    phase = 'waning_crescent';
    nameAr = 'هلال متناقص';
    nameEn = 'Waning Crescent';
    symbol = '🌘';
    descriptionAr = 'هلال نهاية الشهر الرقيق يزين سماء الفجر قبيل الشروق.';
  } else {
    phase = 'new_moon';
    nameAr = 'محاق';
    nameEn = 'New Moon';
    symbol = '🌑';
    descriptionAr = 'نهاية الدورة القمرية وبداية دورة فلكية جديدة بحول الله.';
  }

  // Days until next full moon and new moon
  const daysToFull = (14.765 - age + synodicMonth) % synodicMonth;
  const daysToNew = (synodicMonth - age) % synodicMonth;

  const nextFullDateObj = new Date(targetDate.getTime() + daysToFull * 24 * 60 * 60 * 1000);
  const nextNewDateObj = new Date(targetDate.getTime() + daysToNew * 24 * 60 * 60 * 1000);

  const nextFullMoonDate = `${nextFullDateObj.getDate()} ${ARABIC_GREG_MONTHS[nextFullDateObj.getMonth()]}`;
  const nextNewMoonDate = `${nextNewDateObj.getDate()} ${ARABIC_GREG_MONTHS[nextNewDateObj.getMonth()]}`;

  return {
    phase,
    nameAr,
    nameEn,
    symbol,
    illumination,
    ageInDays: Math.round(age * 10) / 10,
    isBadr: phase === 'full_moon' || illumination >= 94,
    nextFullMoonDate,
    nextNewMoonDate,
    descriptionAr,
  };
}

/**
 * Approximate days in a specific Hijri month (29 or 30)
 */
export function getDaysInHijriMonth(year: number, monthIndex: number): number {
  // Common Umm al-Qura pattern: odd months usually 30, even usually 29, with leap year adjustments
  if (monthIndex % 2 === 0) return 30; // Muharram, Rabi I, Jumada I, Rajab, Ramadan, Dhu al-Qi'dah
  if (monthIndex === 11) {
    // Dhu al-Hijjah in leap years is 30 days
    const isLeap = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29].includes(year % 30);
    return isLeap ? 30 : 29;
  }
  return 29;
}

/**
 * Generate full Hijri calendar days for a given Hijri Year & Month
 */
export function getHijriMonthCalendarDays(year: number, monthIndex: number, adjustmentDays: number = 0) {
  const daysCount = getDaysInHijriMonth(year, monthIndex);
  const monthMeta = HIJRI_MONTHS[monthIndex];

  // We find corresponding Gregorian date for day 1
  const approxGregorian = hijriToGregorian(year, monthIndex + 1, 1);
  const day1Date = new Date(approxGregorian.getTime() + adjustmentDays * 24 * 60 * 60 * 1000);
  const firstDayOfWeek = day1Date.getDay(); // 0 = Sunday

  const days = [];
  for (let d = 1; d <= daysCount; d++) {
    const currentDate = new Date(day1Date.getTime() + (d - 1) * 24 * 60 * 60 * 1000);
    const dayOfWeek = currentDate.getDay();
    const isWhiteDay = d === 13 || d === 14 || d === 15;
    const islamicEvent = ISLAMIC_EVENTS.find(e => e.monthIndex === monthIndex && e.day === d);
    const moonPhase = getMoonPhase(currentDate, 0);

    days.push({
      day: d,
      monthIndex,
      year,
      monthMeta,
      gregorianDate: currentDate,
      gregorianDay: currentDate.getDate(),
      gregorianMonthAr: ARABIC_GREG_MONTHS[currentDate.getMonth()],
      dayNameAr: ARABIC_DAYS[dayOfWeek],
      dayNameEn: ENGLISH_DAYS[dayOfWeek],
      isWhiteDay,
      isSacred: monthMeta.isSacred,
      islamicEvent: islamicEvent?.titleAr,
      islamicEventType: islamicEvent?.type,
      moonSymbol: moonPhase.symbol,
      illumination: moonPhase.illumination,
    });
  }

  return {
    year,
    monthIndex,
    monthMeta,
    daysCount,
    firstDayOfWeek,
    days,
  };
}

/**
 * Julian date helper
 */
function getJulianDate(date: Date): number {
  const time = date.getTime();
  return time / 86400000 + 2440587.5;
}

function julianToHijri(jd: number) {
  const l = Math.floor(jd - 1948440 + 10632);
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = (Math.floor((10985 - l2) / 5316)) * (Math.floor((50 * l2) / 17719)) + (Math.floor(l2 / 5670)) * (Math.floor((43 * l2) / 15238));
  const l3 = l2 - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  const month = Math.floor((24 * l3) / 709);
  const day = l3 - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  return { day, monthIndex: month - 1, year };
}

function hijriToGregorian(year: number, month: number, day: number): Date {
  const jd = Math.floor((11 * year + 3) / 30) + 354 * year + 30 * month - Math.floor((month - 1) / 2) + day + 1948440 - 385;
  // Convert JD to Gregorian Date
  const z = Math.floor(jd + 0.5);
  const a = Math.floor((z - 1867216.25) / 36524.25);
  const b = z + 1 + a - Math.floor(a / 4);
  const c = b + 1524;
  const d = Math.floor((c - 122.1) / 365.25);
  const e = Math.floor(365.25 * d);
  const g = Math.floor((c - e) / 30.6001);
  const m = g < 14 ? g - 1 : g - 13;
  const y = m > 2 ? d - 4716 : d - 4715;
  const gDay = c - e - Math.floor(30.6001 * g);
  
  return new Date(y, m - 1, gDay);
}

/**
 * Format numbers with Eastern Arabic / Western Arabic digits
 */
export function formatArabicNumber(num: number): string {
  return num.toString();
}
