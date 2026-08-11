---
title: GM ve Homebrew Rehberi
slug: /gm-homebrew
order: 4
version: 0.5.0
status: playtest
---

# GM ve Homebrew Rehberi

Bu belge hazır hikâye sunmaz. GM'nin sahne zorluğu, düşman, Yara tedavisi ve yeni oyuncu seçenekleri üretmesi için sistem araçları sağlar. Oyuncu kuralları [Temel Kurallar](01-temel-kurallar.md), karakter seçenekleri [Karakter Yaratımı](03-karakter-yaratimi.md), anlatısal ekonomi [Rün Puanı](02-run-puani.md) belgesindedir.

## 1. Oturum sıfırı

Başlamadan önce birlikte belirleyin:

- Başlangıç seviyesi ve kampanya güç tonu,
- Karakterlerin neden birlikte hareket ettiği,
- Kullanılmayacak içerikler ve ekrandan uzak tutulacak ayrıntılar,
- Ölümün ne kadar olası olduğu,
- Resmî Runeterra olaylarının sabit geçmiş mi, değiştirilebilir ilham mı olduğu.

**GM-001:** Evren bilgisi oyuncuya karşı sınav değildir. Bir karakterin bölgesi veya becerisi nedeniyle bileceği temel bilgiyi zar istemeden ver. Zar, bilginin derinliği veya zaman baskısı için atılır.

## 2. Güç tonu ve başlangıç seviyesi

| Ton | Başlangıç | Beklenen oyun |
|---|---:|---|
| Sıradan | 1 | Mahalle, köy, devriye, çete ve yerel yaratıklar |
| Deneyimli | 3 | Uzmanlık kazanmış ekip, şehir veya sınır ölçeği |
| Kahramansı | 5 | Bölgesel tehditler ve seçkin birlikler |
| Efsanevi | 11 | Ulusların kaderini etkileyen çatışmalar |
| Dünyasal | 17 | Kozmik ve dünya çapında sonuçlar |

Yüksek seviyeden başlarken karakterlerin geçmiş başarılarını birlikte yazın. Yüksek seviye otomatik olarak resmî bir şampiyonun kimliğini veya statüsünü vermez.

## 3. Kontrol tasarlamak

**GM-002 — Önce sonuç:** Zar istemeden önce başarı ve başarısızlığın dünyayı nasıl değiştireceğini söyle veya en azından riskin türünü açıkla.

| DC | Ne zaman kullanılır? |
|---:|---|
| 5 | Yalnızca baskı altında anlamlı olan çok kolay iş |
| 10 | Temel eğitimle güvenilir iş |
| 12 | Riskli ama sıradan maceracıya uygun iş |
| 15 | Uzmanlık isteyen standart dramatik zorluk |
| 18 | İyi hazırlanmış uzmanı sınayan iş |
| 20 | Çok zor, özel avantaj gerektiren iş |
| 25 | Efsanevi ölçekte iş |
| 30 | Dünyanın kurallarını zorlayan iş |

Bir sahnede ilerleme için zorunlu tek ipucunu başarısız zarın arkasına koyma. Başarısızlıkta ipucu yine bulunabilir; zaman kaybı, dikkat çekme, kaynak tüketimi veya istenmeyen bir bedel doğar.

### Başarı dereceleri

Normalde eşik yeterlidir. Sonuç kalitesi önemliyse:

- DC'den 5 düşük: Başarısızlık ve ciddi bedel.
- DC'den 1–4 düşük: Başarı karşılığında bedel veya eksik başarı.
- DC'ye eşit–4 yüksek: Tam başarı.
- DC'den 5+ yüksek: Ek bilgi, hız veya konum avantajı.

Rün Puanı sonucu değiştirdikten sonra başarı derecesi yeni toplamla hesaplanır.

## 4. Karşılaşma bütçesi

### Tehdit birimleri

| Düşman türü | Tehdit birimi |
|---|---:|
| Minyon | 0,25 |
| Standart | 1 |
| Elit | 2 |
| Boss | 4 |

