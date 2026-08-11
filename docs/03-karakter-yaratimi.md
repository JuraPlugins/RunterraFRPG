---
title: Karakter Yaratımı
slug: /karakter-yaratimi
order: 3
version: 0.6.0
status: playtest
---

# Karakter Yaratımı

Bu bölüm 1–20. seviyelerde eksiksiz karakter oluşturur. Zar ve çatışma terimleri [Temel Kurallar](01-temel-kurallar.md), Aspect ekonomisi [Rün Puanı](02-run-puani.md) belgesindedir.

## 1. Adım adım karakter

1. Bir konsept ve başlangıç seviyesi belirle; varsayılan seviye 1'dir.
2. Yetenek puanlarını dağıt.
3. Bir bölge ve bölge paketini seç.
4. Bir soy seç.
5. Bir sınıf seç; 3. seviyedeysen uzmanlık seç.
6. Sınıfının beceri ve ekipman seçimlerini yap.
7. CP, SS, hız, saldırılar ve kurtarma DC'lerini hesapla.
8. Kimlik, Bölge Bağı ve Kişisel Çatışma Aspect'lerini yaz.
9. 2 Rün Puanı ile başla.

## 2. Yetenek puanları

**CHAR-001 — Point-buy:** Altı yetenek 8'den başlar. Aşağıdaki maliyetlerle toplam 27 puan harcanır; sınıf ve soy seçimleri yetenek puanı eklemez.

| Puan | Maliyet | Puan | Maliyet |
|---:|---:|---:|---:|
| 8 | 0 | 12 | 4 |
| 9 | 1 | 13 | 5 |
| 10 | 2 | 14 | 7 |
| 11 | 3 | 15 | 9 |

Hızlı seçenek: `15, 14, 13, 12, 10, 8` değerlerini istediğin sırayla yerleştir. Başlangıçta hiçbir değer 15'i aşamaz.

## 3. Bölgeler

**CHAR-002 — Yatay kimlik:** Bölge paketi bir beceri, savaş dışı kültürel özellik, Aspect önerileri ve bağlantı/eşya verir. Bölge hiçbir sınıfa saldırı, hasar, SS veya güç DC'si bonusu vermez.

On iki bölgenin ayrıntılı kültürel çerçevesi, özellik sınırları ve köken soruları için [Bölgeler ve Kültürel Kökenler](icerik/Bölgeler.md) kataloğuna bak.

Her bölgeden:

- Listelenen üç beceriden birinde uzmanlık kazan.
- Kültürel özelliği edin.
- Üç bağlantı/eşyadan birini seç.
- Önerileri kullanarak veya değiştirerek Bölge Bağı Aspect'ini yaz.

### Bandle City

- **Beceriler:** Büyü Bilgisi, Gizlilik, Performans.
- **Tuhaf Yollar:** Uzun mola başına bir kez büyülü geçit, yön duygusu veya olağandışı mekânla ilgili bir kontrolde avantaj kazan.
- **Bağlantı/eşya:** Gezgin yordle, renk değiştiren pusula veya içine beklenenden fazlası sığan küçük çanta.
- **Aspect önerileri:** “Dünya Göründüğünden Daha Büyük”, “Hiçbir Kapı Tek Bir Yere Açılmaz”, “Merakım Beni Eve Götürür”.

| Sınıf | Karakter fikri |
|---|---|
| Savaşçı | Dev dünyasında cesaretini kanıtlayan küçük muhafız |
| Düzenbaz | Geçitleri kullanarak ortaya çıkıp kaybolan şakacı |
| Avcı | Büyülü patikaların ve kayıp yaratıkların iz sürücüsü |
| Büyücü | Gerçekliği oyun gibi büken meraklı araştırmacı |
| Ruhban | Neşe ve aidiyet bağlarını koruyan yol gösterici |
| Mucit | İşleyişi yalnız kendisine mantıklı gelen aygıt ustası |

### Bilgewater

- **Beceriler:** Atletizm, Gözdağı, Hayatta Kalma.
- **Liman Sezgisi:** Uzun mola başına bir kez denizcilik, liman suçları veya pazarlıkla ilgili savaş dışı kontrolde avantaj kazan.
- **Bağlantı/eşya:** Gemi tayfası, işaretli iskambil destesi veya deniz canavarı dişinden bıçak.
- **Aspect önerileri:** “Borçlar Gelgit Gibi Geri Döner”, “Şans Cesurları Sever”, “Her Limanda Bir Düşmanım Var”.

| Sınıf | Karakter fikri |
|---|---|
| Savaşçı | Güvertede hat tutan eski tayfa koruyucusu |
| Düzenbaz | Kart, tabanca ve yalanla yaşayan fırsatçı |
| Avcı | Deniz canavarlarının izini süren zıpkıncı |
| Büyücü | Derinlerden gelen uğursuz büyüleri öğrenen falcı |
| Ruhban | Boğulanların ruhlarına son sözlerini ulaştıran rehber |
| Mucit | Gemi enkazlarından silah ve araç yapan tamirci |

### Demacia

- **Beceriler:** Tarih, İçgörü, İkna.
- **Düzenin Dili:** Uzun mola başına bir kez hukuk, asalet, askerî protokol veya resmî kurumla ilgili savaş dışı kontrolde avantaj kazan.
- **Bağlantı/eşya:** Yerel görevli, mühürlü hizmet belgesi veya petricite kırıntılı aile yadigârı.
- **Aspect önerileri:** “Adalet Herkes İçin Aynı Olmalı”, “Görev Duygularımdan Önce Gelir”, “Büyüden Korkmam Öğretildi”.

| Sınıf | Karakter fikri |
|---|---|
| Savaşçı | Halkı korumayı unvanlardan üstün tutan piyade |
| Düzenbaz | Baskıcı bir emri delmek için kanunun boşluklarını kullanan ajan |
| Avcı | Sınır köylerini yaratıklardan koruyan izci |
| Büyücü | Gücünü saklarken ülkesini terk etmek istemeyen kaçak büyücü |
| Ruhban | Adalet ile merhamet çatışınca halkın yanında duran şifacı |
| Mucit | Petricite ve mekanik bilgiyi birleştiren kuşatma çırağı |

**Demacia ters-kutup örneği:** Demacialı Büyücü yasaklanmış olmak zorunda değildir; saklanan, reform arayan, devlet adına denetlenen veya sürgünden dönen biri olabilir. Bölge özelliği büyüyü güçlendirmez, fakat sosyal çatışmayı ve Aspect kullanımını besler.

