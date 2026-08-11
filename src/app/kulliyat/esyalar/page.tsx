import type { Metadata } from "next";
import { CollectionHeader } from "@/components/collection-header";
import { ItemCatalog } from "@/components/item-catalog";
import { getItems } from "@/lib/items";
export const metadata:Metadata={title:"Eşya Külliyatı"};
export default function ItemsPage(){const items=getItems();return <><CollectionHeader eyebrow="Teçhizat ve ganimet" title="Eşyalar" count={String(items.length).padStart(3,"0")} description="LoL ve TFT’den uyarlanan silahları, zırhları, sarf malzemelerini ve pasif eşyaları tür ve etkiyle ara."/><ItemCatalog items={items}/></>}
