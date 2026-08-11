param(
    [Parameter(Mandatory = $true)]
    [string]$SourceJson,

    [Parameter(Mandatory = $true)]
    [string]$OutputMarkdown
)

$sourcePath = (Resolve-Path -LiteralPath $SourceJson).Path
$outputDirectory = Split-Path -Parent $OutputMarkdown
if (-not (Test-Path -LiteralPath $outputDirectory -PathType Container)) {
    throw "Output directory does not exist: $outputDirectory"
}

$json = [IO.File]::ReadAllText($sourcePath, [Text.Encoding]::UTF8) | ConvertFrom-Json
$startingIds = @(1054, 1055, 1056, 1082, 1083, 1086, 1120, 3865)

$records = foreach ($property in $json.data.PSObject.Properties) {
    $item = $property.Value
    if ($item.maps.'11' -eq $true -and $item.gold.purchasable -eq $true -and $item.hideFromAll -ne $true) {
        [PSCustomObject]@{
            Id               = [int]$property.Name
            Name             = [string]$item.name
            Gold             = [int]$item.gold.total
            Tags             = @($item.tags)
            HasFrom          = ($null -ne $item.from)
            HasInto          = ($null -ne $item.into)
            RequiredChampion = [string]$item.requiredChampion
        }
    }
}

function Get-Category {
    param($Entries, $Preferred, $Tags)

    if ($Entries.RequiredChampion | Where-Object { $_ }) { return 'Şampiyona özel' }
    if ($Tags -contains 'Trinket' -or ($Tags -contains 'Vision' -and $Preferred.Gold -eq 0)) { return 'Görüş ve trinket' }
    if ($Tags -contains 'Jungle') { return 'Orman' }
    if ($Tags -contains 'Consumable') { return 'Tüketilebilir' }
    if (($Entries.Id | Where-Object { $startingIds -contains $_ }).Count -gt 0) { return 'Başlangıç' }
    if (($Entries | Where-Object Id -lt 10000).Count -eq 0) { return 'Özel mod' }
    if ($Preferred.HasInto) { return 'Bileşen' }
    return 'Tamamlanmış'
}

function Get-Rarity {
    param([string]$Category, [int]$Gold)

    switch ($Category) {
        'Başlangıç' { return 'Basit' }
        'Tüketilebilir' { if ($Gold -le 500) { return 'Basit' } else { return 'Sıradışı' } }
        'Görüş ve trinket' { if ($Gold -eq 0) { return 'Sıradışı' } else { return 'Basit' } }
        'Orman' { return 'Sıradışı' }
        'Şampiyona özel' { return 'Efsanevi' }
        'Özel mod' { return 'Efsanevi' }
        'Bileşen' {
            if ($Gold -le 500) { return 'Basit' }
            if ($Gold -le 1000) { return 'Sıradışı' }
            return 'Ender'
        }
        default {
            if ($Gold -lt 2400) { return 'Ender' }
            if ($Gold -lt 2900) { return 'Çok Ender' }
            if ($Gold -lt 3300) { return 'Efsanevi' }
            return 'Mitik'
        }
    }
}

function Get-Binding {
    param([string]$Rarity, [string]$Category)
    if ($Category -eq 'Tüketilebilir') { return 0 }
    switch ($Rarity) {
        'Basit' { return 0 }
        'Sıradışı' { return 0 }
        'Ender' { return 1 }
        'Çok Ender' { return 1 }
        'Efsanevi' { return 2 }
        'Mitik' { return 2 }
    }
}

function Get-Die {
    param([string]$Rarity)
    switch ($Rarity) {
        'Basit' { return '1d4' }
        'Sıradışı' { return '1d6' }
        'Ender' { return '1d6' }
        'Çok Ender' { return '1d8' }
        'Efsanevi' { return '1d10' }
        'Mitik' { return '1d12' }
    }
}

function Has-Tag {
    param($Tags, [string]$Tag)
    return ($Tags -contains $Tag)
}

