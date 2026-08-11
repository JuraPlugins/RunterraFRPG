export const abilityKeys = ["guc", "ceviklik", "dayaniklilik", "zeka", "sezgi", "karizma"] as const;
export type AbilityKey = (typeof abilityKeys)[number];

export const abilityLabels: Record<AbilityKey, string> = {
  guc: "Güç",
  ceviklik: "Çeviklik",
  dayaniklilik: "Dayanıklılık",
  zeka: "Zekâ",
  sezgi: "Sezgi",
  karizma: "Karizma",
};

export const scoreCosts: Record<number, number> = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };

export const ancestries = [
  {
    id: "insan",
    name: "İnsan",
    size: "Orta",
    speed: 9,
    trait: "Uyarlanabilir",
    description: "Bölge ve sınıftan kazanmadığın bir beceride uzmanlık kazan.",
  },
  {
    id: "yordle",
    name: "Yordle",
    size: "Küçük",
    speed: 7.5,
    trait: "Küçük ve Çevik",
    description: "Büyük düşmanların alanından geçebilir, uygun bir yaratığın arkasında saklanmayı deneyebilirsin.",
  },
  {
    id: "vastaya",
    name: "Vastaya",
    size: "Orta",
    speed: 9,
    trait: "Keskin Duyu",
    description: "Görme, işitme veya koku seç; bu duyuya dayanan Algı kontrollerinde avantaj kazan.",
  },
  {
    id: "minotaur",
    name: "Minotaur",
    size: "Orta",
    speed: 9,
    trait: "Güçlü Yapı",
    description: "Taşıma, itme, çekme ve kaldırma sınırlarında bir boyut büyük sayılırsın.",
  },
  {
    id: "troll",
    name: "Troll",
    size: "Orta",
    speed: 9,
    trait: "Sert İklim",
    description: "Doğal soğuk ve bozulmuş yiyecek kaynaklı kurtarmalarda avantaj kazan.",
  },  {
    id: "mutant",
    name: "Mutant",
    size: "Orta",
    speed: 9,
    trait: "Kimyasal Adaptasyon",
    description: "Zaun'a özgü soy. Kimyasal kirlilik, duman ve endüstriyel toksin kaynaklı Dayanıklılık kurtarmalarında avantaj kazan.",
  },
  {
    id: "yeti",
    name: "Yeti",
    size: "Orta",
    speed: 9,
    trait: "Kar Basışı",
    description: "Doğal kar ve buzdan oluşan zorlu arazi hareketine ek maliyet getirmez.",
  },
  {
    id: "ruh",
    name: "Ruh",
    size: "Orta",
    speed: 9,
    trait: "Ruhsal İz",
    description: "Uzun mola başına bir kez ruh, lanet veya duygusal kalıntı arayan bir kontrolde avantaj kazan.",
  },
  {
    id: "havari",
    name: "Havari",
    size: "Orta",
    speed: 9,
    trait: "Aşkın Yankı",
    description: "Uzun mola başına bir kez bağlı olduğun aşkın varlığın alanıyla ilgili Büyü Bilgisi veya İnanç ve Ruhlar kontrolünde avantaj kazan.",
  },
] as const;

