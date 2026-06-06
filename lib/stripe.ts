import Stripe from 'stripe'

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-11-20.acacia' })
  : null

export const PLATFORM_FEE_PERCENT = 0.2

export async function createPaymentIntent(amount: number, metadata: Record<string, string>) {
  if (!stripe) throw new Error('Stripe not configured')
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
    metadata,
  })
}

export async function createDriverConnectAccount(email: string) {
  if (!stripe) throw new Error('Stripe not configured')
  return stripe.accounts.create({
    type: 'express',
    email,
    capabilities: { transfers: { requested: true } },
    business_type: 'individual',
    settings: { payouts: { schedule: { interval: 'daily' } } },
  })
}

export async function transferToDriver(amount: number, stripeAccountId: string, bookingId: string) {
  if (!stripe) throw new Error('Stripe not configured')
  return stripe.transfers.create({
    amount: Math.round(amount * 100),
    currency: 'usd',
    destination: stripeAccountId,
    metadata: { bookingId },
  })
}