Partideki karakter sayısını `K` kabul et:

| Zorluk | Toplam tehdit |
|---|---:|
| Kolay | `0,75 × K` |
| Standart | `1 × K` |
| Zor | `1,5 × K` |
| Ölümcül | `2 × K` |

Sonuçları en yakın 0,25'e yuvarla. Aynı anda oyuncu sayısının iki katından fazla düşman kullanmak, bütçe uygun olsa bile aksiyon ekonomisini yavaşlatır; fazlasını dalgalar hâlinde getir.

### Standart düşman değerleri

`S`, grubun ortalama seviyesidir. Uzmanlık bonusu oyuncu tablosundan alınır.

| Değer | Standart formül |
|---|---|
| SS | `12 + uzmanlık bonusu` |
| CP | `10 + 7 × S` |
| Saldırı | `+2 + uzmanlık bonusu` |
| Kurtarma DC | `10 + uzmanlık bonusu` |
| Tur başı hedef hasar | `4 + 2 × S` |
| İyi kurtarma | `+2 + uzmanlık bonusu` |
| Zayıf kurtarma | `+0` |

Hasar, tek saldırı veya birkaç saldırı arasında bölünebilir; toplam hedefi aşmamalıdır. Alan saldırısı üç veya daha fazla hedefi etkileyebiliyorsa tek hedef hasarını yaklaşık %40 azalt.

### Düşman şablonları

**Minyon**

- Standart SS ve saldırı kullanır.
- Başarılı herhangi bir hasarlı isabette yenilir.
- Kurtarmayı başarırsa yarım hasarlı etkiden zarar görmez; kaybederse yenilir.
- Tur başı hasarı standart değerin %75'idir.

**Standart**

- Formülleri değişmeden kullanır.
- Bir saldırı, bir hareket özelliği ve en fazla bir sınırlı özel güç yeterlidir.

**Elit**

- CP'yi iki katına çıkar, SS ve saldırıya +1 ekle.
- Tur başı hasarı 1,5 ile çarp.
- Bir durum etkisini ilk kez aldığında kısa bir karşı hareket veya kurtarma tekrarı kullanabilir.

**Boss**

- CP'yi dört katına çıkar, SS ve saldırıya +2 ekle.
- Tur başı hasarı iki katına çıkar, fakat hasarı en az iki farklı hedef veya aksiyona böl.
- Her turun sonunda hareket, zayıf saldırı veya çevre etkisi olan bir **Boss Aksiyonu** kullanır; tam tur kaybettiren zincirleme sersemletme kullanmaz.
- CP'sinin yarısında sahneyi veya davranışını değiştiren ikinci evreye geçer.

### Seviye 1 örneği

Dört kişilik 1. seviye grup için standart karşılaşma 4 tehdit birimidir. Dört standart düşman veya bir elit ile iki standart düşman kullanılabilir.

Seviye 1 standart düşman yaklaşık SS 14, 17 CP, +4 saldırı ve 6 tur başı hasara sahiptir. Grup yeniyse ilk testte toplam tehdidi 3'te tut.

## 5. Düşman güçleri

Bir düşman için en fazla şu üç parçayı seç:

1. **Kimlik hareketi:** Uçuş, duvara tırmanma, sis içinde saklanma gibi.
2. **Saldırı tercihi:** Yakın, menzilli, alan veya kontrol.
3. **Açık zayıflık:** Düşük kurtarma, çevresel bağımlılık veya hazırlık turu.

### Durum bütçesi

- Hız azaltma veya Tepki engelleme: Normal hasarla birlikte 1 tur sürebilir.
- Yere düşürme veya itme: Normal hasarla birlikte kurtarma ister.
- Kısıtlama: Hasarı %25 azalt; hedef her tur sonunda yeniden kurtarır.
- Sersemletme veya Baygın bırakma: Hasarı en az %50 azalt, en fazla 1 tur sürdür ve aynı hedefte art arda kullanma.

