"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { BookOpenText, Search, Shield, Sparkles, X, Zap } from "lucide-react";
import type { AbilityEntry } from "@/lib/abilities";

const PAGE_SIZE = 36;
type ModeFilter = "all" | AbilityEntry["mode"];

function costBadge(ability: AbilityEntry) {
  if (ability.mode === "passive") return "P";
  if (/bedelsiz|yok/i.test(ability.cost)) return "0";
  return ability.cost.match(/\d+/)?.[0] ?? "•";
}

function artPosition(ability: AbilityEntry) {
  const hash = ability.id.split("").reduce((total, character) => total + character.charCodeAt(0), 0);
  return `${10 + (hash % 80)}% ${20 + (hash % 58)}%`;
}

export function AbilityCatalog({ abilities }: { abilities: AbilityEntry[] }) {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("Tümü");
  const [mode, setMode] = useState<ModeFilter>("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<AbilityEntry | null>(null);
  const normalized = query.trim().toLocaleLowerCase("tr-TR");

  const filtered = useMemo(() => abilities.filter((ability) => {
    const sourceMatch = source === "Tümü" || ability.sourceSet === source;
    const modeMatch = mode === "all" || ability.mode === mode;
    const text = `${ability.name} ${ability.group} ${ability.id} ${ability.tier} ${ability.action} ${ability.effect} ${ability.classes}`.toLocaleLowerCase("tr-TR");
    return sourceMatch && modeMatch && (!normalized || text.includes(normalized));
  }), [abilities, source, mode, normalized]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  function changeSource(value: string) { setSource(value); setPage(1); }
  function changeMode(value: ModeFilter) { setMode(value); setPage(1); }

  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", close);
    document.body.classList.add("modal-open");
    return () => { document.removeEventListener("keydown", close); document.body.classList.remove("modal-open"); };
  }, [selected]);

  return (
    <div className="ability-catalog shell">
      <div className="catalog-tools">
        <label className="search-box"><Search size={17} /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Yetenek, karakter veya kural kimliği ara…" /></label>
        <div className="catalog-result"><b>{filtered.length}</b> sonuç</div>
      </div>

      <div className="ability-filter-bar" aria-label="Yetenek filtreleri">
        <div className="category-pills ability-mode-pills">
          <button className={mode === "all" ? "active" : ""} type="button" onClick={() => changeMode("all")}><Sparkles size={13} /> Tüm Yetenekler</button>
          <button className={mode === "active" ? "active" : ""} type="button" onClick={() => changeMode("active")}><Zap size={13} /> Aktif Yetenekler</button>
          <button className={mode === "passive" ? "active" : ""} type="button" onClick={() => changeMode("passive")}><Shield size={13} /> Pasif Yetenekler</button>
        </div>
        <div className="category-pills ability-source-pills">{["Tümü", "Temel Runeterra", "League of Legends", "TFT Set 17"].map((value) => <button className={source === value ? "active" : ""} type="button" onClick={() => changeSource(value)} key={value}>{value}</button>)}</div>
      </div>

      <div className="ability-card-grid">{visible.map((ability) => (
        <button className={`ability-game-card ${ability.mode}`} type="button" onClick={() => setSelected(ability)} key={ability.id} aria-label={`${ability.name} ayrıntılarını aç`}>
          <span className="ability-card-cost">{costBadge(ability)}</span>
          <span className="ability-card-art"><Image src="/art/abilities-cover.png" alt="" fill sizes="260px" style={{ objectPosition: artPosition(ability) }} /></span>
          <span className="ability-card-body">
            <small>{ability.group}</small>
            <strong>{ability.name}</strong>
            <em>{ability.effect || "Bu yeteneğin etkisi kural kartında açıklanır."}</em>
            <span className="ability-card-meta">{ability.action || "Özel kullanım"} · {ability.cost || "Bedelsiz"}</span>
          </span>
          <span className="ability-card-mode">{ability.mode === "active" ? "AKTİF" : "PASİF"}</span>
        </button>
      ))}</div>

      {visible.length === 0 && <div className="no-results"><Search size={30} /><h2>Bu filtrelerle eşleşen yetenek bulunamadı.</h2></div>}
      {pages > 1 && <div className="pagination"><button disabled={safePage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Önceki</button><span>{safePage} / {pages}</span><button disabled={safePage === pages} onClick={() => setPage((value) => Math.min(pages, value + 1))}>Sonraki</button></div>}

      {selected && <div className="ability-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
        <section className="ability-modal" role="dialog" aria-modal="true" aria-labelledby="ability-modal-title">
          <button className="ability-modal-close" type="button" autoFocus onClick={() => setSelected(null)} aria-label="Bilgi ekranını kapat"><X size={20} /></button>
          <div className={`ability-modal-card ${selected.mode}`}>
            <span className="ability-card-cost">{costBadge(selected)}</span>
            <span className="ability-card-art"><Image src="/art/abilities-cover.png" alt="" fill sizes="360px" style={{ objectPosition: artPosition(selected) }} /></span>
            <span className="ability-card-mode">{selected.mode === "active" ? "AKTİF" : "PASİF"}</span>
          </div>
          <div className="ability-modal-copy">
            <p className="eyebrow">{selected.sourceSet} · {selected.group}</p>
            <h2 id="ability-modal-title">{selected.name}</h2>
            <p className="ability-modal-effect">{selected.effect || "Bu yeteneğin etkisi kural kartında açıklanır."}</p>
            <dl>
              <div><dt>Kademe</dt><dd>{selected.tier || "Özel"}</dd></div>
              <div><dt>Aksiyon</dt><dd>{selected.action || "Kartta belirtilir"}</dd></div>
              <div><dt>Bedel</dt><dd>{selected.cost || "Bedelsiz"}</dd></div>
              <div><dt>Tür</dt><dd>{selected.mode === "active" ? "Aktif yetenek" : "Pasif yetenek"}</dd></div>
              <div><dt>Uyumlu sınıflar</dt><dd>{selected.classes || "GM kararı"}</dd></div>
              <div><dt>Kaynak</dt><dd>{selected.source || selected.sourceSet}</dd></div>
            </dl>
            <footer><code>{selected.id}</code><span><BookOpenText size={14} /> Kartı kapatmak için Esc</span></footer>
          </div>
        </section>
      </div>}
    </div>
  );
}