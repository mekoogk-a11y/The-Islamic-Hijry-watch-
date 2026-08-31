import React from 'react';
import { X, Smartphone, MoreVertical, PlusSquare, Check } from 'lucide-react';

interface InstallGuideModalProps {
  onClose: () => void;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({ onClose }) => {
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-3xl p-5 shadow-2xl text-slate-100 mb-2 sm:mb-0">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4 pr-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-xl">
              🌙
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white text-base font-amiri">تثبيت التاريخ الهجري</h3>
            <p className="text-[11px] text-slate-400">إضافة التطبيق كأيقونة على هاتفك</p>
          </div>
        </div>

        {/* Short & Direct Instruction */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 text-center my-2">
          {isIOS ? (
            <div className="space-y-2">
              <div className="text-xs text-slate-300">
                اضغط زر المشاركة <span className="font-bold text-amber-400">⎋ (Share)</span>
              </div>
              <div className="text-xs text-slate-300">
                ثم اختر <span className="font-bold text-emerald-400">«إضافة إلى الشاشة الرئيسية»</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-200">
                <span>اضغط على قائمة المتصفح</span>
                <span className="p-1 rounded bg-slate-800 text-amber-400 font-bold flex items-center">
                  <MoreVertical className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="text-xs font-bold text-emerald-400 pt-1 border-t border-slate-800/80">
                ثم اختر «إضافة إلى الشاشة الرئيسية»
              </div>
            </div>
          )}
        </div>

        {/* Done Button */}
        <button
          onClick={onClose}
          className="w-full mt-3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md active:scale-98"
        >
          حسناً، فهمت
        </button>

      </div>
    </div>
  );
};
