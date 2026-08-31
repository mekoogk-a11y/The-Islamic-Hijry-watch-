import React from 'react';
import { X, Download } from 'lucide-react';

interface AppIconPreviewProps {
  onClose: () => void;
}

export const AppIconPreview: React.FC<AppIconPreviewProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl text-slate-100 my-auto text-center">
        
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="font-bold text-lg text-white mb-1">أيقونة التطبيق الرسمية</h3>
        <p className="text-xs text-slate-400 mb-6">قمر بدر داخل إطار ساعة فلكية دائرية</p>

        {/* The Official App Icon */}
        <div className="relative w-48 h-48 mx-auto rounded-[40px] bg-gradient-to-br from-[#0a0f1d] via-[#05070d] to-[#000000] p-4 border-2 border-amber-500/40 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.25)] flex items-center justify-center overflow-hidden">
          
          {/* Subtle star speckles */}
          <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

          {/* Clock Outer Ring & Precision Ticks */}
          <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] pointer-events-none" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="2" strokeDasharray="3 4" />
            <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            
            {/* 12 Hour Markers for the clock */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const x1 = 100 + 90 * Math.cos(angle);
              const y1 = 100 + 90 * Math.sin(angle);
              const x2 = 100 + 80 * Math.cos(angle);
              const y2 = 100 + 80 * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(245, 158, 11, 0.8)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {/* Golden Pointer Hands Indicating Lunar Time */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="w-[1px] h-20 bg-gradient-to-t from-transparent via-amber-400 to-amber-300 shadow-[0_0_8px_rgba(245,158,11,1)] origin-bottom -translate-y-6 rotate-45" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-white shadow-[0_0_8px_rgba(255,255,255,1)]" />
          </div>

          {/* Central Luminous 3D Full Moon */}
          <div
            className="relative w-28 h-28 rounded-full overflow-hidden shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.7),inset_8px_8px_16px_rgba(255,255,255,0.7),0_0_25px_rgba(245,158,11,0.5)] border border-slate-300/60 z-10 flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #f4f6fa 25%, #d1d9e6 55%, #9aa6b8 85%, #606d80 100%)',
            }}
          >
            {/* Crater details */}
            <div className="absolute top-6 left-6 w-5 h-4 rounded-full bg-slate-500/30 blur-[0.5px]" />
            <div className="absolute bottom-5 right-7 w-7 h-5 rounded-full bg-slate-600/30 blur-[0.5px]" />
            <div className="absolute top-10 right-5 w-4 h-4 rounded-full bg-slate-500/25 blur-[0.5px]" />
          </div>
        </div>

        {/* Small icon size preview simulation */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-center gap-4 text-xs text-slate-400">
          <span>معاينة بأحجام الهواتف:</span>
          <div className="w-10 h-10 rounded-xl bg-slate-950 border border-amber-500/50 flex items-center justify-center text-xs shadow-md">
            🌙
          </div>
          <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-amber-500/50 flex items-center justify-center text-lg shadow-md">
            🌙
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
        >
          تم
        </button>

      </div>
    </div>
  );
};
