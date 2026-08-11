---
title: Ekonomi, Zanaat ve Ganimet
slug: /icerik/ekonomi-zanaat-ganimet
order: 10
version: 0.6.0
status: complete-draft
---

# Ekonomi, Zanaat ve Ganimet

Bu belge para, alışveriş, yaşam giderleri, eşya bulunabilirliği, üretim, onarım, söküm ve görev ödüllerini yönetir. Amaç tek tek her bölgenin para tarihini simüle etmek değil, [İtemler ve Ekipman Kataloğu](Itemler.md) içindeki yüzlerce eşyayı ortak ve dengeli bir ekonomiyle oynatmaktır.

Eşya etkileri ve Bağ kuralları için [İtemler](Itemler.md), genel kontroller için [Temel Kurallar](../01-temel-kurallar.md), içerik güç bütçeleri için [GM ve Homebrew](../04-gm-homebrew.md) kullanılır.

## Para sistemi

**ECON-CORE-001 — Ortak hesap birimi:** Kurallar fiyatları **altın** ile gösterir. Bölgede kullanılan para sikke, ticaret senedi, lonca kredisi, değerli maden, takas ürünü veya başka ad taşıyabilir; mekanik değer altın karşılığıyla tutulur.

| Birim | Dönüşüm | Tipik kullanım |
|---|---:|---|
| 1 bakır | `0,01 altın` | Küçük yiyecek, basit sarf |
| 1 gümüş | `0,1 altın` | Günlük hizmet, ucuz konaklama |
| 1 altın | `10 gümüş = 100 bakır` | Ekipman, ücret, ticaret |

**ECON-CORE-002 — Kur farkı yok:** Bölgesel para değişimi normal koşullarda ek hesap gerektirmez. Savaş, abluka, sahte para veya yasak pazar sahnenin konusuysa GM fiyatı en fazla yüzde 25 değiştirebilir veya uygun bir sosyal kontrol isteyebilir.

**ECON-CORE-003 — Ağırlık:** 100 sikke yaklaşık 1 kilogramdır. Büyük servet külçe, senet, değerli taş veya kurum hesabı biçiminde taşınabilir.

**ECON-CORE-004 — Servet güç değildir:** Para doğrudan Rün Puanı, sınıf kaynağı, Yetenek Artışı veya seviye satın alamaz. Güçlü eşya için nadirlik, bulunabilirlik, seviye ve Bağ sınırları birlikte uygulanır.

## Başlangıç parası

**ECON-START-001 — Varsayılan başlangıç:** Birinci seviye karakter sınıf ve paketinden gelen bütün başlangıç ekipmanına ek olarak `15 altın` taşır.

| Başlangıç kademesi | İlave para | Başlangıçta seçilebilir ek eşya |
|---|---:|---|
| Sıradan — seviye 1 | 15 altın | Yok |
| Deneyimli — seviye 3 | 40 altın | Bir Basit eşya |
| Bölgesel — seviye 5 | 100 altın | Bir Sıradışı eşya |
| Kahramansı — seviye 9 | 400 altın | Bir Ender eşya; Bağ kuralları geçerli |
| Efsanevi — seviye 13 | 1.500 altın | Bir Çok Ender eşya; Bağ kuralları geçerli |
| Dünyayı etkileyen — seviye 17 | 5.000 altın | GM onaylı bir Efsanevi eşya; Bağ kuralları geçerli |

**ECON-START-002 — Grup eşitliği:** Daha yüksek seviyeden başlayan bütün karakterler aynı para ve ek eşya bütçesini alır. Hikâye gereği yoksul olan karakterin mekanik bütçesi bağlantı, saklı kaynak, borç verilmiş ekipman veya grup fonu olarak korunur.

**ECON-START-003 — Başlangıç satışı:** Karakter oluştururken alınan sınıf ekipmanı satılarak para artırılamaz. İstenmeyen başlangıç silahı, zırhı veya paketi GM onayıyla benzer değerde başka sıradan seçenekle değiştirilir.

## Günlük fiyatlar

