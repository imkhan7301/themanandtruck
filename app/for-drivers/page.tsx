import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";

const perks = [
  "Flexible schedule with on-demand or scheduled loads",
  "Transparent payouts with 80% driver share",
  "AI-ranked jobs matched to your truck type and location",
  "Business, legal, medical, hospitality, and general hauling demand",
];

export default function ForDriversPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-brand-amber text-sm uppercase tracking-[0.2em] font-semibold">For drivers</p>
          <h1 className="text-5xl font-black text-white mt-3">Turn your truck into a business</h1>
          <p className="text-white/60 text-lg mt-4">Join a premium same-day delivery network built for serious drivers and real operators.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-dark">
            <h2 className="text-white text-2xl font-bold mb-4">Why drive with us</h2>
            <ul className="space-y-3 text-white/70">
              {perks.map((perk) => (
                <li key={perk}>• {perk}</li>
              ))}
            </ul>
          </div>
          <div className="card-dark">
            <h2 className="text-white text-2xl font-bold mb-4">What you need</h2>
            <ul className="space-y-3 text-white/70">
              <li>• Pickup truck, cargo van, or box truck</li>
              <li>• Valid license, insurance, and vehicle documentation</li>
              <li>• Smartphone and professional customer communication</li>
              <li>• Willingness to handle time-sensitive loads responsibly</li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <Link href="/signup/driver" className="btn-primary">Apply as a driver</Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