### Freljord

- **Beceriler:** Atletizm, Hayvan İdaresi, Hayatta Kalma.
- **Kışta Doğan:** Doğal soğuk ve kar kaynaklı savaş dışı kontrollerde avantajlısın; normal kış koşulları yolculuğunu tek başına durdurmaz.
- **Bağlantı/eşya:** Kabile büyüğü, kemik tılsım veya sıcak tutan ağır kürk.
- **Aspect önerileri:** “Kışa Karşı Birlikte Dururuz”, “Gücümü Kabilem İçin Taşırım”, “Eski Ruhlar Bizi İzliyor”.

| Sınıf | Karakter fikri |
|---|---|
| Savaşçı | Kalkan duvarında yetişmiş kabile savaşçısı |
| Düzenbaz | Düşman kamplarından yiyecek ve sır çalan kurtulan |
| Avcı | Donmuş arazide sürüleri ve canavarları izleyen gözcü |
| Büyücü | Buzun altındaki kadim gücü uyandıran kâhin |
| Ruhban | Atalarla konuşan ve anlaşmazlıkları yatıştıran şaman |
| Mucit | Hurda metalden soğuğa dayanıklı düzenekler yapan usta |

### Ionia

- **Beceriler:** Büyü Bilgisi, Doğa, İçgörü.
- **Ruhsal Uyum:** Uzun mola başına bir kez ruhsal dengesizlik, canlı çevre veya duygu akışıyla ilgili savaş dışı kontrolde avantaj kazan.
- **Bağlantı/eşya:** Köy ustası, meditasyon boncuğu veya canlı ağaçtan oyulmuş araç.
- **Aspect önerileri:** “Denge Hareketsizlik Değildir”, “Savaş Bitti Ama İçimde Sürüyor”, “Ruhlar Her Kararı Hatırlar”.

| Sınıf | Karakter fikri |
|---|---|
| Savaşçı | Barışı korumak için tekrar silah alan veteran |
| Düzenbaz | İşgalin bıraktığı gizli ağlarda çalışan haberci |
| Avcı | Ruhani ormanların sınırlarını kollayan bekçi |
| Büyücü | Doğal büyü akışını disiplinle şekillendiren öğrenci |
| Ruhban | Öfkeli ruhlarla yaşayanlar arasında arabulucu |
| Mucit | Mekanik yerine canlı malzemelerle çalışan yenilikçi |

### Ixtal

- **Beceriler:** Büyü Bilgisi, Doğa, İnceleme.
- **Element Okuması:** Uzun mola başına bir kez doğal tehlike, element izi veya gizlenmiş çevresel düzeni inceleyen kontrolde avantaj kazan.
- **Bağlantı/eşya:** Element öğretmeni, kristal ölçüm taşı veya sarmaşıktan örülmüş hafif araç.
- **Aspect önerileri:** “Dış Dünya Ne Kadarını Bilmeli?”, “Elementler Yalan Söylemez”, “Geleneği Korumak Değişmemek Değildir”.

| Sınıf | Karakter fikri |
|---|---|
| Savaşçı | Element eğitimini silah disiplinine dönüştüren muhafız |
| Düzenbaz | Kapalı şehirlerin sırlarını dışarı taşıyan kaçak |
| Avcı | Yağmur ormanının yırtıcılarıyla birlikte avlanan koruyucu |
| Büyücü | Element aksiyomlarını sınayan genç usta |
| Ruhban | Toprak ve halk arasındaki bağı onaran arabulucu |
| Mucit | Element kristallerini araçlara bağlayan deneyci |

### Noxus

- **Beceriler:** Atletizm, Gözdağı, Tarih.
- **Liyakat Ağı:** Uzun mola başına bir kez askerî hiyerarşi, güç dengesi, arena veya lonca bağlantısıyla ilgili savaş dışı kontrolde avantaj kazan.
- **Bağlantı/eşya:** Eski birlik arkadaşı, kazanılmış rütbe işareti veya fetih bölgesinden hatıra.
- **Aspect önerileri:** “Güç Kazanılır, Verilmez”, “İmparatorluk Bana Bir Yer Açtı”, “Zaferin Bedelini Ben Bilirim”.

| Sınıf | Karakter fikri |
|---|---|
| Savaşçı | Soyuna değil başarısına güvenen lejyon veteranı |
| Düzenbaz | Politik rakiplerin açıklarını bulan saha ajanı |
| Avcı | İmparatorluğun tehlikeli sınırlarında görev yapan takipçi |
| Büyücü | Yeteneğini imparatorluk hizmetinde geliştiren savaş büyücüsü |
| Ruhban | Gücün yalnız fetih değil dayanışma olduğuna inanan savaş şifacısı |
| Mucit | Lejyonun ihtiyaçlarına pratik çözümler üreten mühendis |

**Noxus ters-kutup örneği:** Noxuslu Ruhban pasif veya barışçıl olmak zorunda değildir. Yaralıları tekrar ayağa kaldırmayı, birliğin iradesini güçlendirmeyi ya da imparatorluğun “her yeteneğe yer var” iddiasını sınamayı görev edinebilir.

### Piltover

- **Beceriler:** İnceleme, İkna, Teknoloji.
- **Akademik Erişim:** Uzun mola başına bir kez akademi, ticaret evi, patent veya karmaşık aygıtla ilgili savaş dışı kontrolde avantaj kazan.
- **Bağlantı/eşya:** Akademi asistanı, prototip lisansı veya hassas ölçüm takımı.
- **Aspect önerileri:** “İlerlemenin Bir Bedeli Vardır”, “İtibar Kapıları Açar”, “Her Sorunun Zarif Bir Çözümü Olmalı”.

| Sınıf | Karakter fikri |
|---|---|
| Savaşçı | Ticaret konvoylarını koruyan disiplinli muhafız |
| Düzenbaz | Yüksek sosyete sırlarını bilgiye çeviren aracı |
| Avcı | Kaçak teknolojileri ve tehlikeli örnekleri takip eden görevli |
| Büyücü | Büyüyü akademik yöntemlerle sınıflandıran araştırmacı |
| Ruhban | İlerlemenin geride bıraktığı insanlara hizmet eden gönüllü |
| Mucit | Patent baskısıyla idealleri arasında kalan hextech çırağı |

### Shadow Isles

