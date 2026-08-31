import React from 'react';
import { X, Moon, Clock, Phone, Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  const whatsappNumber = '00249919980435';
  const whatsappUrl = `https://wa.me/249919980435?text=${encodeURIComponent('السلام عليكم ورحمة الله وبركاته، بخصوص تطبيق السنة الهجرية - ساعة الزمن القمري')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-2xl text-slate-100 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Icon & Title */}
        <div className="text-center pt-2 pb-4">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500/20 via-yellow-400/20 to-slate-800 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.3)] mb-3">
            <Moon className="w-9 h-9 text-amber-400 fill-amber-400/20" />
          </div>
          <h2 className="text-2xl font-black font-amiri text-amber-400">
            حول تطبيق السنة الهجرية
          </h2>
          <p className="text-xs text-slate-300 font-medium mt-0.5">
            ساعة الزمن القمري والتقويم الإسلامي المبتكر
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-[55vh] overflow-y-auto pr-1 scrollbar-thin">
          
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h3 className="font-bold text-amber-300 flex items-center gap-1.5 mb-1.5">
              <Clock className="w-4 h-4 text-amber-400" /> فكرة التطبيق ورؤيته
            </h3>
            <p>
              تطبيق «السنة الهجرية» يعيد إحياء مفهوم التقويم القمري الإسلامي الأصيل من خلال تجربة بصرية مبتكرة تحول القمر إلى لوحة التاريخ المركزية وساعة زمنية فلكية، حيث تدور حوله الأشهر الهجرية الـ12 وتتحرك مؤشرات الأيام بنعومة ودقة.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h3 className="font-bold text-amber-300 flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> المميزات البصرية والفلكية
            </h3>
            <ul className="space-y-1.5 list-disc list-inside text-slate-300 text-[11px] sm:text-xs">
              <li>قمر مركزي ثلاثي الأبعاد يعرض التاريخ الهجري والميلادي مباشرة على سطحه.</li>
              <li>ساعة الأشهر الهجرية الـ12 الدائرية مع تمييز الشهر الحالي والأشهر الحرم.</li>
              <li>مؤشرات زمنية دائرية لحركة أيام الشهر (1 إلى 30).</li>
              <li>حساب دقيق لجميع أطوار القمر الثمانية ونسبة الإضاءة وليالي البدر والأيام البيض.</li>
              <li>دعم ضبط رؤية الهلال (±1 أو ±2 يوم) ومشاركة البطاقات اليومية الفاخرة.</li>
            </ul>
          </div>

          {/* Official Signature Section */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 border-2 border-amber-500/40 text-center space-y-2.5">
            <div className="text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1">
              <Award className="w-4 h-4 text-amber-400" />
              <span>بيانات التصميم والتطوير</span>
            </div>

            <div className="text-base font-bold text-white font-cairo">
              تصميم: <span className="text-amber-300 font-extrabold">كمال جعفر زكريا</span>
            </div>

            {/* WhatsApp Link Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              <span dir="ltr">واتساب: {whatsappNumber}</span>
            </a>

            <div className="pt-2 border-t border-slate-800 text-xs text-amber-200/90 font-medium">
              مع تحيات الهدي والنور للتطبيقات والمواقع الإسلامية
            </div>
          </div>

          {/* Privacy & Version */}
          <div className="text-center text-[10px] text-slate-500 pt-1">
            <span>الإصدار 1.0.0 • جميع الحقوق محفوظة © {new Date().getFullYear()}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
