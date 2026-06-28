export type SubscriptionStatus =
  | "inactive"
  | "active"
  | "trialing"
  | "past_due"
  | "canceled";

export type Business = {
  id: string;
  name: string;
  slug: string;
  widgetKey: string;
  notificationEmail: string | null;
  subscriptionStatus: SubscriptionStatus;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
};

type BusinessRow = {
  id: string;
  name: string;
  slug: string;
  widget_key: string;
  notification_email: string | null;
  subscription_status: SubscriptionStatus;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
};

function mapRow(row: BusinessRow): Business {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    widgetKey: row.widget_key,
    notificationEmail: row.notification_email,
    subscriptionStatus: row.subscription_status,
    stripeCustomerId: row.stripe_customer_id,
    stripeSubscriptionId: row.stripe_subscription_id,
  };
}

export async function getBusinessByWidgetKey(
  widgetKey: string,
): Promise<Business | null> {
  const { getDb } = await import("@/lib/db");
  const sql = getDb();
  const rows = await sql<BusinessRow[]>`
    SELECT
      id,
      name,
      slug,
      widget_key,
      notification_email,
      subscription_status,
      stripe_customer_id,
      stripe_subscription_id
    FROM businesses
    WHERE widget_key = ${widgetKey}
    LIMIT 1
  `;

  return rows[0] ? mapRow(rows[0]) : null;
}

export async function getBusinessById(id: string): Promise<Business | null> {
  const { getDb } = await import("@/lib/db");
  const sql = getDb();
  const rows = await sql<BusinessRow[]>`
    SELECT
      id,
      name,
      slug,
      widget_key,
      notification_email,
      subscription_status,
      stripe_customer_id,
      stripe_subscription_id
    FROM businesses
    WHERE id = ${id}
    LIMIT 1
  `;

  return rows[0] ? mapRow(rows[0]) : null;
}

export async function getDefaultBusiness(): Promise<Business | null> {
  const envKey = process.env.DEFAULT_BUSINESS_WIDGET_KEY?.trim();
  if (envKey) {
    return getBusinessByWidgetKey(envKey);
  }

  const { getDb } = await import("@/lib/db");
  const sql = getDb();
  const rows = await sql<BusinessRow[]>`
    SELECT
      id,
      name,
      slug,
      widget_key,
      notification_email,
      subscription_status,
      stripe_customer_id,
      stripe_subscription_id
    FROM businesses
    WHERE slug = 'demo'
    LIMIT 1
  `;

  if (rows[0]) {
    return mapRow(rows[0]);
  }

  const fallback = await sql<BusinessRow[]>`
    SELECT
      id,
      name,
      slug,
      widget_key,
      notification_email,
      subscription_status,
      stripe_customer_id,
      stripe_subscription_id
    FROM businesses
    ORDER BY created_at ASC
    LIMIT 1
  `;

  return fallback[0] ? mapRow(fallback[0]) : null;
}

export async function updateBusinessSubscription(input: {
  businessId: string;
  subscriptionStatus: SubscriptionStatus;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
}): Promise<void> {
  const { getDb } = await import("@/lib/db");
  const sql = getDb();

  await sql`
    UPDATE businesses
    SET
      subscription_status = ${input.subscriptionStatus},
      stripe_customer_id = COALESCE(${input.stripeCustomerId ?? null}, stripe_customer_id),
      stripe_subscription_id = COALESCE(${input.stripeSubscriptionId ?? null}, stripe_subscription_id)
    WHERE id = ${input.businessId}
  `;
}

export function getAppUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
