import OpenAI from 'openai'
import { calculatePricing } from './utils'

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

export interface QuoteParams {
  distanceMiles: number
  loadSize: string
  loadType: string
  urgency: string
  specialHandling: string[]
  pickupAddress: string
  dropoffAddress: string
}

export interface QuoteResult {
  basePrice: number
  loadFee: number
  urgencySurcharge: number
  specialFee: number
  totalPrice: number
  platformFee: number
  driverPayout: number
  aiExplanation: string
  estimatedMinutes: number
  surgeMultiplier: number
}

export async function generateAIQuote(params: QuoteParams): Promise<QuoteResult> {
  // Rule-based pricing (always works, no API key needed)
  const pricing = calculatePricing({
    distanceMiles: params.distanceMiles,
    loadSize: params.loadSize,
    urgency: params.urgency,
    specialHandling: params.specialHandling,
  })

  const estimatedMinutes = Math.round(params.distanceMiles * 3.5 + 10)
  const surgeMultiplier = 1.0

  let aiExplanation = `Based on ${params.distanceMiles.toFixed(1)} miles, your ${params.loadSize.toLowerCase()} load, and ${params.urgency === 'ASAP' ? 'urgent' : params.urgency.toLowerCase()} timing, we've calculated a fair price for your delivery.`

  // Enhance with OpenAI if available
  if (openai) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a friendly logistics pricing assistant for TheManAndTruck, an AI-powered pickup truck delivery platform. Give a 1-2 sentence friendly explanation of the quote. Be warm and professional. Mention the key factors. Do not mention specific dollar amounts.',
          },
          {
            role: 'user',
            content: `Quote details: ${params.distanceMiles.toFixed(1)} miles, ${params.loadType} load type, ${params.loadSize} size, ${params.urgency} urgency, special handling: ${params.specialHandling.join(', ') || 'none'}. From: ${params.pickupAddress} To: ${params.dropoffAddress}`,
          },
        ],
        max_tokens: 100,
        temperature: 0.7,
      })
      aiExplanation = response.choices[0]?.message?.content || aiExplanation
    } catch (e) {
      // Fallback to rule-based explanation
    }
  }

  return { ...pricing, aiExplanation, estimatedMinutes, surgeMultiplier }
}

export interface MatchResult {
  driverId: string
  matchScore: number
  estimatedArrivalMinutes: number
  reason: string
}

export async function findBestDriver(params: {
  pickupLat: number
  pickupLng: number
  loadType: string
  urgency: string
  availableDrivers: Array<{ id: string; lat: number; lng: number; rating: number; totalJobs: number }>
}): Promise<MatchResult | null> {
  if (params.availableDrivers.length === 0) return null

  // Score each driver
  const scored = params.availableDrivers.map((d) => {
    const distKm = Math.sqrt(
      Math.pow((d.lat - params.pickupLat) * 111, 2) +
      Math.pow((d.lng - params.pickupLng) * 111, 2)
    )
    const distScore = Math.max(0, 1 - distKm / 10)
    const ratingScore = (d.rating - 4) / 1
    const expScore = Math.min(1, d.totalJobs / 100)
    const matchScore = distScore * 0.5 + ratingScore * 0.3 + expScore * 0.2
    const arrivalMins = Math.round(distKm * 2.5 + 3)
    return { driverId: d.id, matchScore, estimatedArrivalMinutes: arrivalMins, distKm }
  })

  scored.sort((a, b) => b.matchScore - a.matchScore)
  const best = scored[0]

  return {
    driverId: best.driverId,
    matchScore: Math.round(best.matchScore * 100) / 100,
    estimatedArrivalMinutes: best.estimatedArrivalMinutes,
    reason: `Best match: ${best.distKm.toFixed(1)}km away, high rating and experience.`,
  }
}
