import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail, formConfirmationTemplate } from "@/lib/email";
import { SITE } from "@/lib/constants";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  yachtName: z.string().optional(),
  service: z.string(),
  message: z.string().min(10),
  formType: z
    .enum(["CONTACT", "QUOTE", "GUARDIANAGE", "PROJECT", "ACCOMMODATION"])
    .optional(),
  website: z.string().optional(),
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
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const data = schema.parse(body);

    if (data.website) {
      return NextResponse.json({ success: true });
    }

    const formType = data.formType || "CONTACT";
    const contactTo = process.env.CONTACT_TO || SITE.email;
    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safePhone = escapeHtml(data.phone || "N/A");
    const safeYacht = escapeHtml(data.yachtName || "N/A");
    const safeService = escapeHtml(data.service);
    const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br/>");

    const [notification, confirmation] = await Promise.allSettled([
      sendEmail({
        to: contactTo,
        replyTo: data.email,
        subject: `New ${formType} Enquiry from ${data.name}`,
        html: `
        <h2>New Enquiry</h2>
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
        html: formConfirmationTemplate(data.name, data.service),
      }),
    ]);

    const notificationFailed =
      notification.status === "rejected" ||
      (notification.status === "fulfilled" && !notification.value.success);
    const confirmationFailed =
      confirmation.status === "rejected" ||
      (confirmation.status === "fulfilled" && !confirmation.value.success);

    if (notificationFailed && confirmationFailed) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
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