| Mal veya hizmet | Fiyat |
|---|---:|
| Basit öğün | 2 gümüş |
| İyi öğün | 5 gümüş |
| Bir günlük erzak | 5 gümüş |
| Ortak yatakhane | 3 gümüş/gece |
| Güvenli özel oda | 1 altın/gece |
| Varlıklı konaklama | 5 altın/gece |
| Şehir içi ulaşım | 1–5 gümüş |
| Bir günlük binek veya küçük tekne | 2 altın |
| Bir günlük araba ve sürücü | 5 altın |
| Sıradan ulak | 1 altın + mesafe |
| Güvenli bölgeler arası kargo | Değerin yüzde 5'i, en az 5 altın |
| Sıradan işçilik günü | 5 gümüş |
| Uzman işçilik günü | 3 altın |
| Şifacı takımı dolumu | 5 altın |
| Zanaat takımı | 15 altın |

**ECON-DAILY-001 — Yaşam gideri:** GM gündelik harcamalar önemli değilse her gün sikke düşmek yerine uzun yolculuk veya şehirde geçirilen hafta sonunda toplu ödeme isteyebilir.

| Yaşam düzeyi | Haftalık bedel | Anlatısal sonuç |
|---|---:|---|
| Yoksul | 2 altın | Güvenlik ve mahremiyet zayıf |
| Mütevazı | 7 altın | Temel ihtiyaçlar karşılanır |
| Rahat | 25 altın | Güvenli konaklama ve düzgün bağlantılar |
| Varlıklı | 100 altın | İtibarlı çevrelere erişim; otomatik nüfuz değil |

## Sıradan ekipman fiyatları

Bu tablo [Karakter Yaratımı](../03-karakter-yaratimi.md) belgesindeki temel ekipmanı fiyatlandırır.

| Ekipman | Fiyat | Ekipman | Fiyat |
|---|---:|---|---:|
| Hançer, sopa | 2 altın | Kısa kılıç, mızrak | 8 altın |
| Uzun kılıç, savaş çekici | 15 altın | Büyük balta, büyük kılıç | 25 altın |
| Kısa yay | 20 altın | Uzun yay | 40 altın |
| Arbalet | 35 altın | Tabanca | 60 altın |
| Tüfek | 100 altın | 20 ok veya 10 mermi | 1 altın |
| Hafif zırh | 10 altın | Güçlendirilmiş hafif | 35 altın |
| Orta zırh | 75 altın | Ağır zırh | 250 altın |
| Plaka zırh | 750 altın | Kalkan | 15 altın |

**ECON-GEAR-001 — Mühimmat:** Normal kampanyada mühimmat yalnızca çatışma sonunda takip edilir. Çatışmada kullanılan mühimmatın yarısı sağlam biçimde geri alınabilir; ateşli silah mühimmatı geri alınamaz.

**ECON-GEAR-002 — Ateşli silah erişimi:** Tabanca ve tüfek fiyatı bulunabilirliği garanti etmez. Bölgesel pazar ve yasal durum ayrıca uygulanır.

## Nadirlik, fiyat ve erişim

**MARKET-RARITY-001 — Fiyat aralığı:** Katalogdaki eşyanın kesin fiyatı yoksa aşağıdaki aralık kullanılır. GM fiyatı etkinin gücü, sarf olup olmaması ve yerel talebe göre aralık içinde seçer.

| Nadirlik | Önerilen seviye | Fiyat aralığı | Bağ | Normal satış durumu |
|---|---:|---:|---:|---|
| Basit | 1+ | 1–50 altın | 0 | Yaygın pazarda bulunabilir |
| Sıradışı | 1+ | 50–250 altın | 0 | Uzman dükkân veya bağlantı |
| Ender | 5+ | 250–1.000 altın | 1 | Büyük şehir, lonca veya görev |
| Çok Ender | 9+ | 1.000–5.000 altın | 1 | Özel üretici veya tehlikeli pazar |
| Efsanevi | 13+ | 5.000–20.000 altın | 2 | Normal rafta satılmaz; hikâye erişimi |
| Mitik | 17+ | Fiyatlandırılmaz | 2 | Görev, dünya olayı veya eşsiz üretim |

**MARKET-RARITY-002 — Seviye kilidi:** Önerilen seviyenin altındaki karakter eşyayı taşıyabilir fakat Bağ kuramaz ve mekanik özelliklerini kullanamaz. Basit silahın normal hasarı gibi sıradan işlevleri çalışmaya devam eder.

**MARKET-RARITY-003 — Kesin fiyat yöntemi:** Aralıkta hızlı fiyat belirlemek için alt sınırı kullan ve aşağıdaki çarpanlardan yalnızca birini uygula.

