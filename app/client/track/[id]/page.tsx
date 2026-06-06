import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { MapPin, Truck, CheckCircle, Clock } from "lucide-react";
import { getDirectionsUrl } from "@/lib/maps";

const TRACKING_STEPS = [
  { key: "PAID", label: "Payment Confirmed", icon: CheckCircle, done: true },
  { key: "MATCHED", label: "Driver Assigned", icon: Truck, done: true },
  { key: "DRIVER_EN_ROUTE", label: "Driver En Route", icon: MapPin, done: true },
  { key: "PICKED_UP", label: "Picked Up", icon: Truck, done: false },
  { key: "IN_TRANSIT", label: "In Transit", icon: Truck, done: false },
  { key: "DELIVERED", label: "Delivered", icon: CheckCircle, done: false },
];

export default function TrackingPage({ params }: { params: { id: string } }) {
  const directionsUrl = getDirectionsUrl("Pickup Location", "Dropoff Location");

  return (
    <main className="bg-brand-navy min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-white">Track Delivery</h1>
              <p className="text-brand-amber font-mono text-sm mt-1">#{params.id}</p>
            </div>
            <Link href="/client/bookings" className="text-brand-amber hover:underline text-sm">← My Bookings</Link>
          </div>

          <div className="card-dark border-brand-amber/30 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-brand-amber rounded-full animate-pulse" />
              <span className="text-brand-amber font-bold">Driver En Route</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/50 text-xs">Driver</p>
                <p className="text-white font-semibold">Marcus J.</p>
                <p className="text-white/50 text-xs">2022 Ford F-150 · TMT-001</p>
              </div>
              <div>
                <p className="text-white/50 text-xs">ETA</p>
                <p className="text-white font-semibold flex items-center gap-1">
                  <Clock size={14} className="text-brand-amber" />
                  8 minutes
                </p>
              </div>
            </div>
          </div>

          <div className="bg-brand-slate rounded-xl overflow-hidden mb-6 flex flex-col items-center justify-center gap-3" style={{ height: 240 }}>
            <MapPin size={40} className="text-brand-amber" />
            <p className="text-white/60 text-sm">Live map requires Google Maps API key</p>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
              <MapPin size={14} />
              Open in Google Maps
            </a>
          </div>

          <div className="card-dark">
            <h2 className="text-white font-bold text-lg mb-6">Delivery Timeline</h2>
            <div className="space-y-4">
              {TRACKING_STEPS.map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? "bg-brand-amber" : "bg-brand-slate border-2 border-white/20"}`}>
                    <step.icon size={14} className={step.done ? "text-brand-navy" : "text-white/30"} />
                  </div>
                  <span className={`text-sm flex-1 ${step.done ? "text-white font-medium" : "text-white/40"}`}>{step.label}</span>
                  {step.done && i === TRACKING_STEPS.filter(s => s.done).length - 1 && (
                    <span className="badge-today">Current</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
