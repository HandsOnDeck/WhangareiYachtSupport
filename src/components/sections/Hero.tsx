import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/constants";

interface HeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  showCTA?: boolean;
  overlay?: boolean;
  compact?: boolean;
}

export function Hero({
  title,
  subtitle,
  image = IMAGES.hero,
  showCTA = true,
  overlay = true,
  compact = false,
}: HeroProps) {
  return (
    <section className={`relative flex items-center ${compact ? "min-h-[40vh]" : "min-h-[85vh]"}`}>
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {overlay && <div className="gradient-overlay absolute inset-0" />}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 text-center lg:px-8">
        <h1 className="animate-fade-in-up font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl" style={{ animationDelay: "0.2s" }}>
            {subtitle}
          </p>
        )}
        {showCTA && (
          <div className="animate-fade-in-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: "0.4s" }}>
            <Link href="/contact?type=quote">
              <Button size="lg">Request a Quote</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">Contact Us</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
