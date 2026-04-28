"use client";

import { useEffect } from "react";

/**
 * Registers the service worker on mount (client-side only).
 * Place this component anywhere inside the root layout.
 */
export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((reg) => {
          console.log("[SW] Registered. Scope:", reg.scope);

          // Check for updates every 60 seconds
          const interval = setInterval(() => reg.update(), 60_000);
          return () => clearInterval(interval);
        })
        .catch((err) =>
          console.error("[SW] Registration failed:", err)
        );
    }
  }, []);

  return null; // Renders nothing — side-effects only
}
