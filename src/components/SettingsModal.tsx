import React, { useState } from 'react';
import { AppSettings, HijriDateInfo } from '../types';
import { X, Moon, Sun, Bell, Sliders, Volume2, ShieldCheck, Share2, Info, Check, Sparkles } from 'lucide-react';
import { SudanesePromoAudio } from './SudanesePromoAudio';

interface SettingsModalProps {
  settings: AppSettings;
  currentHijri: HijriDateInfo;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onOpenAbout: () => void;
  onClose: () => void;
  onTestNotification: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  currentHijri,
  onUpdateSettings,
  onOpenAbout,
  onClose,
  onTestNotification,
}) => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareApp = async () => {
    const text = 'تطبيق «السنة الهجرية» | ساعة الزمن القمري والتقويم الإسلامي الفاخر 🌙';
    if (navigator.share) {
      try {
        await navigator.share({ title: 'السنة الهجرية', text, url: window.location.href });
      } catch {}
    } else {
      await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-100 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base sm:text-lg">إعدادات التطبيق</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="space-y-4 my-4 max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin">
          
          {/* Hijri Adjustment Setting ±2 days */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-bold text-sm text-white">تعديل التاريخ الهجري (رؤية الهلال)</h4>
                <p className="text-[11px] text-slate-400">ضبط التقويم حسب الرؤية الشرعية لبلدك</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs font-cinzel">
                {settings.hijriAdjustment > 0 ? `+${settings.hijriAdjustment}` : settings.hijriAdjustment} يوم
              </span>
            </div>

            <div className="flex items-center justify-between gap-1.5 pt-2">
              {[-2, -1, 0, 1, 2].map((val) => (
                <button
                  key={val}
                  onClick={() => onUpdateSettings({ hijriAdjustment: val })}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    settings.hijriAdjustment === val
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {val === 0 ? 'تلقائي (0)' : val > 0 ? `+${val}` : `${val}`}
                </button>
              ))}
            </div>

            <div className="mt-2 text-[11px] text-slate-400 text-center bg-slate-900/80 py-1 px-2 rounded-lg">
              التاريخ بعد التعديل: <span className="text-amber-300 font-semibold">{currentHijri.day} {currentHijri.monthNameAr} {currentHijri.year} هـ</span>
            </div>
          </div>

          {/* Daily Notifications */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                <div>
                  <h4 className="font-bold text-sm text-white">إشعار التاريخ الهجري اليومي</h4>
                  <p className="text-[11px] text-slate-400">إشعار صباحي يذكرك بتاريخ اليوم الهجري</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notificationsEnabled}
                  onChange={(e) => onUpdateSettings({ notificationsEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {settings.notificationsEnabled && (
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-300">وقت التنبيه اليومي:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={settings.notificationTime}
                    onChange={(e) => onUpdateSettings({ notificationTime: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2 py-1 text-xs font-mono"
                  />
                  <button
                    onClick={onTestNotification}
                    className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-[11px] font-semibold transition-colors"
                  >
                    تجربة الإشعار
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Theme Switcher */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.theme === 'dark' ? (
                <Moon className="w-4 h-4 text-amber-400" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
              <div>
                <h4 className="font-bold text-sm text-white">المظهر البصري</h4>
                <p className="text-[11px] text-slate-400">سماء ليلية فلكية أو نهارية</p>
              </div>
            </div>

            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => onUpdateSettings({ theme: 'dark' })}
                className={`px-3 py-1 rounded-lg transition-all ${
                  settings.theme === 'dark' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                ليلي
              </button>
              <button
                onClick={() => onUpdateSettings({ theme: 'light' })}
                className={`px-3 py-1 rounded-lg transition-all ${
                  settings.theme === 'light' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                فاتح
              </button>
            </div>
          </div>

          {/* Sudanese Dialect Voice Promo Card Component */}
          <SudanesePromoAudio />

          {/* App Info & Links */}
          <div className="space-y-2 pt-1">
            <button
              onClick={onOpenAbout}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400" />
                <span>حول تطبيق السنة الهجرية وبيانات المصمم</span>
              </div>
              <span className="text-amber-400 text-xs">عرض ←</span>
            </button>

            <button
              onClick={() => setShowPrivacy(!showPrivacy)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>سياسة الخصوصية والأمان</span>
              </div>
              <span className="text-slate-400 text-xs">{showPrivacy ? 'إخفاء' : 'عرض'}</span>
            </button>

            {showPrivacy && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                تطبيق «السنة الهجرية» يحترم خصوصيتك بالكامل. جميع العمليات الحسابية الفلكية والتاريخ الهجري تتم محلياً على جهازك دون جمع أو مشاركة أي بيانات شخصية مع أي جهة خارجية.
              </div>
            )}

            <button
              onClick={handleShareApp}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition-colors"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-amber-400" />}
              <span>{copiedLink ? 'تم نسخ رابط التطبيق!' : 'مشاركة التطبيق مع الأصدقاء'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
