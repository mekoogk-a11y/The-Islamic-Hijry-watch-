import React, { useState } from 'react';
import { HijriDateInfo, MoonPhaseInfo } from '../types';
import { X, Smartphone, Check, Copy, Sparkles, Layers, Moon } from 'lucide-react';

interface PhoneWidgetModalProps {
  currentHijri: HijriDateInfo;
  moonPhase: MoonPhaseInfo;
  onClose: () => void;
}

export const PhoneWidgetModal: React.FC<PhoneWidgetModalProps> = ({
  currentHijri,
  moonPhase,
  onClose,
}) => {
  const [selectedWidgetType, setSelectedWidgetType] = useState<'small' | 'medium' | 'lockscreen'>('small');
  const [copied, setCopied] = useState(false);

  const handleCopyWidgetText = () => {
    const text = `🌕 ${currentHijri.day} ${currentHijri.monthNameAr} ${currentHijri.year} هـ`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-100 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base sm:text-lg font-amiri">ودجات شاشة الهاتف (Widgets)</h3>
              <p className="text-xs text-slate-400 font-sans">عرض التاريخ الهجري على شاشة هاتفك الرئيسية دون فتح التطبيق</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Widget Size Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-4 bg-slate-950/60 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setSelectedWidgetType('small')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              selectedWidgetType === 'small'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ودجت صغير (2×2)
          </button>
          <button
            onClick={() => setSelectedWidgetType('medium')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              selectedWidgetType === 'medium'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ودجت مستطيل (4×2)
          </button>
          <button
            onClick={() => setSelectedWidgetType('lockscreen')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              selectedWidgetType === 'lockscreen'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            شاشة القفل (Lock)
          </button>
        </div>

        {/* Realistic Mobile Phone Screen Mockup Preview */}
        <div className="relative w-full py-6 px-4 rounded-2xl bg-gradient-to-b from-[#0c1220] via-[#070b14] to-[#04060a] border border-slate-800 flex flex-col items-center justify-center mb-5 shadow-inner">
          
          <div className="text-[10px] text-slate-500 mb-3 flex items-center gap-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            معاينة شكل الودجت على شاشة أندرويد / آيفون
          </div>

          {/* Small 2x2 Widget Mockup */}
          {selectedWidgetType === 'small' && (
            <div className="relative w-40 h-40 rounded-3xl p-3.5 bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-950 border border-amber-500/30 shadow-[0_10px_25px_rgba(0,0,0,0.7)] flex flex-col items-center justify-between text-center select-none transform hover:scale-105 transition-transform">
              {/* Moon Badge */}
              <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.7),inset_3px_3px_6px_rgba(255,255,255,0.7),0_0_15px_rgba(245,158,11,0.4)] border border-amber-300/40 flex items-center justify-center bg-radial from-slate-100 via-slate-300 to-slate-500">
                <span className="text-xl">🌕</span>
              </div>

              {/* Date Text */}
              <div className="my-auto">
                <div className="text-[11px] text-amber-400 font-bold">يوم {currentHijri.dayNameAr}</div>
                <div className="text-slate-100 font-amiri font-black text-lg leading-tight">
                  {currentHijri.day} {currentHijri.monthNameAr}
                </div>
                <div className="text-[10px] text-slate-400 font-semibold">{currentHijri.year} هـ</div>
              </div>

              <div className="text-[9px] text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded-full border border-slate-800">
                {currentHijri.gregorianFormattedAr}
              </div>
            </div>
          )}

          {/* Medium 4x2 Widget Mockup */}
          {selectedWidgetType === 'medium' && (
            <div className="relative w-72 sm:w-80 h-32 rounded-3xl p-4 bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-950 border border-amber-500/30 shadow-[0_10px_25px_rgba(0,0,0,0.7)] flex items-center justify-between select-none transform hover:scale-105 transition-transform">
              
              {/* Left Moon Dial */}
              <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-[inset_-6px_-6px_12px_rgba(0,0,0,0.8),inset_4px_4px_8px_rgba(255,255,255,0.8),0_0_20px_rgba(245,158,11,0.4)] border border-amber-300/50 flex flex-col items-center justify-center bg-radial from-slate-100 via-slate-300 to-slate-500 shrink-0">
                <span className="text-2xl">🌕</span>
                <span className="text-[9px] font-bold text-slate-950 bg-amber-400/90 px-1 rounded mt-0.5">{moonPhase.nameAr}</span>
              </div>

              {/* Right Details */}
              <div className="flex-1 pr-4 text-right">
                <div className="text-xs text-amber-400 font-bold flex items-center justify-end gap-1">
                  <span>{currentHijri.dayNameAr}</span>
                  <span className="w-1 h-1 rounded-full bg-amber-400"></span>
                  <span className="text-[10px] text-slate-400">{currentHijri.monthMeta.seasonOrSignificanceAr.split(' ')[0]}</span>
                </div>
                <div className="text-slate-100 font-amiri font-black text-2xl leading-snug">
                  {currentHijri.day} {currentHijri.monthNameAr} {currentHijri.year} هـ
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  الموافق: {currentHijri.gregorianFormattedAr}
                </div>
              </div>
            </div>
          )}

          {/* Lock Screen Widget Mockup */}
          {selectedWidgetType === 'lockscreen' && (
            <div className="relative w-64 h-24 rounded-2xl p-3 bg-black/60 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-between select-none">
              <div className="text-3xl pr-2">🌕</div>
              <div className="flex-1 text-right pr-2">
                <div className="text-xs text-white/70">التقويم القمري</div>
                <div className="text-white font-amiri font-bold text-lg">
                  {currentHijri.day} {currentHijri.monthNameAr} {currentHijri.year} هـ
                </div>
                <div className="text-[10px] text-white/60">{currentHijri.dayNameAr} • {currentHijri.gregorianFormattedAr}</div>
              </div>
            </div>
          )}

        </div>

        {/* How to add to home screen instructions */}
        <div className="bg-slate-950/70 rounded-2xl p-3.5 border border-slate-800 mb-4 text-xs text-slate-300 space-y-2">
          <div className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>طريقة إضافة الودجت لشاشة هاتفك:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-400 leading-relaxed pr-1">
            <li>قم بتثبيت التطبيق على هاتفك عبر خيار <strong>«إضافة للشاشة الرئيسية / Install App»</strong>.</li>
            <li>المس مطولاً أي مساحة فارغة في شاشة هاتفك الرئيسية.</li>
            <li>اختر <strong>«التطبيقات المصغرة / Widgets»</strong> ثم اختر <strong>«السنة الهجرية»</strong>.</li>
            <li>اسحب الودجت وضعه في المكان المناسب على شاشة الهاتف.</li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyWidgetText}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md active:scale-98"
          >
            {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'تم نسخ نص التاريخ!' : 'نسخ نص التاريخ للودجت'}</span>
          </button>

          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
