import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Megaphone, 
  Check, 
  Copy, 
  Radio, 
  Heart, 
  Music, 
  Mic, 
  Sliders, 
  FileText,
  Share2,
  ExternalLink
} from 'lucide-react';
import { KitabSunnahLogo } from './KitabSunnahLogo';

interface SudanesePromoAudioProps {
  onClose?: () => void;
}

interface ScriptItem {
  id: 'golden_full' | 'radio_spot' | 'social_fast' | 'association_call';
  title: string;
  duration: string;
  tag: string;
  script: string;
  sentences: string[];
}

export const SudanesePromoAudio: React.FC<SudanesePromoAudioProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedWithNotes, setCopiedWithNotes] = useState(false);
  const [selectedScriptId, setSelectedScriptId] = useState<'golden_full' | 'radio_spot' | 'social_fast' | 'association_call'>('golden_full');
  const [voiceTone, setVoiceTone] = useState<'energetic_male' | 'deep_male'>('energetic_male');
  const [playBgMusic, setPlayBgMusic] = useState(true);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [hasArabicVoice, setHasArabicVoice] = useState(true);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bgIntervalRef = useRef<number | null>(null);
  const sentenceTimerRef = useRef<number | null>(null);

  // Four authentic, energetic Sudanese advertising scripts crafted for broadcast
  const scripts: ScriptItem[] = [
    {
      id: 'golden_full',
      title: 'الإعلان الذهبي الكامل',
      duration: 'دقيقة واحدة',
      tag: 'الأكثر حماساً وشهرة',
      sentences: [
        'يا هلا والله بالحبايب وأهلنا الطيبين في كل مكان!',
        'يا زووول يا رايع.. أسمع الكلام السمح المليان ده!',
        'الليلة جبنا ليكم الزيت والشغل النظيف.. تطبيق السنة الهجرية وساعة الزمن القمري الأصلية!',
        'مش مجرد تقويم عادي يا حبيبنا.. دي ساعة فلكية كاملة في جيبك وبتشتغل بدون إنترنت!',
        'شايف القمر المنوّر في النص ده؟ بيتحرك مع حركة الأيام بدقة مدهشة يوم بيوم..',
        'من هلال أول الشهر، لي ليلة البدر التمام، والأشهر الهجرية كلها لافة حوالينو بأناقة وفخامة ما بتتقارن!',
        'تعرف ليلة البدر والأيام البيض، وتشارك أحلى كروت تهنئة فخمة مع أهلك وأحبابك بالواتساب والفيسبوك بلمسة واحدة!',
        'التطبيق دا إهداء مفعم بالمحبة والتقدير إلى "جمعية الكتاب والسنة الخيرية بالسودان"!',
        'تصميم وإبداع المبدع: كمال جعفر زكريا.',
        'يلا هسي يا زول يا سمح.. نزّل التطبيق في تلفونك وخلي شاشتك منورة بالزمن القمري الأصيل!'
      ],
      script: `يا هلا والله بالحبايب وأهلنا الطيبين في كل مكان!
يا زووول يا رايع.. أسمع الكلام السمح المليان ده!
الليلة جبنا ليكم الزيت والشغل النظيف.. تطبيق السنة الهجرية وساعة الزمن القمري الأصلية!
مش مجرد تقويم عادي يا حبيبنا.. دي ساعة فلكية كاملة في جيبك وبتشتغل بدون إنترنت!
شايف القمر المنوّر في النص ده؟ بيتحرك مع حركة الأيام بدقة مدهشة يوم بيوم..
من هلال أول الشهر، لي ليلة البدر التمام، والأشهر الهجرية كلها لافة حوالينو بأناقة وفخامة ما بتتقارن!
تعرف ليلة البدر والأيام البيض، وتشارك أحلى كروت تهنئة فخمة مع أهلك وأحبابك بالواتساب والفيسبوك بلمسة واحدة!
التطبيق دا إهداء مفعم بالمحبة والتقدير إلى "جمعية الكتاب والسنة الخيرية بالسودان"!
تصميم وإبداع المبدع: كمال جعفر زكريا.
يلا هسي يا زول يا سمح.. نزّل التطبيق في تلفونك وخلي شاشتك منورة بالزمن القمري الأصيل!`
    },
    {
      id: 'radio_spot',
      title: 'سبوت راديو سريع',
      duration: '30 ثانية',
      tag: 'إيقاع خاطف',
      sentences: [
        'يا زول يا أصيل! عايز ساعتك وموبايلك ينوروا بالبركة والفخامة؟',
        'وصل وصل.. تطبيق السنة الهجرية وساعة الزمن القمري الأحدث والأفخم بالسودان!',
        'قمر ثلاثي الأبعاد، أطوار حية، وبطاقات تهنئة راقية تشاركها بضغطة زر وبدون نت!',
        'إهداء خاص من القلب لجمعية الكتاب والسنة الخيرية بالسودان.',
        'إبداع وتصميم: كمال جعفر زكريا.',
        'ثبّت التطبيق الآن في جوالك وعيش روعة الزمن الهجري الأصيل!'
      ],
      script: `يا زول يا أصيل! عايز ساعتك وموبايلك ينوروا بالبركة والفخامة؟
وصل وصل.. تطبيق السنة الهجرية وساعة الزمن القمري الأحدث والأفخم بالسودان!
قمر ثلاثي الأبعاد، أطوار حية، وبطاقات تهنئة راقية تشاركها بضغطة زر وبدون نت!
إهداء خاص من القلب لجمعية الكتاب والسنة الخيرية بالسودان.
إبداع وتصميم: كمال جعفر زكريا.
ثبّت التطبيق الآن في جوالك وعيش روعة الزمن الهجري الأصيل!`
    },
    {
      id: 'social_fast',
      title: 'إعلان الواتساب والسوشيال',
      duration: '45 ثانية',
      tag: 'مناسب للنشر والقروبات',
      sentences: [
        'السلام عليكم يا أحباب.. أروع تطبيق للتقويم القمري وصل!',
        'بتفتش عن تقويم هجري أنيق وسريع وما بيتقل التلفون نهائياً؟',
        'لقينا ليك الحل الأكيد! تطبيق السنة الهجرية.. ساعة فلكية قمرية دقيقة ومبهرة في يدك طوالي!',
        'بتعرف أطوار القمر الليلة شنو، وتتابع الأشهر الهجرية، ومناسباتنا الإسلامية بكل سهولة!',
        'التطبيق إهداء مبارك لجمعية الكتاب والسنة الخيرية بالسودان، مع تحيات المصمم كمال جعفر زكريا.',
        'أرسل الرابط لأصحابك في القروبات وخلي شاشاتهم تنور بالزمن القمري!'
      ],
      script: `السلام عليكم يا أحباب.. أروع تطبيق للتقويم القمري وصل!
بتفتش عن تقويم هجري أنيق وسريع وما بيتقل التلفون نهائياً؟
لقينا ليك الحل الأكيد! تطبيق السنة الهجرية.. ساعة فلكية قمرية دقيقة ومبهرة في يدك طوالي!
بتعرف أطوار القمر الليلة شنو، وتتابع الأشهر الهجرية، ومناسباتنا الإسلامية بكل سهولة!
التطبيق إهداء مبارك لجمعية الكتاب والسنة الخيرية بالسودان، مع تحيات المصمم كمال جعفر زكريا.
أرسل الرابط لأصحابك في القروبات وخلي شاشاتهم تنور بالزمن القمري!`
    },
    {
      id: 'association_call',
      title: 'نداء الجمعية والشعار',
      duration: '35 ثانية',
      tag: 'رسمي وحماسي جهوري',
      sentences: [
        'الله أكبر.. ما شاء الله تبارك الله!',
        'صرح تقني جديد وإهداء مبارك نزفّه بكل فخر ومحبة إلى جمعية الكتاب والسنة الخيرية بالسودان!',
        'تطبيق السنة الهجرية.. ساعة الزمن القمري الأصيلة التي تجمع بين دقة الفلك وعراقة الهوية الإسلامية.',
        'تصميم وتطوير المبدع كمال جعفر زكريا.',
        'نزّلوه الآن مجاناً وشاركوه مع كل مسلم ومسلمة!'
      ],
      script: `الله أكبر.. ما شاء الله تبارك الله!
صرح تقني جديد وإهداء مبارك نزفّه بكل فخر ومحبة إلى جمعية الكتاب والسنة الخيرية بالسودان!
تطبيق السنة الهجرية.. ساعة الزمن القمري الأصيلة التي تجمع بين دقة الفلك وعراقة الهوية الإسلامية.
تصميم وتطوير المبدع كمال جعفر زكريا.
نزّلوه الآن مجاناً وشاركوه مع كل مسلم ومسلمة!`
    }
  ];

  const currentScriptObj = scripts.find(s => s.id === selectedScriptId) || scripts[0];

  // Inspect available browser voices on mount
  useEffect(() => {
    const updateVoices = () => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        const ar = voices.some(v => v.lang.startsWith('ar'));
        setHasArabicVoice(ar);
      }
    };

    updateVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      stopAllAudio();
    };
  }, []);

  const stopAllAudio = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (bgIntervalRef.current) {
      window.clearInterval(bgIntervalRef.current);
      bgIntervalRef.current = null;
    }
    if (sentenceTimerRef.current) {
      window.clearInterval(sentenceTimerRef.current);
      sentenceTimerRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
    setCurrentSentenceIndex(0);
  };

  // Upbeat, professional radio commercial background bed & fanfare using Web Audio API
  const startBackgroundMusic = (ctx: AudioContext) => {
    if (!playBgMusic) return;

    // Intro Fanfare sweep
    const now = ctx.currentTime;
    const fanfareNotes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C major upbeat arpeggio
    fanfareNotes.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + i * 0.07);
      gain.gain.setValueAtTime(0, now + i * 0.07);
      gain.gain.linearRampToValueAtTime(0.18, now + i * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.5);
    });

    // Sub Bass Thump
    const kickOsc = ctx.createOscillator();
    const kickGain = ctx.createGain();
    kickOsc.frequency.setValueAtTime(150, now);
    kickOsc.frequency.exponentialRampToValueAtTime(40, now + 0.3);
    kickGain.gain.setValueAtTime(0.3, now);
    kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    kickOsc.connect(kickGain);
    kickGain.connect(ctx.destination);
    kickOsc.start(now);
    kickOsc.stop(now + 0.38);

    // Continuous rhythmic commercial backing track
    let beatStep = 0;
    const interval = window.setInterval(() => {
      if (!ctx || ctx.state === 'closed') return;
      try {
        const t = ctx.currentTime;
        beatStep = (beatStep + 1) % 8;

        // Upbeat rhythm pad chords
        if (beatStep === 0 || beatStep === 4) {
          const chordOsc = ctx.createOscillator();
          const chordGain = ctx.createGain();
          chordOsc.type = 'sine';
          chordOsc.frequency.setValueAtTime(beatStep === 0 ? 196 : 220, t); // G3 or A3
          chordGain.gain.setValueAtTime(0.08, t);
          chordGain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
          chordOsc.connect(chordGain);
          chordGain.connect(ctx.destination);
          chordOsc.start(t);
          chordOsc.stop(t + 0.65);
        }

        // Crisp acoustic shakers / commercial hi-hat pulse on off-beats
        if (beatStep % 2 === 1) {
          const hatOsc = ctx.createOscillator();
          const hatGain = ctx.createGain();
          hatOsc.type = 'highpass' as unknown as OscillatorType;
          hatOsc.frequency.setValueAtTime(8000 + Math.random() * 2000, t);
          hatGain.gain.setValueAtTime(0.025, t);
          hatGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
          hatOsc.connect(hatGain);
          hatGain.connect(ctx.destination);
          hatOsc.start(t);
          hatOsc.stop(t + 0.07);
        }
      } catch {
        // ignore context closure
      }
    }, 280);

    bgIntervalRef.current = interval;
  };

  const handleTogglePlayback = () => {
    if (!('speechSynthesis' in window)) {
      alert('المتصفح لا يدعم توليد الصوت المباشر.');
      return;
    }

    if (isPlaying) {
      stopAllAudio();
      return;
    }

    // Stop previous utterances
    window.speechSynthesis.cancel();
    setCurrentSentenceIndex(0);

    // Initialize Web Audio Context
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;
        startBackgroundMusic(ctx);
      }
    } catch {
      // AudioContext unavailable
    }

    // Prepare speech synthesis
    setTimeout(() => {
      // Clean script text for optimal pronunciation
      const cleanedText = currentScriptObj.script
        .replace(/["*]/g, '')
        .replace(/ﷺ/g, 'صلى الله عليه وسلم');

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.lang = 'ar-SA';

      // Masculine, authoritative and energetic broadcasting tone
      if (voiceTone === 'energetic_male') {
        utterance.rate = 1.08; // Punchy, energetic ad delivery
        utterance.pitch = 0.82; // Deep resonant male commercial voice
      } else {
        utterance.rate = 0.95; // Calm, deep authoritative male voice
        utterance.pitch = 0.76;
      }

      // Pick best available Arabic male voice
      const voices = window.speechSynthesis.getVoices();
      const arabicVoices = voices.filter(v => v.lang.startsWith('ar'));
      
      const maleVoice = arabicVoices.find(v => 
        /male|maged|tarik|naayf|hamed|salman|fahad|youssef|zein|hoda/i.test(v.name)
      ) || arabicVoices.find(v => !/female|layla|salma|mariam|zari/i.test(v.name)) || arabicVoices[0];

      if (maleVoice) {
        utterance.voice = maleVoice;
      }

      utterance.onstart = () => {
        setIsPlaying(true);
        // Start simulated sentence tracker for the teleprompter
        const totalSentences = currentScriptObj.sentences.length;
        const estSentenceDuration = (selectedScriptId === 'radio_spot' ? 4500 : 5500);
        let currentIdx = 0;
        sentenceTimerRef.current = window.setInterval(() => {
          currentIdx = (currentIdx + 1) % totalSentences;
          setCurrentSentenceIndex(currentIdx);
        }, estSentenceDuration);
      };

      utterance.onend = () => {
        stopAllAudio();
      };

      utterance.onerror = () => {
        stopAllAudio();
      };

      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }, 450);
  };

  const handleCopyRawScript = async () => {
    try {
      await navigator.clipboard.writeText(currentScriptObj.script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleCopyProductionSheet = async () => {
    const fullProductionSheet = `🎙️ [اسكريبت الإعلان الحماسي - بصوت رجل بالعامية السودانية] 🎙️
===================================================
عنوان الإعلان: ${currentScriptObj.title} (${currentScriptObj.duration})
الأسلوب: صوت رجالي حماسي، جهوري، دافئ، نبرة إذاعية مفعمة بالطاقة والبهجة.
اللهجة: العامية السودانية الأصيلة.
الجهة المهداة: جمعية الكتاب والسنة الخيرية بالسودان
التصميم والإبداع: كمال جعفر زكريا
===================================================

[نص الإعلان]:
${currentScriptObj.script}

===================================================
[إرشادات الإخراج الصوتي للمعلق]:
1. النبرة الأولى: ابدأ بترحيب عريض ومبتسم وواثق ("يا هلا والله بالحبايب..").
2. التأكيد على الكلمات المفتاحية: "ساعة الزمن القمري"، "جمعية الكتاب والسنة الخيرية بالسودان"، "كمال جعفر زكريا".
3. الإيقاع: حماسي تصاعدي مع وقفات ذكية ومؤثرة تترك أثراً في ذهن المستمع.
4. الخاتمة: دعوة دافئة وصريحة لتثبيت واستخدام التطبيق مجاناً.`;

    try {
      await navigator.clipboard.writeText(fullProductionSheet);
      setCopiedWithNotes(true);
      setTimeout(() => setCopiedWithNotes(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-4 text-slate-200">
      
      {/* Header with Live Broadcast Indicator */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500/25 via-amber-400/20 to-yellow-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
            <Mic className="w-5 h-5 text-amber-400" />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm sm:text-base text-white font-cairo">
                صوت إعلاني حماسي (رجل بالعامية السودانية)
              </h4>
              {isPlaying && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 font-mono font-bold animate-pulse">
                  🔴 بث صوتي
                </span>
              )}
            </div>
            <p className="text-[11px] text-amber-400/90 font-medium">
              نبرة إذاعية حماسية جهورية • لهجة سودانية أصيلة 🇸🇩🎙️
            </p>
          </div>
        </div>

        {/* Quick Action: Copy */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopyRawScript}
            className="p-1.5 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-all cursor-pointer border border-slate-700 shadow-sm active:scale-95"
            title="نسخ نص الإعلان"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
            <span className="text-[11px] font-bold">{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
          </button>
        </div>
      </div>

      {/* Dedication Banner with Kitab & Sunnah Logo */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/50 border border-emerald-500/40 flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3 min-w-0">
          <KitabSunnahLogo size={36} />
          <div className="truncate">
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              <Heart className="w-3 h-3 text-emerald-400 fill-emerald-400/20" />
              <span>الإهداء الرسمي للتطبيق</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white font-cairo truncate">
              إهداء إلى: <span className="text-emerald-300 font-extrabold">جمعية الكتاب والسنة الخيرية بالسودان</span>
            </div>
          </div>
        </div>
        <div className="text-left shrink-0 text-[10px] text-slate-400">
          تصميم: <span className="text-amber-300 font-bold">كمال جعفر زكريا</span>
        </div>
      </div>

      {/* Script Selection Tabs */}
      <div>
        <label className="text-xs text-slate-400 font-medium mb-1.5 block">
          اختر نوع الاسكريبت الإعلاني:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-950/80 rounded-2xl border border-slate-800">
          {scripts.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                if (isPlaying) stopAllAudio();
                setSelectedScriptId(s.id);
              }}
              className={`p-2 rounded-xl text-right transition-all cursor-pointer ${
                selectedScriptId === s.id
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <div className="text-[11px] font-bold leading-tight font-cairo">{s.title}</div>
              <div className={`text-[9px] mt-0.5 ${selectedScriptId === s.id ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                {s.duration}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Live Studio Teleprompter & Script Box */}
      <div className="relative bg-slate-950/90 rounded-2xl border border-slate-800 p-4 shadow-inner max-h-52 overflow-y-auto scrollbar-thin select-text">
        
        {/* Floating Teleprompter sentence highlight */}
        <div className="space-y-2">
          {currentScriptObj.sentences.map((sentence, idx) => {
            const isActive = isPlaying && currentSentenceIndex === idx;
            return (
              <p
                key={idx}
                className={`text-xs sm:text-sm leading-relaxed font-cairo transition-all duration-300 ${
                  isActive
                    ? 'text-amber-300 font-bold bg-amber-500/15 p-1.5 rounded-lg border-r-2 border-amber-400 shadow-sm'
                    : 'text-slate-300'
                }`}
              >
                {sentence}
              </p>
            );
          })}
        </div>

      </div>

      {/* Voice Delivery & Audio Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        
        {/* Tone Selection */}
        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
          <span className="text-slate-400 font-medium">نبرة الصوت:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                if (isPlaying) stopAllAudio();
                setVoiceTone('energetic_male');
              }}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                voiceTone === 'energetic_male'
                  ? 'bg-amber-500/25 border border-amber-500/50 text-amber-300 font-extrabold shadow-sm'
                  : 'bg-slate-800/70 text-slate-400 hover:text-white'
              }`}
            >
              حماسي جهوري ⚡
            </button>
            <button
              onClick={() => {
                if (isPlaying) stopAllAudio();
                setVoiceTone('deep_male');
              }}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                voiceTone === 'deep_male'
                  ? 'bg-amber-500/25 border border-amber-500/50 text-amber-300 font-extrabold shadow-sm'
                  : 'bg-slate-800/70 text-slate-400 hover:text-white'
              }`}
            >
              إذاعي عميق 🎙️
            </button>
          </div>
        </div>

        {/* Music Background Toggle */}
        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
          <span className="text-slate-400 font-medium">موسيقى إعلانية خلفية:</span>
          <button
            onClick={() => setPlayBgMusic(!playBgMusic)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
              playBgMusic
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                : 'bg-slate-800/70 text-slate-400'
            }`}
          >
            <Music className="w-3 h-3" />
            <span>{playBgMusic ? 'مفعّلة' : 'معطّلة'}</span>
          </button>
        </div>

      </div>

      {/* Main Playback Bar with Equalizer */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-3">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Main Play/Stop Button */}
          <button
            onClick={handleTogglePlayback}
            className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 py-3 px-6 rounded-2xl font-bold text-sm transition-all shadow-xl active:scale-95 cursor-pointer ${
              isPlaying
                ? 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-red-500/30 animate-pulse'
                : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>إيقاف البث الإعلاني</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-slate-950" />
                <span className="font-extrabold font-cairo">استمع للإعلان الحماسي بصوت رجل سوداني 🔊</span>
              </>
            )}
          </button>

          {/* Reset / Stop Button */}
          {isPlaying && (
            <button
              onClick={stopAllAudio}
              className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
              title="إعادة التعيين"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

        </div>

        {/* Live Equalizer Visualizer */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <div className="flex items-center gap-1.5 h-6">
            {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((h, i) => (
              <span
                key={i}
                style={{
                  height: isPlaying ? `${Math.max(15, (h * (0.6 + Math.random() * 0.5)))}%` : '20%',
                  transition: 'height 0.15s ease'
                }}
                className={`w-1 rounded-full ${
                  isPlaying ? 'bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.6)]' : 'bg-slate-700'
                }`}
              />
            ))}
            <span className="text-[11px] text-amber-300/90 font-medium mr-2">
              {isPlaying ? 'جاري الإلقاء الإعلاني الحماسي...' : 'استديو التسجيل الإعلاني جاهز'}
            </span>
          </div>

          <span className="text-[10px] text-slate-400 font-mono">
            {voiceTone === 'energetic_male' ? '1.08x • حماسي' : '0.95x • جهوري'}
          </span>
        </div>

      </div>

      {/* Production Sheet Copy Button for Human Voice Actors & Broadcasters */}
      <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <FileText className="w-4 h-4 text-amber-400 shrink-0" />
          <span>ورقة عمل الإخراج الصوتي جاهزة للمعلقين وإذاعات الراديو:</span>
        </div>
        <button
          onClick={handleCopyProductionSheet}
          className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95 whitespace-nowrap"
        >
          {copiedWithNotes ? <Check className="w-3.5 h-3.5 text-white" /> : <Share2 className="w-3.5 h-3.5 text-white" />}
          <span>{copiedWithNotes ? 'تم نسخ ورقة المعلق الصوتي!' : 'نسخ اسكريبت المعلق وتوجيهات الإخراج'}</span>
        </button>
      </div>

    </div>
  );
};
