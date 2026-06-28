# SiteAgentAI

**SiteAgentAI** is an AI Website Employee for small service businesses — HVAC, plumbing, landscaping, roofing, remodeling, and more.

It gives your website a floating assistant that captures visitor requests as leads, then shows business owners a dashboard with AI-style summaries and recommended follow-up actions.

## What's included

| Route | Description |
|-------|-------------|
| `/` | SaaS landing page with live lead-capture widget |
| `/admin` | Protected owner dashboard — live leads for your business |
| `/login` | Owner sign-in |
| `/widget/[widgetKey]` | Embeddable AI employee widget page |
| `POST /api/leads` | Saves widget submissions to Postgres (requires widget key) |

**Widget flow:** Click **Talk to AI Employee** → submit the form → lead appears in `/admin`.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Postgres (`postgres` package)
- NextAuth (owner login)
- Resend (optional email notifications)
- OpenAI (optional GPT summaries — rule-based fallback)

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
| `AUTH_SECRET` | Yes | Session secret for owner login |
| `DEFAULT_BUSINESS_WIDGET_KEY` | Yes* | Homepage demo widget (*after seed) |
| `RESEND_API_KEY` | No | Sends email when a new lead arrives |
| `OWNER_NOTIFICATION_EMAIL` | No | Where lead alerts are sent |
| `RESEND_FROM_EMAIL` | No | Verified sender in Resend |
| `OPENAI_API_KEY` | No | GPT-powered lead summaries |
| `OPENAI_MODEL` | No | Defaults to `gpt-4o-mini` |

### 4. Enable AI summaries (optional)

Add `OPENAI_API_KEY` to generate GPT summaries and recommended next actions for each new lead. If OpenAI is unavailable or not configured, SiteAgentAI falls back to rule-based summaries automatically.

## Phase 3 setup (multi-tenant + owner login)

### 1. Run the Phase 3 migration

If upgrading from Phase 1/2:

```bash
# Run scripts/migrate-phase3.sql in your database
```

For new projects, `scripts/init-db.sql` already includes businesses, users, and scoped leads.

### 2. Configure auth

| Variable | Required | Description |
|----------|----------|-------------|
| `AUTH_SECRET` | Yes | Random string for session encryption (`openssl rand -base64 32`) |
| `DEFAULT_BUSINESS_WIDGET_KEY` | Yes* | Widget key for homepage demo (*from seed output) |
| `NEXT_PUBLIC_APP_URL` | No | Public URL for embed codes (e.g. `https://your-app.vercel.app`) |

### 3. Create your first owner account

```bash
ADMIN_EMAIL=owner@yourbusiness.com \
ADMIN_PASSWORD=your-secure-password \
BUSINESS_NAME="Your Business" \
BUSINESS_NOTIFICATION_EMAIL=owner@yourbusiness.com \
npm run seed:owner
```

Copy the printed **widget key** into `DEFAULT_BUSINESS_WIDGET_KEY`.

### 4. Sign in and embed

1. Go to `/login` and sign in
2. Open `/admin` — view leads and embed code
3. Add the iframe or widget URL to your website

### 5. Deploy to Vercel

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

Push to GitHub and connect to [Vercel](https://vercel.com). Set `DATABASE_URL`, optional Resend vars, and optional `OPENAI_API_KEY` in the Vercel dashboard.
