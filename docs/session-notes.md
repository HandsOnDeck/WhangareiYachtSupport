# WYS session notes

Session decisions and setup for the public site and admin app. No secrets — use Vercel / local `.env` for credentials.

## Repos and deploy

| App | Local path | GitHub | Live |
|-----|------------|--------|------|
| Public site | `C:\Users\sbpre\git\wys` | `HandsOnDeck/WhangareiYachtSupport` | `wys.co.nz` (Vercel) |
| Admin | `C:\Users\sbpre\Projects\wys-admin` | `HandsOnDeck/wys-admin` | `admin.wys.co.nz` (also `wys-admin-iota.vercel.app`) |

Both apps share the same Neon PostgreSQL database. Vercel team: `wysnz`.

## Shared database (Neon)

Business tables: `CLIENT`, `SUPPLIER`, `CATEGORY`, `SUPPLIERCAT`, `JOBTYPE`, `JOB`, `TASK`, `BOOKING`, `DOCUMENT`, `TIMEENTRY`.

**STATUS** (`Char(1)`): `A` Active, `P` Pending, `C` Complete, `X` Cancelled.

Auth.js tables: `User`, `Account`, `Session`, `VerificationToken`.

### TIMEENTRY

| Column | Notes |
|--------|--------|
| `TIMEID` | PK |
| `CLIENTID` | FK → `CLIENT` |
| `WORKDATE` | Work date |
| `DURATION` | Hours (`Decimal`) |
| `STATUS` | Same status codes as above |
| `NOTES` | Optional |

Reports currently group hours by **client** (not supplier). Grouping by supplier needs a supplier field on `TIMEENTRY`.

### Schema changes

After altering a table in Neon: update Prisma schema → `db:generate` → restart/redeploy the app. No database “restart” is required.

Prisma SSL: prefer normalizing `sslmode=require` → `verify-full` in the client connection helper if warnings appear.

## Public site (`wys`)

- Contact / booking writes go through `POST /api/bookings` (creates `CLIENT` + `BOOKING`).
- Accommodation bookings do **not** create `JOB`s.
- Bookings work landed on `feature/bookings` and merged to `main` (PR #2).

## Admin (`wys-admin`)

### Auth (magic link)

- Auth.js (NextAuth v5) + Resend + Prisma adapter; JWT sessions.
- Edge-safe `auth.config.ts` — middleware must **not** import Prisma.
- Allowlist: `AUTH_ALLOWED_EMAILS` (comma-separated). Fail closed if empty.
- Env (names only): `AUTH_SECRET`, `AUTH_URL` / `APP_URL`, `AUTH_RESEND_KEY`, `EMAIL_FROM`, `DATABASE_URL`, `DIRECT_URL`.
- Production `AUTH_URL` / `APP_URL` should be `https://admin.wys.co.nz` (wrong URL caused bad redirects).
- Resend test mode: magic links only to the Resend account owner until the domain is verified; `EMAIL_FROM` should use a verified domain.

### Routing and UI

- `/boats` → `/clients`, `/projects` → `/jobs` (permanent redirects in `next.config.ts`).
- Nav: Timeline first; Dashboard removed (`/` redirects to `/timeline`); “Enter Time” → `/time`.
- List routes must be dynamic: `export const dynamic = "force-dynamic"` in root layout (static prerender left empty lists when DB had data).
- Save on forms redirects back to parent list pages (client, job, time, booking, supplier, category).

### Time reporting

- CRUD time entries with filters: client, status, date from/to (default current month), plus total hours.
- Reports: `/reports/time-summary`, `/reports/time-detail` — Pending + Active hours by client, date range default current month, subtotals + grand total.
- Feature branch `feature/time-reporting` merged to `main`.

### Useful paths (admin)

- `prisma/schema.prisma`
- `src/lib/{prisma,time-entries,time-reports,constants,clients}.ts`
- `src/app/time/**`, `src/app/reports/**`
- `src/auth.ts`, `src/auth.config.ts`, `src/middleware.ts`

## Ops / troubleshooting

| Symptom | Likely cause / fix |
|---------|-------------------|
| Admin lists empty, detail pages OK | Wrong `DATABASE_URL` on Vercel, or list pages statically prerendered — sync Neon URL; ensure `force-dynamic` |
| Magic link redirects wrong host | Set production `AUTH_URL` / `APP_URL` to `https://admin.wys.co.nz` |
| Create time entry fails (table missing) | Create `TIMEENTRY` in Neon / migrate |
| Prisma “Unknown argument `status`” | Stale client — regenerate Prisma client and redeploy |
| Local API debugging | Dev terminal, `.next/dev/logs/next-development.log`, browser Network tab; production: Vercel project logs |

## Open / optional follow-ups

- Confirm production auto-deployed latest `main` for admin.
- Confirm production auth URLs point at `admin.wys.co.nz`.
- Add supplier on `TIMEENTRY` only if reports must group by supplier.

## Chat export

Cursor keeps local agent transcripts under the project’s Cursor data folder. This file is the durable, commit-friendly summary of decisions from that work.
