"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-navy/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo variant="white" size="sm" />

          <div className="hidden md:flex items-center gap-6">
            <Link href="/how-it-works" className="text-white/70 hover:text-white text-sm transition-colors">How It Works</Link>
            <Link href="/pricing" className="text-white/70 hover:text-white text-sm transition-colors">Pricing</Link>
            <Link href="/for-drivers" className="text-white/70 hover:text-white text-sm transition-colors">Drive & Earn</Link>
            <Link href="/for-business" className="text-white/70 hover:text-white text-sm transition-colors">For Business</Link>
            <Link href="/login" className="text-white/70 hover:text-white text-sm transition-colors">Login</Link>
            <Link href="/client/book" className="btn-primary text-sm py-2 px-4">Book Now</Link>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-brand-slate border-t border-white/10">
          <div className="px-4 py-4 flex flex-col gap-4">
            <Link href="/how-it-works" className="text-white/70 text-base py-2" onClick={() => setOpen(false)}>How It Works</Link>
            <Link href="/pricing" className="text-white/70 text-base py-2" onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="/for-drivers" className="text-white/70 text-base py-2" onClick={() => setOpen(false)}>Drive & Earn</Link>
            <Link href="/for-business" className="text-white/70 text-base py-2" onClick={() => setOpen(false)}>For Business</Link>
            <Link href="/login" className="text-white/70 text-base py-2" onClick={() => setOpen(false)}>Login</Link>
            <Link href="/client/book" className="btn-primary text-center" onClick={() => setOpen(false)}>Book Now</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
