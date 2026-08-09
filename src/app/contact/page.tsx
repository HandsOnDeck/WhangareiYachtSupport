import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { generateSEO } from "@/lib/seo";
import { IMAGES, SITE } from "@/lib/constants";
import { Phone, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

export const metadata: Metadata = generateSEO({
  title: "Contact Us",
  description:
    "Contact Whangarei Yacht Support for yacht guardianage, project management, and accommodation enquiries. Phone, email, WhatsApp, and online form available.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Contact Us"
        subtitle="We'd love to hear about your vessel and how we can help"
        showCTA={false}
        compact
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <SectionHeading
                title="Send Us a Message"
                subtitle="Fill out the form and we'll respond within 24 hours"
                centered={false}
              />
              <div className="mt-8 rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                <ContactForm />
              </div>
            </div>

            <div className="lg:col-span-2">
              <SectionHeading title="Get in Touch" centered={false} />
              <div className="mt-8 space-y-5">
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

              <div className="mt-8">
                <p className="mb-4 font-medium text-navy">Follow Us</p>
                <div className="flex gap-4">
                  {"facebook" in SITE.social && SITE.social.facebook ? (
                    <a
                      href={SITE.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean/10 text-ocean transition-colors hover:bg-ocean hover:text-white"
                      aria-label="Facebook"
                    >
                      <FacebookIcon />
                    </a>
                  ) : null}
                  {SITE.social.instagram ? (
                    <a
                      href={SITE.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean/10 text-ocean transition-colors hover:bg-ocean hover:text-white"
                      aria-label="Instagram"
                    >
                      <InstagramIcon />
                    </a>
                  ) : null}
                  <a
                    href={SITE.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean/10 text-ocean transition-colors hover:bg-ocean hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