export const regions = [
  {
    id: "bandle-city",
    name: "Bandle City",
    skills: ["Büyü Bilgisi", "Gizlilik", "Performans"],
    trait: "Tuhaf Yollar",
    description: "Günde bir kez büyülü geçit, yön duygusu veya olağandışı mekân kontrolünde avantaj.",
    aspects: ["Dünya Göründüğünden Daha Büyük", "Hiçbir Kapı Tek Bir Yere Açılmaz", "Merakım Beni Eve Götürür"],
    gifts: ["Gezgin yordle", "Renk değiştiren pusula", "Beklenenden geniş küçük çanta"],
    color: "#b96de0",
  },
  {
    id: "bilgewater",
    name: "Bilgewater",
    skills: ["Atletizm", "Gözdağı", "Hayatta Kalma"],
    trait: "Liman Sezgisi",
    description: "Günde bir kez denizcilik, liman suçları veya pazarlık kontrolünde avantaj.",
    aspects: ["Borçlar Gelgit Gibi Geri Döner", "Şans Cesurları Sever", "Her Limanda Bir Düşmanım Var"],
    gifts: ["Gemi tayfası", "İşaretli iskambil destesi", "Deniz canavarı dişinden bıçak"],
    color: "#5ab6af",
  },
  {
    id: "demacia",
    name: "Demacia",
    skills: ["Tarih", "İçgörü", "İkna"],
    trait: "Düzenin Dili",
    description: "Günde bir kez hukuk, asalet, askerî protokol veya kurum kontrolünde avantaj.",
    aspects: ["Adalet Herkes İçin Aynı Olmalı", "Görev Duygularımdan Önce Gelir", "Büyüden Korkmam Öğretildi"],
    gifts: ["Yerel görevli", "Mühürlü hizmet belgesi", "Petricite kırıntılı aile yadigârı"],
    color: "#d8c889",
  },
  {
    id: "freljord",
    name: "Freljord",
    skills: ["Atletizm", "Hayvan İdaresi", "Hayatta Kalma"],
    trait: "Kışta Doğan",
    description: "Doğal soğuk ve karda savaş dışı kontrollere avantaj; normal kış yolculuğu durdurmaz.",
    aspects: ["Kışa Karşı Birlikte Dururuz", "Gücümü Kabilem İçin Taşırım", "Eski Ruhlar Bizi İzliyor"],
    gifts: ["Kabile büyüğü", "Kemik tılsım", "Sıcak tutan ağır kürk"],
    color: "#8bd7ec",
  },
  {
    id: "ionia",
    name: "Ionia",
    skills: ["Büyü Bilgisi", "Doğa", "İçgörü"],
    trait: "Ruhsal Uyum",
    description: "Günde bir kez ruhsal dengesizlik, canlı çevre veya duygu akışı kontrolünde avantaj.",
    aspects: ["Denge Hareketsizlik Değildir", "Savaş Bitti Ama İçimde Sürüyor", "Ruhlar Her Kararı Hatırlar"],
    gifts: ["Köy ustası", "Meditasyon boncuğu", "Canlı ağaçtan oyulmuş araç"],
    color: "#e580a8",
  },
  {
    id: "ixtal",
    name: "Ixtal",
    skills: ["Büyü Bilgisi", "Doğa", "İnceleme"],
    trait: "Element Okuması",
    description: "Günde bir kez doğal tehlike, element izi veya gizli çevresel düzen kontrolünde avantaj.",
    aspects: ["Dış Dünya Ne Kadarını Bilmeli?", "Elementler Yalan Söylemez", "Geleneği Korumak Değişmemek Değildir"],
    gifts: ["Element öğretmeni", "Kristal ölçüm taşı", "Sarmaşıktan örülmüş araç"],
    color: "#4fc587",
  },
  {
    id: "noxus",
    name: "Noxus",
    skills: ["Atletizm", "Gözdağı", "Tarih"],
    trait: "Liyakat Ağı",
    description: "Günde bir kez askerî hiyerarşi, güç dengesi, arena veya lonca kontrolünde avantaj.",
    aspects: ["Güç Kazanılır, Verilmez", "İmparatorluk Bana Bir Yer Açtı", "Zaferin Bedelini Ben Bilirim"],
    gifts: ["Eski birlik arkadaşı", "Kazanılmış rütbe işareti", "Fetih bölgesinden hatıra"],
    color: "#b94b52",
  },
  {
    id: "piltover",
    name: "Piltover",
    skills: ["İnceleme", "İkna", "Teknoloji"],
    trait: "Akademik Erişim",
    description: "Günde bir kez akademi, ticaret evi, patent veya karmaşık aygıt kontrolünde avantaj.",
    aspects: ["İlerlemenin Bir Bedeli Vardır", "İtibar Kapıları Açar", "Her Sorunun Zarif Bir Çözümü Olmalı"],
    gifts: ["Akademi asistanı", "Prototip lisansı", "Hassas ölçüm takımı"],
    color: "#c9a85c",
  },
  {
    id: "shadow-isles",
    name: "Shadow Isles",
    skills: ["Büyü Bilgisi", "Gizlilik", "İnanç ve Ruhlar"],
    trait: "Sis Sezgisi",
    description: "Günde bir kez hayalet, lanet, anı kalıntısı veya ruhsal geçit kontrolünde avantaj.",
    aspects: ["Sis Benden Bir Şey Aldı", "Ölüler Her Zaman Sessiz Değildir", "Hatırlamak Beni İnsan Tutar"],
    gifts: ["Huzursuz ruh", "Kararmış hatıra", "Sisi dağıtan fener"],
    color: "#54bfa9",
  },
  {
    id: "shurima",
    name: "Shurima",
    skills: ["Hayatta Kalma", "Tarih", "İnanç ve Ruhlar"],
    trait: "Çöl Hafızası",
    description: "Günde bir kez çöl yolculuğu, kadim harabe veya kayıp hanedan kontrolünde avantaj.",
    aspects: ["Küllerin Altında Bir İmparatorluk Uyuyor", "Geçmiş Miras Değil Sorumluluktur", "Çöl Sabırsızları Yutar"],
    gifts: ["Kervan rehberi", "Hanedan sikkesi", "Kum geçirmez keşif örtüsü"],
    color: "#d8ad4e",
  },
  {
    id: "targon",
    name: "Targon",
    skills: ["Atletizm", "Hayatta Kalma", "İnanç ve Ruhlar"],
    trait: "Yıldız Rehberi",
    description: "Açık gökte yönünü bil; günde bir kez kozmik işaret, tırmanış veya kutsal gelenekte avantaj.",
    aspects: ["Zirve Beni Hâlâ Çağırıyor", "Gökyüzü Kader Değil Rehberdir", "İnancım Sınandıkça Keskinleşir"],
    gifts: ["Dağ rehberi", "Yıldız haritası", "Tırmanış kancası"],
    color: "#788de0",
  },
  {
    id: "zaun",
    name: "Zaun",
    skills: ["El Çabukluğu", "Tıp", "Teknoloji"],
    trait: "Altşehir Direnci",
    description: "Günde bir kez toksin, hurda mekanizma, dar sokak veya yeraltı ağı kontrolünde avantaj.",
    aspects: ["Burada Hayatta Kalmak Bir İcat İşidir", "Kimse Bizi Yukarıdan Kurtarmayacak", "Her Şeyin İkinci Bir Kullanımı Vardır"],
    gifts: ["Sokak doktoru", "Filtreli maske", "Çok amaçlı hurda takım"],
    color: "#83b94b",
  },
] as const;

