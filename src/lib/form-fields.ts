import { z } from "zod";

/** Matches the client and booking column sizes, with a cap on free-text notes. */
export const FIELD_MAX = {
  name: 50,
  email: 50,
  phone: 20,
  yachtName: 50,
  service: 40,
  message: 2000,
  notes: 2000,
  guestType: 40,
  date: 10,
} as const;

const dateOnly = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date")
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
  }, "Enter a valid date");

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(FIELD_MAX.name, "Name is too long"),
  email: z.string().trim().email("Valid email required").max(FIELD_MAX.email, "Email is too long"),
  phone: z.string().trim().max(FIELD_MAX.phone, "Phone is too long").optional(),
  yachtName: z.string().trim().max(FIELD_MAX.yachtName, "Yacht name is too long").optional(),
  service: z.string().trim().min(1, "Please select a service").max(FIELD_MAX.service, "Service is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Please provide more details")
    .max(FIELD_MAX.message, "Message is too long"),
  formType: z.enum(["CONTACT", "QUOTE", "GUARDIANAGE", "PROJECT", "ACCOMMODATION"]).optional(),
  website: z.string().max(200).optional(),
});

export const bookingSchema = z
  .object({
    guestName: z.string().trim().min(2, "Name is required").max(FIELD_MAX.name, "Name is too long"),
    guestEmail: z
      .string()
      .trim()
      .email("Valid email required")
      .max(FIELD_MAX.email, "Email is too long"),
    guestPhone: z.string().trim().max(FIELD_MAX.phone, "Phone is too long").optional(),
    guestType: z
      .string()
      .trim()
      .min(1, "Please select guest type")
      .max(FIELD_MAX.guestType, "Guest type is too long"),
    checkIn: dateOnly,
    checkOut: dateOnly,
    guests: z.coerce.number().min(1).max(4),
    notes: z.string().trim().max(FIELD_MAX.notes, "Notes are too long").optional(),
    website: z.string().max(200).optional(),
  })
  .refine((data) => data.checkOut > data.checkIn, {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });
