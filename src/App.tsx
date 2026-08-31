/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { getHijriDate, getMoonPhase } from './utils/hijriAstronomical';
import { soundEffects } from './utils/audioEffects';
import { AppSettings, HijriDateInfo, MoonPhaseInfo } from './types';
import { LunarClock } from './components/LunarClock';
import { HijriCalendarView } from './components/HijriCalendarView';
import { ShareCardModal } from './components/ShareCardModal';
import { SettingsModal } from './components/SettingsModal';
import { AboutModal } from './components/AboutModal';
import { SplashScreen } from './components/SplashScreen';
import { AppIconPreview } from './components/AppIconPreview';
import { PhoneWidgetModal } from './components/PhoneWidgetModal';
import { AppMenuModal } from './components/AppMenuModal';
import { InstallGuideModal } from './components/InstallGuideModal';
import { SudanesePromoAudio } from './components/SudanesePromoAudio';
import { usePwaInstall } from './hooks/usePwaInstall';
import {
  Menu,
  Moon,
  Smartphone,
  Calendar,
  Share2,
  Settings,
  Info,
  Sparkles,
  Download,
  CheckCircle2
} from 'lucide-react';

const DEFAULT_SETTINGS: AppSettings = {
  hijriAdjustment: 0,
  theme: 'dark',
  notificationsEnabled: true,
  notificationTime: '06:00',
  language: 'ar',
  soundEffects: true,
};

