import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'The Man & Truck — Your Load. Our Mission.',
  description: 'AI-powered on-demand pickup truck & box truck delivery. Professional, verified drivers. Real-time tracking. Instant quotes.',
  keywords: ['pickup truck delivery', 'on-demand hauling', 'truck gig', 'same day delivery', 'furniture delivery', 'man and truck'],
  authors: [{ name: 'The Man & Truck' }],
  creator: 'The Man & Truck',
  publisher: 'The Man & Truck',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://themanandtruck.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://themanandtruck.com',
    siteName: 'The Man & Truck',
    title: 'The Man & Truck — Your Load. Our Mission.',
    description: 'AI-powered on-demand pickup truck delivery. One call. One truck. Done.',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'The Man & Truck' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Man & Truck — Your Load. Our Mission.',
    description: 'AI-powered on-demand pickup truck delivery.',
    images: ['/og-image.svg'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    apple: '/icons/icon-192.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Man & Truck',
  },
}

export const viewport: Viewport = {
  themeColor: '#F59E0B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-brand-navy text-brand-light antialiased`}>
        {children}
      </body>
    </html>
  )
}
