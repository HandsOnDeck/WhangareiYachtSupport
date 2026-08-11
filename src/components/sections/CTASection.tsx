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
      </div>
    </section>
  );
}
