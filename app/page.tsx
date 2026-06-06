import Link from 'next/link'
import { Navbar } from '@/components/shared/Navbar'
import { getLoadTypeEmoji, getLoadTypeLabel } from '@/lib/utils'

const LOAD_TYPES = [
  'MEDICAL_LAB', 'LEGAL_DOCUMENTS', 'HOTEL_LOGISTICS', 'FURNITURE_APPLIANCES',
  'SAME_DAY_COURIER', 'CONSTRUCTION_MATERIALS', 'EVENT_SETUP', 'GENERAL_HAULING',
]

const HOW_IT_WORKS = [
  { step: '01', icon: '📍', title: 'Tell us what you need', desc: 'Enter pickup & dropoff, choose your load type, size, and urgency. Takes 60 seconds.' },
  { step: '02', icon: '🤖', title: 'AI builds your quote', desc: 'Our pricing engine calculates a fair, transparent quote in real-time. No hidden fees.' },
  { step: '03', icon: '🚚', title: 'Matched to a pro driver', desc: 'We match you to the nearest verified driver who fits your job. See their rating & truck.' },
  { step: '04', icon: '✅', title: 'Done. Get on with life.', desc: 'Track in real-time. Driver delivers. You rate. Money moves automatically.' },
]

const STATS = [
  { value: '4.9★', label: 'Avg Driver Rating' },
  { value: '<8min', label: 'Avg Match Time' },
  { value: '100%', label: 'Background Checked' },
  { value: '20%', label: 'Platform Fee Only' },
]

const TESTIMONIALS = [
  { name: 'Sarah M.', role: 'Grand Hotel Manager', quote: 'We use TheManAndTruck for all our linens and supplies. Always on time, always professional. InshAllah they keep growing!', rating: 5 },
  { name: 'James P.', role: 'Attorney at Law', quote: 'Critical documents delivered with full chain of custody. This service understands what law firms need.', rating: 5 },
  { name: 'Marcus J.', role: 'Driver, 87 Jobs', quote: 'Made $4,200 last month driving my F-150. The app is clean, payouts are fast, and I choose my own hours. Best side hustle ever.', rating: 5 },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-navy">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-road pt-16">
        {/* Background glow */}
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-amber/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-amber/3 rounded-full blur-3xl" />

        <div className="section-container relative z-10 text-center py-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium text-brand-amber mb-8 border border-brand-amber/20">
            <span className="w-2 h-2 rounded-full bg-brand-amber animate-pulse" />
            AI-Powered · Human Driven · Fully Verified
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
            Your Load.
            <br />
            <span className="gradient-text">Our Mission.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            On-demand pickup truck & box truck delivery for businesses and people who need it done right.{' '}
            <span className="text-white/80 font-semibold">One call. One truck. Done.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/client/book" className="btn-amber text-lg px-8 py-4 w-full sm:w-auto">
              🚚 Book a Truck Now
            </Link>
            <Link href="/drivers" className="btn-outline text-lg px-8 py-4 w-full sm:w-auto">
              💰 Drive & Earn
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {STATS.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-brand-amber">{s.value}</div>
                <div className="text-xs text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section id="industries" className="py-24 bg-brand-slate/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Built for <span className="gradient-text">Every Industry</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              From hospital labs to hotel lobbies, law offices to construction sites — we haul it all.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {LOAD_TYPES.map((type) => (
              <Link
                key={type}
                href={`/client/book?loadType=${type}`}
                className="card-dark p-6 text-center hover:card-glow hover:scale-[1.02] transition-all duration-200 group"
              >
                <div className="text-4xl mb-3">{getLoadTypeEmoji(type)}</div>
                <div className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  {getLoadTypeLabel(type)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-white/50 text-lg">From request to delivery in minutes, not hours.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={i} className="relative card-dark p-8 group hover:card-glow transition-all duration-200">
                <div className="text-6xl font-black text-white/5 absolute top-4 right-4 leading-none select-none">
                  {item.step}
                </div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-brand-amber/40 text-2xl z-10">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 bg-brand-slate/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Transparent <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              No surprises. AI quotes every job fairly. We take 20%. Drivers keep 80%.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { urgency: 'SCHEDULED', label: 'Scheduled', emoji: '📅', base: 'From $30', desc: 'Plan ahead and save. Perfect for recurring business deliveries.', color: 'border-green-500/20 hover:border-green-500/40' },
              { urgency: 'TODAY', label: 'Today', emoji: '⏰', base: 'From $38', desc: 'Need it within 4 hours? We got you. Same-day priority matching.', color: 'border-amber-500/20 hover:border-amber-500/40', featured: true },
              { urgency: 'ASAP', label: 'ASAP', emoji: '🚨', base: 'From $45', desc: 'Emergency delivery within 1 hour. Nearest driver dispatched instantly.', color: 'border-red-500/20 hover:border-red-500/40' },
            ].map((tier) => (
              <div key={tier.urgency} className={`card-dark border-2 ${tier.color} p-8 transition-all duration-200 relative ${tier.featured ? 'scale-[1.03] glow-amber' : ''}`}>
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-amber text-brand-navy text-xs font-black px-4 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                <div className="text-4xl mb-3">{tier.emoji}</div>
                <h3 className="text-xl font-black text-white mb-1">{tier.label}</h3>
                <div className="text-3xl font-black text-brand-amber mb-3">{tier.base}</div>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">{tier.desc}</p>
                <Link href={`/client/book?urgency=${tier.urgency}`} className="btn-amber w-full text-center block text-sm py-2">
                  Book {tier.label} →
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-white/30 text-sm mt-8">
            + Load size fee · Distance rate $2.50/mi · Special handling add-ons available
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              What People <span className="gradient-text">Say</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card-dark p-8 hover:card-glow transition-all duration-200">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-brand-amber text-lg">★</span>
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-white text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DRIVER CTA ── */}
      <section className="py-24 bg-brand-amber relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="section-container relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-brand-navy mb-4">
            Got a Truck? <br />Start Earning Today.
          </h2>
          <p className="text-brand-navy/70 text-lg max-w-xl mx-auto mb-10">
            Join verified drivers making $2,000–$6,000/month on their own schedule. Pickup trucks and box trucks welcome.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/drivers/apply" className="bg-brand-navy text-white font-bold px-8 py-4 rounded-xl hover:bg-brand-slate transition-colors text-lg">
              Apply to Drive →
            </Link>
            <Link href="/drivers" className="border-2 border-brand-navy/30 text-brand-navy font-bold px-8 py-4 rounded-xl hover:border-brand-navy transition-colors text-lg">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-brand-navy border-t border-white/5 py-16">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="text-brand-amber font-black text-lg mb-2">THE MAN & TRUCK</div>
              <p className="text-white/40 text-sm leading-relaxed">
                AI-powered on-demand truck delivery. Your Load. Our Mission. InshAllah.
              </p>
            </div>
            {[
              { title: 'Platform', links: ['Book a Truck', 'How It Works', 'Pricing', 'Industries'] },
              { title: 'Drivers', links: ['Apply to Drive', 'Driver App', 'Earnings', 'Requirements'] },
              { title: 'Company', links: ['About Us', 'Blog', 'Careers', 'Contact'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-bold text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm">© 2025 The Man & Truck. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-white/30 hover:text-white/60 text-sm transition-colors">Privacy</Link>
              <Link href="/terms" className="text-white/30 hover:text-white/60 text-sm transition-colors">Terms</Link>
              <Link href="/support" className="text-white/30 hover:text-white/60 text-sm transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
