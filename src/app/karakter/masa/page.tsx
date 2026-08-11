import type { Metadata } from "next";
import { CharacterDashboard } from "@/components/character-dashboard";
import { getAbilities } from "@/lib/abilities";
import { getItems } from "@/lib/items";
import { getClassFeatures } from "@/lib/class-features";
import { classes } from "@/lib/character-data";

export const metadata: Metadata = { title: "Masa Paneli", description: "Runeterra FRP karakter, çatışma, ilerleme, yetenek ve envanter yönetimi." };

export default function TablePage() {
  const classFeatures = Object.fromEntries(classes.map((entry) => [entry.id, getClassFeatures(entry.id)]));
  return <CharacterDashboard abilities={getAbilities()} items={getItems()} classFeatures={classFeatures} />;
}
