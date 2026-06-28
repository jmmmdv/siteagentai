import bcrypt from "bcryptjs";
import postgres from "postgres";
import { randomUUID } from "crypto";

const {
  DATABASE_URL,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_NAME = "Business Owner",
  BUSINESS_NAME = "Demo Business",
  BUSINESS_SLUG = "demo",
  BUSINESS_NOTIFICATION_EMAIL,
} = process.env;

if (!DATABASE_URL || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error(
    "Required env vars: DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD",
  );
  process.exit(1);
}

const sql = postgres(DATABASE_URL, {
  ssl: process.env.DATABASE_SSL === "false" ? false : "require",
});

const widgetKey = process.env.DEFAULT_BUSINESS_WIDGET_KEY ?? randomUUID();
const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

try {
  const businesses = await sql`
    INSERT INTO businesses (name, slug, widget_key, notification_email)
    VALUES (
      ${BUSINESS_NAME},
      ${BUSINESS_SLUG},
      ${widgetKey},
      ${BUSINESS_NOTIFICATION_EMAIL ?? null}
    )
    ON CONFLICT (slug) DO UPDATE
    SET
      name = EXCLUDED.name,
      notification_email = COALESCE(EXCLUDED.notification_email, businesses.notification_email)
    RETURNING id, widget_key
  `;

  const businessId = businesses[0].id;
  const savedWidgetKey = businesses[0].widget_key;

  await sql`
    INSERT INTO users (business_id, email, name, password_hash)
    VALUES (
      ${businessId},
      ${ADMIN_EMAIL.trim().toLowerCase()},
      ${ADMIN_NAME},
      ${passwordHash}
    )
    ON CONFLICT (email) DO UPDATE
    SET
      name = EXCLUDED.name,
      password_hash = EXCLUDED.password_hash,
      business_id = EXCLUDED.business_id
  `;

  console.log("Owner account ready.");
  console.log(`Business: ${BUSINESS_NAME}`);
  console.log(`Login email: ${ADMIN_EMAIL}`);
  console.log(`Widget key: ${savedWidgetKey}`);
  console.log(`Widget URL path: /widget/${savedWidgetKey}`);
  console.log("");
  console.log("Set DEFAULT_BUSINESS_WIDGET_KEY in Vercel to this widget key for the homepage demo.");
} catch (error) {
  console.error("Seed failed:", error);
  process.exit(1);
} finally {
  await sql.end();
}
