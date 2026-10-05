"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle } from "lucide-react";
import { FIELD_MAX } from "@/lib/form-fields";

const schema = z.object({
  name: z.string().min(2, "Name is required").max(FIELD_MAX.name, "Name is too long"),
  email: z.string().email("Valid email required").max(FIELD_MAX.email, "Email is too long"),
  phone: z.string().max(FIELD_MAX.phone, "Phone is too long").optional(),
  yachtName: z.string().max(FIELD_MAX.yachtName, "Yacht name is too long").optional(),
  service: z.string().min(1, "Please select a service").max(FIELD_MAX.service),
  message: z
    .string()
    .min(10, "Please provide more details")
    .max(FIELD_MAX.message, "Message is too long"),
  website: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

interface ContactFormProps {
  defaultService?: string;
  formType?: "CONTACT" | "QUOTE" | "GUARDIANAGE" | "PROJECT";
  compact?: boolean;
}

export function ContactForm({
  defaultService = "other",
  formType = "CONTACT",
  compact = false,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: defaultService },
  });

  async function onSubmit(data: FormData) {
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Submission failed");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-ocean/20 bg-ocean/5 p-8 text-center">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-ocean" />
        <h3 className="font-serif text-xl font-semibold text-navy">Thank You</h3>
        <p className="mt-2 text-gray-600">
          We&apos;ve received your enquiry and will be in touch within 24 hours.
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

      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <Input
          label="Full Name"
          maxLength={FIELD_MAX.name}
          {...register("name")}
          error={errors.name?.message}
          required
        />
        <Input
          label="Email"
          type="email"
          maxLength={FIELD_MAX.email}
          {...register("email")}
          error={errors.email?.message}
          required
        />
        <Input
          label="Phone / WhatsApp"
          type="tel"
          maxLength={FIELD_MAX.phone}
          {...register("phone")}
          error={errors.phone?.message}
        />
        <Input
          label="Yacht Name"
          maxLength={FIELD_MAX.yachtName}
          {...register("yachtName")}
          error={errors.yachtName?.message}
        />
      </div>

      <Select
        label="Service"
        {...register("service")}
        error={errors.service?.message}
        options={[
          { value: "project", label: "Project Work" },
          { value: "guardianage", label: "Guardianage" },
          { value: "other", label: "Other" },
          { value: "accommodation", label: "Accommodation" },
        ]}
      />

      <Textarea
        label="Message"
        rows={compact ? 4 : 5}
        maxLength={FIELD_MAX.message}
        {...register("message")}
        error={errors.message?.message}
        required
      />

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        <Send className="h-4 w-4" />
        {isSubmitting ? "Sending..." : "Send Enquiry"}
      </Button>
    </form>
  );
}
