import type { Metadata } from "next";
import { CollectionCard } from "@/components/collection-card";
import { CollectionHeader } from "@/components/collection-header";
import { classes } from "@/lib/character-data";

export const metadata: Metadata = { title: "Sınıflar Külliyatı" };

export default function ClassesCollectionPage() {
  return <><CollectionHeader eyebrow="Kahraman yolları" title="Sınıflar" count="13" description="Sınıfın mesleğin ya da memleketin değil; tehlike karşısında kullandığın ana mekanik araçtır. Her yol bütün bölgeler ve halklarla oynanabilir." /><section className="lore-grid shell">{classes.map((item, index) => <CollectionCard href={`/kulliyat/siniflar/${item.id}`} image="/art/classes-cover.png" title={item.name} kicker={`d${item.hitDie} · ${item.resource}`} description={`${item.role}. Ana güç yeteneği ${item.primary}; ${item.specializations.join(" ve ")} yollarına ayrılır.`} tags={[item.primary, ...item.saves.map((save) => `${save} kurtarma`)]} position={`${(index % 6) * 20}% ${index < 6 ? 40 : 62}%`} key={item.id} />)}</section></>;
}