| Durum | Çarpan |
|---|---:|
| Sarf malzemesi veya tek kullanımlık | ×0,5 |
| Dar, yalnız savaş dışı fayda | ×1 |
| Düzenli savaş etkisi | ×2 |
| İki güçlü veya çok esnek etki | ×3 |
| Bölgenin uzmanlık ürünü | ×0,75; aralığın altına inmez |
| Yasak, kaçak veya abluka altında | ×1,5; aralığın üstünü aşabilir |

**MARKET-RARITY-004 — Doran ilkesi:** Doran eşyaları ve benzer Basit kimlik eşyaları çoğunlukla `25 altın`dır. Basit hasar zarının fiyatı, daha yüksek nadirliğin çok etkili özellikleriyle aynı seviyeye çıkmaz.

## Eşya bulma

Bir karakter parası olsa bile nadir eşyayı otomatik bulamaz.

**MARKET-SEARCH-001 — Arama süresi:** Uygun yerleşimde bir günlük araştırma ve aşağıdaki kontrol yapılır. Karakter bölge bağlantısı, ilgili meslek veya doğru pazar bilgisi kullanıyorsa uygun beceri seçilir: İnceleme, İkna, Teknoloji, Büyü Bilgisi, İnanç ve Ruhlar ya da Hayatta Kalma.

| Nadirlik | Arama DC'si | Asgari pazar |
|---|---:|---|
| Basit | Otomatik | Köy veya mahalle |
| Sıradışı | 10 | Kasaba veya uzman |
| Ender | 13 | Büyük şehir veya güçlü bağlantı |
| Çok Ender | 16 | Bölgesel merkez veya gizli pazar |
| Efsanevi | 20 | Eşsiz bağlantı ve hikâye erişimi |
| Mitik | Aranamaz | GM'nin dünya olayı |

**MARKET-SEARCH-002 — Başarısız arama:** Başarısızlık “eşya dünyada yok” anlamına gelmez. Bir hafta aynı pazarda tekrar aranamaz; GM bir üretici, söylenti, borç veya görev yolu gösterebilir.

**MARKET-SEARCH-003 — Pazarlık:** Alıcı veya satıcıyla gerçek bir pazarlık varsa KAR (İkna, Aldatma veya Gözdağı) kontrolü yapılabilir. Başarı fiyatı yüzde 10 değiştirir, 5 veya fazla fark yüzde 20 değiştirir. Aynı alışverişte tek kontrol; başarısızlık fiyatı yükseltmez fakat ilişki komplikasyonu yaratabilir.

**MARKET-SEARCH-004 — Sahte eşya:** GM sahte ürünü yalnız oyunculara kontrol veya doğrulama fırsatı verdiyse kullanır. Başarılı Teknoloji, Büyü Bilgisi, İnanç ve Ruhlar ya da ilgili zanaat kontrolü sahteyi satın almadan fark eder.

## Bölgesel pazarlar

Bu tablo fiyat bonusu değil, bulunabilirlik ve anlatısal üretim rehberidir.

| Bölge | Daha kolay bulunanlar | Kısıtlı veya hassas içerik |
|---|---|---|
| Bandle City | Tuhaf çantalar, geçit araçları, yanılsama eşyaları | Yolları zorlayan ağır veya katı düzenekler |
| Bilgewater | Ateşli silah, denizcilik, canavar parçaları | Güvenilir garanti ve temiz kaynak belgesi |
| Demacia | Usta silah, zırh, petricite temalı koruma | Ruhsatsız büyüsel eşya ve kaçak teknoloji |
| Freljord | Soğuk koruması, kürk, kemik ve Gerçek Buz esintili eser | Kırılgan şehir teknolojisi |
| Ionia | Ruh, canlı malzeme, denge ve hareket eşyaları | Doğaya zarar veren seri üretim |
| Ixtal | Element odağı, kristal ve çevre araçları | Dışarıya açık satış ve ihracat |
| Noxus | Askerî teçhizat, arena silahı, savaş büyüsü | Devlet veya lejyon mührü gerektiren ürün |
| Piltover | Hextech, hassas araç, lisanslı prototip | Lisanssız veya patenti çalınmış ürün |
| Shadow Isles | Ruh kalıntısı ve lanetli eser | Güvenli pazar; alışveriş çoğunlukla keşif şeklinde |
| Shurima | Harabe eseri, çöl ekipmanı, güneş/kum teması | Mezar hakkı ve hanedan sahipliği |
| Targon | Göksel odak, tırmanış, inanç eşyası | Kutsal emanetlerin sıradan ticareti |
| Zaun | Chemtech, hurda prototip, filtre ve serum | Güvenlik standardı ve yasal garanti |

