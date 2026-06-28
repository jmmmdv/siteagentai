import postgres from "postgres";

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

let sql: ReturnType<typeof postgres> | null = null;

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!sql) {
    sql = postgres(process.env.DATABASE_URL, {
      ssl: process.env.DATABASE_SSL === "false" ? false : "require",
      max: 1,
    });
  }

  return sql;
}