export default function App() {
  // Splash Screen State
  const [showSplash, setShowSplash] = useState(true);

  // Settings State with LocalStorage
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('hijri_app_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Active Date Offset (in days relative to today)
  const [dayOffset, setDayOffset] = useState(0);

  // PWA Install Hook
  const {
    isInstallable,
    isInstalled,
    showManualGuide,
    setShowManualGuide,
    triggerInstall
  } = usePwaInstall();

  // Modals state
  const [showMenu, setShowMenu] = useState(false);
  const [showWidgets, setShowWidgets] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showAppIcon, setShowAppIcon] = useState(false);
  const [showPromoAudioModal, setShowPromoAudioModal] = useState(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Update localStorage when settings change
  useEffect(() => {
    try {
      localStorage.setItem('hijri_app_settings', JSON.stringify(settings));
    } catch {}
  }, [settings]);

  // Current Date Object calculated with user adjustment and day navigation offset
  const currentDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + Math.round(dayOffset));
    return d;
  }, [dayOffset]);

  // Calculated Hijri Date & Moon Phase
  const currentHijri: HijriDateInfo = useMemo(() => {
    return getHijriDate(currentDate, settings.hijriAdjustment);
  }, [currentDate, settings.hijriAdjustment]);

  const moonPhase: MoonPhaseInfo = useMemo(() => {
    return getMoonPhase(currentDate, settings.hijriAdjustment);
  }, [currentDate, settings.hijriAdjustment]);

  // Selected Month Index for clock dial highlight
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(currentHijri.monthIndex);

  useEffect(() => {
    setSelectedMonthIndex(currentHijri.monthIndex);
  }, [currentHijri.monthIndex]);

  // Day navigation handlers
  const handlePrevDay = () => {
    setDayOffset((prev) => prev - 1);
    if (settings.soundEffects) soundEffects.playTick();
  };

  const handleNextDay = () => {
    setDayOffset((prev) => prev + 1);
    if (settings.soundEffects) soundEffects.playTick();
  };

  const handlePrevMonth = () => {
    setDayOffset((prev) => prev - 29.53);
    if (settings.soundEffects) soundEffects.playChime();
  };

  const handleNextMonth = () => {
    setDayOffset((prev) => prev + 29.53);
    if (settings.soundEffects) soundEffects.playChime();
  };

  const handleGoToday = () => {
    setDayOffset(0);
    setSelectedMonthIndex(getHijriDate(new Date(), settings.hijriAdjustment).monthIndex);
    if (settings.soundEffects) soundEffects.playChime();
  };

  // Month select handler from clock dial
  const handleSelectMonth = (monthIndex: number) => {
    setSelectedMonthIndex(monthIndex);
    const todayHijri = getHijriDate(new Date(), settings.hijriAdjustment);
    const monthDiff = monthIndex - todayHijri.monthIndex;
    const newOffset = Math.round(monthDiff * 29.53 - (todayHijri.day - 1));
    setDayOffset(newOffset);
    if (settings.soundEffects) soundEffects.playChime();
  };

  // Jump from calendar modal
  const handleSelectDateFromCalendar = (year: number, monthIndex: number, day: number) => {
    const todayHijri = getHijriDate(new Date(), settings.hijriAdjustment);
    const monthDiff = (year - todayHijri.year) * 12 + (monthIndex - todayHijri.monthIndex);
    const dayDiff = monthDiff * 29.53 + (day - todayHijri.day);
    setDayOffset(Math.round(dayDiff));
    if (settings.soundEffects) soundEffects.playChime();
  };

  // Trigger Install Handler
  const handleInstallClick = async () => {
    if (settings.soundEffects) soundEffects.playChime();
    const result = await triggerInstall();
    if (result === 'installed') {
      setNotificationToast('🌙 تم تثبيت تطبيق التاريخ الهجري بنجاح على هاتفك!');
      setTimeout(() => setNotificationToast(null), 5000);
    }
  };

  // Notification simulation + Native Web Notification
  const handleTriggerTestNotification = () => {
    const message = `🌙 اليوم ${currentHijri.day} ${currentHijri.monthNameAr} ${currentHijri.year} هـ (${moonPhase.nameAr})`;
    setNotificationToast(message);

    if (settings.soundEffects) soundEffects.playChime();

    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        try {
          new Notification('التاريخ الهجري | ساعة الزمن القمري', {
            body: `${currentHijri.dayNameAr} ${currentHijri.day} ${currentHijri.monthNameAr} ${currentHijri.year} هـ - ${moonPhase.nameAr}`,
            icon: '/icon-192.png',
          });
        } catch {}
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            try {
              new Notification('التاريخ الهجري | ساعة الزمن القمري', {
                body: `${currentHijri.dayNameAr} ${currentHijri.day} ${currentHijri.monthNameAr} ${currentHijri.year} هـ`,
              });
            } catch {}
          }
        });
      }
    }

    setTimeout(() => {
      setNotificationToast(null);
    }, 4500);
  };

  const isLight = settings.theme === 'light';

  return (
    <div className={`min-h-screen w-full relative transition-colors duration-500 overflow-x-hidden flex flex-col justify-between ${
      isLight ? 'bg-[#f4f7fb] text-slate-900' : 'bg-[#05070c] text-slate-100'
    }`}>
      
      {/* Short & Elegant Splash Screen */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* Starry Night Atmosphere Background */}
      {!isLight && (
        <>
          <div className="fixed inset-0 stars-bg opacity-75 pointer-events-none" />
          <div className="fixed inset-0 bg-radial from-amber-500/5 via-slate-950/60 to-[#04060a] pointer-events-none" />
        </>
      )}

      {/* Toast Alert */}
      {notificationToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-amber-500 to-amber-600 text-slate-950 font-bold shadow-2xl flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-xl">🌙</span>
            <span>{notificationToast}</span>
          </div>
          <button
            onClick={() => setNotificationToast(null)}
            className="text-slate-950 p-1 hover:bg-black/10 rounded-lg text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <div className="relative z-10 max-w-md mx-auto w-full px-3 sm:px-4 py-3 flex flex-col min-h-screen justify-between">
        
        {/* =================================================================== */}
        {/* TOP BAR: Logo, Title & Direct Install Button                        */}
        {/* =================================================================== */}
        <header className="w-full flex items-center justify-between pb-2 pt-1 border-b border-slate-800/60 gap-2">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500/25 to-yellow-400/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
              <Moon className="w-4 h-4 fill-amber-400/30 text-amber-400" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black font-amiri text-amber-400 leading-tight">
                التاريخ الهجري
              </h1>
              <p className="text-[10px] text-slate-400 font-medium">ساعة هجرية قمرية</p>
            </div>
          </div>

          {/* Actions: Direct Install Button + Menu */}
          <div className="flex items-center gap-1.5">
            
            {/* Prominent Direct Install Button (Visible when not installed) */}
            {isInstallable && (
              <button
                id="btn-install-app-top"
                onClick={handleInstallClick}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-[11px] sm:text-xs shadow-[0_0_14px_rgba(16,185,129,0.35)] transition-all active:scale-95 cursor-pointer animate-pulse"
                title="تثبيت التطبيق على الهاتف"
              >
                <span>📲</span>
                <span className="font-cairo whitespace-nowrap">تثبيت التطبيق</span>
              </button>
            )}

            {/* Phone Widgets Quick Button */}
            <button
              id="btn-nav-widgets"
              onClick={() => setShowWidgets(true)}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-slate-800 text-xs transition-colors flex items-center gap-1 cursor-pointer"
              title="ودجات شاشة الهاتف"
            >
              <Smartphone className="w-4 h-4 text-amber-400" />
            </button>

            {/* Menu Drawer Button */}
            <button
              id="btn-nav-menu"
              onClick={() => setShowMenu(true)}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 transition-colors cursor-pointer"
              title="القائمة والخيارات"
            >
              <Menu className="w-4 h-4 text-amber-400" />
            </button>
          </div>

        </header>

        {/* =================================================================== */}
        {/* MAIN BODY: THE LUNAR CLOCK                                          */}
        {/* =================================================================== */}
        <main className="w-full flex-1 flex flex-col items-center justify-center my-auto py-1">
          <LunarClock
            currentHijri={currentHijri}
            moonPhase={moonPhase}
            selectedMonthIndex={selectedMonthIndex}
            onSelectMonth={handleSelectMonth}
            onPrevDay={handlePrevDay}
            onNextDay={handleNextDay}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onToday={handleGoToday}
            isCustomDate={dayOffset !== 0}
            onOpenCalendar={() => setShowCalendar(true)}
            onOpenShare={() => setShowShare(true)}
          />
        </main>

        {/* =================================================================== */}
        {/* FOOTER & OFFICIAL DESIGNER SIGNATURE                                */}
        {/* =================================================================== */}
        <footer className="w-full mt-2 pt-2 border-t border-slate-800/60 text-center space-y-1 text-xs text-slate-400">
          
          <div className="flex items-center justify-center gap-2 text-slate-300 text-[11px]">
            <span>تصميم: <strong className="text-white font-medium">كمال جعفر زكريا</strong></span>
            <span>•</span>
            <a
              href="https://wa.me/249919980435"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-mono"
            >
              واتساب: 00249919980435
            </a>
          </div>

          <div className="text-[10px] text-amber-200/70">
            مع تحيات الهدي والنور للتطبيقات والمواقع الإسلامية
          </div>

        </footer>

      </div>

      {/* ===================================================================== */}
      {/* MODALS & FEATURES ON DEMAND                                           */}
      {/* ===================================================================== */}

      {/* Fallback Install Guide Modal (when direct prompt unsupported on browser) */}
      {showManualGuide && (
        <InstallGuideModal onClose={() => setShowManualGuide(false)} />
      )}

      {/* Main Menu Modal */}
      {showMenu && (
        <AppMenuModal
          onClose={() => setShowMenu(false)}
          onInstallApp={handleInstallClick}
          isInstalled={isInstalled}
          onOpenWidgets={() => setShowWidgets(true)}
          onOpenCalendar={() => setShowCalendar(true)}
          onOpenShare={() => setShowShare(true)}
          onOpenAppIcon={() => setShowAppIcon(true)}
          onOpenPromo={() => setShowPromoAudioModal(true)}
          onOpenSettings={() => setShowSettings(true)}
          onOpenAbout={() => setShowAbout(true)}
          onTestNotification={handleTriggerTestNotification}
        />
      )}

      {/* Widgets Modal */}
      {showWidgets && (
        <PhoneWidgetModal
          currentHijri={currentHijri}
          moonPhase={moonPhase}
          onClose={() => setShowWidgets(false)}
        />
      )}

      {/* Hijri Calendar Modal */}
      {showCalendar && (
        <HijriCalendarView
          currentHijriYear={currentHijri.year}
          currentHijriMonth={currentHijri.monthIndex}
          currentHijriDay={currentHijri.day}
          adjustmentDays={settings.hijriAdjustment}
          onSelectDate={handleSelectDateFromCalendar}
          onClose={() => setShowCalendar(false)}
        />
      )}

      {/* Share Date Card Modal */}
      {showShare && (
        <ShareCardModal
          currentHijri={currentHijri}
          moonPhase={moonPhase}
          onClose={() => setShowShare(false)}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          settings={settings}
          currentHijri={currentHijri}
          onUpdateSettings={(newVals) => setSettings((prev) => ({ ...prev, ...newVals }))}
          onOpenAbout={() => {
            setShowSettings(false);
            setShowAbout(true);
          }}
          onClose={() => setShowSettings(false)}
          onTestNotification={handleTriggerTestNotification}
        />
      )}

      {/* About Modal */}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}

      {/* App Icon Preview Modal */}
      {showAppIcon && <AppIconPreview onClose={() => setShowAppIcon(false)} />}

      {/* Dedicated Sudanese Promo Audio Modal */}
      {showPromoAudioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-5 shadow-2xl text-slate-100 my-auto">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <h3 className="font-bold text-amber-400 text-base font-amiri">الإعلان الصوتي الحماسي</h3>
              <button
                onClick={() => setShowPromoAudioModal(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            <SudanesePromoAudio onClose={() => setShowPromoAudioModal(false)} />
          </div>
        </div>
      )}

    </div>
  );
}
