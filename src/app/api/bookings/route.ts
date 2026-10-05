import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";
import { sendEmail, bookingConfirmationTemplate } from "@/lib/email";
import { bookingSchema } from "@/lib/form-fields";
import { allowPublicSubmission, clientAddress } from "@/lib/rate-limit";
import { parseStayDate } from "@/lib/stay-overlap";
import { SITE } from "@/lib/constants";
import { STATUS } from "@/lib/enquiry";

const PLACEHOLDER_CUTOFF = new Date("2090-01-01T00:00:00.000Z");
const UNAVAILABLE = "Those dates are not available. Please choose different dates.";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function truncate(value: string, max: number): string {
  return value.length <= max ? value : value.slice(0, max);
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
    const data = bookingSchema.parse(body);

    if (!allowPublicSubmission(clientAddress(request), data.guestEmail)) {
      return NextResponse.json(
        { error: "Please wait a few minutes and try again." },
        { status: 429 }
      );
    }

    if (data.website) {
      return NextResponse.json({ success: true });
    }

    const startDate = parseStayDate(data.checkIn);
    const endDate = parseStayDate(data.checkOut);

    const client = await prisma.$transaction(async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(742019)`;
      const conflict = await tx.booking.findFirst({
        where: {
          status: { in: [STATUS.PENDING, STATUS.ACTIVE] },
          startDate: { lt: endDate },
          endDate: { gt: startDate },
          NOT: { startDate: { gte: PLACEHOLDER_CUTOFF } },
        },
        select: { clientId: true },
      });
      if (conflict) {
        throw new Error("OVERLAP");
      }

      const created = await tx.client.create({
        data: {
          status: STATUS.PENDING,
          name: truncate(data.guestName.trim(), 50),
          email: truncate(data.guestEmail.trim(), 50),
          phone: truncate((data.guestPhone?.trim() || "—").slice(0, 20), 20),
          yachtName: null,
          notes: `Accommodation booking (${data.guestType})`,
        },
      });

      await tx.booking.create({
        data: {
          clientId: created.clientId,
          startDate,
          endDate,
          status: STATUS.PENDING,
          numGuests: data.guests,
          notes: data.notes?.trim().slice(0, 2000) || null,
        },
      });
      return created;
    });

    const checkInFormatted = format(startDate, "d MMMM yyyy");
    const checkOutFormatted = format(endDate, "d MMMM yyyy");
    const contactTo = process.env.CONTACT_TO || SITE.email;

    if (process.env.RESEND_API_KEY) {
      await Promise.allSettled([
        sendEmail({
          to: contactTo,
          replyTo: data.guestEmail,
          subject: `New Accommodation Booking — ${data.guestName}`,
          html: `
        <h2>New Booking Request — Totara Apartment</h2>
        <p><strong>Client ID:</strong> ${client.clientId}</p>
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

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid booking data" }, { status: 400 });
    }
    if (error instanceof Error && error.message === "OVERLAP") {
      return NextResponse.json({ error: UNAVAILABLE }, { status: 409 });
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

    const bookings = await prisma.booking.findMany({
      where: {
        status: { in: [STATUS.PENDING, STATUS.ACTIVE] },
        // Exclude contact-form TBD placeholders (2099)
        startDate: { lt: new Date("2090-01-01T00:00:00.000Z") },
      },
      select: { startDate: true, endDate: true, status: true },
      orderBy: { startDate: "asc" },
    });

    return NextResponse.json({
      bookings: bookings.map((b) => ({
        checkIn: b.startDate.toISOString(),
        checkOut: b.endDate.toISOString(),
        // Map Char(1) to calendar labels used by AvailabilityCalendar
        status: b.status === STATUS.ACTIVE ? "CONFIRMED" : "PENDING",
      })),
    });
  } catch (error) {
    console.error("Availability fetch error:", error);
    return NextResponse.json({ bookings: [] });
  }
}
