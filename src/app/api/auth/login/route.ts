import { z } from "zod";
import { createSession, passwordMatches } from "@/lib/auth";
import { db } from "@/lib/db";
import { apiError } from "@/lib/http";

const schema = z.object({ email: z.string().trim().email().transform((value) => value.toLowerCase()), password: z.string().min(1) });

export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    const rows = await db()<Array<{ id: string; passwordHash: string }>>`select id, password_hash as "passwordHash" from users where email = ${input.email} limit 1`;
    const user = rows[0];
    if (!user || !(await passwordMatches(input.password, user.passwordHash))) return Response.json({ error: "E-posta veya parola hatalı." }, { status: 401 });
    await createSession(user.id);
    return Response.json({ ok: true });
  } catch (error) { return apiError(error); }
}
