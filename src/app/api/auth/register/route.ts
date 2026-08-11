import { randomUUID } from "node:crypto";
import { z } from "zod";
import { createSession, passwordHash } from "@/lib/auth";
import { db } from "@/lib/db";
import { apiError } from "@/lib/http";

const schema = z.object({
  displayName: z.string().trim().min(2, "Görünen ad en az 2 karakter olmalı.").max(40),
  email: z.string().trim().email("Geçerli bir e-posta yaz.").transform((value) => value.toLowerCase()),
  password: z.string().min(8, "Parola en az 8 karakter olmalı.").max(128),
});

export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    const id = randomUUID();
    await db()`insert into users (id, email, password_hash, display_name) values (${id}, ${input.email}, ${await passwordHash(input.password)}, ${input.displayName})`;
    await createSession(id);
    return Response.json({ ok: true });
  } catch (error) { return apiError(error); }
}
