import { prisma } from "@/lib/prisma";

/** STATUS Char(1) */
export const STATUS = {
  ACTIVE: "A",
  PENDING: "P",
  COMPLETE: "C",
  CANCELLED: "X",
} as const;

/** JOBTYPE codes (must match JOBTYPE seed rows) */
export const JOB_TYPE = {
  ACCOM: "ACCOM",
  PROJECT: "PROJECT",
  GUARDIAN: "GUARDIAN",
  OTHER: "OTHER",
} as const;

const SERVICE_TO_JOB_TYPE: Record<string, string> = {
  project: JOB_TYPE.PROJECT,
  guardianage: JOB_TYPE.GUARDIAN,
  other: JOB_TYPE.OTHER,
  // legacy aliases
  general: JOB_TYPE.OTHER,
  quote: JOB_TYPE.OTHER,
};

const FORM_TYPE_TO_JOB_TYPE: Record<string, string> = {
  GUARDIANAGE: JOB_TYPE.GUARDIAN,
  PROJECT: JOB_TYPE.PROJECT,
  QUOTE: JOB_TYPE.OTHER,
  CONTACT: JOB_TYPE.OTHER,
};

const SERVICE_LABELS: Record<string, string> = {
  project: "Project Work",
  guardianage: "Guardianage",
  other: "Other",
  accommodation: "Accommodation",
  general: "Other",
  quote: "Other",
};

/** Placeholder range for contact-form accommodation enquiries (dates TBD). */
const TBD_START = new Date("2099-01-01T00:00:00.000Z");
const TBD_END = new Date("2099-01-02T00:00:00.000Z");

function truncate(value: string, max: number): string {
  return value.length <= max ? value : value.slice(0, max);
}

export function isAccommodationService(service: string, formType?: string): boolean {
  return service === "accommodation" || formType === "ACCOMMODATION";
}

export function mapServiceToJobType(service: string, formType?: string): string {
  if (service && SERVICE_TO_JOB_TYPE[service]) {
    return SERVICE_TO_JOB_TYPE[service];
  }
  if (formType && FORM_TYPE_TO_JOB_TYPE[formType]) {
    return FORM_TYPE_TO_JOB_TYPE[formType];
  }
  return JOB_TYPE.OTHER;
}

export function serviceLabel(service: string): string {
  return SERVICE_LABELS[service] || service;
}

export interface ContactEnquiryInput {
  name: string;
  email: string;
  phone?: string;
  yachtName?: string;
  service: string;
  message: string;
  formType?: string;
}

async function createClient(input: ContactEnquiryInput, notes: string) {
  return prisma.client.create({
    data: {
      status: STATUS.PENDING,
      name: truncate(input.name.trim(), 50),
      yachtName: input.yachtName ? truncate(input.yachtName.trim(), 50) : null,
      email: truncate(input.email.trim(), 50),
      phone: truncate((input.phone?.trim() || "—").slice(0, 20), 20),
      notes,
    },
  });
}

/**
 * Accommodation contact enquiries create CLIENT + BOOKING (no JOB).
 * Dates are placeholders until confirmed by admin.
 */
export async function createClientAndBookingFromContact(input: ContactEnquiryInput) {
  const formLabel = input.formType || "CONTACT";
  const label = serviceLabel(input.service);

  const client = await createClient(
    input,
    `Contact form (${formLabel}) — accommodation enquiry`
  );

  const booking = await prisma.booking.create({
    data: {
      clientId: client.clientId,
      startDate: TBD_START,
      endDate: TBD_END,
      status: STATUS.PENDING,
      numGuests: null,
      notes: truncate(
        `Dates TBD. ${formLabel}: ${label}\n\n${input.message.trim()}`,
        4000
      ),
    },
  });

  return { client, booking };
}

/**
 * Creates a CLIENT and a JOB row for a contact-form enquiry.
 * Client STATUS = Pending (P), Job STATUS = Pending (P).
 */
export async function createClientAndJobFromContact(input: ContactEnquiryInput) {
  const jobType = mapServiceToJobType(input.service, input.formType);
  const label = serviceLabel(input.service);
  const formLabel = input.formType || "CONTACT";

  await prisma.jobType.upsert({
    where: { jobType },
    create: {
      jobType,
      descr: truncate(label, 50),
    },
    update: {},
  });

  const client = await createClient(input, `Contact form (${formLabel})`);

  const job = await prisma.job.create({
    data: {
      clientId: client.clientId,
      jobType,
      status: STATUS.PENDING,
      descr: truncate(`${formLabel}: ${label}`, 50),
      notes: input.message.trim(),
    },
  });

  return { client, job };
}
