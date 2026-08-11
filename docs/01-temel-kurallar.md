---
title: Temel Kurallar
slug: /temel-kurallar
order: 1
version: 0.5.0
status: playtest
---

# Temel Kurallar

Bu bölüm oyunun zar, yetenek, çatışma, dinlenme ve ilerleme kurallarını içerir. Karakter seçenekleri için [Karakter Yaratımı](03-karakter-yaratimi.md), anlatısal ekonomi için [Rün Puanı](02-run-puani.md) kullanılır.

## 1. Temel çözüm sistemi

**CORE-001 — Kontrol:** Sonucu belirsiz ve başarısızlığın anlamlı olduğu bir eylemde şu formül kullanılır:

```text
d20 + ilgili yetenek modifikatörü + uzmanlık bonusu (uzmansa) ≥ Zorluk Sınıfı
```

GM yalnızca başarısızlık sahneyi değiştirecekse zar ister. Başarılması kaçınılmaz, risksiz veya tekrar tekrar denenebilen işler zar gerektirmez.

### Yetenekler

| Yetenek | Kısaltma | Kullanım |
|---|---:|---|
| Güç | GÜÇ | Kaldırma, itme, yakın dövüş, atletizm |
| Çeviklik | ÇEV | Denge, gizlilik, menzilli ve hassas silahlar |
| Dayanıklılık | DAY | Can, zehir, hastalık, yorgunluk |
| Zekâ | ZEK | Araştırma, tarih, büyü ve teknoloji bilgisi |
| Sezgi | SEZ | Algı, içgörü, doğa ve ruhlarla uyum |
| Karizma | KAR | İkna, aldatma, gözdağı ve sahne hâkimiyeti |

**CORE-002 — Modifikatör:** `(yetenek puanı - 10) / 2` aşağı yuvarlanır. Örneğin 15 puan `+2`, 8 puan `-1` verir.

### Uzmanlık bonusu

| Seviye | Bonus | Seviye | Bonus |
|---:|---:|---:|---:|
| 1–4 | +2 | 13–16 | +5 |
| 5–8 | +3 | 17–20 | +6 |
| 9–12 | +4 |  |  |

Uzmanlık aynı atışa yalnızca bir kez eklenir. Bir özellik “çifte uzmanlık” verirse uzmanlık bonusu iki katına çıkar; iki çifte uzmanlık üst üste binmez.

### Beceriler

| Yetenek | Beceriler |
|---|---|
| GÜÇ | Atletizm |
| ÇEV | Akrobasi, El Çabukluğu, Gizlilik |
| ZEK | Büyü Bilgisi, Tarih, İnceleme, Teknoloji |
| SEZ | Algı, Hayvan İdaresi, Hayatta Kalma, İçgörü, Doğa, Tıp, İnanç ve Ruhlar |
| KAR | Aldatma, Gözdağı, İkna, Performans |

GM, yaklaşım değiştiğinde beceriyi farklı bir yetenekle eşleştirebilir. Bir Noxus subayı askerî geçmişini kullanarak GÜÇ yerine KAR (Atletizm) değil, KAR (Tarih) ile birlikleri etkileyebilir.

### DC tablosu

| Zorluk | DC | Örnek ölçek |
|---|---:|---|
| Çok kolay | 5 | Baskı yokken gündelik iş |
| Kolay | 10 | Eğitimli birinin düzenli başardığı iş |
| Riskli | 12 | Dikkat ve temel deneyim isteyen iş |
| Orta | 15 | Eğitimli kişiyi sınayan iş |
| Zor | 18 | Uzmanın bile hata yapabileceği iş |
| Çok zor | 20 | Ustalık ve iyi koşullar isteyen iş |
| Olağanüstü | 25 | Bölgesel kahramanlık düzeyi |
| Neredeyse imkânsız | 30 | Efsanevi veya dünyayı etkileyen iş |

**CORE-003 — Karşılıklı kontrol:** İki taraf doğrudan yarışıyorsa ikisi de uygun kontrolü atar; yüksek toplam kazanır. Eşitlikte mevcut durum korunur.

