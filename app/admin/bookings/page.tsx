import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";

export default function AdminBookingsPage() {
  return (
    <main className="bg-brand-navy min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-black text-white">All Bookings</h1>
            <Link href="/admin" className="text-brand-amber hover:underline text-sm">← Admin</Link>
          </div>
          <div className="card-dark text-center py-12">
            <p className="text-white/50">Bookings management requires database connection.</p>
            <p className="text-white/30 text-sm mt-2">Set up DATABASE_URL in .env to load real data.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
