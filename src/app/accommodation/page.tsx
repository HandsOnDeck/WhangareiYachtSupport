import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { BookingForm } from "@/components/forms/BookingForm";
import { AvailabilityCalendar } from "@/components/sections/AvailabilityCalendar";
import { CTASection } from "@/components/sections/CTASection";
import { ACCOMMODATION_AMENITIES, GALLERY_IMAGES } from "@/lib/data";
import { generateSEO } from "@/lib/seo";
import { IMAGES, SITE } from "@/lib/constants";
import { Check, MapPin } from "lucide-react";

export const metadata: Metadata = generateSEO({
  title: "Totara Apartment — Accommodation Whangarei",
  description:
    "Luxury marina-side accommodation at Totara Apartment, Whangarei. Ideal for yacht owners during refits, visiting family, and time off the boat.",
  path: "/accommodation",
  image: IMAGES.accommodation,
});

export default function AccommodationPage() {
  const mapEmbed =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3188.5!2d174.323!3d-35.725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQzJzMwLjAiUyAxNzTCsDE5JzIyLjgiRQ!5e0!3m2!1sen!2snz!4v1234567890";

  return (
    <>
      <Hero
        title="Totara Apartment"
        subtitle="Luxury accommodation steps from Whangarei Marina"
        compact
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                title="Your Home Away from the Boat"
                subtitle="Premium comfort in the heart of the Town Basin"
                centered={false}
              />
              <p className="mt-6 text-gray-600 leading-relaxed">
                Totara Apartment offers beautifully appointed, fully furnished accommodation with
                stunning marina views. Perfect for yacht owners while your vessel is on the hard,
                visiting family and friends, or simply enjoying time off the boat while exploring
                Northland.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Yacht owners while boat is on hard",
                  "Visiting family and guests",
                  "Time off the boat between passages",
                  "Crew accommodation during refits",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <Check className="h-5 w-5 shrink-0 text-ocean" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={IMAGES.accommodation}
                alt="Totara Apartment interior"
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
          <SectionHeading title="Photo Gallery" subtitle="Explore Totara Apartment" />
          <div className="mt-12">
            <GalleryGrid images={GALLERY_IMAGES.accommodation} />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading title="Amenities" subtitle="Everything you need for a comfortable stay" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ACCOMMODATION_AMENITIES.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
              >
                <Check className="h-5 w-5 shrink-0 text-ocean" />
                <span className="text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                title="Availability"
                subtitle="Check dates and request a booking"
                centered={false}
              />
              <div className="mt-8">
                <AvailabilityCalendar />
              </div>
            </div>
            <div>
              <SectionHeading
                title="Booking Enquiry"
                subtitle="Reserve Totara Apartment for your stay"
                centered={false}
              />
              <div className="mt-8 rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading title="Location" subtitle="In the heart of Whangarei's Town Basin" />
          <div className="mt-8 overflow-hidden rounded-2xl shadow-lg">
            <iframe
              src={mapEmbed}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Totara Apartment location map"
            />
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-gray-600">
            <MapPin className="h-5 w-5 text-ocean" />
            {SITE.address}
          </div>
        </div>
      </section>

      <CTASection
        title="Book Your Stay"
        subtitle="Comfortable accommodation just steps from your vessel"
      />
    </>
  );
}
