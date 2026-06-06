import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { Truck, Plus, Clock, DollarSign } from "lucide-react";

export default function ClientDashboardPage() {
  return (
    <main className="bg-brand-navy min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-white">Client Dashboard</h1>
              <p className="text-white/50 mt-1">Welcome back! Ready to book a delivery?</p>
            </div>
            <Link href="/client/book" className="btn-primary flex items-center gap-2">
              <Plus size={18} />
              Book Pickup
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Truck, label: "Total Bookings", value: "12" },
              { icon: DollarSign, label: "Total Spent", value: "$847.50" },
              { icon: Clock, label: "Avg. Wait Time", value: "12 min" },
              { icon: Truck, label: "Active Now", value: "1" },
            ].map((stat) => (
              <div key={stat.label} className="card-dark text-center">
                <stat.icon size={24} className="text-brand-amber mx-auto mb-2" />
                <p className="text-white font-black text-xl">{stat.value}</p>
                <p className="text-white/50 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="card-dark mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-lg">Recent Bookings</h2>
              <Link href="/client/bookings" className="text-brand-amber text-sm hover:underline">View all</Link>
            </div>
            <div className="text-center py-8">
              <Truck size={48} className="text-white/20 mx-auto mb-3" />
              <p className="text-white/50">No recent bookings. Book your first delivery!</p>
              <Link href="/client/book" className="btn-primary mt-4 inline-flex items-center gap-2 text-sm">
                <Plus size={14} />
                Book Now
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/client/book" className="card-dark hover:border-brand-amber/50 transition-all group">
              <div className="text-4xl mb-3">🚚</div>
              <h3 className="text-white font-bold mb-1 group-hover:text-brand-amber transition-colors">Book a Delivery</h3>
              <p className="text-white/50 text-sm">AI-powered dispatch in minutes</p>
            </Link>
            <Link href="/contact" className="card-dark hover:border-brand-amber/50 transition-all group">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-white font-bold mb-1 group-hover:text-brand-amber transition-colors">Get Support</h3>
              <p className="text-white/50 text-sm">24/7 customer support</p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
