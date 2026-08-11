param(
    [string]$LolSource = 'C:\tmp\lol-champions-full-16.15.1-tr.json',
    [string]$TftSource = 'C:\tmp\tft-cdragon-16.15.json',
    [string]$LolOutput = 'docs\icerik\yetenekler\LoL-16.15.1-Uyarlamalar.md',
    [string]$TftOutput = 'docs\icerik\yetenekler\TFT-Set17-Uyarlamalar.md'
)

$ErrorActionPreference = 'Stop'

function Get-PlainText([string]$Text) {
    if ([string]::IsNullOrWhiteSpace($Text)) { return '' }
    $value = [regex]::Replace($Text, '<[^>]+>', ' ')
    $value = [regex]::Replace($value, '@[^@]+@', ' ')
    $value = [Net.WebUtility]::HtmlDecode($value)
    return ([regex]::Replace($value, '\s+', ' ').Trim())
}

function Get-StableId([string]$Text) {
    $normalized = $Text.Normalize([Text.NormalizationForm]::FormD)
    $builder = New-Object Text.StringBuilder
    foreach ($char in $normalized.ToCharArray()) {
        $category = [Globalization.CharUnicodeInfo]::GetUnicodeCategory($char)
        if ($category -ne [Globalization.UnicodeCategory]::NonSpacingMark) {
            [void]$builder.Append($char)
        }
    }
    $ascii = $builder.ToString().ToUpperInvariant()
    $ascii = $ascii.Replace('İ','I').Replace('İ','I').Replace('Ş','S').Replace('Ğ','G').Replace('Ü','U').Replace('Ö','O').Replace('Ç','C')
    $ascii = [regex]::Replace($ascii, '[^A-Z0-9]+', '-')
    return $ascii.Trim('-')
}

function Get-Theme([string]$Name, [string]$Description, [string]$Slot) {
    $text = (Get-PlainText "$Name $Description").ToLowerInvariant()
    if ($text -match 'iyile|can yen|can kaz|sağlık yen|tedavi') { return 'İyileştirme' }
    if ($text -match 'kalkan|hasarı azalt|zırh|direnç kazan|dokunulmaz|engeller') { return 'Savunma' }
    if ($text -match 'ışınlan|atıl|sıçra|hamle|ileri fırla|yer değiştir') { return 'Hareket' }
    if ($text -match 'görünmez|kamuflaj|gizlen') { return 'Gizlilik' }
    if ($text -match 'sersem|havaya sav|sabitler|kök salar|uyutur|korkut|sustur|çeker|geri savur') { return 'Kontrol' }
    if ($text -match 'saldırı hızı|art arda|ok yağmuru|birden fazla saldırı|tekrar saldır') { return 'Seri Saldırı' }
    if ($text -match 'işaret|damga|yük biriktir') { return 'İşaret' }
    if ($text -match 'yavaşlat|hareket hızını azalt') { return 'Yavaşlatma' }
    if ($text -match 'görüş|ortaya çıkar|keşif|izini|yerini göster') { return 'Keşif' }
    if ($text -match 'etraf|çevres|konik|alandaki|yakındaki tüm|birden fazla rakip') { return 'Alan Hasarı' }
    if ($Slot -eq 'P') { return 'Pasif Güçlenme' }
    return 'Doğrudan Hasar'
}

function Get-DamageType([string]$Name, [string]$Description) {
    $text = (Get-PlainText "$Name $Description").ToLowerInvariant()
    if ($text -match 'ateş|alev|yanar|yakma') { return 'ateş' }
    if ($text -match 'buz|soğuk|ayaz|don') { return 'soğuk' }
    if ($text -match 'yıldırım|şimşek|elektrik') { return 'yıldırım' }
    if ($text -match 'zehir|toksin|kimyasal') { return 'zehir' }
    if ($text -match 'ruh|gölge|karanlık|ölüm') { return 'ruh' }
    if ($text -match 'zihin|psişik|kâbus|rüya') { return 'psişik' }
    if ($text -match 'büyü hasarı|sihir hasarı|enerji') { return 'enerji' }
    return 'fiziksel'
}

