import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { KitabSunnahLogo } from './KitabSunnahLogo';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    // Quick, smooth 3.0s splash then straight to Lunar Clock
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      onClick={onComplete}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05070c] text-slate-100 overflow-hidden select-none cursor-pointer"
    >
      {/* Background Deep Celestial Sky */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-slate-900/30 to-[#04060a] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-sm">
        {/* Step 1: Photorealistic Moon emerges gradually in the darkness */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0, filter: 'blur(10px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative mb-4"
        >
          {/* Luminous Moon Glow */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-amber-200/25 via-slate-100/30 to-yellow-100/25 blur-2xl animate-pulse" />
          
          <div
            className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-[inset_-16px_-16px_30px_rgba(0,0,0,0.85),inset_10px_10px_20px_rgba(255,255,255,0.7),0_0_35px_rgba(245,158,11,0.4)] border border-slate-300/40 flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #f4f6fa 25%, #d1d9e6 55%, #9aa6b8 85%, #606d80 100%)',
            }}
          >
            {/* Crater shadows */}
            <svg
              className="absolute inset-0 w-full h-full opacity-35 mix-blend-multiply pointer-events-none"
              viewBox="0 0 200 200"
            >
              <path d="M50,60 Q80,40 120,55 T160,85 Q140,130 110,120 T60,100 Z" fill="#4b5563" />
              <circle cx="110" cy="150" r="10" fill="#1f2937" opacity="0.6" />
              <circle cx="65" cy="80" r="8" fill="#374151" opacity="0.5" />
            </svg>
            <div className="relative z-10 text-slate-950 font-amiri font-black text-[11px] text-center px-2">
              ساعة الزمن القمري
            </div>
          </div>
        </motion.div>

        {/* Step 2: "السنة الهجرية" fades in */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-2xl sm:text-4xl font-black font-amiri text-amber-300 drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)] mb-1"
        >
          السنة الهجرية
        </motion.h1>

        {/* Step 3: Subtle Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xs sm:text-sm font-cairo font-semibold text-slate-300 tracking-wider flex items-center gap-1.5 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>ساعة هجرية قمرية</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </motion.p>

        {/* Step 4: Dedication Badge with Official Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-full flex justify-center"
        >
          {/* Dedication Badge */}
          <div className="py-1.5 px-3.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center justify-center gap-2 shadow-lg backdrop-blur-sm">
            <KitabSunnahLogo size={24} />
            <span>إهداء إلى: جمعية الكتاب والسنة الخيرية بالسودان</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-[10px] text-slate-500 mt-4"
        >
          المس الشاشة للمتابعة...
        </motion.div>
      </div>
    </div>
  );
};

