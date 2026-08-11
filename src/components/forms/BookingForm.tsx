"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Calendar, CheckCircle } from "lucide-react";

const schema = z
  .object({
    guestName: z.string().min(2, "Name is required"),
    guestEmail: z.string().email("Valid email required"),
    guestPhone: z.string().optional(),
    guestType: z.string().min(1, "Please select guest type"),
    checkIn: z.string().min(1, "Check-in date required"),
    checkOut: z.string().min(1, "Check-out date required"),
    guests: z.coerce.number().min(1, "At least 1 guest").max(4, "Maximum 4 guests"),
    notes: z.string().optional(),
    website: z.string().max(0).optional(),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

type FormData = z.infer<typeof schema>;

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { guests: 2, guestType: "yacht-owner" },
  });

  async function onSubmit(data: FormData) {
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Booking request failed");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const today = format(new Date(), "yyyy-MM-dd");

  if (submitted) {
    return (
      <div className="rounded-xl border border-ocean/20 bg-ocean/5 p-8 text-center">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-ocean" />
        <h3 className="font-serif text-xl font-semibold text-navy">Booking Request Received</h3>
        <p className="mt-2 text-gray-600">
          We&apos;ll confirm Totara Apartment availability shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <input
        type="text"
        {...register("website")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Full Name"
          {...register("guestName")}
          error={errors.guestName?.message}
          required
        />
        <Input
          label="Email"
          type="email"
          {...register("guestEmail")}
          error={errors.guestEmail?.message}
          required
        />
        <Input
          label="Phone / WhatsApp"
          type="tel"
          {...register("guestPhone")}
          error={errors.guestPhone?.message}
        />
        <Select
          label="Guest Type"
          {...register("guestType")}
          error={errors.guestType?.message}
          options={[
            { value: "yacht-owner", label: "Yacht Owner (boat on hard)" },
            { value: "family", label: "Visiting Family" },
            { value: "time-off", label: "Time Off the Boat" },
            { value: "other", label: "Other" },
          ]}
        />
        <Input
          label="Check-in"
          type="date"
          min={today}
          {...register("checkIn")}
          error={errors.checkIn?.message}
          required
        />
        <Input
          label="Check-out"
          type="date"
          min={today}
          {...register("checkOut")}
          error={errors.checkOut?.message}
          required
        />
        <Input
          label="Number of Guests"
          type="number"
          min={1}
          max={6}
          {...register("guests", { valueAsNumber: true })}
          error={errors.guests?.message}
        />
      </div>

      <Textarea
        label="Special Requests"
        rows={3}
        {...register("notes")}
        error={errors.notes?.message}
      />

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        <Calendar className="h-4 w-4" />
        {isSubmitting ? "Submitting..." : "Request Booking"}
      </Button>
    </form>
  );
}
