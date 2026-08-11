import type { MapPoint } from "@/lib/map-data";

export const extraMapPoints: MapPoint[] = [
  // Freljord
  { id: "frostfang-vault", name: "Buzdişi Mahzeni", regionId: "freljord", x: 720, y: 205, kind: "zindan", summary: "Buz tabakalarının altında dev kemikleri ve mühürlü bir savaş salonu.", danger: 4 },
  { id: "white-raven-camp", name: "Ak Kuzgun Kampı", regionId: "freljord", x: 1210, y: 330, kind: "kamp", summary: "Kuzey yollarını gözleyen avcılar ile kâhinlerin mevsimlik kampı.", danger: 2 },
  { id: "howling-chasm", name: "Uluyan Yarık", regionId: "freljord", x: 1480, y: 245, kind: "geçit", summary: "Rüzgârın sesleri taklit ettiği, tek köprülü derin buzul geçidi.", danger: 5 },
  { id: "winter-heart-shrine", name: "Kış Yüreği Mabedi", regionId: "freljord", x: 430, y: 315, kind: "mabet", summary: "Sönmeyen mavi alevin çevresinde edilen yeminlerin kutsal alanı.", danger: 3 },

  // Demacia
  { id: "petricite-catacombs", name: "Petricite Yeraltı Mezarları", regionId: "demacia", x: 455, y: 675, kind: "zindan", summary: "Eski muhafızların mezarları altında büyüyü emen taş koridorlar.", danger: 4 },
  { id: "goldenfield", name: "Altıntarla", regionId: "demacia", x: 335, y: 530, kind: "kasaba", summary: "Tahıl ambarları, at yetiştiricileri ve gezgin şövalyeleriyle bilinen kasaba.", danger: 1 },
  { id: "silent-watch", name: "Sessiz Nöbet Kulesi", regionId: "demacia", x: 745, y: 690, kind: "harabe", summary: "Bir gecede terk edilmiş sınır kulesi; ışığı hâlâ bazı geceler yanar.", danger: 3 },
  { id: "stagwood-sanctuary", name: "Geyikorman Sığınağı", regionId: "demacia", x: 245, y: 710, kind: "mabet", summary: "Orman bekçilerinin yaralı yolcuları ve kutsal hayvanları koruduğu koru.", danger: 2 },

  // Noxus
  { id: "iron-basilica", name: "Demir Bazilika", regionId: "noxus", x: 1400, y: 515, kind: "zindan", summary: "Kapanlı mahzenlerinde başarısız savaş makineleri saklanan kara tapınak.", danger: 5 },
  { id: "red-standard-camp", name: "Kızıl Sancak Kampı", regionId: "noxus", x: 1090, y: 700, kind: "kamp", summary: "Yeni lejyonların eğitim gördüğü hareketli askerî yerleşke.", danger: 3 },
  { id: "ash-market", name: "Kül Pazarı", regionId: "noxus", x: 1515, y: 675, kind: "kasaba", summary: "Silah ustaları, bilgi tacirleri ve uzak eyaletlerden gelen kervanlar.", danger: 2 },
  { id: "black-aqueduct", name: "Kara Su Kemeri", regionId: "noxus", x: 1170, y: 500, kind: "harabe", summary: "Dağın içinden geçen tünelleri artık bilinmeyen bir şey kullanıyor.", danger: 4 },

  // Piltover
  { id: "broken-hexgate", name: "Kırık Hexgeçit", regionId: "piltover", x: 950, y: 750, kind: "zindan", summary: "Yanlış koordinata kilitlenmiş deneysel geçit ve parçalanan laboratuvar.", danger: 4 },
  { id: "azure-docks", name: "Lacivert Rıhtımlar", regionId: "piltover", x: 1065, y: 795, kind: "liman", summary: "Hava gemileri ile okyanus kargolarının buluştuğu gümrük bölgesi.", danger: 2 },
  { id: "academy-annex", name: "Akademi Ek Binası", regionId: "piltover", x: 1035, y: 735, kind: "mabet", summary: "Mucitlerin yasak prototipleri incelediği kapalı araştırma salonu.", danger: 3 },
  { id: "gearward", name: "Dişli Mahallesi", regionId: "piltover", x: 970, y: 815, kind: "şehir", summary: "Atölyeler, asansörler ve gece boyunca çalışan hassas fabrikalar.", danger: 1 },

  // Zaun
  { id: "shimmer-vault", name: "Parıltı Kasası", regionId: "zaun", x: 1080, y: 930, kind: "zindan", summary: "Terk edilmiş kimya deposunun altında mutasyona uğramış muhafızlar.", danger: 5 },
  { id: "glassworks", name: "Yeşilcam Pazarı", regionId: "zaun", x: 970, y: 875, kind: "kasaba", summary: "Maskeler, filtreler ve geri dönüştürülmüş aygıtların satıldığı kat pazarı.", danger: 2 },
  { id: "vent-13", name: "On Üçüncü Havalandırma", regionId: "zaun", x: 1115, y: 870, kind: "geçit", summary: "Şehrin unutulmuş derinliklerine inen, düzensiz çalışan dev baca.", danger: 4 },
  { id: "gray-clinic", name: "Gri Klinik", regionId: "zaun", x: 925, y: 945, kind: "kamp", summary: "Sokak hekimlerinin kimlik sormadan tedavi sunduğu güvenli oda ağı.", danger: 2 },

  // Shurima
  { id: "seven-scorpion-tomb", name: "Yedi Akrep Mezarı", regionId: "shurima", x: 410, y: 1270, kind: "zindan", summary: "Her kapısı farklı bir zehir sınavıyla korunan firavun mezarı.", danger: 5 },
  { id: "mirage-oasis", name: "Serap Vahası", regionId: "shurima", x: 790, y: 1040, kind: "kasaba", summary: "Yalnızca gün batımında görünen su kaynağı çevresindeki kervan durağı.", danger: 2 },
  { id: "glass-canyon", name: "Cam Kanyon", regionId: "shurima", x: 930, y: 1195, kind: "geçit", summary: "Kadim bir patlamanın kumu bıçak keskinliğinde cama çevirdiği rota.", danger: 4 },
  { id: "sunken-observatory", name: "Batık Gözlemevi", regionId: "shurima", x: 560, y: 1390, kind: "harabe", summary: "Kum altında yıldız düzenekleri ve ters yönde dönen taş halkalar.", danger: 4 },

  // Targon
  { id: "echoing-stairs", name: "Yankılı Merdivenler", regionId: "targon", x: 190, y: 1160, kind: "zindan", summary: "Dağın içine oyulmuş basamaklarda yolcular kendi geleceklerini işitir.", danger: 4 },
  { id: "moonwell", name: "Ay Kuyusu", regionId: "targon", x: 105, y: 1240, kind: "mabet", summary: "Yıldız ışığını su gibi biriktiren, nöbetçilerce korunan havuz.", danger: 3 },
  { id: "cloudherd-camp", name: "Bulutsürü Kampı", regionId: "targon", x: 250, y: 980, kind: "kamp", summary: "Dağ keçisi çobanlarının ve zirve rehberlerinin güvenli kampı.", danger: 2 },
  { id: "fallen-constellation", name: "Düşmüş Takımyıldız", regionId: "targon", x: 230, y: 1310, kind: "gizem", summary: "Geceleri gökyüzünün eksik bir parçasını yansıtan taş krateri.", danger: 5 },

  // Ixtal
  { id: "rootbound-temple", name: "Kökkapan Tapınağı", regionId: "ixtal", x: 1280, y: 1280, kind: "zindan", summary: "Canlı köklerin her saat yeniden düzenlediği element tapınağı.", danger: 5 },
  { id: "rainstep", name: "Yağmurbasamak", regionId: "ixtal", x: 1510, y: 1160, kind: "kasaba", summary: "Şelaleler arasındaki teraslarda kurulmuş gizli avcı yerleşimi.", danger: 2 },
  { id: "emerald-cenote", name: "Zümrüt Obruk", regionId: "ixtal", x: 1435, y: 1365, kind: "gizem", summary: "Dipteki suyun yakın geçmişten görüntüler gösterdiği derin mağara.", danger: 3 },
  { id: "stoneweaver-camp", name: "Taşdokuyan Kampı", regionId: "ixtal", x: 1195, y: 1105, kind: "kamp", summary: "Sınır taşlarını onaran element ustalarının hareketli üssü.", danger: 3 },

  // Ionia
  { id: "dreaming-labyrinth", name: "Düş Bahçesi Labirenti", regionId: "ionia", x: 1770, y: 680, kind: "zindan", summary: "Uyuyanların anılarından şekillenen, yolu her ziyaretçide değişen bahçe.", danger: 4 },
  { id: "bellflower-village", name: "Çançiçeği Köyü", regionId: "ionia", x: 1920, y: 470, kind: "kasaba", summary: "Rüzgâr çanlarıyla ruhları sakinleştiren küçük kıyı köyü.", danger: 1 },
  { id: "spirit-bridge", name: "Ruh Köprüsü", regionId: "ionia", x: 1695, y: 540, kind: "geçit", summary: "Şafakta maddi dünyadan ayrılan ve başka bir kıyıya çıkan köprü.", danger: 3 },
  { id: "broken-dojo", name: "Kırık Dojo", regionId: "ionia", x: 1865, y: 760, kind: "harabe", summary: "Boş avlusunda görünmez düellocuların ayak sesleri duyulur.", danger: 3 },

  // Bilgewater
  { id: "leviathan-gullet", name: "Leviathan Gırtlağı", regionId: "bilgewater", x: 1650, y: 965, kind: "zindan", summary: "Dev bir deniz canavarının iskeletine kurulmuş kaçakçı mahzeni.", danger: 5 },
  { id: "black-salt-cove", name: "Karatuz Koyu", regionId: "bilgewater", x: 1510, y: 1010, kind: "liman", summary: "Haritasız gemilerin yanaştığı, feneri ters yanan saklı koy.", danger: 4 },
  { id: "coinhook", name: "Sikkekanca", regionId: "bilgewater", x: 1710, y: 855, kind: "kasaba", summary: "Batık ganimet açık artırmalarıyla yaşayan kazıklar üstü mahalle.", danger: 3 },
  { id: "siren-stones", name: "Siren Taşları", regionId: "bilgewater", x: 1460, y: 875, kind: "gizem", summary: "Gelgit çekildiğinde şarkı söyleyen ve rotaları değiştiren resifler.", danger: 4 },

  // Gölge Adalar
  { id: "mourning-crypt", name: "Yas Mahzeni", regionId: "shadow-isles", x: 1810, y: 1280, kind: "zindan", summary: "Her odasında farklı bir kaybı yeniden yaşatan sisli yeraltı mezarı.", danger: 5 },
  { id: "last-lantern", name: "Son Fener", regionId: "shadow-isles", x: 1950, y: 1040, kind: "mabet", summary: "Kara Sis içinde hâlâ sıcak ışık veren tek taş fener.", danger: 4 },
  { id: "whisper-port", name: "Fısıltı İskelesi", regionId: "shadow-isles", x: 1745, y: 1130, kind: "liman", summary: "Hayalet gemilerin aynı saatte yanaştığı çürümüş rıhtım.", danger: 5 },
  { id: "pale-orchard", name: "Solgun Bostan", regionId: "shadow-isles", x: 1910, y: 1370, kind: "harabe", summary: "Meyveleri anıları çalan, beyaz ağaçlarla dolu terk edilmiş bahçe.", danger: 4 },

  // Bandle Şehri
  { id: "pocket-cellar", name: "Ceplik Mahzen", regionId: "bandle-city", x: 1930, y: 390, kind: "zindan", summary: "Dışarıdan bir dolap kadar küçük, içeride yüz odalı yaramaz mahzen.", danger: 2 },
  { id: "mossbell-market", name: "Yosunçan Pazarı", regionId: "bandle-city", x: 1825, y: 285, kind: "kasaba", summary: "Farklı dünyalardan kaybolmuş eşyaların takas edildiği renkli pazar.", danger: 1 },
  { id: "tea-clock-shrine", name: "Çay Saati Mabedi", regionId: "bandle-city", x: 1970, y: 315, kind: "mabet", summary: "Zamanın yalnızca çay soğuduğunda ilerlediği küçük kutsal ev.", danger: 1 },
  { id: "wrong-door", name: "Yanlış Kapı", regionId: "bandle-city", x: 1780, y: 415, kind: "geçit", summary: "Aynı kapıdan iki kez geçeni bambaşka bir kıyıya bırakan portal.", danger: 3 },
];
