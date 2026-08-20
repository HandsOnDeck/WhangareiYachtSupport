import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { CTASection } from "@/components/sections/CTASection";
import { PROJECT_SERVICES } from "@/lib/data";
import { generateSEO, serviceSchema } from "@/lib/seo";
import { IMAGES } from "@/lib/constants";

export const metadata: Metadata = generateSEO({
  title: "Boat Project Management & Owner Representative",
  description:
    "Expert yacht refit management, contractor coordination, budget tracking, and owner representative services in Whangarei and Northland, New Zealand.",
  path: "/project-management",
  image: IMAGES.project,
});

export default function ProjectManagementPage() {
  const schema = serviceSchema(
    "Boat Project Management Whangarei",
    "Owner representative and yacht refit project management services in Northland, New Zealand."
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Hero
        title="Project Management"
        subtitle="Owner representative services for refits, maintenance, and upgrades"
        compact
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              title="Your Eyes and Ears on the Ground"
              subtitle="End-to-end project management with transparent communication"
            />
            <p className="mt-6 text-gray-600 leading-relaxed">
              Whether you&apos;re undertaking a major refit, scheduled maintenance, or emergency
              repairs, our project management team acts as your trusted owner representative. We
              coordinate local contractors, manage budgets, provide regular progress updates
              with photo documentation, and ensure work meets the highest standards.We can arrange suppliers meet with you on arrival and are secured early to avoid delays on arrival.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECT_SERVICES.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Our Process"
            subtitle="Structured approach to every project, big or small"
            light
          />
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {[
              { step: "01", title: "Brief & Scope", desc: "Understanding your requirements and vessel needs" },
              { step: "02", title: "Plan & Budget", desc: "Detailed project plan with transparent costing" },
              { step: "03", title: "Execute & Monitor", desc: "Contractor coordination with regular updates" },
              { step: "04", title: "Inspect & Sign Off", desc: "Quality completion inspections and handover" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <span className="font-serif text-4xl font-bold text-sand">{item.step}</span>
                <h3 className="mt-4 font-serif text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-xl px-4 lg:px-8">
          <SectionHeading
            title="Discuss Your Project"
            subtitle="Call or email us to share your refit or maintenance plans"
          />
          <div className="mt-8">
            <ContactDetails />
          </div>
        </div>
      </section>

      <CTASection
        title="Start Your Project with Confidence"
        subtitle="Local expertise, trusted contractors, transparent reporting"
      />
    </>
  );
}