**MARKET-REGION-001 — Uzmanlık erişimi:** Eşya bölgenin kolay bulunan grubundaysa arama bir pazar boyutu daha küçük yerde yapılabilir. Fiyat otomatik düşmez.

**MARKET-REGION-002 — Kültürel sınır:** Kısıtlı eşya imkânsız değildir; bağlantı, ruhsat, görev veya karaborsa gerektirir. Bölge paketi yasayı otomatik aşmaz.

## Karaborsa ve yasak mallar

**MARKET-BLACK-001 — Karaborsa bedeli:** Kaçak eşyanın fiyatı normalde yüzde 50 artar. Arama DC'si 2 yükselir ve bağlantı olmadan arama en az üç gün sürer.

**MARKET-BLACK-002 — Risk:** Satın alma öncesinde GM açık risklerden birini bildirir: takip edilme, sahte parça, borç, çalıntı mal, sınırlı garanti veya rakip alıcı. Risk, ilerlemeyi durduran sürpriz ceza olarak kullanılmaz.

**MARKET-BLACK-003 — Yasal sonuç:** Bir eşyanın yasak olması onun mekanik gücünü değiştirmez. Yakalanma olasılığı, taşıma yöntemi ve toplumsal sonuçlar sahnenin kurgusuyla çözülür.

## Zanaat kaynakları

Bir eşya üretmek için üç şey gerekir: **şema**, **malzeme** ve **çalışma süresi**.

**CRAFT-CORE-001 — Şema:** Basit ve Sıradışı sıradan eşyalar bilinen zanaatla üretilebilir. Ender ve üstü eşya için tarif, öğretmen, sökülmüş örnek veya araştırma gerekir.

**CRAFT-CORE-002 — Malzeme bedeli:** Üretim malzemeleri eşyanın kesin piyasa fiyatının yüzde 50'sine mal olur. Mitik eşya para yüzdesiyle üretilemez; en az üç eşsiz hikâye bileşeni ister.

**CRAFT-CORE-003 — Araç ve çalışma alanı:** Uygun zanaat takımı gerekir. Çok Ender ve üstü eşya ayrıca laboratuvar, ocak, kutsal alan, ruh korusu veya eşdeğer güvenli çalışma alanı ister.

### Üretim yaklaşımları

| Yaklaşım | Tipik beceri | Örnek ürün |
|---|---|---|
| Usta işi | Atletizm veya ilgili zanaat | Silah, zırh, mekanik parça |
| Hextech | Teknoloji veya Büyü Bilgisi | Kristal cihaz, enerji silahı |
| Chemtech | Teknoloji veya Tıp | Serum, toksin, basınçlı düzenek |
| Element | Büyü Bilgisi veya Doğa | Ateş, buz, taş, rüzgâr odağı |
| Ruhsal | İnanç ve Ruhlar veya Doğa | Tılsım, ruh bağı, arındırma aracı |
| Göksel | İnanç ve Ruhlar veya Büyü Bilgisi | Yıldız odağı, kutsal emanet |
| Gölge/lanet | Büyü Bilgisi veya İnanç ve Ruhlar | Riskli ruh eşyası; GM onayı |

**CRAFT-CORE-004 — Anlatı ve mekanik:** Aynı eşya farklı yaklaşımla üretilebilir. Yaklaşım hasar türünü veya etkiyi değiştirmez; görünüşü, gereken malzemeyi ve olası komplikasyonu değiştirir.

## Üretim süresi ve kontroller

| Nadirlik | Çalışma süresi | Aşama sayısı | Üretim DC'si |
|---|---:|---:|---:|
| Basit | 4 saat | 1 | 10 |
| Sıradışı | 2 gün | 1 | 12 |
| Ender | 1 hafta | 2 | 14 |
| Çok Ender | 3 hafta | 3 | 17 |
| Efsanevi | 8 hafta | 4 | 20 |
| Mitik | Hikâye projesi | En az 5 | 23+ |