function Get-Type {
    param([string]$Name, [string]$Category, $Tags)

    if ($Category -eq 'Tüketilebilir') { return 'Tüketilebilir' }
    if ($Category -eq 'Görüş ve trinket') { return 'Görüş aracı' }
    if ($Category -eq 'Orman') { return 'Yoldaş/orman aracı' }
    if ($Category -eq 'Şampiyona özel') { return 'Bağlı araç' }
    if ($Tags -contains 'Boots' -or $Name -match 'Çizme|Pabuç|Adım|Yol|Yürüyüş') { return 'Çizme' }
    if ($Tags -contains 'SpellDamage' -or $Tags -contains 'Mana' -or $Tags -contains 'ManaRegen') { return 'Büyü odağı' }
    if ($Tags -contains 'Damage' -or $Tags -contains 'CriticalStrike' -or $Tags -contains 'AttackSpeed' -or $Tags -contains 'OnHit') { return 'Silah yükseltmesi' }
    if ($Tags -contains 'Armor' -or $Tags -contains 'MagicResist' -or $Tags -contains 'Health') { return 'Savunma teçhizatı' }
    if ($Tags -contains 'Vision' -or $Tags -contains 'GoldPer') { return 'Destek aracı' }
    return 'Tılsım/araç'
}

function Get-Effects {
    param([string]$Name, [string]$Category, [string]$Rarity, [string]$Type, $Tags)

    $die = Get-Die $Rarity
    $rank = @{'Basit'=1;'Sıradışı'=2;'Ender'=3;'Çok Ender'=4;'Efsanevi'=5;'Mitik'=6}[$Rarity]
    $effects = [Collections.Generic.List[string]]::new()

    switch ($Name) {
        "Doran'ın Kılıcı" { $effects.Add('Tur başına bir kez yakın silah isabetine +1d6 fiziksel hasar ekle.'); return $effects }
        "Doran'ın Yüzüğü" { $effects.Add('Tur başına bir kez büyü, dua veya cihaz hasarına +1d6 enerji hasarı ekle.'); return $effects }
        "Doran'ın Yayı" { $effects.Add('Tur başına bir kez menzilli silah isabetine +1d6 fiziksel hasar ekle.'); return $effects }
        "Doran'ın Kalkanı" { $effects.Add('Kalkan olarak +2 SS verir. Başka bir özel etkisi yoktur.'); return $effects }
        "Doran'ın Miğferi" { $effects.Add('Maksimum CP +3. Başka bir özel etkisi yoktur.'); return $effects }
        'Can İksiri' { $effects.Add('Hızlı Aksiyonla iç: 1d6 + 2 CP yenile; sonra tüketilir.'); return $effects }
        'Doldurulabilir İksir' { $effects.Add('2 yük taşır. Hızlı Aksiyon ve 1 yük: 1d4 + 1 CP yenile. Güvenli yerleşimde uzun molada dolar.'); return $effects }
        'Kontrol Totemi' { $effects.Add('Ana Aksiyonla yerleştir: 1 saat boyunca 9 m içindeki görünmez totem ve sıradan tuzakları açığa çıkarır.'); return $effects }
        'Görünmez Totem' { $effects.Add('Ana Aksiyonla yerleştir: 1 saat boyunca 12 m çevresinde sessiz alarm sağlar; Algı DC 15 ile bulunur.'); return $effects }
        'Uzak Görüş Dönüşümü' { $effects.Add('Uzun mola başına bir kez 120 m içindeki bir noktayı 1 tur gör ve 8 saatlik görünür sensör bırak.'); return $effects }
        'Kâhin Merceği' { $effects.Add('Kısa mola başına bir kez Hızlı Aksiyon: 1 dakika 9 m içindeki gizli tuzak ve totemleri gör.'); return $effects }
        'Alazpençe Yavrusu' { $effects.Add('Tur başına bir kez Av İşaretli veya doğal yaratığa +1d6 ateş hasarı ver.'); return $effects }
        'Yelgezer Yavrusu' { $effects.Add('Doğal örtüden çıktığında tur sonuna kadar hızın 3 m artar; tur başına bir kez.'); return $effects }
        'Yosunezen Yavrusu' { $effects.Add('Çatışma dışında 10 dakika zarar görmezsen uzmanlık bonusun kadar geçici CP kazan.'); return $effects }
        "Kalista'nın Kara Kargısı" { $effects.Add('Uzun mola sonunda istekli bir müttefikle bağ kur. 9 m içindeyken ona doğru hareket ederken hızın 3 m artar ve onun yerini her zaman bilirsin.'); return $effects }
        'Korkuluk' { $effects.Add('Uzun mola başına iki kez Ana Aksiyonla 9 m içine sahte suret yerleştir. İlk gören düşman SEZ kurtarmasını kaybederse bir tur Korkmuş olur.'); return $effects }
    }

    if ($Type -eq 'Çizme') {
        $speed = if ($rank -le 2) { '1,5 m' } else { '3 m' }
        $effects.Add("Hızın $speed artar. Aynı anda yalnızca bir çizme etkisi çalışır.")
    }
    elseif ($Type -eq 'Silah yükseltmesi') {
        $effects.Add("Tur başına bir kez silah isabetine +$die fiziksel hasar ekle.")
    }
    elseif ($Type -eq 'Büyü odağı') {
        $effects.Add("Tur başına bir kez büyü, dua veya cihaz hasarına +$die enerji hasarı ekle.")
    }
    elseif ($Type -eq 'Savunma teçhizatı') {
        if ((Has-Tag $Tags 'Armor') -and (Has-Tag $Tags 'MagicResist')) {
            $effects.Add("Tepki kullanarak aldığın fiziksel veya büyülü hasarı $die azalt; kısa mola başına uzmanlık bonusun kadar.")
        }
        elseif (Has-Tag $Tags 'Armor') {
            $effects.Add("Tepki kullanarak aldığın fiziksel hasarı $die azalt; kısa mola başına uzmanlık bonusun kadar.")
        }
        elseif (Has-Tag $Tags 'MagicResist') {
            $effects.Add('Büyü ve doğaüstü etkilere karşı ilk başarısız kurtarmanı yeniden at; kısa mola başına bir kez.')
        }
        else {
            $hp = 1 + $rank
            $effects.Add("Maksimum CP +$hp.")
        }
    }
    elseif ($Type -eq 'Destek aracı') {
        $effects.Add("Tur başına bir kez verdiğin iyileştirme, geçici CP veya hasar azaltmayı +$die artır.")
    }
    elseif ($Type -eq 'Tüketilebilir') {
        if (Has-Tag $Tags 'HealthRegen') {
            $effects.Add("Hızlı Aksiyonla kullan: $die + uzmanlık bonusu CP yenile; sonra tüketilir.")
        }
        else {
            $effects.Add('Hızlı Aksiyonla kullan: eşyanın temasına uygun kontrollerde 10 dakika avantaj kazan; sonra tüketilir.')
        }
    }
    elseif ($Type -eq 'Görüş aracı') {
        $effects.Add('Ana Aksiyonla kullan: 10 dakika boyunca 12 m içindeki saklı geçit, tuzak veya gözcüleri arayan kontrollerde avantaj kazan.')
    }
    elseif ($Type -eq 'Yoldaş/orman aracı') {
        $effects.Add("Tur başına bir kez doğal yaratık veya canavara verdiğin hasara +$die ekle.")
    }
    else {
        $effects.Add('Kısa mola başına bir kez eşyanın temasına uygun bir beceri kontrolünü avantajlı yap.')
    }

    if ($rank -ge 3) {
        if (Has-Tag $Tags 'CriticalStrike') {
            $effects.Add("Kritik vuruşta ayrıca +$die hasar ver.")
        }
        elseif ((Has-Tag $Tags 'LifeSteal') -or (Has-Tag $Tags 'SpellVamp')) {
            $effects.Add('Bonus hasarı verdiğinde 2 CP yenile; kısa mola başına bir kez.')
        }
        elseif (Has-Tag $Tags 'ArmorPenetration') {
            $effects.Add('Bu eşyayla güçlenen saldırı hedefin Savunma Sınıfını 1 düşük kabul eder.')
        }
        elseif (Has-Tag $Tags 'AttackSpeed') {
            $effects.Add('Kısa mola başına bir kez Saldır aksiyonundan sonra Hızlı Aksiyonla bir silah saldırısı yap.')
        }
        elseif ((Has-Tag $Tags 'Mana') -or (Has-Tag $Tags 'ManaRegen')) {
            $effects.Add('Uzun mola başına bir kez kısa mola sonunda 1 sınıf kaynağı veya bir 1. derece büyü yuvası yenile.')
        }
        elseif (Has-Tag $Tags 'MoveSpeed') {
            $effects.Add('Atıl kullandığında fırsat saldırılarına karşı Savunma Sınıfın o tur +2 artar.')
        }
        elseif (Has-Tag $Tags 'Health') {
            $effects.Add("Maksimum CP ayrıca +$rank artar.")
        }
        elseif (Has-Tag $Tags 'Active') {
            $effects.Add('Kısa mola başına bir kez bu eşyanın ana etkisini Hızlı Aksiyonla kullan.')
        }
    }

    return $effects
}

