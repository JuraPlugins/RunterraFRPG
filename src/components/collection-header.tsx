import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function CollectionHeader({ eyebrow, title, description, count }: { eyebrow: string; title: string; description: string; count: string }) {
  return (
    <header className="collection-header shell">
      <Link className="back-link" href="/kulliyat"><ChevronLeft size={15} /> Külliyata dön</Link>
      <div className="collection-header-row"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div><div className="collection-count"><strong>{count}</strong><span>Arşiv kaydı</span></div></div>
    </header>
  );
}
