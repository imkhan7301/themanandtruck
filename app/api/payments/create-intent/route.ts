import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, bookingId } = body;
    if (!amount || !bookingId) {
      return NextResponse.json({ error: "amount and bookingId are required" }, { status: 400 });
    }
    
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ 
        error: "Stripe not configured",
        message: "Set STRIPE_SECRET_KEY in .env to enable payments",
        demo: true,
        clientSecret: "demo_secret_" + bookingId
      }, { status: 200 });
    }

    // In production with Stripe configured:
    // const stripe = (await import("@/lib/stripe")).stripe;
    // const intent = await stripe!.paymentIntents.create({ amount: Math.round(amount * 100), currency: "usd" });
    // return NextResponse.json({ clientSecret: intent.client_secret });
    
    return NextResponse.json({ clientSecret: "demo_" + bookingId });
  } catch {
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 });
  }
}
