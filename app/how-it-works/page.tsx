import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";

const steps = [
  { title: "1. Submit the load", text: "Add route details, urgency, load type, and any special handling requirements in minutes." },
  { title: "2. AI pricing + dispatch", text: "Our quote engine prices the trip instantly and dispatch logic ranks the best-fit drivers." },
  { title: "3. Driver accepts the job", text: "Verified pickup or box truck drivers receive the job and confirm pickup." },
  { title: "4. Track delivery live", text: "Clients get live status, proof of delivery, and a clean audit trail for operations teams." },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-brand-amber text-sm uppercase tracking-[0.2em] font-semibold">How it works</p>
          <h1 className="text-5xl font-black text-white mt-3">One Call. One Truck. Done.</h1>
          <p className="text-white/60 text-lg mt-4">A mobile-first dispatch experience designed for speed, trust, and real-time visibility.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step) => (
            <div key={step.title} className="card-dark">
              <h2 className="text-white text-2xl font-bold mb-3">{step.title}</h2>
              <p className="text-white/60">{step.text}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/client/book" className="btn-primary">Start a booking</Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
