import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendEmail, formConfirmationTemplate } from "@/lib/email";
import { createAuditLog } from "@/lib/audit";
import { SITE } from "@/lib/constants";
import type { FormType } from "@/generated/prisma/client";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  yachtName: z.string().optional(),
  service: z.string(),
  message: z.string().min(10),
  formType: z.enum(["CONTACT", "QUOTE", "GUARDIANAGE", "PROJECT", "ACCOMMODATION"]).optional(),
  website: z.string().optional(),
  captchaToken: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    if (data.website) {
      return NextResponse.json({ success: true });
    }

    const formType = (data.formType || "CONTACT") as FormType;

    await prisma.formSubmission.create({
      data: {
        type: formType,
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          yachtName: data.yachtName,
          service: data.service,
          message: data.message,
        },
      },
    });

    await sendEmail({
      to: SITE.email,
      subject: `New ${formType} Enquiry from ${data.name}`,
      html: `
        <h2>New Enquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
        <p><strong>Yacht:</strong> ${data.yachtName || "N/A"}</p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });

    await sendEmail({
      to: data.email,
      subject: `Thank you for contacting ${SITE.name}`,
      html: formConfirmationTemplate(data.name, data.service),
    });

    await createAuditLog({
      action: "FORM_SUBMIT",
      entity: "FormSubmission",
      details: { type: formType, email: data.email },
      ipAddress: request.headers.get("x-forwarded-for") || undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }
}
