import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { VALUES } from "@/lib/data";
import { generateSEO } from "@/lib/seo";
import { IMAGES } from "@/lib/constants";
import { Anchor, Compass, Heart, Award } from "lucide-react";

export const metadata: Metadata = generateSEO({
  title: "About Us",
  description:
    "Learn about Whangarei Yacht Support — experienced marine professionals providing yacht guardianage, project management, and accommodation services in Northland, New Zealand.",
  path: "/about",
});

const PILLARS = [
  {
    icon: Anchor,
    title: "Marine Experience",
    description:
      "Our team brings decades of combined experience in yacht care, refit management, and marine operations across sailing and motor vessels of all sizes.",
  },
  {
    icon: Compass,
    title: "Local Knowledge",
    description:
      "Deep roots in Whangarei Marina and Northland mean we understand local weather patterns, contractors, suppliers, and the unique needs of vessels in this region.",
  },
  {
    icon: Heart,
    title: "Our Mission",
    description:
      "To provide yacht owners with complete peace of mind through reliable, transparent, and professional vessel care — treating every yacht as if it were our own.",
  },
  {
    icon: Award,
    title: "Professionalism",
    description:
      "Qualified, insured, and dedicated staff who maintain the highest standards in every inspection, project, and client interaction.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Us"
        subtitle="Passionate about yachts, committed to your peace of mind"
        compact
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                title="Our Story"
                subtitle="Built on trust, expertise, and a love of the sea"
                centered={false}
              />
              <p className="mt-6 text-gray-600 leading-relaxed">
                Whangarei Yacht Support was founded to fill a gap in the market — providing
                yacht owners with a single, trusted point of contact for all their vessel care
                needs in Northland. Based at Whangarei Marina, one of New Zealand&apos;s premier
                refit and cruising destinations, we serve both visiting international yachts and
                locally berthed vessels.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                What started as guardianage services for cruising yachts has grown into a
                comprehensive offering including project management, owner representative services,
                and luxury accommodation. Our reputation is built on reliability, transparent
                communication, and genuine care for every vessel we look after.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={IMAGES.yacht}
                alt="Yacht at Whangarei Marina"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading title="What Sets Us Apart" />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="flex gap-5 rounded-xl border border-gray-100 bg-white p-8 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-ocean/10 text-ocean">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-navy">{pillar.title}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading title="Our Values" subtitle="The principles that guide everything we do" />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="font-serif text-xl font-semibold text-navy">{value.title}</h3>
                <p className="mt-3 text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
