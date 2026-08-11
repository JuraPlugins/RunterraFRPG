import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LoreDetail } from "@/components/lore-detail";
import { regions } from "@/lib/character-data";

type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() { return regions.map((item) => ({ id: item.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { id } = await params; const item = regions.find((entry) => entry.id === id); return { title: item ? `${item.name} · Bölgeler Külliyatı` : "Bölge bulunamadı" }; }

export default async function RegionDetailPage({ params }: Props) {
  const { id } = await params; const item = regions.find((entry) => entry.id === id); if (!item) notFound(); const index = regions.findIndex((entry) => entry.id === item.id);
  return <LoreDetail backHref="/kulliyat/bolgeler" backLabel="Bölgelere dön" image="/art/regions-cover.png" imagePosition={`${(index % 4) * 33}% ${Math.floor(index / 4) * 38}%`} eyebrow="Kültürel köken" title={item.name} lead={item.description} facts={[{ label: "Kültürel özellik", value: item.trait }, { label: "Beceri seçimi", value: item.skills.join(", ") }, { label: "Paket gücü", value: "Yatay · savaş dışı" }]} sections={[{ title: item.trait, body: item.description }, { title: "Bölge Aspect’leri", body: item.aspects.map((aspect) => `“${aspect}”`) }, { title: "Bağlantı veya başlangıç eşyası", body: item.gifts }, { title: "Her kahramana açık", body: `${item.name} kökeni hiçbir sınıfa saldırı, hasar, SS veya güç DC'si bonusu vermez. Sadakat, eleştiri, sürgünlük veya iki kültür arasındaki bağ aynı paketle anlatılabilir.` }]} guideHref="/rehber/icerik/bolgeler" />;
}