- **Beceriler:** Büyü Bilgisi, Gizlilik, İnanç ve Ruhlar.
- **Sis Sezgisi:** Uzun mola başına bir kez hayalet, lanet, anı kalıntısı veya ruhsal geçitle ilgili savaş dışı kontrolde avantaj kazan.
- **Bağlantı/eşya:** Huzursuz ruh, kararmış hatıra veya sisi kısa süre dağıtan fener.
- **Aspect önerileri:** “Sis Benden Bir Şey Aldı”, “Ölüler Her Zaman Sessiz Değildir”, “Hatırlamak Beni İnsan Tutar”.

| Sınıf | Karakter fikri |
|---|---|
| Savaşçı | Siste başkalarına yol açan lanetli koruyucu |
| Düzenbaz | Hayaletlerin dikkatinden kaçmayı öğrenmiş yağmacı |
| Avcı | Ruh yaratıklarının izlerini takip eden kurtulan |
| Büyücü | Laneti anlamadan bozamayacağına inanan araştırmacı |
| Ruhban | Ölülerin son bağlarını çözen psikopomp |
| Mucit | Ruh enerjisini hapsetmek yerine yönlendiren aygıtçı |

### Shurima

- **Beceriler:** Hayatta Kalma, Tarih, İnanç ve Ruhlar.
- **Çöl Hafızası:** Uzun mola başına bir kez çöl yolculuğu, kadim harabe veya kayıp hanedanla ilgili savaş dışı kontrolde avantaj kazan.
- **Bağlantı/eşya:** Kervan rehberi, hanedan sikkesi veya kum geçirmez keşif örtüsü.
- **Aspect önerileri:** “Küllerin Altında Bir İmparatorluk Uyuyor”, “Geçmiş Miras Değil Sorumluluktur”, “Çöl Sabırsızları Yutar”.

| Sınıf | Karakter fikri |
|---|---|
| Savaşçı | Kervanları harabe yaratıklarından koruyan muhafız |
| Düzenbaz | Mezar soyguncularını kendi oyununda yenen eser avcısı |
| Avcı | Kum altındaki devlerin titreşimlerini okuyan izci |
| Büyücü | Güneş ve kum rünlerini çözmeye çalışan bilgin |
| Ruhban | Eski yeminleri yeni halka uyarlayan rahip |
| Mucit | Kadim mekanizmaları güvenli araçlara dönüştüren tamirci |

### Targon

- **Beceriler:** Atletizm, Hayatta Kalma, İnanç ve Ruhlar.
- **Yıldız Rehberi:** Açık gökyüzünde yönünü bilirsin; uzun mola başına bir kez kozmik işaret, tırmanış veya kutsal gelenekle ilgili savaş dışı kontrolde avantaj kazan.
- **Bağlantı/eşya:** Dağ rehberi, yıldız haritası veya tırmanış kancası.
- **Aspect önerileri:** “Zirve Beni Hâlâ Çağırıyor”, “Gökyüzü Kader Değil Rehberdir”, “İnancım Sınandıkça Keskinleşir”.

| Sınıf | Karakter fikri |
|---|---|
| Savaşçı | Hacıları dağın tehlikelerinden koruyan nöbetçi |
| Düzenbaz | Kutsal düzenlerin sakladığı sırları arayan şüpheci |
| Avcı | Dağ yaratıklarını ve yıldız izlerini takip eden rehber |
| Büyücü | Kozmik olayları ölçülebilir büyüye çeviren gözlemci |
| Ruhban | Göksel irade ile ölümlü ihtiyaç arasında arabulucu |
| Mucit | Yıldız ışığını ölçen araçlar yapan hacı mühendis |

### Zaun

- **Beceriler:** El Çabukluğu, Tıp, Teknoloji.
- **Altşehir Direnci:** Uzun mola başına bir kez toksin, hurda mekanizma, dar sokak veya yeraltı ağıyla ilgili savaş dışı kontrolde avantaj kazan.
- **Bağlantı/eşya:** Sokak doktoru, filtreli maske veya çok amaçlı hurda takım.
- **Aspect önerileri:** “Burada Hayatta Kalmak Bir İcat İşidir”, “Kimse Bizi Yukarıdan Kurtarmayacak”, “Her Şeyin İkinci Bir Kullanımı Vardır”.

| Sınıf | Karakter fikri |
|---|---|
| Savaşçı | Mahallesini çetelerden koruyan sokak savunucusu |
| Düzenbaz | Havalandırma hatlarını avucunun içi gibi bilen kurye |
| Avcı | Kimyasal kaçakları ve mutasyona uğramış yaratıkları izleyen gözcü |
| Büyücü | Büyü ile kimyasal tepkimelerin sınırını araştıran kaçak |
| Ruhban | Ücretsiz klinik işleten ve halkın güvenini taşıyan şifacı |
| Mucit | Çöpten çalışan teknoloji çıkaran bağımsız üretici |

## 4. Hiçlik İzi

**CHAR-003:** Hiçlik normal bölge seçimi değildir. Oyuncu ve GM birlikte onaylarsa Kişisel Çatışma Aspect'i Hiçlik temasına bağlanabilir: “Sessizlik Bazen Bana Cevap Veriyor” gibi.

Karakter, uzun mola başına bir kez yakın çevrede belirgin bir Hiçlik bozulması bulunup bulunmadığını GM'ye sorabilir. Cevap “evet”, “hayır” veya “belirsiz ama şu işaret var” biçiminde doğru olmalıdır. Bu izin karşılığında ek yetenek puanı veya savaş bonusu alınmaz; Aspect normal biçimde Compel edilebilir.

## 5. Soylar

Soy, bölge ve sınıftan bağımsız seçilir. Boyut etiketi dar geçit, saklanma ve taşıma gibi yalnızca mantıken ilgili durumlarda kullanılır.

Dokuz soyun ayrıntılı açıklamaları, sınırları, Aspect önerileri ve yeni soy şablonu için [Halklar ve Soylar](icerik/Irklar.md) kataloğuna bak.

| Soy | Boyut | Özellik | Anlatısal etiket |
|---|---|---|---|
| İnsan | Orta | **Uyarlanabilir:** Bölge ve sınıftan gelmeyen bir beceride uzmanlık kazan | Çeşitli kültürlere hızla uyum |
| Yordle | Küçük | **Küçük ve Çevik:** Büyük yaratıkların alanından geçebilir, Orta bir yaratığın arkasında saklanabilirsin; hızın 7,5 m | Büyülü doğa ve uzun ömür |
| Vastaya | Orta | **Keskin Duyu:** Görme, işitme veya koku seç; o duyuya dayalı Algı kontrollerinde avantaj | Hayvansı miras ve ruhsal bağ |
| Minotaur | Orta | **Güçlü Yapı:** Taşıma, itme ve kaldırmada bir boyut büyük sayılırsın | Boynuzlar, güçlü beden, kabile hafızası |
| Troll | Orta | **Sert İklim:** Doğal soğuk ve bozulmuş yiyeceğe karşı kurtarmalarda avantaj | İri yapı ve dayanıklı metabolizma |

