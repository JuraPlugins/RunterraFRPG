import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LoreDetail } from "@/components/lore-detail";
import { ancestries } from "@/lib/character-data";

type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() { return ancestries.map((item) => ({ id: item.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { id } = await params; const item = ancestries.find((entry) => entry.id === id); return { title: item ? `${item.name} · Halklar Külliyatı` : "Halk bulunamadı" }; }

export default async function AncestryDetailPage({ params }: Props) {
  const { id } = await params; const item = ancestries.find((entry) => entry.id === id); if (!item) notFound(); const index = ancestries.findIndex((entry) => entry.id === item.id);
  return <LoreDetail backHref="/kulliyat/halklar" backLabel="Halklara dön" image="/art/peoples-cover.png" imagePosition={`${index * 25}% 38%`} eyebrow="Oynanabilir soy" title={item.name} lead={`${item.trait}: ${item.description}`} facts={[{ label: "Boyut", value: item.size }, { label: "Hız", value: `${item.speed} metre` }, { label: "Soy özelliği", value: item.trait }, { label: "Yetenek bonusu", value: "Yok" }]} sections={[{ title: item.trait, body: item.description }, { title: "Kimlik özgürlüğü", body: `${item.name} karakterin görünüşünü ve anlatısal mirasını belirler; sınıfını, bölgesini, ahlakını veya mesleğini sınırlamaz. Kültür bölge ve geçmiş seçiminden gelir.` }, { title: "Denge sınırı", body: "Soy paketi yetenek puanı, doğrudan saldırı, hasar, SS, CP, büyü DC'si veya sınıf kaynağı sağlamaz. Görünüş ayrıntıları oyuncuya aittir." }]} guideHref="/rehber/icerik/irklar" />;
}