**CRAFT-CHECK-001 — Aşama kontrolü:** Her aşama sonunda uygun yetenek + uzmanlık kontrolü yapılır. Uygun zanaat takımında uzmanlık varsa uzmanlık bonusu eklenir; beceri ve takım aynı uzmanlık bonusunu iki kez eklemez.

**CRAFT-CHECK-002 — Başarı:** Gerekli aşamalar başarıyla tamamlandığında eşya üretilir. Kontrol DC'yi 5 veya fazla aşarsa sonraki aşamanın süresi yüzde 25 kısalır.

**CRAFT-CHECK-003 — Başarısızlık:** Başarısız aşama eşyayı yok etmez. Aşağıdakilerden biri seçilir:

- Aşama süresinin yarısı kadar ek çalışma,
- Toplam fiyatın yüzde 10'u kadar ek malzeme,
- GM ile kararlaştırılmış onarılabilir **Kusur Aspect'i**.

**CRAFT-CHECK-004 — Büyük başarısızlık:** Doğal 1 veya DC'nin 5 altında sonuçta iki sonuç seçilir. Kusur oyuncu iradesini elinden almaz ve eşyanın ana etkisini bütünüyle kapatmaz.

**CRAFT-CHECK-005 — Yardım:** En fazla bir yardımcı aynı aşamada Yardım Et ile avantaj sağlayabilir. Yardımcının ilgili araç veya beceride uzman olması gerekir; çalışma süresince başka downtime projesi yürütemez.

**CRAFT-CHECK-006 — Kesintili çalışma:** Üretim günlerinin art arda olması gerekmez. Güvenli saklanan proje ilerlemesini korur; taşınması zor laboratuvar veya ocak yeni yerde kurulmalıdır.

## Şema öğrenme ve araştırma

**CRAFT-SCHEMA-001 — Şema kopyalama:** Bulunan şema bir günlük çalışma ve eşya fiyatının yüzde 5'i kadar çizim/deney bedeliyle kişisel arşive kopyalanır.

**CRAFT-SCHEMA-002 — Eşyadan öğrenme:** Eşyayı bozmadan inceleyerek şema çıkarmak eşyanın nadirlik DC'sine karşı üç başarılı kontrol ister; her kontrol bir hafta sürer. Üç başarısızlıkta araştırma o örnekle ilerleyemez fakat eşya zarar görmez.

**CRAFT-SCHEMA-003 — Ortak çalışma:** Şema sahibinin izni varsa başka zanaatkâr kullanabilir. Şema tek başına nadir malzeme, ruhsat veya üretim alanı sağlamaz.

## Sarf malzemesi üretimi

**CRAFT-CONSUME-001 — Parti üretimi:** Aynı Basit veya Sıradışı iksir, mühimmat, bomba ya da tek kullanımlık eşya dört adetlik parti hâlinde üretilebilir. Süre iki kat, toplam malzeme bedeli dört eşyanın yüzde 40'ıdır.

**CRAFT-CONSUME-002 — Raf ömrü:** Normal sarf malzemesi bozulmaz. Geçici kamp karışımı yüzde 25 bedelle üretilebilir fakat bir sonraki uzun mola sonunda etkisini kaybeder.

**CRAFT-CONSUME-003 — Kullanım sınırı:** Üretim, bir hedefin uzun mola başına kullanım veya iyileştirme sınırını aşmaz. Çok sayıda iksir sınırsız 0 CP döngüsü kurmaz.

## Eşya geliştirme

**CRAFT-UPGRADE-001 — Bir kademe:** Uygun şema varsa eşya bir üst nadirliğe geliştirilebilir. Yeni eşya katalogda mevcut olmalı veya GM tarafından homebrew bütçesiyle tasarlanmalıdır.

**CRAFT-UPGRADE-002 — Bedel:** Geliştirme malzemesi yeni eşyanın fiyatının yüzde 50'si ile eski eşyanın fiyatının yüzde 25'i arasındaki farktır; en az yeni nadirlik alt sınırının yüzde 20'sidir.

**CRAFT-UPGRADE-003 — Süre ve DC:** Yeni nadirliğin üretim süresi, aşama sayısı ve DC'si kullanılır. Eski eşya proje boyunca kullanılamaz.

