import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";

export default function DriverJobsPage() {
  return (
    <main className="bg-brand-navy min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-black text-white mb-2">Job History</h1>
          <p className="text-white/50 mb-8">All your completed and active jobs</p>
          <Link href="/driver" className="text-brand-amber hover:underline text-sm">← Back to Dashboard</Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
