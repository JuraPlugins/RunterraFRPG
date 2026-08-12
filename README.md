---
title: Runeterra FRP
slug: /
order: 0
version: 0.7.0
status: complete-draft
---

# Runeterra FRP

Runeterra'nın bölgelerinden esinlenen, Türkçe ve bağımsız bir d20 homebrew sistemidir. Taktiksel sınıf ve seviye yapısını, karakterin inançlarının hikâyeyi değiştirdiği **Rün Puanı** döngüsüyle birleştirir.

> **Hayran çalışması:** Bu proje ticari değildir ve Riot Games tarafından onaylanmış resmî bir ürün değildir. Riot Games'e ait metin veya görselleri kopyalamaz; evren adları ve genel temalar yalnızca esin kaynağıdır.

## v0.7 kapsamı

- 1–20 seviye için matematik ve ilerleme omurgası
- Tam oynanabilir 1–20. seviye sınıf ilerlemesi
- 12 bölge, 9 soy, 13 sınıf ve 26 uzmanlık
- Bağımsız savaş, dinlenme, ölüm ve Yara kuralları
- Fate esintili Aspect, Invoke ve Compel sistemi
- Düşman ve homebrew üretme araçları
- Para, pazar, zanaat, onarım, söküm ve seviye bazlı ganimet sistemi
- Büyü kullanımı, yoğunlaşma, karşı büyü ve bölgesel güç gelenekleri

Hazır macera, kampanya hikâyesi ve resmî şampiyonların karakter blokları bu sürümün kapsamında değildir.

## Okuma sırası

1. [Temel Kurallar](docs/01-temel-kurallar.md)
2. [Rün Puanı](docs/02-run-puani.md)
3. [Karakter Yaratımı](docs/03-karakter-yaratimi.md)
4. [GM ve Homebrew Rehberi](docs/04-gm-homebrew.md)

## İçerik ansiklopedisi

- [Halklar ve Soylar](docs/icerik/Irklar.md)
- [Bölgeler ve Kültürel Kökenler](docs/icerik/Bölgeler.md)
- [Sınıflar ve Uzmanlıklar](docs/icerik/Sınıflar.md)
- [İtemler ve Ekipman Kataloğu](docs/icerik/Itemler.md)
- [İmza Yetenekleri Kataloğu](docs/icerik/Yetenekler.md)
- [Ekonomi, Zanaat ve Ganimet](docs/icerik/Ekonomi-Zanaat-Ganimet.md)
- [Büyü ve Güç Kaynakları](docs/icerik/Büyü-ve-Güç-Kaynakları.md)

İlk kez oynayan bir grup önce Temel Kurallar'ın **Kontroller** ve **Çatışma** bölümlerini, ardından Karakter Yaratımı'nı okumalıdır. Her oyuncu Rün Puanı belgesindeki oyuncu özetini bilmelidir. GM, ilk oturumdan önce GM rehberinin düşman bütçelerini incelemelidir.

## Playtestler

- [PT-001 — Cam Kuyu](playtests/PT-001-Cam-Kuyu.md): Dört 1. seviye karakterle keşif, sosyal karar, Rün Puanı, çatışma, 0 CP, Yara ve kısa mola testi.
- [İçe aktarılabilir test karakterleri](playtests/karakterler/)
## Web uygulaması

Bu depo aynı zamanda Markdown belgelerini doğrudan okuyan bir Next.js rehberi ve tarayıcıda çalışan karakter oluşturucu içerir.

- Paketleri kur: npm install
- Yerel geliştirmeyi başlat: npm run dev
- Üretim derlemesini doğrula: npm run build

Yerel adres http://localhost:3000 olur. Next.js uygulaması Vercel tarafından ek yapılandırma gerektirmeden algılanır; depo Vercel platformuna bağlanarak veya proje kökünde vercel komutu çalıştırılarak yayımlanabilir.

## Tasarım ilkeleri

1. **Kitap bağımsızlığı:** Oynamak için başka bir rol yapma oyunu kitabı gerekmez.
2. **Bölge özgürlüğü:** Her bölge her sınıfla oynanabilir; zorunlu veya üstün kombinasyon yoktur.
3. **Kararların bedeli:** Aspect'ler yalnızca bonus değil, karakteri zorlayan komplikasyon kaynaklarıdır.
4. **Sıradandan efsaneye:** Varsayılan başlangıç 1. seviyedir; GM daha yüksek bir güç kademesinden başlayabilir.
5. **Web uyumluluğu:** Başlıklar, göreli bağlantılar ve sabit kural kimlikleri sonraki web sürümünde korunur.

## Sürüm notu

`0.7.0-complete-draft`, 1–20. seviye sınıf ilerlemesini, dokuz soy ve on iki bölgeyi, güncel eşya/yetenek kataloglarını, Rün Puanı döngüsünü, ekonomi–zanaat–ganimet kurallarını ve ortak büyü–güç kaynağı sistemini içerir. Denge değerleri playtest sonrasında değişebilir; NPC ve hazır macera içeriği sonraki aşamadadır.
