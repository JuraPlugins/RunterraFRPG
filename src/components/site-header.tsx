import Link from "next/link";
import { BookOpenText, Gauge, LibraryBig, Map, ScrollText, Sparkles, UserRound } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Runeterra FRP ana sayfa">
          <span className="brand-rune" aria-hidden="true"><Sparkles size={18} /></span>
          <span><strong>Runeterra</strong><small>FRP Arşivi</small></span>
        </Link>
        <nav className="main-nav" aria-label="Ana menü">
          <Link href="/kulliyat"><LibraryBig size={17} /> Külliyat</Link>
          <Link href="/rehber"><BookOpenText size={17} /> Rehber</Link>
          <Link href="/harita"><Map size={17} /> Harita</Link>
          <Link href="/hesap"><UserRound size={17} /> Hesap</Link>
          <Link href="/karakterler"><Gauge size={17} /> Karakterlerim</Link>
          <Link href="/karakter"><ScrollText size={17} /> Karakter Oluştur</Link>
        </nav>
        <Link className="header-cta" href="/karakter">Yeni karakter</Link>
      </div>
    </header>
  );
}