### Yeni soy üretme

Yeni soy paketi yalnızca bir küçük özellik vermelidir: özel bir hareket türü en fazla 6 m, dar bir çevresel direnç, tek duyuya avantaj veya Güçlü Yapı düzeyi fayda. Başlangıçta uçuş, doğrudan SS, saldırı, hasar, büyü DC'si veya yetenek puanı bonusu verilmez.

## 6. Ekipman

### Silah özellikleri

- **Hassas:** GÜÇ veya ÇEV kullanılabilir.
- **Hafif:** Her iki elde hafif silah varsa Ana Aksiyon saldırısından sonra Hızlı Aksiyonla ikinci silahla saldırılabilir; ikinci saldırının hasarına yetenek bonusu eklenmez.
- **Ağır:** Küçük karakterler saldırıda dezavantajlıdır.
- **İki elli:** Saldırırken iki el gerekir.
- **Fırlatılan:** Belirtilen menzilde yakın saldırı yeteneğiyle atılır.
- **Doldurma:** Tur başına yalnızca bir kez ateşlenebilir.
- **Menzil:** İlk değer normal, ikinci değer azami menzildir; azami menzilde saldırı dezavantajlıdır.

| Silah | Hasar | Özellik |
|---|---:|---|
| Hançer | 1d4 delici | Hassas, hafif, fırlatılan 6/18 m |
| Sopa | 1d4 ezici | Hafif |
| Kısa kılıç | 1d6 kesici | Hassas, hafif |
| Mızrak | 1d6 delici | Fırlatılan 6/18 m; iki elle 1d8 |
| Uzun kılıç | 1d8 kesici | İki elle 1d10 |
| Savaş çekici | 1d8 ezici | İki elle 1d10 |
| Büyük balta | 1d12 kesici | Ağır, iki elli |
| Büyük kılıç | 2d6 kesici | Ağır, iki elli |
| Kısa yay | 1d6 delici | İki elli, menzil 24/96 m |
| Uzun yay | 1d8 delici | Ağır, iki elli, menzil 45/180 m |
| Arbalet | 1d8 delici | Doldurma, iki elli, menzil 24/96 m |
| Tabanca | 1d8 delici | Doldurma, menzil 12/36 m, gürültülü |
| Tüfek | 1d10 delici | Ağır, doldurma, iki elli, menzil 30/90 m, gürültülü |

### Zırhlar

| Zırh | SS | Gereklilik |
|---|---:|---|
| Giysi | 10 + ÇEV | — |
| Hafif zırh | 11 + ÇEV | — |
| Güçlendirilmiş hafif | 12 + ÇEV | Gizlilik dezavantajlı |
| Orta zırh | 13 + ÇEV (en fazla +2) | — |
| Ağır zırh | 16 | GÜÇ 13; Gizlilik dezavantajlı |
| Plaka zırh | 18 | GÜÇ 15; Gizlilik dezavantajlı |
| Kalkan | +2 | Bir el; aynı anda tek kalkan |

Zırh uzmanlığı olmadan zırh giyen karakter saldırı, GÜÇ/ÇEV kontrolleri ve güç kullanma atışlarında dezavantajlıdır.

## 7. Sınıflar

Bir sınıf, karakterin çatışmadaki ana araçlarını belirler; kişiliğini veya mesleğini sınırlamaz. “Güç yeteneği” sınıf güçlerinin saldırı ve kurtarma DC'sinde kullanılan yetenektir.

Kaynak döngüleri, özellik etkileşimleri, uzmanlık sınırları ve homebrew bütçeleri için [Sınıflar ve Uzmanlıklar](icerik/Sınıflar.md) kataloğuna bak.

### Ortak 1–20 ilerleme omurgası

Bu sürümde 1–20. seviye özelliklerinin tam kuralları vardır. Aşağıdaki tablo ortak ilerlemeyi gösterir; 4–20 ayrıntıları [Sınıflar ve Uzmanlıklar](icerik/Sınıflar.md) üzerinden ilgili sınıf kitapçığına bağlanır.

| Sv. | Ortak kazanım | Savaşçı | Düzenbaz | Avcı | Büyücü | Ruhban | Mucit |
|---:|---|---|---|---|---|---|---|
| 1 | Sınıf çekirdeği | Efor, Manevra | Momentum, Hassas Darbe | Odak, Av İşareti | Büyü Kullanımı | Lütuf, Dualar | Yük, Cihazlar |
| 2 | Sınıf ritmi | Atılım | Kurnaz Eylem | Avcı Teknikleri | Büyü Yenileme | İnanç Kanalı | Hızlı Kurulum |
| 3 | Uzmanlık | Öncü/Silah Ustası | Gölge/Silahşör | Canavar Avcısı/Ruh Bağlı | Elementalist/Rün Dokuyucu | Koruyucu/Ruh Rehberi | Hextech Ustası/Kimyager |
| 4 | Yetenek artışı | — | — | — | — | — | — |
| 5 | Güç sıçraması | Ek Saldırı | Hassas Darbe 2d6 | Ek Saldırı | 3. derece büyü | Güçlü Dua | Gelişmiş Cihaz |
| 6 | Uzmanlık özelliği | Uzmanlık II | Uzmanlık II | Uzmanlık II | Uzmanlık II | Uzmanlık II | Uzmanlık II |
| 7 | Sınıf özelliği | Sarsılmaz | Kaçınma | Arazi Ustası | Karşı Büyü | Sarsılmaz İnanç | Alan Onarımı |
| 8 | Yetenek artışı | — | — | — | — | — | — |
| 9 | Sınıf özelliği | Efor d8 | Hassas Darbe 3d6 | Üstün İz | 5. derece büyü | Lütuf Artışı | Yük Artışı |
| 10 | Uzmanlık özelliği | Uzmanlık III | Uzmanlık III | Uzmanlık III | Uzmanlık III | Uzmanlık III | Uzmanlık III |
| 11 | Güç sıçraması | Üçüncü Saldırı | Hassas Darbe 4d6 | Kesintisiz Av | 6. derece büyü | Büyük Dua | Usta Cihaz |
| 12 | Yetenek artışı | — | — | — | — | — | — |
| 13 | Sınıf özelliği | Efor d10 | Güvenilir Yetenek | Yırtıcı Sezgi | 7. derece büyü | İlahi Direnç | Kusursuz Prototip |
| 14 | Uzmanlık özelliği | Uzmanlık IV | Uzmanlık IV | Uzmanlık IV | Uzmanlık IV | Uzmanlık IV | Uzmanlık IV |
| 15 | Sınıf özelliği | İkinci Atılım | Dokunulmaz Adım | Avın Sonu | 8. derece büyü | Yenilmez İrade | Zincirleme Cihaz |
| 16 | Yetenek artışı | — | — | — | — | — | — |
| 17 | Güç sıçraması | Efor d12 | Hassas Darbe 6d6 | Efsanevi Avcı | 9. derece büyü | Efsanevi Dua | Efsanevi İcat |
| 18 | Uzmanlık özelliği | Uzmanlık V | Uzmanlık V | Uzmanlık V | Uzmanlık V | Uzmanlık V | Uzmanlık V |
| 19 | Yetenek artışı | — | — | — | — | — | — |
| 20 | Zirve | Savaşın Efendisi | Kusursuz Fırsat | İlk Avcı | Başbüyücü | İnancın Sesi | Büyük Mucit |

