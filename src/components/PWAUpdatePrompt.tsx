"use client";

import { useEffect, useState } from "react";
import { Zap, RefreshCcw, X } from "lucide-react";

export default function PWAUpdatePrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const handleUpdate = (reg: ServiceWorkerRegistration) => {
      if (reg.waiting) {
        setWaitingWorker(reg.waiting);
        setShowPrompt(true);
      }
    };

    navigator.serviceWorker.ready.then((reg) => {
      reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing;
        newWorker?.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            handleUpdate(reg);
          }
        });
      });
    });
  }, []);

  const handleUpdate = () => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    setShowPrompt(false);
    window.location.reload();
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[2000] w-[calc(100%-2rem)] max-w-md animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="bg-fleer-accent/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-accent p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
          <Zap size={20} fill="currentColor" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-display font-bold text-white">Update Available</h4>
          <p className="text-xs text-white/80">Fleer has been updated. Reload to apply.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleUpdate}
            className="bg-white text-fleer-accent text-xs font-display font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2"
          >
            <RefreshCcw size={14} />
            Update
          </button>
          <button 
            onClick={() => setShowPrompt(false)}
            className="p-2 text-white/60 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
