'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/shared/Navbar'
import {
  getLoadTypeEmoji, getLoadTypeLabel, formatCurrency,
  formatRelativeTime, getDriverLevelInfo, getStatusColor
} from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Job {
  id: string
  bookingNumber: string
  status: string
  pickupAddress: string
  dropoffAddress: string
  totalPrice: number
  driverPayout: number
  loadType: string
  urgency: string
  distanceMiles: number
  createdAt: string
  client?: { name: string; phone: string }
}

interface DriverStats {
  totalEarnings: number
  weekEarnings: number
  totalJobs: number
  completionRate: number
  avgRating: number
  level: string
  xp: number
  xpToNext: number
  isOnline: boolean
}

const TABS = ['Available', 'Active', 'History', 'Earnings']

export default function DriverDashboard() {
  const [tab, setTab] = useState(0)
  const [stats, setStats] = useState<DriverStats | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [accepting, setAccepting] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const [statsRes, jobsRes] = await Promise.all([
          fetch('/api/driver/stats'),
          fetch(`/api/driver/jobs?tab=${TABS[tab].toLowerCase()}`),
        ])
        if (statsRes.ok) setStats(await statsRes.json())
        if (jobsRes.ok) setJobs(await jobsRes.json())
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [tab])

  async function toggleOnline() {
    if (!stats) return
    const res = await fetch('/api/driver/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isOnline: !stats.isOnline }),
    })
    if (res.ok) setStats((s) => s ? { ...s, isOnline: !s.isOnline } : s)
  }

  async function acceptJob(jobId: string) {
    setAccepting(jobId)
    try {
      const res = await fetch(`/api/driver/jobs/${jobId}/accept`, { method: 'POST' })
      if (res.ok) setJobs((j) => j.filter((job) => job.id !== jobId))
    } finally {
      setAccepting(null)
    }
  }

  async function updateJobStatus(jobId: string, status: string) {
    await fetch(`/api/driver/jobs/${jobId}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setJobs((prev) => prev.map((j) => j.id === jobId ? { ...j, status } : j))
  }

  const levelInfo = stats ? getDriverLevelInfo(stats.level) : null

  return (
    <div className="min-h-screen bg-brand-navy">
      <Navbar />
      <div className="section-container pt-20 pb-16">

        {/* Driver header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">Driver Hub 🚚</h1>
            <p className="text-white/40 text-sm mt-1">Your jobs, earnings & stats</p>
          </div>
          {stats && (
            <button
              onClick={toggleOnline}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200',
                stats.isOnline
                  ? 'bg-green-500/20 border border-green-500/40 text-green-400 hover:bg-green-500/30'
                  : 'bg-white/10 border border-white/20 text-white/50 hover:bg-white/15'
              )}
            >
              <span className={cn('w-2 h-2 rounded-full', stats.isOnline ? 'bg-green-400 animate-pulse' : 'bg-white/20')} />
              {stats.isOnline ? 'Online' : 'Offline'}
            </button>
          )}
        </div>

        {/* Stats grid */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="card-dark p-5 col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{levelInfo?.emoji}</span>
                <span className="text-xs text-white/40 uppercase tracking-widest">{levelInfo?.label} Driver</span>
              </div>
              <div className="text-2xl font-black text-white">{stats.avgRating.toFixed(1)} ★</div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-white/30 mb-1">
                  <span>{stats.xp} XP</span><span>{stats.xpToNext} to next</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-amber rounded-full transition-all duration-700"
                    style={{ width: `${(stats.xp / stats.xpToNext) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            {[
              { label: 'This Week', value: formatCurrency(stats.weekEarnings), icon: '💰', color: 'text-green-400' },
              { label: 'All Time', value: formatCurrency(stats.totalEarnings), icon: '💎', color: 'text-brand-amber' },
              { label: 'Total Jobs', value: stats.totalJobs.toString(), icon: '🔧', color: 'text-blue-400' },
            ].map((s) => (
              <div key={s.label} className="card-dark p-5">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className={cn('text-2xl font-black', s.color)}>{s.value}</div>
                <div className="text-white/30 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white/5 rounded-xl mb-6 w-full">
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

        {/* Jobs list */}
        {loading ? (
          <div className="text-center py-16">
            <div className="text-5xl animate-bounce mb-3">🚚</div>
            <p className="text-white/30">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 card-dark">
            <div className="text-5xl mb-3">{tab === 0 ? '👀' : '📭'}</div>
            <p className="text-white/50 font-semibold">
              {tab === 0 ? 'No available jobs right now' : 'Nothing here yet'}
            </p>
            {tab === 0 && <p className="text-white/30 text-sm mt-1">Make sure you're online to receive jobs</p>}
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="card-dark p-6 hover:card-glow transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{getLoadTypeEmoji(job.loadType)}</div>
                    <div>
                      <div className="font-black text-white">{getLoadTypeLabel(job.loadType)}</div>
                      <div className="text-white/30 text-xs mt-0.5">#{job.bookingNumber} · {job.distanceMiles} mi</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-brand-amber font-black text-xl">{formatCurrency(job.driverPayout)}</div>
                    <div className="text-white/30 text-xs">your payout</div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex gap-2 items-start">
                    <span className="text-xs text-brand-amber mt-0.5 flex-shrink-0">FROM</span>
                    <span className="text-white/70 text-sm">{job.pickupAddress}</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-xs text-green-400 mt-0.5 flex-shrink-0">TO</span>
                    <span className="text-white/70 text-sm">{job.dropoffAddress}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={cn('text-xs font-bold uppercase px-2 py-0.5 rounded-full bg-white/5', getStatusColor(job.status))}>
                      {job.status.replace(/_/g, ' ')}
                    </span>
                    <span className="text-white/30 text-xs">{formatRelativeTime(job.createdAt)}</span>
                  </div>
                  {tab === 0 && (
                    <button
                      onClick={() => acceptJob(job.id)}
                      disabled={accepting === job.id}
                      className="btn-amber text-sm py-2 px-5"
                    >
                      {accepting === job.id ? '⏳ Accepting...' : 'Accept Job →'}
                    </button>
                  )}
                  {tab === 1 && (
                    <div className="flex gap-2">
                      {job.status === 'MATCHED' && (
                        <button onClick={() => updateJobStatus(job.id, 'DRIVER_EN_ROUTE')} className="btn-amber text-xs py-1.5 px-3">
                          Start →
                        </button>
                      )}
                      {job.status === 'DRIVER_EN_ROUTE' && (
                        <button onClick={() => updateJobStatus(job.id, 'PICKED_UP')} className="btn-amber text-xs py-1.5 px-3">
                          Picked Up ✓
                        </button>
                      )}
                      {job.status === 'PICKED_UP' && (
                        <button onClick={() => updateJobStatus(job.id, 'IN_TRANSIT')} className="btn-amber text-xs py-1.5 px-3">
                          In Transit →
                        </button>
                      )}
                      {job.status === 'IN_TRANSIT' && (
                        <button onClick={() => updateJobStatus(job.id, 'DELIVERED')} className="btn-amber text-xs py-1.5 px-3">
                          Delivered ✅
                        </button>
                      )}
                      {job.client?.phone && (
                        <a href={`tel:${job.client.phone}`} className="btn-ghost text-xs py-1.5 px-3">
                          📞 Call
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
