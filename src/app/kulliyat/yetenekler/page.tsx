import type { Metadata } from "next";
import { AbilityCatalog } from "@/components/ability-catalog";
import { CollectionHeader } from "@/components/collection-header";
import { getAbilities } from "@/lib/abilities";

export const metadata: Metadata = { title: "Yetenekler Külliyatı" };

export default function AbilitiesCollectionPage() {
  const abilities = getAbilities();
  return <><CollectionHeader eyebrow="İmza güçleri" title="Yetenekler" count={String(abilities.length).padStart(3, "0")} description="Evrensel fantastik güçleri ve LoL ile TFT’den uyarlanan imza yeteneklerini filtrele; bir kartı seçerek tüm kurallarını aynı ekranda incele." /><AbilityCatalog abilities={abilities} /></>;
}
