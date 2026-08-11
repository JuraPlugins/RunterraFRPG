import type { Metadata } from "next";
import { AbilityCatalog } from "@/components/ability-catalog";
import { CollectionHeader } from "@/components/collection-header";
import { getAbilities } from "@/lib/abilities";

export const metadata: Metadata = { title: "Yetenekler Külliyatı" };

export default function AbilitiesCollectionPage() {
  const abilities = getAbilities();
  const summaries = abilities.map(({ effect: _effect, classes: _classes, ...summary }) => summary);
  return <><CollectionHeader eyebrow="İmza güçleri" title="Yetenekler" count={String(abilities.length).padStart(3, "0")} description="Evrensel fantastik güçleri ve LoL ile TFT’den masaüstüne uyarlanan imza yeteneklerini isim, kaynak, kademe ve aksiyonla ara." /><AbilityCatalog abilities={summaries} /></>;
}
