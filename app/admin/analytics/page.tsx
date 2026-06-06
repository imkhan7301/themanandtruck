import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const weekData = [
  { week: "Week 1", revenue: 1240, bookings: 18 },
  { week: "Week 2", revenue: 1847, bookings: 24 },
  { week: "Week 3", revenue: 2105, bookings: 31 },
  { week: "Week 4", revenue: 1950, bookings: 28 },
];

export default function AdminAnalyticsPage() {
  const totalRevenue = weekData.reduce((sum, w) => sum + w.revenue, 0);
  const totalBookings = weekData.reduce((sum, w) => sum + w.bookings, 0);
  const maxRevenue = Math.max(...weekData.map(w => w.revenue));

  return (
    <main className="bg-brand-navy min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-black text-white">Analytics</h1>
            <Link href="/admin" className="text-brand-amber hover:underline text-sm">← Admin</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Monthly Revenue", value: formatCurrency(totalRevenue) },
              { label: "Total Bookings", value: totalBookings.toString() },
              { label: "Platform Earnings", value: formatCurrency(totalRevenue * 0.2) },
              { label: "Avg per Booking", value: formatCurrency(totalRevenue / totalBookings) },
            ].map((stat) => (
              <div key={stat.label} className="card-dark text-center">
                <p className="text-brand-amber font-black text-xl">{stat.value}</p>
                <p className="text-white/50 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="card-dark">
            <h2 className="text-white font-bold text-lg mb-6">Weekly Revenue</h2>
            <div className="flex items-end justify-between gap-4 h-48">
              {weekData.map((w) => (
                <div key={w.week} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-white/60 text-xs">{formatCurrency(w.revenue)}</span>
                  <div className="w-full rounded-t-lg" style={{ height: `${(w.revenue / maxRevenue) * 140}px`, background: "linear-gradient(to top, #F59E0B, #FCD34D)" }} />
                  <span className="text-white/50 text-xs">{w.week}</span>
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
