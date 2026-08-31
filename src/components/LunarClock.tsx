import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HIJRI_MONTHS } from '../utils/hijriAstronomical';
import { HijriDateInfo, MoonPhaseInfo } from '../types';
import { ChevronRight, ChevronLeft, RotateCcw, Sparkles } from 'lucide-react';

interface LunarClockProps {
  currentHijri: HijriDateInfo;
  moonPhase: MoonPhaseInfo;
  selectedMonthIndex: number;
  onSelectMonth: (monthIndex: number) => void;
  onPrevDay: () => void;
  onNextDay: () => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  isCustomDate: boolean;
  onOpenCalendar: () => void;
  onOpenShare: () => void;
}

export const LunarClock: React.FC<LunarClockProps> = ({
  currentHijri,
  moonPhase,
  selectedMonthIndex,
  onSelectMonth,
  onPrevDay,
  onNextDay,
  onPrevMonth,
  onNextMonth,
  onToday,
  isCustomDate,
}) => {
  // 12 Months positions: 12 o'clock = Muharram (idx 0), rotating clockwise by 30 deg
  const monthAngles = useMemo(() => {
    return HIJRI_MONTHS.map((m, idx) => {
      const angleDeg = idx * 30; // 0, 30, 60, ..., 330
      const angleRad = (angleDeg - 90) * (Math.PI / 180);
      return {
        ...m,
        angleDeg,
        angleRad,
      };
    });
  }, []);

  // Day needle angle: day 1 to 30 mapped to 360 degrees
  const dayAngle = useMemo(() => {
    const days = currentHijri.daysInMonth || 30;
    return ((currentHijri.day - 1) / days) * 360;
  }, [currentHijri.day, currentHijri.daysInMonth]);

  // Current Month Indicator Needle Angle
  const currentMonthAngle = useMemo(() => {
    return currentHijri.monthIndex * 30;
  }, [currentHijri.monthIndex]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none py-2 px-3">
      
      {/* Top Subtle Status Line: Sacred Month or Islamic Occasion */}
      <div className="h-6 mb-1 flex items-center justify-center text-center">
        {currentHijri.islamicEvent ? (
          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold text-xs animate-pulse">
            🌟 {currentHijri.islamicEvent}
          </span>
        ) : currentHijri.isSacredMonth ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-medium text-xs">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>من الأشهر الحُرُم ({currentHijri.monthNameAr})</span>
          </span>
        ) : currentHijri.isWhiteDay ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 font-medium text-xs">
            🌕 ليلة من الليالي البِيض المباركة
          </span>
        ) : null}
      </div>

      {/* ========================================================================= */}
      {/* LUNAR CLOCK BEZEL & DIAL (The Core Visual Centerpiece)                     */}
      {/* ========================================================================= */}
      <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] flex items-center justify-center my-2">
        
        {/* Luxury Outer Bezel Ring with subtle metallic gradient */}
        <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 bg-gradient-to-b from-slate-900/90 via-[#060913] to-[#04060a] shadow-[0_0_50px_rgba(0,0,0,0.9),inset_0_0_30px_rgba(245,158,11,0.05)] pointer-events-none" />

        {/* Watch Dial Astronomy Ticks SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 500 500">
          {/* Concentric subtle rings */}
          <circle cx="250" cy="250" r="238" fill="none" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1" />
          <circle cx="250" cy="250" r="225" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="250" cy="250" r="162" fill="none" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1.5" />

          {/* 60 Precision Minute / Astrolabe Ticks */}
          {Array.from({ length: 60 }).map((_, i) => {
            const angle = (i * 6) * (Math.PI / 180);
            const isHour = i % 5 === 0;
            const rOuter = 236;
            const rInner = isHour ? 222 : 230;
            const x1 = 250 + rOuter * Math.cos(angle);
            const y1 = 250 + rOuter * Math.sin(angle);
            const x2 = 250 + rInner * Math.cos(angle);
            const y2 = 250 + rInner * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isHour ? "rgba(245, 158, 11, 0.8)" : "rgba(255, 255, 255, 0.2)"}
                strokeWidth={isHour ? 2 : 1}
              />
            );
          })}
        </svg>

        {/* Month Needle from Center pointing to the active month */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-transform duration-1000 ease-out"
          style={{
            transform: `rotate(${currentMonthAngle - 90}deg)`,
          }}
        >
          <div className="relative w-full h-[3px] flex items-center justify-end pr-2">
            <div className="h-[2.5px] w-[38%] bg-gradient-to-r from-transparent via-amber-400/80 to-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.9)]" />
            <div className="w-3 h-3 rotate-45 bg-amber-400 border border-white shadow-[0_0_10px_rgba(255,255,255,0.9)] -mr-1.5" />
          </div>
        </div>

        {/* 12 Hijri Months circularly positioned like hour markers on a luxury watch */}
        <div className="absolute inset-0 pointer-events-none">
          {monthAngles.map((month) => {
            const isCurrent = month.index === currentHijri.monthIndex;
            const isSelected = month.index === selectedMonthIndex;
            // Radius percentage from center (~44%)
            const rPercent = 43.5;
            const x = 50 + rPercent * Math.cos(month.angleRad);
            const y = 50 + rPercent * Math.sin(month.angleRad);

            return (
              <div
                key={month.index}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute pointer-events-auto z-20"
              >
                <button
                  id={`btn-month-${month.index}`}
                  onClick={() => onSelectMonth(month.index)}
                  className={`group relative flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? 'scale-110 z-30'
                      : 'hover:scale-105 opacity-75 hover:opacity-100'
                  }`}
                  title={`${month.nameAr} - ${month.seasonOrSignificanceAr}`}
                >
                  {/* Glowing active halo for current month */}
                  {isCurrent && (
                    <motion.div
                      layoutId="activeMonthGlow"
                      className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-500/40 via-yellow-400/50 to-amber-600/40 blur-md animate-pulse"
                      transition={{ duration: 0.6 }}
                    />
                  )}

                  <div
                    className={`flex items-center justify-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all border ${
                      isCurrent
                        ? 'bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 text-slate-950 border-amber-200 shadow-[0_0_18px_rgba(245,158,11,0.7)] font-black'
                        : isSelected
                        ? 'bg-slate-800 text-amber-300 border-amber-500/50'
                        : 'bg-slate-950/90 text-slate-300 border-slate-800 hover:border-amber-500/40 hover:text-white'
                    }`}
                  >
                    <span className="font-cairo whitespace-nowrap">{month.nameAr}</span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* ===================================================================== */}
        {/* CENTER MOON: The Core Lunar Date Board                                */}
        {/* ===================================================================== */}
        <motion.div
          animate={{
            scale: [1, 1.015, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[255px] md:h-[255px] rounded-full z-15 flex items-center justify-center"
        >
          {/* Luminous Soft Golden/Silver Moonlight Aura */}
          <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-amber-200/25 via-slate-100/30 to-yellow-100/25 blur-xl pointer-events-none" />

          {/* Photorealistic Moon Globe */}
          <div
            className="relative w-full h-full rounded-full overflow-hidden shadow-[inset_-25px_-25px_50px_rgba(0,0,0,0.85),inset_15px_15px_30px_rgba(255,255,255,0.75),0_10px_35px_rgba(0,0,0,0.9)] border border-slate-300/40 flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #f4f6fa 25%, #d1d9e6 55%, #9aa6b8 85%, #606d80 100%)',
            }}
          >
            {/* Lunar Maria & Realistic Crater Basins Textures */}
            <svg
              className="absolute inset-0 w-full h-full opacity-35 mix-blend-multiply pointer-events-none"
              viewBox="0 0 300 300"
            >
              <path
                d="M75,90 Q120,60 170,80 T230,120 Q210,180 160,170 T85,140 Z"
                fill="#4b5563"
              />
              <path
                d="M130,150 Q180,140 220,180 T190,240 Q130,230 110,190 Z"
                fill="#374151"
              />
              <path
                d="M40,140 Q80,130 100,160 T70,210 Q30,190 35,160 Z"
                fill="#4b5563"
              />
              <circle cx="160" cy="230" r="14" fill="#1f2937" opacity="0.6" />
              <circle cx="160" cy="230" r="5" fill="#e5e7eb" opacity="0.7" />
              <circle cx="95" cy="115" r="9" fill="#374151" opacity="0.5" />
              <circle cx="195" cy="95" r="11" fill="#374151" opacity="0.5" />
              <circle cx="210" cy="150" r="7" fill="#1f2937" opacity="0.4" />
            </svg>

            {/* Subtle atmospheric glossy lighting */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/40 pointer-events-none" />

            {/* ================================================================= */}
            {/* TEXT ON THE MOON: Clear, Royal Black Arabic Typography            */}
            {/* ================================================================= */}
            <div className="relative z-20 w-full h-full flex flex-col items-center justify-center p-3 text-center">
              
              {/* Day of Week */}
              <span className="text-slate-900 text-[11px] sm:text-xs md:text-sm font-bold tracking-wider mb-0.5">
                يوم {currentHijri.dayNameAr}
              </span>

              {/* MAIN HIJRI DATE ON MOON: Bold, Clear, Royal Black */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentHijri.day}-${currentHijri.monthIndex}-${currentHijri.year}`}
                  initial={{ opacity: 0, scale: 0.93, y: 3 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93, y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center my-0.5 px-2"
                >
                  <h1 className="text-black font-amiri font-black text-xl sm:text-2xl md:text-3xl tracking-tight leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                    {currentHijri.day} {currentHijri.monthNameAr} {currentHijri.year} هـ
                  </h1>
                </motion.div>
              </AnimatePresence>

              {/* GREGORIAN DATE: Smaller, clean typography */}
              <div className="mt-1 pt-1 border-t border-slate-700/25 flex flex-col items-center">
                <span className="text-slate-800 text-[10px] sm:text-[11px] md:text-xs font-semibold">
                  الموافق {currentHijri.gregorianFormattedAr}
                </span>
                
                {/* Moon Phase & Illumination badge */}
                <div className="mt-1 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/85 text-amber-300 text-[9px] sm:text-[10px] font-bold shadow-sm border border-slate-800">
                  <span>{moonPhase.symbol}</span>
                  <span>{moonPhase.nameAr}</span>
                </div>
              </div>

            </div>

            {/* Inner Ring */}
            <div className="absolute inset-0 rounded-full border border-slate-400/20 pointer-events-none" />
          </div>
        </motion.div>

      </div>

      {/* ========================================================================= */}
      {/* MINIMAL TIME CONTROLS: Prev Day / Today / Next Day                        */}
      {/* ========================================================================= */}
      <div className="w-full max-w-xs px-2 mt-2 flex items-center justify-between gap-2 z-30">
        <button
          id="btn-prev-day"
          onClick={onPrevDay}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/60 hover:border-amber-500/40 text-xs font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
          title="اليوم السابق"
        >
          <ChevronRight className="w-4 h-4 text-amber-400" />
          <span>السابق</span>
        </button>

        {isCustomDate ? (
          <button
            id="btn-go-today"
            onClick={onToday}
            className="flex items-center justify-center gap-1 py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-[0_0_12px_rgba(245,158,11,0.4)] transition-all active:scale-95 cursor-pointer"
            title="العودة لليوم الحالي"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>اليوم</span>
          </button>
        ) : (
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-amber-400 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>الآن</span>
          </div>
        )}

        <button
          id="btn-next-day"
          onClick={onNextDay}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/60 hover:border-amber-500/40 text-xs font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
          title="اليوم التالي"
        >
          <span>التالي</span>
          <ChevronLeft className="w-4 h-4 text-amber-400" />
        </button>
      </div>

    </div>
  );
};