### Savaşçı

**CLASS-001**

- **Can Zarı:** d10; 1. seviyede `10 + DAY`, sonraki seviyelerde `6 + DAY` CP.
- **Kurtarmalar:** GÜÇ, DAY.
- **Zırhlar:** Tümü, kalkan.
- **Silahlar:** Tümü.
- **Beceriler:** Atletizm, Gözdağı, Hayatta Kalma, İçgörü veya Algı arasından iki.
- **Güç yeteneği:** GÜÇ veya ÇEV; ilk manevra kullanımında seçilir ve uzun molaya kadar aynı kalır.
- **Başlangıç:** Orta zırh, kalkan ve uzun kılıç veya büyük balta; kısa yay; gezgin paketi.

#### 1. seviye — Efor ve manevralar

Efor havuzun uzmanlık bonusuna eşittir; Efor zarın `d6`dır. Bütün Efor kısa veya uzun molada yenilenir. İki manevra öğren; seviye 2 ve 3'te birer yeni manevra öğrenirsin. Bir saldırıda yalnızca bir manevra kullanabilirsin.

| Manevra | Bedel ve etki |
|---|---|
| Kesin Darbe | Saldırı toplamını gördükten sonra 1 Efor harca, Efor zarını saldırıya ekle |
| Ezici Darbe | İsabetten sonra 1 Efor harca; zarı hasara ekle ve hedef GÜÇ kurtarmasını kaybederse 3 m itilir |
| Savuşturma | Hasar aldığında Tepki ve 1 Efor harca; hasarı Efor zarı + uzmanlık kadar azalt |
| Kışkırtma | İsabetten sonra 1 Efor harca; zarı hasara ekle, hedef sonraki turuna kadar senden başkasına saldırırken dezavantajlıdır |
| Komuta | Hızlı Aksiyon ve 1 Efor harca; 9 m içindeki müttefik Tepkisiyle hızının yarısı kadar hareket eder veya bir silah saldırısı yapar |
| Hamle | Saldırıdan önce 1 Efor harca; erişimin o saldırı için 1,5 m artar ve isabette zarı hasara ekle |

#### 2. seviye — Atılım

Turunda bir kez ek Ana Aksiyon kazan. Kullandıktan sonra kısa veya uzun mola bitirene kadar tekrar kullanamazsın. Atılım ile kazanılan aksiyon bir turda ikinci kez büyü veya cihaz etkinleştiremez; saldırı, hareket ve genel aksiyonlarda kullanılabilir.

#### 3. seviye — Uzmanlık

**Öncü:** 1,5 m içindeki bir müttefik hasar aldığında Tepki ve 1 Efor harcayarak hasarı Efor zarı + GÜÇ modifikatörün kadar azaltabilirsin. Hasarı 0'a indirirsen saldırganı 1,5 m itebilirsin. Ayrıca ağır zırh giyerken hareket cezası yaşamazsın.

**Silah Ustası:** Uzun mola sonunda bir silah grubu seç: kılıçlar, baltalar/çekiçler, menzilli silahlar veya hafif silahlar. Seçili silahla saldırıların doğal 19–20'de kritik olur. Bu silahla tur başına ilk hasar zarındaki 1'i bir kez yeniden atabilirsin.

### Düzenbaz

**CLASS-002**

- **Can Zarı:** d8; 1. seviyede `8 + DAY`, sonra `5 + DAY` CP.
- **Kurtarmalar:** ÇEV, ZEK.
- **Zırhlar:** Hafif.
- **Silahlar:** Hassas silahlar, kısa yay, arbalet, tabanca.
- **Beceriler:** Akrobasi, Aldatma, El Çabukluğu, Gizlilik, İnceleme, İçgörü, İkna veya Teknoloji arasından dört.
- **Başlangıç:** Hafif zırh; kısa kılıç ve iki hançer veya kısa yay; hırsız ya da kâşif paketi.

#### 1. seviye — Momentum ve Hassas Darbe

Momentum sınırın uzmanlık bonusundur. Çatışmaya 1 Momentum ile başlarsın; çatışma dışında havuz 0'dır. Tur başına bir kez aşağıdakilerden biri gerçekleşince 1 Momentum kazanırsın:

- Avantajlı bir saldırı veya beceri kontrolünü başarmak,
- Turunda en az 6 m hareket ettikten sonra bir düşmana isabet etmek,
- Bir müttefikin 1,5 m içindeki düşmana isabet etmek.

Bir saldırıya avantajın varsa veya hedefin 1,5 m içinde senin Baygın olmayan müttefikin bulunuyorsa, isabetten sonra 1 Momentum harcayıp `1d6` Hassas Darbe hasarı ekleyebilirsin. Tur başına yalnızca bir kez. Seçtiğin iki beceride çifte uzmanlık kazan.

#### 2. seviye — Kurnaz Eylem

Her tur Hızlı Aksiyonla Atıl, Ayrıl veya Saklan aksiyonlarından birini kullanabilirsin.

#### 3. seviye — Uzmanlık

