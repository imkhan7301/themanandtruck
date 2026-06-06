"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Truck, Sparkles } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";
import { formatCurrency } from "@/lib/utils";

type LoadSize = "SMALL" | "MEDIUM" | "LARGE" | "EXTRA_LARGE";
type Urgency = "ASAP" | "TODAY" | "SCHEDULED";

const loadFees: Record<LoadSize, number> = {
  SMALL: 10,
  MEDIUM: 25,
  LARGE: 50,
  EXTRA_LARGE: 85,
};

const urgencyMultipliers: Record<Urgency, number> = {
  ASAP: 1.25,
  TODAY: 1.15,
  SCHEDULED: 1,
};

const services = [
  "MEDICAL_LAB",
  "LEGAL_DOCUMENTS",
  "HOTEL_LOGISTICS",
  "FURNITURE_APPLIANCES",
  "SAME_DAY_COURIER",
  "CONSTRUCTION_MATERIALS",
  "EVENT_SETUP",
  "GENERAL_HAULING",
] as const;

const specialOptions = [
  { label: "Fragile items", value: "fragile", fee: 15 },
  { label: "Chain of custody", value: "chainOfCustody", fee: 20 },
  { label: "Time critical", value: "timeCritical", fee: 25 },
  { label: "Hazmat / restricted", value: "hazmat", fee: 35 },
];

