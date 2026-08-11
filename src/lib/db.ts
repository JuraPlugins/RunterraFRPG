import postgres, { type Sql } from "postgres";

let client: Sql | null = null;

const databaseVariables = [
  "DATABASE_URL",
  "POSTGRES_URL",
  "DATABSE_DATABASE_URL",
  "NEON_DATABASE_URL",
  "DATABASE_URL_UNPOOLED",
] as const;

export function databaseSource() {
  return databaseVariables.find((name) => Boolean(process.env[name])) ?? null;
}

function databaseUrl() {
  const source = databaseSource();
  return source ? process.env[source] : undefined;
}

export function databaseConfigured() {
  return Boolean(databaseUrl());
}

export function db(): Sql {
  const connectionString = databaseUrl();
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
