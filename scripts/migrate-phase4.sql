-- SiteAgentAI Phase 4 migration
-- Adds Stripe subscription fields to businesses

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS subscription_status TEXT NOT NULL DEFAULT 'active'
    CHECK (subscription_status IN ('inactive', 'active', 'trialing', 'past_due', 'canceled'));

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;

CREATE INDEX IF NOT EXISTS businesses_stripe_customer_idx
  ON businesses (stripe_customer_id);

-- Existing pilot accounts stay active by default.
UPDATE businesses
SET subscription_status = 'active'
WHERE subscription_status IS NULL OR subscription_status = 'inactive';