**CORE-004 — Pasif değer:** Sürekli farkındalık gibi durumlarda `10 + tüm normal bonuslar` kullanılır.

### Avantaj ve dezavantaj

**CORE-005:** Avantajda `2d20` atıp yükseğini, dezavantajda düşüğünü kullan. Birden fazla kaynak yeni zar eklemez. En az bir avantaj ve bir dezavantaj birbirini tamamen götürür.

### Doğal 20 ve doğal 1

- Saldırıda doğal 20 otomatik isabet ve kritiktir; doğal 1 otomatik ıska geçer.
- Kurtarma ve beceri kontrollerinde otomatik başarı/başarısızlık yaratmaz. GM doğal 20 veya 1'i yalnızca sonucun niteliğini anlatmak için kullanabilir.

## 2. Kurtarmalar ve etkiler

**CORE-006 — Kurtarma:** Bir tehlikeye direnmek için `d20 + yetenek modifikatörü`; karakter o kurtarmada uzmansa uzmanlık da eklenir.

Oyuncu etkilerinin kurtarma DC'si:

```text
8 + uzmanlık bonusu + sınıfın güç yeteneği modifikatörü
```

Bir etki “konsantrasyon” gerektiriyorsa karakter aynı anda yalnızca bir konsantrasyon etkisi sürdürebilir. Hasar aldığında `DC 10` veya alınan hasarın yarısı (hangisi yüksekse) DAY kurtarması yapar; başarısızlık etkiyi bitirir.

## 3. Zaman, mesafe ve taşıma

- Bir kare `1,5 metre` kabul edilir.
- Varsayılan yürüme hızı `9 metre`dir.
- Zorlu arazi her 1 metre için 2 metre hareket harcatır.
- Karakter, GÜÇ puanının 7 katı kilogramı sorun yaşamadan taşıyabilir. GM yalnızca yük sahnede önem taşıyorsa hesap ister.
- Tur yaklaşık 6 saniye, kısa mola yaklaşık 1 saat, uzun mola en az 8 saattir.

## 4. Çatışma

### Çatışmanın başlaması

**CORE-007 — İnisiyatif:** Her katılımcı `d20 + ÇEV` atar. Eşitlikte oyuncular kendi aralarında karar verir; oyuncu ile GM karakteri eşitse yüksek ÇEV, hâlâ eşitse oyuncu önce davranır.

Hazırlıksız yakalanan yaratık ilk turunda Tepki kullanamaz ve ilk sırası bitene kadar kendisine yapılan ilk saldırı avantajlıdır.

### Tur yapısı

Bir karakter kendi turunda aşağıdakileri istediği sırayla kullanabilir:

1. **Hareket:** Hızı kadar yer değiştirme.
2. **Ana Aksiyon:** Saldırma, güç kullanma veya genel bir eylem.
3. **Hızlı Aksiyon:** Yalnızca bir özellik açıkça izin verirse.
4. **Serbest etkileşim:** Kısa konuşma, hazır eşyayı çekme veya kapı açma gibi tek küçük etkileşim.

**Tepki**, bir tetikleyici gerçekleştiğinde tur dışında kullanılabilir. Harcanan Tepki karakterin bir sonraki turunun başında geri gelir. Aynı turda yalnızca bir Ana Aksiyon, bir Hızlı Aksiyon ve bir Tepki kullanılabilir; özellik açıkça söylemedikçe bunlar birbirine çevrilemez.

### Genel aksiyonlar

| Aksiyon | Sonuç |
|---|---|
| Saldır | Bir silah saldırısı yap |
| Atıl | Bu tur ek olarak hızın kadar hareket et |
| Ayrıl | Turun kalanında hareketin fırsat saldırısı doğurmaz |
| Saklan | Uygun örtüde ÇEV (Gizlilik) kontrolü yap |
| Savun | Sonraki turun başına kadar sana saldırılar dezavantajlı; ÇEV kurtarmaların avantajlı |
| Yardım Et | 1,5 m içindeki müttefikin bir sonraki uygun kontrolüne avantaj ver |
| Hazırla | Bir tetikleyici ve Ana Aksiyon seç; tetiklenince Tepkini harcayarak uygula |
| Nesne Kullan | Karmaşık bir nesneyi etkinleştir veya çantadan bir şey çıkarıp kullan |
| Güç Kullan | Büyü, manevra veya cihazın belirttiği aksiyonu uygula |

