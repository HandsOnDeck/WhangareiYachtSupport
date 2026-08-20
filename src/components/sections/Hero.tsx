import Image from "next/image";

const HERO_LOGO = "/images/about/WYSLogo.png";

interface HeroProps {
  title: string;
  subtitle?: string;
  compact?: boolean;
}

export function Hero({ title, subtitle, compact = false }: HeroProps) {
  return (
    <section
      className={`flex items-center bg-hero-bg ${compact ? "min-h-[5vh]" : "min-h-[11vh]"}`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-4 lg:px-8">
        <div className="grid items-center gap-4 md:grid-cols-[auto_1fr]">
          <div className="flex justify-center md:justify-start">
            <Image
              src={HERO_LOGO}
              alt="Whangarei Yacht Support"
              width={384}
              height={384}
              priority
              className="h-20 w-auto object-contain md:h-24"
            />
          </div>

          <div className="text-center">
            <h1 className="animate-fade-in-up font-serif text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              {title}
            </h1>
            {subtitle && (
              <p
                className="animate-fade-in-up mx-auto mt-2 max-w-2xl text-sm text-white/90 md:text-base"
                style={{ animationDelay: "0.2s" }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
