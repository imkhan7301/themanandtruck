import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    
    if (!process.env.STRIPE_WEBHOOK_SECRET || !signature) {
      console.log("[Webhook] Stripe not configured, skipping verification");
      return NextResponse.json({ received: true });
    }

    // In production: verify signature and handle events
    void body;
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
