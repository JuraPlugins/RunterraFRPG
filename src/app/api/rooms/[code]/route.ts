import { randomUUID } from "node:crypto";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { apiError } from "@/lib/http";

type JsonRecord = Record<string, unknown>;
type RoomRow = { id: string; name: string; inviteCode: string; status: string; ownerId: string };
type MemberRow = { id: string; userId: string; role: "gm" | "player"; displayName: string; accountAvatar: string | null; avatarUrl: string | null; characterData: JsonRecord; runtimeData: JsonRecord; lastSeen: string };

const joinSchema = z.object({
  character: z.record(z.string(), z.unknown()),
  runtime: z.record(z.string(), z.unknown()).nullable().default({}),
  avatarUrl: z.string().max(1_500_000).nullable().optional(),
});

async function roomByCode(code: string) {
  const rows = await db()<RoomRow[]>`select id, name, invite_code as "inviteCode", status, owner_id as "ownerId" from game_rooms where invite_code = ${code.toUpperCase()} limit 1`;
  if (!rows[0]) throw new Error("NOT_FOUND");
  return rows[0];
}

async function membership(roomId: string, userId: string) {
  const rows = await db()<Array<{ id: string; role: "gm" | "player" }>>`select id, role from room_members where room_id = ${roomId} and user_id = ${userId} limit 1`;
  return rows[0] ?? null;
}

async function assertGm(roomId: string, userId: string) {
  const member = await membership(roomId, userId);
  if (member?.role !== "gm") throw new Error("FORBIDDEN");
  return member;
}

function playerSummary(member: MemberRow, selfId: string) {
  if (member.userId === selfId) return member;
  const c = member.characterData ?? {};
  const r = member.runtimeData ?? {};
  return {
    ...member,
    characterData: { id: c.id, name: c.name, level: c.level, classId: c.classId, specialization: c.specialization },
    runtimeData: { currentHp: r.currentHp, maxHpValue: r.maxHpValue, tempHp: r.tempHp, rp: r.rp, resource: r.resource, gold: r.gold, conditions: r.conditions },
  };
}

export async function GET(_request: Request, { params }: { params: Promise<{ code: string }> }) {
  try {
    const user = await requireUser();
    const room = await roomByCode((await params).code);
    const member = await membership(room.id, user.id);
    if (!member) return Response.json({ room, joined: false, user });
    const sql = db();
    await sql`update room_members set last_seen = now() where id = ${member.id}`;
    const members = await sql<MemberRow[]>`
      select m.id, m.user_id as "userId", m.role, u.display_name as "displayName", u.avatar_url as "accountAvatar",
        m.avatar_url as "avatarUrl", m.character_data as "characterData", m.runtime_data as "runtimeData", m.last_seen as "lastSeen"
      from room_members m join users u on u.id = m.user_id where m.room_id = ${room.id} order by m.joined_at
    `;
    const npcs = await sql`select id, name, avatar_url as "avatarUrl", hp, max_hp as "maxHp", defense, attack, buffs, notes, visible, updated_at as "updatedAt" from room_npcs where room_id = ${room.id} ${member.role === "gm" ? sql`` : sql`and visible = true`} order by created_at`;
    const media = await sql`select id, url, title, created_at as "createdAt" from room_media where room_id = ${room.id} order by created_at desc limit 20`;
    return Response.json({ room, joined: true, role: member.role, user, members: member.role === "gm" ? members : members.map((entry) => playerSummary(entry, user.id)), npcs, media });
  } catch (error) { return apiError(error); }
}

export async function POST(request: Request, { params }: { params: Promise<{ code: string }> }) {
  try {
    const user = await requireUser();
    const room = await roomByCode((await params).code);
    if (room.status === "closed") return Response.json({ error: "Bu oda kapalı." }, { status: 409 });
    const input = joinSchema.parse(await request.json());
    const sql = db();
    const clientId = String(input.character.id || "");
    const name = String(input.character.name || "İsimsiz Maceracı");
    const existing = await sql<Array<{ id: string }>>`select id from characters where owner_id = ${user.id} and client_id = ${clientId} limit 1`;
    const characterId = existing[0]?.id ?? randomUUID();
    if (existing[0]) await sql`update characters set name=${name}, avatar_url=${input.avatarUrl ?? null}, character_data=${sql.json(input.character as any)}, runtime_data=${sql.json((input.runtime ?? {}) as any)}, updated_at=now() where id=${characterId}`;
    else await sql`insert into characters (id, owner_id, client_id, name, avatar_url, character_data, runtime_data) values (${characterId}, ${user.id}, ${clientId || null}, ${name}, ${input.avatarUrl ?? null}, ${sql.json(input.character as any)}, ${sql.json((input.runtime ?? {}) as any)})`;
    await sql`
      insert into room_members (id, room_id, user_id, role, character_id, character_data, runtime_data, avatar_url)
      values (${randomUUID()}, ${room.id}, ${user.id}, 'player', ${characterId}, ${sql.json(input.character as any)}, ${sql.json((input.runtime ?? {}) as any)}, ${input.avatarUrl ?? user.avatarUrl})
      on conflict (room_id, user_id) do update set character_id=excluded.character_id, character_data=excluded.character_data, runtime_data=excluded.runtime_data, avatar_url=excluded.avatar_url, last_seen=now()
    `;
    return Response.json({ ok: true });
  } catch (error) { return apiError(error); }
}

