import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  const booking = await prisma.accommodationBooking.create({
    data: {
      guestName: "Lee",
      guestEmail: "sbp@gmail.com",
      guestType: "Airbnb",
      checkIn: new Date("2026-08-01"),
      checkOut: new Date("2026-08-21"),
      guests: 2,
      notes: "AirBnb",
      status: "CONFIRMED",
    },
  });
  console.log("Created booking:", booking.id);
}

main()
  .catch((e) => console.error("Error:", e.message))
  .finally(() => prisma.$disconnect());
