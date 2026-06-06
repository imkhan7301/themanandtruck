import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In production: await prisma.driver.findMany({ where: { isVerified: true, isAvailable: true } })
    return NextResponse.json({ drivers: [], message: "Connect DATABASE_URL to load drivers" });
  } catch {
    return NextResponse.json({ error: "Failed to fetch drivers" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, truckType, licensePlate } = body;
    if (!userId || !truckType || !licensePlate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    // In production: await prisma.driver.create({ data: body })
    return NextResponse.json({ 
      driver: { id: "demo-driver-id", ...body, isVerified: false, createdAt: new Date().toISOString() },
      message: "Driver application received (demo mode)" 
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create driver" }, { status: 500 });
  }
}
