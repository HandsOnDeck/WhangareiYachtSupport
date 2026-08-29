import { Resend } from "resend";
import { SITE } from "./constants";

let resend: Resend | null = null;

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  if (!resend) {
    resend = new Resend(apiKey);
  }

  return resend;
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

function htmlToText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|h1|h2|h3|li|div)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function sendEmail(options: SendEmailOptions) {
  const fromName = process.env.EMAIL_FROM_NAME || SITE.name;
  const fromEmail = process.env.EMAIL_FROM || SITE.email;
  const from = `${fromName} <${fromEmail}>`;

  try {
    const { error } = await getResend().emails.send({
      from,
      to: options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      html: options.html,
      text: htmlToText(options.html),
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}

export function formConfirmationTemplate(
  name: string,
  formType: string
): string {
  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #0A2540;">
      <div style="background: #0A2540; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">${SITE.name}</h1>
      </div>
      <div style="padding: 30px; background: #ffffff;">
        <p>Dear ${name},</p>
        <p>Thank you for your ${formType} enquiry. We have received your submission and will be in touch within 24 hours.</p>
        <p>Regards,<br/><strong>${SITE.name}</strong></p>
      </div>
    </div>
  `;
}
