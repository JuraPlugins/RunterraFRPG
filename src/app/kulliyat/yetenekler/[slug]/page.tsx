import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LoreDetail } from "@/components/lore-detail";
import { getAbilities, getAbility } from "@/lib/abilities";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getAbilities().map((item) => ({ slug: item.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const item = getAbility((await params).slug); return { title: item ? `${item.name} · Yetenekler Külliyatı` : "Yetenek bulunamadı" }; }

export default async function AbilityDetailPage({ params }: Props) {
  const item = getAbility((await params).slug); if (!item) notFound(); const focus = item.id.split("").reduce((sum, character) => sum + character.charCodeAt(0), 0) % 80 + 10;
  return <LoreDetail backHref="/kulliyat/yetenekler" backLabel="Yeteneklere dön" image="/art/abilities-cover.png" imagePosition={`${focus}% 45%`} eyebrow={`${item.sourceSet} · ${item.group}`} title={item.name} lead={item.effect || "Bu yeteneğin etkisi kural kartında açıklanır."} facts={[{ label: "Kademe", value: item.tier || "Özel" }, { label: "Aksiyon", value: item.action || "Kartta belirtilir" }, { label: "Bedel", value: item.cost || "Kartta belirtilir" }, { label: "Kural kimliği", value: item.id }]} sections={[{ title: "Mekanik etki", body: item.effect || "Ayrıntılı etki metni rehber kartında bulunur." }, { title: "Kaynak", body: item.source || item.sourceSet }, ...(item.classes ? [{ title: "Uyumlu sınıflar", body: item.classes }] : []), { title: "Kullanım sınırı", body: "İmza Yeteneği normal kademe, sınıf kaynağı, tur ve Rün Puanı yığılma kurallarına uyar. RP yeteneğin kaynak bedelini ödemez." }]} guideHref="/rehber/icerik/yetenekler" />;
}
