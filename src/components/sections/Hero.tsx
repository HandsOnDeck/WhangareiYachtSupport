import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const HERO_LOGO = "/images/about/WYSLogo.png";

interface HeroProps {
  title: string;
  subtitle?: string;
  compact?: boolean;
}

export function Hero({
  title,
  subtitle,
  compact = false,
}: HeroProps) {
  return (
    <section className={`flex items-center bg-hero-bg ${compact ? "min-h-[10vh]" : "min-h-[22vh]"}`}>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid items-center gap-6 md:grid-cols-[auto_1fr_auto]">
          <div className="flex justify-center md:justify-start">
            <Image
              src={HERO_LOGO}
              alt="Whangarei Yacht Support"
              width={384}
              height={384}
              priority
              className="h-40 w-auto object-contain md:h-48"
            />
          </div>

          <div className="text-center">
            <h1 className="animate-fade-in-up font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p
                className="animate-fade-in-up mx-auto mt-3 max-w-2xl text-base text-white/90 md:text-lg"
                style={{ animationDelay: "0.2s" }}
              >
                {subtitle}
              </p>
            )}
          </div>

          <div
            className="animate-fade-in-up flex justify-center md:justify-end"
            style={{ animationDelay: "0.4s" }}
          >
            <Link href="/contact" className="w-full md:w-auto">
              <Button size="sm" className="w-full min-w-[9.5rem] md:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
