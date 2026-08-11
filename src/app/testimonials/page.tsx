import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { CTASection } from "@/components/sections/CTASection";
import { TESTIMONIALS } from "@/lib/data";
import { generateSEO } from "@/lib/seo";
import { IMAGES } from "@/lib/constants";

export const metadata: Metadata = generateSEO({
  title: "Testimonials",
  description:
    "Read reviews from yacht owners who trust Whangarei Yacht Support for guardianage, project management, and accommodation in Northland, New Zealand.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Whangarei Yacht Support",
    review: TESTIMONIALS.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.yachtName },
      reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
      reviewBody: t.content,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <Hero
        title="Testimonials"
        subtitle="Trusted by yacht owners from around the world"
        compact
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Client Reviews"
            subtitle="Don't just take our word for it."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.yachtName} {...t} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Join Our Satisfied Clients"
        subtitle="Experience the Whangarei Yacht Support difference"
      />
    </>
  );
}
