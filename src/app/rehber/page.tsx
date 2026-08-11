import type { Metadata } from "next";
import { BookOpenText } from "lucide-react";
import { GuideExplorer } from "@/components/guide-explorer";
import { getAllDocuments } from "@/lib/content";

export const metadata: Metadata = { title: "Kural Rehberi", description: "Runeterra FRP kuralları, sınıflar, bölgeler, eşyalar ve yetenekler." };

export default function GuidePage() {
  const documents = getAllDocuments().filter((document) => document.slug !== "/");
  const searchable = documents.map(({ title, url, version, category, excerpt, ruleIds, searchText, relativePath }) => ({ title, url, version, category, excerpt, ruleIds, searchText, relativePath }));
  return (
    <>
      <header className="page-hero"><div className="shell page-hero-inner"><div><p className="eyebrow">Yaşayan kural kitabı</p><h1>Runeterra Arşivi</h1><p>Temel kurallardan yüzlerce eşya ve yeteneğe kadar bütün sistemi ara. Sabit kural kimlikleri sayesinde masada aradığın hükme doğrudan ulaş.</p></div><div className="page-sigil"><BookOpenText /></div></div></header>
      <GuideExplorer documents={searchable} />
    </>
  );
}
