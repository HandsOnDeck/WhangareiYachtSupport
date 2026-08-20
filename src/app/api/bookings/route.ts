import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";
import { sendEmail, bookingConfirmationTemplate } from "@/lib/email";
import { createAuditLog } from "@/lib/audit";
import { SITE } from "@/lib/constants";

const schema = z
  .object({
    guestName: z.string().min(2),
    guestEmail: z.string().email(),
    guestPhone: z.string().optional(),
    guestType: z.string(),
    checkIn: z.string(),
    checkOut: z.string(),
    guests: z.coerce.number().min(1).max(6),
    notes: z.string().optional(),
    website: z.string().optional(),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: "Check-out must be after check-in",
  });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    if (data.website) {
      return NextResponse.json({ success: true });
    }

    const booking = await prisma.accommodationBooking.create({
      data: {
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        guestPhone: data.guestPhone,
        guestType: data.guestType,
        checkIn: new Date(data.checkIn),
        checkOut: new Date(data.checkOut),
        guests: data.guests,
        notes: data.notes,
        status: "PENDING",
      },
    });

    await prisma.formSubmission.create({
      data: {
        type: "ACCOMMODATION",
        data: { ...data, bookingId: booking.id },
      },
    });

    const checkInFormatted = format(new Date(data.checkIn), "d MMMM yyyy");
    const checkOutFormatted = format(new Date(data.checkOut), "d MMMM yyyy");

    await Promise.allSettled([
      sendEmail({
        to: SITE.email,
        replyTo: data.guestEmail,
        subject: `New Accommodation Booking — ${data.guestName}`,
        html: `
        <h2>New Booking Request — Totara Apartment</h2>
        <p><strong>Guest:</strong> ${data.guestName}</p>
        <p><strong>Email:</strong> ${data.guestEmail}</p>
        <p><strong>Phone:</strong> ${data.guestPhone || "N/A"}</p>
        <p><strong>Type:</strong> ${data.guestType}</p>
        <p><strong>Check-in:</strong> ${checkInFormatted}</p>
        <p><strong>Check-out:</strong> ${checkOutFormatted}</p>
        <p><strong>Guests:</strong> ${data.guests}</p>
        <p><strong>Notes:</strong> ${data.notes || "None"}</p>
      `,
      }),
      sendEmail({
        to: data.guestEmail,
        subject: `Booking Request Received — Totara Apartment`,
        html: bookingConfirmationTemplate(data.guestName, checkInFormatted, checkOutFormatted),
      }),
    ]);

    await createAuditLog({
      action: "BOOKING_CREATE",
      entity: "AccommodationBooking",
      entityId: booking.id,
      ipAddress: request.headers.get("x-forwarded-for") || undefined,
    });

    return NextResponse.json({ success: true, id: booking.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid booking data" }, { status: 400 });
    }
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const bookings = await prisma.accommodationBooking.findMany({
      where: { status: { in: ["PENDING", "CONFIRMED"] } },
      select: { checkIn: true, checkOut: true, status: true },
      orderBy: { checkIn: "asc" },
    });

    return NextResponse.json({
      bookings: bookings.map((b) => ({
        checkIn: b.checkIn.toISOString(),
        checkOut: b.checkOut.toISOString(),
        status: b.status,
      })),
    });
  } catch {
    return NextResponse.json({ bookings: [] });
  }
}
