export type LoadoutPower = {
  id: string;
  name: string;
  action: string;
  range: string;
  effect: string;
  cost: string;
  level: number;
  slotLevel?: number;
  cooldown?: "turn" | "short" | "long" | "none";
};

export const mageSpells: LoadoutPower[] = [
  { id: "SPELL-MAGIC-MISSILE", name: "Büyü Oku", action: "Ana Aksiyon", range: "36 m", effect: "Gördüğün hedeflere bölüştürülen üç ok gönder; her ok otomatik 1d4 + 1 enerji hasarı verir.", cost: "1. derece büyü yuvası", level: 1, slotLevel: 1 },
  { id: "SPELL-ELEMENT-WAVE", name: "Element Dalgası", action: "Ana Aksiyon", range: "4,5 m koni", effect: "Alandakiler ÇEV kurtarır; 2d6 ateş, soğuk veya yıldırım hasarı alır, başarıda yarısı.", cost: "1. derece büyü yuvası", level: 1, slotLevel: 1 },
  { id: "SPELL-SHIELD", name: "Kalkan", action: "Tepki", range: "Kendin", effect: "İsabet aldığında sonraki turunun başına kadar +5 SS kazan; bonus tetikleyen saldırıya da uygulanır.", cost: "1. derece büyü yuvası", level: 1, slotLevel: 1 },
  { id: "SPELL-FOG-VEIL", name: "Sis Perdesi", action: "Ana Aksiyon", range: "18 m", effect: "3 m yarıçapta bir dakika yoğun sis oluştur; konsantrasyon gerekir.", cost: "1. derece büyü yuvası", level: 1, slotLevel: 1 },
  { id: "SPELL-QUICK-STEP", name: "Hızlı Adım", action: "Hızlı Aksiyon", range: "Kendin", effect: "9 m içindeki gördüğün boş bir alana ışınlan.", cost: "1. derece büyü yuvası", level: 1, slotLevel: 1 },
  { id: "SPELL-SLEEP-RUNE", name: "Uyku Rünü", action: "Ana Aksiyon", range: "18 m", effect: "3 m alandakiler SEZ kurtarır; başarısız olan sonraki turunun sonuna kadar Baygın olur. Hasar durumu bitirir.", cost: "1. derece büyü yuvası", level: 1, slotLevel: 1 },
  { id: "SPELL-DETECT-MAGIC", name: "Büyü Algısı", action: "Ana Aksiyon", range: "Kendin", effect: "Konsantrasyonla 10 dakika 9 m içindeki etkin büyülerin yönünü hissedersin.", cost: "1. derece büyü yuvası", level: 1, slotLevel: 1 },
  { id: "SPELL-RUNE-ARMOR", name: "Rün Zırhı", action: "Ana Aksiyon", range: "Dokunma", effect: "Zırhsız hedefin SS'si 8 saat boyunca 13 + ÇEV olur.", cost: "1. derece büyü yuvası", level: 1, slotLevel: 1 },
  { id: "SPELL-DESTRUCTIVE-ORB", name: "Yıkıcı Küre", action: "Ana Aksiyon", range: "27 m", effect: "Bir büyü saldırısı yap; isabette 3d8 ateş, soğuk veya yıldırım hasarı ver.", cost: "2. derece büyü yuvası", level: 3, slotLevel: 2 },
  { id: "SPELL-BINDING-RUNE", name: "Bağlayıcı Rün", action: "Ana Aksiyon", range: "18 m", effect: "Hedef GÜÇ kurtarır; başarısızsa Kısıtlanmış olur ve her tur sonunda tekrar kurtarır. Konsantrasyon, bir dakika.", cost: "2. derece büyü yuvası", level: 3, slotLevel: 2 },
  { id: "SPELL-INVISIBILITY", name: "Görünmezlik", action: "Ana Aksiyon", range: "Dokunma", effect: "Hedef bir saat Görünmez olur; saldırı veya düşmanca güç etkiyi bitirir. Konsantrasyon gerekir.", cost: "2. derece büyü yuvası", level: 3, slotLevel: 2 },
  { id: "SPELL-MIRROR-IMAGES", name: "Ayna Suretleri", action: "Ana Aksiyon", range: "Kendin", effect: "Üç suret oluştur. Sana isabet eden saldırıda d6 at; 3+ ise bir suret yok olur ve saldırı ıskalar.", cost: "2. derece büyü yuvası", level: 3, slotLevel: 2 },
  { id: "SPELL-MIND-WAVE", name: "Zihin Dalgası", action: "Ana Aksiyon", range: "9 m", effect: "Hedef ZEK kurtarır; 3d6 psişik hasar alır ve Tepki kullanamaz, başarıda yarı hasar.", cost: "2. derece büyü yuvası", level: 3, slotLevel: 2 },
  { id: "SPELL-WIND-STEP", name: "Rüzgâr Adımı", action: "Hızlı Aksiyon", range: "Kendin", effect: "Bu tur 12 m uçuş hızı kazan; tur sonunda yere inmezsen düşersin.", cost: "2. derece büyü yuvası", level: 3, slotLevel: 2 },
];

