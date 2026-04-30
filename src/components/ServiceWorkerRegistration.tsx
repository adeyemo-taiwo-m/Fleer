"use client";

import { useEffect } from "react";

/**
 * Registers the service worker on mount (client-side only).
 * Place this component anywhere inside the root layout.
 */
export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    // Small delay to ensure the page has settled, especially during dev reloads
    const timer = setTimeout(() => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((reg) => {
          console.log("[SW] Registered. Scope:", reg.scope);

          // Check for updates every 60 seconds
          const interval = setInterval(() => reg.update(), 60_000);
          return () => clearInterval(interval);
        })
        .catch((err) => {
          console.error("[SW] Registration failed:", err);
          
          // If we are in an invalid state, try to unregister and recover
          if (err.message.includes("invalid state") || err.name === "InvalidStateError") {
            console.warn("[SW] Attempting recovery from invalid state...");
            navigator.serviceWorker.getRegistrations().then(registrations => {
              for (const registration of registrations) {
                registration.unregister();
              }
            });
          }
        });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return null; // Renders nothing — side-effects only
}
