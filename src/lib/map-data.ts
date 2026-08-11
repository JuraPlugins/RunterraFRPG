import { extraMapPoints } from "@/lib/map-extra-points";

export type MapRegion = {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
  summary: string;
  terrain: string;
  polygon: string;
};

export type MapPointKind = "başkent" | "şehir" | "liman" | "harabe" | "geçit" | "gizem" | "zindan" | "mabet" | "kasaba" | "kamp";

export type MapPoint = {
  id: string;
  name: string;
  regionId: string;
  x: number;
  y: number;
  kind: MapPointKind;
  summary: string;
  danger: 1 | 2 | 3 | 4 | 5;
};

export const mapRegions: MapRegion[] = [
  { id: "freljord", name: "Freljord", x: 930, y: 235, color: "#bde8f4", terrain: "Buzullar · Tundra · Dağlar", summary: "Kadim yeminlerin, kabile savaşlarının ve yaşayan buzun kuzey ülkesi.", polygon: "330,70 1660,55 1725,390 1390,530 905,490 590,420 300,250" },
  { id: "demacia", name: "Demacia", x: 520, y: 610, color: "#e4d59f", terrain: "Ovalar · Göller · Kaleler", summary: "Disiplin, miras ve petricite kaleleriyle şekillenmiş batı krallığı.", polygon: "105,430 810,390 995,650 820,835 310,800 70,620" },
  { id: "noxus", name: "Noxus", x: 1270, y: 610, color: "#d77a68", terrain: "Yaylalar · Kanyonlar · Hisarlar", summary: "Gücün her biçimini sahiplenen geniş ve sert imparatorluk toprakları.", polygon: "1010,400 1610,410 1675,760 1395,840 1035,770 940,565" },
  { id: "piltover", name: "Piltover", x: 1005, y: 790, color: "#eccf82", terrain: "Kuleler · Köprüler · Kanal", summary: "Deniz yollarını ve keşfi birbirine bağlayan ilerleme şehri.", polygon: "905,720 1075,710 1115,825 935,840" },
  { id: "zaun", name: "Zaun", x: 1030, y: 900, color: "#65c79d", terrain: "Endüstri · Yarıklar · Sis", summary: "Kanalın altında yenilik, tehlike ve dayanışmayla yaşayan şehir.", polygon: "925,835 1120,820 1160,980 950,1005 875,910" },
  { id: "shurima", name: "Shurima", x: 640, y: 1190, color: "#dfb65d", terrain: "Çöl · Vaha · Kadim Harabe", summary: "Kumların altındaki imparatorluk kalıntıları ve güneş mirası.", polygon: "90,890 785,820 1130,1090 1080,1460 265,1475 70,1270" },
  { id: "targon", name: "Targon", x: 155, y: 1080, color: "#d8c5ff", terrain: "Zirve · Uçurum · Yıldız", summary: "Göğe uzanan dağ, inanç yolları ve kozmik sınavlar.", polygon: "35,865 285,900 335,1370 75,1350" },
  { id: "ixtal", name: "Ixtal", x: 1380, y: 1195, color: "#76d691", terrain: "Yağmur Ormanı · Teras · Nehir", summary: "Element ustalığının saklı şehirleri ve sık ormanları.", polygon: "1115,970 1570,890 1720,1420 1240,1460 1080,1280" },
  { id: "ionia", name: "Ionia", x: 1810, y: 610, color: "#eaa8d5", terrain: "Adalar · Ruh Ormanları · Tapınaklar", summary: "Maddi dünya ile ruh âlemi arasındaki dengenin doğu adaları.", polygon: "1680,300 2010,300 2035,820 1710,835 1605,590" },
  { id: "bilgewater", name: "Bilgewater", x: 1580, y: 905, color: "#65c3cc", terrain: "Kayalık Ada · Liman · Açık Deniz", summary: "Canavar avcıları, korsan filoları ve her anlaşmanın bir bedeli.", polygon: "1450,805 1740,775 1810,1040 1510,1090 1400,930" },
  { id: "shadow-isles", name: "Gölge Adalar", x: 1875, y: 1165, color: "#82e0c5", terrain: "Siyah Kaya · Sis · Harabe", summary: "Kara Sis'in sardığı, geçmişi huzur bulmayan kırık adalar.", polygon: "1710,930 2035,900 2040,1450 1700,1435 1625,1190" },
  { id: "bandle-city", name: "Bandle Şehri", x: 1870, y: 350, color: "#75e4cf", terrain: "Portallar · Korular · Bilinmez", summary: "Tek bir konuma sığmayan, geçitlerle erişilen yordle yurdu.", polygon: "1780,245 1975,220 2025,430 1800,465 1720,350" },
];

