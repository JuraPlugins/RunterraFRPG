import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { apiError } from "@/lib/http";

const schema = z.object({ displayName: z.string().trim().min(2).max(40).optional(), avatarUrl: z.string().max(1_500_000).nullable().optional() });

export async function PATCH(request: Request) {
  try {
    const user = await requireUser();
    const input = schema.parse(await request.json());
    const rows = await db()<Array<{ id: string; email: string; displayName: string; avatarUrl: string | null }>>`
      update users set
        display_name = coalesce(${input.displayName ?? null}, display_name),
        avatar_url = case when ${input.avatarUrl === undefined} then avatar_url else ${input.avatarUrl ?? null} end,
        updated_at = now()
      where id = ${user.id}
      returning id, email, display_name as "displayName", avatar_url as "avatarUrl"
    `;
    return Response.json({ user: rows[0] });
  } catch (error) { return apiError(error); }
}
