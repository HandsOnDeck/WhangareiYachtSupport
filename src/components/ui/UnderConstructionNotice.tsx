import { Construction } from "lucide-react";
import {
  FORMS_UNDER_CONSTRUCTION_MESSAGE,
  SITE,
} from "@/lib/constants";

export function UnderConstructionNotice() {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-8 text-center">
      <Construction className="mx-auto mb-4 h-12 w-12 text-amber-600" />
      <h3 className="font-serif text-xl font-semibold text-navy">
        Under Construction
      </h3>
      <p className="mt-2 text-gray-600">{FORMS_UNDER_CONSTRUCTION_MESSAGE}</p>
      <p className="mt-4 text-sm text-gray-600">
        <a
          href={`tel:${SITE.phone.replace(/\s/g, "")}`}
          className="text-ocean hover:underline"
        >
          {SITE.phone}
        </a>
        {" · "}
        <a href={`mailto:${SITE.email}`} className="text-ocean hover:underline">
          {SITE.email}
        </a>
      </p>
    </div>
  );
}