**Gölge:** Gizlilik kontrolünü başardığında 1 Momentum kazanabilirsin; bu normal tur başına kazanım sınırına tabidir. Saklıyken isabet ettirdiğin Hassas Darbe `2d6` olur ve saldırıdan sonra 1,5 m ücretsiz hareket edebilirsin.

**Silahşör:** Tabanca ve arbaletin Doldurma özelliğini yok sayarsın. Menzilli saldırıyla Hassas Darbe yaptığında hedefin Tepki kullanmasını sonraki turunun başına kadar engelleyebilir veya kendin 3 m hareket edebilirsin.

### Avcı

**CLASS-003**

- **Can Zarı:** d10; 1. seviyede `10 + DAY`, sonra `6 + DAY` CP.
- **Kurtarmalar:** ÇEV, SEZ.
- **Zırhlar:** Hafif, orta, kalkan.
- **Silahlar:** Tümü.
- **Beceriler:** Algı, Atletizm, Doğa, Gizlilik, Hayvan İdaresi, Hayatta Kalma veya Tıp arasından üç.
- **Güç yeteneği:** SEZ.
- **Başlangıç:** Hafif veya orta zırh; uzun yay veya iki kısa kılıç; avcı paketi.

#### 1. seviye — Odak ve Av İşareti

Odak havuzun uzmanlık bonusuna eşittir ve uzun molada yenilenir; kısa mola sonunda 1 Odak geri kazanırsın.

Hızlı Aksiyonla 18 m içindeki gördüğün yaratığa 1 Odak harcayıp **Av İşareti** koy. İşaret 1 saat, hedef 0 CP'ye düşene veya başka hedef işaretleyene kadar sürer. Tur başına bir kez işaretli hedefe isabetinde `1d4` ek hasar verirsin; onu izleme ve bulma kontrollerin avantajlıdır.

#### 2. seviye — Avcı Teknikleri

Aşağıdakilerden iki teknik öğren. Seviye 3'te bir teknik daha öğrenirsin. Aynı tetikleyiciye tek teknik uygulanır.

| Teknik | Bedel ve etki |
|---|---|
| Engelleyici Atış | İsabetten sonra 1 Odak; hedef GÜÇ kurtarmasını kaybederse hızı sonraki turuna kadar 0 |
| Zehir Hazırlığı | Kısa mola sonunda 1 Odak; bir silahı kapla, sonraki isabet +1d6 zehir hasarı verir |
| Avcı Sıçrayışı | Tepki ve 1 Odak; sana saldırı ıskaladığında 3 m fırsat saldırısı doğurmadan hareket et |
| Koruyucu İz | 1 Odak; 10 dakika boyunca grubun iz bırakmasını önle ve iz sürme kontrollerine avantaj ver |
| İlk Vuruş | İnisiyatiften sonra 1 Odak; ilk turundaki ilk isabet +1d6 hasar verir |
| Saha Tedavisi | Ana Aksiyon ve 1 Odak; 1,5 m içindeki hedef `1d8 + SEZ` CP kazanır; hedef başına uzun molada bir kez |

#### 3. seviye — Uzmanlık

**Canavar Avcısı:** İşaretli hedefin dirençlerinden birini ilk gördüğünde GM sana açıklar. Tur başına ilk Av İşareti hasarın `1d6` olur. Büyük veya daha büyük işaretli hedef seni zorla hareket ettirmeye çalıştığında kurtarman avantajlıdır.

**Ruh Bağlı:** Uzun mola sonunda şekli belirlenen bir ruh yoldaş çağırırsın. SS `13 + uzmanlığın yarısı`, CP `5 + seviyenin 2 katı`, hızı 9 m; kurtarmaları senin uzmanlık bonusunu kullanır. Senin inisiyatifinde hareket eder. Hızlı Aksiyon vermedikçe Savunur; komut verdiğinde yakın saldırısı `uzmanlık + SEZ` ile isabet, `1d6 + uzmanlık` ruh hasarı verir. 0 CP'de dağılır ve uzun mola sonunda döner. Av İşareti hasarını sen veya yoldaşın uygulayabilir, ikiniz aynı turda uygulayamazsınız.

### Büyücü

**CLASS-004**

- **Can Zarı:** d6; 1. seviyede `6 + DAY`, sonra `4 + DAY` CP.
- **Kurtarmalar:** ZEK, SEZ.
- **Zırhlar:** Yok.
- **Silahlar:** Hançer, sopa, kısa yay.
- **Beceriler:** Büyü Bilgisi, İnceleme, Tarih, Teknoloji, İçgörü veya İnanç ve Ruhlar arasından iki.
- **Güç yeteneği:** ZEK.
- **Başlangıç:** Hançer veya sopa; büyü odağı; bilgin paketi; büyü kitabı.

#### 1. seviye — Büyü kullanımı

Üç cantrip öğrenirsin. Büyü kitabın altı 1. derece Büyücü büyüsü içerir; her Büyücü seviyesinde listeye iki büyü eklersin. Uzun mola sonunda `ZEK modifikatörü + Büyücü seviyesi` kadar büyü hazırlarsın (en az 1).

| Seviye | 1. derece yuva | 2. derece yuva |
|---:|---:|---:|
| 1 | 2 | — |
| 2 | 3 | — |
| 3 | 4 | 2 |

Bir büyüyü kullanmak derecesine eşit veya yüksek bir yuvayı harcar. Cantrip yuva harcamaz. Büyü saldırın `d20 + uzmanlık + ZEK`; büyü DC'n `8 + uzmanlık + ZEK`tir.

#### 2. seviye — Büyü Yenileme

Kısa mola sonunda toplam derecesi en fazla `Büyücü seviyenin yarısı, yukarı yuvarla` olan harcanmış yuvaları geri kazan. Uzun mola bitirene kadar tekrar kullanamazsın.

#### 3. seviye — Uzmanlık

**Elementalist:** Ateş, buz, yıldırım veya taş seç. Tur başına bir kez seçili temayla verdiğin hasarın bir zarındaki 1'i yeniden atabilirsin. 1. veya daha yüksek derece büyü kullandığında sonraki turunun başına kadar uygun hasar türüne direnç kazanırsın: ateş, soğuk, yıldırım veya ezici.

**Rün Dokuyucu:** Uzun mola sonunda iki **Hazır Rün** yaz. 9 m içindeki gördüğün bir yaratık kontrol, saldırı veya kurtarma attığında Tepkini ve bir rünü harcayarak sonuç kesinleşmeden `1d4` ekleyebilir veya çıkarabilirsin. Aynı atışa Rün Puanı uygulanmışsa Hazır Rün uygulanamaz.

