"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { GALLERY_IMAGES } from "@/lib/data";
import { IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { key: "guardianage" as const, label: "Guardianage" },
  { key: "projects" as const, label: "Projects" },
  { key: "accommodation" as const, label: "Accommodation" },
  { key: "marina" as const, label: "Marina & Coast" },
];

type CategoryKey = keyof typeof GALLERY_IMAGES;

export function GalleryClient() {
  const [active, setActive] = useState<CategoryKey>("guardianage");

  return (
    <>
      <Hero
        title="Gallery"
        subtitle="A glimpse into our work across guardianage, projects, and accommodation"
        image={IMAGES.marina}
        showCTA={false}
        compact
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Our Work in Pictures"
            subtitle="Browse by category — click any image to view full size"
          />

          <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={active === cat.key}
                onClick={() => setActive(cat.key)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  active === cat.key
                    ? "bg-ocean text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="mt-12" role="tabpanel">
            <GalleryGrid images={GALLERY_IMAGES[active]} columns={3} />
          </div>
        </div>
      </section>
    </>
  );
}
