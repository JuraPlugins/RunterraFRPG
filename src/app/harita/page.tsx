import type { Metadata } from "next";
import { WorldMap } from "@/components/world-map";
import "./map.css";

export const metadata: Metadata = {
  title: "Gezilebilir Dünya Haritası",
  description: "Runeterra FRP için bölgeler, konumlar, keşif sisi ve GM araçları içeren gezilebilir karo harita.",
};

export default function MapPage() {
  return <WorldMap />;
}