### Saldırı ve savunma

**CORE-008 — Saldırı:** `d20 + saldırı yeteneği + uzmanlık` hedefin Savunma Sınıfına (SS) eşit veya yüksekse isabet eder.

- Yakın silahlar GÜÇ kullanır.
- Hassas özellikli yakın silahlar GÜÇ veya ÇEV kullanabilir.
- Menzilli silahlar ÇEV kullanır.
- Büyü ve sınıf güçleri belirtilen sınıf yeteneğini kullanır.

Hasar zarı ile ilgili yetenek modifikatörü toplanır; özellik aksini söylemedikçe hasara uzmanlık eklenmez. Doğal 20'de saldırının bütün hasar zarları iki kez atılır, sabit bonuslar bir kez eklenir.

### Konum kuralları

- Düşmanın erişiminden isteyerek çıkmak, düşmana Tepkisiyle bir yakın saldırı yapma hakkı verir.
- Yarım örtü `+2 SS` ve `+2 ÇEV kurtarması`; güçlü örtü `+5` verir. Tam örtü doğrudan hedeflemeyi engeller.
- Bir düşmanın 1,5 metresindeyken menzilli saldırı dezavantajlıdır.
- Görünmeyen hedefe saldırı dezavantajlı; saldırgan görünmüyorsa saldırısı avantajlıdır.

### Hasar, direnç ve iyileşme

- Hasar mevcut CP'den düşülür; CP 0'ın altına inmez.
- Direnç ilgili hasarı yarıya, kırılganlık iki katına çevirir. Yuvarlama aşağı yapılır.
- Aynı hasara birden fazla direnç veya kırılganlık üst üste binmez.
- Geçici CP normal CP'den önce tükenir, birbirine eklenmez ve iyileştirilemez.

### Durumlar

| Durum | Kısa kural |
|---|---|
| Baygın | Aksiyon ve hareket yok; yakın isabetler kritiktir |
| Büyülenmiş | Kaynağa isteyerek zarar veremez; kaynağın sosyal kontrolleri avantajlıdır |
| Görünmez | Görmeye dayalı hedeflemeden saklı; saldırıları avantajlı, ona saldırılar dezavantajlıdır |
| Kısıtlanmış | Hız 0; saldırıları dezavantajlı, ona saldırılar avantajlı; ÇEV kurtarmaları dezavantajlıdır |
| Korkmuş | Kaynağa yaklaşamaz; kaynak görünürken kontrolleri ve saldırıları dezavantajlıdır |
| Sağır | İşitmeye dayalı kontrolleri otomatik kaybeder |
| Sersemlemiş | Hareket, aksiyon ve Tepki yok; GÜÇ/ÇEV kurtarmalarını otomatik kaybeder |
| Yere düşmüş | Ayağa kalkmak hareketin yarısıdır; yakın saldırılar avantajlı, uzak saldırılar dezavantajlıdır |
| Zehirlenmiş | Saldırı ve beceri kontrolleri dezavantajlıdır |

## 5. Can Puanı, düşme ve ölüm

### Can Puanı

**CORE-009:** 1. seviyede CP, sınıfın Can Zarı'nın en yüksek değeri + DAY modifikatörüdür. Sonraki seviyelerde zarın sabit ortalaması + DAY kazanılır: d6 için 4, d8 için 5, d10 için 6.

### 0 CP

0 CP'ye düşen karakter Baygın olur. Artan hasar, tek vuruşta maksimum CP'sine eşitse anında ölür; değilse her turunun başında DC 10 ölüm kurtarması yapar.

- 3 başarı: Dengelenir, zar atmayı bırakır ve `1d4` saat sonra 1 CP ile uyanır.
- 3 başarısızlık: Ölür.
- Doğal 20: Hemen 1 CP kazanır.
- Doğal 1: İki başarısızlık sayılır.
- 0 CP'de hasar: Bir başarısızlık; kritikse iki başarısızlık.
- Herhangi bir iyileşme: Baygınlığı ve ölüm sayacını bitirir.

