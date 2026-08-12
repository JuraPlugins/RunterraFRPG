---
title: PT-001 — Cam Kuyu
slug: /playtests/pt-001-cam-kuyu
order: 1
version: 0.1.0
status: complete
date: 2026-08-13
---

# PT-001 — Cam Kuyu

## Sonuç

**PLAYTEST-001 — Genel karar:** Dört 1. seviye karakter yalnızca proje belgeleri kullanılarak oluşturulabildi ve keşif, sosyal sahne, Rün Puanı kararları, dört turluk çatışma, 0 CP, ölüm kurtarması, iyileştirme, Yara ve kısa mola içeren bir sekans tamamlandı.

Kural sistemi masa üzerinde oynanabilir. Web sitesinin karakter oluşturma kısmı temel karakterleri kurabiliyor; ancak masa paneli, kural kitabındaki bütün sınıf seçimlerini ve kısa mola akışını henüz eksiksiz yönetemiyor.

## Test yöntemi

- Seviye: 1
- Grup: 4 karakter
- Point-buy: Her karakter tam 27 puan
- Başlangıç RP: Kişi başı 2
- Zar tohumu: `20260813`
- Karşılaşma: 1 standart düşman + 4 minyon = 2 tehdit
- Amaç: Alışılmadık dört bölge–sınıf eşleşmesini aynı sekans içinde sınamak

Zarlar önceden sonuç seçmek için değiştirilmedi. Sekans içinde karar verildikten sonra sabit tohum dizisinin sıradaki sonucu kullanıldı.

## Karakterler

### Elian Veyr

- **Soy / Bölge / Sınıf:** İnsan, Demacia, Büyücü 1
- **Kavram:** Petricite ölçüm heyetinde gücünü saklayan genç rün araştırmacısı
- **Yetenekler:** GÜÇ 8, ÇEV 14, DAY 12, ZEK 15, SEZ 13, KAR 10
- **CP / SS:** 7 / 12; Rün Zırhı hazırlanırsa SS 15
- **Büyü saldırısı / DC:** +4 / 12
- **Beceriler:** Tarih, Büyü Bilgisi, İnceleme; İnsan özelliğiyle Gizlilik
- **Cantripler:** Ark Atışı, Büyü Eli, Küçük Yanılsama
- **Büyü kitabı:** Büyü Oku, Element Dalgası, Kalkan, Sis Perdesi, Hızlı Adım, Rün Zırhı
- **Hazırlananlar:** Büyü Oku, Kalkan, Rün Zırhı
- **Aspect'ler:** “Yasak Rünleri İnsanları Korumak İçin Okurum”; “Demacia Beni Hem Korudu Hem Saklanmaya Zorladı”; “Gerçeği Söylersem Evimi Kaybedebilirim”

### Raska Kord

- **Soy / Bölge / Sınıf:** Minotaur, Noxus, Ruhban 1
- **Kavram:** Birliğin gücünü yaralıları ayağa kaldırmakta gören savaş şifacısı
- **Yetenekler:** GÜÇ 13, ÇEV 10, DAY 14, ZEK 8, SEZ 15, KAR 12
- **CP / SS:** 10 / 15
- **Dua saldırısı / DC:** +4 / 12
- **Beceriler:** Gözdağı, Tıp, İçgörü, İnanç ve Ruhlar
- **İnanç:** Birlik Yemini; Koruma alanı; Sorgulayan mürid
- **Dualar:** Koruma, Yargı, Şifa Sözü
- **Aspect'ler:** “Kimseyi Savaş Alanında Bırakmam”; “Güç Kazanılır ama Paylaşılınca Anlamlıdır”; “Emir ile Merhamet Çatıştığında Duraksarım”

### Oru, Yıldız Vidası

- **Soy / Bölge / Sınıf:** Yordle, Targon, Mucit 1
- **Kavram:** Göksel olayları ölçen cep boyutunda hacı mühendis
- **Yetenekler:** GÜÇ 8, ÇEV 14, DAY 13, ZEK 15, SEZ 12, KAR 10
- **CP / SS:** 9 / 13
- **Cihaz saldırısı / DC:** +4 / 12
- **Beceriler:** İnanç ve Ruhlar, Teknoloji, İnceleme, Tıp
- **Cihazlar:** Şok Bobini, Saha İğnesi, Koruyucu Plaka, Tarayıcı
- **Aspect'ler:** “Her Mucize Ölçülebilir Bir İz Bırakır”; “Gökyüzü Kader Değil Rehberdir”; “Çalışmayan Bir Mekanizmayı Olduğu Gibi Bırakamam”

