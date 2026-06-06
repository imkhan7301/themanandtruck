'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/shared/Navbar'
import {
  getLoadTypeEmoji, getLoadTypeLabel, getLoadSizeLabel,
  getUrgencyLabel, formatCurrency, calculatePricing
} from '@/lib/utils'
import { cn } from '@/lib/utils'

const LOAD_TYPES = [
  'MEDICAL_LAB', 'LEGAL_DOCUMENTS', 'HOTEL_LOGISTICS', 'FURNITURE_APPLIANCES',
  'SAME_DAY_COURIER', 'CONSTRUCTION_MATERIALS', 'EVENT_SETUP', 'GENERAL_HAULING',
]
const LOAD_SIZES = ['SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE']
const URGENCIES = ['ASAP', 'TODAY', 'SCHEDULED']
const SPECIAL_OPTIONS = [
  { key: 'fragile', label: '🥚 Fragile Items', desc: '+$15' },
  { key: 'chainOfCustody', label: '📋 Chain of Custody', desc: '+$20' },
  { key: 'timeCritical', label: '⚡ Time Critical', desc: '+$25' },
  { key: 'hazmat', label: '☢️ Hazmat Certified', desc: '+$40' },
]

interface BookingForm {
  pickupAddress: string
  dropoffAddress: string
  loadType: string
  loadSize: string
  urgency: string
  specialHandling: string[]
  notes: string
}

const STEPS = ['Route', 'Load', 'Timing', 'Review']

