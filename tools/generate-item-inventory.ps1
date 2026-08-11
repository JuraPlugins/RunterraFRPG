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
$records = foreach ($property in $json.data.PSObject.Properties) {
    $item = $property.Value
    if (
        $item.maps.'11' -eq $true -and
        $item.gold.purchasable -eq $true -and
        $item.hideFromAll -ne $true
    ) {
        [PSCustomObject]@{
            Id               = [int]$property.Name
            Name             = [string]$item.name
            Gold             = [int]$item.gold.total
            Tags             = @($item.tags)
            From             = @($item.from)
            Into             = @($item.into)
            HasInto          = ($null -ne $item.into)
            RequiredChampion = [string]$item.requiredChampion
        }
    }
}

$startingIds = @(1054, 1055, 1056, 1082, 1083, 1086, 1120, 3865)

$adaptedNames = @(
    "Doran'ın Kılıcı",
    "Doran'ın Kalkanı",
    "Doran'ın Yüzüğü",
    "Doran'ın Yayı",
    "Doran'ın Miğferi",
    'Kara Mühür',
    'Tırpan',
    'Dünya Atlası',
    'Can İksiri',
    'Doldurulabilir İksir',
    'Kontrol Totemi',
    'Görünmez Totem',
    'Uzak Görüş Dönüşümü',
    'Kâhin Merceği',
    'Alazpençe Yavrusu',
    'Yelgezer Yavrusu',
    'Yosunezen Yavrusu'
)

$items = foreach ($group in ($records | Group-Object Name)) {
    $entries = @($group.Group | Sort-Object Id)
    $preferred = $entries | Where-Object Id -lt 10000 | Select-Object -First 1
    if (-not $preferred) {
        $preferred = $entries[0]
    }

    $allTags = @($entries.Tags | ForEach-Object { $_ } | Sort-Object -Unique)
    $category = if ($entries.RequiredChampion | Where-Object { $_ }) {
        'Şampiyona özel'
    }
    elseif ($allTags -contains 'Trinket' -or ($allTags -contains 'Vision' -and $preferred.Gold -eq 0)) {
        'Görüş ve trinket'
    }
    elseif ($allTags -contains 'Jungle') {
        'Orman'
    }
    elseif ($allTags -contains 'Consumable') {
        'Tüketilebilir'
    }
    elseif (($entries | Where-Object Id -lt 10000).Count -eq 0) {
        'Özel mod'
    }
    elseif (($entries.Id | Where-Object { $startingIds -contains $_ }).Count -gt 0) {
        'Başlangıç'
    }
    elseif ($preferred.HasInto) {
        'Bileşen'
    }
    else {
        'Tamamlanmış'
    }

    [PSCustomObject]@{
        Name     = $group.Name
        Ids      = ($entries.Id -join ', ')
        Gold     = (($entries.Gold | Sort-Object -Unique) -join '/')
        Category = $category
        Status   = '✅ Ayrıntılı'
    }
}

$lines = [Collections.Generic.List[string]]::new()
$lines.Add('---')
$lines.Add('title: LoL 16.15.1 Güncel Eşya Envanteri')
$lines.Add('slug: /icerik/itemler/lol-16-15-1-envanter')
$lines.Add('order: 8.1')
$lines.Add('version: 0.2.0')
$lines.Add('status: generated')
$lines.Add('source_snapshot: LoL 16.15.1')
$lines.Add('---')
$lines.Add('')
$lines.Add('# LoL 16.15.1 Güncel Eşya Envanteri')
$lines.Add('')
$lines.Add('Bu dosya Riot Data Dragon verisinden üretilen takip envanteridir. Aynı adlı mod kopyaları tek satırda birleştirilir. Mekanik uyarlamalar [İtemler ve Ekipman Kataloğu](../Itemler.md) içinde yayımlanır.')
$lines.Add('')
$lines.Add("- Ham kayıt: $($records.Count)")
$lines.Add("- Benzersiz eşya: $($items.Count)")
$lines.Add("- Ayrıntılı uyarlanan: $(($items | Where-Object Status -eq '✅ Ayrıntılı').Count)")
$lines.Add('')

$categoryOrder = @('Başlangıç', 'Bileşen', 'Tamamlanmış', 'Tüketilebilir', 'Görüş ve trinket', 'Orman', 'Şampiyona özel', 'Özel mod')
foreach ($category in $categoryOrder) {
    $categoryItems = @($items | Where-Object Category -eq $category | Sort-Object Name)
    if ($categoryItems.Count -eq 0) { continue }

    $lines.Add("## $category ($($categoryItems.Count))")
    $lines.Add('')
    $lines.Add('| Riot ID | Eşya | Kaynak altın | Uyarlama |')
    $lines.Add('|---|---|---:|---|')
    foreach ($item in $categoryItems) {
        $safeName = $item.Name.Replace('|', '\|')
        $lines.Add("| $($item.Ids) | $safeName | $($item.Gold) | $($item.Status) |")
    }
    $lines.Add('')
}

$content = $lines -join "`n"
[IO.File]::WriteAllText($OutputMarkdown, $content, [Text.UTF8Encoding]::new($false))

[PSCustomObject]@{
    RawRecords = $records.Count
    UniqueItems = $items.Count
    Adapted = ($items | Where-Object Status -eq '✅ Ayrıntılı').Count
    Output = $OutputMarkdown
}
