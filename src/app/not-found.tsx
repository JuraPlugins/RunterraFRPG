import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return <section className="empty-state shell"><Compass size={48} /><p className="eyebrow">Yol kayboldu</p><h1>Bu geçit hiçbir yere açılmıyor.</h1><p>Aradığın sayfa taşınmış veya henüz arşive eklenmemiş olabilir.</p><Link className="button button-primary" href="/">Ana sayfaya dön</Link></section>;
}
