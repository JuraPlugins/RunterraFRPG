---
title: Online Hesap ve Session Odaları
slug: online-session
order: 12
version: 0.9.0
status: beta
---

# Online hesap ve session odaları

Bu modül hesapları, karakter oturumlarını, GM odalarını ve canlı masa durumunu Vercel üzerinde saklar.

## Kullanılan hizmetler

- **Neon Postgres:** Kullanıcı, güvenli oturum, oda, oyuncu karakteri ve NPC verileri.
- **Vercel Blob:** Hesap/karakter/NPC avatarları ve GM tarafından paylaşılan sahne görselleri.
- **Vercel Functions:** Yetki kontrolü yapılan hesap ve oda API uçları.

## Vercel kurulumu

1. Vercel projesinde **Marketplace → Neon** üzerinden bir Postgres veritabanı oluştur.
2. Kaynağı projeye bağla; `DATABASE_URL` otomatik eklenir.
3. **Storage → Blob** üzerinden herkese açık bir görsel deposu oluştur. `BLOB_READ_WRITE_TOKEN` otomatik eklenir.
4. Ortam değişkenlerini yerel projeye çek veya `.env.example` dosyasını `.env.local` olarak doldur.
5. `npm run db:setup` komutuyla `database/schema.sql` şemasını uygula.
6. Projeyi yeniden dağıt.

## Oda akışı

1. Kullanıcı `/hesap` ekranından hesap oluşturur.
2. **Oda kur** işlemini yapan kullanıcı otomatik olarak GM olur.
3. GM, özel `/oda/KOD` bağlantısını oyunculara gönderir.
4. Oyuncu giriş yapar, bu cihazdaki karakterlerinden birini ve avatarını seçer.
5. Oda ekranı yaklaşık 2,5 saniyede bir sunucuyla yenilenir. Karakter masası açıkken CP, kaynak, Rün Puanı ve altın değişiklikleri odaya gönderilir.

## Yetki ilkeleri

- Davet kodu GM yetkisi vermez.
- Oyuncu yalnızca kendi oda kaydını güncelleyebilir.
- Oyuncu düzenleme, NPC yönetimi, oda durumu ve medya yayını için sunucuda GM rolü aranır.
- Parolalar düz metin saklanmaz; bcrypt ile hashlenir.
- Oturum anahtarı veritabanında SHA-256 özetiyle, tarayıcıda `httpOnly` ve `sameSite=lax` çerez olarak tutulur.

## Görsel sınırları

Vercel Function üzerinden yüklenen avatar ve görseller en fazla 4 MB olabilir. Blob bağlı değilken yerel geliştirme için 750 KB'a kadar veri URL'si yedeği kullanılır; bu yalnızca test amaçlıdır.
