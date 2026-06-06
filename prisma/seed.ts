import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const adminPassword = await bcrypt.hash("admin123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@themanandtruck.com" },
    update: {},
    create: {
      email: "admin@themanandtruck.com",
      name: "The Founder",
      phone: "+1-555-000-0001",
      role: "ADMIN",
      passwordHash: adminPassword,
    },
  });
  console.log("Created admin:", admin.email);

  const driverPassword = await bcrypt.hash("driver123!", 12);

  const driver1User = await prisma.user.upsert({
    where: { email: "marcus@themanandtruck.com" },
    update: {},
    create: {
      email: "marcus@themanandtruck.com",
      name: "Marcus Johnson",
      phone: "+1-555-000-0002",
      role: "DRIVER",
      passwordHash: driverPassword,
    },
  });

  const driver1 = await prisma.driver.upsert({
    where: { userId: driver1User.id },
    update: {},
    create: {
      userId: driver1User.id,
      truckType: "PICKUP",
      truckYear: "2022",
      truckMake: "Ford",
      truckModel: "F-150",
      licensePlate: "TMT-001",
      isVerified: true,
      isAvailable: true,
      rating: 4.9,
      totalJobs: 47,
    },
  });

  const driver2User = await prisma.user.upsert({
    where: { email: "diana@themanandtruck.com" },
    update: {},
    create: {
      email: "diana@themanandtruck.com",
      name: "Diana Martinez",
      phone: "+1-555-000-0003",
      role: "DRIVER",
      passwordHash: driverPassword,
    },
  });

  await prisma.driver.upsert({
    where: { userId: driver2User.id },
    update: {},
    create: {
      userId: driver2User.id,
      truckType: "PICKUP",
      truckYear: "2021",
      truckMake: "Toyota",
      truckModel: "Tacoma",
      licensePlate: "TMT-002",
      isVerified: true,
      isAvailable: true,
      rating: 4.8,
      totalJobs: 32,
    },
  });

  const driver3User = await prisma.user.upsert({
    where: { email: "james@themanandtruck.com" },
    update: {},
    create: {
      email: "james@themanandtruck.com",
      name: "James Wilson",
      phone: "+1-555-000-0004",
      role: "DRIVER",
      passwordHash: driverPassword,
    },
  });

  await prisma.driver.upsert({
    where: { userId: driver3User.id },
    update: {},
    create: {
      userId: driver3User.id,
      truckType: "BOX_TRUCK",
      truckYear: "2020",
      truckMake: "Ford",
      truckModel: "Transit",
      licensePlate: "TMT-003",
      isVerified: true,
      isAvailable: false,
      rating: 5.0,
      totalJobs: 89,
    },
  });

  const driver4User = await prisma.user.upsert({
    where: { email: "sarah@themanandtruck.com" },
    update: {},
    create: {
      email: "sarah@themanandtruck.com",
      name: "Sarah Chen",
      phone: "+1-555-000-0005",
      role: "DRIVER",
      passwordHash: driverPassword,
    },
  });

  await prisma.driver.upsert({
    where: { userId: driver4User.id },
    update: {},
    create: {
      userId: driver4User.id,
      truckType: "BOX_TRUCK",
      truckYear: "2023",
      truckMake: "Mercedes",
      truckModel: "Sprinter",
      licensePlate: "TMT-004",
      isVerified: true,
      isAvailable: true,
      rating: 4.7,
      totalJobs: 23,
    },
  });

  const clientUser = await prisma.user.upsert({
    where: { email: "client@hilton.com" },
    update: {},
    create: {
      email: "client@hilton.com",
      name: "Hilton Downtown",
      phone: "+1-555-100-0001",
      role: "CLIENT",
      passwordHash: await bcrypt.hash("client123!", 12),
    },
  });

  const bookings = [
    {
      bookingNumber: "TMT-20241201-001",
      clientId: clientUser.id,
      driverId: driver1.id,
      pickupAddress: "Hilton Downtown, 123 Main St",
      dropoffAddress: "LAX Airport Terminal 4",
      loadType: "HOTEL_LOGISTICS" as const,
      loadSize: "MEDIUM" as const,
      urgency: "TODAY" as const,
      specialHandling: [],
      status: "COMPLETED" as const,
      basePrice: 5.0,
      loadFee: 25.0,
      urgencySurcharge: 8.63,
      specialFee: 0,
      totalPrice: 66.25,
      platformFee: 13.25,
      driverPayout: 53.0,
      clientRating: 5,
      driverRating: 5,
    },
  ];

  for (const booking of bookings) {
    await prisma.booking.create({ data: booking });
  }

  console.log("Seeding complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
