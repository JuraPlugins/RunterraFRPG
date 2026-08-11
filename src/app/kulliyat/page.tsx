import type { Metadata } from "next";
import { CollectionCard } from "@/components/collection-card";

export const metadata: Metadata = { title: "Külliyat", description: "Runeterra FRP sınıf, bölge, halk ve yetenek külliyatı." };

const collections = [
  { href: "/kulliyat/siniflar", image: "/art/classes-cover.png", title: "Sınıflar", kicker: "6 sınıf · 12 uzmanlık", description: "Savaş alanında hangi araçlarla iz bırakacağını seç. Her sınıfın rolünü, kaynağını ve uzmanlık yollarını karşılaştır.", position: "center 35%" },
  { href: "/kulliyat/bolgeler", image: "/art/regions-cover.png", title: "Bölgeler", kicker: "12 kültürel köken", description: "Seni biçimlendiren kültürü keşfet. Beceri seçenekleri, bağlantılar ve karakter çatışmaları tek atlas içinde.", position: "center 48%" },
  { href: "/kulliyat/halklar", image: "/art/peoples-cover.png", title: "Halklar ve Soylar", kicker: "5 oynanabilir halk", description: "İnsan, Yordle, Vastaya, Minotaur ve Troll miraslarının anlatısal kimliğini ve dengeli özelliklerini incele.", position: "center 32%" },
  { href: "/kulliyat/esyalar", image: "/art/collection-4.png", title: "Eşyalar", kicker: "466 silah, zırh ve ganimet", description: "LoL ve TFT teçhizatını tür, nadirlik, kullanım hakkı ve masaüstü etkileriyle karşılaştır.", position: "center 45%" },
  { href: "/kulliyat/yetenekler", image: "/art/abilities-cover.png", title: "Yetenekler", kicker: "987 imza yeteneği", description: "LoL, TFT ve evrensel fantastik güçlerin masaüstü uyarlamalarını ara; kademe, aksiyon ve bedellerini gör.", position: "center 46%" },
];

export default function CollectionsPage() {
  return <><header className="page-hero"><div className="shell"><p className="eyebrow">Runeterra FRP arşivi</p><h1>Külliyat</h1><p className="collection-intro">Dünyanın halkları, güç gelenekleri ve kahraman yolları tek bir görsel arşivde. Bir koleksiyon seç, kartları incele ve ayrıntılara in.</p></div></header><section className="collection-landing shell">{collections.map((item) => <CollectionCard {...item} large key={item.href} />)}</section></>;
}
