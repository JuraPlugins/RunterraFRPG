import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllDocuments, getDocumentByRoute, renderDocument } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string[] }> };

function headingSlug(value: string) {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function generateStaticParams() {
  return getAllDocuments().filter((document) => document.slug !== "/").map((document) => ({ slug: document.slug.slice(1).split("/") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const document = getDocumentByRoute((await params).slug);
  return document ? { title: document.title, description: document.excerpt } : { title: "Belge bulunamadı" };
}

export default async function DocumentPage({ params }: PageProps) {
  const document = getDocumentByRoute((await params).slug);
  if (!document) notFound();
  const rendered = await renderDocument(document);
  const allDocuments = getAllDocuments().filter((item) => item.slug !== "/");
  const navigation = allDocuments.filter((item) => ["Temel Kitap", "İçerik Ansiklopedisi", "Sınıf Kitapçıkları"].includes(item.category));
  return (
    <div className="article-shell">
      <aside className="article-nav"><h3>Kitap dizini</h3>{navigation.map((item) => <Link className={item.slug === document.slug ? "current" : ""} href={item.url} key={item.slug}>{item.title}</Link>)}</aside>
      <article>
        <div className="article-breadcrumb"><Link href="/rehber">Rehber</Link> / {document.category}</div>
        <header className="article-header"><p className="eyebrow">{document.category}</p><h1>{document.title}</h1><div className="article-meta"><span>v{document.version}</span><span>{document.ruleIds.length} kural</span><span>{document.status === "complete-draft" ? "Tam taslak" : document.status}</span></div></header>
        <div className="markdown" dangerouslySetInnerHTML={{ __html: rendered }} />
      </article>
      <aside className="article-toc"><h3>Bu sayfada</h3>{document.headings.slice(0, 24).map((heading, index) => <a href={`#${headingSlug(heading)}`} key={`${heading}-${index}`}>{heading}</a>)}</aside>
    </div>
  );
}