function Get-CompatibleClasses($Tags, [string]$Role, [string]$Theme) {
    $classes = New-Object Collections.Generic.List[string]
    $joined = ((@($Tags) -join ' ') + ' ' + $Role).ToLowerInvariant()
    if ($Theme -in @('Seri Saldırı','Yavaşlatma','İşaret') -and $joined -match 'marksman|adcarry|adcaster|adspecialist|keskin nişancı') {
        return 'Avcı, Düzenbaz, Savaşçı, Mucit'
    }
    if ($joined -match 'fighter|tank|adtank|ap tank|aptank|hfighter|dövüşçü|müdafi|öncü') {
        foreach ($c in @('Savaşçı','Avcı','Ruhban')) { if (-not $classes.Contains($c)) { $classes.Add($c) } }
    }
    if ($joined -match 'assassin|reaper|sinsi|yağmacı|atılgan') {
        foreach ($c in @('Düzenbaz','Avcı','Savaşçı')) { if (-not $classes.Contains($c)) { $classes.Add($c) } }
    }
    if ($joined -match 'mage|apcaster|apcarry|medium|medyum|kılavuz|support') {
        foreach ($c in @('Büyücü','Ruhban','Mucit')) { if (-not $classes.Contains($c)) { $classes.Add($c) } }
    }
    if ($joined -match 'marksman|adcarry|adcaster|adspecialist|keskin nişancı|kaderbaz') {
        foreach ($c in @('Avcı','Düzenbaz','Mucit')) { if (-not $classes.Contains($c)) { $classes.Add($c) } }
    }
    if ($Theme -in @('İyileştirme','Savunma')) {
        foreach ($c in @('Ruhban','Mucit')) { if (-not $classes.Contains($c)) { $classes.Add($c) } }
    }
    if ($classes.Count -eq 0) { foreach ($c in @('Savaşçı','Düzenbaz','Avcı','Büyücü','Ruhban','Mucit')) { $classes.Add($c) } }
    return (@($classes | Select-Object -First 4) -join ', ')
}

function Get-Tier([string]$Source, [string]$Slot, [int]$Cost) {
    if ($Source -eq 'LoL') {
        switch ($Slot) {
            'P' { return [pscustomobject]@{Name='I — Temel'; Level=4; Number=1} }
            'Q' { return [pscustomobject]@{Name='I — Temel'; Level=4; Number=1} }
            'W' { return [pscustomobject]@{Name='II — Usta'; Level=8; Number=2} }
            'E' { return [pscustomobject]@{Name='II — Usta'; Level=8; Number=2} }
            'R' { return [pscustomobject]@{Name='III — Kahraman'; Level=12; Number=3} }
        }
    }
    if ($Cost -le 2) { return [pscustomobject]@{Name='I — Temel'; Level=4; Number=1} }
    if ($Cost -eq 3) { return [pscustomobject]@{Name='II — Usta'; Level=8; Number=2} }
    if ($Cost -eq 4) { return [pscustomobject]@{Name='III — Kahraman'; Level=12; Number=3} }
    return [pscustomobject]@{Name='IV — Efsane'; Level=16; Number=4}
}

