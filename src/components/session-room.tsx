"use client";

import Link from "next/link";
import { Camera, Coins, Copy, DoorOpen, Eye, EyeOff, Heart, ImagePlus, Minus, Plus, RefreshCw, Shield, Sparkles, Swords, Trash2, UserRound, Users } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { activateCharacter, readCharacterSlots, type CharacterSlot } from "@/lib/character-storage";

type Json = Record<string, any>;
type User = { id: string; displayName: string; avatarUrl: string | null };
type Member = { id: string; userId: string; role: "gm" | "player"; displayName: string; accountAvatar: string | null; avatarUrl: string | null; characterData: Json; runtimeData: Json; lastSeen: string };
type Npc = { id: string; name: string; avatarUrl: string | null; hp: number; maxHp: number; defense: number; attack: string; buffs: string[]; notes: string; visible: boolean };
type Media = { id: string; url: string; title: string; createdAt: string };
type RoomState = { room: { id: string; name: string; inviteCode: string; status: string }; joined: boolean; role?: "gm" | "player"; user: User; members?: Member[]; npcs?: Npc[]; media?: Media[] };
type ItemOption = { id: string; name: string };

async function requestJson(url: string, options?: RequestInit) {
  const response = await fetch(url, { ...options, headers: options?.body && typeof options.body === "string" ? { "Content-Type": "application/json", ...options.headers } : options?.headers, cache: "no-store" });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || "İşlem tamamlanamadı.");
  return body;
}

async function uploadImage(file: File, purpose: string) {
  const form = new FormData(); form.set("file", file); form.set("purpose", purpose);
  return requestJson("/api/upload", { method: "POST", body: form });
}

function Avatar({ src, name }: { src?: string | null; name: string }) {
  return <span className="session-avatar">{src ? <img src={src} alt={`${name} avatarı`} /> : <UserRound />}</span>;
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return <span className="session-stat">{icon}<small>{label}</small><b>{value}</b></span>;
}

