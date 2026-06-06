import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { Truck, Star, CheckCircle } from "lucide-react";

export default function DriverProfilePage() {
  return (
    <main className="bg-brand-navy min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-black text-white">Driver Profile</h1>
            <Link href="/driver" className="text-brand-amber hover:underline text-sm">← Dashboard</Link>
          </div>
          <div className="card-dark mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-brand-amber/20 rounded-full flex items-center justify-center text-2xl">👤</div>
              <div>
                <h2 className="text-white font-black text-xl">Marcus Johnson</h2>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={14} className="text-brand-amber fill-brand-amber" />
                  <span className="text-white font-semibold">4.9</span>
                  <span className="text-white/40 text-sm">· 47 jobs</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <CheckCircle size={14} className="text-brand-success" />
                  <span className="text-brand-success text-sm font-medium">Verified Driver</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-dark mb-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><Truck size={20} className="text-brand-amber" /> Truck Details</h3>
            <div className="space-y-2">
              {[
                { label: "Type", value: "Pickup Truck" },
                { label: "Vehicle", value: "2022 Ford F-150" },
                { label: "License Plate", value: "TMT-001" },
              ].map(item => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-white/50 text-sm">{item.label}</span>
                  <span className="text-white text-sm">{item.value}</span>
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