function Get-AbilityCard([string]$Theme, $Tier, [string]$DamageType, [bool]$Passive, [string]$SpecialKey) {
    if ($SpecialKey -eq 'ASHE-Q') {
        return [pscustomobject]@{
            Action='Hızlı Aksiyon'
            Cost='1 sınıf kaynağı.'
            Effect='Bu tur bir silahla Saldır aksiyonu kullandığında tek saldırı yerine aynı hedefe iki saldırı atışı yap. Her isabet `1d6 + yetenek modifikatörü` fiziksel hasar verir; bu saldırılara normal silah hasarı eklenmez.'
            Limit='İki saldırı birlikte tek bonus hasar paketi sayılır. Ek Saldırı veya Atılım yeni Pürdikkat atışları eklemez. Tur başına bir kez.'
        }
    }

    if ($Passive) {
        switch ($Theme) {
            'İyileştirme' { return [pscustomobject]@{Action='Pasif';Cost='Yok.';Effect='Tur başına bir kez bir düşmana hasar verdikten veya bir müttefiki etkiledikten sonra 1 geçici CP kazan.';Limit='Kısa mola başına uzmanlık bonusun kadar kez; geçici CP birikmez.'} }
            'Savunma' { return [pscustomobject]@{Action='Pasif';Cost='Yok.';Effect='İnisiyatif attığında `uzmanlık bonusu + yetenek modifikatörü` kadar geçici CP kazan.';Limit='Kısa veya uzun mola başına bir kez; geçici CP birikmez.'} }
            'Hareket' { return [pscustomobject]@{Action='Pasif';Cost='Yok.';Effect='Turunda ilk kez bir düşmana isabet ettiğinde 1,5 m güvenli hareket edebilirsin.';Limit='Tur başına bir kez; bu hareket hızını aşmana izin vermez.'} }
            'Gizlilik' { return [pscustomobject]@{Action='Pasif';Cost='Yok.';Effect='Saklan kontrolünü başardığında sonraki turunun başına kadar hızın 1,5 m artar.';Limit='Tur başına bir kez; görünmezlik sağlamaz.'} }
            'Kontrol' { return [pscustomobject]@{Action='Pasif';Cost='Yok.';Effect='Turundaki ilk silah isabetinde hedefin hızını sonraki turunun başına kadar 1,5 m azaltabilirsin.';Limit='Aynı hedefte birikmez; tur başına bir kez.'} }
            'Seri Saldırı' { return [pscustomobject]@{Action='Pasif';Cost='Yok.';Effect='Aynı hedefe art arda iki tur isabet edersen ikinci turun ilk isabetine uzmanlık bonusun kadar fiziksel hasar ekle.';Limit='Tur başına bir kez; hedef değişirse dizi sıfırlanır.'} }
            'İşaret' { return [pscustomobject]@{Action='Pasif';Cost='Yok.';Effect='Bir yaratığa ilk isabetinde onu sonraki turunun sonuna kadar işaretleyebilirsin; işaretliyken onu bulma kontrollerin avantajlıdır.';Limit='Aynı anda tek hedef; kısa mola başına uzmanlık bonusun kadar kez.'} }
            'Yavaşlatma' { return [pscustomobject]@{Action='Pasif';Cost='Yok.';Effect='Kritik isabet ettiğinde hedefin hızını sonraki turunun sonuna kadar 3 m azalt.';Limit='Aynı hedefte birikmez.'} }
            'Keşif' { return [pscustomobject]@{Action='Pasif';Cost='Yok.';Effect='İnisiyatif attığında 9 m içindeki saklı bir yaratığın bulunduğu yönü GM sana söyler.';Limit='Kısa veya uzun mola başına bir kez; hedefi açığa çıkarmaz.'} }
            default { return [pscustomobject]@{Action='Pasif';Cost='Yok.';Effect="Turundaki ilk isabetine uzmanlık bonusun kadar $DamageType hasarı ekleyebilirsin.";Limit='Kısa mola başına uzmanlık bonusun kadar kez; tur başına bir kez.'} }
        }
    }

    $n = $Tier.Number
    $damage = if ($n -eq 1) {'2d6'} elseif ($n -eq 2) {'3d6'} elseif ($n -eq 3) {'4d8'} else {'5d8'}
    $reduced = if ($n -eq 1) {'1d6'} elseif ($n -eq 2) {'2d6'} elseif ($n -eq 3) {'3d8'} else {'4d8'}
    $heal = if ($n -eq 1) {'1d8'} elseif ($n -eq 2) {'2d8'} elseif ($n -eq 3) {'3d8'} else {'4d8'}
    $move = if ($n -eq 1) {'6 m'} elseif ($n -eq 2) {'9 m'} elseif ($n -eq 3) {'12 m'} else {'15 m'}
    $cost = if ($n -le 2) {'1 sınıf kaynağı.'} else {'2 sınıf kaynağı; uzun mola başına bir kez.'}
    switch ($Theme) {
        'İyileştirme' { return [pscustomobject]@{Action='Hızlı Aksiyon';Cost=$cost;Effect=('9 m içindeki bir yaratık `{0} + yetenek modifikatörü` CP kazanır.' -f $heal);Limit='Aynı hedef bu yetenekten uzun mola başına bir kez CP kazanabilir.'} }
        'Savunma' { return [pscustomobject]@{Action='Tepki';Cost=$cost;Effect=('Sen veya 9 m içindeki bir müttefik hasar aldığında hasarı `{0} + yetenek modifikatörü` azalt.' -f $heal);Limit='Hasar 0 olsa bile saldırının diğer etkileri sürer; Tepki gerektirir.'} }
        'Hareket' { return [pscustomobject]@{Action='Hızlı Aksiyon';Cost=$cost;Effect=('{0} güvenli hareket et. Bu hareket sonunda yapacağın ilk isabet `{1}` {2} hasarı ekler.' -f $move,$reduced,$DamageType);Limit='Hareketini görebildiğin ve geçebildiğin bir alanda bitirmelisin; tur başına bir kez.'} }
        'Gizlilik' { return [pscustomobject]@{Action='Hızlı Aksiyon';Cost=$cost;Effect="En fazla $move hareket et ve sonraki turunun başına kadar veya saldırana dek Görünmez ol.";Limit='Açık görüş altında başladığında önce örtüye ulaşmalısın; tur başına bir kez.'} }
        'Kontrol' {
            if ($n -ge 3) { return [pscustomobject]@{Action='Ana Aksiyon';Cost=$cost;Effect=('18 m içindeki hedef DAY kurtarması yapar; başarısızsa `{0}` {1} hasarı alır ve sonraki turunun sonuna kadar Sersemlemiş olur. Başarıda yarı hasar alır ve Sersemlemez.' -f $reduced,$DamageType);Limit='Aynı hedef bu yeteneğin Sersemlemiş etkisinden uzun mola başına bir kez etkilenebilir.'} }
            return [pscustomobject]@{Action='Ana Aksiyon';Cost=$cost;Effect=('18 m içindeki hedef GÜÇ veya ÇEV kurtarması yapar; başarısızsa `{0}` {1} hasarı alır ve hızı sonraki turunun sonuna kadar 0 olur.' -f $reduced,$DamageType);Limit='Hedef her turunun sonunda kurtarmayı tekrarlayarak etkiyi erken bitirebilir.'}
        }
        'Seri Saldırı' { return [pscustomobject]@{Action='Hızlı Aksiyon';Cost=$cost;Effect=('Bu tur Saldır aksiyonunda tek saldırı yerine aynı hedefe iki İmza saldırısı yap; her isabet `{0} + yetenek modifikatörü` {1} hasarı verir.' -f $reduced,$DamageType);Limit='Normal silah hasarı eklenmez; iki saldırı tek bonus hasar paketi sayılır; tur başına bir kez.'} }
        'İşaret' { return [pscustomobject]@{Action='Hızlı Aksiyon';Cost=$cost;Effect=('18 m içindeki bir hedefi 1 dakika işaretle. Tur başına ilk isabetin `{0}` {1} hasarı ekler ve hedefi izleme kontrollerin avantajlıdır.' -f $reduced,$DamageType);Limit='Aynı anda tek hedef; hedef 0 CP olduğunda veya başka hedef işaretlendiğinde biter.'} }
        'Yavaşlatma' { return [pscustomobject]@{Action='Ana Aksiyon';Cost=$cost;Effect=('18 m İmza saldırısı yap; isabette `{0} + yetenek modifikatörü` {1} hasarı ver ve hedefin hızını sonraki turunun sonuna kadar 3 m azalt.' -f $damage,$DamageType);Limit='Hız azaltma aynı hedefte birikmez.'} }
        'Keşif' { return [pscustomobject]@{Action='Ana Aksiyon';Cost=$cost;Effect="27 m içindeki bir noktadan $move yarıçaplı alanı bir tur boyunca gözle; saklı yaratıklar İmza DC'ne karşı ÇEV kurtarmasını kaybederse açığa çıkar.";Limit='Tam siperin arkasını görmez; görünmezliği bitirmez.'} }
        'Alan Hasarı' { return [pscustomobject]@{Action='Ana Aksiyon';Cost=$cost;Effect=('18 m içindeki bir noktada 3 m yarıçap oluştur. Alandakiler ÇEV kurtarması yapar; başarısızlıkta `{0}` {1}, başarıda yarı hasar alır.' -f $reduced,$DamageType);Limit='Alan içindeki dostlar da kurtarma yapar; tek bonus hasar paketi sayılır.'} }
        default { return [pscustomobject]@{Action='Ana Aksiyon';Cost=$cost;Effect=('18 m içindeki bir hedefe İmza saldırısı yap; isabette `{0} + yetenek modifikatörü` {1} hasarı ver.' -f $damage,$DamageType);Limit='Tek bonus hasar paketi sayılır; tur başına bir kez.'} }
    }
}