### Seli Venn

- **Soy / Bölge / Sınıf:** Vastaya, Zaun, Avcı 1
- **Kavram:** Kimyasal kaçakları koku üzerinden izleyen altşehir gözcüsü
- **Yetenekler:** GÜÇ 10, ÇEV 15, DAY 13, ZEK 8, SEZ 14, KAR 12
- **CP / SS:** 11 / 15
- **Uzun yay saldırısı:** +4; `1d8 + 2`
- **Beceriler:** Teknoloji, Algı, Gizlilik, Hayatta Kalma
- **Keskin Duyu:** Koku
- **Aspect'ler:** “Bir Sızıntıyı Kokusu Değişmeden Bulurum”; “Kimse Bizi Yukarıdan Kurtarmayacak”; “Tehlikenin İzini Görünce Geri Dönmem”

İçe aktarılabilir kayıtlar: [Elian](karakterler/Elian-Veyr.json), [Raska](karakterler/Raska-Kord.json), [Oru](karakterler/Oru-Yildiz-Vidasi.json), [Seli](karakterler/Seli-Venn.json).

## Senaryo: Cam Kuyu

Zaun'un eski havalandırma katmanlarından birinde, Targon kökenli bir yıldız kristali kimyasal bir kuyuyu beslemektedir. Dört maceracı kristali çalan hurdacıların peşine düşer. Amaçları kristali geri almak, kuyunun patlamasını önlemek ve kaçakçıları canlı yakalamaktır.

### Sahne 1 — Mor dumanın izi

Seli, borulardaki kokuyu izlemek için DC 15 SEZ (Hayatta Kalma) kontrolü yaptı.

- Zar: `7 + 2 SEZ + 2 uzmanlık = 11`
- Seli, “Bir Sızıntıyı Kokusu Değişmeden Bulurum” Aspect'ini Invoke etti; 1 RP harcadı.
- RP zarı: `1d6 = 5`; toplam 16, başarı.
- RP: `2 → 1`

Grup doğru tünele ulaştı. `+1d6` sonuca eklendi, hasara eklenmedi ve tek RP etkisi sınırı korundu.

### Sahne 2 — Demacia mührü

Kapalı bir kontrol kapısı Demacia mühürlü eski bir taşıma kaydı istemektedir. Elian, Düzenin Dili bölge özelliğini kullandı; Tarih kontrolünde avantaj kazandı.

- Zarlar: `8` ve `19`; yüksek olan 19
- Toplam: `19 + 1 ZEK + 2 uzmanlık = 22`; başarı.

GM, “Gerçeği Söylersem Evimi Kaybedebilirim” Aspect'i için Compel sundu: Elian kayıt defterinde gerçek büyü imzasını yazmak yerine eksik bilgi bırakır; bu yüzden ileride Demacialı bir denetçi ekibin izini sürebilir. Elian kabul etti.

- RP: `2 → 3`
- İlerleme durmadı; yalnızca gelecekteki bir komplikasyon doğdu.

### Sahne 3 — Yıldız kilidi

Oru, bozuk kaldıracın Targon tırmanış düzenekleriyle aynı kilit geometrisini kullandığını sahne detayı olarak önerdi. “Gökyüzü Kader Değil Rehberdir” Aspect'iyle 1 RP harcadı; GM ayrıntıyı kabul etti.

- RP: `2 → 1`
- Ardından DC 15 ZEK (Teknoloji): doğal `20 + 2 ZEK + 2 uzmanlık = 24`; başarı.

Doğal 20 beceri kontrolünde otomatik başarı sayılmadı; toplam zaten DC'yi geçti.

### Sahne 4 — Noxuslu nöbetçi

Raska, eski bir Noxus askerini gruba yol vermeye ikna etti.

- İlk toplam: `8 + 1 KAR + 2 uzmanlık = 11`; DC 15 altında.
- “Güç Kazanılır ama Paylaşılınca Anlamlıdır” Invoke edildi; `1d6 = 5`.
- Yeni toplam 16; başarı. RP `2 → 1`.

Ardından aynı Aspect için “nöbetçiyi düelloya çağır” Compel'i geldi. Raska görevin aciliyeti yüzünden reddetti ve 1 RP ödedi.

