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
$componentPattern = 'BFSword|RecurveBow|NeedlesslyLargeRod|TearOfTheGoddess|ChainVest|NegatronCloak|GiantsBelt|SparringGloves|Spatula|FryingPan'

$records = foreach ($property in $json.data.PSObject.Properties) {
    $id = [string]$property.Name
    $name = [string]$property.Value.name
    $include = $id -match '^TFT_Item_|^TFT_Consumable_|Radiant|Ornn|Artifact|SupportItem|AnimaSquadItem_|TFT17_Item_.*Item|TFT17_.*Emblem'
    $exclude = $id -match 'Tutorial|ChampionItem|MarketOffering|TraitItem|Dummy|Debug|Hexcore|Augment|Armory|Reward|Orb|Token'

    if ($include -and -not $exclude -and $name) {
        [PSCustomObject]@{ Id = $id; Name = $name }
    }
}

function Get-Category {
    param([string]$Id)
    if ($Id -match 'Emblem') { return 'Amblem' }
    if ($Id -match 'AnimaSquadItem_') { return 'Set 17 özel' }
    if ($Id -match 'Radiant') { return 'Işıltılı' }
    if ($Id -match 'SupportItem') { return 'Destek' }
    if ($Id -match 'Ornn|Artifact') { return 'Eser' }
    if ($Id -match '^TFT_Consumable_') { return 'Tüketilebilir' }
    if ($Id -match $componentPattern -and $Id -notmatch 'Radiant') { return 'Bileşen' }
    return 'Birleşik'
}

