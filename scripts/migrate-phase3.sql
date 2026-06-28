-- SiteAgentAI Phase 3 migration
-- Run if you already have Phase 1/2 leads table without multi-tenant support

CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  widget_key TEXT NOT NULL UNIQUE,
  notification_email TEXT,
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

ALTER TABLE leads ADD COLUMN IF NOT EXISTS business_id UUID REFERENCES businesses(id) ON DELETE CASCADE;

INSERT INTO businesses (name, slug, widget_key, notification_email)
SELECT 'Demo Business', 'demo', 'demo-' || replace(gen_random_uuid()::text, '-', ''), NULL
WHERE NOT EXISTS (SELECT 1 FROM businesses WHERE slug = 'demo');

UPDATE leads
SET business_id = (SELECT id FROM businesses WHERE slug = 'demo' LIMIT 1)
WHERE business_id IS NULL;

ALTER TABLE leads ALTER COLUMN business_id SET NOT NULL;

CREATE INDEX IF NOT EXISTS leads_business_created_idx ON leads (business_id, created_at DESC);
CREATE INDEX IF NOT EXISTS users_business_id_idx ON users (business_id);
