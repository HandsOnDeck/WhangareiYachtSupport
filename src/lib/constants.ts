export const SITE = {
  name: "Whangarei Yacht Support",
  tagline:
    "Professional Yacht Guardianage & Project Management/Owner Representative in Northland, New Zealand.",
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
  hero:
    "https://images.unsplash.com/photo-1567899378494-47b050778896?w=1920&q=80",
  marina:
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80",
  yacht:
    "https://images.unsplash.com/photo-1605281317010-fe6ffe9251b6?w=1920&q=80",
  coastal:
    "https://images.unsplash.com/photo-1505118389757-91f5f2372ddd?w=1920&q=80",
  accommodation:
    "https://images.unsplash.com/photo-1611892440504-42a792e284de?w=1920&q=80",
  project:
    "https://images.unsplash.com/photo-1581091226822-a6a2a5aee158?w=1920&q=80",
  guardianage:
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80",
} as const;
