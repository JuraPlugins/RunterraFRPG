export const progression: Record<string, string[]> = {
  savasci: ["Efor ve Manevralar", "Atılım", "Uzmanlık", "Yetenek Artışı", "Ek Saldırı", "Uzmanlık II", "Sarsılmaz", "Yetenek Artışı", "Efor d8", "Uzmanlık III", "Üçüncü Saldırı", "Yetenek Artışı", "Efor d10", "Uzmanlık IV", "İkinci Atılım", "Yetenek Artışı", "Efor d12", "Uzmanlık V", "Yetenek Artışı", "Savaşın Efendisi"],
  duzenbaz: ["Momentum ve Hassas Darbe", "Kurnaz Eylem", "Uzmanlık", "Yetenek Artışı", "Hassas Darbe 2d6", "Uzmanlık II", "Kaçınma", "Yetenek Artışı", "Hassas Darbe 3d6", "Uzmanlık III", "Hassas Darbe 4d6", "Yetenek Artışı", "Güvenilir Yetenek", "Uzmanlık IV", "Dokunulmaz Adım", "Yetenek Artışı", "Hassas Darbe 6d6", "Uzmanlık V", "Yetenek Artışı", "Kusursuz Fırsat"],
  avci: ["Odak ve Av İşareti", "Avcı Teknikleri", "Uzmanlık", "Yetenek Artışı", "Ek Saldırı", "Uzmanlık II", "Arazi Ustası", "Yetenek Artışı", "Üstün İz", "Uzmanlık III", "Kesintisiz Av", "Yetenek Artışı", "Yırtıcı Sezgi", "Uzmanlık IV", "Avın Sonu", "Yetenek Artışı", "Efsanevi Avcı", "Uzmanlık V", "Yetenek Artışı", "İlk Avcı"],
  buyucu: ["Büyü Kullanımı", "Büyü Yenileme", "Uzmanlık", "Yetenek Artışı", "3. derece büyü", "Uzmanlık II", "Karşı Büyü", "Yetenek Artışı", "5. derece büyü", "Uzmanlık III", "6. derece büyü", "Yetenek Artışı", "7. derece büyü", "Uzmanlık IV", "8. derece büyü", "Yetenek Artışı", "9. derece büyü", "Uzmanlık V", "Yetenek Artışı", "Başbüyücü"],
  ruhban: ["Lütuf ve Dualar", "İnanç Kanalı", "Uzmanlık", "Yetenek Artışı", "Güçlü Dua", "Uzmanlık II", "Sarsılmaz İnanç", "Yetenek Artışı", "Lütuf Artışı", "Uzmanlık III", "Büyük Dua", "Yetenek Artışı", "İlahi Direnç", "Uzmanlık IV", "Yenilmez İrade", "Yetenek Artışı", "Efsanevi Dua", "Uzmanlık V", "Yetenek Artışı", "İnancın Sesi"],
  mucit: ["Yük ve Cihazlar", "Hızlı Kurulum", "Uzmanlık", "Yetenek Artışı", "Gelişmiş Cihaz", "Uzmanlık II", "Alan Onarımı", "Yetenek Artışı", "Yük Artışı", "Uzmanlık III", "Usta Cihaz", "Yetenek Artışı", "Kusursuz Prototip", "Uzmanlık IV", "Zincirleme Cihaz", "Yetenek Artışı", "Efsanevi İcat", "Uzmanlık V", "Yetenek Artışı", "Büyük Mucit"],
};

export const advancementLevels = [4, 8, 12, 16, 19];
export function abilityTier(level: number) { return level >= 16 ? 4 : level >= 12 ? 3 : level >= 8 ? 2 : level >= 4 ? 1 : 0; }
export function tierFromText(tier: string) { if (tier.includes("IV")) return 4; if (tier.includes("III")) return 3; if (tier.includes("II")) return 2; return 1; }

export const skillBranches: Record<string, { name: string; keywords: string[] }[]> = {
  savasci: [{ name: "Silah Ustalığı", keywords: ["saldırı", "fiziksel", "silah", "darbe"] }, { name: "Öncülük", keywords: ["müttefik", "koru", "kalkan", "hasarı azalt"] }, { name: "Sarsılmazlık", keywords: ["direnç", "geçici cp", "dayan", "iyileş"] }],
  duzenbaz: [{ name: "Gölge", keywords: ["gizli", "görünmez", "gölge", "karanlık"] }, { name: "Hareket", keywords: ["hareket", "ışınlan", "atıl", "hız"] }, { name: "Hassasiyet", keywords: ["kritik", "tek hedef", "işaret", "isabet"] }],
  avci: [{ name: "Av", keywords: ["işaret", "hedef", "iz", "ok", "menzilli"] }, { name: "Doğa", keywords: ["doğa", "hayvan", "zehir", "arazi"] }, { name: "Ruh Bağı", keywords: ["ruh", "çağır", "yoldaş", "iyileş"] }],
  buyucu: [{ name: "Element", keywords: ["ateş", "soğuk", "yıldırım", "element", "enerji"] }, { name: "Rün", keywords: ["rün", "büyü", "ark", "söküm"] }, { name: "Kontrol", keywords: ["kurtarma", "alan", "yoğunlaşma", "yanılsama"] }],
  ruhban: [{ name: "Şifa", keywords: ["iyileş", "cp kazan", "şifa", "arındır"] }, { name: "Koruma", keywords: ["koru", "direnç", "kalkan", "hasarı azalt"] }, { name: "Ruh", keywords: ["ruh", "ışık", "ölüm", "müttefik"] }],
  mucit: [{ name: "Hextech", keywords: ["enerji", "ışınlan", "kalkan", "teknoloji"] }, { name: "Kimya", keywords: ["zehir", "asit", "iyileş", "karışım"] }, { name: "Düzenek", keywords: ["bomba", "tuzak", "alan", "cihaz"] }],
};
