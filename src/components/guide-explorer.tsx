"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import type { GuideDocument } from "@/lib/content";

type SearchDocument = Pick<GuideDocument, "title" | "url" | "version" | "category" | "excerpt" | "ruleIds" | "searchText" | "relativePath">;

const categoryOrder = ["Temel Kitap", "İçerik Ansiklopedisi", "Sınıf Kitapçıkları", "Eşya Arşivi", "Yetenek Arşivi"];

export function GuideExplorer({ documents }: { documents: SearchDocument[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tümü");
  const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");

  const filtered = useMemo(() => documents.filter((document) => {
    const inCategory = category === "Tümü" || document.category === category;
    const inSearch = !normalizedQuery || document.searchText.includes(normalizedQuery) || document.excerpt.toLocaleLowerCase("tr-TR").includes(normalizedQuery);
    return inCategory && inSearch;
  }), [documents, category, normalizedQuery]);

  const grouped = categoryOrder.map((name) => ({ name, documents: filtered.filter((doc) => doc.category === name) })).filter((group) => group.documents.length);

  return (
    <div className="guide-area shell">
      <div className="guide-toolbar">
        <label className="search-box">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Başlık, konu veya kural kimliği ara…" aria-label="Rehberde ara" />
          {query && <button className="search-clear" onClick={() => setQuery("")} aria-label="Aramayı temizle"><X size={16} /></button>}
        </label>
      </div>
      <div className="category-pills" aria-label="Belge kategorileri">
        {["Tümü", ...categoryOrder].map((name) => <button type="button" className={category === name ? "active" : ""} onClick={() => setCategory(name)} key={name}>{name}</button>)}
      </div>
      {grouped.length ? grouped.map((group) => (
        <section className="guide-group" key={group.name}>
          <div className="guide-group-heading"><h2>{group.name}</h2><span>{group.documents.length} belge</span></div>
          <div className="document-grid">
            {group.documents.map((document) => (
              <Link className="document-card" href={document.url} key={document.url}>
                <div className="document-card-top"><b>{document.ruleIds.length} KURAL</b><span>v{document.version}</span></div>
                <h3>{document.title}</h3><p>{document.excerpt}…</p>
                <span className="text-link">Belgeyi aç <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </section>
      )) : <div className="no-results"><Search size={32} /><h2>Arşiv sessiz kaldı.</h2><p>Başka bir kelime veya kategori deneyebilirsin.</p></div>}
    </div>
  );
}
