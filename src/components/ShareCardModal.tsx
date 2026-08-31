import React, { useState, useRef } from 'react';
import { HijriDateInfo, MoonPhaseInfo } from '../types';
import { X, Share2, Copy, Check, MessageSquare, Download, Sparkles, Image as ImageIcon } from 'lucide-react';

interface ShareCardModalProps {
  currentHijri: HijriDateInfo;
  moonPhase: MoonPhaseInfo;
  onClose: () => void;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  currentHijri,
  moonPhase,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const shareText = `🌙 *تطبيق السنة الهجرية | ساعة الزمن القمري* 🌙
🗓️ اليوم: ${currentHijri.dayNameAr} ${currentHijri.day} ${currentHijri.monthNameAr} ${currentHijri.year} هـ
📅 الموافق: ${currentHijri.gregorianFormattedAr}
🌕 مرحلة القمر: ${moonPhase.nameAr} ${moonPhase.symbol} (${moonPhase.illumination}%)
${currentHijri.islamicEvent ? `⭐ مناسبة اليوم: ${currentHijri.islamicEvent}\n` : ''}${currentHijri.isSacredMonth ? `✨ من الأشهر الحرم (${currentHijri.monthNameAr})\n` : ''}
📲 شارك الزمن القمري مع أحبابك!`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(shareText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'السنة الهجرية | ساعة الزمن القمري',
          text: shareText,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopyText();
    }
  };

  // Generate and download share card as PNG image
  const handleDownloadImage = () => {
    setIsGeneratingImage(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1080);
      bgGrad.addColorStop(0, '#060a14');
      bgGrad.addColorStop(0.5, '#0b1326');
      bgGrad.addColorStop(1, '#03050a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1080);

      // Stars
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 90; i++) {
        const sx = Math.random() * 1080;
        const sy = Math.random() * 1080;
        const sRadius = Math.random() * 2 + 0.5;
        const sOpacity = Math.random() * 0.7 + 0.2;
        ctx.globalAlpha = sOpacity;
        ctx.beginPath();
        ctx.arc(sx, sy, sRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Outer Golden Frame
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 6;
      ctx.strokeRect(50, 50, 980, 980);

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(65, 65, 950, 950);

      // Corner ornaments
      ctx.font = '36px serif';
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('✦', 80, 110);
      ctx.fillText('✦', 960, 110);
      ctx.fillText('✦', 80, 990);
      ctx.fillText('✦', 960, 990);

      // Header App Title
      ctx.textAlign = 'center';
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText('السنة الهجرية • ساعة الزمن القمري', 540, 145);

      // Realistic Moon Illustration Circle in Center
      const moonCenterX = 540;
      const moonCenterY = 370;
      const moonRadius = 160;

      // Moon Glow
      const glowGrad = ctx.createRadialGradient(moonCenterX, moonCenterY, moonRadius * 0.8, moonCenterX, moonCenterY, moonRadius * 1.5);
      glowGrad.addColorStop(0, 'rgba(245, 158, 11, 0.3)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(moonCenterX, moonCenterY, moonRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Moon Body
      const moonGrad = ctx.createRadialGradient(moonCenterX - 50, moonCenterY - 50, 20, moonCenterX, moonCenterY, moonRadius);
      moonGrad.addColorStop(0, '#ffffff');
      moonGrad.addColorStop(0.3, '#f1f5f9');
      moonGrad.addColorStop(0.7, '#cbd5e1');
      moonGrad.addColorStop(1, '#94a3b8');
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(moonCenterX, moonCenterY, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // Moon border
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Moon Phase Symbol & Name inside Moon
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 40px sans-serif';
      ctx.fillText(moonPhase.symbol, moonCenterX, moonCenterY - 30);
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText(moonPhase.nameAr, moonCenterX, moonCenterY + 15);
      ctx.font = '22px sans-serif';
      ctx.fillText(`إضاءة ${moonPhase.illumination}%`, moonCenterX, moonCenterY + 50);

      // Day of Week
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '32px sans-serif';
      ctx.fillText(`يوم ${currentHijri.dayNameAr}`, 540, 600);

      // Main Hijri Date
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 56px sans-serif';
      ctx.fillText(`${currentHijri.day} ${currentHijri.monthNameAr} ${currentHijri.year} هـ`, 540, 675);

      // Gregorian Date
      ctx.fillStyle = '#94a3b8';
      ctx.font = '30px sans-serif';
      ctx.fillText(`الموافق ${currentHijri.gregorianFormattedAr}`, 540, 735);

      // Islamic Event Badge if present
      if (currentHijri.islamicEvent) {
        ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
        ctx.fillRect(340, 770, 400, 50);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.strokeRect(340, 770, 400, 50);

        ctx.fillStyle = '#6ee7b7';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText(`🌟 ${currentHijri.islamicEvent}`, 540, 804);
      }

      // Footer divider
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(150, 870);
      ctx.lineTo(930, 870);
      ctx.stroke();

      // Footer Credits
      ctx.fillStyle = '#f59e0b';
      ctx.font = '22px sans-serif';
      ctx.fillText('مع تحيات الهدي والنور للتطبيقات والمواقع الإسلامية', 540, 915);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '20px sans-serif';
      ctx.fillText('تصميم: كمال جعفر زكريا  |  واتساب: 00249919980435', 540, 955);

      // Download
      const link = document.createElement('a');
      link.download = `hijri-date-${currentHijri.day}-${currentHijri.monthIndex + 1}-${currentHijri.year}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      // Error handling
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-100 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base sm:text-lg">مشاركة تاريخ اليوم</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Visual Share Card Preview */}
        <div
          id="shareable-date-card"
          className="relative my-4 rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-[#0c1222] via-[#090e1a] to-[#04060b] border-2 border-amber-500/40 shadow-2xl overflow-hidden text-center select-text"
        >
          {/* Subtle starry & celestial decorations */}
          <div className="absolute top-2 right-3 text-amber-400/20 text-4xl select-none font-serif">✦</div>
          <div className="absolute bottom-2 left-3 text-amber-400/20 text-3xl select-none font-serif">🌙</div>
          <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent pointer-events-none" />

          {/* App Header Branding */}
          <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="tracking-wide">السنة الهجرية • ساعة الزمن القمري</span>
          </div>

          {/* Realistic Moon Graphic representation in card */}
          <div className="w-20 h-20 mx-auto my-2 rounded-full bg-gradient-to-tr from-slate-200 to-amber-100 border-2 border-amber-300/80 shadow-[0_0_20px_rgba(245,158,11,0.4)] flex flex-col items-center justify-center text-slate-950 p-1">
            <span className="text-xl">{moonPhase.symbol}</span>
            <span className="text-[10px] font-bold font-cairo text-slate-800">{moonPhase.nameAr}</span>
          </div>

          {/* Day of Week */}
          <div className="text-slate-300 text-xs sm:text-sm font-medium mt-2">
            اليوم: <span className="font-bold text-white">يوم {currentHijri.dayNameAr}</span>
          </div>

          {/* Hijri Date */}
          <div className="text-xl sm:text-2xl font-black font-amiri text-amber-400 my-1 drop-shadow-sm">
            {currentHijri.day} {currentHijri.monthNameAr} {currentHijri.year} هـ
          </div>

          {/* Gregorian Date */}
          <div className="text-xs sm:text-sm text-slate-400 mb-3">
            الموافق {currentHijri.gregorianFormattedAr}
          </div>

          {/* Extra Badge if Islamic occasion */}
          {currentHijri.islamicEvent && (
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium mb-3">
              🌟 {currentHijri.islamicEvent}
            </div>
          )}

          {/* Card Footer Signature */}
          <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 flex items-center justify-between">
            <span>الهدي والنور للتطبيقات الإسلامية</span>
            <span>تصميم: كمال جعفر زكريا</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleShareWhatsApp}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg active:scale-98"
          >
            <MessageSquare className="w-4 h-4" />
            <span>مشاركة عبر واتساب (WhatsApp)</span>
          </button>

          <button
            onClick={handleDownloadImage}
            disabled={isGeneratingImage}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>{isGeneratingImage ? 'جارٍ إنشاء الصورة...' : 'حفظ وتحميل بطاقة اليوم كصورة (PNG)'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
              <span>{copied ? 'تم النسخ بنجاح!' : 'نسخ النص'}</span>
            </button>

            <button
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-colors"
            >
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>مشاركة سريعة</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