export const clericPrayers: LoadoutPower[] = [
  { id: "PRAYER-HEALING-WORD", name: "Şifa Sözü", action: "Hızlı Aksiyon", range: "9 m", effect: "Hedef 1d8 + SEZ CP kazanır; aynı hedef uzun mola başına bir kez yararlanabilir.", cost: "1 Lütuf", level: 1 },
  { id: "PRAYER-PROTECTION", name: "Koruma", action: "Tepki", range: "9 m", effect: "Bir müttefike gelen hasarı 1d8 + SEZ azalt.", cost: "1 Lütuf", level: 1 },
  { id: "PRAYER-COURAGE", name: "Cesaret", action: "Ana Aksiyon", range: "9 m", effect: "Hedef bir dakika korkuya bağışık olur ve ilk kurtarmasına 1d4 ekler; konsantrasyon gerekir.", cost: "1 Lütuf", level: 1 },
  { id: "PRAYER-CLEANSE", name: "Arındırma", action: "Ana Aksiyon", range: "Dokunma", effect: "Hedefteki Zehirlenmiş veya Korkmuş durumunu bitir.", cost: "1 Lütuf", level: 1 },
  { id: "PRAYER-JUDGMENT", name: "Yargı", action: "Ana Aksiyon", range: "18 m", effect: "Hedef SEZ kurtarır; 2d8 ruh hasarı alır, başarıda yarısı.", cost: "1 Lütuf", level: 1 },
  { id: "PRAYER-GUIDANCE", name: "Rehberlik", action: "Ana Aksiyon", range: "9 m", effect: "Hedefin 10 dakika içindeki bir beceri kontrolüne 1d6 ekle; konsantrasyon gerekir.", cost: "1 Lütuf", level: 1 },
  { id: "PRAYER-SANCTUARY", name: "Sığınak", action: "Ana Aksiyon", range: "9 m", effect: "Hedefe saldırmak isteyen düşman SEZ kurtarır; başaramazsa başka hedef seçer. Korunan hedef saldırınca biter.", cost: "1 Lütuf", level: 1 },
  { id: "PRAYER-SPEAK-SPIRITS", name: "Ruhlarla Konuşma", action: "Ana Aksiyon", range: "Sahne", effect: "Sahnedeki zayıf ruh iziyle üç soru-cevaplık kısa temas kur.", cost: "1 Lütuf", level: 1 },
];