export const classes = [
  {
    id: "savasci",
    name: "Savaşçı",
    role: "Ön hat ve silah kontrolü",
    hitDie: 10,
    hpBase: 10,
    hpPerLevel: 6,
    saves: ["Güç", "Dayanıklılık"],
    skills: ["Atletizm", "Gözdağı", "Hayatta Kalma", "İçgörü", "Algı"],
    skillCount: 2,
    primary: "Güç veya Çeviklik",
    resource: "Efor",
    resourceBase: "prof",
    specializations: ["Öncü", "Silah Ustası"],
    armor: "Orta zırh ve kalkan",
    defense: "medium-shield",
    equipment: "Orta zırh, kalkan, uzun kılıç veya büyük balta; kısa yay; gezgin paketi",
    accent: "#c88b46",
  },
  {
    id: "duzenbaz",
    name: "Düzenbaz",
    role: "Hareket, beceri ve tek hedef",
    hitDie: 8,
    hpBase: 8,
    hpPerLevel: 5,
    saves: ["Çeviklik", "Zekâ"],
    skills: ["Akrobasi", "Aldatma", "El Çabukluğu", "Gizlilik", "İnceleme", "İçgörü", "İkna", "Teknoloji"],
    skillCount: 4,
    primary: "Çeviklik",
    resource: "Momentum",
    resourceBase: "prof",
    specializations: ["Gölge", "Silahşör"],
    armor: "Hafif zırh",
    defense: "light",
    equipment: "Hafif zırh; kısa kılıç ve iki hançer veya kısa yay; hırsız ya da kâşif paketi",
    accent: "#9d75d8",
  },
  {
    id: "avci",
    name: "Avcı",
    role: "Takip, işaret ve saha desteği",
    hitDie: 10,
    hpBase: 10,
    hpPerLevel: 6,
    saves: ["Çeviklik", "Sezgi"],
    skills: ["Algı", "Atletizm", "Doğa", "Gizlilik", "Hayvan İdaresi", "Hayatta Kalma", "Tıp"],
    skillCount: 3,
    primary: "Sezgi",
    resource: "Odak",
    resourceBase: "prof",
    specializations: ["Canavar Avcısı", "Ruh Bağlı"],
    armor: "Orta zırh",
    defense: "medium",
    equipment: "Hafif veya orta zırh; uzun yay veya iki kısa kılıç; avcı paketi",
    accent: "#5fa16c",
  },
  {
    id: "buyucu",
    name: "Büyücü",
    role: "Alan, kontrol ve büyü çeşitliliği",
    hitDie: 6,
    hpBase: 6,
    hpPerLevel: 4,
    saves: ["Zekâ", "Sezgi"],
    skills: ["Büyü Bilgisi", "İnceleme", "Tarih", "Teknoloji", "İçgörü", "İnanç ve Ruhlar"],
    skillCount: 2,
    primary: "Zekâ",
    resource: "Büyü Yuvaları",
    resourceBase: "slots",
    specializations: ["Elementalist", "Rün Dokuyucu"],
    armor: "Zırh yok",
    defense: "none",
    equipment: "Hançer veya sopa; büyü odağı; bilgin paketi; büyü kitabı",
    accent: "#5b91df",
  },
  {
    id: "ruhban",
    name: "Ruhban",
    role: "Koruma, iyileştirme ve ruhlar",
    hitDie: 8,
    hpBase: 8,
    hpPerLevel: 5,
    saves: ["Sezgi", "Karizma"],
    skills: ["İçgörü", "İkna", "İnanç ve Ruhlar", "Tarih", "Tıp"],
    skillCount: 3,
    primary: "Sezgi",
    resource: "Lütuf",
    resourceBase: "prof",
    specializations: ["Koruyucu", "Ruh Rehberi"],
    armor: "Orta zırh ve kalkan",
    defense: "medium-shield",
    equipment: "Orta veya hafif zırh; kalkan ve savaş çekici veya kısa yay; şifacı paketi",
    accent: "#d0b763",
  },
  {
    id: "mucit",
    name: "Mucit",
    role: "Cihaz, konum ve destek",
    hitDie: 8,
    hpBase: 8,
    hpPerLevel: 5,
    saves: ["Çeviklik", "Zekâ"],
    skills: ["El Çabukluğu", "İnceleme", "Tıp", "Teknoloji", "Büyü Bilgisi"],
    skillCount: 3,
    primary: "Zekâ",
    resource: "Yük",
    resourceBase: "prof+2",
    specializations: ["Hextech Ustası", "Kimyager"],
    armor: "Hafif zırh",
    defense: "light",
    equipment: "Hafif zırh; arbalet veya tabanca; hançer; zanaat takımı; mucit paketi",
    accent: "#4eabb1",
  },{
    id: "dovus-ustasi", name: "Dövüş Ustası", role: "Kombolar, hareket ve çıplak dövüş", hitDie: 8, hpBase: 8, hpPerLevel: 5,
    saves: ["Çeviklik", "Sezgi"], skills: ["Akrobasi", "Atletizm", "Algı", "İçgörü", "Gizlilik", "İnanç ve Ruhlar"], skillCount: 3,
    primary: "Çeviklik veya Sezgi", resource: "Ritim", resourceBase: "prof+1", specializations: ["Ruh Yumruğu", "Savaş Dansçısı"],
    armor: "Zırh yok", defense: "unarmored-wis", equipment: "Dövüş asası veya iki hafif silah; sargılar; gezgin paketi", accent: "#d58a55",
  },
  {
    id: "yeminli", name: "Yeminli", role: "Ön hat, aura ve yemin gücü", hitDie: 10, hpBase: 10, hpPerLevel: 6,
    saves: ["Dayanıklılık", "Karizma"], skills: ["Atletizm", "Gözdağı", "İçgörü", "İkna", "İnanç ve Ruhlar", "Tıp"], skillCount: 2,
    primary: "Güç veya Karizma", resource: "Azim", resourceBase: "prof", specializations: ["Güneş Muhafızı", "İntikam Yemini"],
    armor: "Orta zırh ve kalkan", defense: "medium-shield", equipment: "Orta zırh; kalkan; uzun kılıç veya savaş çekici; kutsal/yemin odağı; gezgin paketi", accent: "#e0b84f",
  },
  {
    id: "ozan", name: "Ozan", role: "İlham, sosyal etki ve alan desteği", hitDie: 8, hpBase: 8, hpPerLevel: 5,
    saves: ["Çeviklik", "Karizma"], skills: ["Aldatma", "El Çabukluğu", "İçgörü", "İkna", "Performans", "Tarih", "Büyü Bilgisi"], skillCount: 4,
    primary: "Karizma", resource: "İlham", resourceBase: "prof+1", specializations: ["Savaş Ezgicisi", "Ruh Sanatçısı"],
    armor: "Hafif zırh", defense: "light", equipment: "Hafif zırh; rapier veya kısa yay; müzik aleti; gösteri paketi", accent: "#d36ba7",
  },
  {
    id: "antlasmali", name: "Antlaşmalı", role: "Pakt güçleri, lanet ve bedelli büyü", hitDie: 8, hpBase: 8, hpPerLevel: 5,
    saves: ["Sezgi", "Karizma"], skills: ["Aldatma", "Büyü Bilgisi", "Gözdağı", "İçgörü", "İnanç ve Ruhlar", "Tarih"], skillCount: 2,
    primary: "Karizma", resource: "Mühür", resourceBase: "prof", specializations: ["Karanlık Aracı", "Zincir Kıran"],
    armor: "Hafif zırh", defense: "light", equipment: "Hafif zırh; hançer veya asa; pakt odağı; bilgin paketi", accent: "#7956b5",
  },
  {
    id: "sekil-degistirici", name: "Şekil Değiştirici", role: "Dönüşüm, dayanıklılık ve yırtıcı hücum", hitDie: 10, hpBase: 10, hpPerLevel: 6,
    saves: ["Dayanıklılık", "Sezgi"], skills: ["Akrobasi", "Algı", "Atletizm", "Doğa", "Gizlilik", "Hayatta Kalma", "Hayvan İdaresi"], skillCount: 3,
    primary: "Sezgi", resource: "Vahşet", resourceBase: "prof", specializations: ["Yabanbiçim", "Kadim Kan"],
    armor: "Hafif zırh", defense: "light", equipment: "Hafif zırh; mızrak veya iki pençe bıçağı; avcı paketi", accent: "#6e9d55",
  },
  {
    id: "cagirici", name: "Çağırıcı", role: "Yoldaş, ruh ve savaş alanı komutası", hitDie: 8, hpBase: 8, hpPerLevel: 5,
    saves: ["Zekâ", "Sezgi"], skills: ["Büyü Bilgisi", "Doğa", "Hayvan İdaresi", "İnanç ve Ruhlar", "İnceleme", "Tarih"], skillCount: 3,
    primary: "Zekâ veya Sezgi", resource: "Komuta", resourceBase: "prof+2", specializations: ["Sürü Efendisi", "Ruh Kapısı"],
    armor: "Hafif zırh", defense: "light", equipment: "Hafif zırh; asa veya kısa yay; çağırma odağı; bilgin paketi", accent: "#55a9a0",
  },
{
    id: "barbar", name: "Barbar", role: "Öfke, dayanıklılık ve yıkıcı darbeler", hitDie: 12, hpBase: 12, hpPerLevel: 7,
    saves: ["Güç", "Dayanıklılık"], skills: ["Algı", "Atletizm", "Doğa", "Gözdağı", "Hayatta Kalma", "Hayvan İdaresi"], skillCount: 3,
    primary: "Güç", resource: "Öfke", resourceBase: "prof", specializations: ["Çılgın Savaşçı", "Totem Taşıyıcı"],
    armor: "Hafif, orta ve kalkan", defense: "barbarian", equipment: "Post zırh veya zırhsız savunma; büyük balta veya iki el baltası; dört cirit; gezgin paketi", accent: "#b95643",
  },] as const;

