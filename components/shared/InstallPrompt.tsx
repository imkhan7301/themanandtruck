"use client";

import { useState, useEffect } from "react";
import { X, Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80">
      <div className="relative bg-brand-slate border border-brand-amber/30 rounded-xl p-4 shadow-2xl">
        <button onClick={() => setVisible(false)} className="absolute top-3 right-3 text-white/40 hover:text-white">
          <X size={16} />
        </button>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-brand-amber rounded-lg flex items-center justify-center flex-shrink-0">
            <Download size={20} className="text-brand-navy" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Add to Home Screen</p>
            <p className="text-white/60 text-xs mt-1">Install The Man & Truck for quick access — book pickups instantly.</p>
            <button onClick={handleInstall} className="mt-3 bg-brand-amber text-brand-navy text-xs font-bold py-2 px-4 rounded-lg w-full">
              Install App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
