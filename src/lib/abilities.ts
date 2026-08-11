import fs from "node:fs";
import path from "node:path";

export type AbilityEntry = {
  id: string;
  slug: string;
  name: string;
  group: string;
  sourceSet: "Temel Runeterra" | "League of Legends" | "TFT Set 17";
  source: string;
  tier: string;
  action: string;
  mode: "active" | "passive";
  cost: string;
  effect: string;
  classes: string;
};

const sources = [
  { file: "Temel-Runeterra-Yetenekleri.md", label: "Temel Runeterra" as const },
  { file: "LoL-16.15.1-Uyarlamalar.md", label: "League of Legends" as const },
  { file: "TFT-Set17-Uyarlamalar.md", label: "TFT Set 17" as const },
] as const;

function clean(value: string) { return value.replace(/[`*_]/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim(); }
function slugify(value: string) { return value.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, ""); }

export function getAbilities(): AbilityEntry[] {
  const directory = path.join(process.cwd(), "docs", "icerik", "yetenekler");
  const entries: AbilityEntry[] = [];
  for (const source of sources) {
    const lines = fs.readFileSync(path.join(directory, source.file), "utf8").split(/\r?\n/);
    let group: string = source.label;
    for (let index = 0; index < lines.length; index += 1) {
      if (/^##\s+/.test(lines[index]) && !/^###\s+/.test(lines[index])) group = clean(lines[index].replace(/^##\s+/, ""));
      if (!/^###\s+/.test(lines[index])) continue;
      const heading = clean(lines[index].replace(/^###\s+/, ""));
      const block: string[] = []; let cursor = index + 1;
      while (cursor < lines.length && !/^#{2,3}\s+/.test(lines[cursor])) { block.push(lines[cursor]); cursor += 1; }
      const joined = block.join("\n");
      const idMatch = joined.match(/\*\*(ABILITY-[A-Z0-9-]+)(?:\s+—\s+([^*]+))?\*\*/);
      if (!idMatch) continue;
      const field = (name: string) => clean(joined.match(new RegExp(`^- \\*\\*${name}:\\*\\*\\s*(.+)$`, "m"))?.[1] ?? "");
      const id = idMatch[1];
      const headingName = heading.includes(" — ") ? heading.split(" — ").slice(1).join(" — ") : heading;
      const name = clean(idMatch[2] ?? headingName);
      const action = field("Aksiyon");
      let resolvedGroup = group;
      if (source.label === "League of Legends" && group.startsWith("LoL")) resolvedGroup = field("Kaynak").split(",").at(-1)?.replace(/\s+(Pasif|Q|W|E|R)\.?$/, "")?.trim() || "Şampiyon Yeteneği";
      if (source.label === "TFT Set 17" && group.startsWith("TFT")) resolvedGroup = field("Kaynak").split(",")[1]?.trim() || "Birim Yeteneği";
      entries.push({ id, slug: slugify(id), name, group: resolvedGroup, sourceSet: source.label, source: field("Kaynak"), tier: field("Kademe"), action, mode: action.toLocaleLowerCase("tr-TR").startsWith("pasif") ? "passive" : "active", cost: field("Bedel"), effect: field("Etki"), classes: field("Uyumlu sınıflar") });
      index = cursor - 1;
    }
  }
  return entries;
}

export function getAbility(slug: string) { return getAbilities().find((entry) => entry.slug === slug); }
