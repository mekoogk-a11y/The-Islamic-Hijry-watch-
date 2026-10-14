import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles, Megaphone, Check, Copy, Radio, Heart, Award } from 'lucide-react';

interface SudanesePromoAudioProps {
  onClose?: () => void;
}

export const SudanesePromoAudio: React.FC<SudanesePromoAudioProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedScriptType, setSelectedScriptType] = useState<'full' | 'quick'>('full');
  const [voiceTone, setVoiceTone] = useState<'energetic' | 'deep'>('energetic');
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Script 1: Full energetic Sudanese dialect promo script with sponsorship & dedication
  const fullPromoScript = `يا هلا والله بالحبايب وأهلنا الطيبين في كل مكان!
وصّل وصل.. تطبيق السنة الهجرية وساعة الزمن القمري!
مش مجرد تقويم عادي يا زول، دي ساعة فلكية حقيقية في جيبك!
القمر قدامك في النص بيتحرك مع حركة الأيام بدقة مدهشة، والأشهر الهجرية كلها لافة حوالينو بأناقة وفخامة زي عقارب الساعة السويسرية!
تعرف ليلة البدر التمام متين، والأيام البيض، وتشارك أحلى كرت وتاريخ اليوم مع أهلك وحبايبك في الواتساب بضغطة واحدة!
التطبيق دا برعاية كريمة وفخيمة من "منظمة الهدية"..
وإهداء مفعم بالمحبة والتقدير إلى "جمعية الكتاب والسنة الخيرية بالسودان"!
تصميم وإبداع: كمال جعفر زكريا.
نزّل التطبيق هسي في تليفونك، وخلي شاشتك منورة بالزمن القمري الأصيل!`;

  // Script 2: Fast radio ad (30 seconds)
  const quickPromoScript = `يا زول يا أصيل! عايز تعرف التاريخ الهجري وأطوار القمر بلمسة واحدة؟
تطبيق السنة الهجرية.. ساعة الزمن القمري الأحدث والأفخم!
برعاية منظمة الهدية، وإهداء خاص لجمعية الكتاب والسنة الخيرية بالسودان!
تصميم كمال جعفر زكريا.. ثبّت التطبيق الآن واستمتع بالفخامة!`;

  const activeScript = selectedScriptType === 'full' ? fullPromoScript : quickPromoScript;

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Play upbeat celestial chime intro using Web Audio API
  const playIntroJingle = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const now = ctx.currentTime;
      // High-energy opening arpeggio (C5 -> E5 -> G5 -> C6)
      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);

        gain.gain.setValueAtTime(0, now + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.5);
      });
    } catch {
      // AudioContext unavailable or restricted
    }
  };

  const handlePlayVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert('متصفحك لا يدعم خاصية تحويل النص إلى صوت مباشر.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    playIntroJingle();

    setTimeout(() => {
      // Clean script of quotes and markdown for natural speech synthesis pronunciation
      const cleanedText = activeScript
        .replace(/["*]/g, '')
        .replace(/ﷺ/g, 'صلى الله عليه وسلم');

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.lang = 'ar-SA';

      // Deep masculine energetic pitch & rate
      if (voiceTone === 'energetic') {
        utterance.rate = 1.08; // Energetic, lively commercial pace
        utterance.pitch = 0.88; // Deep resonant male radio voice
      } else {
        utterance.rate = 0.98;
        utterance.pitch = 0.82; // Deeper baritone tone
      }

      // Pick best Arabic male voice if available
      const voices = window.speechSynthesis.getVoices();
      const arabicVoices = voices.filter(v => v.lang.startsWith('ar'));
      
      // Look for male-sounding names or fallback to first arabic
      const maleArabicVoice = arabicVoices.find(v => 
        /male|maged|tarik|naayf|hamed|salman/i.test(v.name)
      ) || arabicVoices[0];

      if (maleArabicVoice) {
        utterance.voice = maleArabicVoice;
      }

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }, 450);
  };

  const handleCopyScript = async () => {
    try {
      await navigator.clipboard.writeText(activeScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-3.5 text-slate-200">
      
      {/* Title Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Megaphone className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white flex items-center gap-1.5 font-cairo">
              <span>الصوت الإعلاني الحماسي (بالعامية السودانية)</span>
            </h4>
            <p className="text-[11px] text-amber-400/90 font-medium">نبرة رجل حماسية • فخامة سودانية أصيلة</p>
          </div>
        </div>

        <button
          onClick={handleCopyScript}
          className="p-1.5 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors cursor-pointer border border-slate-700"
          title="نسخ نص الإعلان"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
          <span className="text-[11px] font-bold">{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
        </button>
      </div>

      {/* Badges: Sponsorship & Dedication */}
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-1.5 text-amber-300">
          <Award className="w-3.5 h-3.5 shrink-0 text-amber-400" />
          <span className="truncate">برعاية: <strong>منظمة الهدية</strong></span>
        </div>
        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-1.5 text-emerald-300">
          <Heart className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
          <span className="truncate">إهداء: <strong>جمعية الكتاب والسنة</strong></span>
        </div>
      </div>

      {/* Script Options Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
        <button
          onClick={() => {
            if (isPlaying) window.speechSynthesis.cancel();
            setIsPlaying(false);
            setSelectedScriptType('full');
          }}
          className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all text-center cursor-pointer ${
            selectedScriptType === 'full'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          النص الحماسي الكامل (دقيقة)
        </button>
        <button
          onClick={() => {
            if (isPlaying) window.speechSynthesis.cancel();
            setIsPlaying(false);
            setSelectedScriptType('quick');
          }}
          className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all text-center cursor-pointer ${
            selectedScriptType === 'quick'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          الإعلان السريع (30 ثانية)
        </button>
      </div>

      {/* Script Text Box */}
      <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/90 text-xs sm:text-sm text-amber-100/95 leading-relaxed font-cairo max-h-44 overflow-y-auto whitespace-pre-line shadow-inner select-text">
        {activeScript}
      </div>

      {/* Voice Delivery Style Selector */}
      <div className="flex items-center justify-between text-xs px-1 text-slate-400">
        <span>طبقة الصوت الرجالي:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceTone('energetic')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              voiceTone === 'energetic'
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            حماسي جهوري ⚡
          </button>
          <button
            onClick={() => setVoiceTone('deep')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              voiceTone === 'deep'
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            إذاعي عميق 🎙️
          </button>
        </div>
      </div>

      {/* Audio Playback Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
        <button
          onClick={handlePlayVoice}
          className={`flex items-center gap-2 py-2.5 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg active:scale-95 cursor-pointer ${
            isPlaying
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/30 animate-pulse'
              : 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-amber-500/20'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-white" />
              <span>إيقاف الصوت</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-slate-950" />
              <span>تشغيل الصوت الإعلاني الحماسي 🔊</span>
            </>
          )}
        </button>

        {/* Animated equalizer waves */}
        {isPlaying ? (
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <span className="w-1 h-3 bg-amber-400 animate-pulse rounded-full" />
            <span className="w-1 h-6 bg-amber-400 animate-pulse delay-75 rounded-full" />
            <span className="w-1 h-4 bg-amber-400 animate-pulse delay-150 rounded-full" />
            <span className="w-1 h-7 bg-amber-400 animate-pulse delay-100 rounded-full" />
            <span className="w-1 h-3 bg-amber-400 animate-pulse delay-200 rounded-full" />
            <span className="text-[11px] text-amber-300 font-bold mr-1.5">صوت حماسي جارٍ...</span>
          </div>
        ) : (
          <div className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
            <Radio className="w-3.5 h-3.5 text-slate-500" />
            <span>نبرة إذاعية سودانية</span>
          </div>
        )}
      </div>

    </div>
  );
};
