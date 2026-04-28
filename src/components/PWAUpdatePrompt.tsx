"use client";

import { useEffect, useState } from "react";

/**
 * Detects when a new service worker is waiting and prompts the user
 * to reload for the latest version.
 */
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
    <div className="pwa-update-prompt">
      <span>🚀 A new version is available!</span>
      <button onClick={handleUpdate}>Update now</button>
      <button onClick={() => setShowPrompt(false)}>Dismiss</button>
    </div>
  );
}
