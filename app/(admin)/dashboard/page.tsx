'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/shared/Navbar'
import { formatCurrency, getLoadTypeEmoji, getLoadTypeLabel, getStatusColor, formatRelativeTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface PlatformStats {
  totalRevenue: number
  weekRevenue: number
  totalBookings: number
  activeBookings: number
  totalDrivers: number
  onlineDrivers: number
  totalClients: number
  avgRating: number
  completionRate: number
  platformFees: number
}

interface RecentBooking {
  id: string
  bookingNumber: string
  status: string
  loadType: string
  totalPrice: number
  clientName: string
  driverName?: string
  createdAt: string
}

const TABS = ['Overview', 'Bookings', 'Drivers', 'Clients']

export default function AdminDashboard() {
  const [tab, setTab] = useState(0)
  const [stats, setStats] = useState<PlatformStats | null>(null)
  const [bookings, setBookings] = useState<RecentBooking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [statsRes, bookingsRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/admin/bookings?limit=20'),
        ])
        if (statsRes.ok) setStats(await statsRes.json())
        if (bookingsRes.ok) setBookings(await bookingsRes.json())
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function updateBookingStatus(bookingId: string, status: string) {
    await fetch(`/api/admin/bookings/${bookingId}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setBookings((prev) => prev.map((b) => b.id === bookingId ? { ...b, status } : b))
  }

  return (
    <div className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="section-container pt-20 pb-16">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">Admin Console 🛡️</h1>
            <p className="text-white/40 text-sm mt-1">Platform overview & controls</p>
          </div>
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-sm font-semibold">Platform Live</span>
          </div>
        </div>

        {/* KPI Cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Revenue', value: formatCurrency(stats.totalRevenue), sub: `${formatCurrency(stats.weekRevenue)} this week`, icon: '💰', color: 'text-green-400' },
              { label: 'Platform Fees', value: formatCurrency(stats.platformFees), sub: '20% take rate', icon: '💎', color: 'text-brand-amber' },
              { label: 'Total Bookings', value: stats.totalBookings.toLocaleString(), sub: `${stats.activeBookings} active now`, icon: '📦', color: 'text-blue-400' },
              { label: 'Completion Rate', value: `${stats.completionRate}%`, sub: `${stats.avgRating.toFixed(1)}★ avg rating`, icon: '✅', color: 'text-purple-400' },
            ].map((kpi) => (
              <div key={kpi.label} className="card-dark p-5">
                <div className="text-2xl mb-2">{kpi.icon}</div>
                <div className={cn('text-2xl font-black', kpi.color)}>{kpi.value}</div>
                <div className="text-white/30 text-xs mt-1">{kpi.label}</div>
                <div className="text-white/20 text-xs">{kpi.sub}</div>
              </div>
            ))}
          </div>
        )}

        {/* Driver / Client row */}
        {stats && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="card-dark p-6 flex items-center gap-4">
              <div className="text-4xl">🚚</div>
              <div>
                <div className="text-3xl font-black text-white">{stats.totalDrivers}</div>
                <div className="text-white/40 text-sm">Total Drivers</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-semibold">{stats.onlineDrivers} online now</span>
                </div>
              </div>
            </div>
            <div className="card-dark p-6 flex items-center gap-4">
              <div className="text-4xl">👥</div>
              <div>
                <div className="text-3xl font-black text-white">{stats.totalClients}</div>
                <div className="text-white/40 text-sm">Total Clients</div>
                <div className="text-white/30 text-xs mt-1">Businesses & individuals</div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white/5 rounded-xl mb-6">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={cn(
                'flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-150',
                tab === i ? 'bg-brand-amber text-brand-navy' : 'text-white/50 hover:text-white'
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Bookings table */}
        {tab === 1 && (
          <div className="card-dark overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    {['Booking', 'Client', 'Driver', 'Load', 'Amount', 'Status', 'Time', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-white/30 text-xs uppercase tracking-widest font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="px-4 py-3 text-white/60 text-xs font-mono">#{b.bookingNumber}</td>
                      <td className="px-4 py-3 text-white text-sm">{b.clientName}</td>
                      <td className="px-4 py-3 text-white/60 text-sm">{b.driverName || '—'}</td>
                      <td className="px-4 py-3 text-sm">{getLoadTypeEmoji(b.loadType)} {getLoadTypeLabel(b.loadType)}</td>
                      <td className="px-4 py-3 text-brand-amber font-bold text-sm">{formatCurrency(b.totalPrice)}</td>
                      <td className="px-4 py-3">
                        <span className={cn('text-xs font-bold uppercase', getStatusColor(b.status))}>
                          {b.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/30 text-xs">{formatRelativeTime(b.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {b.status === 'PENDING' && (
                            <button
                              onClick={() => updateBookingStatus(b.id, 'CANCELLED')}
                              className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                          {b.status === 'DISPUTED' && (
                            <button
                              onClick={() => updateBookingStatus(b.id, 'COMPLETED')}
                              className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                            >
                              Resolve
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Overview tab placeholder charts */}
        {tab === 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-dark p-6">
              <h3 className="text-white font-bold mb-4">📈 Revenue (Last 7 Days)</h3>
              <div className="flex items-end gap-2 h-32">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-brand-amber/30 rounded-t hover:bg-brand-amber/50 transition-colors"
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-white/20 text-xs">{['M','T','W','T','F','S','S'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-dark p-6">
              <h3 className="text-white font-bold mb-4">🗂️ Bookings by Load Type</h3>
              <div className="space-y-3">
                {['MEDICAL_LAB', 'HOTEL_LOGISTICS', 'FURNITURE_APPLIANCES', 'SAME_DAY_COURIER'].map((type, i) => {
                  const widths = [85, 70, 55, 40]
                  return (
                    <div key={type} className="flex items-center gap-3">
                      <span className="text-lg w-6">{getLoadTypeEmoji(type)}</span>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs text-white/50 mb-1">
                          <span>{getLoadTypeLabel(type)}</span>
                          <span>{widths[i]}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-amber rounded-full" style={{ width: `${widths[i]}%` }} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