function Get-Rarity {
    param([string]$Id, [string]$Category)
    switch ($Category) {
        'Bileşen' { return 'Basit' }
        'Tüketilebilir' { return 'Basit' }
        'Amblem' { return 'Ender' }
        'Destek' { return 'Çok Ender' }
        'Birleşik' { return 'Çok Ender' }
        'Işıltılı' { return 'Efsanevi' }
        'Eser' { return 'Mitik' }
        'Set 17 özel' {
            if ($Id -match 'Tier0') { return 'Basit' }
            if ($Id -match 'Tier1') { return 'Sıradışı' }
            if ($Id -match 'Tier2') { return 'Ender' }
            if ($Id -match 'Tier3') { return 'Efsanevi' }
            if ($Id -match 'Tier4') { return 'Mitik' }
            return 'Çok Ender'
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

function Get-Type {
    param([string]$Id, [string]$Name, [string]$Category)
    if ($Category -eq 'Amblem') { return 'Amblem' }
    if ($Category -eq 'Tüketilebilir') { return 'Tüketilebilir' }
    if ($Id -match 'Vest|Armor|Cloak|Belt|Warmog|Bramble|Gargoyle|Guard|Shield|Helm|Redemption|Locket|Protector|Tank') { return 'Savunma' }
    if ($Id -match 'Sword|Bow|Blade|Edge|Cannon|Gun|Spear|Axe|Rage|Death|Slayer|Sniper|Blaster|Slicer|Crossbow|Zapper') { return 'Silah' }
    if ($Id -match 'Rod|Archangel|Morello|Rabadon|Jeweled|BlueBuff|Shojin|Ionic|Statikk|Spark|Staff|Mage|Sorcer|Hex') { return 'Büyü odağı' }
    if ($Id -match 'Support|Chalice|Zeke|Zephyr|Virtue|Moonstone') { return 'Destek' }
    if ($Name -match 'Zırh|Yelek|Kalkan|Miğfer|Pelerin') { return 'Savunma' }
    if ($Name -match 'Kılıç|Yay|Tabanca|Balta|Mızrak|Bıçak|Kesici|Silah') { return 'Silah' }
    if ($Name -match 'Asa|Değnek|Büyü|Nazar|Mücevher') { return 'Büyü odağı' }
    return 'Tılsım/araç'
}

function Get-Effects {
    param([string]$Id, [string]$Name, [string]$Category, [string]$Rarity, [string]$Type)

    $die = Get-Die $Rarity
    $rank = @{'Basit'=1;'Sıradışı'=2;'Ender'=3;'Çok Ender'=4;'Efsanevi'=5;'Mitik'=6}[$Rarity]
    $effects = [Collections.Generic.List[string]]::new()

    if ($Category -eq 'Amblem') {
        $effects.Add('Uzun mola sonunda amblemin temasına uygun bir Aspect yaz. Uzun mola başına bir kez bu Aspecti savaş dışı bir kontrolde RP harcamadan +1d6 için Invoke et.')
        return $effects
    }

    if ($Category -eq 'Tüketilebilir') {
        if ($Name -match 'Çoğaltıcı') {
            $effects.Add('Ana Aksiyonla 9 m içine kullanıcının 1 CP sahibi, saldırı yapamayan bir suretini oluştur. Suret 1 dakika sürer ve sonra eşya tüketilir.')
        }
        elseif ($Name -match 'Sökücü|Kaldırıcı') {
            $effects.Add('Bir kısa mola sırasında bağlı bir eşyayı uzun mola beklemeden güvenle ayır veya değiştir; sonra tüketilir.')
        }
        elseif ($Name -match 'Dönüştürücü') {
            $effects.Add('Bir kısa mola sırasında Basit veya Sıradışı bir eşyayı aynı nadirlikte rastgele başka bir eşya temasına dönüştür; sonra tüketilir.')
        }
        else {
            $effects.Add('Hızlı Aksiyonla kullan: 10 dakika boyunca eşyanın temasına uygun kontrollerde avantaj kazan; sonra tüketilir.')
        }
        return $effects
    }

    if ($Type -eq 'Silah') {
        $effects.Add("Tur başına bir kez silah isabetine +$die fiziksel veya enerji hasarı ekle.")
    }
    elseif ($Type -eq 'Büyü odağı') {
        $effects.Add("Tur başına bir kez büyü, dua veya cihaz hasarına +$die enerji hasarı ekle.")
    }
    elseif ($Type -eq 'Savunma') {
        $effects.Add("Tepki kullanarak aldığın hasarı $die azalt; kısa mola başına uzmanlık bonusun kadar.")
    }
    elseif ($Type -eq 'Destek') {
        $effects.Add("Tur başına bir kez verdiğin iyileştirme, geçici CP veya hasar azaltmayı +$die artır.")
    }
    else {
        $effects.Add('Kısa mola başına bir kez eşyanın temasına uygun bir kontrolü avantajlı yap.')
    }

    if ($rank -ge 4) {
        if ($Id -match 'Radiant') {
            $effects.Add('Uzun mola başına bir kez ana etkideki bütün zarları azami sonucu vermiş kabul et.')
        }
        elseif ($Category -eq 'Eser') {
            $effects.Add('Uzun mola başına bir kez 1 RP harcamadan eşyanın temasına uygun bir sahne detayı oluştur.')
        }
        elseif ($Id -match 'Crit|Infinity|Jeweled|Glove') {
            $effects.Add("Kritik vuruş veya doğal 20 sonucunda ayrıca +$die hasar ver.")
        }
        elseif ($Id -match 'Speed|Bow|Rage|Quick|Zephyr') {
            $effects.Add('Kısa mola başına bir kez Saldır veya Güç Kullan aksiyonundan sonra 3 m ücretsiz hareket et.')
        }
        elseif ($Type -eq 'Savunma') {
            $effects.Add("Maksimum CP +$rank.")
        }
        elseif ($Type -eq 'Büyü odağı') {
            $effects.Add('Uzun mola başına bir kez kısa mola sonunda 1 sınıf kaynağı veya bir 1. derece büyü yuvası yenile.')
        }
        elseif ($Type -eq 'Destek') {
            $effects.Add('Bu eşyanın iyileştirdiği veya koruduğu hedef 1 dakika Korkmuş durumuna karşı avantaj kazanır.')
        }
        else {
            $effects.Add('Uzun mola başına bir kez bu eşyanın ana etkisini Bağ maliyeti ödenmiş bir müttefike aktar.')
        }
    }

    return $effects
}

$items = foreach ($group in ($records | Group-Object Name)) {
    $entries = @($group.Group | Sort-Object Id)
    $preferred = $entries[0]
    $category = Get-Category $preferred.Id
    $rarity = Get-Rarity $preferred.Id $category
    $type = Get-Type $preferred.Id $group.Name $category
    [PSCustomObject]@{
        Name = $group.Name
        Ids = ($entries.Id -join ', ')
        Category = $category
        Rarity = $rarity
        Binding = Get-Binding $rarity $category
        Type = $type
        Effects = @(Get-Effects $preferred.Id $group.Name $category $rarity $type)
    }
}

$lines = [Collections.Generic.List[string]]::new()
$lines.Add('---')
$lines.Add('title: TFT Set 17 FRP Eşya Uyarlamaları')
$lines.Add('slug: /icerik/itemler/tft-set-17-uyarlamalar')
$lines.Add('order: 8.3')
$lines.Add('version: 0.3.0')
$lines.Add('status: complete-draft')
$lines.Add('source_snapshot: TFT Set 17; Data Dragon 16.15.1')
$lines.Add('---')
$lines.Add('')
$lines.Add('# TFT Set 17 FRP Eşya Uyarlamaları')
$lines.Add('')
$lines.Add('Bu katalog, 8 Ağustos 2026 tarihinde aktif olan TFT Set 17 ile birlikte erişilebilen ortak, birleşik, Işıltılı, Eser, Destek, Amblem ve sete özel ekipmanları FRP sistemine uyarlar. Sistem belirteçleri, şampiyon kopyaları, pazar teklifleri ve debug kayıtları dahil edilmez.')
$lines.Add('')
$lines.Add("- Seçilen ham kayıt: $($records.Count)")
$lines.Add("- Benzersiz eşya: $($items.Count)")
$lines.Add('- Set: Space Gods / Set 17')
$lines.Add('')
$lines.Add('## Kullanım sınırları')
$lines.Add('')
$lines.Add('- LoL kataloğundaki Eşya Bağı, Eşya Darbesi ve Eşya Savunması sınırları aynen geçerlidir.')
$lines.Add('- Işıltılı ve Eser eşyalar aynı anda en fazla birer tane bağlanabilir.')
$lines.Add('- Amblem yeni sınıf vermez; yalnızca tematik Aspect ve savaş dışı Invoke sağlar.')
$lines.Add('')

$rarityOrder = @('Basit', 'Sıradışı', 'Ender', 'Çok Ender', 'Efsanevi', 'Mitik')
foreach ($rarity in $rarityOrder) {
    $rarityItems = @($items | Where-Object Rarity -eq $rarity | Sort-Object Name)
    if ($rarityItems.Count -eq 0) { continue }
    $lines.Add("## $rarity ($($rarityItems.Count))")
    $lines.Add('')
    foreach ($item in $rarityItems) {
        $safeId = [regex]::Replace($item.Ids, '[^A-Za-z0-9]+', '-')
        $lines.Add("### $($item.Name)")
        $lines.Add('')
        $lines.Add("**ITEM-TFT-$safeId**")
        $lines.Add('')
        $lines.Add("- **Kaynak:** TFT Set 17 / Data Dragon 16.15.1; Riot ID $($item.Ids).")
        $lines.Add("- **Sınıf:** $($item.Category) · $($item.Rarity) · $($item.Type) · $($item.Binding) Bağ.")
        foreach ($effect in $item.Effects) { $lines.Add("- **Etki:** $effect") }
        $lines.Add('')
    }
}

[IO.File]::WriteAllText($OutputMarkdown, ($lines -join "`n"), [Text.UTF8Encoding]::new($false))

[PSCustomObject]@{
    SelectedRecords = $records.Count
    UniqueItems = $items.Count
    RarityCounts = $items | Group-Object Rarity | Sort-Object Name | Select-Object Name, Count
    CategoryCounts = $items | Group-Object Category | Sort-Object Name | Select-Object Name, Count
    Output = $OutputMarkdown
}
