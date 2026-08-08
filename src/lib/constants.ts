export const SITE = {
  name: "Whangarei Yacht Support",
  tagline:
    "Professional Yacht Guardianage & Project Management/Owner Representative.",
  description:
    "Premium yacht guardianage, project management, and luxury accommodation services for visiting and locally berthed vessels in Whangarei Marina and Northland, New Zealand.",
  url: "https://whangareiyachtsupport.co.nz",
  email: "info@whangareiyachtsupport.co.nz",
  phone: "+64 9 438 3120",
  address: "Whangarei Marina, Town Basin, Whangarei 0110, New Zealand",
  gstNumber: "123-456-789",
  bankName: "ANZ Bank New Zealand",
  bankAccount: "12-3456-7890123-00",
  hours: {
    weekdays: "Monday – Friday: 7:00 AM – 6:00 PM",
    saturday: "Saturday: 8:00 AM – 2:00 PM",
    sunday: "Sunday: Emergency calls only",
  },
  social: {
    facebook: "https://facebook.com/whangareiyachtsupport",
    instagram: "https://instagram.com/whangareiyachtsupport",
    linkedin: "https://linkedin.com/company/whangareiyachtsupport",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/yacht-guardianage", label: "Guardianage" },
  { href: "/project-management", label: "Projects" },
  { href: "/accommodation", label: "Accommodation" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
] as const;

export const SEO_KEYWORDS = [
  "Yacht Guardianage Whangarei",
  "Yacht caretaker Whangarei",
  "Yacht Guardianage New Zealand",
  "Yacht Services NZ",
  "Boat Project Management",
  "Boat Owners Representative",
  "Yacht Maintenance Northland",
  "Whangarei Marina Services",
  "Accommodation Whangarei",
] as const;

export const GST_RATE = 0.15;

export const IMAGES = {
  hero: "/images/hero/hero.jpg",
  marina: "/images/marina/marina.jpg",
  yacht: "/images/about/yacht.jpg",
  coastal: "/images/marina/coastal.jpg",
  accommodation: "/images/accommodation/exterior.jpg",
  project: "/images/project-management/refit.jpg",
  guardianage: "/images/guardianage/inspection.jpg",
} as const;
