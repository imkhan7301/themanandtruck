import Stripe from "stripe";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      typescript: true,
    })
  : null;

export const PLATFORM_FEE_PERCENT = 20;
export const DRIVER_PAYOUT_PERCENT = 80;
