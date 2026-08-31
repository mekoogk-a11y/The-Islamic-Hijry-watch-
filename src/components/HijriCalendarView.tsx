import React, { useState } from 'react';
import { HIJRI_MONTHS, getHijriMonthCalendarDays } from '../utils/hijriAstronomical';
import { ChevronRight, ChevronLeft, Calendar as CalendarIcon, X, Sparkles, Star } from 'lucide-react';

interface HijriCalendarViewProps {
  currentHijriYear: number;
  currentHijriMonth: number;
  currentHijriDay: number;
  adjustmentDays: number;
  onSelectDate: (year: number, monthIndex: number, day: number) => void;
  onClose: () => void;
}

export const HijriCalendarView: React.FC<HijriCalendarViewProps> = ({
  currentHijriYear,
  currentHijriMonth,
  currentHijriDay,
  adjustmentDays,
  onSelectDate,
  onClose,
}) => {
  const [viewYear, setViewYear] = useState(currentHijriYear);
  const [viewMonthIndex, setViewMonthIndex] = useState(currentHijriMonth);
  const [activeTab, setActiveTab] = useState<'month' | 'year'>('month');

  const monthData = getHijriMonthCalendarDays(viewYear, viewMonthIndex, adjustmentDays);
  const currentMonthMeta = HIJRI_MONTHS[viewMonthIndex];

  const handlePrevMonth = () => {
    if (viewMonthIndex === 0) {
      setViewMonthIndex(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonthIndex((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonthIndex === 11) {
      setViewMonthIndex(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonthIndex((m) => m + 1);
    }
  };

  const handleGoToday = () => {
    setViewYear(currentHijriYear);
    setViewMonthIndex(currentHijriMonth);
  };

  const DAYS_HEADER = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-4 sm:p-6 shadow-2xl text-slate-100 my-auto">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-cairo flex items-center gap-2">
                <span>التقويم الهجري الشامل</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-normal">
                  {viewYear} هـ
                </span>
              </h2>
              <p className="text-xs text-slate-400">ساعة الزمن القمري ومواقيت الشهور</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher: Single Month vs 12 Months Overview */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('month')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === 'month' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                الشهر
              </button>
              <button
                onClick={() => setActiveTab('year')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === 'year' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                الـ 12 شهراً
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 12 Months Selector Strip */}
        <div className="my-3 overflow-x-auto pb-1 flex gap-1.5 scrollbar-thin">
          {HIJRI_MONTHS.map((m) => {
            const isSelected = m.index === viewMonthIndex;
            return (
              <button
                key={m.index}
                onClick={() => {
                  setViewMonthIndex(m.index);
                  setActiveTab('month');
                }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{m.number}. {m.nameAr}</span>
                {m.isSacred && <span className="mr-1 text-[9px] text-amber-400">★</span>}
              </button>
            );
          })}
        </div>

        {activeTab === 'month' ? (
          <div>
            {/* Month Header Navigation */}
            <div className="flex items-center justify-between py-2 px-3 rounded-2xl bg-slate-950/80 border border-slate-800 my-3">
              <button
                onClick={handlePrevMonth}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-amber-300 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
                <span>الشهر السابق</span>
              </button>

              <div className="text-center">
                <div className="font-amiri font-bold text-xl sm:text-2xl text-amber-400">
                  شهر {currentMonthMeta.nameAr} {viewYear} هـ
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-center gap-2">
                  <span>{currentMonthMeta.seasonOrSignificanceAr}</span>
                  {currentMonthMeta.isSacred && (
                    <span className="text-amber-300 font-bold">(من الأشهر الحُرُم)</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleGoToday}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-amber-400 border border-slate-800 font-medium"
                >
                  اليوم
                </button>
                <button
                  onClick={handleNextMonth}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-amber-300 transition-colors"
                >
                  <span>الشهر التالي</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-slate-400 py-1.5 border-b border-slate-800">
              {DAYS_HEADER.map((d, i) => (
                <div key={i} className={i === 5 ? 'text-amber-400' : ''}>
                  {d}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 my-3">
              {/* Empty leading slots for firstDayOfWeek */}
              {Array.from({ length: monthData.firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="h-16 sm:h-20 rounded-xl bg-slate-950/20 border border-transparent" />
              ))}

              {/* Month Days */}
              {monthData.days.map((item) => {
                const isCurrentToday =
                  item.day === currentHijriDay &&
                  item.monthIndex === currentHijriMonth &&
                  item.year === currentHijriYear;

                return (
                  <button
                    key={item.day}
                    onClick={() => {
                      onSelectDate(viewYear, viewMonthIndex, item.day);
                      onClose();
                    }}
                    className={`relative group h-16 sm:h-20 p-1.5 rounded-xl flex flex-col justify-between text-right transition-all border ${
                      isCurrentToday
                        ? 'bg-gradient-to-br from-amber-500/30 to-amber-600/20 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                        : item.isWhiteDay
                        ? 'bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-400/60'
                        : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-600 hover:bg-slate-800/50'
                    }`}
                  >
                    {/* Top Row: Hijri Day Number & Moon Phase Symbol */}
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-sm sm:text-base font-bold font-cairo ${
                          isCurrentToday ? 'text-amber-300' : 'text-slate-100'
                        }`}
                      >
                        {item.day}
                      </span>
                      <span className="text-xs">{item.moonSymbol}</span>
                    </div>

                    {/* Gregorian Date Sub-text */}
                    <div className="text-[10px] text-slate-400">
                      {item.gregorianDay} {item.gregorianMonthAr}
                    </div>

                    {/* Badges / Islamic Event Marker */}
                    <div className="w-full flex items-center justify-between text-[8px] sm:text-[9px]">
                      {item.isWhiteDay && (
                        <span className="text-cyan-300 font-medium">أيام بيض</span>
                      )}
                      {item.islamicEvent && (
                        <span className="truncate max-w-full text-emerald-400 font-bold" title={item.islamicEvent}>
                          ★ {item.islamicEvent}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* 12 Months Year Overview Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-4">
            {HIJRI_MONTHS.map((m) => {
              const isCur = m.index === currentHijriMonth && viewYear === currentHijriYear;
              return (
                <button
                  key={m.index}
                  onClick={() => {
                    setViewMonthIndex(m.index);
                    setActiveTab('month');
                  }}
                  className={`p-3.5 rounded-2xl text-right border transition-all ${
                    isCur
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-cinzel text-slate-500 font-bold">{m.number}</span>
                    {m.isSacred && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        حَرَام
                      </span>
                    )}
                  </div>
                  <h4 className="font-amiri font-bold text-base sm:text-lg text-white mb-1">{m.nameAr}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2">{m.seasonOrSignificanceAr}</p>
                </button>
              );
            })}
          </div>
        )}

        {/* Legend */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> اليوم الحالي
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> الأيام البيض (13، 14، 15)
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-emerald-400" /> مناسبة إسلامية
            </span>
          </div>
          <div>
            <span>تعديل التقويم: {adjustmentDays > 0 ? `+${adjustmentDays}` : adjustmentDays} يوم</span>
          </div>
        </div>

      </div>
    </div>
  );
};
