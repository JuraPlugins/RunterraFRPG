---
title: İtemler ve Ekipman Kataloğu
slug: /icerik/itemler
order: 8
version: 0.4.0
status: complete-draft
source_game: League of Legends; Teamfight Tactics
source_snapshot: LoL 16.15.1
---

# İtemler ve Ekipman Kataloğu

Bu katalog, League of Legends ve Teamfight Tactics eşyalarının oynanış fikirlerini Runeterra FRP kurallarına uyarlar. Resmî açıklamalar kopyalanmaz; isim, tema ve mekanik fikirleri masaüstü oyun için yeniden yazılır.

Temel silah ve zırh kuralları için [Karakter Yaratımı](../03-karakter-yaratimi.md), homebrew güç sınırları için [GM ve Homebrew Rehberi](../04-gm-homebrew.md) kullanılır.

Fiyat, bulunabilirlik, pazar, üretim, onarım ve ganimet kuralları için [Ekonomi, Zanaat ve Ganimet](Ekonomi-Zanaat-Ganimet.md) kullanılır.

## Kataloglar

- [LoL 16.15.1 — 226 oynanabilir eşya uyarlaması](itemler/LoL-16.15.1-Uyarlamalar.md)
- [LoL 16.15.1 — kaynak ve tamamlanma envanteri](itemler/LoL-16.15.1-Envanter.md)
- [TFT Set 17 — 240 oynanabilir eşya uyarlaması](itemler/TFT-Set17-Uyarlamalar.md)

| Kaynak | Kapsam | Durum |
|---|---:|---|
| LoL 16.15.1 | 253 ham kayıt, 226 benzersiz eşya | Tamamlandı; denge taslağı |
| TFT Set 17 | 242 seçilmiş kayıt, 240 benzersiz eşya | Tamamlandı; denge taslağı |
| Tarihî TFT setleri | Eski setler | Daha sonraki arşiv |

## Nadirlik sıralaması

Nadirlik yalnızca bulunma güçlüğünü değil, eşyanın mekanik bütçesini ve Bağ maliyetini de belirler.

| Nadirlik | Genel güç | Tipik bonus zar | Bağ | Kullanım örneği |
|---|---|---:|---:|---|
| Basit | Tek, düz etki | 1d4; kimlik eşyasında 1d6 | 0 | Doran eşyaları, küçük bileşen, iksir |
| Sıradışı | Güçlü tek etki | 1d6 | 0 | Büyük bileşen, bot, orman yoldaşı |
| Ender | Ana etki veya dar ikinci özellik | 1d6 | 1 | Ucuz tamamlanmış eşya |
| Çok Ender | Ana etki ve düzenli fayda | 1d8 | 1 | Güçlü tamamlanmış eşya |
| Efsanevi | İki belirgin etki | 1d10 | 2 | İkonik tamamlanmış eşya |
| Mitik | Sınıf döngüsünü etkileyen zirve eşya | 1d12 | 2 | En pahalı ve belirleyici eşyalar |

**ITEM-CORE-001 — Basit eşya ilkesi:** Basit eşyanın gizli alt sistemi veya uzun açıklaması olmaz. Doran’ın Kılıcı tur başına bir kez yalnızca `+1d6` fiziksel hasar verir; ek iyileşme, kritik veya kaynak özelliği taşımaz.

## Eşya Bağı

**ITEM-CORE-002:** Bir karakter aynı anda en fazla **3 Eşya Bağı** kullanabilir. Bağlı eşyalar uzun mola sonunda değiştirilebilir.

- Basit ve Sıradışı eşyalar çoğunlukla 0 Bağdır.
- Ender ve Çok Ender eşyalar 1 Bağdır.
- Efsanevi ve Mitik eşyalar 2 Bağdır.
- Tüketilebilirler Bağ kullanmaz.

Bağ sınırı taşıma sınırı değildir. Fazla eşyalar taşınabilir; Bağ isteyen pasif veya aktif güçleri çalışmaz.

## Bonusların sınırı

**ITEM-CORE-003 — Eşya Darbesi:** Bir karakter tur başına yalnızca bir eşyanın bonus hasar zarını uygulayabilir. Üç farklı eşya hasar veriyorsa saldırıdan önce biri seçilir.

**ITEM-CORE-004 — Eşya Savunması:** Bir karakter tur başına yalnızca bir eşyanın hasar azaltma Tepkisini kullanabilir.

**ITEM-CORE-005 — Aynı etki:** Aynı isimli iki eşya ve aynı sabit bonus birbiriyle birleşmez. Yalnızca yüksek değer kullanılır.

Bu sınırlar sınıf özelliklerini etkilemez. Bir Savaşçı manevrası ile bir eşya hasarı aynı saldırıda kullanılabilir; iki eşya hasarı kullanılamaz.

## Eşya kullanımı

- Karakter kendi üzerindeki iksiri Hızlı Aksiyonla, bitişik müttefike Ana Aksiyonla uygular.
- Eşya saldırısı `d20 + uzmanlık + belirtilen yetenek` kullanır.
- Eşya DC’si `8 + uzmanlık + belirtilen yetenek`tir.
- Yetenek belirtilmiyorsa kullanıcı eşya bağlanırken ZEK veya SEZ seçer.
- Bir eşya açıkça söylemedikçe sınıf kaynağı veya Rün Puanı yenilemez.
- Eşya ile verilen geçici CP, hız ve sabit SS etkileri aynı isimli etkilerle üst üste binmez.

## Üretim ve dönüşüm

LoL tarif bağlantıları FRP’de üretim ipucu olarak kullanılır; kaynak altın değeri doğrudan FRP para fiyatı değildir.

- **Bileşen:** Üretimde tematik malzeme veya tek başına küçük eşya olarak kullanılabilir.
- **Tamamlanmış:** Tarifindeki bileşenler ve bölgeye uygun bir usta/tezgâh gerektirir.
- **Dönüşen:** Belirtilen görev, yük veya anlatısal koşul tamamlanınca yeni sürüme geçer.
- **Özel mod:** Normal kampanyada GM onayıyla nadir prototip, arena ödülü veya tekil eser olarak bulunur.
- **Şampiyona özel:** Belirli bir kişiyi kopyalamak yerine eşyanın bağ, yemin veya korku temasını taşıyan karakter tarafından kullanılabilir.

## Kaynak ve sürüm politikası

Her kayıt Riot kimliğini, kaynak yamasını ve kaynak altınını taşır. Yeni LoL yaması geldiğinde envanter yeniden üretilir; yeni veya kaldırılan eşyalar ayrı değişiklik listesinde gösterilir. FRP uyarlamaları otomatik olarak silinmez, önce yeni kaynakla karşılaştırılır.

TFT eşyaları set kimliğiyle tutulur. Güncel set değiştiğinde önceki dosya tarihî set arşivine taşınır; böylece kampanyada kullanılan eski bir eşya kaybolmaz.
