import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: "Booking ID required" }, { status: 400 });
    // In production: fetch from prisma
    return NextResponse.json({ booking: null, message: "Connect DATABASE_URL to load booking" });
  } catch {
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    if (!id) return NextResponse.json({ error: "Booking ID required" }, { status: 400 });
    // In production: update via prisma
    return NextResponse.json({ booking: { id, ...body }, message: "Booking updated (demo mode)" });
  } catch {
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