export const mageSlots = [
  [2, 0, 0, 0, 0, 0, 0, 0, 0], [3, 0, 0, 0, 0, 0, 0, 0, 0],
  [4, 2, 0, 0, 0, 0, 0, 0, 0], [4, 3, 0, 0, 0, 0, 0, 0, 0],
  [4, 3, 2, 0, 0, 0, 0, 0, 0], [4, 3, 3, 0, 0, 0, 0, 0, 0],
  [4, 3, 3, 1, 0, 0, 0, 0, 0], [4, 3, 3, 2, 0, 0, 0, 0, 0],
  [4, 3, 3, 3, 1, 0, 0, 0, 0], [4, 3, 3, 3, 2, 0, 0, 0, 0],
  [4, 3, 3, 3, 2, 1, 0, 0, 0], [4, 3, 3, 3, 2, 1, 0, 0, 0],
  [4, 3, 3, 3, 2, 1, 1, 0, 0], [4, 3, 3, 3, 2, 1, 1, 0, 0],
  [4, 3, 3, 3, 2, 1, 1, 1, 0], [4, 3, 3, 3, 2, 1, 1, 1, 0],
  [4, 3, 3, 3, 2, 1, 1, 1, 1], [4, 3, 3, 3, 3, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 1, 1, 1], [4, 3, 3, 3, 3, 2, 2, 1, 1],
] as const;

