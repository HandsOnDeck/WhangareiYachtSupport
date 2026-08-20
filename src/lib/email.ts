import nodemailer from "nodemailer";
import { SITE } from "./constants";

const smtpPort = parseInt(process.env.SMTP_PORT || "587");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  // Fail fast rather than making the visitor wait on an unreachable mail server.
  connectionTimeout: 8000,
  greetingTimeout: 8000,
  socketTimeout: 12000,
});

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
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
  const from = `"${process.env.EMAIL_FROM_NAME || SITE.name}" <${process.env.EMAIL_FROM || SITE.email}>`;

  try {
    await transporter.sendMail({
      from,
      to: options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      html: options.html,
      text: htmlToText(options.html),
      attachments: options.attachments,
    });
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}

export function invoiceEmailTemplate(clientName: string): string {
  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #0A2540;">
      <div style="background: #0A2540; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">${SITE.name}</h1>
      </div>
      <div style="padding: 30px; background: #ffffff;">
        <p>Hello ${clientName},</p>
        <p>Please find attached your invoice from ${SITE.name}.</p>
        <p>Thank you for choosing us.</p>
        <p>Regards,<br/><strong>${SITE.name}</strong></p>
      </div>
      <div style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666;">
        <p>${SITE.address} | ${SITE.phone} | ${SITE.email}</p>
      </div>
    </div>
  `;
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

export function bookingConfirmationTemplate(
  guestName: string,
  checkIn: string,
  checkOut: string
): string {
  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #0A2540;">
      <div style="background: #0A2540; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Accommodation Booking</h1>
      </div>
      <div style="padding: 30px; background: #ffffff;">
        <p>Dear ${guestName},</p>
        <p>Your accommodation booking request has been received:</p>
        <ul>
          <li><strong>Check-in:</strong> ${checkIn}</li>
          <li><strong>Check-out:</strong> ${checkOut}</li>
        </ul>
        <p>We will confirm availability shortly.</p>
        <p>Regards,<br/><strong>${SITE.name}</strong></p>
      </div>
    </div>
  `;
}
