import React from 'react';
import { MoonPhaseInfo, MoonPhaseType } from '../types';
import { Sparkles, Eye, Clock, Compass } from 'lucide-react';

interface MoonPhaseCardProps {
  moonPhase: MoonPhaseInfo;
  onSelectPhasePreview?: (phase: MoonPhaseType) => void;
}

const ALL_PHASES: { type: MoonPhaseType; nameAr: string; symbol: string; dayRange: string }[] = [
  { type: 'new_moon', nameAr: 'محاق', symbol: '🌑', dayRange: 'يوم 1' },
  { type: 'waxing_crescent', nameAr: 'هلال متزايد', symbol: '🌒', dayRange: '2-6' },
  { type: 'first_quarter', nameAr: 'تربيع أول', symbol: '🌓', dayRange: '7-10' },
  { type: 'waxing_gibbous', nameAr: 'أحدب متزايد', symbol: '🌔', dayRange: '11-13' },
  { type: 'full_moon', nameAr: 'بدر', symbol: '🌕', dayRange: '14-16' },
  { type: 'waning_gibbous', nameAr: 'أحدب متناقص', symbol: '🌖', dayRange: '17-21' },
  { type: 'last_quarter', nameAr: 'تربيع أخير', symbol: '🌗', dayRange: '22-25' },
  { type: 'waning_crescent', nameAr: 'هلال متناقص', symbol: '🌘', dayRange: '26-29' },
];

export const MoonPhaseCard: React.FC<MoonPhaseCardProps> = ({
  moonPhase,
  onSelectPhasePreview,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-4 md:p-5 text-slate-200 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-lg">
            {moonPhase.symbol}
          </div>
          <div>
            <h3 className="font-bold text-sm md:text-base text-white flex items-center gap-1.5">
              <span>مرحلة القمر الحالية:</span>
              <span className="text-amber-400 font-amiri text-lg">{moonPhase.nameAr}</span>
            </h3>
            <p className="text-[11px] text-slate-400">الدورة الفلكية للشهر القمري</p>
          </div>
        </div>

        {moonPhase.isBadr && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>ليلة البدر التمام</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-xs md:text-sm text-slate-300 my-3 leading-relaxed bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/50">
        {moonPhase.descriptionAr}
      </p>

      {/* Astronomical Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-3 text-xs">
        <div className="bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-xl flex flex-col">
          <span className="text-slate-400 flex items-center gap-1 text-[11px]">
            <Eye className="w-3 h-3 text-amber-400" /> نسبة الإضاءة
          </span>
          <span className="text-base font-bold text-white font-cinzel mt-1">
            {moonPhase.illumination}%
          </span>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full transition-all duration-500"
              style={{ width: `${moonPhase.illumination}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-xl flex flex-col">
          <span className="text-slate-400 flex items-center gap-1 text-[11px]">
            <Clock className="w-3 h-3 text-cyan-400" /> عمر القمر
          </span>
          <span className="text-base font-bold text-white font-cinzel mt-1">
            {moonPhase.ageInDays} <span className="text-xs font-normal text-slate-400 font-cairo">يوم</span>
          </span>
          <span className="text-[10px] text-slate-500 mt-1">من 29.5 يوم</span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-xl flex flex-col justify-between">
          <span className="text-slate-400 flex items-center gap-1 text-[11px]">
            <Compass className="w-3 h-3 text-amber-400" /> البدر القادم
          </span>
          <span className="text-sm font-bold text-amber-300 mt-1">
            {moonPhase.nextFullMoonDate}
          </span>
          <span className="text-[10px] text-slate-500">المحاق: {moonPhase.nextNewMoonDate}</span>
        </div>
      </div>

      {/* 8 Moon Phases Sequence Strip */}
      <div className="mt-3 pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-slate-400">
            أطوار القمر الـثمانية (اضغط للانتقال للطور):
          </span>
          <span className="text-[10px] text-amber-400 font-medium">8 أطوار فلكية</span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
          {ALL_PHASES.map((p) => {
            const isActive = p.type === moonPhase.phase;
            return (
              <button
                key={p.type}
                id={`btn-phase-${p.type}`}
                onClick={() => onSelectPhasePreview?.(p.type)}
                className={`flex flex-col items-center justify-center p-1.5 rounded-xl text-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/25 border-2 border-amber-400 text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.3)] scale-105 z-10'
                    : 'bg-slate-950/40 border border-slate-800/60 text-slate-400 hover:border-amber-500/40 hover:text-slate-100 hover:scale-102'
                }`}
                title={`الانتقال إلى طور ${p.nameAr} (${p.dayRange})`}
              >
                <span className="text-base md:text-lg mb-0.5">{p.symbol}</span>
                <span className="text-[10px] font-medium leading-tight whitespace-nowrap">{p.nameAr}</span>
                <span className="text-[8px] text-slate-500 mt-0.5">{p.dayRange}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
