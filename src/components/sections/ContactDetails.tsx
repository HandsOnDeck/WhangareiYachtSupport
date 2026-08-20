import { Phone, Mail } from "lucide-react";
import { SITE } from "@/lib/constants";

interface ContactDetailsProps {
  className?: string;
}

export function ContactDetails({ className = "space-y-5" }: ContactDetailsProps) {
  return (
    <div className={className}>
      <a
        href={`tel:${SITE.phone.replace(/\s/g, "")}`}
        className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
      >
        <Phone className="mt-0.5 h-5 w-5 text-ocean" />
        <div>
          <p className="font-medium text-navy">Phone / WhatsApp</p>
          <p className="text-gray-600">{SITE.phone}</p>
        </div>
      </a>

      <a
        href={`mailto:${SITE.email}`}
        className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
      >
        <Mail className="mt-0.5 h-5 w-5 text-ocean" />
        <div>
          <p className="font-medium text-navy">Email</p>
          <p className="text-gray-600">{SITE.email}</p>
        </div>
      </a>
    </div>
  );
}
