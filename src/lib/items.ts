import fs from "node:fs";
import path from "node:path";

export type ItemEntry = {
  id: string; slug: string; name: string; sourceSet: "League of Legends" | "TFT Set 17"; source: string; effect: string; rarity: string;
  classification: string; tags: string[]; category: "weapon" | "armor" | "consumable" | "passive"; mode: "active" | "passive";
  charges: number | "proficiency" | null; reset: "short" | "long" | "none";
};

const itemSources = [{ file: "LoL-16.15.1-Uyarlamalar.md", label: "League of Legends" as const }, { file: "TFT-Set17-Uyarlamalar.md", label: "TFT Set 17" as const }] as const;
const rarityNames = ["Basit", "Sıradışı", "Ender", "Çok Ender", "Efsanevi", "Mitik"];
function clean(value: string) { return value.replace(/<br\s*\/?\s*>/gi, " ").replace(/[`*_]/g, "").replace(/\s+/g, " ").trim(); }
function slugify(value: string) { return value.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, ""); }
function itemCategory(classification: string, effect: string): ItemEntry["category"] { const value = `${classification} ${effect}`.toLocaleLowerCase("tr-TR"); if (/tüketilebilir|tüketilir|consumable/.test(value)) return "consumable"; if (/silah|kılıç|yay|tabanca|arbalet/.test(value)) return "weapon"; if (/zırh|savunma|kalkan|miğfer/.test(value)) return "armor"; return "passive"; }
function itemMode(category: ItemEntry["category"], effect: string): ItemEntry["mode"] { const value = effect.toLocaleLowerCase("tr-TR"); return category === "consumable" || /aksiyon|tepki|başına (?:bir|uzmanlık)|isabetine|kullan:|harca/.test(value) ? "active" : "passive"; }
function itemCharges(category: ItemEntry["category"], effect: string): ItemEntry["charges"] { const value = effect.toLocaleLowerCase("tr-TR"); if (category === "consumable") return 1; if (value.includes("uzmanlık bonusun kadar")) return "proficiency"; if (/başına (?:yalnızca )?bir kez|başına bir/.test(value)) return 1; return null; }
function itemReset(effect: string): ItemEntry["reset"] { const value = effect.toLocaleLowerCase("tr-TR"); if (value.includes("kısa mola")) return "short"; if (value.includes("uzun mola") || value.includes("günde")) return "long"; return "none"; }

export function getItems(): ItemEntry[] {
  const directory = path.join(process.cwd(), "docs", "icerik", "itemler"); const entries: ItemEntry[] = [];
  for (const source of itemSources) {
    const lines = fs.readFileSync(path.join(directory, source.file), "utf8").split(/\r?\n/); let rarity = "Katalog";
    for (let index = 0; index < lines.length; index += 1) {
      if (/^##\s+/.test(lines[index]) && !/^###/.test(lines[index])) { const heading = clean(lines[index].replace(/^##\s+/, "")); if (rarityNames.some((name) => heading.includes(name))) rarity = heading.replace(/\s*\(\d+\)\s*$/, ""); }
      if (!/^###\s+/.test(lines[index])) continue;
      const name = clean(lines[index].replace(/^###\s+/, "")); const block: string[] = []; let cursor = index + 1;
      while (cursor < lines.length && !/^#{2,3}\s+/.test(lines[cursor])) { block.push(lines[cursor]); cursor += 1; }
      const joined = block.join("\n"); const id = joined.match(/\*\*(ITEM-[A-Za-z0-9-]+)(?:\s+—[^*]+)?\*\*/)?.[1]; if (!id) continue;
      const field = (label: string) => clean(joined.match(new RegExp(`^- \\*\\*${label}:\\*\\*\\s*(.+)$`, "m"))?.[1] ?? "");
      const effect = field("Etki"); const classification = field("Sınıf"); const category = itemCategory(classification, effect);
      entries.push({ id, slug: slugify(id), name, sourceSet: source.label, source: field("Kaynak"), effect, rarity, classification, tags: field("Etiketler").split(",").map((tag) => tag.trim()).filter(Boolean), category, mode: itemMode(category, effect), charges: itemCharges(category, effect), reset: itemReset(effect) });
      index = cursor - 1;
    }
  }
  return entries;
}

export function getItem(slug: string) { return getItems().find((item) => item.slug === slug); }
