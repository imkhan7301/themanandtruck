import { PrismaClient, Role, TruckType, LoadType, LoadSize, Urgency, BookingStatus, DriverLevel } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding TheManAndTruck database...')

  // Admin / Founder
  const admin = await prisma.user.upsert({
    where: { email: 'admin@themanandtruck.com' },
    update: {},
    create: {
      email: 'admin@themanandtruck.com',
      name: 'The Founder',
      phone: '+1-555-000-0001',
      role: Role.ADMIN,
    },
  })
  console.log('✅ Admin:', admin.email)

  // Drivers
  const driverData = [
    { name: 'Marcus Johnson',  email: 'marcus@example.com',  truck: TruckType.PICKUP,    make: 'Ford',   model: 'F-150',       year: '2021', rating: 4.9,  jobs: 87,  level: DriverLevel.ELITE  },
    { name: 'Carlos Rivera',   email: 'carlos@example.com',  truck: TruckType.PICKUP,    make: 'Chevy',  model: 'Silverado',   year: '2020', rating: 4.8,  jobs: 54,  level: DriverLevel.PRO    },
    { name: 'Darius Williams', email: 'darius@example.com',  truck: TruckType.BOX_TRUCK, make: 'Ford',   model: 'Transit 350', year: '2022', rating: 4.95, jobs: 120, level: DriverLevel.LEGEND },
    { name: 'Ahmed Hassan',    email: 'ahmed@example.com',   truck: TruckType.PICKUP,    make: 'RAM',    model: '1500',        year: '2023', rating: 4.7,  jobs: 23,  level: DriverLevel.PRO    },
    { name: 'Tyrone Davis',    email: 'tyrone@example.com',  truck: TruckType.BOX_TRUCK, make: 'Isuzu',  model: 'NPR',         year: '2019', rating: 4.85, jobs: 200, level: DriverLevel.LEGEND },
  ]

  const drivers = []
  for (const d of driverData) {
    const user = await prisma.user.upsert({
      where: { email: d.email },
      update: {},
      create: { email: d.email, name: d.name, role: Role.DRIVER, phone: `+1-555-${Math.floor(1000000 + Math.random() * 9000000)}` },
    })
    const driver = await prisma.driver.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        truckType: d.truck,
        truckMake: d.make,
        truckModel: d.model,
        truckYear: d.year,
        isVerified: true,
        isAvailable: true,
        rating: d.rating,
        totalJobs: d.jobs,
        totalEarnings: d.jobs * 62,
        level: d.level,
        currentLat: 40.7128 + (Math.random() - 0.5) * 0.1,
        currentLng: -74.0060 + (Math.random() - 0.5) * 0.1,
      },
    })
    drivers.push({ user, driver })
    console.log(`✅ Driver: ${d.name} (${d.truck})`)
  }

  // Clients
  const clientData = [
    { name: 'Sarah Mitchell', email: 'sarah@grandhotels.com',  phone: '+1-555-200-0001' },
    { name: 'James Park',     email: 'james@parklaw.com',      phone: '+1-555-200-0002' },
    { name: 'Linda Torres',   email: 'linda@citymedlab.com',   phone: '+1-555-200-0003' },
  ]
  const clients = []
  for (const c of clientData) {
    const user = await prisma.user.upsert({
      where: { email: c.email },
      update: {},
      create: { email: c.email, name: c.name, phone: c.phone, role: Role.CLIENT },
    })
    clients.push(user)
  }
  console.log('✅ Clients created')

  // Bookings
  const bookingSeeds = [
    { load: LoadType.HOTEL_LOGISTICS,       size: LoadSize.MEDIUM,      urgency: Urgency.ASAP,      status: BookingStatus.COMPLETED,       base: 45,  total: 72,  ci: 0, di: 0 },
    { load: LoadType.LEGAL_DOCUMENTS,       size: LoadSize.SMALL,       urgency: Urgency.ASAP,      status: BookingStatus.COMPLETED,       base: 35,  total: 58,  ci: 1, di: 1 },
    { load: LoadType.MEDICAL_LAB,           size: LoadSize.SMALL,       urgency: Urgency.ASAP,      status: BookingStatus.COMPLETED,       base: 40,  total: 78,  ci: 2, di: 0 },
    { load: LoadType.FURNITURE_APPLIANCES,  size: LoadSize.LARGE,       urgency: Urgency.TODAY,     status: BookingStatus.COMPLETED,       base: 85,  total: 118, ci: 0, di: 2 },
    { load: LoadType.SAME_DAY_COURIER,      size: LoadSize.SMALL,       urgency: Urgency.ASAP,      status: BookingStatus.COMPLETED,       base: 30,  total: 52,  ci: 1, di: 3 },
    { load: LoadType.CONSTRUCTION_MATERIALS,size: LoadSize.EXTRA_LARGE, urgency: Urgency.SCHEDULED, status: BookingStatus.COMPLETED,       base: 120, total: 145, ci: 0, di: 4 },
    { load: LoadType.EVENT_SETUP,           size: LoadSize.LARGE,       urgency: Urgency.SCHEDULED, status: BookingStatus.COMPLETED,       base: 95,  total: 115, ci: 2, di: 2 },
    { load: LoadType.GENERAL_HAULING,       size: LoadSize.MEDIUM,      urgency: Urgency.TODAY,     status: BookingStatus.COMPLETED,       base: 55,  total: 78,  ci: 1, di: 1 },
    { load: LoadType.HOTEL_LOGISTICS,       size: LoadSize.SMALL,       urgency: Urgency.ASAP,      status: BookingStatus.DRIVER_EN_ROUTE, base: 38,  total: 62,  ci: 0, di: 0 },
    { load: LoadType.MEDICAL_LAB,           size: LoadSize.SMALL,       urgency: Urgency.ASAP,      status: BookingStatus.PAID,            base: 42,  total: 80,  ci: 2, di: 1 },
  ]

  for (const b of bookingSeeds) {
    const platformFee = b.total * 0.2
    await prisma.booking.create({
      data: {
        clientId:        clients[b.ci].id,
        driverId:        drivers[b.di].driver.id,
        pickupAddress:   '123 Main St, New York, NY 10001',
        dropoffAddress:  '456 Park Ave, New York, NY 10022',
        pickupLat: 40.7128, pickupLng: -74.0060,
        dropoffLat: 40.7589, dropoffLng: -73.9851,
        distanceMiles:   3.2 + Math.random() * 8,
        loadType:        b.load,
        loadSize:        b.size,
        urgency:         b.urgency,
        specialHandling: [],
        status:          b.status,
        basePrice:       b.base,
        loadFee:         10,
        urgencySurcharge: b.urgency === Urgency.ASAP ? b.base * 0.25 : b.urgency === Urgency.TODAY ? b.base * 0.15 : 0,
        totalPrice:      b.total,
        platformFee,
        driverPayout:    b.total - platformFee,
        clientRating:    b.status === BookingStatus.COMPLETED ? 5 : null,
        aiMatchScore:    0.85 + Math.random() * 0.15,
      },
    })
  }
  console.log('✅ 10 bookings created')
  console.log('\n🚚 Seeding complete! TheManAndTruck is ready to roll. InshAllah!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
