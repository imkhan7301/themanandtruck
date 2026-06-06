import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="card-dark space-y-6">
          <div>
            <p className="text-brand-amber text-sm font-semibold uppercase tracking-[0.2em]">Welcome back</p>
            <h1 className="text-4xl font-black text-white mt-2">Log in</h1>
          </div>
          <div className="space-y-4">
            <input className="input-dark" type="email" placeholder="Email address" />
            <input className="input-dark" type="password" placeholder="Password" />
            <button className="btn-primary w-full">Log in</button>
            <button className="btn-outline w-full">Continue with Google</button>
          </div>
          <div className="text-sm text-white/50 space-y-1">
            <p>Demo credentials:</p>
            <p>Admin: admin@themanandtruck.com / admin123!</p>
            <p>Driver: marcus@themanandtruck.com / driver123!</p>
          </div>
          <p className="text-white/50 text-sm text-center">Need an account? <Link href="/signup/client" className="text-brand-amber">Sign up</Link></p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