function Add-CardLines($Lines, [string]$Heading, [string]$Id, [string]$Source, $Tier, [string]$Classes, [string]$Theme, $Card) {
    $Lines.Add("### $Heading")
    $Lines.Add('')
    $Lines.Add("**$Id**")
    $Lines.Add('')
    $Lines.Add("- **Kaynak:** $Source.")
    $Lines.Add("- **Kademe:** $($Tier.Name); asgari seviye $($Tier.Level).")
    $Lines.Add("- **Tema:** $Theme.")
    $Lines.Add("- **Uyumlu sınıflar:** $Classes.")
    $Lines.Add("- **Aksiyon:** $($Card.Action).")
    $Lines.Add("- **Bedel:** $($Card.Cost)")
    $Lines.Add("- **Etki:** $($Card.Effect)")
    $Lines.Add("- **Sınır:** $($Card.Limit)")
    $Lines.Add('')
}

if (-not (Test-Path -LiteralPath $LolSource)) { throw "LoL source missing: $LolSource" }
if (-not (Test-Path -LiteralPath $TftSource)) { throw "TFT source missing: $TftSource" }

$lolData = Get-Content -LiteralPath $LolSource -Raw -Encoding UTF8 | ConvertFrom-Json
$lolChampions = @($lolData.data.PSObject.Properties | Where-Object { $_.Name -notlike 'Jade_*' } | ForEach-Object { $_.Value } | Sort-Object name)
$lolLines = New-Object Collections.Generic.List[string]
foreach ($line in @('---','title: LoL 16.15.1 Yetenek Uyarlamaları','slug: /icerik/yetenekler/lol-16-15-1','order: 91','version: 0.3.0','status: complete-draft','source_snapshot: LoL 16.15.1','---','','# LoL 16.15.1 — Yetenek Uyarlamaları','','Bu katalog güncel ana LoL kadrosunun Pasif, Q, W, E ve R yeteneklerini Runeterra FRP İmza Yeteneği kartlarına dönüştürür. Resmî açıklamalar kopyalanmamış; yalnızca ad ve temel oynanış fikri kullanılmıştır.','','Kullanım, kademe ve kaynak kuralları için [İmza Yetenekleri Kataloğu](../Yetenekler.md) kullanılır.','')) { $lolLines.Add($line) }

