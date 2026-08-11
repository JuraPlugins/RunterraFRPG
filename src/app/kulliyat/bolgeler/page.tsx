import type { Metadata } from "next";
import { CollectionCard } from "@/components/collection-card";
import { CollectionHeader } from "@/components/collection-header";
import { regions } from "@/lib/character-data";

export const metadata: Metadata = { title: "Bölgeler Külliyatı" };

export default function RegionsCollectionPage() {
  return <><CollectionHeader eyebrow="Kültürel kökenler" title="Bölgeler" count="12" description="Memleketini, uzun süre yaşadığın yeri veya seni en çok biçimlendiren kültürü seç. Bölge güç değil; bağlantı, bilgi ve çatışma sağlar." /><section className="lore-grid shell">{regions.map((item, index) => <CollectionCard href={`/kulliyat/bolgeler/${item.id}`} image="/art/regions-cover.png" title={item.name} kicker={item.trait} description={item.description} tags={item.skills} position={`${(index % 4) * 33}% ${Math.floor(index / 4) * 38}%`} key={item.id} />)}</section></>;
}