Oyuncuyu hiç oynatmayan güçler yerine konum, kaynak veya risk değiştiren güçleri tercih et.

## 6. Yara tedavisi

Yara, [0 CP'den dönüşte](01-temel-kurallar.md#yara-aspecti) oluşur ve yalnızca Compel edildiğinde komplikasyon yaratır.

| Yara | Doğal iyileşme | Tedavi |
|---|---|---|
| Hafif | 2 uzun mola | Bir kısa mola ve DC 10 Tıp başarısı sonrası bir sonraki uzun molada |
| Ağır | 5 uzun mola | Her gün bakım ve en az iki başarılı DC 15 Tıp kontrolüyle 3 uzun mola |
| Kritik | Kendiliğinden geçmez | Güvenli yerde uzman bakım, uygun kaynak ve kalıcı bir iyileşme hedefi |

### Tedavi ilkeleri

- Aynı karakter için günde yalnızca bir Tıp kontrolü yapılır.
- Başarısız kontrol süreyi sıfırlamaz ve Yarayı kötüleştirmez; yalnızca o gün ilerleme sağlamaz.
- Büyülü iyileşme CP verir ama bir özellik açıkça söylemedikçe Yara süresini silmez.
- Kritik Yaranın tedavisi hikâyeye hedef verir; oyuncuyu kampanyadan çıkarmamalıdır.
- Yara adı iyileşirken karakterde iz olarak kalabilir, fakat mekanik Aspect olmaktan çıkar.

## 7. Rün Puanı yönetimi

**GM-003 — İyi Compel:** Aspect + somut seçim + yeni komplikasyon içerir.

```text
“Görev Duygularımdan Önce Gelir” Aspect'in yüzünden kaçan şüpheliyi
kovalamak yerine yaralı muhafızları korumayı seçersen 1 RP kazanırsın.
```

Kötü Compel örnekleri:

- “Aspect'in var, o yüzden otomatik başarısız oldun.”
- “Bu ipucunu artık asla bulamazsınız.”
- “Karakterin arkadaşına saldırıyor; karar veremezsin.”
- Belirtilmeyen ağır sonucu, kabulden sonra açıklamak.

### Tempo

- Oyuncu başına oturumda 1–3 Compel hedefle.
- 0 RP'deki oyuncuya reddedilemez teklifler yağdırma.
- 5 RP biriktiren oyuncunun kullanılabilir Aspect'leri olup olmadığını kontrol et.
- Bir Aspect iki oturum boyunca Invoke veya Compel edilmediyse yeniden yazmayı öner.

## 8. Homebrew güç bütçeleri

### Yeni bölge

Bir bölge paketi şunların dışına çıkmamalıdır:

- Üç beceriden bir uzmanlık seçimi,
- Uzun mola başına bir savaş dışı kontrolde avantaj **veya** dar bir çevresel kolaylık,
- Üç çift yönlü Aspect önerisi,
- Bir bağlantı veya düşük değerli eşya.

Bölge özelliği saldırı, hasar, SS, CP, güç DC'si, sınıf kaynağı veya Rün Puanı vermemelidir.

### Yeni soy

Bir soy tek ana özellik taşır:

- En fazla 6 m yüzme/tırmanma hareketi,
- Tek bir duyu grubuna avantaj,
- Güçlü Yapı,
- Dar bir doğal çevreye karşı avantaj,
- Küçük boyutla ilgili hareket kolaylığı.

Başlangıç uçuşu, sürekli fiziksel hasar direnci, doğal zırh bonusu veya ek aksiyon başlangıç soy bütçesini aşar.

### Yeni sınıf özelliği

| Seviye | Yaklaşık bütçe |
|---:|---|
| 1 | Sınıfın her turdaki temel döngüsü ve sınırlı kaynak |
| 2 | Kısa molada bir kez güçlü aksiyon veya düzenli hareket/yardım aracı |
| 3 | Oynanış yönünü değiştiren, çekirdeğin yaklaşık %25'i gücünde uzmanlık |
| 5 | Ek saldırı veya 3. derece büyü düzeyinde ilk büyük sıçrama |

Bir özellik aynı anda isabet, hasar ve savunmayı sürekli artırmamalıdır. Sürekli `+1 SS`, `+1 saldırı` veya kritik aralığı genişletme tek başına güçlü bir uzmanlık özelliğidir.

### Yeni büyü, dua veya cihaz

| Güç | Tek hedef hasarı | Alan hasarı | İyileştirme | Kontrol |
|---|---:|---:|---:|---|
| Cantrip/temel | 1d8 | — | — | Çok küçük, 1 tur |
| 1. derece / 1 kaynak | 2d8 | 2d6 | 1d8 + yetenek | Kurtarma, 1 tur veya konsantrasyon |
| 2. derece / 2 kaynak | 3d8 | 3d6 | 2d8 + yetenek | Her tur kurtarma, konsantrasyon |

Hasar yanında güçlü durum veriliyorsa hasarı bir zar azalt. Otomatik isabet, büyük menzil veya Hızlı Aksiyon kullanımı da bütçenin parçasıdır.

### Yeni uzmanlık

Uzmanlık 3. seviyede:

- Mevcut sınıf kaynağını yeni biçimde harcatmalı,
- Sınıfın zayıflığını tamamen silmemeli,
- Tur başına fazladan tam Ana Aksiyon vermemeli,
- Başka sınıfın çekirdek özelliğini ondan daha iyi yapmamalıdır.

## 9. Şampiyon fantezisi üretmek

Resmî bir şampiyonu kopyalamak yerine üç soruyla özgün arketip oluştur:

1. Oyuncu hangi **fiili** tekrar tekrar yapmak istiyor? Atılmak, korumak, tuzak kurmak, dönüşmek gibi.
2. Bu fiilin kaynak veya konum bedeli nedir?
3. Karakter hangi Aspect yüzünden bu gücü sorunlu biçimde kullanır?

İsim, replik, özel silah ve biyografi kopyalamadan benzer oynanış hissi kurulabilir. Örneğin “hızla hedefler arasında sıçrayan kılıç ustası”, Denge temalı bir Savaşçı veya Düzenbaz uzmanlığı olabilir; belirli bir resmî karakterin aynısı olmak zorunda değildir.

## 10. Playtest formu

Her oturum sonunda şu verileri kaydet:

| Soru | Kayıt |
|---|---|
| Seviye ve grup büyüklüğü | — |
| Karşılaşma tehdit toplamı | — |
| Çatışma kaç tur sürdü? | — |
| Kaç karakter 0 CP'ye düştü? | — |
| Her sınıf kaç kaynak harcadı? | — |
| Kaç Invoke ve Compel oldu? | — |
| Hangi özellik unutuldu veya belirsizdi? | — |
| Bir seçim açıkça diğerlerinden üstün müydü? | — |

### v0.5 hedefleri

- Standart çatışma 3–5 tur sürmeli.
- Oyuncu başına oturumda ortalama en az 1 Invoke ve 1 Compel görülmeli.
- Her sınıf kısa bir çatışmada çekirdek döngüsünü en az bir kez kullanabilmeli.
- Alışılmadık bölge-sınıf birleşimleri sayısal ceza yaşamamalı.
- Yara, oyuncuyu cezalandıran sürekli dezavantaj değil, yeni seçim üreten Aspect olarak çalışmalı.

## 11. Hızlı GM kontrol listesi

1. Sahnenin riskini ve DC'sini belirle.
2. Zorunlu bilgiyi tek başarısızlık noktasına bağlama.
3. Karşılaşma tehdit bütçesini hesapla.
4. Her düşmana bir kimlik hareketi ve açık zayıflık ver.
5. Oyuncuların Aspect'lerini görünür tut.
6. Compel sonucunu kabulden önce açıkla.
7. Oturum sonunda kaynak, tur ve RP verilerini kaydet.
