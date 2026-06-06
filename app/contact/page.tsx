import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="card-dark space-y-6">
          <div>
            <p className="text-brand-amber text-sm uppercase tracking-[0.2em] font-semibold">Contact</p>
            <h1 className="text-4xl font-black text-white mt-2">Need help or a business setup?</h1>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input className="input-dark" placeholder="Name" />
            <input className="input-dark" placeholder="Email" type="email" />
            <input className="input-dark sm:col-span-2" placeholder="Company" />
            <textarea className="input-dark sm:col-span-2 min-h-36" placeholder="Tell us what you need moved or how we can help your team" />
          </div>
          <button className="btn-primary w-full">Send message</button>
          <div className="text-sm text-white/50">
            <p>Email: hello@themanandtruck.com</p>
            <p>Phone/Text: +1 (555) TMT-TRUCK</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