export const packs = ["Gezgin", "Hırsız", "Kâşif/Avcı", "Bilgin", "Şifacı", "Mucit", "Gösteri", "Mistik", "Diplomat", "Çağırıcı"];

export function modifier(score: number) {
  return Math.floor((score - 10) / 2);
}

export function proficiency(level: number) {
  return 2 + Math.floor((level - 1) / 4);
}

export function classPowerModifier(classId: string, abilities: Record<AbilityKey, number>) {
  const mods = Object.fromEntries(abilityKeys.map((key) => [key, modifier(abilities[key])])) as Record<AbilityKey, number>;
  if (["buyucu", "mucit"].includes(classId)) return mods.zeka;
  if (classId === "cagirici") return Math.max(mods.zeka, mods.sezgi);
  if (["ruhban", "avci", "sekil-degistirici"].includes(classId)) return mods.sezgi;
  if (classId === "duzenbaz") return mods.ceviklik;
  if (classId === "dovus-ustasi") return Math.max(mods.ceviklik, mods.sezgi);
  if (classId === "yeminli") return Math.max(mods.guc, mods.karizma);
  if (["ozan", "antlasmali"].includes(classId)) return mods.karizma;
  if (classId === "barbar") return mods.guc;
  return Math.max(mods.guc, mods.ceviklik);
}

export function classResourceCapacity(classId: string, resourceBase: string, level: number) {
  if (resourceBase === "slots") return 0;
  const offset = resourceBase === "prof+2" ? 2 : resourceBase === "prof+1" ? 1 : 0;
  return proficiency(level) + offset + (classId === "ruhban" && level >= 9 ? 1 : 0);
}