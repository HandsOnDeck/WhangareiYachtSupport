import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import { GalleryClient } from "./GalleryClient";

export const metadata: Metadata = generateSEO({
  title: "Gallery",
  description:
    "Photo gallery showcasing yacht guardianage, refit projects, Totara Apartment accommodation, and Northland marina scenery.",
  path: "/gallery",
});

export default function GalleryPage() {
  return <GalleryClient />;
}