export default function BookingWizardPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    pickupAddress: "",
    dropoffAddress: "",
    contactName: "",
    email: "",
    phone: "",
    loadType: "GENERAL_HAULING",
    loadSize: "MEDIUM" as LoadSize,
    urgency: "TODAY" as Urgency,
    estimatedMiles: 18,
    specialHandling: [] as string[],
    notes: "",
    scheduledFor: "",
  });

  const quote = useMemo(() => {
    const distanceFee = Math.max(form.estimatedMiles * 2.5, 25);
    const specialFee = specialOptions
      .filter((option) => form.specialHandling.includes(option.value))
      .reduce((total, option) => total + option.fee, 0);
    const baseRate = 5;
    const loadFee = loadFees[form.loadSize];
    const subtotal = baseRate + distanceFee + loadFee + specialFee;
    const urgencySurcharge = subtotal * (urgencyMultipliers[form.urgency] - 1);
    const total = subtotal + urgencySurcharge;
    return {
      baseRate,
      distanceFee,
      loadFee,
      specialFee,
      urgencySurcharge,
      total,
      driverPayout: total * 0.8,
    };
  }, [form]);

  const next = () => setStep((current) => Math.min(4, current + 1));
  const back = () => setStep((current) => Math.max(1, current - 1));

  const toggleSpecial = (value: string) => {
    setForm((current) => ({
      ...current,
      specialHandling: current.specialHandling.includes(value)
        ? current.specialHandling.filter((item) => item !== value)
        : [...current.specialHandling, value],
    }));
  };

  const submit = () => {
    setSubmitted(true);
    setStep(4);
  };

  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div>
            <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.2em]">Book a Pickup</p>
            <h1 className="text-4xl font-black text-white mt-2">Fast 4-step booking wizard</h1>
          </div>
          <Link href="/client/bookings" className="text-white/70 hover:text-white text-sm">View my bookings →</Link>
        </div>

        <div className="grid md:grid-cols-[1.4fr_0.9fr] gap-6">
          <div className="card-dark">
            <div className="flex gap-2 mb-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className={`h-2 flex-1 rounded-full ${item <= step ? "bg-brand-amber" : "bg-white/10"}`} />
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-5 animate-fade-up">
                <h2 className="text-2xl font-bold text-white">Where should we go?</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-white/70 mb-2">Pickup address</label>
                    <input className="input-dark" placeholder="Hotel, office, lab, store..." value={form.pickupAddress} onChange={(e) => setForm({ ...form, pickupAddress: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-white/70 mb-2">Dropoff address</label>
                    <input className="input-dark" placeholder="Destination address" value={form.dropoffAddress} onChange={(e) => setForm({ ...form, dropoffAddress: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-2">Contact name</label>
                    <input className="input-dark" placeholder="Your name" value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-2">Phone number</label>
                    <input className="input-dark" placeholder="(555) 555-5555" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-white/70 mb-2">Email</label>
                    <input className="input-dark" type="email" placeholder="ops@business.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 animate-fade-up">
                <h2 className="text-2xl font-bold text-white">What are we moving?</h2>
                <div>
                  <label className="block text-sm text-white/70 mb-2">Service type</label>
                  <select className="input-dark" value={form.loadType} onChange={(e) => setForm({ ...form, loadType: e.target.value })}>
                    {services.map((service) => (
                      <option key={service} value={service}>{service.replaceAll("_", " ")}</option>
                    ))}
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/70 mb-2">Load size</label>
                    <select className="input-dark" value={form.loadSize} onChange={(e) => setForm({ ...form, loadSize: e.target.value as LoadSize })}>
                      {Object.keys(loadFees).map((size) => (
                        <option key={size} value={size}>{size.replaceAll("_", " ")}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-2">Urgency</label>
                    <select className="input-dark" value={form.urgency} onChange={(e) => setForm({ ...form, urgency: e.target.value as Urgency })}>
                      {Object.keys(urgencyMultipliers).map((urgency) => (
                        <option key={urgency} value={urgency}>{urgency}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-white/70 mb-2">
                    <label>Estimated miles</label>
                    <span>{form.estimatedMiles} mi</span>
                  </div>
                  <input type="range" min={1} max={100} value={form.estimatedMiles} onChange={(e) => setForm({ ...form, estimatedMiles: Number(e.target.value) })} className="w-full accent-brand-amber" />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-3">Special handling</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {specialOptions.map((option) => {
                      const active = form.specialHandling.includes(option.value);
                      return (
                        <button key={option.value} type="button" onClick={() => toggleSpecial(option.value)} className={`rounded-xl border p-4 text-left ${active ? "border-brand-amber bg-brand-amber/10" : "border-white/10 bg-brand-navy"}`}>
                          <p className="text-white font-semibold text-sm">{option.label}</p>
                          <p className="text-brand-amber text-xs">+{formatCurrency(option.fee)}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-2">Notes</label>
                  <textarea className="input-dark min-h-28" placeholder="Gate codes, suite number, contact instructions..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-2">Scheduled date/time (optional)</label>
                  <input type="datetime-local" className="input-dark" value={form.scheduledFor} onChange={(e) => setForm({ ...form, scheduledFor: e.target.value })} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 animate-fade-up">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-amber/10 border border-brand-amber/30 text-brand-amber text-sm">
                  <Sparkles size={14} /> Instant AI Quote
                </div>
                <h2 className="text-2xl font-bold text-white">Review your estimate</h2>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="bg-brand-navy rounded-xl p-4 border border-white/10">
                    <p className="text-white/50 mb-1">Route</p>
                    <p className="text-white font-medium">{form.pickupAddress || "Pickup pending"}</p>
                    <p className="text-white/40 my-2">↓</p>
                    <p className="text-white font-medium">{form.dropoffAddress || "Dropoff pending"}</p>
                  </div>
                  <div className="bg-brand-navy rounded-xl p-4 border border-white/10">
                    <p className="text-white/50 mb-1">Load summary</p>
                    <p className="text-white font-medium">{form.loadType.replaceAll("_", " ")}</p>
                    <p className="text-white/60">{form.loadSize.replaceAll("_", " ")} • {form.estimatedMiles} miles • {form.urgency}</p>
                  </div>
                </div>
                <div className="space-y-3 bg-brand-navy rounded-xl p-5 border border-white/10">
                  {[
                    ["Base dispatch", quote.baseRate],
                    ["Distance fee", quote.distanceFee],
                    ["Load fee", quote.loadFee],
                    ["Special handling", quote.specialFee],
                    ["Urgency surcharge", quote.urgencySurcharge],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between text-white/70">
                      <span>{label}</span>
                      <span>{formatCurrency(Number(value))}</span>
                    </div>
                  ))}
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between text-xl font-black text-white">
                    <span>Total estimate</span>
                    <span className="text-brand-amber">{formatCurrency(quote.total)}</span>
                  </div>
                  <p className="text-sm text-white/50">Estimated driver payout: {formatCurrency(quote.driverPayout)}. You&apos;ll only be charged once a driver accepts.</p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5 animate-fade-up text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-brand-success/20 flex items-center justify-center">
                  <CheckCircle2 size={40} className="text-brand-success" />
                </div>
                <h2 className="text-3xl font-black text-white">Request ready to dispatch</h2>
                <p className="text-white/60 max-w-xl mx-auto">
                  {submitted
                    ? "Your booking request has been staged for dispatch. Connect payments and auth to go live, or keep using the prototype flow for demos."
                    : "Finalize your request and we&apos;ll alert the nearest verified driver in the network."}
                </p>
                <div className="grid sm:grid-cols-3 gap-4 text-left">
                  <div className="bg-brand-navy rounded-xl p-4 border border-white/10">
                    <p className="text-white/50 text-sm">Estimated total</p>
                    <p className="text-brand-amber text-2xl font-black">{formatCurrency(quote.total)}</p>
                  </div>
                  <div className="bg-brand-navy rounded-xl p-4 border border-white/10">
                    <p className="text-white/50 text-sm">Load type</p>
                    <p className="text-white font-semibold">{form.loadType.replaceAll("_", " ")}</p>
                  </div>
                  <div className="bg-brand-navy rounded-xl p-4 border border-white/10">
                    <p className="text-white/50 text-sm">Dispatch status</p>
                    <p className="text-brand-success font-semibold">Ready for driver match</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={submit} className="btn-primary inline-flex items-center justify-center gap-2">
                    <Truck size={18} /> Confirm booking request
                  </button>
                  <Link href="/client/bookings" className="btn-outline text-center">Go to client bookings</Link>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between gap-3">
              <button onClick={back} disabled={step === 1} className="px-4 py-3 rounded-lg border border-white/10 text-white/70 disabled:opacity-40 inline-flex items-center gap-2">
                <ArrowLeft size={16} /> Back
              </button>
              {step < 4 ? (
                <button onClick={step === 3 ? submit : next} className="btn-primary inline-flex items-center gap-2">
                  {step === 3 ? "Submit Request" : "Continue"} <ArrowRight size={16} />
                </button>
              ) : (
                <button onClick={() => { setSubmitted(false); setStep(1); }} className="btn-primary">Start a new booking</button>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card-dark">
              <h3 className="text-white font-bold text-lg mb-4">Why customers choose us</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li>• AI quote in seconds</li>
                <li>• Verified pickup and box truck drivers</li>
                <li>• Real-time SMS, email, and live status updates</li>
                <li>• Built for hotels, labs, legal teams, and same-day businesses</li>
              </ul>
            </div>
            <div className="card-dark">
              <p className="text-brand-amber font-semibold mb-2">Need a business account?</p>
              <p className="text-white/60 text-sm mb-4">Centralize approvals, recurring routes, and billing for your team.</p>
              <Link href="/for-business" className="btn-outline w-full block text-center">Explore business tools</Link>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </main>
  );
}
