export type ClassActionDefinition = {
  id: string;
  classId: string;
  name: string;
  effect: string;
  cost: string;
  level: number;
  specialization?: string;
  cooldown?: "turn" | "short" | "long" | "none";
};

export const classActions: ClassActionDefinition[] = [
  { id: "martial-flurry", classId: "dovus-ustasi", name: "Seri Darbe", effect: "Bir silahsız saldırı yap. İsabette 1d6 + ÇEV veya SEZ fiziksel hasar ver.", cost: "1 Ritim", level: 1 },
  { id: "martial-deflect", classId: "dovus-ustasi", name: "Savuştur", effect: "Tepki olarak aldığın yakın veya menzilli silah hasarını 1d6 + SEZ azalt.", cost: "1 Ritim", level: 1 },
  { id: "martial-wind-step", classId: "dovus-ustasi", name: "Rüzgâr Adımı", effect: "Hızlı Aksiyonla 6 m fırsat saldırısı doğurmadan hareket et ve bu hareket sırasında zorlu araziyi yok say.", cost: "1 Ritim", level: 1 },
  { id: "martial-stunning-palm", classId: "dovus-ustasi", name: "Sarsan Avuç", effect: "Silahsız saldırı isabetinden sonra 1d6 ek ruh hasarı ver; hedef DAY kurtaramazsa Tepkisini kaybeder.", cost: "1 Ritim", level: 1 },

  { id: "oathbound-smite", classId: "yeminli", name: "Yemin Darbesi", effect: "Silah saldırısı isabetinden sonra 1d8 ışık veya ruh hasarı ekle.", cost: "1 Azim", level: 1 },
  { id: "oathbound-heal", classId: "yeminli", name: "Şifa Eli", effect: "Dokunduğun hedef 1d8 + KAR CP kazanır; aynı hedef uzun mola başına bir kez yararlanabilir.", cost: "1 Azim", level: 1 },
  { id: "oathbound-challenge", classId: "yeminli", name: "Meydan Okuma", effect: "9 m hedef KAR kurtarır; başarısızsa bir dakika boyunca başka hedeflere yaptığı ilk saldırı dezavantajlıdır. Tur sonunda tekrar kurtarır.", cost: "1 Azim", level: 1 },
  { id: "oathbound-vengeance-mark", classId: "yeminli", specialization: "İntikam Yemini", name: "Hüküm Hedefi", effect: "Gördüğün bir düşmanı bir dakika hüküm hedefin yap; ona doğru hareketin fırsat saldırısı doğurmaz.", cost: "Kısa mola başına 1", level: 3, cooldown: "short" },

  { id: "bard-courage", classId: "ozan", name: "Cesaret Nakaratı", effect: "9 m hedef 10 dakika içindeki bir saldırı, kurtarma veya beceri atışına 1d6 ekler.", cost: "1 İlham", level: 1 },
  { id: "bard-healing-song", classId: "ozan", name: "Şifa Melodisi", effect: "9 m hedef 1d6 + KAR CP kazanır; hedef başına uzun mola başına bir kez.", cost: "1 İlham", level: 1 },
  { id: "bard-sharp-note", classId: "ozan", name: "Keskin Nota", effect: "18 m büyü saldırısı yap; isabette 2d6 ses hasarı ver ve hedef Tepki kullanamaz.", cost: "1 İlham", level: 1 },
  { id: "bard-disrupting-rhythm", classId: "ozan", name: "Saptıran Ritim", effect: "Tepki olarak 9 m içindeki düşmanın saldırı toplamından 1d6 eksilt.", cost: "1 İlham", level: 1 },

  { id: "pact-bolt", classId: "antlasmali", name: "Pakt Atışı", effect: "18 m büyü saldırısı yap; isabette 1d10 ruh, nekrotik veya kaynağınla uyumlu enerji hasarı ver.", cost: "Bedelsiz", level: 1 },
  { id: "pact-curse", classId: "antlasmali", name: "Lanet Mührü", effect: "18 m hedefi bir dakika işaretle; ona tur başına ilk hasarın KAR kadar artar.", cost: "1 Mühür", level: 1 },
  { id: "pact-step", classId: "antlasmali", name: "Karanlık Adım", effect: "Hızlı Aksiyonla gördüğün 6 m içindeki boş bir noktaya ışınlan.", cost: "1 Mühür", level: 1 },
  { id: "pact-shield", classId: "antlasmali", name: "Pakt Kalkanı", effect: "Tepki olarak aldığın hasarı 1d8 + KAR azalt.", cost: "1 Mühür", level: 1 },

  { id: "shifter-transform", classId: "sekil-degistirici", name: "Dönüşüm", effect: "Hızlı Aksiyonla 10 dakika dönüş; 2 + SEZ geçici CP, 1d8 doğal silah ve seçtiğin biçim uyumunu kazan.", cost: "1 Vahşet", level: 1 },
  { id: "shifter-predatory-strike", classId: "sekil-degistirici", name: "Yırtıcı Hamle", effect: "Doğal silah isabetinden sonra 1d8 ek hasar ver; hedef GÜÇ kurtaramazsa Yere Düşer veya 3 m itilir.", cost: "1 Vahşet", level: 2 },
  { id: "shifter-element-breath", classId: "sekil-degistirici", specialization: "Kadim Kan", name: "Element Nefesi", effect: "4,5 m konideki hedefler ÇEV kurtarır; 2d8 seçili element hasarı, başarıda yarı.", cost: "1 Vahşet", level: 3 },

  { id: "summoner-companion-attack", classId: "cagirici", name: "Yoldaşa Saldırı Emri", effect: "Hızlı Aksiyonla yoldaşın bir saldırı yapar; isabette 1d6 + uzmanlık fiziksel veya ruh hasarı verir.", cost: "Bedelsiz", level: 1 },
  { id: "summoner-special-command", classId: "cagirici", name: "Bağlı Emir", effect: "Yoldaşın saldırmadan önce 6 m güvenli hareket eder; isabetinde 1d8 ek hasar verir veya yakındaki müttefike 1d8 + güç modifikatörü geçici CP sağlar.", cost: "1 Komuta", level: 2 },
  { id: "summoner-resummon", classId: "cagirici", name: "Yoldaşı Yeniden Çağır", effect: "Çatışma dışında bir dakikalık ritüelle dağılmış yoldaşını tam CP ile yeniden çağır.", cost: "1 Komuta", level: 1 },
  { id: "summoner-gate-swap", classId: "cagirici", specialization: "Ruh Kapısı", name: "Eşik Geçişi", effect: "Hızlı Aksiyonla 18 m içindeki yoldaşınla yer değiştir.", cost: "1 Komuta", level: 3 },
  { id: "barbarian-rage", classId: "barbar", name: "Öfkeye Gir", effect: "Hızlı Aksiyonla bir dakika Öfkeye gir: GÜÇ kontrolleri ve kurtarmalarında avantaj, fiziksel hasara direnç ve GÜÇ kullanan yakın saldırı hasarına +2 kazan. Ağır zırhta kullanılamaz.", cost: "1 Öfke", level: 1 },
  { id: "barbarian-reckless", classId: "barbar", name: "Gözü Kara Saldırı", effect: "Bu tur GÜÇ kullanan ilk yakın saldırını avantajlı yap; sonraki turunun başına kadar sana yapılan saldırılar da avantajlıdır.", cost: "Bedelsiz", level: 2 },
  { id: "barbarian-frenzy-strike", classId: "barbar", specialization: "Çılgın Savaşçı", name: "Zincir Darbe", effect: "Öfkeliyken Hızlı Aksiyonla bir yakın silah veya silahsız saldırı yap; isabette silah hasarını uygula.", cost: "1 Öfke", level: 3 },
  { id: "barbarian-totem-call", classId: "barbar", specialization: "Totem Taşıyıcı", name: "Totem Nidası", effect: "Öfkeliyken Ayı, Kurt veya Kartal ruhunu çağır; sonraki turunun başına kadar 3 m içindeki müttefiklere sırasıyla 1d6 geçici CP, ilk saldırıya 1d4 veya 3 m güvenli hareket ver.", cost: "1 Öfke", level: 3 },
];
export function classActionEffect(action: ClassActionDefinition, level: number) {
  let effect = action.effect;
  if (action.classId === "dovus-ustasi") {
    const die = level >= 17 ? "1d10" : level >= 9 ? "1d8" : "1d6";
    effect = effect.replaceAll("1d6", die);
  }
  if (action.id === "oathbound-smite") {
    const dice = level >= 17 ? 4 : level >= 11 ? 3 : level >= 5 ? 2 : 1;
    effect = effect.replace("1d8", `${dice}d8`);
  }
  if (action.classId === "ozan") {
    const die = level >= 17 ? "1d12" : level >= 9 ? "1d10" : level >= 5 ? "1d8" : "1d6";
    effect = effect.replaceAll("1d6", die);
  }
  if (action.id === "pact-bolt") {
    const dice = level >= 17 ? 4 : level >= 11 ? 3 : level >= 5 ? 2 : 1;
    effect = effect.replace("1d10", `${dice}d10`);
  }
  if (action.id === "shifter-transform") {
    const die = level >= 17 ? "1d12" : level >= 9 ? "1d10" : "1d8";
    effect = effect.replace("1d8 doğal silah", `${die} doğal silah`);
  }
  if (action.id === "barbarian-rage") {
    const bonus = level >= 17 ? 4 : level >= 9 ? 3 : 2;
    effect = effect.replace("+2 kazan", `+${bonus} kazan`);
  }
  if (action.id === "summoner-companion-attack") {
    const dice = level >= 17 ? "2d10" : level >= 5 ? "1d8" : "1d6";
    effect = effect.replace("1d6", dice);
  }
  return effect;
}