import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export const PRICING = {
  BASE_RATE_PER_MILE: 2.5,
  MINIMUM_FARE: 25,
  LOAD_FEES: {
    SMALL: 10,
    MEDIUM: 25,
    LARGE: 50,
    EXTRA_LARGE: 85,
  },
  URGENCY_MULTIPLIERS: {
    ASAP: 1.25,
    TODAY: 1.15,
    SCHEDULED: 1.0,
  },
  SPECIAL_FEES: {
    fragile: 15,
    chainOfCustody: 20,
    timeCritical: 25,
    hazmat: 35,
  },
  PLATFORM_TAKE: 0.2,
} as const;

export interface QuoteInput {
  distance: number;
  loadSize: keyof typeof PRICING.LOAD_FEES;
  urgency: keyof typeof PRICING.URGENCY_MULTIPLIERS;
  specialHandling: string[];
  loadType?: string;
}

export interface QuoteResult {
  baseRate: number;
  distanceFee: number;
  loadFee: number;
  urgencySurcharge: number;
  specialFee: number;
  subtotal: number;
  total: number;
  platformFee: number;
  driverPayout: number;
  aiExplanation?: string;
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const distanceFee = Math.max(input.distance * PRICING.BASE_RATE_PER_MILE, PRICING.MINIMUM_FARE);
  const loadFee = PRICING.LOAD_FEES[input.loadSize] ?? 0;
  const urgencyMultiplier = PRICING.URGENCY_MULTIPLIERS[input.urgency] ?? 1.0;

  let specialFee = 0;
  for (const handling of input.specialHandling) {
    specialFee += PRICING.SPECIAL_FEES[handling as keyof typeof PRICING.SPECIAL_FEES] ?? 0;
  }

  const baseRate = 5.0;
  const subtotalBeforeUrgency = baseRate + distanceFee + loadFee + specialFee;
  const urgencySurcharge = subtotalBeforeUrgency * (urgencyMultiplier - 1);
  const total = subtotalBeforeUrgency + urgencySurcharge;
  const platformFee = total * PRICING.PLATFORM_TAKE;
  const driverPayout = total - platformFee;

  return {
    baseRate,
    distanceFee,
    loadFee,
    urgencySurcharge,
    specialFee,
    subtotal: subtotalBeforeUrgency,
    total,
    platformFee,
    driverPayout,
  };
}

export async function getAIQuoteExplanation(input: QuoteInput, quote: QuoteResult): Promise<string> {
  if (!openai) {
    return `Your quote of $${quote.total.toFixed(2)} includes a ${input.loadSize.toLowerCase()} load fee and ${input.urgency.toLowerCase()} urgency pricing. Driver payout: $${quote.driverPayout.toFixed(2)}.`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful dispatcher for The Man & Truck, an AI-powered gig platform. Provide brief, friendly explanations of delivery quotes in 2-3 sentences.",
        },
        {
          role: "user",
          content: `Explain this delivery quote: distance=${input.distance.toFixed(1)} miles, load size=${input.loadSize}, urgency=${input.urgency}, special handling=${input.specialHandling.join(", ") || "none"}, total=$${quote.total.toFixed(2)}`,
        },
      ],
      max_tokens: 150,
    });
    return completion.choices[0]?.message?.content ?? "";
  } catch {
    return `Your quote of $${quote.total.toFixed(2)} has been calculated based on distance, load size, and urgency.`;
  }
}
