import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LoreDetail } from "@/components/lore-detail";
import { ancestries } from "@/lib/character-data";

type Props = { params: Promise<{ id: string }> };

const ancestryDetailSections: Record<string, { title: string; body: string | string[] }[]> = {
  mutant: [
    { title: "Zaun'a özel köken", body: "Mutant varsayılan olarak yalnız Zaun bölgesiyle seçilir. Başka bir bölgede kullanılabilmesi için GM'nin Zaun laboratuvarı, kaçak kimyager veya benzeri somut bir dönüşüm bağlantısını onaylaması gerekir." },
    { title: "Mutasyon biçimleri", body: ["Kimyasal sızıntıyla dönüşmüş beden", "Kalıtsal altşehir adaptasyonu", "Kontrollü biyolojik deney", "Kaçak kimyager müdahalesi"] },
    { title: "Sınır", body: "Kimyasal Adaptasyon avantaj sağlar; zehir bağışıklığı, hasar direnci, yenilenme, doğal silah veya ek uzuv saldırısı vermez." },
  ],
  yeti: [
    { title: "Oynanabilir yorum", body: "Karakter genç, küçük yapılı veya maceracı ölçeğine uyarlanmış bir yetidir. Kadim yetilerin büyük gücü başlangıç soy paketine dâhil değildir." },
    { title: "Kış hafızası", body: ["Unutulmuş şarkıların taşıyıcısı", "İnsan dünyasını keşfeden genç gezgin", "Fırtına ve buz rehberi", "Erken uyanmış eski koruyucu"] },
    { title: "Sınır", body: "Kar Basışı yalnız doğal kar ve buzun zorlu arazi maliyetini kaldırır; soğuk direnci, Büyük boyut veya büyülü kükreme sağlamaz." },
  ],
  ruh: [
    { title: "Bağlı biçim", body: "Oynanabilir Ruh, bir hatıraya, yere, yemine veya hazırlanmış bedene bağlıdır. Maddi dünyada dokunulabilir; ekipman kullanır ve normal hasar alır." },
    { title: "Bağ seçenekleri", body: ["Yarım kalmış yemin", "Korunan mekândan kalan parça", "Ödünç veya yapay beden", "Adını hatırlayan son kişi"] },
    { title: "Sınır", body: "Ruh duvarlardan geçmez; uçuş, görünmezlik, zihin okuma veya fiziksel hasar bağışıklığı kazanmaz." },
  ],
  havari: [
    { title: "Aşkın alan", body: ["Koruma", "Savaş", "Değişim", "Bilgi", "Doğa", "Ölüm", "Yıldızlar"] },
    { title: "Mekanik köken", body: "Havari biyolojik bir halk olmak zorunda değildir. Seçilmiş veya işaretlenmiş bir taşıyıcıyı temsil eder ve başka bir soy özelliğiyle birleşmez." },
    { title: "Sınır", body: "Aşkın Yankı yalnız seçilen alan hakkında bilgi kontrolü sağlar; ücretsiz büyü, uçuş, ölümsüzlük veya doğrudan ilahi cevap vermez." },
  ],
};
export function generateStaticParams() { return ancestries.map((item) => ({ id: item.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { id } = await params; const item = ancestries.find((entry) => entry.id === id); return { title: item ? `${item.name} · Halklar Külliyatı` : "Halk bulunamadı" }; }

export default async function AncestryDetailPage({ params }: Props) {
  const { id } = await params; const item = ancestries.find((entry) => entry.id === id); if (!item) notFound(); const index = ancestries.findIndex((entry) => entry.id === item.id);
  return <LoreDetail backHref="/kulliyat/halklar" backLabel="Halklara dön" image="/art/peoples-cover.png" imagePosition={`${(index % 5) * 25}% ${Math.floor(index / 5) * 62 + 22}%`} eyebrow="Oynanabilir soy" title={item.name} lead={`${item.trait}: ${item.description}`} facts={[{ label: "Boyut", value: item.size }, { label: "Hız", value: `${item.speed} metre` }, { label: "Soy özelliği", value: item.trait }, { label: "Yetenek bonusu", value: "Yok" }]} sections={[{ title: item.trait, body: item.description }, { title: "Kimlik özgürlüğü", body: `${item.name} karakterin görünüşünü ve anlatısal mirasını belirler; sınıfını, bölgesini, ahlakını veya mesleğini sınırlamaz. Kültür bölge ve geçmiş seçiminden gelir.` }, { title: "Denge sınırı", body: "Soy paketi yetenek puanı, doğrudan saldırı, hasar, SS, CP, büyü DC'si veya sınıf kaynağı sağlamaz. Görünüş ayrıntıları oyuncuya aittir." }, ...(ancestryDetailSections[item.id] ?? [])]} guideHref="/rehber/icerik/irklar" />;
}
