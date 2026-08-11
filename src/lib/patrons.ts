export type PatronDomain = {
  id: string;
  name: string;
  description: string;
  keywords: string[];
};

export type PatronSource = {
  id: string;
  name: string;
  kind: string;
  description: string;
  domains: string[];
};

export const patronDomains: PatronDomain[] = [
  { id: "koruma", name: "Koruma", description: "Sığınak, dayanışma, şifa ve savunma.", keywords: ["koru", "kalkan", "iyileş", "şifa", "direnç", "müttefik"] },
  { id: "savas", name: "Savaş", description: "Cesaret, çatışma, meydan okuma ve zafer.", keywords: ["saldırı", "hasar", "silah", "darbe", "cesaret", "meydan"] },
  { id: "degisim", name: "Değişim", description: "Hareket, dönüşüm, özgürlük ve yaşamın akışı.", keywords: ["hareket", "dönüş", "biçim", "hız", "arın", "akış"] },
  { id: "bilgi", name: "Bilgi", description: "Sırlar, kehanetler, rünler ve hakikatin bedeli.", keywords: ["bilgi", "rün", "büyü", "kehanet", "incele", "görüş"] },
  { id: "doga", name: "Doğa", description: "Yaban, fırtına, hayvanlar ve mevsimler.", keywords: ["doğa", "hayvan", "fırtına", "yıldırım", "soğuk", "arazi"] },
  { id: "olum", name: "Ölüm", description: "Sonlar, geçiş, hatıralar ve ruhlar.", keywords: ["ölüm", "ruh", "lanet", "mezar", "gölge", "yaşam"] },
  { id: "yildizlar", name: "Yıldızlar", description: "Göksel düzen, ışık, kader ve uzak âlemler.", keywords: ["yıldız", "ışık", "göksel", "kozmik", "ışınlan", "kader"] },
  { id: "zanaat", name: "Zanaat", description: "Ateş, emek, icat ve kusursuz eser.", keywords: ["ateş", "cihaz", "teknoloji", "silah", "zırh", "enerji"] },
];

const allDomainIds = patronDomains.map((domain) => domain.id);

export const patronSources: PatronSource[] = [
  { id: "nagakabouros", name: "Nagakabouros", kind: "Bilgewater inancı", description: "Yaşamı sürekli hareket, sınanma ve değişim olarak yorumlayan kadim irade.", domains: ["degisim", "doga"] },
  { id: "kindred", name: "Kindred", kind: "Ölümün ruhsal ikilisi", description: "Ölümün birbirini tamamlayan iki yüzünü ve kaçınılmaz geçişi temsil eder.", domains: ["olum"] },
  { id: "janna", name: "Janna", kind: "Rüzgâr ruhu", description: "Umudu, temiz havayı ve korunmaya muhtaç insanlara uzanan yardımı simgeler.", domains: ["koruma", "degisim", "doga"] },
  { id: "ornn", name: "Ornn", kind: "Freljord yarı-tanrısı", description: "Zanaatın, ateşin, emeğin ve sessiz dayanıklılığın kaynağıdır.", domains: ["zanaat", "koruma"] },
  { id: "anivia", name: "Anivia", kind: "Freljord ruh-tanrıçası", description: "Kış, umut, fedakârlık ve yeniden doğuş döngüsüyle anılır.", domains: ["koruma", "doga", "olum"] },
  { id: "volibear", name: "Volibear", kind: "Freljord ruh-tanrısı", description: "Fırtınanın, yabanıl gücün ve eski dünyanın dizginlenemez yüzüdür.", domains: ["savas", "doga"] },
  { id: "targon", name: "Targon Sureti", kind: "Göksel irade", description: "Bir yıldız kavramının veya göksel idealin ölümlü dünyadaki yankısıdır.", domains: ["koruma", "savas", "bilgi", "olum", "yildizlar"] },
  { id: "iblis", name: "İblis veya Azakana", kind: "Duyguyla beslenen varlık", description: "Korku, sır, arzu veya başka bir yoğun duyguyla yapılan tehlikeli pakt.", domains: ["savas", "degisim", "bilgi", "olum"] },
  { id: "hiclik-varligi", name: "Hiçlik Varlığı", kind: "Yabancı irade", description: "Dünyanın düzenine yabancı, anlaşılması ve kontrol edilmesi riskli bir güç.", domains: ["degisim", "bilgi", "olum", "yildizlar"] },
  { id: "kadim-buyu", name: "Kadim Büyü", kind: "Bilinçli güç kaynağı", description: "Bir rün ağı, mühürlü silah, yaşayan büyü veya unutulmuş büyü odağı.", domains: ["savas", "degisim", "bilgi", "doga", "yildizlar", "zanaat"] },
  { id: "ruh-ata", name: "Ruh veya Ata", kind: "Ruhsal gelenek", description: "Belirli bir yerin ruhu, aile atası ya da topluluğun ortak hafızası.", domains: ["koruma", "bilgi", "doga", "olum"] },
  { id: "yemin", name: "Yemin veya İdeal", kind: "Tanrısız inanç", description: "Bir ilaha değil; merhamet, adalet, özgürlük veya birlik gibi bir ideale bağlılık.", domains: allDomainIds },
  { id: "ozgun", name: "Özgün Aşkın Varlık", kind: "GM ile oluştur", description: "Kampanyaya ait ilah, ruh, kozmik irade, kadim güç veya açıklanamayan kaynak.", domains: allDomainIds },
];

export const patronBonds = [
  "Sadık hizmetkâr",
  "İsteksiz seçilmiş",
  "Sorgulayan mürid",
  "Terk edilmiş elçi",
  "Borçlu taşıyıcı",
  "Bağı koparmak isteyen",
];

export const ancestryAbilityKeywords: Record<string, string[]> = {
  insan: [],
  yordle: ["büyü", "hareket", "yanılsama", "görünmez"],
  vastaya: ["ruh", "doğa", "hayvan", "duyu"],
  minotaur: ["darbe", "it", "güç", "koru"],
  troll: ["soğuk", "dayan", "iyileş", "direnç"],
  mutant: ["zehir", "asit", "kimya", "dönüş", "iyileş"],
  yeti: ["soğuk", "buz", "kar", "koru", "ruh"],
  ruh: ["ruh", "ölüm", "görünmez", "lanet", "ışınlan"],
  havari: ["ruh", "ışık", "kozmik", "işaret", "kader"],
};

export function patronDisplayName(patronId?: string, customName?: string) {
  if (patronId === "ozgun") return customName?.trim() || "Özgün Aşkın Varlık";
  return patronSources.find((source) => source.id === patronId)?.name ?? "Seçilmemiş";
}
