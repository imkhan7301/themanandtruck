import { NextResponse } from "next/server";
import { calculateQuote, getAIQuoteExplanation, type QuoteInput } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { distance, loadSize, urgency, specialHandling, loadType } = body;
    
    if (!distance || !loadSize || !urgency) {
      return NextResponse.json({ error: "Missing required fields: distance, loadSize, urgency" }, { status: 400 });
    }

    const input: QuoteInput = {
      distance: Number(distance),
      loadSize,
      urgency,
      specialHandling: specialHandling ?? [],
      loadType,
    };

    const quote = calculateQuote(input);
    const aiExplanation = await getAIQuoteExplanation(input, quote);

    return NextResponse.json({ ...quote, aiExplanation });
  } catch {
    return NextResponse.json({ error: "Failed to calculate quote" }, { status: 500 });
  }
}
