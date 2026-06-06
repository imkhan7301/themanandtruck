import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function DriverSignupPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="card-dark space-y-6">
          <div>
            <p className="text-brand-amber text-sm font-semibold uppercase tracking-[0.2em]">Driver signup</p>
            <h1 className="text-4xl font-black text-white mt-2">Join the verified driver network</h1>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input className="input-dark" placeholder="Full name" />
            <input className="input-dark" placeholder="Email address" type="email" />
            <input className="input-dark" placeholder="Phone number" />
            <select className="input-dark">
              <option>Pickup truck</option>
              <option>Box truck</option>
              <option>Cargo van</option>
            </select>
            <input className="input-dark sm:col-span-2" placeholder="Vehicle make/model/year" />
            <textarea className="input-dark sm:col-span-2 min-h-28" placeholder="Tell us about your delivery experience" />
          </div>
          <button className="btn-primary w-full">Submit driver application</button>
          <p className="text-white/50 text-sm text-center">Already have an account? <Link href="/login" className="text-brand-amber">Log in</Link></p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