const actionSchema = z.object({ action: z.string(), payload: z.record(z.string(), z.unknown()).default({}) });

export async function PATCH(request: Request, { params }: { params: Promise<{ code: string }> }) {
  try {
    const user = await requireUser();
    const room = await roomByCode((await params).code);
    const { action, payload } = actionSchema.parse(await request.json());
    const sql = db();
    if (action === "sync-self") {
      const member = await membership(room.id, user.id); if (!member) throw new Error("FORBIDDEN");
      await sql`update room_members set character_data=${sql.json((payload.character ?? {}) as any)}, runtime_data=${sql.json((payload.runtime ?? {}) as any)}, avatar_url=coalesce(${payload.avatarUrl as string ?? null}, avatar_url), last_seen=now() where id=${member.id}`;
      return Response.json({ ok: true });
    }
    await assertGm(room.id, user.id);
    if (action === "update-player") {
      await sql`update room_members set character_data=${sql.json((payload.character ?? {}) as any)}, runtime_data=${sql.json((payload.runtime ?? {}) as any)}, avatar_url=coalesce(${payload.avatarUrl as string ?? null}, avatar_url), last_seen=now() where id=${String(payload.memberId)} and room_id=${room.id} and role='player'`;
    } else if (action === "npc-create") {
      const maxHp = Math.max(1, Number(payload.maxHp) || 10);
      await sql`insert into room_npcs (id, room_id, name, avatar_url, hp, max_hp, defense, attack, buffs, notes, visible) values (${randomUUID()}, ${room.id}, ${String(payload.name || "İsimsiz NPC")}, ${payload.avatarUrl as string ?? null}, ${maxHp}, ${maxHp}, ${Math.max(0, Number(payload.defense) || 10)}, ${String(payload.attack || "1d6")}, ${Array.isArray(payload.buffs) ? payload.buffs.map(String) : []}, ${String(payload.notes || "")}, ${Boolean(payload.visible)})`;
    } else if (action === "npc-update") {
      await sql`update room_npcs set name=coalesce(${payload.name as string ?? null},name), avatar_url=coalesce(${payload.avatarUrl as string ?? null},avatar_url), hp=coalesce(${payload.hp == null ? null : Number(payload.hp)},hp), max_hp=coalesce(${payload.maxHp == null ? null : Number(payload.maxHp)},max_hp), defense=coalesce(${payload.defense == null ? null : Number(payload.defense)},defense), attack=coalesce(${payload.attack as string ?? null},attack), buffs=coalesce(${Array.isArray(payload.buffs) ? payload.buffs.map(String) : null},buffs), notes=coalesce(${payload.notes as string ?? null},notes), visible=coalesce(${payload.visible == null ? null : Boolean(payload.visible)},visible), updated_at=now() where id=${String(payload.id)} and room_id=${room.id}`;
    } else if (action === "npc-delete") {
      await sql`delete from room_npcs where id=${String(payload.id)} and room_id=${room.id}`;
    } else if (action === "media-add") {
      await sql`insert into room_media (id, room_id, sender_id, url, title) values (${randomUUID()}, ${room.id}, ${user.id}, ${String(payload.url)}, ${String(payload.title || "GM Görseli")})`;
    } else if (action === "room-status") {
      const status = z.enum(["open", "active", "closed"]).parse(payload.status);
      await sql`update game_rooms set status=${status}, updated_at=now() where id=${room.id}`;
    } else return Response.json({ error: "Bilinmeyen oda işlemi." }, { status: 400 });
    await sql`update game_rooms set updated_at=now() where id=${room.id}`;
    return Response.json({ ok: true });
  } catch (error) { return apiError(error); }
}
