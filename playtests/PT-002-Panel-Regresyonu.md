---
title: PT-002 — Panel Regresyonu
slug: /playtests/pt-002-panel-regresyonu
order: 2
version: 0.2.0
status: complete
date: 2026-08-13
---

# PT-002 — Panel Regresyonu

## Amaç

PT-001 Cam Kuyu testinde bulunan yedi panel ve kural belirsizliğini aynı dört 1. seviye karakter üzerinden yeniden sınamak.

## Karakter sonuçları

| Karakter | Sınıf | Yeniden doğrulanan akış |
|---|---|---|
| Elian Veyr | Büyücü 1 | 3 cantrip, 6 kitap büyüsü ve ZEK + seviye kadar hazırlanmış büyü kaydediliyor; büyüler aktif çubukta doğru yuvayı harcıyor |
| Raska Kord | Ruhban 1 | 3 dua seçiliyor ve aktif çubukta Lütuf harcıyor; kısa mola 1. seviyede Lütuf vermiyor |
| Oru, Yıldız Vidası | Mucit 1 | 4 cihaz seçiliyor ve aktif çubukta Yük harcıyor; 1. seviyede Hızlı Kurulum zarı atılmıyor |
| Seli Venn | Avcı 1 | Av İşareti ayrı aktif kart olarak görünüyor ve 1 Odak harcıyor |

## Hedefli kontroller

- [x] Eski karakter kayıtları yeni sınıf seçimlerine güvenli varsayılanlarla taşınıyor.
- [x] Kısa mola kaç Can Zarı harcanacağını soruyor ve her biri için sınıf Can Zarı + DAY kadar iyileştiriyor.
- [x] Harcanan Can Zarları karakter seviyesinden düşülüyor; uzun mola harcananların en az 1 olmak üzere yarısını geri veriyor.
- [x] Büyücü 2+ Rün Geri Kazanımı, toplam yuva derecesi bütçesini ve uzun mola başına tek kullanımı izliyor.
- [x] Ruhban kısa mola Lütuf yenilenmesi yalnızca 2. seviyeden itibaren çalışıyor.
- [x] Mucit 2+ Hızlı Kurulum d4 atıyor; yalnızca 4 sonucunda Yük veriyor ve başarılı yenilenmeyi uzun molaya kadar kilitliyor.
- [x] Çatışmada 0 CP'den ilk dönüş Hafif Yara oluşturuyor; aynı çatışmada ikinci Yara oluşturmuyor.
- [x] Yara adı ve şiddeti düzenlenebiliyor; Invoke ve Compel RP hareketleri günlüğe yazılıyor.
- [x] Turu Bitir yalnız tur sayısını artırıyor; Rauntu Bitir ayrı olarak rauntu artırıp turu 1'e alıyor.
- [x] Panel `Kısıtlanmış` adını kullanıyor; çekirdek listede olmayan `Bitkin` kaldırıldı.
- [x] GM düşman hasar bütçesi zar örnekleri, çoklu saldırı bölüşümü ve kritik zarlarıyla açıklanıyor.
- [x] Seviye atlama yeni Can Zarı ekliyor, geri alma kaydı bunu da geri yüklüyor ve yeni sınıf seçimlerine yönlendiriyor.

## Teknik doğrulama

- TypeScript tür denetimi: başarılı.
- Yerel `/karakter/masa` yanıtı: HTTP 200.
- Üretim derlemesi: başarılı.

## Son karar

PT-001'de bildirilen yedi eksik kapatıldı. Dört karakter artık temel seviye 1 sekansını kural kitabına dönmeden web paneli üzerinden yönetebilir. 2. ve 3. seviyede açılan büyü, dua, cihaz ve Avcı tekniği seçimleri karakter düzenleme adımından tamamlanır.
