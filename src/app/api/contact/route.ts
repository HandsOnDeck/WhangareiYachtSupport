import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail, formConfirmationTemplate } from "@/lib/email";
import { contactSchema } from "@/lib/form-fields";
import { allowPublicSubmission, clientAddress } from "@/lib/rate-limit";
import {
  createClientAndBookingFromContact,
  createClientAndJobFromContact,
  isAccommodationService,
  serviceLabel,
} from "@/lib/enquiry";
import { SITE } from "@/lib/constants";

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
        { error: "Database is not configured" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const data = contactSchema.parse(body);

    if (
      !allowPublicSubmission(clientAddress(request), data.email)
    ) {
      return NextResponse.json(
        { error: "Please wait a few minutes and try again." },
        { status: 429 }
      );
    }

    if (data.website) {
      return NextResponse.json({ success: true });
    }

    const accommodation = isAccommodationService(data.service, data.formType);
    const result = accommodation
      ? await createClientAndBookingFromContact(data)
      : await createClientAndJobFromContact(data);

    const formType = data.formType || "CONTACT";
    const contactTo = process.env.CONTACT_TO || SITE.email;
    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safePhone = escapeHtml(data.phone || "N/A");
    const safeYacht = escapeHtml(data.yachtName || "N/A");
    const safeService = escapeHtml(serviceLabel(data.service));
    const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br/>");

    const recordLines = accommodation
      ? `<p><strong>Client ID:</strong> ${result.client.clientId}</p>
        <p><strong>Booking:</strong> dates TBD (enquiry)</p>`
      : `<p><strong>Client ID:</strong> ${result.client.clientId}</p>
        <p><strong>Job ID:</strong> ${"job" in result ? result.job.jobId : ""}</p>`;

    if (process.env.RESEND_API_KEY) {
      await Promise.allSettled([
        sendEmail({
          to: contactTo,
          replyTo: data.email,
          subject: `New ${formType} Enquiry from ${data.name}`,
          html: `
        <h2>New Enquiry</h2>
        ${recordLines}
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Yacht:</strong> ${safeYacht}</p>
        <p><strong>Service:</strong> ${safeService}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
        }),
        sendEmail({
          to: data.email,
          subject: `Thank you for contacting ${SITE.name}`,
          html: formConfirmationTemplate(data.name, serviceLabel(data.service)),
        }),
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }
}
