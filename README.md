# SiteAgentAI

**SiteAgentAI** is an AI Website Employee for small service businesses.

It turns passive websites into 24/7 lead-capturing assistants: visitors describe what they need through a floating widget, and business owners receive structured leads with summaries and recommended follow-up actions in a simple dashboard.

**Live demo:** [https://siteagentai.vercel.app](https://siteagentai.vercel.app)

## What's included

| Route | Description |
|-------|-------------|
| `/` | Landing page with live lead-capture widget |
| `/login` | Owner sign-in |
| `/admin` | Protected owner dashboard — lead inbox |
| `/widget/[widgetKey]` | Embeddable widget page |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `POST /api/leads` | Saves widget submissions to Postgres |

**Demo flow for prospects:** Click **Talk to AI Employee** → submit the form → sign in at `/login` → view the lead in `/admin`.

## Demo

SiteAgentAI is demo-ready for showing the core lead-capture flow:

1. Open the homepage.
2. Click **Talk to AI Employee**.
3. Submit a test service request.
4. Sign in to `/admin`.
5. Review the saved lead, summary, recommended next action, and widget embed code.

### Screenshots

Screenshots are not committed yet. Before a public launch or investor/customer
demo, add images to `docs/screenshots/` and update this section with:

| Screen | Suggested file |
|--------|----------------|
| Homepage with widget closed | `docs/screenshots/homepage.png` |
| Lead capture widget | `docs/screenshots/widget.png` |
| Owner dashboard | `docs/screenshots/admin-dashboard.png` |

Keep screenshots free of real customer data, real emails, API keys, database
URLs, and private dashboard information.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Postgres via [Neon](https://neon.tech)
- NextAuth (owner login)

## Security warning

**Never commit secrets to git.**

These files must stay local or in your hosting provider only:

- `.env.local`
- `.env`
- Database connection strings
- `AUTH_SECRET`
- API keys and passwords

The repo includes `.env.example` with **placeholder values only**. Copy it locally and fill in real values outside of git.

## Local setup

**Requirements:** Node.js 18+, a Postgres database (local Docker or Neon)

### Fast local setup with Docker

If you have Docker installed, the helper script creates a local Postgres
container, writes generated local-only credentials to `.env.local`, runs the
schema, and seeds the owner account:

```bash
npm install
bash scripts/setup-local.sh
npm run dev
```

For safety, the script does **not** print the generated password. The local
owner email and password are stored in `.env.local` as `ADMIN_EMAIL` and
`ADMIN_PASSWORD`.

### Manual setup

```bash
npm install
cp .env.example .env.local
```

Set these in `.env.local`:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Postgres connection string |
| `AUTH_SECRET` | Yes | Session secret (`openssl rand -base64 32`) |
| `DEFAULT_BUSINESS_WIDGET_KEY` | Yes* | Homepage demo widget (*after seed) |
| `NEXT_PUBLIC_APP_URL` | No | Defaults to localhost in dev |

### 1. Create the database schema

For a **new** database:

```bash
psql "$DATABASE_URL" -f scripts/init-db.sql
```

If upgrading an existing database, run the migration scripts in order instead.

### 2. Create the owner account

```bash
ADMIN_EMAIL=owner@yourbusiness.com \
ADMIN_PASSWORD=choose-a-strong-password \
BUSINESS_NAME="Your Business" \
npm run seed:owner
```

Copy the printed **widget key** into `DEFAULT_BUSINESS_WIDGET_KEY` in `.env.local`.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Owner login demo:** sign in at `/login` with the email and password from the seed command above.

## Production setup (Neon + Vercel)

### 1. Create a Neon database

1. Create a project at [neon.tech](https://neon.tech)
2. Copy the Postgres connection string
3. Run the schema:

```bash
psql "$DATABASE_URL" -f scripts/init-db.sql
```

4. Seed the owner account (same command as local setup, with your production `DATABASE_URL`)

### 2. Deploy on Vercel

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in **Project → Settings → Environment Variables**:

| Variable | Required |
|----------|----------|
| `DATABASE_URL` | Yes |
| `AUTH_SECRET` | Yes |
| `DEFAULT_BUSINESS_WIDGET_KEY` | Yes |
| `NEXT_PUBLIC_APP_URL` | Yes (e.g. `https://siteagentai.vercel.app`) |

4. Redeploy after saving env vars

### 3. Test production after deploy

1. Open your Vercel URL
2. Submit a test lead via **Talk to AI Employee**
3. Sign in at `/login` with your seeded owner account
4. Confirm the lead appears in `/admin` with contact info, summary, and next action

## Known Production Limitations

This repository is suitable for MVP demos, private pilots, and technical review.
It is not yet hardened for real customer data at scale.

Before serving real users, add:

- Provider-backed rate limiting for lead submission and login attempts
- Stronger authentication flows such as password reset, account lockout, and optional MFA
- A formal database migration system and backup/restore process
- Error monitoring, structured logs, uptime checks, and alerting
- Customer-specific allowed domains for widget iframe embedding
- Clear data retention, deletion, and export workflows for lead/customer PII
- A dependency-audit upgrade plan when safe upstream fixes are available

## Scripts

```bash
npm run dev         # Start development server
npm run build       # Production build
npm run start       # Start production server
npm run lint        # Run ESLint
npm run test        # Run unit tests
npm run seed:owner  # Create/update owner account (requires env vars)
```

## Founder docs

| File | Purpose |
|------|---------|
| `docs/customer-validation.md` | Demo script and validation questions |
| `docs/pilot-outreach-messages.md` | Outreach templates |
| `docs/validation-tracker.md` | Track conversations and signals |

## Optional future features

The codebase includes hooks for Stripe billing, OpenAI summaries, and Resend email notifications. These are **not required** for the current MVP demo and can be enabled later when needed.
