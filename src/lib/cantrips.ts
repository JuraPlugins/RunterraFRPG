export type Cantrip = { id: string; name: string; action: string; range: string; effect: string; damageDie?: { count: number; size: number; type: string } };

export const cantrips: Cantrip[] = [
  { id: "CANTRIP-ARC-SHOT", name: "Ark Atışı", action: "Ana Aksiyon", range: "18 m", effect: "Bir hedefe büyü saldırısı yap. İsabette {DAMAGE} enerji hasarı ver.", damageDie: { count: 1, size: 8, type: "enerji" } },
  { id: "CANTRIP-FROST-TOUCH", name: "Don Dokunuşu", action: "Ana Aksiyon", range: "18 m", effect: "Bir hedefe büyü saldırısı yap. İsabette {DAMAGE} soğuk hasarı ver ve hedefin hızını sonraki turunun başına kadar 1,5 m azalt.", damageDie: { count: 1, size: 6, type: "soğuk" } },
  { id: "CANTRIP-SPARK", name: "Kıvılcım", action: "Ana Aksiyon", range: "9 m", effect: "Hedef ÇEV kurtarması yapar. Başarısızsa {DAMAGE} yıldırım hasarı alır ve sonraki turunun başına kadar Tepki kullanamaz.", damageDie: { count: 1, size: 6, type: "yıldırım" } },
  { id: "CANTRIP-MAGE-HAND", name: "Büyü Eli", action: "Ana Aksiyon", range: "9 m", effect: "5 kg'a kadar bir nesneyi bir dakika boyunca uzaktan hareket ettir. Saldırı yapamaz ve doğrudan hasar veremez." },
  { id: "CANTRIP-MINOR-ILLUSION", name: "Küçük Yanılsama", action: "Ana Aksiyon", range: "9 m", effect: "Bir dakika süren küçük bir ses veya görüntü oluştur. İnceleyen yaratık büyü DC'ne karşı Zekâ (İnceleme) kontrolüyle yanılsamayı açığa çıkarabilir." },
  { id: "CANTRIP-RUNE-LIGHT", name: "Rün Işığı", action: "Ana Aksiyon", range: "Dokunma", effect: "Dokunduğun nesne bir saat boyunca 6 m parlak ve ilave 6 m loş ışık verir. Etkiyi bir Aksiyonla sonlandırabilirsin." },
];

export function cantripEffect(id: string, characterLevel: number) {
  const cantrip = cantrips.find((entry) => entry.id === id); if (!cantrip) return "";
  const dice = characterLevel >= 17 ? 4 : characterLevel >= 11 ? 3 : characterLevel >= 5 ? 2 : 1;
  return cantrip.effect.replace("{DAMAGE}", cantrip.damageDie ? `${dice}d${cantrip.damageDie.size}` : "");
}