$items = foreach ($group in ($records | Group-Object Name)) {
    $entries = @($group.Group | Sort-Object Id)
    $preferred = $entries | Where-Object Id -lt 10000 | Select-Object -First 1
    if (-not $preferred) { $preferred = $entries[0] }
    $tags = @($entries.Tags | ForEach-Object { $_ } | Sort-Object -Unique)
    $category = Get-Category $entries $preferred $tags
    $rarity = Get-Rarity $category $preferred.Gold
    $type = Get-Type $group.Name $category $tags
    $effects = @(Get-Effects $group.Name $category $rarity $type $tags)

    [PSCustomObject]@{
        Name     = $group.Name
        Ids      = ($entries.Id -join ', ')
        Gold     = (($entries.Gold | Sort-Object -Unique) -join '/')
        Category = $category
        Rarity   = $rarity
        Binding  = Get-Binding $rarity $category
        Type     = $type
        Tags     = ($tags -join ', ')
        Effects  = $effects
    }
}

$lines = [Collections.Generic.List[string]]::new()
$lines.Add('---')
$lines.Add('title: LoL 16.15.1 FRP Eşya Uyarlamaları')
$lines.Add('slug: /icerik/itemler/lol-16-15-1-uyarlamalar')
$lines.Add('order: 8.2')
$lines.Add('version: 0.3.0')
$lines.Add('status: complete-draft')
$lines.Add('source_snapshot: LoL 16.15.1')
$lines.Add('---')
$lines.Add('')
$lines.Add('# LoL 16.15.1 FRP Eşya Uyarlamaları')
$lines.Add('')
$lines.Add('Bu belge güncel Summoners Rift verisindeki benzersiz eşya adlarının tamamını mekanik olarak oynanabilir hâle getirir. Etkiler Riot açıklamalarının kopyası değil, eşya kimliği ve etiketlerinden türetilmiş Runeterra FRP kurallarıdır.')
$lines.Add('')
$lines.Add("- Ham Riot kaydı: $($records.Count)")
$lines.Add("- Benzersiz uyarlama: $($items.Count)")
$lines.Add('- Kaynak yama: 16.15.1')
$lines.Add('')
$lines.Add('## Kullanım sınırları')
$lines.Add('')
$lines.Add('- Tur başına yalnızca bir eşyanın bonus hasar zarı uygulanır.')
$lines.Add('- Tur başına yalnızca bir eşyanın hasar azaltma Tepkisi uygulanır.')
$lines.Add('- Aynı isimli veya aynı sabit bonus etiketli etkiler üst üste binmez.')
$lines.Add('- Bir eşya daha ayrıntılı özel metin kazanırsa, özel metin bu üretilmiş sürümün yerini alır.')
$lines.Add('')