**CRAFT-UPGRADE-004 — Bağ:** Geliştirme tamamlanınca eski Bağ çözülür. Yeni eşyanın Bağ maliyeti uygulanır; karakter bir sonraki uzun mola sonunda bağ kurabilir.

**CRAFT-UPGRADE-005 — Mitik sınır:** Efsanevi eşya parayla Mitik yapılmaz. Mitik dönüşüm karakterin Aspect'i, büyük bir dünya olayı ve eşsiz bileşenlerle yürütülen hikâye projesidir.

## Onarım ve kusurlar

Normal kullanım için dayanıklılık puanı takip edilmez.

**CRAFT-REPAIR-001 — Hasarlı eşya:** Önemli bir hikâye sonucu eşya hasar görürse GM **Hasarlı**, **Kararsız** veya benzeri geçici Aspect yazar. Bu Aspect yalnız Compel veya açık kurgu engeliyle sorun çıkarır; gizli sayısal ceza vermez.

| Nadirlik | Onarım bedeli | Süre | DC |
|---|---:|---:|---:|
| Basit/Sıradışı | Fiyatın yüzde 10'u | 4 saat | 10 |
| Ender | Fiyatın yüzde 15'i | 2 gün | 13 |
| Çok Ender | Fiyatın yüzde 20'si | 1 hafta | 16 |
| Efsanevi | Fiyatın yüzde 25'i | 3 hafta | 19 |
| Mitik | Hikâye bileşeni | Proje | 22+ |

**CRAFT-REPAIR-002 — Başarısız onarım:** Malzeme kaybolmaz ve eşya kötüleşmez; süre yarısı kadar uzar. Doğal 1'de yeni bir ipucu, uzman ihtiyacı veya malzeme komplikasyonu ortaya çıkar.

**CRAFT-REPAIR-003 — Yok olmuş eşya:** Tamamen yok edilen eşya onarılamaz. GM böyle bir sonucu yalnız açık risk, oyuncu seçimi veya büyük hikâye olayıyla kullanır; sıradan kritik başarısızlık bağlı eşyayı kalıcı silmez.

## Söküm ve geri kazanım

**CRAFT-SALVAGE-001 — Söküm:** Eşya, uygun araçla onarım süresinin yarısı kadar çalışılarak sökülebilir. Piyasa fiyatının yüzde 25'i kadar genel malzeme geri kazanılır.

**CRAFT-SALVAGE-002 — Uzman söküm:** Üretim DC'sine karşı başarılı kontrol geri kazanımı yüzde 35'e çıkarır. Doğal 20'de ayrıca şemayı öğrenme araştırmasına bir başarı yazılır.

**CRAFT-SALVAGE-003 — Bağlı eşya:** Bağlı eşya sökülmeden önce sahibi Bağı uzun mola sonunda isteyerek çözmelidir. Başka karakterin bağlı eşyası iradesi dışında güvenli biçimde sökülemez.

**CRAFT-SALVAGE-004 — Mitik eşya:** Mitik eşya sıradan malzemeye çevrilemez. Parçalanması dünya sonucu doğurabilecek ayrı GM olayıdır.

## Sipariş üretimi

**CRAFT-COMMISSION-001 — Usta bulma:** Sipariş verilecek ustayı bulma DC'si eşya arama DC'siyle aynıdır. Usta şemaya ve uygun çalışma alanına sahip olmalıdır.

**CRAFT-COMMISSION-002 — Fiyat:** Sipariş fiyatı normal piyasa fiyatının yüzde 120'sidir. Yüzde 50 peşin ödenir; kalan teslimde. Oyuncu malzeme veya şema sağlarsa GM ilgili bedeli düşebilir.

**CRAFT-COMMISSION-003 — Süre:** Usta normal üretim süresini kullanır. Oyuncunun yardım etmesi yalnız karakter ilgili araçta uzmansa süreyi yüzde 25 azaltır.

**CRAFT-COMMISSION-004 — Güven:** Sipariş ustası eşyanın gizli sahibi olmaz. İhanet veya sahtecilik kullanılacaksa önceden ipucu ve karşı oyun fırsatı verilmelidir.

## Ganimet ilkeleri

**LOOT-CORE-001 — Ödül üçlüsü:** Büyük görev ödülü para, kullanılabilir eşya ve hikâye erişiminden en az ikisini içermelidir. Yalnız satılacak rastgele eşya vermek zorunlu değildir.

