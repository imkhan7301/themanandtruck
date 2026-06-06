import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bookingId, pickupLat, pickupLng } = body;
    if (!bookingId) {
      return NextResponse.json({ error: "bookingId is required" }, { status: 400 });
    }
    void pickupLat; void pickupLng;
    // In production: find nearest available verified driver using haversine distance
    return NextResponse.json({ 
      matched: false, 
      message: "Connect DATABASE_URL for driver matching",
      estimatedWait: "5-15 minutes"
    });
  } catch {
    return NextResponse.json({ error: "Matching failed" }, { status: 500 });
  }
}
