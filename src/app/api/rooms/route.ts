import { randomBytes, randomUUID } from "node:crypto";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { apiError } from "@/lib/http";

const schema = z.object({ name: z.string().trim().min(3, "Oda adı en az 3 karakter olmalı.").max(60) });

function inviteCode() {
  return randomBytes(7).toString("base64url").replace(/[-_]/g, "X").toUpperCase();
}

export async function GET() {
  try {
    const user = await requireUser();
    const rooms = await db()<Array<{ id: string; name: string; inviteCode: string; status: string; role: string; playerCount: number; updatedAt: string }>>`
      select r.id, r.name, r.invite_code as "inviteCode", r.status, m.role,
        (select count(*)::int from room_members x where x.room_id = r.id) as "playerCount",
        r.updated_at as "updatedAt"
      from room_members m join game_rooms r on r.id = m.room_id
      where m.user_id = ${user.id}
      order by r.updated_at desc
    `;
    return Response.json({ rooms });
  } catch (error) { return apiError(error); }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const input = schema.parse(await request.json());
    const roomId = randomUUID();
    const memberId = randomUUID();
    const code = inviteCode();
    await db().begin(async (sql) => {
      await sql`insert into game_rooms (id, owner_id, name, invite_code) values (${roomId}, ${user.id}, ${input.name}, ${code})`;
      await sql`insert into room_members (id, room_id, user_id, role, avatar_url) values (${memberId}, ${roomId}, ${user.id}, 'gm', ${user.avatarUrl})`;
    });
    return Response.json({ room: { id: roomId, name: input.name, inviteCode: code, role: "gm" } });
  } catch (error) { return apiError(error); }
}
