import { Metadata } from "next";
import { SITE, SEO_KEYWORDS } from "./constants";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

export function generateSEO({
  title,
  description,
  path = "",
  image,
}: SEOProps = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${SITE.name}`
    : `${SITE.name} — ${SITE.tagline}`;
  const pageDescription = description || SITE.description;
  const url = `${SITE.url}${path}`;
  const ogImage = image || "/og-image.jpg";

  return {
    metadataBase: new URL(SITE.url),
    title: pageTitle,
    description: pageDescription,
    keywords: SEO_KEYWORDS.join(", "),
    authors: [{ name: SITE.name }],
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: SITE.name,
      locale: "en_NZ",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Whangarei Marina, Town Basin",
      addressLocality: "Whangarei",
      addressRegion: "Northland",
      postalCode: "0110",
      addressCountry: "NZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -35.725,
      longitude: 174.323,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "14:00",
      },
    ],
    priceRange: "$$$",
    areaServed: {
      "@type": "Place",
      name: "Northland, New Zealand",
    },
  };
}

export function serviceSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: SITE.name,
    },
    areaServed: "Northland, New Zealand",
  };
}
