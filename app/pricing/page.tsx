import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";

const tiers = [
  { title: "Small", price: "$40+", details: "Documents, luggage, medical kits, same-day courier runs" },
  { title: "Medium", price: "$65+", details: "Hotel logistics, event supplies, inventory transfers" },
  { title: "Large", price: "$110+", details: "Furniture, appliances, equipment, construction materials" },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-brand-amber text-sm uppercase tracking-[0.2em] font-semibold">Pricing</p>
          <h1 className="text-5xl font-black text-white mt-3">Transparent, AI-calculated quotes</h1>
          <p className="text-white/60 text-lg mt-4">Pricing factors include mileage, load size, urgency, and any special handling requirements.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <div key={tier.title} className="card-dark">
              <p className="text-brand-amber text-sm font-semibold">{tier.title}</p>
              <h2 className="text-white text-3xl font-black mt-2">{tier.price}</h2>
              <p className="text-white/60 text-sm mt-4">{tier.details}</p>
            </div>
          ))}
        </div>
        <div className="card-dark">
          <h2 className="text-white text-2xl font-bold mb-4">What affects pricing?</h2>
          <ul className="space-y-3 text-white/70">
            <li>• Minimum trip fare of $25 plus base dispatch fee.</li>
            <li>• Load surcharges for larger or specialized cargo.</li>
            <li>• Urgency multipliers for ASAP and same-day service.</li>
            <li>• Add-ons for fragile, chain-of-custody, time-critical, or hazmat loads.</li>
          </ul>
        </div>
        <div className="text-center">
          <Link href="/client/book" className="btn-primary">Get an instant quote</Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