export function SessionRoom({ code, items }: { code: string; items: ItemOption[] }) {
  const [state, setState] = useState<RoomState | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState<CharacterSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [joinAvatar, setJoinAvatar] = useState<string | null>(null);

  const load = useCallback(async (quiet = false) => {
    try { const next = await requestJson(`/api/rooms/${code}`); setState(next); setError(""); }
    catch (cause) { if (!quiet) setError(cause instanceof Error ? cause.message : "Oda açılamadı."); }
    finally { setLoading(false); }
  }, [code]);

  useEffect(() => { setSlots(readCharacterSlots()); load(); }, [load]);
  useEffect(() => { if (!state?.joined) return; const timer = window.setInterval(() => load(true), 2500); return () => window.clearInterval(timer); }, [load, state?.joined]);

  async function joinRoom() {
    const slot = slots.find((entry) => entry.id === selectedSlot); if (!slot) return;
    try {
      await requestJson(`/api/rooms/${code}`, { method: "POST", body: JSON.stringify({ character: slot.character, runtime: slot.runtime ?? {}, avatarUrl: joinAvatar }) });
      activateCharacter(slot.id); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Odaya katılınamadı."); }
  }

  if (loading) return <main className="session-loading"><RefreshCw className="spin" /><p>Oda hazırlanıyor…</p></main>;
  if (!state) return <main className="session-loading"><Shield /><h1>Oda açılamadı</h1><p>{error}</p><Link className="button button-primary" href={`/hesap?next=/oda/${code}`}>Giriş yap</Link></main>;
  if (!state.joined) return <main className="session-join shell"><header><p className="eyebrow">Özel session daveti</p><h1>{state.room.name}</h1><p>Odaya katılacak karakterini ve masa avatarını seç.</p></header><section><div className="join-avatar"><Avatar src={joinAvatar || state.user.avatarUrl} name={state.user.displayName} /><label><Camera /> Avatar yükle<input hidden type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={async (event) => { const file = event.target.files?.[0]; if (file) try { setJoinAvatar((await uploadImage(file, "character-avatars")).url); } catch (cause) { setError((cause as Error).message); } }} /></label></div><div className="join-character-grid">{slots.map((slot) => { const c = slot.character as Json; const r = (slot.runtime ?? {}) as Json; return <button key={slot.id} className={selectedSlot === slot.id ? "active" : ""} onClick={() => setSelectedSlot(slot.id)}><Shield /><span><b>{slot.name}</b><small>Seviye {c.level ?? 1} · {c.classId || "Sınıfsız"}</small><em>{r.currentHp ?? "—"}/{r.maxHpValue ?? "—"} CP · {r.gold ?? 15} Altın</em></span></button>; })}</div>{!slots.length && <div className="join-empty"><p>Bu cihazda kayıtlı karakter bulunamadı.</p><Link href="/karakter?new=1">Karakter oluştur</Link></div>}{error && <p className="form-error">{error}</p>}<button className="button button-primary" disabled={!selectedSlot} onClick={joinRoom}><DoorOpen /> Odaya katıl</button></section></main>;
  return state.role === "gm" ? <GmScreen state={state} code={code} items={items} reload={load} /> : <PlayerScreen state={state} code={code} reload={load} />;
}

function GmScreen({ state, code, items, reload }: { state: RoomState; code: string; items: ItemOption[]; reload: () => Promise<void> }) {
  const players = (state.members ?? []).filter((entry) => entry.role === "player");
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [character, setCharacter] = useState<Json>({});
  const [runtime, setRuntime] = useState<Json>({});
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [itemId, setItemId] = useState(items[0]?.id ?? "");
  const [message, setMessage] = useState("");
  const mediaInput = useRef<HTMLInputElement>(null);
  const selected = players.find((entry) => entry.id === selectedId);

  function openPlayer(member: Member) { setSelectedId(member.id); setCharacter(structuredClone(member.characterData ?? {})); setRuntime(structuredClone(member.runtimeData ?? {})); setAvatarUrl(member.avatarUrl); }
  async function action(actionName: string, payload: Json) { await requestJson(`/api/rooms/${code}`, { method: "PATCH", body: JSON.stringify({ action: actionName, payload }) }); await reload(); }
  function setRun(key: string, value: any) { setRuntime((current) => ({ ...current, [key]: value })); }
  function addItem() { if (!itemId) return; const inventory = [...(runtime.inventory ?? [])]; const found = inventory.find((entry: Json) => entry.id === itemId); if (found) found.quantity = (found.quantity ?? 1) + 1; else inventory.push({ id: itemId, quantity: 1 }); setRun("inventory", inventory); }

  return <main className="session-screen"><header className="session-topbar"><div><p className="eyebrow">GM Screen · {state.room.status}</p><h1>{state.room.name}</h1></div><div className="invite-box"><span>{origin}/oda/{state.room.inviteCode}</span><button onClick={() => navigator.clipboard.writeText(`${origin}/oda/${state.room.inviteCode}`)}><Copy /> Daveti kopyala</button></div><Link href="/hesap">Hesap</Link></header><div className="gm-layout"><section className="gm-main"><div className="session-section-heading"><div><p className="eyebrow">Canlı grup</p><h2>Oyuncular</h2></div><span>{players.length} oyuncu</span></div><div className="player-card-grid">{players.map((member) => { const c = member.characterData ?? {}; const r = member.runtimeData ?? {}; return <button key={member.id} onClick={() => openPlayer(member)} className={selectedId === member.id ? "active" : ""}><Avatar src={member.avatarUrl || member.accountAvatar} name={String(c.name || member.displayName)} /><div className="player-card-name"><small>{member.displayName}</small><h3>{c.name || "Karakter seçilmedi"}</h3><p>Sv. {c.level ?? 1} · {c.classId || "—"}</p></div><div className="player-preview-stats"><Stat icon={<Heart />} label="CP" value={`${r.currentHp ?? 0}/${r.maxHpValue ?? 0}`} /><Stat icon={<Swords />} label="Kaynak" value={r.resource ?? 0} /><Stat icon={<Sparkles />} label="Rün" value={r.rp ?? 0} /><Stat icon={<Coins />} label="Altın" value={r.gold ?? 0} /></div></button>; })}{!players.length && <div className="gm-empty"><Users /><p>Davet bağlantısını oyuncularla paylaş.</p></div>}</div><NpcManager npcs={state.npcs ?? []} action={action} /><section className="media-manager"><div className="session-section-heading"><div><p className="eyebrow">Sahne paylaşımı</p><h2>Oyunculara görsel gönder</h2></div><button className="button button-ghost" onClick={() => mediaInput.current?.click()}><ImagePlus /> Görsel seç</button><input ref={mediaInput} hidden type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={async (event) => { const file = event.target.files?.[0]; if (!file) return; try { const upload = await uploadImage(file, "room-media"); await action("media-add", { url: upload.url, title: file.name }); } catch (cause) { setMessage((cause as Error).message); } }} /></div><div className="media-strip">{(state.media ?? []).map((media) => <figure key={media.id}><img src={media.url} alt={media.title} /><figcaption>{media.title}</figcaption></figure>)}</div>{message && <p className="form-error">{message}</p>}</section></section><aside className={`player-editor ${selected ? "open" : ""}`}>{selected ? <><header><div><p className="eyebrow">Tam karakter kontrolü</p><h2>{character.name || selected.displayName}</h2></div><button onClick={() => setSelectedId(null)}>×</button></header><div className="editor-avatar"><Avatar src={avatarUrl || selected.accountAvatar} name={String(character.name)} /><label><Camera /> Değiştir<input hidden type="file" accept="image/png,image/jpeg,image/webp" onChange={async (event) => { const file = event.target.files?.[0]; if (file) setAvatarUrl((await uploadImage(file, "character-avatars")).url); }} /></label></div><label className="editor-field"><span>Karakter adı</span><input value={character.name ?? ""} onChange={(event) => setCharacter({ ...character, name: event.target.value })} /></label><div className="editor-number-grid">{[["currentHp","Can"],["maxHpValue","Maks. Can"],["tempHp","Geçici Can"],["resource","Efor/Kaynak"],["rp","Rün"],["gold","Altın"]].map(([key,label]) => <label key={key}><span>{label}</span><input type="number" value={runtime[key] ?? 0} onChange={(event) => setRun(key, Number(event.target.value))} /></label>)}</div><div className="editor-inventory"><h3>Envanter</h3><div><select value={itemId} onChange={(event) => setItemId(event.target.value)}>{items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><button onClick={addItem}><Plus /> Ekle</button></div>{(runtime.inventory ?? []).map((entry: Json, index: number) => <p key={`${entry.id}-${index}`}><span>{items.find((item) => item.id === entry.id)?.name || entry.id}</span><b>×{entry.quantity ?? 1}</b><button onClick={() => setRun("inventory", runtime.inventory.filter((_: Json, itemIndex: number) => itemIndex !== index))}><Trash2 /></button></p>)}</div><details className="advanced-json"><summary>Gelişmiş karakter verisi</summary><textarea value={JSON.stringify(character, null, 2)} onChange={(event) => { try { setCharacter(JSON.parse(event.target.value)); } catch {} }} /></details><button className="button button-primary save-player" onClick={async () => { await action("update-player", { memberId: selected.id, character, runtime, avatarUrl }); setSelectedId(null); }}>Değişiklikleri kaydet</button></> : <div className="editor-placeholder"><Shield /><h2>Oyuncu seç</h2><p>Karakter kartına tıklayarak can, kaynak, Rün, altın ve envanteri düzenle.</p></div>}</aside></div></main>;
}

function NpcManager({ npcs, action }: { npcs: Npc[]; action: (name: string, payload: Json) => Promise<void> }) {
  const [form, setForm] = useState<Json>({ name: "", maxHp: 10, defense: 10, attack: "1d6", buffs: "", notes: "", visible: false, avatarUrl: null });
  return <section className="npc-manager"><div className="session-section-heading"><div><p className="eyebrow">Karşılaşma araçları</p><h2>NPC ve yaratıklar</h2></div></div><form onSubmit={async (event) => { event.preventDefault(); await action("npc-create", { ...form, buffs: String(form.buffs).split(",").map((x) => x.trim()).filter(Boolean) }); setForm({ name: "", maxHp: 10, defense: 10, attack: "1d6", buffs: "", notes: "", visible: false, avatarUrl: null }); }}><label className="npc-avatar-input"><Avatar src={form.avatarUrl} name="NPC" /><span><Camera /> Avatar<input hidden type="file" accept="image/png,image/jpeg,image/webp" onChange={async (event) => { const file = event.target.files?.[0]; if (file) setForm({ ...form, avatarUrl: (await uploadImage(file, "npc-avatars")).url }); }} /></span></label><input placeholder="NPC adı" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /><input type="number" min={1} placeholder="Can" value={form.maxHp} onChange={(event) => setForm({ ...form, maxHp: Number(event.target.value) })} /><input type="number" min={0} placeholder="Savunma" value={form.defense} onChange={(event) => setForm({ ...form, defense: Number(event.target.value) })} /><input placeholder="Saldırı: 1d6+2" value={form.attack} onChange={(event) => setForm({ ...form, attack: event.target.value })} /><input placeholder="Buff'lar, virgülle" value={form.buffs} onChange={(event) => setForm({ ...form, buffs: event.target.value })} /><label className="npc-visible"><input type="checkbox" checked={form.visible} onChange={(event) => setForm({ ...form, visible: event.target.checked })} /> Oyunculara göster</label><button className="button button-primary"><Plus /> NPC oluştur</button></form><div className="npc-card-grid">{npcs.map((npc) => <article key={npc.id}><Avatar src={npc.avatarUrl} name={npc.name} /><div><h3>{npc.name}</h3><p>SS {npc.defense} · Saldırı {npc.attack}</p><div className="npc-hp"><button onClick={() => action("npc-update", { id: npc.id, hp: Math.max(0, npc.hp - 1) })}><Minus /></button><b>{npc.hp}/{npc.maxHp} CP</b><button onClick={() => action("npc-update", { id: npc.id, hp: Math.min(npc.maxHp, npc.hp + 1) })}><Plus /></button></div></div><button className={npc.visible ? "visible" : ""} title="Oyuncu görünürlüğü" onClick={() => action("npc-update", { id: npc.id, visible: !npc.visible })}>{npc.visible ? <Eye /> : <EyeOff />}</button><button className="danger" title="NPC sil" onClick={() => action("npc-delete", { id: npc.id })}><Trash2 /></button></article>)}</div></section>;
}

function PlayerScreen({ state, code, reload }: { state: RoomState; code: string; reload: () => Promise<void> }) {
  const self = (state.members ?? []).find((entry) => entry.userId === state.user.id);
  const r = self?.runtimeData ?? {};
  async function adjust(key: string, delta: number, max = Infinity) { if (!self) return; const runtime = { ...r, [key]: Math.max(0, Math.min(max, Number(r[key] ?? 0) + delta)) }; await requestJson(`/api/rooms/${code}`, { method: "PATCH", body: JSON.stringify({ action: "sync-self", payload: { character: self.characterData, runtime, avatarUrl: self.avatarUrl } }) }); await reload(); }
  return <main className="session-screen player-session"><header className="session-topbar"><div><p className="eyebrow">Oyuncu ekranı · {state.room.status}</p><h1>{state.room.name}</h1></div><Link className="button button-primary" href={`/karakter/masa?room=${code}`}>Karakter masasını aç</Link></header><section className="player-self-card"><Avatar src={self?.avatarUrl || self?.accountAvatar} name={String(self?.characterData?.name || state.user.displayName)} /><div><small>{state.user.displayName}</small><h2>{self?.characterData?.name}</h2><p>Seviye {self?.characterData?.level ?? 1} · {self?.characterData?.classId || "—"}</p></div><div className="live-resource-grid">{[["currentHp","Can",Heart,r.maxHpValue],["resource","Kaynak",Swords,Infinity],["rp","Rün",Sparkles,5],["gold","Altın",Coins,Infinity]].map(([key,label,Icon,max]) => <div key={String(key)}><Icon /><small>{String(label)}</small><button onClick={() => adjust(String(key),-1,Number(max))}><Minus /></button><b>{r[String(key)] ?? 0}{key === "currentHp" ? `/${r.maxHpValue ?? 0}` : ""}</b><button onClick={() => adjust(String(key),1,Number(max))}><Plus /></button></div>)}</div></section><section className="player-live-grid"><div><div className="session-section-heading"><div><p className="eyebrow">GM yayını</p><h2>Aktif NPC'ler</h2></div></div><div className="visible-npcs">{(state.npcs ?? []).map((npc) => <article key={npc.id}><Avatar src={npc.avatarUrl} name={npc.name} /><h3>{npc.name}</h3><p><Heart /> {npc.hp}/{npc.maxHp} · SS {npc.defense}</p><b><Swords /> {npc.attack}</b>{npc.buffs.length > 0 && <small>{npc.buffs.join(" · ")}</small>}</article>)}{!state.npcs?.length && <p className="muted-empty">GM henüz görünür bir NPC paylaşmadı.</p>}</div></div><div><div className="session-section-heading"><div><p className="eyebrow">Sahne</p><h2>Paylaşılan görseller</h2></div></div><div className="player-media">{(state.media ?? []).map((media) => <figure key={media.id}><img src={media.url} alt={media.title} /><figcaption>{media.title}</figcaption></figure>)}{!state.media?.length && <p className="muted-empty">GM henüz bir görsel paylaşmadı.</p>}</div></div></section></main>;
}
