import type { Metadata } from "next";
import { CollectionCard } from "@/components/collection-card";
import { CollectionHeader } from "@/components/collection-header";
import { ancestries } from "@/lib/character-data";

export const metadata: Metadata = { title: "Halklar ve Soylar Külliyatı" };

export default function PeoplesCollectionPage() {
  return <><CollectionHeader eyebrow="Oynanabilir halklar" title="Halklar ve Soylar" count="05" description="Soy seçimi yetenek puanı veya sınıf üstünlüğü sağlamaz. Hareket, duyu ya da çevresel uyum özelliği ve anlatısal kimlik verir." /><section className="lore-grid lore-grid-five shell">{ancestries.map((item, index) => <CollectionCard href={`/kulliyat/halklar/${item.id}`} image="/art/peoples-cover.png" title={item.name} kicker={`${item.size} · ${item.speed} m`} description={`${item.trait}: ${item.description}`} tags={[item.trait]} position={`${index * 25}% 38%`} key={item.id} />)}</section></>;
}