**LOOT-CORE-002 — Grup mülkiyeti:** Ganimetin paylaşım yöntemini oyuncular belirler. Sistem eşyayı ilk alan kişiye otomatik mülkiyet veya Bağ vermez.

**LOOT-CORE-003 — Seviye sınırı:** Ödül nadirliği grubun kademesini bir basamak aşabilir; fakat kullanımı önerilen seviye ve Bağ sınırına tabidir. Bu, gelecekteki hedef veya hikâye tohumu olabilir.

**LOOT-CORE-004 — Satış:** Kullanılmış sıradan eşya fiyatının yüzde 50'sine, nadir eşya yüzde 40'ına satılır. Uygun alıcı yoksa arama gerekir. Çalıntı veya hasarlı mal yüzde 10–25 değer kaybeder.

## Görev ödülü bütçeleri

Aşağıdaki değer dört kişilik grup ve yaklaşık iki–üç önemli çatışmalı görev içindir.

| Grup seviyesi | Toplam para ödülü | Kalıcı eşya | Sarf/yan ödül |
|---:|---:|---|---|
| 1–2 | 40–100 altın | 0–1 Basit | 2 Basit sarf |
| 3–4 | 100–250 altın | 1 Sıradışı | 2–3 Basit/Sıradışı sarf |
| 5–6 | 250–600 altın | 1 Ender veya 2 Sıradışı | 3 sarf, şema veya malzeme |
| 7–8 | 600–1.200 altın | 1 Ender + 1 Sıradışı | Ender şema veya bağlantı |
| 9–10 | 1.200–2.500 altın | 1 Çok Ender veya 2 Ender | Özel malzeme |
| 11–12 | 2.500–5.000 altın | 1 Çok Ender + 1 Ender | Efsanevi eşya ipucu |
| 13–14 | 5.000–9.000 altın | 1 Efsanevi veya 2 Çok Ender | Eşsiz bileşen |
| 15–16 | 9.000–15.000 altın | 1 Efsanevi + 1 Çok Ender | Mitik proje anahtarı |
| 17–18 | 15.000–25.000 altın | 1 Efsanevi; Mitik parça olabilir | Dünya bağlantısı |
| 19–20 | Para ikincildir | Mitik proje veya eşsiz ödül | Bölgesel/dünya sonucu |

**LOOT-BUDGET-001 — Bölme:** Para bütçesi bütün grubundur. Kalıcı eşya sayısı her karakter için değil, görev toplamıdır.

**LOOT-BUDGET-002 — Düşük ganimet kampanyası:** Bütçeler yarıya indirilebilir; düşman matematiği aynı kalır. Eşya erişimi azalırsa GM eşya gerektiren direnç veya engelleri de azaltmalıdır.

**LOOT-BUDGET-003 — Yüksek ganimet kampanyası:** Kalıcı eşya sayısı iki katına çıkarılabilir fakat Bağ sınırı değişmez. Fazla eşyalar yatay seçenek, takas ve zanaat malzemesi olur.

## Hızlı ganimet üretme

Bir görev sonunda aşağıdaki sırayı kullan:

1. Grup seviyesine göre para aralığı seç.
2. Görevin bölgesine uygun bir eşya kategorisi belirle.
3. Tablodaki kalıcı eşya sayısını seç.
4. En az bir sarf, şema, bağlantı veya özel malzeme ekle.
5. Ödülün neden orada olduğunu bir cümleyle açıkla.

**LOOT-ROLL-001 — Rastgele kategori:** Gerekiyorsa `d12` at.

| d12 | Kategori |
|---:|---|
| 1 | Silah |
| 2 | Zırh veya kalkan |
| 3 | Bot/hareket |
| 4 | Savunma eşyası |
| 5 | Büyü/ruh odağı |
| 6 | Teknoloji/cihaz |
| 7 | İyileştirme veya destek |
| 8 | Görüş/keşif |
| 9 | Sarf malzemesi |
| 10 | Zanaat şeması |
| 11 | Eşsiz malzeme |
| 12 | Bağlantı, ruhsat veya hikâye anahtarı |

**LOOT-ROLL-002 — Tekrar:** Sonuç gruba bütünüyle kullanışsızsa yeniden at veya aynı nadirlikte uygun kategori seç. Rastgelelik oyuncuyu ödülsüz bırakmak için kullanılmaz.

