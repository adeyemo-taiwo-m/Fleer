"use client";

import { useEffect, useState } from "react";
import { Smartphone, X, Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setDeferredPrompt(null);
  };

  if (!deferredPrompt || dismissed) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[2000] w-[calc(100%-2rem)] max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-fleer-card/95 backdrop-blur-xl border border-fleer-border rounded-2xl shadow-2xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-fleer-accent/10 flex items-center justify-center text-fleer-accent shrink-0">
          <Smartphone size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-display font-bold text-fleer-text">Fleer for Mobile</h4>
          <p className="text-xs text-fleer-text-muted">Install the app for a smoother, native experience.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleInstall}
            className="bg-fleer-accent hover:bg-fleer-accent/90 text-fleer-bg text-xs font-display font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-accent"
          >
            <Download size={14} />
            Install
          </button>
          <button 
            onClick={() => setDismissed(true)}
            className="p-2 text-fleer-text-muted hover:text-fleer-text transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
