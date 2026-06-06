import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In production: await prisma.booking.findMany(...)
    return NextResponse.json({ bookings: [], message: "Connect DATABASE_URL to load bookings" });
  } catch {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pickupAddress, dropoffAddress, loadType, loadSize, urgency } = body;
    if (!pickupAddress || !dropoffAddress || !loadType || !loadSize || !urgency) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    // In production: await prisma.booking.create({ data: body })
    return NextResponse.json({ 
      booking: { id: "demo-id", ...body, status: "PENDING", createdAt: new Date().toISOString() },
      message: "Booking created (demo mode - connect database for persistence)" 
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
