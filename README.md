# SiteAgentAI

**SiteAgentAI** is an AI Website Employee for small service businesses — HVAC, plumbing, landscaping, roofing, remodeling, and more.

It gives your website a floating assistant that captures visitor requests as leads, then shows business owners a dashboard with AI-style summaries and recommended follow-up actions.

## What's included

| Route | Description |
|-------|-------------|
| `/` | SaaS landing page with live lead-capture widget |
| `/admin` | Owner dashboard — live leads when database is connected |
| `POST /api/leads` | Saves widget submissions to Postgres |

**Widget flow:** Click **Talk to AI Employee** → submit the form → lead appears in `/admin`.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Postgres (`postgres` package)
- Resend (optional email notifications)

## Getting started

**Requirements:** Node.js 18+

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Phase 1 setup (live lead capture)

### 1. Create a Postgres database

Use any Postgres provider:

- [Neon](https://neon.tech) (recommended with Vercel)
- [Supabase](https://supabase.com)
- [Vercel Postgres](https://vercel.com/storage/postgres)

### 2. Run the schema

Execute `scripts/init-db.sql` in your database SQL editor or CLI.

### 3. Configure environment variables

Copy `.env.example` to `.env.local` and set:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Postgres connection string |
| `RESEND_API_KEY` | No | Sends email when a new lead arrives |
| `OWNER_NOTIFICATION_EMAIL` | No | Where lead alerts are sent |
| `RESEND_FROM_EMAIL` | No | Verified sender in Resend |

### 4. Deploy to Vercel

Add the same environment variables in your Vercel project settings, then redeploy.

Without `DATABASE_URL`, the demo still works with sample data in `/admin`. The widget returns a friendly error until the database is connected.

## Scripts

```bash
npm run dev    # Start development server
npm run build  # Production build
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Founder docs

| File | Purpose |
|------|---------|
| `docs/customer-validation.md` | Demo script and validation questions |
| `docs/pilot-outreach-messages.md` | Outreach templates |
| `docs/validation-tracker.md` | Track conversations and signals |

## Deploy

Push to GitHub and connect to [Vercel](https://vercel.com). Set `DATABASE_URL` (and optional Resend vars) in the Vercel dashboard.
