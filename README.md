# SiteAgentAI

**SiteAgentAI** is an AI Website Employee for small service businesses — HVAC, plumbing, landscaping, roofing, remodeling, and more.

It gives your website a floating assistant that captures visitor requests as leads, then shows business owners a dashboard with AI-style summaries and recommended follow-up actions.

This repository is the **MVP demo**: a polished front-end you can show to business owners. No database, authentication, or real AI backend yet.

## What's included

| Route | Description |
|-------|-------------|
| `/` | SaaS landing page with live lead-capture widget |
| `/admin` | Sample business-owner dashboard (hardcoded demo leads) |

**Widget demo flow:** Click **Talk to AI Employee** → fill in contact details → see a thank-you confirmation.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static demo data only (no backend)

## Getting started

**Requirements:** Node.js 18+

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page.

- Landing page: [http://localhost:3000](http://localhost:3000)
- Admin preview: [http://localhost:3000/admin](http://localhost:3000/admin)

## Scripts

```bash
npm run dev    # Start development server
npm run build  # Production build
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Deploy

The project is configured for [Vercel](https://vercel.com). Push to GitHub and connect the repo — no extra environment variables are required for the demo.
