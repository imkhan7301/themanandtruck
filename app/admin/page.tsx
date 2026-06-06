import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { DollarSign, Truck, CheckCircle, AlertTriangle } from "lucide-react";

const stats = [
  { icon: Truck, label: "Bookings Today", value: "24", change: "+8%" },
  { icon: DollarSign, label: "Revenue Today", value: "$1,847", change: "+12%" },
  { icon: CheckCircle, label: "Active Drivers", value: "7", change: "Online" },
  { icon: AlertTriangle, label: "Pending Verifications", value: "3", change: "Review" },
];

const recentBookings = [
  { id: "TMT-20241206-007", client: "CityMed Diagnostics", loadType: "Medical & Lab", status: "PENDING", driver: "—", amount: "$86.56" },
  { id: "TMT-20241206-006", client: "Hilton Downtown", loadType: "Hotel & Hospitality", status: "IN_TRANSIT", driver: "Diana M.", amount: "$66.25" },
  { id: "TMT-20241205-005", client: "Steele & Associates", loadType: "Legal & Court", status: "COMPLETED", driver: "Marcus J.", amount: "$57.50" },
  { id: "TMT-20241204-004", client: "Hilton Downtown", loadType: "Furniture & Appliances", status: "COMPLETED", driver: "Sarah C.", amount: "$105.00" },
];

const pendingDrivers = [
  { name: "Carlos Rivera", truckType: "Pickup Truck", vehicle: "2019 Chevrolet Silverado", submitted: "2h ago" },
];

const statusColors: Record<string, string> = {
  PENDING: "badge-urgent",
  IN_TRANSIT: "badge-today",
  COMPLETED: "badge-scheduled",
};

export default function AdminPage() {
  return (
    <main className="bg-brand-navy min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
              <p className="text-white/50 mt-1">The Man & Truck Operations Center</p>
            </div>
            <div className="flex gap-3">
              <Link href="/admin/drivers" className="btn-outline text-sm py-2 px-4">Manage Drivers</Link>
              <Link href="/admin/bookings" className="btn-primary text-sm py-2 px-4">All Bookings</Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="card-dark">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon size={20} className="text-brand-amber" />
                  <span className="text-brand-success text-xs font-semibold">{stat.change}</span>
                </div>
                <p className="text-white font-black text-2xl">{stat.value}</p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Bookings Table */}
          <div className="card-dark mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-lg">Recent Bookings</h2>
              <Link href="/admin/bookings" className="text-brand-amber text-sm hover:underline">View all</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {["Booking ID", "Client", "Load Type", "Status", "Driver", "Amount", "Action"].map(h => (
                      <th key={h} className="text-white/50 text-xs text-left pb-3 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 pr-4 text-brand-amber font-mono text-xs">{b.id}</td>
                      <td className="py-3 pr-4 text-white">{b.client}</td>
                      <td className="py-3 pr-4 text-white/70">{b.loadType}</td>
                      <td className="py-3 pr-4"><span className={statusColors[b.status]}>{b.status}</span></td>
                      <td className="py-3 pr-4 text-white/70">{b.driver}</td>
                      <td className="py-3 pr-4 text-white font-semibold">{b.amount}</td>
                      <td className="py-3">
                        <button className="text-brand-amber hover:underline text-xs">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Driver Verification Queue */}
          <div className="card-dark">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-lg">Driver Verification Queue</h2>
              <Link href="/admin/drivers" className="text-brand-amber text-sm hover:underline">View all</Link>
            </div>
            {pendingDrivers.length === 0 ? (
              <p className="text-white/50 text-center py-6">No pending verifications. All caught up!</p>
            ) : (
              <div className="space-y-4">
                {pendingDrivers.map((driver, i) => (
                  <div key={i} className="bg-brand-navy rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-amber/20 rounded-full flex items-center justify-center text-xl">👤</div>
                      <div>
                        <p className="text-white font-semibold">{driver.name}</p>
                        <p className="text-white/50 text-xs">{driver.vehicle} · {driver.truckType}</p>
                        <p className="text-white/30 text-xs">Submitted {driver.submitted}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-brand-success/20 text-brand-success text-xs font-bold py-2 px-3 rounded-lg hover:bg-brand-success/30 transition-colors">Approve</button>
                      <button className="bg-brand-danger/20 text-brand-danger text-xs font-bold py-2 px-3 rounded-lg hover:bg-brand-danger/30 transition-colors">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
