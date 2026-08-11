import Link from "next/link";
import { ArrowRight, BookOpenText, Compass, Dices, Layers3, ScrollText, ShieldCheck, Sparkles, WandSparkles } from "lucide-react";
import { getAllDocuments, getProjectStats } from "@/lib/content";

export default function HomePage() {
  const stats = getProjectStats();
  const latest = getAllDocuments().filter((doc) => doc.category === "İçerik Ansiklopedisi").slice(-3).reverse();

  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={15} /> Rünlerin kaderi şekillendirdiği d20 sistemi</p>
          <h1>Kendi efsaneni<br /><em>Runeterra’da</em> yaz.</h1>
          <p className="hero-lead">On iki bölge, on iki sınıf ve binlerce kombinasyon. Kuralları keşfet, karakterini yarat ve sıradan bir maceracıdan dünyayı değiştiren bir güce dönüş.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/karakter"><ScrollText size={18} /> Karakterini oluştur <ArrowRight size={17} /></Link>
            <Link className="button button-ghost" href="/rehber"><BookOpenText size={18} /> Kuralları keşfet</Link>
          </div>
          <div className="hero-trust"><ShieldCheck size={16} /><span>Başka bir oyun kitabı gerektirmez</span><span className="dot" /><span>Seviye 1–20</span></div>
        </div>
        <div className="hero-art" aria-label="Runik pusula illüstrasyonu">
          <div className="orbit orbit-one"><i /></div>
          <div className="orbit orbit-two"><i /><i /><i /></div>
          <div className="rune-compass">
            <span className="compass-glyph">ᚱ</span>
            <small>KADER</small>
          </div>
          <div className="floating-card card-north"><Compass size={19} /><span><b>12</b> Bölge</span></div>
          <div className="floating-card card-south"><WandSparkles size={19} /><span><b>987</b> Yetenek</span></div>
        </div>
      </section>

      <section className="stats-band">
        <div className="shell stat-grid">
          {[
            [stats.classes, "Oynanabilir sınıf"], [stats.regions, "Benzersiz bölge"], [stats.items, "Uyarlanmış eşya"], [stats.abilities, "İmza yeteneği"],
          ].map(([number, label]) => <div className="stat" key={label}><strong>{number}</strong><span>{label}</span></div>)}
        </div>
      </section>

      <section className="shell section-block">
        <div className="section-heading"><p className="eyebrow">Tek bir arşiv, bütün sistem</p><h2>Maceran için gereken her şey</h2><p>Kurallar Markdown belgelerinden doğrudan okunur; kitap değiştiğinde site de değişir.</p></div>
        <div className="feature-grid">
          <Link href="/rehber" className="feature-card featured"><span className="feature-icon"><BookOpenText /></span><div><small>Yaşayan rehber</small><h3>Kuralları kaybolmadan bul</h3><p>Çekirdek kurallardan büyü etkileşimlerine kadar tüm kitabı başlık ve kural kimliğiyle ara.</p><span className="text-link">Rehberi aç <ArrowRight size={15} /></span></div></Link>
          <Link href="/karakter" className="feature-card"><span className="feature-icon"><Dices /></span><div><small>Adım adım</small><h3>Karakter oluşturucu</h3><p>Point-buy, köken, sınıf, beceri ve Aspect seçimlerini tek akışta tamamla.</p><span className="text-link">Oluşturmaya başla <ArrowRight size={15} /></span></div></Link>
          <Link href="/kulliyat" className="feature-card"><span className="feature-icon"><Layers3 /></span><div><small>Görsel külliyat</small><h3>Dünyayı kartlarla keşfet</h3><p>LoL ve TFT’den uyarlanan yüzlerce oyun fikrini masaüstü kurallarıyla incele.</p><span className="text-link">Külliyatı keşfet <ArrowRight size={15} /></span></div></Link>
        </div>
      </section>

      <section className="shell journey-section">
        <div className="journey-copy"><p className="eyebrow">Sıradandan efsaneye</p><h2>Bir isimle başlar.<br />Bir efsaneye dönüşür.</h2><p>Karakter oluşturucu bütün temel değerleri hesaplar, seçim sınırlarını takip eder ve karakterini bu cihazda saklar.</p><Link className="button button-primary" href="/karakter">İlk karakterini yarat <ArrowRight size={17} /></Link></div>
        <ol className="journey-steps">
          {["Kimliğini ve güç kademeni belirle", "Yetenek puanlarını dağıt", "Soyunu ve bölge bağını seç", "Sınıfını, becerilerini ve uzmanlığını kur", "Üç Aspect ile hikâyeni mühürle"].map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}
        </ol>
      </section>

      <section className="shell section-block latest-section">
        <div className="section-heading align-left"><p className="eyebrow">Arşivden</p><h2>Öne çıkan kitaplar</h2></div>
        <div className="latest-grid">
          {latest.map((doc) => <Link href={doc.url} className="latest-card" key={doc.slug}><small>v{doc.version} · {doc.ruleIds.length} kural</small><h3>{doc.title}</h3><p>{doc.excerpt}…</p><span className="text-link">Okumaya devam et <ArrowRight size={15} /></span></Link>)}
        </div>
      </section>
    </>
  );
}
