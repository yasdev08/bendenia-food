"use client";

import { Download, Share } from "lucide-react";
import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

/**
 * Progressive "install the app" affordance:
 * - Android/Chromium: real install button, shown only when the browser fires
 *   `beforeinstallprompt` (i.e. the PWA is installable).
 * - iOS Safari: there is no install API, so a one-line "Share → Add to Home Screen" hint.
 * - Already installed (standalone) or unsupported: renders nothing.
 */
export function InstallApp() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) return;

    const ua = navigator.userAgent;
    const isIos = /iPad|iPhone|iPod/.test(ua) || (ua.includes("Mac") && "ontouchend" in document);
    // Only Safari can add to the home screen on older iOS; in-app browsers (Instagram, TikTok…) cannot.
    const inApp = /Instagram|FBAN|FBAV|TikTok|musical_ly|Snapchat/i.test(ua);
    // Defer to avoid a synchronous setState inside the effect body.
    const t = setTimeout(() => setIos(isIos && !inApp), 0);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setDeferred(null);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      clearTimeout(t);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (deferred) {
    return (
      <button
        type="button"
        onClick={async () => {
          await deferred.prompt();
          await deferred.userChoice;
          setDeferred(null);
        }}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-bold text-burgundy transition hover:bg-orange hover:text-cream"
      >
        <Download className="size-4" aria-hidden="true" />
        Installer l’application
      </button>
    );
  }

  if (ios) {
    return (
      <p className="mt-5 inline-flex items-center gap-1.5 text-xs text-cream/65">
        Ajoutez-nous à l’écran d’accueil : <Share className="size-3.5" aria-label="Partager" /> puis
        « Sur l’écran d’accueil »
      </p>
    );
  }

  return null;
}
