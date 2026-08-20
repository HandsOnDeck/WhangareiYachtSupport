"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { UnderConstructionNotice } from "@/components/ui/UnderConstructionNotice";
import { Send, CheckCircle } from "lucide-react";
import { FORMS_UNDER_CONSTRUCTION } from "@/lib/constants";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  yachtName: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Please provide more details"),
  website: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

interface ContactFormProps {
  defaultService?: string;
  formType?: "CONTACT" | "QUOTE" | "GUARDIANAGE" | "PROJECT";
  compact?: boolean;
}

export function ContactForm({
  defaultService = "general",
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

  if (FORMS_UNDER_CONSTRUCTION) {
    return <UnderConstructionNotice />;
  }

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
          {...register("name")}
          error={errors.name?.message}
          required
        />
        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          required
        />
        <Input
          label="Phone / WhatsApp"
          type="tel"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <Input
          label="Yacht Name"
          {...register("yachtName")}
          error={errors.yachtName?.message}
        />
      </div>

      <Select
        label="Service"
        {...register("service")}
        error={errors.service?.message}
        options={[
          { value: "general", label: "General Enquiry" },
          { value: "guardianage", label: "Yacht Guardianage" },
          { value: "project", label: "Project Management" },
          { value: "accommodation", label: "Accommodation" },
          { value: "quote", label: "Request a Quote" },
        ]}
      />

      <Textarea
        label="Message"
        rows={compact ? 4 : 5}
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
