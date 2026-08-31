import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles, Megaphone, Check, Copy } from 'lucide-react';

interface SudanesePromoAudioProps {
  onClose?: () => void;
}

export const SudanesePromoAudio: React.FC<SudanesePromoAudioProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const promoScript = `يا هلا والله بالحبايب! وصّل وصل.. تطبيق السنة الهجرية!
مش مجرد تقويم عادي يا زول، دي ساعة زمن قمرية فلكية حقيقية في جيبك!
القمر قدامك في النص بيتحرك مع الأيام، والأشهر الهجرية الـ12 كلها لافّة حوالينو زي عقارب الساعة الفخمة!
تعرف ليلة البدر التمام متين، والأيام البيض، ومناسبات الشهور والأشهر الحُرُم، وتشارك تاريخ الليلة مع أهلك وحبايبك في الواتساب بضغطة واحدة وبأجمل بطاقة إسلامية راقية!
حاجة كدا ما شاء الله تبارك الله من الآخر.. فخامة وإتقان!
تطبيق السنة الهجرية.. ساعة الزمن القمري!`;

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlayVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert('متصفحك لا يدعم تحويل النص إلى صوت مباشر.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(promoScript);
    utterance.lang = 'ar-SA';
    utterance.rate = 1.05; // Lively, energetic pace
    utterance.pitch = 0.95; // Deep energetic male voice tone

    // Try to pick an Arabic voice if available
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyScript = async () => {
    try {
      await navigator.clipboard.writeText(promoScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 text-slate-200 shadow-xl">
      {/* Title */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Megaphone className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
              <span>الإعلان الحماسي (بالعامية السودانية)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-normal">
                صوت حماسي
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">إعلان صوتي تسويقي مميز للتطبيق</p>
          </div>
        </div>

        <button
          onClick={handleCopyScript}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
          title="نسخ نص الإعلان"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="text-[11px]">{copied ? 'تم النسخ' : 'نسخ النص'}</span>
        </button>
      </div>

      {/* Script Text Box */}
      <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs sm:text-sm text-amber-100/90 leading-relaxed font-cairo my-2">
        «يا هلا والله بالحبايب! وصّل وصل.. تطبيق السنة الهجرية! 🌙 مش مجرد تقويم عادي يا زول، دي ساعة زمن قمرية فلكية حقيقية! القمر قدامك في النص بيتحرك مع الأيام، والأشهر الهجرية كلها لافّة حوالينو زي عقارب الساعة الفخمة! تعرف ليلة البدر متين، والأيام البيض، وتشارك تاريخ الليلة مع أهلك وحبايبك في الواتساب بضغطة واحدة وبأجمل بطاقة إسلامية! حاجة كدا فخامة وإتقان.. تطبيق السنة الهجرية!»
      </div>

      {/* Audio Playback Controls */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800">
        <button
          onClick={handlePlayVoice}
          className={`flex items-center gap-2 py-2 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 ${
            isPlaying
              ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
              : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              <span>إيقاف الصوت</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-slate-950" />
              <span>استمع للصوت الحماسي الآن 🔊</span>
            </>
          )}
        </button>

        {isPlaying && (
          <div className="flex items-center gap-1">
            <span className="w-1 h-3 bg-amber-400 animate-pulse rounded-full" />
            <span className="w-1 h-5 bg-amber-400 animate-pulse delay-75 rounded-full" />
            <span className="w-1 h-4 bg-amber-400 animate-pulse delay-150 rounded-full" />
            <span className="w-1 h-6 bg-amber-400 animate-pulse delay-100 rounded-full" />
            <span className="w-1 h-3 bg-amber-400 animate-pulse delay-200 rounded-full" />
            <span className="text-[11px] text-amber-300 font-semibold mr-1.5">جارٍ التشغيل...</span>
          </div>
        )}
      </div>
    </div>
  );
};