$rarityOrder = @('Basit', 'Sıradışı', 'Ender', 'Çok Ender', 'Efsanevi', 'Mitik')
foreach ($rarity in $rarityOrder) {
    $rarityItems = @($items | Where-Object Rarity -eq $rarity | Sort-Object Name)
    if ($rarityItems.Count -eq 0) { continue }
    $lines.Add("## $rarity ($($rarityItems.Count))")
    $lines.Add('')
    foreach ($item in $rarityItems) {
        $lines.Add("### $($item.Name)")
        $lines.Add('')
        $lines.Add("**ITEM-LOL-$($item.Ids.Replace(', ', '-'))**")
        $lines.Add('')
        $lines.Add("- **Kaynak:** LoL 16.15.1; Riot ID $($item.Ids); kaynak altın $($item.Gold).")
        $lines.Add("- **Sınıf:** $($item.Category) · $($item.Rarity) · $($item.Type) · $($item.Binding) Bağ.")
        foreach ($effect in $item.Effects) {
            $lines.Add("- **Etki:** $effect")
        }
        $lines.Add("- **Etiketler:** $($item.Tags).")
        $lines.Add('')
    }
}

[IO.File]::WriteAllText($OutputMarkdown, ($lines -join "`n"), [Text.UTF8Encoding]::new($false))

[PSCustomObject]@{
    RawRecords = $records.Count
    UniqueItems = $items.Count
    RarityCounts = $items | Group-Object Rarity | Sort-Object Name | Select-Object Name, Count
    Output = $OutputMarkdown
}