## Zenginlik ve kampanya dengesi

**ECON-BALANCE-001 — Beklenen servet:** Karakterlerin toplam parası tam güç ölçüsü değildir; Bağlı eşya sayısı ve nadirliği daha önemlidir. GM karşılaşmayı yalnız altın miktarına göre güçlendirmez.

**ECON-BALANCE-002 — Eşya doygunluğu:** Karakter Bağ sınırını doldurduysa yeni ödül yükseltme malzemesi, şema, sarf, bağlantı veya mevcut eşyanın hikâye gelişimi olabilir.

**ECON-BALANCE-003 — Para tüketimi:** Para yalnız ekipmana harcanmamalıdır. Güvenli üs, ulaşım, araştırma, ruhsat, uzman, topluluk yardımı ve zanaat projesi anlamlı harcama alanlarıdır.

**ECON-BALANCE-004 — Zorunlu yoksulluk yok:** Karakterin parasını çalmak veya eşyasını yok etmek kalıcı denge aracı değildir. Böyle olaylar açık risk, oyuncu seçimi ve geri kazanma yolu gerektirir.

## Ekonomi homebrew şablonu

**ECON-HOMEBREW-001 — Yeni eşya fiyatı:** Önce nadirliği ve Bağ maliyetini [İtemler](Itemler.md) bütçesiyle belirle; sonra nadirlik aralığında kesin fiyat seç. Fiyat mekanik olarak aşırı güçlü eşyayı dengelemez.

**ECON-HOMEBREW-002 — Yeni üretim yaklaşımı:** Yaklaşım bir beceri, araç, çalışma alanı ve malzeme türü tanımlar. Doğrudan daha düşük DC veya ücretsiz nadir eşya sağlamaz.

### Yeni pazar girdisi

```md
## [Yer veya bölge]

- **Pazar büyüklüğü:** Köy / kasaba / büyük şehir / bölgesel merkez.
- **Uzmanlık:** [Kolay bulunan kategoriler].
- **Kısıt:** [Ruhsat, tabu veya kıtlık].
- **Bağlantı:** [Usta, lonca, karaborsa veya kurum].
- **Fiyat etkisi:** En fazla ±%25; nedeni.
```

### Yeni üretim projesi

```md
## [Proje adı]

- **Sonuç:** [Eşya ve nadirlik].
- **Şema:** [Kaynak].
- **Yaklaşım:** [Beceri ve araç].
- **Malzeme:** [Altın bedeli ve özel bileşen].
- **Süre:** [Aşama sayısı].
- **DC:** [Nadirlik tablosu].
- **Komplikasyon:** [İlerlemeyi durdurmayan risk].
```

## Masa özeti

- Başlangıç: sınıf ekipmanı + `15 altın`.
- Basit/Sıradışı eşya Bağ istemez; Ender/Çok Ender 1, Efsanevi/Mitik 2 Bağ.
- Ender eşya için seviye 5, Çok Ender 9, Efsanevi 13, Mitik 17 önerilir.
- Üretim malzemesi normalde fiyatın yüzde 50'sidir.
- Söküm yüzde 25, başarılı uzman söküm yüzde 35 malzeme döndürür.
- Kullanılmış eşya normalde fiyatın yüzde 40–50'sine satılır.
- Mitik eşya satın alınmaz; hikâye projesiyle kazanılır.
- Ganimet bütçesi grup toplamıdır, karakter başına değildir.

## Kontrol listesi

- [ ] Eşyanın nadirliği, seviye önerisi ve Bağ maliyeti uyumlu.
- [ ] Fiyat, nadirlik aralığında ve etki gücüyle orantılı.
- [ ] Nadir eşya yalnız para sayımıyla otomatik bulunmuyor.
- [ ] Üretim şema, malzeme, süre ve araç gerektiriyor.
- [ ] Başarısız zanaat projeyi kalıcı olarak yok etmiyor.
- [ ] Mitik üretim dünya ve karakter hikâyesi gerektiriyor.
- [ ] Görev ödülü grubun seviyesine uygun.
- [ ] Fazla eşya Bağ sınırını aşarak pasif güç biriktirmiyor.

Bu kontrolü geçen ekonomi girdisi kampanyada kullanılmaya hazırdır.
