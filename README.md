# Whangarei Yacht Support

Premium marketing website for Whangarei Yacht Support — professional yacht guardianage, project management/owner representative services, and Totara Apartment accommodation in Northland, New Zealand.

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL with Prisma ORM
- **Email:** Nodemailer (SMTP / SendGrid)
- **PDF:** HTML invoice generation

## Features

### Public Website
- Responsive, mobile-first design with navy/ocean/sand palette
- Home, Guardianage, Project Management, Accommodation, About, Gallery, Testimonials, Contact
- Quick enquiry and booking forms with honeypot spam protection
- SEO optimised with meta tags, structured data (JSON-LD), sitemap, and robots.txt
- Image lazy loading and Unsplash CDN optimisation
- WCAG AA accessible focus states and semantic markup

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your database URL and SMTP credentials

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed sample data
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

See `.env.example` for all required variables:

- `DATABASE_URL` — PostgreSQL connection string
- `APP_URL` — Application URL
- `SMTP_*` — Email delivery credentials
- `STRIPE_*` — Payment processing (optional)
- `RECAPTCHA_*` — Google reCAPTCHA (optional, honeypot used as fallback)

## Deployment

Deploy to Vercel, Railway, or any Node.js host with PostgreSQL:

1. Set all environment variables
2. Run `npm run db:push` against production database
3. Enable SSL (automatic on Vercel)
4. Configure daily database backups via your hosting provider

## Security

- HTTPS enforced via HSTS headers
- Honeypot + optional reCAPTCHA on forms
- Audit logging for form submissions and bookings
- Security headers (X-Frame-Options, CSP-adjacent headers)

## SEO Keywords

Optimised for: Yacht Guardianage Whangarei, Yacht caretaker Whangarei, Yacht Guardianage New Zealand, Yacht Services NZ, Boat Project Management, Boat Owners Representative, Yacht Maintenance Northland, Whangarei Marina Services, Accommodation Whangarei.

## License

Private — Whangarei Yacht Support © 2026
