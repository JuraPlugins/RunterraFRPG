import type { Metadata } from "next";
import { SessionRoom } from "@/components/session-room";
import { getItems } from "@/lib/items";

export const metadata: Metadata = { title: "Session Odası", description: "Canlı Runeterra FRP session ve GM ekranı." };

export default async function RoomPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <SessionRoom code={code.toUpperCase()} items={getItems().map((item) => ({ id: item.id, name: item.name }))} />;
}