foreach ($champion in $lolChampions) {
    $championId = Get-StableId $champion.id
    $lolLines.Add("## $($champion.name)")
    $lolLines.Add('')
    $entries = New-Object Collections.Generic.List[object]
    $entries.Add([pscustomobject]@{Slot='P';Label='Pasif';Name=$champion.passive.name;Description=$champion.passive.description})
    $slotNames = @('Q','W','E','R')
    for ($i=0; $i -lt 4; $i++) { $entries.Add([pscustomobject]@{Slot=$slotNames[$i];Label=$slotNames[$i];Name=$champion.spells[$i].name;Description=$champion.spells[$i].description}) }
    foreach ($entry in $entries) {
        $tier = Get-Tier 'LoL' $entry.Slot 0
        $theme = Get-Theme $entry.Name $entry.Description $entry.Slot
        $damageType = Get-DamageType $entry.Name $entry.Description
        $classes = Get-CompatibleClasses $champion.tags '' $theme
        $special = "$($champion.id.ToUpperInvariant())-$($entry.Slot)"
        $card = Get-AbilityCard $theme $tier $damageType ($entry.Slot -eq 'P') $special
        $id = "ABILITY-LOL-$championId-$($entry.Slot)"
        Add-CardLines $lolLines "$($entry.Label) — $($entry.Name)" $id "League of Legends 16.15.1, $($champion.name) $($entry.Label)" $tier $classes $theme $card
    }
}