export default function BookPage() {
  const router = useRouter()
  const params = useSearchParams()

  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<BookingForm>({
    pickupAddress: '',
    dropoffAddress: '',
    loadType: params.get('loadType') || '',
    loadSize: '',
    urgency: params.get('urgency') || '',
    specialHandling: [],
    notes: '',
  })

  const estimatedMiles = 8.5 // would come from Maps API in production
  const pricing = form.loadSize && form.urgency
    ? calculatePricing({
        distanceMiles: estimatedMiles,
        loadSize: form.loadSize,
        urgency: form.urgency,
        specialHandling: form.specialHandling,
      })
    : null

  function update(key: keyof BookingForm, value: any) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function toggleSpecial(key: string) {
    setForm((f) => ({
      ...f,
      specialHandling: f.specialHandling.includes(key)
        ? f.specialHandling.filter((s) => s !== key)
        : [...f.specialHandling, key],
    }))
  }

  const canNext = [
    form.pickupAddress && form.dropoffAddress,
    form.loadType && form.loadSize,
    form.urgency,
    true,
  ][step]

  async function handleSubmit() {
    setLoading(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, distanceMiles: estimatedMiles }),
      })
      const data = await res.json()
      if (data.bookingId) {
        router.push(`/client/track/${data.bookingId}`)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="section-container pt-24 pb-16">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-2">Book a Truck</h1>
          <p className="text-white/50">Tell us about your job — we'll handle the rest.</p>
        </div>

        {/* Step progress */}
        <div className="flex items-center justify-center gap-0 mb-12 max-w-lg mx-auto">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <button
                onClick={() => i < step && setStep(i)}
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 flex-shrink-0',
                  i === step ? 'bg-brand-amber text-brand-navy scale-110 shadow-lg shadow-brand-amber/30' :
                  i < step ? 'bg-brand-amber/80 text-brand-navy cursor-pointer' :
                  'bg-white/10 text-white/30'
                )}
              >
                {i < step ? '✓' : i + 1}
              </button>
              <div className={cn('text-xs font-medium ml-2 whitespace-nowrap hidden sm:block transition-colors',
                i === step ? 'text-brand-amber' : i < step ? 'text-white/60' : 'text-white/20'
              )}>
                {s}
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn('h-px flex-1 mx-3 transition-colors', i < step ? 'bg-brand-amber/50' : 'bg-white/10')} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="max-w-2xl mx-auto card-dark p-8">

          {/* Step 0 — Route */}
          {step === 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white">📍 Where to & from?</h2>
              <div className="space-y-4">
                <div>
                  <label className="label-text">Pickup Address</label>
                  <input
                    type="text"
                    placeholder="123 Main St, City, State"
                    value={form.pickupAddress}
                    onChange={(e) => update('pickupAddress', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="text-brand-amber text-xl">↓</span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>
                <div>
                  <label className="label-text">Dropoff Address</label>
                  <input
                    type="text"
                    placeholder="456 Oak Ave, City, State"
                    value={form.dropoffAddress}
                    onChange={(e) => update('dropoffAddress', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>
              {form.pickupAddress && form.dropoffAddress && (
                <div className="glass rounded-xl p-4 flex items-center gap-3">
                  <span className="text-2xl">🗺️</span>
                  <div>
                    <div className="text-white font-semibold text-sm">Est. Distance</div>
                    <div className="text-brand-amber font-bold">{estimatedMiles} miles · ~{Math.round(estimatedMiles * 3.5 + 10)} min drive</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 1 — Load */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white">📦 What are we hauling?</h2>
              <div>
                <label className="label-text mb-3 block">Load Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {LOAD_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => update('loadType', type)}
                      className={cn(
                        'p-3 rounded-xl border-2 text-center transition-all duration-150',
                        form.loadType === type
                          ? 'border-brand-amber bg-brand-amber/10 scale-[1.02]'
                          : 'border-white/10 hover:border-white/30 bg-white/2'
                      )}
                    >
                      <div className="text-2xl mb-1">{getLoadTypeEmoji(type)}</div>
                      <div className="text-xs font-medium text-white/70 leading-tight">{getLoadTypeLabel(type)}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label-text mb-3 block">Load Size</label>
                <div className="grid grid-cols-2 gap-3">
                  {LOAD_SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => update('loadSize', size)}
                      className={cn(
                        'p-4 rounded-xl border-2 text-left transition-all duration-150',
                        form.loadSize === size
                          ? 'border-brand-amber bg-brand-amber/10'
                          : 'border-white/10 hover:border-white/30'
                      )}
                    >
                      <div className="font-bold text-white text-sm">{size.replace('_', ' ')}</div>
                      <div className="text-white/40 text-xs mt-1">{getLoadSizeLabel(size)}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label-text mb-3 block">Special Handling (optional)</label>
                <div className="grid grid-cols-2 gap-3">
                  {SPECIAL_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => toggleSpecial(opt.key)}
                      className={cn(
                        'p-3 rounded-xl border-2 text-left transition-all duration-150',
                        form.specialHandling.includes(opt.key)
                          ? 'border-brand-amber bg-brand-amber/10'
                          : 'border-white/10 hover:border-white/30'
                      )}
                    >
                      <div className="text-sm font-semibold text-white">{opt.label}</div>
                      <div className="text-brand-amber text-xs">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Timing */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white">⏰ When do you need it?</h2>
              <div className="grid gap-4">
                {URGENCIES.map((u) => (
                  <button
                    key={u}
                    onClick={() => update('urgency', u)}
                    className={cn(
                      'p-5 rounded-xl border-2 text-left transition-all duration-150 flex items-center gap-4',
                      form.urgency === u
                        ? 'border-brand-amber bg-brand-amber/10'
                        : 'border-white/10 hover:border-white/30'
                    )}
                  >
                    <div className="text-3xl">{u === 'ASAP' ? '🚨' : u === 'TODAY' ? '⏰' : '📅'}</div>
                    <div>
                      <div className="font-black text-white">{getUrgencyLabel(u)}</div>
                      <div className="text-white/40 text-sm mt-0.5">
                        {u === 'ASAP' ? '25% surge · Nearest driver dispatched now' :
                         u === 'TODAY' ? '15% surge · Matched within the hour' :
                         'Standard rate · Plan and save'}
                      </div>
                    </div>
                    {form.urgency === u && <div className="ml-auto text-brand-amber text-xl">✓</div>}
                  </button>
                ))}
              </div>
              <div>
                <label className="label-text">Additional Notes (optional)</label>
                <textarea
                  placeholder="Gate code, floor number, fragile items, anything the driver should know..."
                  value={form.notes}
                  onChange={(e) => update('notes', e.target.value)}
                  rows={3}
                  className="input-field resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 3 — Review */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white">✅ Review & Book</h2>
              <div className="space-y-3">
                {[
                  { label: 'Pickup', value: form.pickupAddress, icon: '📍' },
                  { label: 'Dropoff', value: form.dropoffAddress, icon: '🏁' },
                  { label: 'Load Type', value: `${getLoadTypeEmoji(form.loadType)} ${getLoadTypeLabel(form.loadType)}`, icon: '' },
                  { label: 'Size', value: getLoadSizeLabel(form.loadSize), icon: '📦' },
                  { label: 'Urgency', value: getUrgencyLabel(form.urgency), icon: '⏰' },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-start py-2 border-b border-white/5">
                    <span className="text-white/40 text-sm">{row.label}</span>
                    <span className="text-white text-sm font-medium text-right max-w-xs">{row.value}</span>
                  </div>
                ))}
              </div>

              {pricing && (
                <div className="glass rounded-xl p-5 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Base rate ({estimatedMiles} mi)</span>
                    <span className="text-white">{formatCurrency(pricing.basePrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Load fee</span>
                    <span className="text-white">{formatCurrency(pricing.loadFee)}</span>
                  </div>
                  {pricing.urgencySurcharge > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Urgency surcharge</span>
                      <span className="text-amber-400">{formatCurrency(pricing.urgencySurcharge)}</span>
                    </div>
                  )}
                  {pricing.specialFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Special handling</span>
                      <span className="text-white">{formatCurrency(pricing.specialFee)}</span>
                    </div>
                  )}
                  <div className="border-t border-white/10 pt-2 flex justify-between">
                    <span className="font-black text-white">Total</span>
                    <span className="font-black text-brand-amber text-xl">{formatCurrency(pricing.totalPrice)}</span>
                  </div>
                  <p className="text-white/30 text-xs text-center pt-1">Driver receives {formatCurrency(pricing.driverPayout)} · Platform fee {formatCurrency(pricing.platformFee)}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="btn-ghost flex-1">
                ← Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canNext}
                className={cn('btn-amber flex-1', !canNext && 'opacity-40 cursor-not-allowed')}
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-amber flex-1 text-lg py-4"
              >
                {loading ? '🔄 Booking...' : '🚚 Confirm & Book'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