export const inventorDevices: LoadoutPower[] = [
  { id: "DEVICE-SHOCK-COIL", name: "Şok Bobini", action: "Ana Aksiyon", range: "18 m", effect: "Bir cihaz saldırısı yap; isabette 2d6 yıldırım hasarı ver ve hedef Tepki kullanamasın.", cost: "1 Yük", level: 1 },
  { id: "DEVICE-STICKY-BOMB", name: "Yapışkan Bomba", action: "Ana Aksiyon", range: "18 m", effect: "Hedef ÇEV kurtarır; başarısızsa hızı 0 olur ve tur sonunda GÜÇ kurtarmasıyla etkiyi bitirir.", cost: "1 Yük", level: 1 },
  { id: "DEVICE-FIELD-NEEDLE", name: "Saha İğnesi", action: "Ana Aksiyon", range: "Dokunma", effect: "Hedef 1d8 + ZEK CP kazanır; aynı hedef uzun mola başına bir kez yararlanabilir.", cost: "1 Yük", level: 1 },
  { id: "DEVICE-SMOKE-CAPSULE", name: "Duman Kapsülü", action: "Ana Aksiyon", range: "18 m", effect: "3 m yarıçapta bir tur yoğun duman oluştur.", cost: "1 Yük", level: 1 },
  { id: "DEVICE-THRUST-BELT", name: "İtki Kemeri", action: "Hızlı Aksiyon", range: "Kendin", effect: "6 m fırsat saldırısı doğurmadan hareket et.", cost: "1 Yük", level: 1 },
  { id: "DEVICE-GUARD-PLATE", name: "Koruyucu Plaka", action: "Tepki", range: "9 m", effect: "Hedef o saldırıya karşı +3 SS kazanır.", cost: "1 Yük", level: 1 },
  { id: "DEVICE-SCANNER", name: "Tarayıcı", action: "Ana Aksiyon", range: "9 m", effect: "10 dakika boyunca mekanizma, toksin veya büyü kaynağının yönünü gösterir.", cost: "1 Yük", level: 1 },
  { id: "DEVICE-AUTO-TRAP", name: "Otomatik Tuzak", action: "Ana Aksiyon", range: "Bitişik kare", effect: "Giren ilk yaratık ÇEV kurtarır; 2d6 delici hasar alır, başarıda yarısı.", cost: "1 Yük", level: 1 },
];

export const hunterTechniques: LoadoutPower[] = [
  { id: "HUNTER-HAMPERING-SHOT", name: "Engelleyici Atış", action: "İsabet sonrası", range: "Silah menzili", effect: "Hedef GÜÇ kurtarmasını kaybederse hızı sonraki turuna kadar 0 olur.", cost: "1 Odak", level: 2 },
  { id: "HUNTER-POISON-PREP", name: "Zehir Hazırlığı", action: "Kısa mola", range: "Silah", effect: "Bir silahı kapla; sonraki isabet 1d6 zehir hasarı verir.", cost: "1 Odak", level: 2 },
  { id: "HUNTER-LEAP", name: "Avcı Sıçrayışı", action: "Tepki", range: "Kendin", effect: "Sana yapılan saldırı ıskaladığında 3 m fırsat saldırısı doğurmadan hareket et.", cost: "1 Odak", level: 2 },
  { id: "HUNTER-PROTECTIVE-TRAIL", name: "Koruyucu İz", action: "Ana Aksiyon", range: "Grup", effect: "10 dakika grubun iz bırakmasını önle ve iz sürme kontrollerine avantaj ver.", cost: "1 Odak", level: 2 },
  { id: "HUNTER-FIRST-STRIKE", name: "İlk Vuruş", action: "İnisiyatif sonrası", range: "Kendin", effect: "İlk turundaki ilk isabet 1d6 ek hasar verir.", cost: "1 Odak", level: 2 },
  { id: "HUNTER-FIELD-TREATMENT", name: "Saha Tedavisi", action: "Ana Aksiyon", range: "1,5 m", effect: "Hedef 1d8 + SEZ CP kazanır; aynı hedef uzun mola başına bir kez yararlanabilir.", cost: "1 Odak", level: 2 },
];

export const hunterMark: LoadoutPower = { id: "HUNTER-PREY-MARK", name: "Av İşareti", action: "Hızlı Aksiyon", range: "18 m", effect: "Gördüğün hedefi bir saat işaretle. Tur başına ilk isabetin 1d4 ek hasar verir; hedefi izleme ve bulma kontrollerin avantajlıdır.", cost: "1 Odak", level: 1 };

export function loadoutSelectionLimit(classId: string, level: number, intelligenceModifier = 0) {
  if (classId === "buyucu") return { known: Math.min(mageSpells.filter((spell) => spell.level <= level).length, 6 + Math.max(0, level - 1) * 2), prepared: Math.max(1, intelligenceModifier + level) };
  if (classId === "ruhban") return { known: Math.min(clericPrayers.length, 3 + Math.min(2, Math.max(0, level - 1))), prepared: 0 };
  if (classId === "mucit") return { known: Math.min(inventorDevices.length, 4 + Math.min(2, Math.max(0, level - 1))), prepared: 0 };
  if (classId === "avci" && level >= 2) return { known: level >= 3 ? 3 : 2, prepared: 0 };
  return { known: 0, prepared: 0 };
}