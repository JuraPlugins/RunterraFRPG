import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LoreDetail } from "@/components/lore-detail";
import { classes } from "@/lib/character-data";

type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() { return classes.map((item) => ({ id: item.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { id } = await params; const item = classes.find((entry) => entry.id === id); return { title: item ? `${item.name} · Sınıflar Külliyatı` : "Sınıf bulunamadı" }; }

export default async function ClassDetailPage({ params }: Props) {
  const { id } = await params; const item = classes.find((entry) => entry.id === id); if (!item) notFound(); const index = classes.findIndex((entry) => entry.id === item.id);
  return <LoreDetail backHref="/kulliyat/siniflar" backLabel="Sınıflara dön" image="/art/classes-cover.png" imagePosition={`${(index % 6) * 20}% ${index < 6 ? 40 : 62}%`} eyebrow={`${item.role} · d${item.hitDie}`} title={item.name} lead={`Tehlike karşısında ${item.role.toLocaleLowerCase("tr-TR")} araçlarını kullanan, ${item.resource} kaynağıyla çalışan kahraman yolu.`} facts={[{ label: "Can Zarı", value: `d${item.hitDie}` }, { label: "Ana yetenek", value: item.primary }, { label: "Kaynak", value: item.resource }, { label: "Kurtarmalar", value: item.saves.join(", ") }, { label: "Zırh", value: item.armor }]} sections={[{ title: "Sınıf kimliği", body: `${item.name}, karakterin memleketini veya mesleğini değil; çatışma ve keşif sırasında başvurduğu ana mekanik yaklaşımı belirler. Her halk ve bölge bu sınıfla oynanabilir.` }, { title: "Uzmanlık yolları", body: item.specializations.map((specialization) => `${specialization}: 3. seviyede açılan ve sınıf döngüsünü farklı bir yöne taşıyan uzmanlık.`) }, { title: "Başlangıç donanımı", body: item.equipment }, { title: "Beceri seçenekleri", body: item.skills }]} guideHref="/rehber/icerik/siniflar" />;
}
