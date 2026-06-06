import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { Truck, Star, CheckCircle } from "lucide-react";

const drivers = [
  { name: "Marcus Johnson", email: "marcus@themanandtruck.com", vehicle: "2022 Ford F-150", type: "PICKUP", status: "VERIFIED", rating: 4.9, jobs: 47 },
  { name: "Diana Martinez", email: "diana@themanandtruck.com", vehicle: "2021 Toyota Tacoma", type: "PICKUP", status: "VERIFIED", rating: 4.8, jobs: 32 },
  { name: "James Wilson", email: "james@themanandtruck.com", vehicle: "2020 Ford Transit", type: "BOX_TRUCK", status: "VERIFIED", rating: 5.0, jobs: 89 },
  { name: "Sarah Chen", email: "sarah@themanandtruck.com", vehicle: "2023 Mercedes Sprinter", type: "BOX_TRUCK", status: "VERIFIED", rating: 4.7, jobs: 23 },
  { name: "Carlos Rivera", email: "carlos@themanandtruck.com", vehicle: "2019 Chevrolet Silverado", type: "PICKUP", status: "PENDING", rating: 5.0, jobs: 0 },
];

export default function AdminDriversPage() {
  return (
    <main className="bg-brand-navy min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-white">Driver Management</h1>
              <p className="text-white/50 mt-1">{drivers.length} drivers total · {drivers.filter(d => d.status === "VERIFIED").length} verified</p>
            </div>
            <Link href="/admin" className="text-brand-amber hover:underline text-sm">← Admin</Link>
          </div>
          <div className="space-y-4">
            {drivers.map((driver, i) => (
              <div key={i} className="card-dark flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-amber/20 rounded-full flex items-center justify-center text-xl">👤</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-semibold">{driver.name}</p>
                      {driver.status === "VERIFIED" ? (
                        <CheckCircle size={14} className="text-brand-success" />
                      ) : (
                        <span className="badge-urgent">PENDING</span>
                      )}
                    </div>
                    <p className="text-white/50 text-xs">{driver.email}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1"><Truck size={12} className="text-white/40" /><span className="text-white/50 text-xs">{driver.vehicle}</span></div>
                      <div className="flex items-center gap-1"><Star size={12} className="text-brand-amber" /><span className="text-white text-xs">{driver.rating} · {driver.jobs} jobs</span></div>
                    </div>
                  </div>
                </div>
                {driver.status === "PENDING" && (
                  <div className="flex gap-2">
                    <button className="bg-brand-success/20 text-brand-success text-xs font-bold py-2 px-3 rounded-lg">Approve</button>
                    <button className="bg-brand-danger/20 text-brand-danger text-xs font-bold py-2 px-3 rounded-lg">Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
