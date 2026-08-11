import type { Metadata } from "next";
import { CharacterBuilder } from "@/components/character-builder";

export const metadata: Metadata = { title: "Karakter Oluşturucu", description: "Runeterra FRP için adım adım karakter oluştur." };

export default function CharacterPage() { return <CharacterBuilder />; }
