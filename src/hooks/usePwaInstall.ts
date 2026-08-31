import { useState, useEffect } from 'react';

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showManualGuide, setShowManualGuide] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone mode (installed)
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://');
      if (isStandaloneMode) {
        setIsInstalled(true);
      }
    };

    checkStandalone();

    // Listen for the native Android beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowManualGuide(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const triggerInstall = async (): Promise<'installed' | 'dismissed' | 'manual_guide'> => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          setIsInstalled(true);
          setDeferredPrompt(null);
          return 'installed';
        } else {
          return 'dismissed';
        }
      } catch (err) {
        setShowManualGuide(true);
        return 'manual_guide';
      }
    } else {
      // Direct prompt not available (e.g. iOS Safari or browser menu required)
      setShowManualGuide(true);
      return 'manual_guide';
    }
  };

  return {
    isInstallable: !isInstalled,
    isInstalled,
    hasDirectPrompt: !!deferredPrompt,
    showManualGuide,
    setShowManualGuide,
    triggerInstall,
  };
}