### Büyücü büyüleri

Cantripler karakter seviyesi 5, 11 ve 17'de bir ek hasar zarı kazanır.

| Cantrip | Aksiyon / menzil | Etki |
|---|---|---|
| Ark Atışı | Ana / 18 m | Büyü saldırısı; 1d8 enerji hasarı |
| Don Dokunuşu | Ana / 18 m | Büyü saldırısı; 1d6 soğuk ve hedefin hızı 1,5 m azalır |
| Kıvılcım | Ana / 9 m | Hedef ÇEV kurtarması; 1d6 yıldırım, başarısızsa Tepki kullanamaz |
| Büyü Eli | Ana / 9 m | 5 kg'a kadar nesneyi 1 dakika uzaktan hareket ettir |
| Küçük Yanılsama | Ana / 9 m | 1 dakika küçük ses veya görüntü; İnceleme büyü DC'ne karşı açığa çıkarır |
| Rün Işığı | Ana / dokunma | Nesne 1 saat 6 m parlak, 6 m loş ışık verir |

| 1. derece büyü | Aksiyon / menzil | Etki |
|---|---|---|
| Büyü Oku | Ana / 36 m | Gördüğün hedeflere bölüştürülen üç ok; her biri otomatik 1d4+1 enerji |
| Element Dalgası | Ana / 4,5 m koni | ÇEV kurtarması; 2d6 ateş/soğuk/yıldırım, başarıda yarı |
| Kalkan | Tepki / kendin | İsabet alırken turun başına kadar +5 SS; o saldırıya da uygulanır |
| Sis Perdesi | Ana / 18 m | 3 m yarıçap 1 dakika yoğun sis; konsantrasyon |
| Hızlı Adım | Hızlı / kendin | 9 m içindeki gördüğün boş alana ışınlan |
| Uyku Rünü | Ana / 18 m | 3 m alandakiler SEZ kurtarır; başarısız olan sonraki turunun sonuna kadar Baygın; hasar bitirir |
| Büyü Algısı | Ana / kendin | 10 dakika 9 m içindeki etkin büyüyü hissedersin; konsantrasyon |
| Rün Zırhı | Ana / dokunma | Zırhsız hedefin SS'si 8 saat `13 + ÇEV` olur |

| 2. derece büyü | Aksiyon / menzil | Etki |
|---|---|---|
| Yıkıcı Küre | Ana / 27 m | Büyü saldırısı; 3d8 ateş/soğuk/yıldırım |
| Bağlayıcı Rün | Ana / 18 m | GÜÇ kurtarması; başarısızsa Kısıtlanmış, her tur sonunda tekrar; konsantrasyon 1 dakika |
| Görünmezlik | Ana / dokunma | 1 saat görünmez; saldırı veya düşmanca güç bitirir; konsantrasyon |
| Ayna Suretleri | Ana / kendin | Üç suret; sana isabet eden her saldırıda d6 at, 3+ ise bir suret yok olur ve saldırı ıskalar |
| Zihin Dalgası | Ana / 9 m | ZEK kurtarması; 3d6 psişik ve Tepki yok, başarıda yarı hasar |
| Rüzgâr Adımı | Hızlı / kendin | Bu tur uçuş hızı 12 m; tur sonunda yere inmezsen düşersin |

### Ruhban

**CLASS-005**

- **Can Zarı:** d8; 1. seviyede `8 + DAY`, sonra `5 + DAY` CP.
- **Kurtarmalar:** SEZ, KAR.
- **Zırhlar:** Hafif, orta, kalkan.
- **Silahlar:** Ağır olmayan silahlar.
- **Beceriler:** İçgörü, İkna, İnanç ve Ruhlar, Tarih veya Tıp arasından üç.
- **Güç yeteneği:** SEZ.
- **Başlangıç:** Orta veya hafif zırh; kalkan ve savaş çekici veya kısa yay; şifacı paketi; inanç odağı.

#### 1. seviye — Lütuf ve dualar

Lütuf havuzun uzmanlık bonusuna eşittir ve uzun molada yenilenir. Üç dua öğrenirsin; seviye 2 ve 3'te birer dua daha öğrenirsin. Dua saldırın `uzmanlık + SEZ`, dua DC'n `8 + uzmanlık + SEZ`dir.

| Dua | Bedel ve etki |
|---|---|
| Şifa Sözü | Hızlı, 1 Lütuf; 9 m hedef `1d8 + SEZ` CP kazanır; hedef başına uzun molada bir kez |
| Koruma | Tepki, 1 Lütuf; 9 m müttefike gelen hasarı `1d8 + SEZ` azalt |
| Cesaret | Ana, 1 Lütuf; 9 m hedef 1 dakika korkuya bağışık ve ilk kurtarmasına 1d4; konsantrasyon |
| Arındırma | Ana, 1 Lütuf; dokunulan hedefte Zehirlenmiş veya Korkmuş durumunu bitir |
| Yargı | Ana, 1 Lütuf; 18 m hedef SEZ kurtarır, 2d8 ruh hasarı; başarıda yarı |
| Rehberlik | Ana, 1 Lütuf; 9 m hedefin 10 dakika içindeki bir beceri kontrolüne 1d6; konsantrasyon |
| Sığınak | Ana, 1 Lütuf; 9 m hedefe saldırmak isteyen düşman SEZ kurtarır, başaramazsa başka hedef seçer; hedef saldırınca biter |
| Ruhlarla Konuşma | Ana, 1 Lütuf; sahnedeki zayıf ruh iziyle üç soru-cevaplık kısa temas kur |

Ayrıca Ana Aksiyonla 18 m menzilli dua saldırısı yaparak `1d8` ışık veya ruh hasarı verebilirsin. Bu hasar karakter seviyesi 5, 11 ve 17'de bir zar artar.

#### 2. seviye — İnanç Kanalı

Kısa mola sonunda 1 Lütuf geri kazanırsın. Turunda bir kez dua kullandığında 3 m içindeki bir müttefik 1 geçici CP kazanır; bu değer 5. seviyede uzmanlık bonusuna yükselir.

#### 3. seviye — Uzmanlık

**Koruyucu:** Ağır zırh uzmanlığı kazanırsın. Koruma duasını kullandığında hedefi 1,5 m hareket ettirebilir ve kendin de ona doğru 1,5 m hareket edebilirsin; bu hareket fırsat saldırısı doğurmaz.

