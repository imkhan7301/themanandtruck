"use client";

import { useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export function EarningsCalcClient() {
  const [hours, setHours] = useState(20);
  const hourlyRate = 35;
  const weeklyEarnings = hours * hourlyRate;
  const monthlyEarnings = weeklyEarnings * 4.3;

  return (
    <div className="card-dark">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <label className="text-white font-semibold">Hours per week</label>
          <span className="text-brand-amber font-black text-2xl">{hours}h</span>
        </div>
        <input
          type="range"
          min={5}
          max={60}
          step={5}
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="w-full accent-brand-amber"
        />
        <div className="flex justify-between text-white/40 text-xs mt-1">
          <span>5h</span>
          <span>60h</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-brand-navy rounded-xl p-4 text-center">
          <p className="text-white/50 text-sm mb-1">Weekly Earnings</p>
          <p className="text-brand-amber font-black text-2xl">{formatCurrency(weeklyEarnings)}</p>
        </div>
        <div className="bg-brand-navy rounded-xl p-4 text-center">
          <p className="text-white/50 text-sm mb-1">Monthly Earnings</p>
          <p className="text-brand-amber font-black text-2xl">{formatCurrency(monthlyEarnings)}</p>
        </div>
      </div>
      <p className="text-white/40 text-xs text-center mb-6">
        *Estimates based on avg $35/hr (after platform fee). Actual earnings vary by location, hours, and load types.
      </p>
      <Link href="/signup/driver" className="btn-primary w-full text-center block">
        Sign Up as a Driver — It&apos;s Free
      </Link>
    </div>
  );
}
