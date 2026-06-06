import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";
import { InstallPrompt } from "@/components/shared/InstallPrompt";
import { QRCodeDisplay } from "@/components/shared/QRCodeDisplay";
import { EarningsCalcClient } from "@/components/landing/EarningsCalculator";
import { Zap, MapPin, Star, Shield, Clock, DollarSign, Truck, ChevronRight, Phone } from "lucide-react";

const services = [
  { icon: "🏥", title: "Medical & Lab", desc: "Time-critical specimen and equipment delivery with chain of custody" },
  { icon: "⚖️", title: "Legal & Court", desc: "Document delivery with signature verification for law firms" },
  { icon: "🏨", title: "Hotel & Hospitality", desc: "Luggage, equipment, and supply runs for hotels and venues" },
  { icon: "🛋️", title: "Furniture & Appliances", desc: "Heavy-item delivery and setup from stores to homes" },
  { icon: "📦", title: "Same-Day Courier", desc: "Express package delivery anywhere in the metro area" },
  { icon: "🏗️", title: "Construction", desc: "Materials, tools, and equipment for job sites" },
  { icon: "🎪", title: "Events & Setup", desc: "Event equipment, décor, and rental item delivery" },
  { icon: "🔧", title: "General Hauling", desc: "Anything that needs a truck — we&apos;ve got you covered" },
];

const steps = [
  { icon: "📍", step: "01", title: "Post Your Job", desc: "Tell us what needs to move, where it&apos;s going, and when you need it." },
  { icon: "🤖", step: "02", title: "AI Matches You", desc: "Our AI dispatches the nearest verified driver in seconds." },
  { icon: "🚚", step: "03", title: "Live Tracking", desc: "Watch your delivery in real time from pickup to drop-off." },
];

const features = [
  { icon: Zap, title: "AI-Powered Dispatch", desc: "Smart matching gets you a driver in minutes, not hours." },
  { icon: Clock, title: "15-Min Avg Response", desc: "Lightning fast — we&apos;re ready when you need us." },
  { icon: Shield, title: "Insured & Verified", desc: "Every driver background checked, licensed, and insured." },
  { icon: MapPin, title: "Real-Time GPS", desc: "Live tracking from the moment your driver is assigned." },
  { icon: DollarSign, title: "Transparent Pricing", desc: "AI-calculated quotes upfront. No surprises, ever." },
  { icon: Star, title: "24/7 Operations", desc: "Day or night, weekday or weekend — we&apos;re always on." },
];

const testimonials = [
  {
    name: "Michael Torres",
    role: "Concierge Manager, Hilton Downtown",
    text: "We use The Man & Truck at least 3 times a week for guest luggage and equipment runs. They&apos;re faster than any other service we&apos;ve tried. Highly professional.",
    rating: 5,
  },
  {
    name: "Jennifer Park",
    role: "Operations Director, Steele & Associates Law",
    text: "Chain of custody is everything for legal deliveries. The Man & Truck handles our court documents with the professionalism we require. Never missed a deadline.",
    rating: 5,
  },
  {
    name: "Dr. Ahmad Hassan",
    role: "Lab Manager, CityMed Diagnostics",
    text: "Time-critical specimen transport requires reliability. The Man & Truck&apos;s same-day service and real-time tracking gives us total peace of mind. Inshallah they keep growing!",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <main className="bg-brand-navy min-h-screen">
      <Navbar />
      <InstallPrompt />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-brand-slate opacity-50" />
          <div className="absolute bottom-8 left-0 right-0 h-1 bg-brand-amber opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy to-brand-slate opacity-80" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(245,158,11,0.15) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-brand-amber/10 border border-brand-amber/30 rounded-full px-4 py-2 mb-6">
                <Zap size={14} className="text-brand-amber" />
                <span className="text-brand-amber text-sm font-medium">AI-Powered. Human Driven.</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
                Your Load.<br />
                <span className="text-brand-amber">Our Mission.</span>
              </h1>

              <p className="text-xl text-white/60 mb-8 max-w-lg mx-auto lg:mx-0">
                Professional pickup &amp; box truck delivery — on-demand, AI-powered, always on time. One Call. One Truck. Done.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Link href="/client/book" className="btn-primary text-center text-lg flex items-center justify-center gap-2">
                  <Truck size={20} />
                  Book a Pickup Now
                </Link>
                <Link href="/signup/driver" className="btn-outline text-center text-lg flex items-center justify-center gap-2">
                  <DollarSign size={20} />
                  Drive &amp; Earn
                </Link>
              </div>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {["✓ Verified Drivers", "✓ Real-Time Tracking", "✓ Instant AI Quotes", "✓ 24/7 Available"].map((badge) => (
                  <span key={badge} className="bg-brand-slate/60 border border-white/10 text-white/70 text-sm px-3 py-1 rounded-full">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="card-dark text-center p-8">
                <p className="text-brand-amber font-bold text-lg mb-2">Scan to Book Instantly</p>
                <p className="text-white/50 text-sm mb-6">Share with hotels, law firms, and businesses</p>
                <QRCodeDisplay url="https://themanandtruck.com/client/book" size={200} label="" />
                <p className="text-white/40 text-xs mt-4">themanandtruck.com/client/book</p>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Phone size={16} className="text-brand-amber" />
                <span>Or call/text to book: <strong className="text-white">+1 (555) TMT-TRUCK</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-slate/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">How It Works</h2>
            <p className="text-white/60 text-lg">Simple. Fast. Reliable. Just the way it should be.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.step} className="text-center relative">
                <div className="relative inline-block">
                  <div className="w-20 h-20 bg-brand-slate border-2 border-brand-amber/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-brand-amber text-brand-navy text-xs font-black rounded-full flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-white/60">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2">
                    <ChevronRight className="text-brand-amber opacity-40" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">What We Move</h2>
            <p className="text-white/60 text-lg">From medical specimens to hotel luggage — we handle it all.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service) => (
              <Link key={service.title} href="/client/book" className="card-dark hover:border-brand-amber/50 hover:bg-brand-slate transition-all duration-200 cursor-pointer group">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-white font-bold text-sm mb-2 group-hover:text-brand-amber transition-colors">{service.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-slate/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Why The Man &amp; Truck?</h2>
            <p className="text-white/60 text-lg">Need It Moved? We&apos;ve Got You.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="card-dark">
                <div className="w-12 h-12 bg-brand-amber/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-brand-amber" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Got a Truck? Start Earning Today.</h2>
            <p className="text-white/60 text-lg">See how much you could earn with The Man &amp; Truck.</p>
          </div>
          <EarningsCalcClient />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Trusted by Businesses</h2>
            <p className="text-white/60 text-lg">On Time. Every Time. Inshallah.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="card-dark">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <Star key={index} size={16} className="text-brand-amber fill-brand-amber" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-6">&quot;{testimonial.text}&quot;</p>
                <div>
                  <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-white/50 text-xs">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-amber">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-brand-navy mb-4">Got a Truck? Start Earning Today.</h2>
          <p className="text-brand-navy/70 text-lg mb-8">Join verified drivers earning $800–$2,000+ per week on their own schedule.</p>
          <Link href="/signup/driver" className="bg-brand-navy text-white font-bold py-4 px-8 rounded-xl text-lg inline-flex items-center gap-2 hover:bg-brand-slate transition-colors">
            <Truck size={20} />
            Sign Up as a Driver
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
