import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles, Megaphone, Check, Copy, Radio, Heart } from 'lucide-react';
import { KitabSunnahLogo } from './KitabSunnahLogo';

interface SudanesePromoAudioProps {
  onClose?: () => void;
}

export const SudanesePromoAudio: React.FC<SudanesePromoAudioProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedScriptType, setSelectedScriptType] = useState<'energetic_full' | 'radio_quick' | 'lunar_call'>('energetic_full');
  const [voiceTone, setVoiceTone] = useState<'enthusiastic_male' | 'deep_male'>('enthusiastic_male');
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Script 1: Full energetic Sudanese male commercial script (حماسي جهوري بالعامية السودانية)
  const fullPromoScript = `يا هلا والله بالحبايب وأهلنا الطيبين في كل مكان!
يا زووول يا رايع.. أسمع الكلام السمح المليان ده!
وصل وصل.. تطبيق السنة الهجرية وساعة الزمن القمري الأصلية!
مش مجرد تقويم عادي يا زول.. دي ساعة فلكية حقيقية في جيبك!
القمر قدامك في النص بيتحرك مع حركة الأيام بدقة مدهشة، والأشهر الهجرية كلها لافة حوالينو بأناقة وفخامة زي عقارب الساعة السويسرية!
تعرف ليلة البدر التمام متين، والأيام البيض، وتشارك أحلى كرت وتاريخ اليوم مع أهلك وحبايبك في الواتساب بضغطة واحدة!
التطبيق دا إهداء مفعم بالمحبة والتقدير إلى "جمعية الكتاب والسنة الخيرية بالسودان"!
تصميم وإبداع المبدع: كمال جعفر زكريا.
نزّل التطبيق هسي في تليفونك، وخلي شاشتك منورة بالزمن القمري الأصيل!`;

  // Script 2: Fast Sudanese Radio Ad (30 seconds)
  const quickPromoScript = `يا زول يا أصيل! عايز تعرف التاريخ الهجري وأطوار القمر بلمسة واحدة؟
تطبيق السنة الهجرية.. ساعة الزمن القمري الأحدث والأفخم!
تصميم مدهش وخفيف يشتغل معاك في أي وقت بدون نت!
إهداء خاص لجمعية الكتاب والسنة الخيرية بالسودان!
تصميم: كمال جعفر زكريا.
ثبّت التطبيق الآن في جوالك واستمتع بالفخامة!`;

  // Script 3: Energetic Lunar Call (نداء حماسي سريع)
  const lunarCallScript = `الله أكبر.. ما شاء الله تبارك الله!
الساعة القمرية في موبايلك بتصميم ولا في الخيال!
تاريخ هجري دقيق، أطوار القمر الحية، ومشاركة فورية لأروع البطاقات اليومية!
إهداء من القلب إلى جمعية الكتاب والسنة الخيرية بالسودان.
مع تحيات المصمم كمال جعفر زكريا.. حمله الآن وعيش روعة الزمن الهجري!`;

  const activeScript = 
    selectedScriptType === 'energetic_full' 
      ? fullPromoScript 
      : selectedScriptType === 'radio_quick' 
        ? quickPromoScript 
        : lunarCallScript;

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

  // Upbeat, energetic broadcast radio jingle using Web Audio API
  const playIntroJingle = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const now = ctx.currentTime;

      // Punchy commercial chords & fanfare (Eb5 -> G5 -> Bb5 -> Eb6)
      const fanfareFreqs = [311.13, 392.00, 466.16, 622.25, 932.33];
      fanfareFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.55);
      });

      // Warm bass thump for energy
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.frequency.setValueAtTime(140, now);
      bassOsc.frequency.exponentialRampToValueAtTime(45, now + 0.35);
      bassGain.gain.setValueAtTime(0.35, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      bassOsc.connect(bassGain);
      bassGain.connect(ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + 0.4);

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
      // Clean script for optimal Arabic speech synthesis
      const cleanedText = activeScript
        .replace(/["*]/g, '')
        .replace(/ﷺ/g, 'صلى الله عليه وسلم');

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.lang = 'ar-SA';

      // Masculine energetic voice settings
      if (voiceTone === 'enthusiastic_male') {
        utterance.rate = 1.10; // Fast energetic commercial delivery
        utterance.pitch = 0.84; // Deep, commanding male radio tone
      } else {
        utterance.rate = 0.96;
        utterance.pitch = 0.78; // Very deep resonant masculine tone
      }

      // Pick best Arabic male voice available on device
      const voices = window.speechSynthesis.getVoices();
      const arabicVoices = voices.filter(v => v.lang.startsWith('ar'));
      
      const maleVoice = arabicVoices.find(v => 
        /male|maged|tarik|naayf|hamed|salman|fahad|youssef/i.test(v.name)
      ) || arabicVoices[0];

      if (maleVoice) {
        utterance.voice = maleVoice;
      }

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }, 420);
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
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
            <Megaphone className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white flex items-center gap-1.5 font-cairo">
              <span>الصوت الإعلاني الحماسي (صوت رجل بالعامية السودانية)</span>
            </h4>
            <p className="text-[11px] text-amber-400/90 font-medium">نبرة حماسية جهورية • لهجة سودانية أصيلة 🎙️🇸🇩</p>
          </div>
        </div>

        <button
          onClick={handleCopyScript}
          className="p-1.5 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors cursor-pointer border border-slate-700 shadow-sm"
          title="نسخ نص الإعلان للمعلق الصوتي"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
          <span className="text-[11px] font-bold">{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
        </button>
      </div>

      {/* Dedication Banner with Official Logo (No Al-Hadiya sponsorship) */}
      <div className="p-2.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/40 border border-emerald-500/40 flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2.5 min-w-0">
          <KitabSunnahLogo size={34} />
          <div className="truncate">
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              <Heart className="w-3 h-3 text-emerald-400 fill-emerald-400/20" />
              <span>إهداء التطبيق المبارك</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white font-cairo truncate">
              إهداء إلى: <span className="text-emerald-300 font-extrabold">جمعية الكتاب والسنة الخيرية بالسودان</span>
            </div>
          </div>
        </div>
      </div>

      {/* Script Options Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
        <button
          onClick={() => {
            if (isPlaying) window.speechSynthesis.cancel();
            setIsPlaying(false);
            setSelectedScriptType('energetic_full');
          }}
          className={`py-1.5 px-2 rounded-lg font-bold transition-all text-center cursor-pointer text-[11px] ${
            selectedScriptType === 'energetic_full'
              ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          الإعلان الكامل (دقيقة)
        </button>
        <button
          onClick={() => {
            if (isPlaying) window.speechSynthesis.cancel();
            setIsPlaying(false);
            setSelectedScriptType('radio_quick');
          }}
          className={`py-1.5 px-2 rounded-lg font-bold transition-all text-center cursor-pointer text-[11px] ${
            selectedScriptType === 'radio_quick'
              ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          راديو خاطف (30ث)
        </button>
        <button
          onClick={() => {
            if (isPlaying) window.speechSynthesis.cancel();
            setIsPlaying(false);
            setSelectedScriptType('lunar_call');
          }}
          className={`py-1.5 px-2 rounded-lg font-bold transition-all text-center cursor-pointer text-[11px] ${
            selectedScriptType === 'lunar_call'
              ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          نداء الفخامة (حماسي)
        </button>
      </div>

      {/* Script Text Box */}
      <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/90 text-xs sm:text-sm text-amber-100/95 leading-relaxed font-cairo max-h-44 overflow-y-auto whitespace-pre-line shadow-inner select-text">
        {activeScript}
      </div>

      {/* Voice Delivery Style Selector */}
      <div className="flex items-center justify-between text-xs px-1 text-slate-400">
        <span className="font-medium text-slate-300">نبرة الصوت الرجالي:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceTone('enthusiastic_male')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
              voiceTone === 'enthusiastic_male'
                ? 'bg-amber-500/25 border border-amber-500/50 text-amber-300 shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            حماسي جهوري قوي ⚡
          </button>
          <button
            onClick={() => setVoiceTone('deep_male')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
              voiceTone === 'deep_male'
                ? 'bg-amber-500/25 border border-amber-500/50 text-amber-300 shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            إذاعي وقور وفخم 🎙️
          </button>
        </div>
      </div>

      {/* Audio Playback Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2 border-t border-slate-800">
        <button
          onClick={handlePlayVoice}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg active:scale-95 cursor-pointer ${
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
              <span>تشغيل الإعلان الحماسي بصوت رجل 🔊</span>
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
            <span className="text-[11px] text-amber-300 font-bold mr-1.5">صوت حماسي سوداني يعمل...</span>
          </div>
        ) : (
          <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
            <Radio className="w-3.5 h-3.5 text-amber-400" />
            <span>نبرة إذاعية سودانية حماسية</span>
          </div>
        )}
      </div>

    </div>
  );
};
