import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";

export type UserRecord = {
  id: string;
  businessId: string;
  email: string;
  name: string;
  passwordHash: string;
};

type UserRow = {
  id: string;
  business_id: string;
  email: string;
  name: string;
  password_hash: string;
};

function mapRow(row: UserRow): UserRecord {
  return {
    id: row.id,
    businessId: row.business_id,
    email: row.email,
    name: row.name,
    passwordHash: row.password_hash,
  };
}

export async function getUserByEmail(
  email: string,
): Promise<UserRecord | null> {
  const sql = getDb();
  const rows = await sql<UserRow[]>`
    SELECT id, business_id, email, name, password_hash
    FROM users
    WHERE email = ${email.trim().toLowerCase()}
    LIMIT 1
  `;

  return rows[0] ? mapRow(rows[0]) : null;
}

export async function verifyUserCredentials(
  email: string,
  password: string,
): Promise<UserRecord | null> {
  const user = await getUserByEmail(email);
  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  return isValid ? user : null;
}

export async function createUser(input: {
  businessId: string;
  email: string;
  name: string;
  password: string;
}): Promise<UserRecord> {
  const sql = getDb();
  const passwordHash = await bcrypt.hash(input.password, 12);
  const rows = await sql<UserRow[]>`
    INSERT INTO users (business_id, email, name, password_hash)
    VALUES (
      ${input.businessId},
      ${input.email.trim().toLowerCase()},
      ${input.name.trim()},
      ${passwordHash}
    )
    RETURNING id, business_id, email, name, password_hash
  `;

  return mapRow(rows[0]);
}

export async function createBusiness(input: {
  name: string;
  slug: string;
  widgetKey: string;
  notificationEmail?: string | null;
}): Promise<string> {
  const sql = getDb();
  const rows = await sql<{ id: string }[]>`
    INSERT INTO businesses (name, slug, widget_key, notification_email)
    VALUES (
      ${input.name.trim()},
      ${input.slug.trim().toLowerCase()},
      ${input.widgetKey},
      ${input.notificationEmail?.trim() ?? null}
    )
    RETURNING id
  `;

  return rows[0].id;
}
