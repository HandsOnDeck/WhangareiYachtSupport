"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { cn } from "@/lib/utils";

interface GalleryImage {
  url: string;
  title: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

export function GalleryGrid({ images, columns = 3 }: GalleryGridProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openLightbox = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  const colClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <>
      <div className={cn("grid gap-4", colClass)}>
        {images.map((image, i) => (
          <button
            key={`${image.url}-${i}`}
            type="button"
            onClick={() => openLightbox(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean"
            aria-label={`View ${image.title}`}
          >
            <Image
              src={image.url}
              alt={image.title}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-navy/0 transition-colors group-hover:bg-navy/40" />
            <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform group-hover:translate-y-0">
              <p className="text-sm font-medium text-white">{image.title}</p>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((img) => ({ src: img.url, title: img.title }))}
      />
    </>
  );
}
