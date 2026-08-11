import { createHash, randomBytes, randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { compare, hash } from "bcryptjs";
import { db, databaseConfigured } from "@/lib/db";

const COOKIE_NAME = "rfrp_session";
const SESSION_AGE = 60 * 60 * 24 * 30;

export type AuthUser = { id: string; email: string; displayName: string; avatarUrl: string | null };

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function passwordHash(password: string) {
  return hash(password, 12);
}

export async function passwordMatches(password: string, passwordHashValue: string) {
  return compare(password, passwordHashValue);
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_AGE * 1000);
  await db()`insert into auth_sessions (id, user_id, token_hash, expires_at) values (${randomUUID()}, ${userId}, ${tokenHash(token)}, ${expiresAt})`;
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_AGE,
    priority: "high",
  });
}

export async function destroySession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (token && databaseConfigured()) await db()`delete from auth_sessions where token_hash = ${tokenHash(token)}`;
  store.delete(COOKIE_NAME);
}

export async function currentUser(): Promise<AuthUser | null> {
  if (!databaseConfigured()) return null;
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  const rows = await db()<AuthUser[]>`
    select u.id, u.email, u.display_name as "displayName", u.avatar_url as "avatarUrl"
    from auth_sessions s join users u on u.id = s.user_id
    where s.token_hash = ${tokenHash(token)} and s.expires_at > now()
    limit 1
  `;
  return rows[0] ?? null;
}

export async function requireUser() {
  const user = await currentUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}
