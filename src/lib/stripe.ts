import Stripe from "stripe";
import { SITE } from "./constants";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-07-29.dahlia",
    })
  : null;

export async function createCheckoutSession({
  invoiceId,
  invoiceNumber,
  amount,
  customerEmail,
}: {
  invoiceId: string;
  invoiceNumber: string;
  amount: number;
  customerEmail: string;
}) {
  if (!stripe) throw new Error("Stripe is not configured");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "nzd",
          product_data: {
            name: `Invoice ${invoiceNumber}`,
            description: `Payment for invoice ${invoiceNumber}`,
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${SITE.url}/contact?payment=success&invoice=${invoiceNumber}`,
    cancel_url: `${SITE.url}/contact?payment=cancelled&invoice=${invoiceNumber}`,
    customer_email: customerEmail,
    metadata: { invoiceId },
  });

  return session;
}
