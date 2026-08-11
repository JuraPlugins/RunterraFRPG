import fs from "node:fs";
import path from "node:path";

export type ClassFeature = { id: string; name: string; effect: string; level: number; specialization?: string; active: boolean; cooldown: "turn" | "short" | "long" | "none" };

const classConfig: Record<string, { heading: string; prefix: string; file: string; specializations: Record<string, string> }> = {
  savasci: { heading: "Savaşçı", prefix: "FIGHTER", file: "Savasci-4-20.md", specializations: { Öncü: "VANGUARD", "Silah Ustası": "WEAPON" } },
  duzenbaz: { heading: "Düzenbaz", prefix: "ROGUE", file: "Duzenbaz-4-20.md", specializations: { Gölge: "SHADOW", Silahşör: "GUNSLINGER" } },
  avci: { heading: "Avcı", prefix: "HUNTER", file: "Avci-4-20.md", specializations: { "Canavar Avcısı": "MONSTER", "Ruh Bağlı": "SPIRIT" } },
  buyucu: { heading: "Büyücü", prefix: "MAGE", file: "Buyucu-4-20.md", specializations: { Elementalist: "ELEMENT", "Rün Dokuyucu": "RUNE" } },
  ruhban: { heading: "Ruhban", prefix: "CLERIC", file: "Ruhban-4-20.md", specializations: { Koruyucu: "GUARDIAN", "Ruh Rehberi": "SPIRIT" } },
  mucit: { heading: "Mucit", prefix: "INVENTOR", file: "Mucit-4-20.md", specializations: { "Hextech Ustası": "HEXTECH", Kimyager: "CHEMIST" } },
};

function plain(value: string) { return value.replace(/[`*_#|]/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\s+/g, " ").trim(); }
function cooldown(effect: string): ClassFeature["cooldown"] { const lower = effect.toLocaleLowerCase("tr-TR"); if (lower.includes("kısa veya uzun mola") || lower.includes("kısa mola başına")) return "short"; if (lower.includes("uzun mola başına") || lower.includes("sonraki uzun mola")) return "long"; if (lower.includes("tur başına")) return "turn"; return "none"; }

// Yalnızca kendi başına kullanılabilen aksiyon, hızlı aksiyon veya tepkiler masaya gelir.
// Sürekli bonuslar ve başka bir özelliği güçlendiren tetikleyiciler pasif kalır.
const activeFeatureIds = new Set([
  "CLASS-FIGHTER-007", "CLASS-FIGHTER-015", "CLASS-FIGHTER-VANGUARD-014", "CLASS-FIGHTER-VANGUARD-018", "CLASS-FIGHTER-WEAPON-006",
  "CLASS-ROGUE-015", "CLASS-ROGUE-020", "CLASS-ROGUE-SHADOW-010", "CLASS-ROGUE-SHADOW-014", "CLASS-ROGUE-GUNSLINGER-006", "CLASS-ROGUE-GUNSLINGER-010", "CLASS-ROGUE-GUNSLINGER-014",
  "CLASS-HUNTER-017", "CLASS-HUNTER-MONSTER-006", "CLASS-HUNTER-MONSTER-018", "CLASS-HUNTER-SPIRIT-010", "CLASS-HUNTER-SPIRIT-014", "CLASS-HUNTER-SPIRIT-018",
  "CLASS-MAGE-007", "CLASS-MAGE-015", "CLASS-MAGE-020", "CLASS-MAGE-ELEMENT-018", "CLASS-MAGE-RUNE-010", "CLASS-MAGE-RUNE-014",
  "CLASS-CLERIC-007", "CLASS-CLERIC-013", "CLASS-CLERIC-015", "CLASS-CLERIC-020", "CLASS-CLERIC-GUARDIAN-010", "CLASS-CLERIC-GUARDIAN-018", "CLASS-CLERIC-SPIRIT-006", "CLASS-CLERIC-SPIRIT-010", "CLASS-CLERIC-SPIRIT-014",
  "CLASS-INVENTOR-007", "CLASS-INVENTOR-015", "CLASS-INVENTOR-HEXTECH-010", "CLASS-INVENTOR-HEXTECH-018", "CLASS-INVENTOR-CHEMIST-010", "CLASS-INVENTOR-CHEMIST-018",
]);

function baseFeatures(classId: string, heading: string): ClassFeature[] {
  const file = path.join(process.cwd(), "docs", "icerik", "Sınıflar.md");
  const content = fs.readFileSync(file, "utf8");
  const start = content.indexOf(`### ${heading}`); if (start < 0) return [];
  const next = content.indexOf("\n### ", start + 5); const section = content.slice(start, next < 0 ? content.length : next);
  const features: ClassFeature[] = [];
  const pattern = /####\s+(\d+)\. seviye\s+—\s+([^\n]+)\n([\s\S]*?)(?=\n####|$)/g;
  for (const match of section.matchAll(pattern)) {
    const level = Number(match[1]); const name = plain(match[2]); const body = plain(match[3]);
    const isResourceExplanation = classId === "savasci" && level === 1;
    features.push({ id: `CLASS-${classId.toUpperCase()}-BASE-${level}`, name, effect: body.slice(0, 1500), level, active: level <= 2 && !(classId === "buyucu" && level === 1) && !isResourceExplanation, cooldown: cooldown(body) });
  }
  return features;
}

export function getClassFeatures(classId: string): ClassFeature[] {
  const config = classConfig[classId]; if (!config) return [];
  const content = fs.readFileSync(path.join(process.cwd(), "docs", "icerik", "siniflar", config.file), "utf8");
  const features = baseFeatures(classId, config.heading);
  const pattern = /\*\*(CLASS-([A-Z]+)(?:-([A-Z]+))?-(\d{3}))\s+—\s+([^:*]+):\*\*\s*([^\n]+)/g;
  for (const match of content.matchAll(pattern)) {
    if (match[2] !== config.prefix) continue;
    const specializationCode = match[3]; const specialization = specializationCode ? Object.entries(config.specializations).find(([, code]) => code === specializationCode)?.[0] : undefined;
    const level = Number(match[4]); const effect = plain(match[6]);
    features.push({ id: match[1], name: plain(match[5]), effect, level, specialization, active: activeFeatureIds.has(match[1]), cooldown: cooldown(effect) });
  }
  return features.sort((a, b) => a.level - b.level || a.name.localeCompare(b.name, "tr"));
}
