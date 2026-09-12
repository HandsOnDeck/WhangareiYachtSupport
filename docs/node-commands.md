# Node / npm / Prisma commands used

Commands actually used (or recommended) while building **wys** and **wys-admin**. Run them from the project folder unless noted.

## Everyday app commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies (`node_modules`) |
| `npm run dev` | Start Next.js local server (`http://localhost:3000`) |
| `npm run build` | Generate Prisma client (if scripted) + production build |
| `npm start` | Run production build locally |
| `npm run lint` | ESLint |

## Prisma / database

| Command | Purpose |
|---------|---------|
| `npm run db:generate` or `npx prisma generate` | Regenerate Prisma Client after schema changes |
| `npm run db:push` or `npx prisma db push` | Push schema to DB (no migration files) |
| `npx prisma validate` | Validate `schema.prisma` |
| `npx prisma db pull` | Introspect DB into Prisma schema |
| `npx prisma studio` / `npm run db:studio` | Browser UI for tables |
| `npx prisma studio --url "postgresql://…"` | Studio with an explicit URL |
| `npx prisma migrate status` | Check migration state (when using migrations) |
| `npx prisma migrate deploy` | Apply migrations in production |

### Local Prisma Dev Postgres (early local setup)

Used before Neon; still useful for offline local DB:

| Command | Purpose |
|---------|---------|
| `npx prisma dev --detach` | Start local Postgres in background |
| `npx prisma dev start` | Start / attach to local Prisma Dev |
| `npx prisma dev ls` | List local Prisma Dev instances / URLs |
| `npx prisma dev --help` | Help for Prisma Dev |

## Packages installed during the work

Examples of installs that were run:

```bash
# Public / early site — Prisma Postgres adapter
npm install @prisma/adapter-pg pg
npm install -D @types/pg tsx

# After moving to C:\Users\sbpre\git\wys
npm install
npm install   # again when adding Prisma / dotenv / Resend, etc.

# Admin scaffold (wys-admin)
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --yes
npm install prisma @prisma/client @prisma/adapter-pg pg date-fns clsx tailwind-merge lucide-react react-hook-form @hookform/resolvers zod uuid
npm install -D @types/pg @types/uuid dotenv tsx
npm install react-day-picker
# later: next-auth, @auth/prisma-adapter, resend (as needed for magic-link auth)
```

## One-off Node scripts

```bash
# Generate a secret (e.g. AUTH_SECRET)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Project helper scripts (early local DB work)
node scripts/create-db.mjs
node scripts/test-db.mjs
```

## Scaffold / verify patterns used

```bash
# New Next.js app in current folder
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --yes

# Typical local loop
npm install
npm run db:generate   # or: npx prisma generate
npm run db:push       # admin; when schema changes
npm run dev

# Typical “does it still build?” check
npm run build
```

## Current scripts in package.json

### `wys` (`C:\Users\sbpre\git\wys`)

- `dev` → `next dev`
- `build` → `prisma generate && next build`
- `start` → `next start`
- `lint` → `eslint`
- `postinstall` → `prisma generate`

### `wys-admin` (`C:\Users\sbpre\Projects\wys-admin`)

- Same as above, plus:
- `db:generate` → `prisma generate`
- `db:push` → `prisma db push`

## Quick reference by task

| Task | Command |
|------|---------|
| Work on the site locally | `npm run dev` |
| After cloning / new machine | `npm install` then `npm run dev` |
| Schema changed | `npx prisma generate` then restart `npm run dev` |
| Push schema to Neon (admin) | `npm run db:push` |
| Browse tables | `npx prisma studio` |
| Check production build | `npm run build` |
| Stale Prisma client (“Unknown argument …”) | `npx prisma generate` + restart / redeploy |

**Note:** Prefer `npx prisma …` when a script is missing from `package.json`. Prefer `npm run …` when the script exists so the project’s intended flags stay consistent.
