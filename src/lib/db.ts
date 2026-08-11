import postgres, { type Sql } from "postgres";

let client: Sql | null = null;

export function databaseConfigured() {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

export function db(): Sql {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) throw new Error("DATABASE_NOT_CONFIGURED");
  if (!client) {
    client = postgres(connectionString, {
      max: 5,
      idle_timeout: 20,
      connect_timeout: 15,
      prepare: false,
      ssl: connectionString.includes("localhost") ? false : "require",
    });
  }
  return client;
}

export function databaseMessage(error: unknown) {
  if (error instanceof Error && error.message === "DATABASE_NOT_CONFIGURED") {
    return "Veritabanı henüz bağlanmadı. Vercel Marketplace üzerinden Neon ekleyip DATABASE_URL değişkenini tanımla.";
  }
  return "Sunucu veritabanı işlemi tamamlanamadı.";
}
