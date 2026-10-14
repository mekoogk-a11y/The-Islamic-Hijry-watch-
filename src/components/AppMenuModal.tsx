import React from 'react';
import {
  X,
  Smartphone,
  Calendar,
  Layers,
  Share2,
  Megaphone,
  Settings,
  Info,
  Download,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { KitabSunnahLogo } from './KitabSunnahLogo';

interface AppMenuModalProps {
  onClose: () => void;
  onInstallApp: () => void;
  isInstalled: boolean;
  onOpenWidgets: () => void;
  onOpenCalendar: () => void;
  onOpenShare: () => void;
  onOpenAppIcon: () => void;
  onOpenPromo: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  onTestNotification: () => void;
}

export const AppMenuModal: React.FC<AppMenuModalProps> = ({
  onClose,
  onInstallApp,
  isInstalled,
  onOpenWidgets,
  onOpenCalendar,
  onOpenShare,
  onOpenAppIcon,
  onOpenPromo,
  onOpenSettings,
  onOpenAbout,
  onTestNotification,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-3xl p-5 shadow-2xl text-slate-100 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-amber-400 text-base font-amiri">التاريخ الهجري</h3>
              <p className="text-[10px] text-slate-400">ساعة الزمن القمري للهاتف</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items List */}
        <div className="space-y-1.5 text-xs font-medium">
          
          {/* Direct Install Option in Menu (Only if not installed) */}
          {!isInstalled ? (
            <button
              onClick={() => {
                onClose();
                onInstallApp();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/40 text-emerald-300 transition-all text-right group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs">📲 تثبيت التطبيق على الهاتف</div>
                  <div className="text-[10px] text-emerald-400/90">إضافة فورية كأيقونة على الشاشة الرئيسية</div>
                </div>
              </div>
              <span className="text-emerald-400 text-xs font-bold">تثبيت</span>
            </button>
          ) : (
            <div className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>التطبيق مثبت على هاتفك ويعمل بشكل مستقل</span>
            </div>
          )}

          {/* Widgets */}
          <button
            onClick={() => {
              onClose();
              onOpenWidgets();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-all text-right group"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">ودجات شاشة الهاتف (Widgets)</div>
                <div className="text-[10px] text-slate-400">عرض التاريخ الهجري على الشاشة الرئيسية</div>
              </div>
            </div>
            <span className="text-amber-400 text-xs">←</span>
          </button>

          {/* Full Calendar */}
          <button
            onClick={() => {
              onClose();
              onOpenCalendar();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-all text-right group"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-blue-500/15 text-blue-400 group-hover:bg-blue-500 group-hover:text-slate-950 transition-colors">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">التقويم الهجري الكامل</div>
                <div className="text-[10px] text-slate-400">استعراض شهور وأيام السنة الهجرية</div>
              </div>
            </div>
            <span className="text-slate-400 text-xs">←</span>
          </button>

          {/* Share Today's Date */}
          <button
            onClick={() => {
              onClose();
              onOpenShare();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-all text-right group"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">مشاركة تاريخ اليوم كصورة</div>
                <div className="text-[10px] text-slate-400">بطاقة إسلامية فاخرة للواتساب</div>
              </div>
            </div>
            <span className="text-slate-400 text-xs">←</span>
          </button>

          {/* App Icon */}
          <button
            onClick={() => {
              onClose();
              onOpenAppIcon();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-all text-right group"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-400 group-hover:bg-purple-500 group-hover:text-slate-950 transition-colors">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">أيقونة الساعة القمرية للهاتف</div>
                <div className="text-[10px] text-slate-400">معاينة الأيقونة المصغرة الفخمة</div>
              </div>
            </div>
            <span className="text-slate-400 text-xs">←</span>
          </button>

          {/* Sudanese Promo Voice */}
          <button
            onClick={() => {
              onClose();
              onOpenPromo();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 transition-all text-right group"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <Megaphone className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-amber-300">الإعلان الصوتي الحماسي (سوداني)</div>
                <div className="text-[10px] text-amber-400/80">تشغيل بصوت رجالي حماسي</div>
              </div>
            </div>
            <span className="text-amber-400 text-xs">←</span>
          </button>

          {/* Settings */}
          <button
            onClick={() => {
              onClose();
              onOpenSettings();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-all text-right group"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300 group-hover:bg-slate-700 transition-colors">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">الإعدادات وتعديل رؤية الهلال</div>
                <div className="text-[10px] text-slate-400">ضبط ±1 يوم والإشعارات</div>
              </div>
            </div>
            <span className="text-slate-400 text-xs">←</span>
          </button>

          {/* Dedication & Logo Quick Card */}
          <button
            onClick={() => {
              onClose();
              onOpenAbout();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-teal-950/40 hover:from-emerald-950/70 hover:to-teal-950/60 border border-emerald-500/40 text-slate-200 transition-all text-right group shadow-md"
          >
            <div className="flex items-center gap-2.5">
              <KitabSunnahLogo size={32} />
              <div>
                <div className="font-bold text-emerald-300 text-xs sm:text-sm">إهداء التطبيق المبارك والشعار</div>
                <div className="text-[10px] text-slate-300">جمعية الكتاب والسنة الخيرية بالسودان 🇸🇩</div>
              </div>
            </div>
            <span className="text-emerald-400 text-xs font-bold">عرض ←</span>
          </button>

          {/* About */}
          <button
            onClick={() => {
              onClose();
              onOpenAbout();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-all text-right group"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300 group-hover:bg-slate-700 transition-colors">
                <Info className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <div className="font-bold text-white">حول التطبيق وبيانات المصمم</div>
                <div className="text-[10px] text-slate-400">تصميم: كمال جعفر زكريا (واتساب: 00249919980435)</div>
              </div>
            </div>
            <span className="text-amber-400 text-xs">←</span>
          </button>

        </div>

      </div>
    </div>
  );
};
