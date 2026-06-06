import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://themanandtruck.com"),
  title: "The Man & Truck — Your Load. Our Mission.",
  description:
    "AI-powered on-demand pickup truck & box truck delivery. Professional drivers for hotels, law firms, medical labs, and anyone who needs it moved fast.",
  keywords: [
    "pickup truck delivery",
    "on-demand hauling",
    "gig marketplace",
    "truck driver",
    "courier service",
  ],
  authors: [{ name: "The Man & Truck" }],
  openGraph: {
    title: "The Man & Truck — Your Load. Our Mission.",
    description: "AI-powered on-demand pickup truck delivery. One Call. One Truck. Done.",
    url: "https://themanandtruck.com",
    siteName: "The Man & Truck",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Man & Truck",
    description: "Your Load. Our Mission.",
    images: ["/og-image.svg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/icons/icon-192.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#F59E0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-brand-navy text-brand-light min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
