"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import type { AbilityEntry } from "@/lib/abilities";

type AbilitySummary = Omit<AbilityEntry, "effect" | "classes">;
const PAGE_SIZE = 36;

export function AbilityCatalog({ abilities }: { abilities: AbilitySummary[] }) {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("Tümü");
  const [page, setPage] = useState(1);
  const normalized = query.trim().toLocaleLowerCase("tr-TR");
  const filtered = useMemo(() => abilities.filter((ability) => {
    const sourceMatch = source === "Tümü" || ability.sourceSet === source;
    const text = `${ability.name} ${ability.group} ${ability.id} ${ability.tier} ${ability.action}`.toLocaleLowerCase("tr-TR");
    return sourceMatch && (!normalized || text.includes(normalized));
  }), [abilities, source, normalized]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((Math.min(page, pages) - 1) * PAGE_SIZE, Math.min(page, pages) * PAGE_SIZE);
  function changeSource(value: string) { setSource(value); setPage(1); }

  return (
    <div className="ability-catalog shell">
      <div className="catalog-tools"><label className="search-box"><Search size={17} /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Yetenek, karakter veya kural kimliği ara…" /></label><div className="catalog-result"><b>{filtered.length}</b> sonuç</div></div>
      <div className="category-pills">{["Tümü", "Temel Runeterra", "League of Legends", "TFT Set 17"].map((value) => <button className={source === value ? "active" : ""} type="button" onClick={() => changeSource(value)} key={value}>{value}</button>)}</div>
      <div className="ability-card-grid">{visible.map((ability, index) => <Link className="ability-lore-card" href={`/kulliyat/yetenekler/${ability.slug}`} key={ability.id}><div className="ability-lore-image"><Image src="/art/abilities-cover.png" alt="" fill sizes="260px" style={{ objectPosition: `${(index % 6) * 20}% ${index % 2 ? 70 : 25}%` }} /><span>{ability.tier.split(";")[0] || "İmza Yeteneği"}</span></div><div className="ability-lore-copy"><small>{ability.group}</small><h2>{ability.name}</h2><p>{ability.action || "Özel kullanım"} · {ability.cost || "Kartta belirtilir"}</p><div><code>{ability.id}</code><ArrowUpRight size={15} /></div></div></Link>)}</div>
      {visible.length === 0 && <div className="no-results"><Search size={30} /><h2>Bu isimde bir yetenek bulunamadı.</h2></div>}
      {pages > 1 && <div className="pagination"><button disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Önceki</button><span>{page} / {pages}</span><button disabled={page === pages} onClick={() => setPage((value) => Math.min(pages, value + 1))}>Sonraki</button></div>}
    </div>
  );
}
