"use client";

import Link from "next/link";
import { Camera, Copy, DoorOpen, LogIn, LogOut, Plus, Shield, UserRound } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type User = { id: string; email: string; displayName: string; avatarUrl: string | null };
type Room = { id: string; name: string; inviteCode: string; status: string; role: string; playerCount: number };

async function jsonRequest(url: string, options?: RequestInit) {
  const response = await fetch(url, { ...options, headers: { "Content-Type": "application/json", ...options?.headers } });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || "İşlem tamamlanamadı.");
  return body;
}

export function AccountHub({ nextPath = "" }: { nextPath?: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [configured, setConfigured] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const avatarInput = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const me = await jsonRequest("/api/auth/me");
    setUser(me.user); setConfigured(me.configured);
    if (me.user) setRooms((await jsonRequest("/api/rooms")).rooms);
  }, []);

  useEffect(() => { load().catch((cause) => setError(cause.message)); }, [load]);

  async function authenticate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      await jsonRequest(`/api/auth/${mode === "login" ? "login" : "register"}`, { method: "POST", body: JSON.stringify(data) });
      if (nextPath) { window.location.href = nextPath; return; }
      await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Giriş başarısız."); }
    finally { setBusy(false); }
  }

  async function uploadAvatar(file?: File) {
    if (!file) return; setBusy(true); setError("");
    try {
      const form = new FormData(); form.set("file", file); form.set("purpose", "avatars");
      const response = await fetch("/api/upload", { method: "POST", body: form }); const body = await response.json();
      if (!response.ok) throw new Error(body.error);
      const result = await jsonRequest("/api/account", { method: "PATCH", body: JSON.stringify({ avatarUrl: body.url }) });
      setUser(result.user);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Avatar yüklenemedi."); }
    finally { setBusy(false); if (avatarInput.current) avatarInput.current.value = ""; }
  }

  async function createRoom(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const name = String(new FormData(event.currentTarget).get("name") || "");
      const result = await jsonRequest("/api/rooms", { method: "POST", body: JSON.stringify({ name }) });
      window.location.href = `/oda/${result.room.inviteCode}`;
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Oda kurulamadı."); }
    finally { setBusy(false); }
  }

  if (!configured) return <main className="account-shell shell"><section className="setup-card"><Shield size={42} /><p className="eyebrow">Kurulum gerekli</p><h1>Vercel veritabanını bağla</h1><p>Vercel Marketplace’ten Neon Postgres ekle, ardından <code>database/schema.sql</code> dosyasını çalıştır. Avatarlar için ayrıca Vercel Blob oluştur.</p></section></main>;

  if (!user) return <main className="account-shell shell"><section className="auth-card"><div className="auth-sigil"><UserRound /></div><p className="eyebrow">Runeterra hesabı</p><h1>{mode === "login" ? "Masaya geri dön" : "Yeni hesap oluştur"}</h1><p>Karakterlerini odalara taşı, GM davetlerini aç ve masa durumunu cihazlar arasında koru.</p><form onSubmit={authenticate}>{mode === "register" && <label><span>Görünen ad</span><input name="displayName" required minLength={2} autoComplete="name" /></label>}<label><span>E-posta</span><input name="email" type="email" required autoComplete="email" /></label><label><span>Parola</span><input name="password" type="password" required minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} /></label>{error && <p className="form-error">{error}</p>}<button className="button button-primary" disabled={busy}><LogIn size={16} /> {busy ? "Bekle…" : mode === "login" ? "Giriş yap" : "Hesap oluştur"}</button></form><button className="auth-switch" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>{mode === "login" ? "Hesabın yok mu? Kayıt ol" : "Zaten hesabın var mı? Giriş yap"}</button></section></main>;

  return <main className="account-shell shell"><header className="account-header"><div className="profile-avatar">{user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : <UserRound />}<button onClick={() => avatarInput.current?.click()} title="Avatar değiştir"><Camera /></button><input ref={avatarInput} hidden type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(event) => uploadAvatar(event.target.files?.[0])} /></div><div><p className="eyebrow">Hesap merkezi</p><h1>{user.displayName}</h1><p>{user.email}</p></div><button className="button button-ghost" onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); setUser(null); setRooms([]); }}><LogOut size={15} /> Çıkış</button></header>{error && <p className="form-error account-error">{error}</p>}<div className="account-grid"><section className="room-create-card"><p className="eyebrow">GM olarak</p><h2>Yeni session odası</h2><p>Özel davet bağlantısı üret; oyuncular hesapları ve karakterleriyle katılsın.</p><form onSubmit={createRoom}><input name="name" placeholder="Örn. Gölge Adalar — 1. Oturum" minLength={3} required /><button className="button button-primary" disabled={busy}><Plus size={16} /> Oda kur</button></form></section><section className="account-roster"><header><div><p className="eyebrow">Session arşivi</p><h2>Odalarım</h2></div><Link href="/karakterler">Karakterlerim</Link></header>{rooms.length ? rooms.map((room) => <article key={room.id}><span className={`room-role ${room.role}`}>{room.role === "gm" ? "GM" : "Oyuncu"}</span><div><h3>{room.name}</h3><p>{room.playerCount} katılımcı · {room.status}</p></div><button title="Davet bağlantısını kopyala" onClick={() => navigator.clipboard.writeText(`${location.origin}/oda/${room.inviteCode}`)}><Copy /></button><Link href={`/oda/${room.inviteCode}`}><DoorOpen /> Aç</Link></article>) : <div className="account-empty"><DoorOpen /><p>Henüz katıldığın bir oda yok.</p></div>}</section></div></main>;
}
