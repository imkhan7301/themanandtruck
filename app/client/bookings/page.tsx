import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { Truck, Plus } from "lucide-react";

const mockBookings = [
  { id: "TMT-001", status: "IN_TRANSIT", pickup: "Hilton Downtown, 1234 Main St", dropoff: "LAX Airport Terminal 4", loadType: "Hotel & Hospitality", total: 66.25, driver: "Marcus J.", created: "Today, 2:30 PM" },
  { id: "TMT-002", status: "COMPLETED", pickup: "Steele & Associates, 500 Wilshire Blvd", dropoff: "Los Angeles Superior Court", loadType: "Legal & Court", total: 86.56, driver: "Diana M.", created: "Yesterday" },
  { id: "TMT-003", status: "PENDING", pickup: "CityMed Diagnostics, 789 Medical Dr", dropoff: "UCLA Medical Center", loadType: "Medical & Lab", total: 86.56, driver: null, created: "Just now" },
];

const statusColors: Record<string, string> = {
  IN_TRANSIT: "badge-today",
  COMPLETED: "badge-scheduled",
  PENDING: "badge-urgent",
  CANCELLED: "text-white/30 bg-white/5 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide",
};

const statusLabels: Record<string, string> = {
  IN_TRANSIT: "In Transit",
  COMPLETED: "Completed",
  PENDING: "Pending",
  CANCELLED: "Cancelled",
};

export default function ClientBookingsPage() {
  return (
    <main className="bg-brand-navy min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-white">My Bookings</h1>
              <p className="text-white/50 mt-1">Track all your deliveries</p>
            </div>
            <Link href="/client/book" className="btn-primary flex items-center gap-2 text-sm py-2 px-4">
              <Plus size={16} />
              New Booking
            </Link>
          </div>
          <div className="space-y-4">
            {mockBookings.map((b) => (
              <div key={b.id} className="card-dark">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-brand-amber font-bold text-sm">{b.id}</span>
                      <span className={statusColors[b.status]}>{statusLabels[b.status]}</span>
                    </div>
                    <p className="text-white/50 text-xs">{b.created}</p>
                  </div>
                  <span className="text-white font-bold">${b.total.toFixed(2)}</span>
                </div>
                <div className="space-y-1 mb-3">
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">↑</span>
                    <span className="text-white/70 truncate">{b.pickup}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-brand-amber mt-0.5 flex-shrink-0">↓</span>
                    <span className="text-white/70 truncate">{b.dropoff}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck size={14} className="text-white/40" />
                    <span className="text-white/50 text-xs">{b.driver ? `Driver: ${b.driver}` : "Awaiting driver"}</span>
                  </div>
                  <span className="text-white/40 text-xs">{b.loadType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
