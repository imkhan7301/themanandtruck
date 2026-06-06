import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  return (
    <footer className="bg-brand-slate border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Logo variant="white" size="sm" href="/" />
            <p className="mt-4 text-sm text-white/50 leading-relaxed">
              Built to make life and work simpler for every laborer on the road.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Platform</h4>
            <ul className="space-y-2">
              {[
                { href: "/how-it-works", label: "How It Works" },
                { href: "/pricing", label: "Pricing" },
                { href: "/client/book", label: "Book a Pickup" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Drivers</h4>
            <ul className="space-y-2">
              {[
                { href: "/for-drivers", label: "Drive & Earn" },
                { href: "/signup/driver", label: "Driver Signup" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Business</h4>
            <ul className="space-y-2">
              {[
                { href: "/for-business", label: "For Business" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} The Man & Truck. All rights reserved. On Time. Every Time. InshAllah.
          </p>
          <p className="text-brand-amber text-xs font-medium">AI-Powered. Human Driven.</p>
        </div>
      </div>
    </footer>
  );
}