- RP: `1 → 0`
- Raska bu sahnede başka Invoke kullanamaz.

## Çatışma — Kristal kaçakçıları

### Düşmanlar

**Kimya bekçisi, standart:** SS 14, CP 17, saldırı +4, hasar hedefi 6.

**Dört hurdacı minyon:** SS 14, başarılı hasarlı isabette yenilir, saldırı +4, hasar 4.

Toplam tehdit `1 + (4 × 0,25) = 2`; dört kişilik yeni grup için kolay ile standart arası.

### Hazırlık

Elian bir 1. derece yuva harcayarak Rün Zırhı kullandı; SS'si sekiz saatliğine 15 oldu. Bir yuvası kaldı.

### İnisiyatif

| Katılımcı | Zar | Toplam |
|---|---:|---:|
| Seli | 19 | 21 |
| Elian | 16 | 18 |
| Raska | 9 | 9 |
| Oru | 3 | 5 |
| Düşmanlar | 9 | 10 |

Nihai sıra: Seli, Elian, düşmanlar, Raska, Oru.

### 1. tur

- **Seli:** Hızlı Aksiyonla 1 Odak harcadı, kimya bekçisini işaretledi. Uzun yay toplamı 14 ile isabet etti; `1d8 + 2 + 1d4 = 13` hasar. Bekçi 4 CP.
- **Elian:** Son büyü yuvasıyla Büyü Oku kullandı. Üç ok toplam 10 enerji hasarı verdi; bekçi yenildi.
- **Minyonlar:** Raska, Seli, Oru ve Elian'a birer saldırı yaptı. Dördü de isabet etti; Raska 6 CP, Seli 7 CP, Elian 3 CP kaldı. Oru'ya gelen 4 hasarı Raska, Tepki ve 1 Lütufla Koruma kullanarak 0'a indirdi.
- **Raska:** 1 Lütufla Yargı kullandı. Minyon SEZ kurtarmasını kaybetti ve hasarlı etkiyle yenildi. Lütuf 0.
- **Oru:** Şok Bobini kullandı; toplam 13, SS 14'e karşı ıska. Yük `4 → 3`.

### 2. tur

- **Seli:** İlk hedef 0 CP'ye düştüğü için son Odakla bir minyonu işaretledi; saldırı 6 toplamla ıska. Odak 0.
- **Elian:** Ark Atışı 11 toplamla ıska.
- **Minyonlar:** Raska'ya saldırı ıskaladı; Seli 4 hasarla 3 CP'ye düştü; Elian 4 hasarla 0 CP'ye düştü.
- **Raska:** Bedelsiz dua saldırısı toplam 21 ile isabet etti; bir minyon yenildi.
- **Oru:** Şok Bobini toplam 13 ile yine ıska. Yük `3 → 2`.

Elian Baygın oldu. Ölüm başarı ve başarısızlık sayacı sıfırdan başladı.

### 3. tur

- **Seli:** İşaretli minyona toplam 21 ile isabet etti; minyon yenildi.
- **Elian:** Tur başında ölüm kurtarması attı: doğal 2, bir başarısızlık.
- **Son minyon:** Oru'ya isabet etti; Oru 5 CP'ye düştü.
- **Raska:** Bedelsiz dua saldırısı 7 toplamla ıska.
- **Oru:** Elian'a Saha İğnesi uyguladı; `1d8 + ZEK = 3` CP. Elian uyandı, ölüm sayacı sıfırlandı ve **Hafif Yara: Kimyasal Yanıkla Titreyen El** kazandı. Yük `2 → 1`.

### 4. tur

- **Seli:** Uzun yay 11 toplamla ıska.
- **Elian:** Ark Atışı doğal 20 ile kritik isabet oldu; minyon yenildi.

Çatışma sona erdi. Elian aynı çatışmada yalnızca bir Yara kazandı.

## Kısa mola ve Yara Compel'i

- Raska bir d8 Toparlanma Zarı harcadı ve tam CP'ye döndü.
- Oru bir d8 Toparlanma Zarı harcadı ve tam CP'ye döndü.
- Elian bir d6 Toparlanma Zarı harcadı ve 6/7 CP'ye döndü.
- Seli Toparlanma Zarı sakladı; kısa mola sonunda 1 Odak geri kazandı.
- Raska 1. seviyede olduğu için kısa molada Lütuf kazanmadı.
- Büyücü 1. seviyede Büyü Yenileme sahibi olmadığı için yuva kazanmadı.
- Mucit 1. seviyede Hızlı Kurulum sahibi olmadığı için Yük yenileme zarı atmadı.

