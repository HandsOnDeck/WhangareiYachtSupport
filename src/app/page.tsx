import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { CTASection } from "@/components/sections/CTASection";
import { WHY_CHOOSE_US, TESTIMONIALS } from "@/lib/data";
import { IMAGES, SITE } from "@/lib/constants";
import { Shield, Wrench, Home, ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Hero
        title={SITE.name}
        subtitle={SITE.tagline}
      />

      {/* Introduction */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                title="Your Trusted Partner in Northland"
                subtitle="Professional care for visiting and locally berthed vessels"
                centered={false}
              />
              <p className="mt-6 text-gray-600 leading-relaxed">
                Whangarei Yacht Support
                provides comprehensive guardianage, project management, and owner representative
                services for yacht owners from around the world. Whether undertaking a refit, managing repairs or need reliable care while away, we deliver
				peace of mind with meticulous attention to detail.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                From weekly inspections and storm preparation to full refit management and luxury
                accommodation at Totara Apartment, we handle every aspect of your vessel&apos;s
                care with professionalism and local expertise.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={IMAGES.marina}
                alt="Whangarei Marina with yachts berthed"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Our Services"
            subtitle="Comprehensive yacht care tailored to your needs"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <ServiceCard
              title="Yacht Guardianage"
              description="Weekly, fortnightly, or monthly inspections with detailed reports, storm preparation, and complete vessel care while you're away."
              icon="Shield"
              href="/yacht-guardianage"
            />
            <ServiceCard
              title="Project Management"
              description="Owner representative services including refit management, contractor coordination, budget tracking, and progress reporting."
              icon="Wrench"
              href="/project-management"
            />
            <ServiceCard
              title="Totara Apartment"
              description="Luxury accommodation ideal for yacht owners during refits, visiting family, or time off the boat — steps from the marina."
              icon="Home"
              href="/accommodation"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Why Choose Whangarei Yacht Support"
            subtitle="The difference that local expertise and dedication makes"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE_US.map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ocean/10 text-ocean">
                  <Shield className="h-7 w-7" />
                </div>
                <h3 className="mb-2 font-serif text-lg font-semibold text-navy">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Banner */}
      <section className="relative h-[400px]">
        <Image
          src={IMAGES.coastal}
          alt="Northland coastal scenery"
          fill
          loading="lazy"
          className="object-cover"
          sizes="100vw"
        />
        <div className="gradient-overlay absolute inset-0" />
        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
              Northland&apos;s Premier Yacht Support
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Serving Whangarei Marina and the wider Northland region
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Trusted by yacht owners from around the world"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <TestimonialCard key={t.yachtName} {...t} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 font-medium text-ocean hover:text-ocean-light"
            >
              Read all testimonials
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Enquiry + Contact */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                title="Quick Enquiry"
                subtitle="Tell us about your vessel and we'll get back to you within 24 hours"
                centered={false}
              />
              <div className="mt-8">
                <ContactForm compact />
              </div>
            </div>
            <div>
              <SectionHeading title="Contact Information" centered={false} />
              <div className="mt-8 space-y-6">
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
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
