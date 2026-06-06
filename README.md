# 🚚 The Man & Truck

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://prisma.io)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635bff?logo=stripe)](https://stripe.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-Powered-412991?logo=openai)](https://openai.com)

> **Your Load. Our Mission.**

AI-powered on-demand pickup truck & box truck gig marketplace. Built to make life and work simpler for every laborer on the road — InshAllah.

**🌐 Live:** [themanandtruck.com](https://themanandtruck.com)

---

## 🎯 Mission

*"Making life and work simple for laborers and everyone in this industry."*

TheManAndTruck.com connects clients (hotels, law firms, medical labs, furniture stores, and anyone who needs it moved) with verified pickup and box truck drivers for time-sensitive deliveries, hauling, courier runs, and labor gigs.

---

## ✨ Features

### For Clients
- 📋 **Smart Booking Wizard** — 4-step form with AI quote generation
- 🤖 **AI-Powered Pricing** — Instant transparent quotes based on distance, load, and urgency
- 🚚 **Real-Time Tracking** — Live GPS tracking from pickup to delivery
- 📱 **PWA** — Installable on any phone, works offline
- 📲 **QR Code** — Share scan-to-book link with businesses

### For Drivers  
- 💰 **Earn 80%** — Keep 80% of every job, weekly payouts via Stripe Connect
- 📡 **Job Feed** — Browse and accept nearby gigs in real-time
- 🔄 **Availability Toggle** — Go online/offline like Uber
- 📊 **Earnings Dashboard** — Daily, weekly, monthly breakdown
- 📱 **Mobile-First** — Designed for use on the road

### For Admins
- 📈 **Operations Dashboard** — Bookings, revenue, driver stats
- ✅ **Driver Verification** — Review and approve driver applications
- 🗺️ **Live Map** — See active drivers and jobs in real-time
- 📊 **Revenue Analytics** — Charts, trends, business metrics

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (strict) |
| **Styling** | Tailwind CSS + custom brand config |
| **Database** | PostgreSQL + Prisma ORM |
| **Auth** | NextAuth.js v5 (email + Google OAuth) |
| **Payments** | Stripe + Stripe Connect |
| **AI** | OpenAI GPT-3.5 (pricing + matching) |
| **Real-time** | Pusher |
| **Maps** | Google Maps API |
| **Uploads** | Cloudinary |
| **Email** | Resend |
| **SMS** | Twilio |
| **Hosting** | Vercel |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Neon/Supabase free tier)
- npm or yarn

### 1. Clone & Install

```bash
git clone <repository-url>
cd themanandtruck
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Fill in your values in `.env.local`. Minimum required for local dev:
- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — Run `openssl rand -base64 32`

### 3. Database Setup

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
themanandtruck/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page
│   ├── client/book/        # 4-step booking wizard
│   ├── driver/             # Driver dashboard
│   ├── admin/              # Admin panel
│   └── api/                # API routes
├── components/
│   ├── brand/              # Logo, brand assets
│   ├── landing/            # Homepage sections
│   ├── shared/             # Navbar, Footer, QR, etc.
├── lib/                    # Utilities & integrations
├── prisma/                 # Schema + seed data
└── public/                 # Static assets + SVG logos
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | ✅ | JWT signing secret |
| `NEXTAUTH_URL` | ✅ | Your domain (e.g. https://themanandtruck.com) |
| `GOOGLE_CLIENT_ID` | Optional | Google OAuth |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Optional | Maps/Places API |
| `STRIPE_SECRET_KEY` | Optional | Payments (graceful fallback if not set) |
| `OPENAI_API_KEY` | Optional | AI pricing (uses rule-based fallback) |
| `RESEND_API_KEY` | Optional | Transactional email |
| `TWILIO_*` | Optional | SMS notifications |
| `PUSHER_*` | Optional | Real-time updates |
| `CLOUDINARY_*` | Optional | Document uploads |

---

## 🚢 Deploy to Vercel

```bash
npm run build   # Verify build passes locally first
```

1. Push to GitHub
2. Connect repo at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables in Vercel dashboard
4. Deploy!

---

## 💼 Business Model

| Revenue Stream | Details |
|---|---|
| Platform Fee | 20% of every booking |
| Driver Payout | 80% direct to driver via Stripe Connect |
| Surge Pricing | ASAP +25%, Today +15% |
| Special Handling | $15–$35 additional per booking |

---

## 🗺️ Roadmap

- [x] Landing page with QR code
- [x] 4-step booking wizard with AI pricing
- [x] Driver dashboard with job feed
- [x] Admin panel with verification queue
- [x] PWA manifest & install prompt
- [x] Driver signup mobile form
- [ ] Live GPS tracking (Google Maps integration)
- [ ] Stripe Connect driver payouts
- [ ] Push notifications
- [ ] Driver ratings & reviews
- [ ] Corporate accounts / bulk booking API
- [ ] iOS/Android native apps

---

## 🙏 About

Built by the founder — a pickup truck owner ready to take gigs today. The goal: make every hotel, law firm, medical lab, and business in the area able to book a trusted driver in minutes.

*"On Time. Every Time. InshAllah."*

---

© 2024 The Man & Truck. All rights reserved. AI-Powered. Human Driven.