GM, Elian'ın Yarasını Compel etti: titreyen eli kristal numuneyi güvenle tutmasını engelledi. Elian kabul etti, Oru numuneyi devraldı ve yaklaşan denetçi yüzünden grup daha hızlı karar vermek zorunda kaldı. Elian 1 RP kazandı. Komplikasyon ipucunu yok etmedi ve Elian'ı sahneden çıkarmadı.

## Doğrulanan kurallar

- [x] 27 point-buy ile dört geçerli karakter
- [x] Demacialı Büyücü, Noxuslu Ruhban, Targonlu Mucit, Zaunlu Avcı
- [x] Avantaj ve doğal 20'nin beceri kontrolündeki davranışı
- [x] `+1d6` Invoke
- [x] Sahne detayı Invoke
- [x] Compel kabulü ve reddi
- [x] 0 RP'de yeni Invoke kullanamama
- [x] Ana Aksiyon, Hızlı Aksiyon ve Tepki ayrımı
- [x] Sınıf kaynağı ile RP'nin ayrı kalması
- [x] 0 CP, ölüm kurtarması, iyileşerek dönüş ve Yara
- [x] Yara Compel'inin ilerlemeyi durdurmaması
- [x] Minyon ve standart düşman şablonları
- [x] Kısa mola kaynak yenilenmesi

## Bulunan eksikler

### Oynanışı etkileyen

1. **Sınıf seçimleri masa panelinde eksik.** Büyücü büyü kitabındaki altı büyüyü ve hazırladığı büyüleri kaydedemiyor. Ruhban üç duasını, Mucit dört cihazını seçemiyor. Av İşareti ayrı bir kullanım kartı olarak görünmüyor. Kurallar kitapta var; panelde elle not almak gerekiyor.
2. **Toparlanma Zarı arayüzü yok.** Kısa mola düğmesi CP iyileştirmiyor, kaç Toparlanma Zarı kaldığını izlemiyor ve oyuncuya kaç zar harcayacağını sormuyor.
3. **Kısa mola seviyesi yanlış uygulanabiliyor.** Panel, 1. seviye Ruhbana kısa molada 1 Lütuf veriyor; sınıf metnine göre bu özellik 2. seviyede açılır.
4. **Yara kaydı yok.** 0 CP'den dönen karakter için Hafif/Ağır/Kritik Yara ve ilgili Aspect yalnızca serbest not alanına yazılabiliyor.

### Netleştirme ve kullanım kolaylığı

5. **Düşman hasarı zar biçimi belirtilmiyor.** GM tablosu 1. seviye standart düşman için “6 tur başı hedef hasar” veriyor; kritik isabette hangi zarların ikiye katlanacağı belli değil. Örnek bir dağılım (`1d8 + 2`) eklenmeli.
6. **Tur ve round aynı anda artıyor.** Masa panelindeki Turu Bitir, karakter turuyla round'u birlikte artırıyor. Round ancak bütün katılımcılar oynadıktan sonra ilerlemeli veya panel yalnız “tur sayacı” göstermeli.
7. **Durum adı uyuşmazlığı var.** Temel kurallardaki `Kısıtlanmış`, panelde `Tutulmuş` olarak geçiyor; panel ayrıca çekirdek durum tablosunda bulunmayan `Bitkin` seçeneğini gösteriyor.

## Son karar

**Masaüstü kuralları:** Oynanabilir erken sürüm.

**Web karakter oluşturucu:** Dört karakteri temel değerleriyle oluşturabilir.

**Web masa paneli:** Basit CP, RP, kaynak ve cantrip kullanımında çalışır; fakat büyü/dua/cihaz seçimi, Toparlanma Zarı ve Yara yönetimi tamamlanmadan kural kitabının tamamını tek başına yürütemez.

Önerilen sonraki geliştirme sırası:

1. Büyü, dua, cihaz ve Avcı teknikleri seçim/kullanım ekranı.
2. Toparlanma Zarı ve sınıf seviyesine göre doğru kısa mola çözümü.
3. Yara yöneticisi ve Yara Compel kaydı.
4. Tur/round ve durum adı düzeltmeleri.

