import fs from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!connectionString) {
  console.error("DATABASE_URL bulunamadı. Önce Vercel/Neon ortam değişkenlerini .env.local dosyasına çek.");
  process.exit(1);
}

const sql = postgres(connectionString, { max: 1, prepare: false, ssl: connectionString.includes("localhost") ? false : "require" });
try {
  const schema = await fs.readFile(path.join(process.cwd(), "database", "schema.sql"), "utf8");
  await sql.unsafe(schema);
  console.log("Runeterra FRP hesap ve session tabloları hazır.");
} finally {
  await sql.end();
}
