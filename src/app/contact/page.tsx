import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { generateSEO } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

export const metadata: Metadata = generateSEO({
  title: "Contact Us",
  description:
    "Contact Whangarei Yacht Support for yacht guardianage, project management, and accommodation enquiries. Phone, email, and WhatsApp available.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Contact Us"
        subtitle="We'd love to hear about your vessel and how we can help"
        compact
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-xl">
            <SectionHeading
              title="Get in Touch"
              subtitle="Reach us by phone, WhatsApp, or email"
            />
            <div className="mt-8">
              <ContactDetails />
            </div>

            <div className="mt-10">
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
      </section>
    </>
  );
}
