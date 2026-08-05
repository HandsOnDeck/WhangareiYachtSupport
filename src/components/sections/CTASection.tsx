import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/sections/SectionHeading";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export function CTASection({
  title = "Ready to Protect Your Investment?",
  subtitle = "Get in touch today for a personalised quote or to discuss your vessel's needs.",
}: CTASectionProps) {
  return (
    <section className="bg-navy py-20">
      <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
        <SectionHeading title={title} subtitle={subtitle} light />
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/contact?type=quote">
            <Button size="lg">Request a Quote</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
