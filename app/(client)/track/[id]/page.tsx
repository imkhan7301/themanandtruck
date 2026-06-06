'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/shared/Navbar'
import { getStatusColor, formatCurrency, formatRelativeTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

const STATUS_STEPS = [
  { key: 'PENDING',          label: 'Pending',          icon: '⏳', desc: 'Finding your driver...' },
  { key: 'MATCHED',          label: 'Driver Matched',   icon: '🤝', desc: 'Driver accepted your job' },
  { key: 'DRIVER_EN_ROUTE',  label: 'Driver En Route',  icon: '🚗', desc: 'Driver is heading to pickup' },
  { key: 'PICKED_UP',        label: 'Picked Up',        icon: '📦', desc: 'Load secured, heading to you' },
  { key: 'IN_TRANSIT',       label: 'In Transit',       icon: '🚚', desc: 'On the way to dropoff' },
  { key: 'DELIVERED',        label: 'Delivered',        icon: '✅', desc: 'Delivery complete!' },
]

interface Booking {
  id: string
  bookingNumber: string
  status: string
  pickupAddress: string
  dropoffAddress: string
  totalPrice: number
  loadType: string
  urgency: string
  createdAt: string
  driver?: {
    name: string
    phone: string
    rating: number
    totalJobs: number
    vehicleModel: string
    vehiclePlate: string
    photoUrl?: string
  }
  estimatedArrivalMinutes?: number
}

export default function TrackPage() {
  const { id } = useParams<{ id: string }>()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [rated, setRated] = useState(false)
  const [rating, setRating] = useState(0)

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await fetch(`/api/bookings/${id}`)
        if (res.ok) setBooking(await res.json())
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchBooking()
    // Poll every 15s for status updates
    const interval = setInterval(fetchBooking, 15000)
    return () => clearInterval(interval)
  }, [id])

  const currentStepIndex = STATUS_STEPS.findIndex(s => s.key === booking?.status)
  const currentStep = STATUS_STEPS[currentStepIndex] || STATUS_STEPS[0]

  async function submitRating(stars: number) {
    setRating(stars)
    await fetch(`/api/bookings/${id}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating: stars }),
    })
    setRated(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🚚</div>
          <p className="text-white/50">Loading your delivery...</p>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">❌</div>
          <p className="text-white/50">Booking not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="section-container pt-24 pb-16 max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">{currentStep.icon}</div>
          <h1 className="text-3xl font-black text-white mb-1">{currentStep.label}</h1>
          <p className="text-white/50">{currentStep.desc}</p>
          <div className="text-white/30 text-sm mt-2">#{booking.bookingNumber}</div>
        </div>

        {/* Progress bar */}
        <div className="card-dark p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            {STATUS_STEPS.map((s, i) => (
              <div key={s.key} className="flex items-center flex-1">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 transition-all duration-500',
                  i < currentStepIndex ? 'bg-green-500 text-white' :
                  i === currentStepIndex ? 'bg-brand-amber text-brand-navy scale-110 shadow-lg shadow-brand-amber/30' :
                  'bg-white/10 text-white/20'
                )}>
                  {i < currentStepIndex ? '✓' : s.icon}
                </div>
                {i < STATUS_STEPS.length - 1 && (
                  <div className={cn('h-1 flex-1 mx-1 rounded transition-all duration-500',
                    i < currentStepIndex ? 'bg-green-500' : 'bg-white/10'
                  )} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-3">
            {booking.estimatedArrivalMinutes && booking.status !== 'DELIVERED' && (
              <div className="text-brand-amber font-bold text-lg">
                ETA: ~{booking.estimatedArrivalMinutes} min
              </div>
            )}
          </div>
        </div>

        {/* Driver card */}
        {booking.driver && (
          <div className="card-dark p-6 mb-6">
            <h3 className="text-white/50 text-xs uppercase tracking-widest mb-4">Your Driver</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-amber/20 flex items-center justify-center text-3xl flex-shrink-0">
                {booking.driver.photoUrl ? (
                  <img src={booking.driver.photoUrl} alt={booking.driver.name} className="w-full h-full rounded-2xl object-cover" />
                ) : '👤'}
              </div>
              <div className="flex-1">
                <div className="font-black text-white text-lg">{booking.driver.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-brand-amber text-sm">★ {booking.driver.rating.toFixed(1)}</span>
                  <span className="text-white/30 text-xs">·</span>
                  <span className="text-white/40 text-xs">{booking.driver.totalJobs} jobs</span>
                </div>
                <div className="text-white/40 text-xs mt-1">{booking.driver.vehicleModel} · {booking.driver.vehiclePlate}</div>
              </div>
              <a
                href={`tel:${booking.driver.phone}`}
                className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center text-xl hover:bg-green-500/30 transition-colors"
              >
                📞
              </a>
            </div>
          </div>
        )}

        {/* Route card */}
        <div className="card-dark p-6 mb-6">
          <h3 className="text-white/50 text-xs uppercase tracking-widest mb-4">Route</h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-amber/20 flex items-center justify-center flex-shrink-0 text-sm">📍</div>
              <div>
                <div className="text-white/30 text-xs">Pickup</div>
                <div className="text-white font-medium text-sm">{booking.pickupAddress}</div>
              </div>
            </div>
            <div className="ml-4 border-l-2 border-dashed border-white/10 h-4" />
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 text-sm">🏁</div>
              <div>
                <div className="text-white/30 text-xs">Dropoff</div>
                <div className="text-white font-medium text-sm">{booking.dropoffAddress}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Price summary */}
        <div className="card-dark p-6 mb-6 flex items-center justify-between">
          <div>
            <div className="text-white/40 text-xs uppercase tracking-widest">Total Charged</div>
            <div className="text-brand-amber font-black text-2xl mt-1">{formatCurrency(booking.totalPrice)}</div>
          </div>
          <div className="text-right">
            <div className={cn('text-sm font-bold uppercase tracking-wide', getStatusColor(booking.status))}>
              {booking.status.replace(/_/g, ' ')}
            </div>
            <div className="text-white/30 text-xs mt-1">{formatRelativeTime(booking.createdAt)}</div>
          </div>
        </div>

        {/* Rating — show after delivery */}
        {booking.status === 'DELIVERED' && !rated && (
          <div className="card-dark p-6 mb-6 text-center">
            <h3 className="text-white font-black text-lg mb-2">How was your driver?</h3>
            <p className="text-white/40 text-sm mb-4">Your rating helps drivers level up</p>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => submitRating(star)}
                  className="text-4xl hover:scale-125 transition-transform"
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        )}

        {rated && (
          <div className="card-dark p-6 mb-6 text-center">
            <div className="text-4xl mb-2">🙏</div>
            <p className="text-white font-bold">Thanks for rating! JazakAllah Khair.</p>
            <div className="flex justify-center gap-1 mt-2">
              {[1,2,3,4,5].map(s => (
                <span key={s} className={cn('text-2xl', s <= rating ? 'text-brand-amber' : 'text-white/20')}>★</span>
              ))}
            </div>
          </div>
        )}

        {/* Book again CTA */}
        {booking.status === 'COMPLETED' && (
          <a href="/client/book" className="btn-amber w-full text-center block text-lg py-4">
            🚚 Book Another Truck
          </a>
        )}
      </div>
    </div>
  )
}
