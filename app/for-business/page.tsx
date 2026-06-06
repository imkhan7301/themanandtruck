import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";

const sectors = ["Hotels & hospitality", "Legal & court runners", "Medical & diagnostics", "Construction teams", "Retail & furniture stores", "Event logistics"];

export default function ForBusinessPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-brand-amber text-sm uppercase tracking-[0.2em] font-semibold">For business</p>
          <h1 className="text-5xl font-black text-white mt-3">Built for recurring routes and urgent operations</h1>
          <p className="text-white/60 text-lg mt-4">The Man & Truck helps ops teams book fast, track live, and keep every handoff documented.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-dark">
            <h2 className="text-white text-2xl font-bold mb-4">What business accounts unlock</h2>
            <ul className="space-y-3 text-white/70">
              <li>• Shared booking access for teams</li>
              <li>• Centralized invoicing and repeat route presets</li>
              <li>• Chain-of-custody workflows for sensitive deliveries</li>
              <li>• Real-time status for clients, guests, and internal teams</li>
            </ul>
          </div>
          <div className="card-dark">
            <h2 className="text-white text-2xl font-bold mb-4">Popular industries</h2>
            <div className="grid grid-cols-2 gap-3 text-white/70 text-sm">
              {sectors.map((sector) => (
                <div key={sector} className="rounded-xl bg-brand-navy border border-white/10 px-4 py-3">{sector}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link href="/contact" className="btn-primary">Talk to sales</Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
