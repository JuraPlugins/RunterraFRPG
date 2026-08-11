import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft } from "lucide-react";

export function LoreDetail({ backHref, backLabel, image, eyebrow, title, lead, facts, sections, guideHref, imagePosition = "center" }: {
  backHref: string; backLabel: string; image: string; eyebrow: string; title: string; lead: string;
  facts: { label: string; value: string }[]; sections: { title: string; body: string | readonly string[] }[];
  guideHref: string; imagePosition?: string;
}) {
  return (
    <article className="lore-detail shell">
      <Link className="back-link" href={backHref}><ChevronLeft size={15} /> {backLabel}</Link>
      <div className="lore-detail-hero"><div className="lore-detail-art"><Image src={image} alt="" fill priority sizes="(max-width: 760px) 100vw, 50vw" style={{ objectPosition: imagePosition }} /></div><div className="lore-detail-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{lead}</p><Link className="button button-primary" href="/karakter">Bu seçimle karakter oluştur <ArrowRight size={16} /></Link></div></div>
      <div className="lore-detail-layout"><aside className="lore-facts">{facts.map((fact) => <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</aside><div className="lore-prose">{sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{Array.isArray(section.body) ? <ul>{section.body.map((item) => <li key={item}>{item}</li>)}</ul> : <p>{section.body as string}</p>}</section>)}<div className="guide-callout"><div><small>Eksiksiz mekanik metin</small><h2>Kural kitabında incele</h2><p>Külliyat hızlı keşif içindir. Sabit kural kimlikleri, sınırlar ve bütün etkileşimler yaşayan rehberde bulunur.</p></div><Link className="button button-ghost" href={guideHref}>Rehbere git <ArrowRight size={16} /></Link></div></div></div>
    </article>
  );
}