$tftData = Get-Content -LiteralPath $TftSource -Raw -Encoding UTF8 | ConvertFrom-Json
$tftChampions = @($tftData.sets.'17'.champions | Where-Object { $_.apiName -like 'TFT17_*' -and $_.cost -ge 1 -and $_.cost -le 5 -and @($_.traits).Count -gt 0 } | Sort-Object cost,name)
$tftLines = New-Object Collections.Generic.List[string]
foreach ($line in @('---','title: TFT Set 17 Yetenek Uyarlamaları','slug: /icerik/yetenekler/tft-set-17','order: 92','version: 0.3.0','status: complete-draft','source_snapshot: TFT Set 17; patch 16.15','---','','# TFT Set 17 — Yetenek Uyarlamaları','','Bu katalog TFT Set 17 ana oyuncu kadrosunun birim yeteneklerini Runeterra FRP İmza Yeteneği kartlarına dönüştürür. Çağrılmış, eğitim ve PvE birimleri kapsam dışıdır. Resmî açıklamalar kopyalanmamıştır.','','Kullanım, kademe ve kaynak kuralları için [İmza Yetenekleri Kataloğu](../Yetenekler.md) kullanılır.','')) { $tftLines.Add($line) }

foreach ($champion in $tftChampions) {
    $unitId = Get-StableId ($champion.apiName -replace '^TFT17_','')
    $abilityName = if ([string]::IsNullOrWhiteSpace($champion.ability.name)) {'Adsız Birim Yeteneği'} else {$champion.ability.name}
    $tier = Get-Tier 'TFT' '' ([int]$champion.cost)
    $theme = Get-Theme $abilityName $champion.ability.desc ''
    $damageType = Get-DamageType $abilityName $champion.ability.desc
    $classes = Get-CompatibleClasses $champion.traits $champion.role $theme
    $card = Get-AbilityCard $theme $tier $damageType $false ''
    $tftLines.Add("## $($champion.name)")
    $tftLines.Add('')
    $traits = @($champion.traits) -join ', '
    $heading = "Birim Yeteneği — $abilityName"
    $id = "ABILITY-TFT17-$unitId-A"
    Add-CardLines $tftLines $heading $id "TFT Set 17, $($champion.cost) bedel; özellikler: $traits" $tier $classes $theme $card
}

$lolTarget = [IO.Path]::GetFullPath((Join-Path (Get-Location) $LolOutput))
$tftTarget = [IO.Path]::GetFullPath((Join-Path (Get-Location) $TftOutput))
New-Item -ItemType Directory -Force -Path (Split-Path $lolTarget) | Out-Null
$encoding = New-Object Text.UTF8Encoding($true)
[IO.File]::WriteAllLines($lolTarget, $lolLines, $encoding)
[IO.File]::WriteAllLines($tftTarget, $tftLines, $encoding)

[pscustomobject]@{
    LolChampions = $lolChampions.Count
    LolAbilities = $lolChampions.Count * 5
    TftUnits = $tftChampions.Count
    LolOutput = $lolTarget
    TftOutput = $tftTarget
}
