import type { MetadataRoute } from "next";
import { SITE, NAV_LINKS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV_LINKS.map((link) => ({
    url: `${SITE.url}${link.href === "/" ? "" : link.href}`,
    lastModified: new Date(),
    changeFrequency: link.href === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: link.href === "/" ? 1 : 0.8,
  }));
}
