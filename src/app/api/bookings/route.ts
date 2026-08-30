import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";
import { sendEmail, bookingConfirmationTemplate } from "@/lib/email";
import { SITE } from "@/lib/constants";

const schema = z
  .object({
    guestName: z.string().min(2),
    guestEmail: z.string().email(),
    guestPhone: z.string().optional(),
    guestType: z.string(),
    checkIn: z.string(),
    checkOut: z.string(),
    guests: z.coerce.number().min(1).max(4),
    notes: z.string().optional(),
    website: z.string().optional(),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: "Check-out must be after check-in",
  });

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Booking service is not configured" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const data = schema.parse(body);

    if (data.website) {
      return NextResponse.json({ success: true });
    }

    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);

    const conflict = await prisma.accommodationBooking.findFirst({
      where: {
        status: { in: ["PENDING", "CONFIRMED"] },
        checkIn: { lt: checkOut },
        checkOut: { gt: checkIn },
      },
      select: { id: true },
    });

    if (conflict) {
      return NextResponse.json(
        { error: "Those dates are not available. Please choose different dates." },
        { status: 409 }
      );
    }

    const booking = await prisma.accommodationBooking.create({
      data: {
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        guestPhone: data.guestPhone,
        guestType: data.guestType,
        checkIn,
        checkOut,
        guests: data.guests,
        notes: data.notes,
        status: "PENDING",
      },
    });

    const checkInFormatted = format(checkIn, "d MMMM yyyy");
    const checkOutFormatted = format(checkOut, "d MMMM yyyy");
    const contactTo = process.env.CONTACT_TO || SITE.email;

    if (process.env.RESEND_API_KEY) {
      await Promise.allSettled([
        sendEmail({
          to: contactTo,
          replyTo: data.guestEmail,
          subject: `New Accommodation Booking — ${data.guestName}`,
          html: `
        <h2>New Booking Request — Totara Apartment</h2>
        <p><strong>Guest:</strong> ${escapeHtml(data.guestName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.guestEmail)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.guestPhone || "N/A")}</p>
        <p><strong>Type:</strong> ${escapeHtml(data.guestType)}</p>
        <p><strong>Check-in:</strong> ${checkInFormatted}</p>
        <p><strong>Check-out:</strong> ${checkOutFormatted}</p>
        <p><strong>Guests:</strong> ${data.guests}</p>
        <p><strong>Notes:</strong> ${escapeHtml(data.notes || "None")}</p>
      `,
        }),
        sendEmail({
          to: data.guestEmail,
          subject: "Booking Request Received — Totara Apartment",
          html: bookingConfirmationTemplate(
            escapeHtml(data.guestName),
            checkInFormatted,
            checkOutFormatted
          ),
        }),
      ]);
    }

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
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ bookings: [] });
    }

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
  } catch (error) {
    console.error("Availability fetch error:", error);
    return NextResponse.json({ bookings: [] });
  }
}