Başarı ve başarısızlıklar karakter dengelendiğinde, iyileştirildiğinde veya öldüğünde sıfırlanır.

### Yara Aspect'i

**CORE-010:** Bir çatışmada ilk kez 0 CP'den dönen karakter, sahnede aldığı hasarı anlatan bir **Yara Aspect'i** yazar. Aynı çatışmada yeniden düşmek yeni Yara yaratmaz.

- Mevcut Yara yoksa Hafif Yara.
- Hafif Yara varken yeniden yaralanırsa Ağır Yara.
- Ağır Yara varken yeniden yaralanırsa Kritik Yara.

Yara kendi başına sayısal ceza vermez. GM onu [Compel](02-run-puani.md#compel-komplikasyonu-kabul-etmek) ederek gerçek bir komplikasyona dönüştürebilir. Tedavi süreleri [GM rehberinde](04-gm-homebrew.md#6-yara-tedavisi) bulunur.

## 6. Dinlenme

**CORE-011 — Kısa mola:** Yaklaşık 1 saat güvenli dinlenmedir. Karakter, seviyesine eşit toplam **Toparlanma Zarı** havuzundan istediği kadar harcar. Her zar, sınıfın Can Zarı + DAY kadar CP yeniler. Harcanan zarlar uzun molayla geri gelir. Özelliği “kısa molada yenilenir” denen kaynaklar da yenilenir.

**CORE-012 — Uzun mola:** En az 8 saat, bunun en az 6 saati uyku veya eşdeğer dinlenmedir. Karakter:

- Bütün CP'sini,
- Harcanmış Toparlanma Zarlarının en az 1 olmak üzere yarısını,
- “Uzun molada yenilenir” denen sınıf kaynaklarını geri kazanır.

24 saatte yalnızca bir uzun molanın mekanik faydası alınabilir. Güvenli olmayan dinlenmenin bölünmesi veya bedeli GM rehberindeki kampanya tonuna göre yönetilir.

## 7. İlerleme

| Seviye | Uzmanlık | Güç kademesi |
|---:|---:|---|
| 1–4 | +2 | Sıradan maceracı |
| 5–8 | +3 | Bölgesel kahraman |
| 9–10 | +4 | Bölgesel kahraman |
| 11–12 | +4 | Efsanevi figür |
| 13–16 | +5 | Efsanevi figür |
| 17–20 | +6 | Dünyayı etkileyen güç |

**CORE-013 — Milestone:** Varsayılan olarak GM, grubun büyük bir hedefi tamamlaması veya hikâyede kalıcı değişim yaratması üzerine seviye verir. Normal tempo 2–4 oturumda bir seviyedir.

**CORE-014 — İsteğe bağlı XP:** Her anlamlı oturum sonunda 1 XP, büyük hedef tamamlandığında ek 1 XP kazanılır. 4 XP bir sonraki seviyeyi verir ve sayaç sıfırlanır. Bu yöntem milestone ile birlikte kullanılmaz.

4, 8, 12, 16 ve 19. seviyelerde karakter iki farklı yetenek puanını +1 veya bir puanı +2 artırır; puan 20'yi aşamaz. GM [İmza Yetenekleri](icerik/Yetenekler.md) modülünü açtıysa karakter bu artışın tamamı yerine erişebildiği bir İmza Yeteneği öğrenebilir.

## 8. Hızlı kural özeti

1. GM yaklaşımı ve DC'yi belirler.
2. Oyuncu `d20 + yetenek + varsa uzmanlık` atar.
3. Avantaj/dezavantaj uygulanır.
4. Oyuncu isterse sonuç kesinleşmeden Aspect bağlantılı [Rün Puanı](02-run-puani.md) kullanır.
5. Sonuç dünyayı değiştirir; aynı sonuç için tekrar zar atılmaz.

Sonraki adım: [Rün Puanı sistemi](02-run-puani.md).
