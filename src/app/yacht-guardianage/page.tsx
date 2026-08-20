import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { CTASection } from "@/components/sections/CTASection";
import { GUARDIANAGE_SERVICES } from "@/lib/data";
import { generateSEO, serviceSchema } from "@/lib/seo";
import { IMAGES } from "@/lib/constants";

export const metadata: Metadata = generateSEO({
  title: "Yacht Guardianage Whangarei",
  description:
    "Professional yacht guardianage and caretaker services in Whangarei Marina. Weekly, fortnightly, or monthly inspections, storm preparation, bilge monitoring, and detailed photo reports.",
  path: "/yacht-guardianage",
  image: IMAGES.guardianage,
});

// const INSPECTION_OPTIONS = [
//   "Monthly inspections",
//   "Fortnightly (two weekly) inspections",
//   "Weekly inspections",
// ];

export default function GuardianagePage() {
  const schema = serviceSchema(
    "Yacht Guardianage Whangarei",
    "Professional yacht caretaker and guardianage services at Whangarei Marina, Northland, New Zealand."
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Hero
        title="Yacht Guardianage"
        subtitle="Complete peace of mind while you're away from your vessel"
        compact
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              title="Professional Vessel Care"
              subtitle="Flexible inspection schedules tailored to your individual needs"
            />
            <p className="mt-6 text-gray-600 leading-relaxed">
              Our guardianage service provides comprehensive care for your yacht while you&apos;re
              travelling, or simply unable to visit regularly. Every inspection
              is documented with detailed reports and photo updates emailed directly to you.
            </p>
          </div>

          {/* <div className="mt-10 flex flex-wrap justify-center gap-4">
            {INSPECTION_OPTIONS.map((option) => (
              <span
                key={option}
                className="inline-flex items-center gap-2 rounded-full bg-ocean/10 px-5 py-2 text-sm font-medium text-ocean"
              >
                <CheckCircle className="h-4 w-4" />
                {option}
              </span>
            ))}
          </div> */}

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GUARDIANAGE_SERVICES.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-xl px-4 lg:px-8">
          <SectionHeading
            title="Request Guardianage Services"
            subtitle="Call or email us to discuss your vessel and preferred inspection schedule"
          />
          <div className="mt-8">
            <ContactDetails />
          </div>
        </div>
      </section>

      <CTASection
        title="Protect Your Vessel Today"
        subtitle="Flexible guardianage plans for every yacht and schedule"
      />
    </>
  );
}