const baseMapPoints: MapPoint[] = [
  { id: "rakelstake", name: "Rakelstake", regionId: "freljord", x: 980, y: 275, kind: "harabe", summary: "Buzun içinde unutulmuş yemin taşları ve eski bir savaş alanı.", danger: 4 },
  { id: "demacia-city", name: "Demacia Şehri", regionId: "demacia", x: 515, y: 570, kind: "başkent", summary: "Beyaz surların, soylu hanelerin ve büyük garnizonun merkezi.", danger: 2 },
  { id: "high-silvermere", name: "Yüksek Gümüşgöl", regionId: "demacia", x: 635, y: 485, kind: "şehir", summary: "Dağ gölü çevresindeki savunma hattı ve av yolları.", danger: 2 },
  { id: "immortal-bastion", name: "Ölümsüz Burç", regionId: "noxus", x: 1280, y: 590, kind: "başkent", summary: "İmparatorluğun kalbi; orduların, loncaların ve sırların kavşağı.", danger: 3 },
  { id: "piltover-gates", name: "Güneş Kapıları", regionId: "piltover", x: 1005, y: 770, kind: "geçit", summary: "Kıtalar arası ticareti taşıyan köprü, liman ve hextech düzenekleri.", danger: 2 },
  { id: "zaun-sumps", name: "Zaun Dipleri", regionId: "zaun", x: 1035, y: 925, kind: "şehir", summary: "Kimyasal sisin altında pazarlar, laboratuvarlar ve eski tüneller.", danger: 4 },
  { id: "sun-disc", name: "Güneş Diski", regionId: "shurima", x: 610, y: 1150, kind: "harabe", summary: "Çölün ortasında yeniden uyanan imparatorluk simgesi.", danger: 4 },
  { id: "void-scar", name: "Hiçlik Yarası", regionId: "shurima", x: 850, y: 1330, kind: "gizem", summary: "Gerçekliğin inceldiği, mor kristallerle çevrili yasak bölge.", danger: 5 },
  { id: "targon-peak", name: "Targon Zirvesi", regionId: "targon", x: 145, y: 1050, kind: "geçit", summary: "Yıldızların çağrısına cevap verenlerin çıktığı ölümcül rota.", danger: 5 },
  { id: "ixaocan", name: "Ixaocan", regionId: "ixtal", x: 1390, y: 1225, kind: "başkent", summary: "Element aksiyomlarıyla korunan gizli teras şehir.", danger: 3 },
  { id: "placidium", name: "Placidium", regionId: "ionia", x: 1840, y: 560, kind: "şehir", summary: "Ruh yollarının kesiştiği kutsal bahçeler ve eğitim alanları.", danger: 2 },
  { id: "bilgewater-port", name: "Bilgewater Limanı", regionId: "bilgewater", x: 1580, y: 890, kind: "liman", summary: "Av gemileri, tehlikeli pazarlar ve tuzlu anlaşmaların limanı.", danger: 4 },
  { id: "helia", name: "Helia Harabeleri", regionId: "shadow-isles", x: 1880, y: 1160, kind: "harabe", summary: "Sis içinde kaybolan bilginin ve çöküşün merkezi.", danger: 5 },
  { id: "whispering-gate", name: "Fısıldayan Geçit", regionId: "bandle-city", x: 1880, y: 340, kind: "gizem", summary: "Yalnızca doğru hikâyeyi anlatanlara açıldığı söylenen portal korusu.", danger: 1 },
];

export const mapPoints: MapPoint[] = [...baseMapPoints, ...extraMapPoints];

export const regionById = Object.fromEntries(mapRegions.map((region) => [region.id, region]));
