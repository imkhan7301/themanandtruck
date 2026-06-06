"use client";

import type { ComponentType } from "react";
import { useEffect, useState } from "react";

interface QRCodeDisplayProps {
  url: string;
  label?: string;
  size?: number;
}

type QRComponent = ComponentType<Record<string, unknown>>;

export function QRCodeDisplay({ url, label = "Scan to Book Instantly", size = 150 }: QRCodeDisplayProps) {
  const [QRCode, setQRCode] = useState<QRComponent | null>(null);

  useEffect(() => {
    import("qrcode.react").then((mod) => {
      setQRCode(mod.QRCodeSVG as unknown as QRComponent);
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-white p-4 rounded-xl shadow-lg">
        {QRCode ? (
          <QRCode value={url} size={size} bgColor="#ffffff" fgColor="#0F172A" />
        ) : (
          <div style={{ width: size, height: size }} className="bg-slate-200 animate-pulse rounded" />
        )}
      </div>
      <p className="text-white/60 text-sm text-center">{label}</p>
    </div>
  );
}
