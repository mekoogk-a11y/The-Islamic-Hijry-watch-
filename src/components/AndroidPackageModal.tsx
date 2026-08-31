import React, { useState } from 'react';
import { X, Smartphone, Download, Check, ShieldCheck, FileCode, Play, Copy } from 'lucide-react';

interface AndroidPackageModalProps {
  onClose: () => void;
}

export const AndroidPackageModal: React.FC<AndroidPackageModalProps> = ({ onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);

  // Check if browser has beforeinstallprompt
  React.useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPromptEvent(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallPWA = async () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      const choiceResult迷 = await installPromptEvent.userChoice;
      setInstallPromptEvent(null);
    } else {
      alert('لتثبيت التطبيق على هاتفك: اضغط على قائمة المتصفح (⋮) ثم اختر "إضافة إلى الشاشة الرئيسية" (Add to Home Screen)');
    }
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const APP_CONFIG = {
    appName: 'السنة الهجرية | ساعة الزمن القمري',
    packageName: 'com.alhadialnour.alssanahalhijriya',
    versionName: '1.0.0',
    versionCode: '1',
    minSdkVersion: '21 (Android 5.0+)',
    targetSdkVersion: '35 (Android 15)',
    buildType: 'Release (Signed AAB & APK)',
    orientation: 'Portrait (عمودي)',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-100 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base sm:text-lg font-amiri">حزمة تطبيق Android للهاتف</h3>
              <p className="text-xs text-slate-400 font-sans">بيانات حزمة التثبيت وإعدادات النشر على Google Play</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Direct Phone Install Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-emerald-600/20 border border-emerald-500/40 mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>جاهز للتثبيت الفوري كـ Web App / PWA</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">يعمل أوفلاين 100% دون الحاجة إلى إنترنت</div>
          </div>
          <button
            onClick={handleInstallPWA}
            className="py-2 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95 whitespace-nowrap flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تثبيت بالهاتف</span>
          </button>
        </div>

        {/* Package Specs Grid */}
        <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-2.5 mb-4 text-xs font-mono">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
            <span className="text-slate-400">Application ID:</span>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400 font-bold">{APP_CONFIG.packageName}</span>
              <button
                onClick={() => copyText(APP_CONFIG.packageName, 'pkg')}
                className="text-slate-400 hover:text-white"
                title="نسخ"
              >
                {copiedSection === 'pkg' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
            <span className="text-slate-400">App Name:</span>
            <span className="text-slate-200 font-sans">{APP_CONFIG.appName}</span>
          </div>

          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
            <span className="text-slate-400">Version:</span>
            <span className="text-slate-200">v{APP_CONFIG.versionName} (Build {APP_CONFIG.versionCode})</span>
          </div>

          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
            <span className="text-slate-400">Target SDK:</span>
            <span className="text-slate-200">{APP_CONFIG.targetSdkVersion}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Build Output:</span>
            <span className="text-emerald-400 font-semibold">{APP_CONFIG.buildType}</span>
          </div>
        </div>

        {/* Android Studio / Capacitor Build Command instructions */}
        <div className="bg-slate-950/60 rounded-2xl p-3.5 border border-slate-800 mb-4 text-xs text-slate-300 space-y-2 font-sans">
          <div className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
            <FileCode className="w-3.5 h-3.5" />
            <span>خطوات التجميع والنشر على متجر Google Play:</span>
          </div>
          <div className="p-2.5 rounded-xl bg-black/80 font-mono text-[11px] text-amber-200/90 border border-slate-800/80 space-y-1">
            <div className="text-slate-500"># بناء نسخة الإنتاج واستخراج AAB و APK:</div>
            <div className="text-emerald-300">./gradlew bundleRelease assembleRelease</div>
            <div className="text-slate-500"># الناتج جاهز للرفع على Play Console:</div>
            <div className="text-slate-300">app/build/outputs/bundle/release/app-release.aab</div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition-colors text-center"
        >
          تم
        </button>

      </div>
    </div>
  );
};
