-- SiteAgentAI full schema (Phase 1 + Phase 3)
-- Run once against your Postgres database

CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  widget_key TEXT NOT NULL UNIQUE,
  notification_email TEXT,
  subscription_status TEXT NOT NULL DEFAULT 'active'
    CHECK (subscription_status IN ('inactive', 'active', 'trialing', 'past_due', 'canceled')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_needed TEXT NOT NULL,
  urgency TEXT NOT NULL CHECK (urgency IN ('Low', 'Medium', 'High')),
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Qualified', 'Closed')),
  ai_summary TEXT NOT NULL,
  recommended_action TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS leads_business_created_idx ON leads (business_id, created_at DESC);
CREATE INDEX IF NOT EXISTS users_business_id_idx ON users (business_id);
CREATE INDEX IF NOT EXISTS businesses_stripe_customer_idx ON businesses (stripe_customer_id);