**Ruh Rehberi:** Ruhlarla Konuşma duası belirgin bir ruh izi varsa Lütuf harcamaz, fakat kısa veya uzun mola başına bir kez kullanılabilir. Bir yaratığı iyileştirdiğinde ona 1 dakika boyunca ruh bağı koyarsın; 9 m içindeyken ilk başarısız ölüm kurtarmasını başarıya çevirebilirsin, sonra bağ biter.

### Mucit

**CLASS-006**

- **Can Zarı:** d8; 1. seviyede `8 + DAY`, sonra `5 + DAY` CP.
- **Kurtarmalar:** ÇEV, ZEK.
- **Zırhlar:** Hafif, orta.
- **Silahlar:** Hafif silahlar, arbalet, tabanca, tüfek.
- **Beceriler:** El Çabukluğu, İnceleme, Tıp, Teknoloji veya Büyü Bilgisi arasından üç.
- **Güç yeteneği:** ZEK.
- **Başlangıç:** Hafif zırh; arbalet veya tabanca; hançer; zanaat takımı; mucit paketi.

#### 1. seviye — Yük ve cihazlar

Yük havuzun `uzmanlık bonusu + 2`dir ve uzun molada yenilenir. Dört cihaz şeması öğrenirsin; seviye 2 ve 3'te birer şema öğrenirsin. Cihaz saldırın `uzmanlık + ZEK`, cihaz DC'n `8 + uzmanlık + ZEK`dir.

| Cihaz | Bedel ve etki |
|---|---|
| Şok Bobini | Ana, 1 Yük; 18 m cihaz saldırısı, 2d6 yıldırım ve hedef Tepki kullanamaz |
| Yapışkan Bomba | Ana, 1 Yük; 18 m hedef ÇEV kurtarır, başarısızsa hızı 0; tur sonunda GÜÇ kurtarmasıyla biter |
| Saha İğnesi | Ana, 1 Yük; dokunulan hedef `1d8 + ZEK` CP kazanır; hedef başına uzun molada bir kez |
| Duman Kapsülü | Ana, 1 Yük; 18 m noktada 3 m yarıçapta bir tur yoğun duman |
| İtki Kemeri | Hızlı, 1 Yük; 6 m fırsat saldırısı doğurmadan hareket et |
| Koruyucu Plaka | Tepki, 1 Yük; 9 m hedefe o saldırıya karşı +3 SS |
| Tarayıcı | Ana, 1 Yük; 10 dakika 9 m içindeki mekanizma, toksin veya büyü kaynağının yönünü gösterir |
| Otomatik Tuzak | Ana, 1 Yük; bitişik kareye tuzak; giren ilk yaratık ÇEV kurtarır, 2d6 delici, başarıda yarı |

#### 2. seviye — Hızlı Kurulum

Turunda bir cihazı ilk kez Ana Aksiyonla kullandıktan sonra Hızlı Aksiyonla Nesne Kullanabilirsin. Kısa mola sonunda `1d4` at; 4 gelirse 1 Yük geri kazanırsın. Uzun mola başına bu geri kazanım yalnızca bir kez başarılı olabilir.

#### 3. seviye — Uzmanlık

**Hextech Ustası:** Uzun mola sonunda iki silah veya zırha prototip rün yerleştir. Taşıyıcısı birine saldırı ve hasarda `+1`, diğerine SS'de `+1` kazanır; aynı yaratık ikisinden birden faydalanamaz. Rünler sonraki uzun molanda söner.

**Kimyager:** Uzun mola sonunda üç karışım hazırla; her biri Hızlı Aksiyonla içilir veya Ana Aksiyonla bitişik hedefe verilir. Seçenekler: `1d6 + ZEK` CP iyileştirme, 10 dakika 3 m hız artışı veya 1 dakika zehir hasarına direnç. Aynı tür karışım aynı hedefte üst üste binmez.

## 8. Başlangıç paketleri

**CHAR-EQUIP-001 — Başlangıç parası:** Birinci seviye karakter, sınıf ekipmanına ve aşağıdaki paketlerden birine ek olarak `15 altın` taşır. Daha yüksek seviyeden başlangıç, alışveriş ve eşya erişimi için [Ekonomi, Zanaat ve Ganimet](icerik/Ekonomi-Zanaat-Ganimet.md) kullanılır.

- **Gezgin:** Sırt çantası, yatak rulosu, 5 günlük erzak, matara, ip, çakmak.
- **Hırsız:** Küçük aletler, koyu pelerin, ip, 5 işaret taşı, levye.
- **Kâşif/Avcı:** Sırt çantası, 5 günlük erzak, ip, tuzak ipi, harita kılıfı.
- **Bilgin:** Defter, mürekkep, 5 sayfa, büyüteç, iki referans kitapçığı.
- **Şifacı:** Sargı ve ilaç içeren 5 kullanımlık şifacı takımı, battaniye, inanç sembolü.
- **Mucit:** Zanaat takımı, 5 hurda parça, koruyucu gözlük, el feneri.

Şifacı takımının bir kullanımı, kısa molada yapılan Tıp kontrolünü avantajlı kılar veya dengelenmiş bir karakterin `1d4` saat beklemeden 1 CP ile uyanmasını sağlar.

## 9. Türetilmiş değerler

- **Maksimum CP:** Sınıf formülü.
- **SS:** Zırh + kalkan.
- **İnisiyatif:** ÇEV modifikatörü.
- **Hız:** Soy değiştirmedikçe 9 m.
- **Uzmanlık:** Seviyeye göre; 1–3'te +2.
- **Sınıf saldırısı:** Uzmanlık + ilgili yetenek.
- **Sınıf DC:** `8 + uzmanlık + ilgili yetenek`.
- **Pasif Algı:** `10 + SEZ + varsa Algı uzmanlığı`.
- **Rün Puanı:** 2/5.

## 10. Aspect kontrol listesi

Her Aspect en az iki farklı sahnede yardımcı olabilmeli, en az bir gerçek komplikasyon yaratabilmeli ve başka oyuncunun karakterini yönetmeden çalışmalıdır. Bölge Aspect'i kültürle uyumu **veya çatışmayı** gösterebilir.

Üç Aspect de bu testi geçiyorsa karakter oynamaya hazırdır. GM araçları için [GM ve Homebrew Rehberi](04-gm-homebrew.md) kullanılır.
