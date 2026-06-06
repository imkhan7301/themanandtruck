import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export function formatDistance(miles: number): string {
  return `${miles.toFixed(1)} mi`
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${Math.round(minutes)} min`
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

export function formatRelativeTime(date: Date | string): string {
  const now = new Date()
  const d = new Date(date)
  const diff = now.getTime() - d.getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(mins / 60)
  const days = Math.floor(hours / 24)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

export function generateBookingNumber(): string {
  return `MAT-${Date.now().toString(36).toUpperCase()}`
}

export function getUrgencyLabel(urgency: string): string {
  const map: Record<string, string> = {
    ASAP: 'ASAP (Within 1hr)',
    TODAY: 'Today (Within 4hrs)',
    SCHEDULED: 'Scheduled',
  }
  return map[urgency] || urgency
}

export function getLoadTypeLabel(loadType: string): string {
  const map: Record<string, string> = {
    MEDICAL_LAB: 'Medical & Lab',
    LEGAL_DOCUMENTS: 'Legal Documents',
    HOTEL_LOGISTICS: 'Hotel & Hospitality',
    FURNITURE_APPLIANCES: 'Furniture & Appliances',
    SAME_DAY_COURIER: 'Same-Day Courier',
    CONSTRUCTION_MATERIALS: 'Construction Materials',
    EVENT_SETUP: 'Event Setup & Teardown',
    GENERAL_HAULING: 'General Hauling',
  }
  return map[loadType] || loadType
}

export function getLoadTypeEmoji(loadType: string): string {
  const map: Record<string, string> = {
    MEDICAL_LAB: '🏥',
    LEGAL_DOCUMENTS: '⚖️',
    HOTEL_LOGISTICS: '🏨',
    FURNITURE_APPLIANCES: '🛋️',
    SAME_DAY_COURIER: '📦',
    CONSTRUCTION_MATERIALS: '🏗️',
    EVENT_SETUP: '🎪',
    GENERAL_HAULING: '🔧',
  }
  return map[loadType] || '🚚'
}

export function getLoadSizeLabel(size: string): string {
  const map: Record<string, string> = {
    SMALL: 'Small (under 100 lbs)',
    MEDIUM: 'Medium (100–500 lbs)',
    LARGE: 'Large (500–1000 lbs)',
    EXTRA_LARGE: 'Extra Large / Full Load',
  }
  return map[size] || size
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    PENDING: 'text-gray-400',
    QUOTED: 'text-blue-400',
    PAID: 'text-blue-500',
    MATCHED: 'text-yellow-400',
    DRIVER_EN_ROUTE: 'text-amber-400',
    PICKED_UP: 'text-orange-400',
    IN_TRANSIT: 'text-orange-500',
    DELIVERED: 'text-green-400',
    COMPLETED: 'text-green-500',
    CANCELLED: 'text-red-400',
    DISPUTED: 'text-red-500',
  }
  return map[status] || 'text-gray-400'
}

export function getDriverLevelInfo(level: string): { label: string; color: string; emoji: string } {
  const map: Record<string, { label: string; color: string; emoji: string }> = {
    ROOKIE:  { label: 'Rookie',  color: 'level-rookie',  emoji: '🟤' },
    PRO:     { label: 'Pro',     color: 'level-pro',     emoji: '🟡' },
    ELITE:   { label: 'Elite',   color: 'level-elite',   emoji: '🟠' },
    LEGEND:  { label: 'Legend',  color: 'level-legend',  emoji: '🔴' },
  }
  return map[level] || map['ROOKIE']
}

export function calculatePricing(params: {
  distanceMiles: number
  loadSize: string
  urgency: string
  specialHandling: string[]
}): {
  basePrice: number
  loadFee: number
  urgencySurcharge: number
  specialFee: number
  totalPrice: number
  platformFee: number
  driverPayout: number
} {
  const BASE_RATE_PER_MILE = 2.5
  const LOAD_FEES: Record<string, number> = { SMALL: 10, MEDIUM: 25, LARGE: 50, EXTRA_LARGE: 85 }
  const URGENCY_MULTIPLIERS: Record<string, number> = { ASAP: 1.25, TODAY: 1.15, SCHEDULED: 1.0 }
  const SPECIAL_FEES: Record<string, number> = { fragile: 15, chainOfCustody: 20, timeCritical: 25, hazmat: 40 }
  const PLATFORM_TAKE = 0.2

  const basePrice = Math.max(25, params.distanceMiles * BASE_RATE_PER_MILE)
  const loadFee = LOAD_FEES[params.loadSize] || 10
  const multiplier = URGENCY_MULTIPLIERS[params.urgency] || 1.0
  const urgencySurcharge = params.urgency !== 'SCHEDULED' ? basePrice * (multiplier - 1) : 0
  const specialFee = params.specialHandling.reduce((acc, s) => acc + (SPECIAL_FEES[s] || 0), 0)
  const totalPrice = Math.round((basePrice + loadFee + urgencySurcharge + specialFee) * 100) / 100
  const platformFee = Math.round(totalPrice * PLATFORM_TAKE * 100) / 100
  const driverPayout = Math.round((totalPrice - platformFee) * 100) / 100

  return { basePrice, loadFee, urgencySurcharge, specialFee, totalPrice, platformFee, driverPayout }
}
