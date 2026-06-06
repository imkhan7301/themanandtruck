import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { DollarSign, TrendingUp, Truck } from "lucide-react";

const weeklyData = [
  { day: "Mon", earnings: 145, jobs: 3 },
  { day: "Tue", earnings: 220, jobs: 4 },
  { day: "Wed", earnings: 87, jobs: 2 },
  { day: "Thu", earnings: 315, jobs: 5 },
  { day: "Fri", earnings: 280, jobs: 4 },
  { day: "Sat", earnings: 420, jobs: 6 },
  { day: "Sun", earnings: 190, jobs: 3 },
];

const maxEarnings = Math.max(...weeklyData.map((d) => d.earnings));

export default function DriverEarningsPage() {
  const totalWeek = weeklyData.reduce((sum, d) => sum + d.earnings, 0);
  const totalJobs = weeklyData.reduce((sum, d) => sum + d.jobs, 0);

  return (
    <main className="bg-brand-navy min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-white">Earnings</h1>
              <p className="text-white/50 mt-1">This week</p>
            </div>
            <Link href="/driver" className="text-brand-amber hover:underline text-sm">← Dashboard</Link>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: DollarSign, label: "This Week", value: formatCurrency(totalWeek) },
              { icon: Truck, label: "Jobs Done", value: totalJobs.toString() },
              { icon: TrendingUp, label: "Avg Per Job", value: formatCurrency(totalWeek / totalJobs) },
            ].map((stat) => (
              <div key={stat.label} className="card-dark text-center">
                <stat.icon size={20} className="text-brand-amber mx-auto mb-1" />
                <p className="text-white font-black text-lg">{stat.value}</p>
                <p className="text-white/40 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="card-dark mb-6">
            <h2 className="text-white font-bold text-lg mb-6">This Week</h2>
            <div className="flex items-end justify-between gap-2 h-40">
              {weeklyData.map((d) => (
                <div key={d.day} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-white/40 text-xs">{formatCurrency(d.earnings).replace("$", "")}</span>
                  <div className="w-full bg-brand-navy rounded-t-lg" style={{ height: `${(d.earnings / maxEarnings) * 120}px`, background: "linear-gradient(to top, #F59E0B, #FCD34D)" }} />
                  <span className="text-white/60 text-xs">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-dark">
            <h2 className="text-white font-bold text-lg mb-4">Payout Info</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/60">Gross Earnings</span>
                <span className="text-white">{formatCurrency(totalWeek / 0.8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Platform Fee (20%)</span>
                <span className="text-white/60">-{formatCurrency((totalWeek / 0.8) * 0.2)}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white font-bold">Your Take-Home (80%)</span>
                <span className="text-brand-amber font-black">{formatCurrency(totalWeek)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
