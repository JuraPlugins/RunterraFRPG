"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Backpack, BookOpen, Check, ChevronRight, CircleDot, Clock3, Coins, Dices, Heart, Library, Minus, Moon, PackagePlus, Play, Plus, Radio, RotateCcw, ScrollText, Search, Shield, Sparkles, Sun, Swords, Trash2, TrendingUp, UserRound, WandSparkles, Zap } from "lucide-react";
import type { AbilityEntry } from "@/lib/abilities";
import type { ItemEntry } from "@/lib/items";
import type { ClassFeature } from "@/lib/class-features";
import { classActionEffect, classActions } from "@/lib/class-actions";
import { abilityKeys, abilityLabels, classes, classPowerModifier, classResourceCapacity, mageSlots, modifier, proficiency, type AbilityKey } from "@/lib/character-data";
import { abilityTier, advancementLevels, progression, skillBranches, tierFromText } from "@/lib/progression";
import { newCharacterId, upsertCharacterSlot } from "@/lib/character-storage";
import { cantripEffect, cantrips } from "@/lib/cantrips";
import { ancestryAbilityKeywords, patronDisplayName, patronDomains, patronSources } from "@/lib/patrons";

type CharacterRecord = {
  id: string;
  name: string; concept: string; level: number; classId: string; specialization: string; ancestry: string; region: string;
  abilities: Record<AbilityKey, number>; classSkills: string[]; cantrips: string[]; regionSkill: string; regionGift: string; pack: string;
  patronId?: string; patronName?: string; patronDomain?: string; patronBond?: string;
  aspects: { identity: string; region: string; conflict: string };
};
type InventoryEntry = { id: string; quantity: number; equipped: boolean; bound: boolean };
type Cooldown = "turn" | "short" | "long";
type LevelSnapshot = { level: number; abilities: Record<AbilityKey, number>; currentHp: number; maxHpValue: number; resource: number; spellSlots: number[]; asiLevels: number[] };
type RuntimeState = {
  currentHp: number; tempHp: number; rp: number; resource: number; spellSlots: number[]; conditions: string[];
  deathSuccess: number; deathFail: number; inventory: InventoryEntry[]; unlocked: string[]; prepared: string[]; asiLevels: number[];
  cooldowns: Record<string, Cooldown>; inCombat: boolean; round: number; turn: number; actionLog: string[];
  notes: string; quest: string; gold: number; rolls: string[]; loadoutMigrated: boolean; maxHpValue: number; levelHistory: LevelSnapshot[]; itemUses: Record<string, number>;
};
type ActionSource = { id: string; name: string; effect: string; kind: "Yetenek" | "Cantrip" | "Sınıf" | "Soy" | "Eşya"; cost?: string; tier?: string; cooldown?: Cooldown | "none"; item?: ItemEntry };

const fallbackAbilities = { guc: 8, ceviklik: 8, dayaniklilik: 8, zeka: 8, sezgi: 8, karizma: 8 };
const defaultCharacter: CharacterRecord = { id: "", name: "", concept: "", level: 1, classId: "", specialization: "", ancestry: "", region: "", abilities: fallbackAbilities, classSkills: [], cantrips: [], regionSkill: "", regionGift: "", pack: "Gezgin", patronId: "", patronName: "", patronDomain: "", patronBond: "", aspects: { identity: "", region: "", conflict: "" } };
const statusOptions = ["Kör", "Büyülenmiş", "Sağır", "Korkmuş", "Yere Düşmüş", "Tutulmuş", "Sersemlemiş", "Zehirlenmiş", "Görünmez", "Bitkin"];
const tabs = [
  { id: "masa", label: "Masa", icon: Swords },
  { id: "kazanimlar", label: "Kazanımlar", icon: Library },
  { id: "agac", label: "Yetenek Ağacı", icon: WandSparkles },
  { id: "envanter", label: "Envanter", icon: Backpack },
  { id: "ilerleme", label: "İlerleme", icon: TrendingUp },
  { id: "notlar", label: "Notlar", icon: BookOpen },
] as const;

function signed(value: number) { return value >= 0 ? `+${value}` : String(value); }
function randomDie(size: number) { return Math.floor(Math.random() * size) + 1; }
function cooldownLabel(value?: Cooldown | "none") { return value === "turn" ? "Tur" : value === "short" ? "Kısa mola" : value === "long" ? "Uzun mola" : "Yok"; }
function inferCooldown(text: string): Cooldown | "none" {
  const value = text.toLocaleLowerCase("tr-TR");

  if (value.includes("kısa mola") || value.includes("kısa veya uzun")) return "short";
  if (value.includes("uzun mola") || value.includes("günde bir")) return "long";
  if (value.includes("tur başına") || value.includes("sonraki tur")) return "turn";
  return "none";
}

export function CharacterDashboard({ abilities, items, classFeatures }: { abilities: AbilityEntry[]; items: ItemEntry[]; classFeatures: Record<string, ClassFeature[]> }) {
  const [character, setCharacter] = useState<CharacterRecord>(defaultCharacter);
  const [runtime, setRuntime] = useState<RuntimeState | null>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("masa");
  const [itemSearch, setItemSearch] = useState("");
  const [abilitySearch, setAbilitySearch] = useState("");
  const [allAbilitySearch, setAllAbilitySearch] = useState("");
  const [abilitySource, setAbilitySource] = useState<"all" | AbilityEntry["sourceSet"]>("all");
  const [lastUse, setLastUse] = useState<{ id: string; name: string; result: string } | null>(null);
  const [levelDraft, setLevelDraft] = useState<{ hpMode: "average" | "roll"; advancement: "asi" | "ability"; bonuses: AbilityKey[] } | null>(null);
  const [levelNotice, setLevelNotice] = useState<{ level: number; features: string[]; choice: boolean } | null>(null);
  const [roomCode, setRoomCode] = useState("");
  const [roomState, setRoomState] = useState<any>(null);
  const [sessionReady, setSessionReady] = useState(false);
  const lastSessionPush = useRef(0);

  const selectedClass = classes.find((entry) => entry.id === character.classId);
  const selectedPatron = patronSources.find((entry) => entry.id === character.patronId);
  const selectedPatronDomain = patronDomains.find((entry) => entry.id === character.patronDomain);
  const faithName = patronDisplayName(character.patronId, character.patronName);
  const prof = proficiency(character.level);
  const conMod = modifier(character.abilities.dayaniklilik);
  const dexMod = modifier(character.abilities.ceviklik);
  const calculatedMaxHp = selectedClass ? selectedClass.hpBase + conMod + Math.max(0, character.level - 1) * Math.max(1, selectedClass.hpPerLevel + conMod) : 1;
  const maxHp = runtime?.maxHpValue ?? calculatedMaxHp;
  const defense = selectedClass ? selectedClass.defense === "medium-shield" ? 15 + Math.min(2, dexMod) : selectedClass.defense === "medium" ? 13 + Math.min(2, dexMod) : selectedClass.defense === "light" ? 11 + dexMod : selectedClass.defense === "unarmored-wis" ? 10 + dexMod + modifier(character.abilities.sezgi) : selectedClass.defense === "barbarian" ? Math.max(13 + Math.min(2, dexMod), 10 + dexMod + conMod) : 10 + dexMod : 10 + dexMod;
  const powerMod = selectedClass ? classPowerModifier(selectedClass.id, character.abilities) : 0;
  const powerDc = 8 + prof + powerMod;
  const resourceMax = selectedClass ? classResourceCapacity(selectedClass.id, selectedClass.resourceBase, character.level) : 0;
  const slotsMax = mageSlots[character.level - 1] ?? mageSlots[0];

  useEffect(() => {
    const saved = window.localStorage.getItem("runeterra-frp-character");
    if (!saved) { setReady(true); return; }
    try {
      const loaded = { ...defaultCharacter, ...JSON.parse(saved) } as CharacterRecord; loaded.id ||= newCharacterId();
      setCharacter(loaded);
      const chosen = classes.find((entry) => entry.id === loaded.classId);
      const loadedCon = modifier(loaded.abilities?.dayaniklilik ?? 8);
      const loadedMax = chosen ? chosen.hpBase + loadedCon + Math.max(0, loaded.level - 1) * Math.max(1, chosen.hpPerLevel + loadedCon) : 1;
      const stored = window.localStorage.getItem("runeterra-frp-runtime");
      const old = stored ? JSON.parse(stored) : {};
      const base: RuntimeState = { currentHp: loadedMax, tempHp: 0, rp: 2, resource: chosen ? classResourceCapacity(chosen.id, chosen.resourceBase, loaded.level) : 0, spellSlots: [...mageSlots[loaded.level - 1]], conditions: [], deathSuccess: 0, deathFail: 0, inventory: [], unlocked: [], prepared: [], asiLevels: [], cooldowns: {}, inCombat: false, round: 1, turn: 1, actionLog: [], notes: "", quest: "", gold: 15, rolls: [], loadoutMigrated: true, maxHpValue: loadedMax, levelHistory: [], itemUses: {} };
      const migratedPrepared = old.loadoutMigrated ? (old.prepared ?? []) : (old.prepared?.length ? old.prepared : (old.unlocked ?? []).slice(0, 8));
      setRuntime({ ...base, ...old, prepared: migratedPrepared, loadoutMigrated: true, maxHpValue: old.maxHpValue ?? loadedMax, levelHistory: old.levelHistory ?? [], itemUses: old.itemUses ?? {}, cooldowns: old.cooldowns ?? {}, actionLog: old.actionLog ?? [], round: old.round ?? 1, turn: old.turn ?? 1 });
    } catch { setCharacter(defaultCharacter); }
    setReady(true);
  }, []);
  useEffect(() => { if (ready && runtime) { window.localStorage.setItem("runeterra-frp-runtime", JSON.stringify(runtime)); if (character.name) upsertCharacterSlot(character as unknown as Record<string, unknown>, runtime as unknown as Record<string, unknown>); } }, [runtime, ready, character]);
  useEffect(() => { if (ready && character.name) { window.localStorage.setItem("runeterra-frp-character", JSON.stringify(character)); upsertCharacterSlot(character as unknown as Record<string, unknown>, runtime as unknown as Record<string, unknown> | null); } }, [character, runtime, ready]);
  useEffect(() => { if (!lastUse) return; const timer = window.setTimeout(() => setLastUse(null), 5200); return () => window.clearTimeout(timer); }, [lastUse]);
  useEffect(() => { setRoomCode(new URLSearchParams(window.location.search).get("room") ?? ""); }, []);
  useEffect(() => {
    if (!roomCode || !ready || !character.id) return;
    let active = true;
    async function pullRoom() { try { const response = await fetch(`/api/rooms/${roomCode}`, { cache: "no-store" }); if (!response.ok) return; const body = await response.json(); if (!active || !body.joined) return; setRoomState(body); const self = body.members?.find((entry: any) => entry.userId === body.user.id); if (self?.runtimeData && Date.now() - lastSessionPush.current > 1200) setRuntime((current) => JSON.stringify(current) === JSON.stringify(self.runtimeData) ? current : { ...current!, ...self.runtimeData }); setSessionReady(true); } catch {} }
    pullRoom(); const timer = window.setInterval(pullRoom, 2500); return () => { active = false; window.clearInterval(timer); };
  }, [roomCode, ready, character.id]);
  useEffect(() => {
    if (!roomCode || !sessionReady || !ready || !runtime || !character.name) return;
    const timer = window.setTimeout(async () => { lastSessionPush.current = Date.now(); try { await fetch(`/api/rooms/${roomCode}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "sync-self", payload: { character, runtime } }) }); } catch {} }, 350); return () => window.clearTimeout(timer);
  }, [roomCode, sessionReady, ready, runtime, character]);

  const choiceSlots = advancementLevels.filter((level) => level <= character.level).length;
  const choicesUsed = (runtime?.unlocked.length ?? 0) + (runtime?.asiLevels.length ?? 0);
  const currentTier = abilityTier(character.level);
const branchAbilities = useMemo(() => {
    const branches = skillBranches[character.classId] ?? [];
    const search = abilitySearch.trim().toLocaleLowerCase("tr-TR");
    const className = selectedClass?.name.toLocaleLowerCase("tr-TR") ?? "";
    const ancestryKeywords = ancestryAbilityKeywords[character.ancestry] ?? [];
    const domainKeywords = patronDomains.find((domain) => domain.id === character.patronDomain)?.keywords ?? [];
    return branches.map((branch) => {
      const scored = abilities.map((ability) => {
        const text = `${ability.name} ${ability.effect} ${ability.action} ${ability.group}`.toLocaleLowerCase("tr-TR");
        const compatibleClasses = ability.classes.split(",").map((name) => name.trim().replace(/\.$/, "").toLocaleLowerCase("tr-TR"));
        const classCompatible = compatibleClasses.includes(className);
        const branchHits = branch.keywords.reduce((total, keyword) => total + (text.includes(keyword) ? 1 : 0), 0);
        const ancestryHits = ancestryKeywords.reduce((total, keyword) => total + (text.includes(keyword) ? 1 : 0), 0);
        const domainHits = domainKeywords.reduce((total, keyword) => total + (text.includes(keyword) ? 1 : 0), 0);
        return { ability, score: branchHits * 4 + ancestryHits + domainHits * 2, text, classCompatible, branchHits };
      }).filter(({ classCompatible, branchHits, text }) => classCompatible && branchHits > 0 && (!search || text.includes(search))).sort((a, b) => b.score - a.score || tierFromText(a.ability.tier) - tierFromText(b.ability.tier));
      return { ...branch, abilities: [1, 2, 3, 4].flatMap((tier) => scored.filter((entry) => tierFromText(entry.ability.tier) === tier).slice(0, 4).map((entry) => entry.ability)) };
    });
  }, [abilities, abilitySearch, character.classId, character.ancestry, character.patronDomain, selectedClass?.name]);
  const filteredItems = useMemo(() => { const search = itemSearch.trim().toLocaleLowerCase("tr-TR"); return items.filter((item) => !search || `${item.name} ${item.effect} ${item.id}`.toLocaleLowerCase("tr-TR").includes(search)).slice(0, 60); }, [items, itemSearch]);
  const allAbilityResults = useMemo(() => { const search = allAbilitySearch.trim().toLocaleLowerCase("tr-TR"); return abilities.filter((ability) => (abilitySource === "all" || ability.sourceSet === abilitySource) && (!search || `${ability.name} ${ability.effect} ${ability.group} ${ability.id}`.toLocaleLowerCase("tr-TR").includes(search))).sort((a, b) => a.name.localeCompare(b.name, "tr")).slice(0, 100); }, [abilities, allAbilitySearch, abilitySource]);

  if (!ready) return <div className="dashboard-loading shell">Karakter kaydı açılıyor…</div>;
  if (!character.name || !selectedClass || !runtime) return <section className="empty-state shell"><ScrollText size={46} /><p className="eyebrow">Önce bir kahraman gerek</p><h1>Masa paneli için karakter oluştur.</h1><p>Kayıt tamamlandığında CP, kaynak, yetenek ve envanter yönetimi burada açılır.</p><Link className="button button-primary" href="/karakter">Karakter oluştur</Link></section>;

  const activeRuntime = runtime;
  const activeClass = selectedClass;
  const ownedFeatures = (classFeatures[character.classId] ?? []).filter((feature) => feature.level <= character.level && (!feature.specialization || feature.specialization === character.specialization));
  const learnedAbilities = abilities.filter((ability) => activeRuntime.unlocked.includes(ability.id));
  const preparedAbilities = learnedAbilities.filter((ability) => ability.mode === "active" && activeRuntime.prepared.includes(ability.id));
  const equippedItems = activeRuntime.inventory.filter((entry) => entry.equipped).map((entry) => ({ entry, item: items.find((item) => item.id === entry.id) })).filter((value): value is { entry: InventoryEntry; item: ItemEntry } => Boolean(value.item));
  const activeFeatures = ownedFeatures.filter((feature) => feature.active);
  const availableClassActions = classActions.filter((action) => action.classId === character.classId && action.level <= character.level && (!action.specialization || action.specialization === character.specialization));

  function setRun<K extends keyof RuntimeState>(key: K, value: RuntimeState[K]) { setRuntime((current) => current ? { ...current, [key]: value } : current); }
  function adjust(key: "currentHp" | "tempHp" | "rp" | "resource" | "gold", delta: number, min = 0, max = Infinity) { setRun(key, Math.max(min, Math.min(max, activeRuntime[key] + delta))); }
  function toggleCondition(condition: string) { setRun("conditions", activeRuntime.conditions.includes(condition) ? activeRuntime.conditions.filter((entry) => entry !== condition) : [...activeRuntime.conditions, condition]); }
  function roll(die: number) { const value = randomDie(die); setRun("rolls", [`d${die} → ${value}`, ...activeRuntime.rolls].slice(0, 8)); }
  function clearCooldowns(types: Cooldown[]) { setRun("cooldowns", Object.fromEntries(Object.entries(activeRuntime.cooldowns).filter(([, type]) => !types.includes(type)))); }
  function rest(long: boolean) {
    if (long) setRuntime({ ...activeRuntime, currentHp: maxHp, tempHp: 0, resource: resourceMax, spellSlots: [...slotsMax], rp: Math.max(2, activeRuntime.rp), deathSuccess: 0, deathFail: 0, cooldowns: {}, itemUses: {}, inCombat: false, round: 1, turn: 1 });
    else { const nextResource = ["savasci", "dovus-ustasi", "antlasmali"].includes(character.classId) ? resourceMax : ["avci", "ruhban", "yeminli", "ozan", "sekil-degistirici", "cagirici", "barbar"].includes(character.classId) ? Math.min(resourceMax, activeRuntime.resource + 1) : activeRuntime.resource; const nextItemUses = Object.fromEntries(Object.entries(activeRuntime.itemUses).filter(([id]) => items.find((item) => item.id === id)?.reset !== "short")); setRuntime({ ...activeRuntime, resource: nextResource, itemUses: nextItemUses, cooldowns: Object.fromEntries(Object.entries(activeRuntime.cooldowns).filter(([, type]) => type === "long")) }); }
  }
  function toggleCombat() { setRuntime({ ...activeRuntime, inCombat: !activeRuntime.inCombat, round: 1, turn: 1, cooldowns: Object.fromEntries(Object.entries(activeRuntime.cooldowns).filter(([, type]) => type !== "turn")) }); }
  function endTurn() { setRuntime({ ...activeRuntime, turn: activeRuntime.turn + 1, round: activeRuntime.round + 1, cooldowns: Object.fromEntries(Object.entries(activeRuntime.cooldowns).filter(([, type]) => type !== "turn")) }); }
  function levelUp() { if (character.level < 20) setLevelDraft({ hpMode: "average", advancement: "asi", bonuses: [] }); }
  function chooseLevelBonus(key: AbilityKey) { if (!levelDraft || levelDraft.advancement !== "asi") return; const used = levelDraft.bonuses.filter((entry) => entry === key).length; if (levelDraft.bonuses.length >= 2 || character.abilities[key] + used >= 20) return; setLevelDraft({ ...levelDraft, bonuses: [...levelDraft.bonuses, key] }); }
  function confirmLevelUp() {
    if (!levelDraft || character.level >= 20) return;
    const next = character.level + 1; const grantsAsi = advancementLevels.includes(next);
    if (grantsAsi && levelDraft.advancement === "asi" && levelDraft.bonuses.length !== 2) return;
    const nextAbilities = { ...character.abilities };
    for (const key of levelDraft.bonuses) nextAbilities[key] = Math.min(20, nextAbilities[key] + 1);
    const nextCon = modifier(nextAbilities.dayaniklilik); const conDifference = nextCon - conMod;
    const hpDie = levelDraft.hpMode === "average" ? activeClass.hpPerLevel : randomDie(activeClass.hitDie);
    const hpGain = Math.max(1, hpDie + nextCon) + conDifference * (next - 1);
    const nextResourceMax = classResourceCapacity(activeClass.id, activeClass.resourceBase, next);
    const usedSlots = slotsMax.map((maximum, index) => Math.max(0, maximum - (activeRuntime.spellSlots[index] ?? 0)));
    const nextSlots = mageSlots[next - 1].map((maximum, index) => Math.max(0, maximum - (usedSlots[index] ?? 0)));
    const snapshot: LevelSnapshot = { level: character.level, abilities: { ...character.abilities }, currentHp: activeRuntime.currentHp, maxHpValue: maxHp, resource: activeRuntime.resource, spellSlots: [...activeRuntime.spellSlots], asiLevels: [...activeRuntime.asiLevels] };
    const featureNames = (classFeatures[character.classId] ?? []).filter((feature) => feature.level === next && (!feature.specialization || feature.specialization === character.specialization)).map((feature) => feature.name);
    const progressionName = progression[character.classId]?.[next - 1]; if (progressionName && !featureNames.includes(progressionName)) featureNames.unshift(progressionName);
    setCharacter({ ...character, level: next, abilities: nextAbilities });
    setRuntime({ ...activeRuntime, currentHp: activeRuntime.currentHp + hpGain, maxHpValue: maxHp + hpGain, resource: Math.min(nextResourceMax, activeRuntime.resource), spellSlots: [...nextSlots], asiLevels: grantsAsi && levelDraft.advancement === "asi" ? [...activeRuntime.asiLevels, next] : activeRuntime.asiLevels, levelHistory: [...activeRuntime.levelHistory, snapshot] });
    setLevelDraft(null); setLevelNotice({ level: next, features: featureNames, choice: (grantsAsi && levelDraft.advancement === "ability") || activeClass.id === "buyucu" });
  }
  function undoLevelUp() { const snapshot = activeRuntime.levelHistory.at(-1); if (!snapshot) return; setCharacter({ ...character, level: snapshot.level, abilities: { ...snapshot.abilities }, specialization: snapshot.level < 3 ? "" : character.specialization }); setRuntime({ ...activeRuntime, currentHp: snapshot.currentHp, maxHpValue: snapshot.maxHpValue, resource: snapshot.resource, spellSlots: [...snapshot.spellSlots], asiLevels: [...snapshot.asiLevels], levelHistory: activeRuntime.levelHistory.slice(0, -1) }); }
  function unlock(ability: AbilityEntry) { const has = activeRuntime.unlocked.includes(ability.id); if (has) setRuntime({ ...activeRuntime, unlocked: activeRuntime.unlocked.filter((id) => id !== ability.id), prepared: activeRuntime.prepared.filter((id) => id !== ability.id) }); else if (choicesUsed < choiceSlots && tierFromText(ability.tier) <= currentTier) setRuntime({ ...activeRuntime, unlocked: [...activeRuntime.unlocked, ability.id], prepared: ability.mode === "active" && activeRuntime.prepared.length < 8 ? [...activeRuntime.prepared, ability.id] : activeRuntime.prepared }); }
  function gmToggleAbility(ability: AbilityEntry) { const has = activeRuntime.unlocked.includes(ability.id); if (has) setRuntime({ ...activeRuntime, unlocked: activeRuntime.unlocked.filter((id) => id !== ability.id), prepared: activeRuntime.prepared.filter((id) => id !== ability.id) }); else setRuntime({ ...activeRuntime, unlocked: [...activeRuntime.unlocked, ability.id], prepared: ability.mode === "active" && activeRuntime.prepared.length < 8 ? [...activeRuntime.prepared, ability.id] : activeRuntime.prepared }); }
  function togglePrepared(id: string) { if (abilities.find((ability) => ability.id === id)?.mode !== "active") return; if (activeRuntime.prepared.includes(id)) setRun("prepared", activeRuntime.prepared.filter((entry) => entry !== id)); else if (activeRuntime.prepared.length < 8) setRun("prepared", [...activeRuntime.prepared, id]); }
  function addItem(id: string) { const found = activeRuntime.inventory.find((entry) => entry.id === id); setRun("inventory", found ? activeRuntime.inventory.map((entry) => entry.id === id ? { ...entry, quantity: entry.quantity + 1 } : entry) : [...activeRuntime.inventory, { id, quantity: 1, equipped: false, bound: false }]); }
  function changeItem(id: string, patch: Partial<InventoryEntry>) { setRun("inventory", activeRuntime.inventory.map((entry) => entry.id === id ? { ...entry, ...patch } : entry)); }
  function effectRoll(effect: string) {
    const parts: string[] = [];
    if (/saldırı|isabet|vur(?:uş|u)/i.test(effect)) { const die = randomDie(20); parts.push(`Saldırı ${die} ${signed(prof + powerMod)} = ${die + prof + powerMod}`); }
    const matches = [...effect.matchAll(/(\d+)d(\d+)/gi)].slice(0, 4);
    for (const match of matches) { const count = Number(match[1]); const size = Number(match[2]); const dice = Array.from({ length: Math.min(count, 12) }, () => randomDie(size)); parts.push(`${match[0]}: ${dice.join("+")} = ${dice.reduce((a, b) => a + b, 0)}`); }
    if (!parts.length) parts.push("Etki etkinleştirildi; hedef ve sonuç anlatıya göre uygulanır.");
    return parts.join(" · ");
  }
  function useAction(action: ActionSource) {
    if (activeRuntime.cooldowns[action.id]) return;
    const text = `${action.cost ?? ""} ${action.effect}`.toLocaleLowerCase("tr-TR");
    let nextResource = activeRuntime.resource; let nextSlots = [...activeRuntime.spellSlots];
    let nextInventory = [...activeRuntime.inventory]; const nextItemUses = { ...activeRuntime.itemUses };
    if (action.item) {
      const owned = nextInventory.find((entry) => entry.id === action.item?.id);
      if (!owned) { setLastUse({ id: `${action.id}-fail-${Date.now()}`, name: action.name, result: "Eşya artık envanterde değil." }); return; }
      if (action.item.category === "consumable") nextInventory = owned.quantity <= 1 ? nextInventory.filter((entry) => entry.id !== action.id) : nextInventory.map((entry) => entry.id === action.id ? { ...entry, quantity: entry.quantity - 1 } : entry);
      else if (action.item.charges !== null) { const maximum = action.item.charges === "proficiency" ? prof : action.item.charges; const used = nextItemUses[action.id] ?? 0; if (used >= maximum) { setLastUse({ id: `${action.id}-fail-${Date.now()}`, name: action.name, result: "Eşyanın kullanım hakkı kalmadı." }); return; } nextItemUses[action.id] = used + 1; }
    }
    if (action.kind === "Yetenek" && character.classId === "buyucu") {
      const minimum = Math.max(0, tierFromText(action.tier ?? "1") - 1); const slot = nextSlots.findIndex((value, index) => index >= minimum && value > 0);
      if (slot < 0) { setLastUse({ id: `${action.id}-fail-${Date.now()}`, name: action.name, result: "Uygun büyü yuvası yok." }); return; }
      nextSlots[slot] -= 1;
    } else if (/sınıf kaynağı|efor|momentum|odak|lütuf|yük|ritim|azim|ilham|mühür|vahşet|komuta|öfke/.test(text)) {
      const count = Number(text.match(/(\d+)\s*(?:sınıf kaynağı|efor|momentum|odak|lütuf|yük|ritim|azim|ilham|mühür|vahşet|komuta|öfke)/)?.[1] ?? 1);
      if (nextResource < count) { setLastUse({ id: `${action.id}-fail-${Date.now()}`, name: action.name, result: `${activeClass.resource} yetersiz.` }); return; }
      nextResource -= count;
    }
    const cd = action.cooldown && action.cooldown !== "none" ? action.cooldown : inferCooldown(`${action.cost ?? ""} ${action.effect}`);
    const result = effectRoll(action.effect);
    setRuntime({ ...activeRuntime, resource: nextResource, spellSlots: nextSlots, inventory: nextInventory, itemUses: nextItemUses, cooldowns: cd === "none" ? activeRuntime.cooldowns : { ...activeRuntime.cooldowns, [action.id]: cd }, rolls: [`${action.name} → ${result}`, ...activeRuntime.rolls].slice(0, 8), actionLog: [`${action.name}: ${result}`, ...activeRuntime.actionLog].slice(0, 20) });
    setLastUse({ id: `${action.id}-${Date.now()}`, name: action.name, result });
  }

  const boundCount = activeRuntime.inventory.filter((entry) => entry.bound).length;
  const nextFeature = character.level < 20 ? progression[character.classId]?.[character.level] : "Zirveye ulaşıldı";
  const actions: ActionSource[] = [
    ...availableClassActions.map((action) => ({ id: action.id, name: action.name, effect: classActionEffect(action, character.level), kind: "Sınıf" as const, cost: action.cost, cooldown: action.cooldown ?? "none" })),
    ...(character.ancestry === "havari" ? [{ id: "ancestry-havari-askin-yanki", name: "Aşkın Yankı", effect: `${faithName} kaynağının ${selectedPatronDomain?.name ?? "seçili"} alanıyla doğrudan ilgili bir Büyü Bilgisi veya İnanç ve Ruhlar kontrolünde avantaj kazan.`, kind: "Soy" as const, cost: "Uzun mola başına 1", cooldown: "long" as const }] : []),
    ...(character.classId === "buyucu" ? (character.cantrips ?? []).flatMap((id): ActionSource[] => { const cantrip = cantrips.find((entry) => entry.id === id); return cantrip ? [{ id: cantrip.id, name: cantrip.name, effect: cantripEffect(cantrip.id, character.level), kind: "Cantrip", cost: "Yuva harcamaz", cooldown: "none" }] : []; }) : []),
    ...preparedAbilities.map((ability) => ({ id: ability.id, name: ability.name, effect: ability.effect, kind: "Yetenek" as const, cost: ability.cost, tier: ability.tier, cooldown: inferCooldown(`${ability.cost} ${ability.effect}`) })),
    ...activeFeatures.map((feature) => ({ id: feature.id, name: feature.name, effect: feature.effect, kind: "Sınıf" as const, cooldown: feature.cooldown })),
    ...equippedItems.filter(({ item }) => item.mode === "active").map(({ entry, item }) => { const maximum = item.charges === "proficiency" ? prof : item.charges; const remaining = maximum === null ? null : Math.max(0, maximum - (activeRuntime.itemUses[item.id] ?? 0)); return { id: item.id, name: item.name, effect: item.effect, kind: "Eşya" as const, item, cost: item.category === "consumable" ? `${entry.quantity} adet` : remaining === null ? "Eşya etkisi" : `${remaining}/${maximum} kullanım`, cooldown: "none" as const }; }),
  ];

  return (
    <div className="dashboard-page shell">
      {lastUse && <div className="action-result" key={lastUse.id}><div className="result-rune"><Dices size={25} /></div><div><small>Kullanıldı</small><strong>{lastUse.name}</strong><p>{lastUse.result}</p></div></div>}
      {levelDraft && <div className="level-modal-backdrop"><section className="level-modal"><p className="eyebrow">Seviye {character.level + 1}</p><h2>Seviye Atlama</h2><div className="level-choice-block"><h3>Yeni Can Puanı</h3><div className="hp-choice"><button className={levelDraft.hpMode === "average" ? "active" : ""} onClick={() => setLevelDraft({ ...levelDraft, hpMode: "average" })}><b>Ortalama</b><span>{activeClass.hpPerLevel} + DAY</span></button><button className={levelDraft.hpMode === "roll" ? "active" : ""} onClick={() => setLevelDraft({ ...levelDraft, hpMode: "roll" })}><b>Zar At</b><span>d{activeClass.hitDie} + DAY</span></button></div></div>{advancementLevels.includes(character.level + 1) && <div className="level-choice-block"><h3>{levelDraft.advancement === "asi" ? "Yetenek Puanları" : "İmza Yeteneği Seçimi"} <small>{levelDraft.advancement === "asi" ? `${levelDraft.bonuses.length}/2` : "Ağaçtan seçilecek"}</small></h3><p>Bu seviyede iki yetenek puanı veya bir İmza Yeteneği seç.</p><div className="hp-choice advancement-choice"><button className={levelDraft.advancement === "asi" ? "active" : ""} onClick={() => setLevelDraft({ ...levelDraft, advancement: "asi", bonuses: [] })}><b>+2 Yetenek Puanı</b><span>Bir veya iki yeteneğe dağıt</span></button><button className={levelDraft.advancement === "ability" ? "active" : ""} onClick={() => setLevelDraft({ ...levelDraft, advancement: "ability", bonuses: [] })}><b>İmza Yeteneği</b><span>Onaydan sonra ağaçtan seç</span></button></div><div className="asi-picker">{abilityKeys.map((key) => { const added = levelDraft.bonuses.filter((entry) => entry === key).length; return <button disabled={levelDraft.advancement !== "asi" || character.abilities[key] + added >= 20 || levelDraft.bonuses.length >= 2} onClick={() => chooseLevelBonus(key)} key={key}><span>{abilityLabels[key]}</span><b>{character.abilities[key]}{added ? ` +${added}` : ""}</b></button>; })}</div>{levelDraft.bonuses.length > 0 && <button className="clear-asi" onClick={() => setLevelDraft({ ...levelDraft, bonuses: [] })}>Seçimi temizle</button>}</div>}<div className="level-preview"><small>Açılacak kazanım</small><b>{progression[character.classId]?.[character.level] || "Yeni seviye"}</b></div><footer><button className="button button-ghost" onClick={() => setLevelDraft(null)}>Vazgeç</button><button className="button button-primary" disabled={advancementLevels.includes(character.level + 1) && levelDraft.advancement === "asi" && levelDraft.bonuses.length !== 2} onClick={confirmLevelUp}><TrendingUp size={16} /> Onayla</button></footer></section></div>}
      {levelNotice && <div className="level-modal-backdrop"><section className="level-modal level-earned"><Sparkles size={34} /><p className="eyebrow">Seviye {levelNotice.level} kazanıldı</p><h2>Yeni Güçler Açıldı</h2><div>{levelNotice.features.map((feature) => <p key={feature}><Check size={13} /> {feature}</p>)}</div><footer><button className="button button-ghost" onClick={() => setLevelNotice(null)}>Kapat</button>{levelNotice.choice && <button className="button button-primary" onClick={() => { setLevelNotice(null); setTab("agac"); }}><WandSparkles size={16} /> Yetenek seç</button>}</footer></section></div>}
      <header className="dashboard-hero"><div className="dashboard-identity">{roomState?.members?.find((entry:any)=>entry.userId===roomState.user.id)?.avatarUrl ? <img src={roomState.members.find((entry:any)=>entry.userId===roomState.user.id).avatarUrl} alt="" /> : <UserRound />}</div><div><p className="eyebrow">Aktif karakter · Seviye {character.level}</p><h1>{character.name}</h1><p>{character.concept || `${activeClass.name} · ${character.specialization || "Uzmanlık bekleniyor"}`}</p></div><div className="dashboard-hero-actions"><Link className="button button-ghost" href="/karakterler">Karakterlerim</Link><button className="button button-ghost" onClick={endTurn}><RotateCcw size={16} /> Turu Bitir</button><button className="button button-ghost" onClick={() => rest(false)}><Sun size={16} /> Kısa mola</button><button className="button button-primary" onClick={() => rest(true)}><Moon size={16} /> Uzun mola</button></div></header>
      {roomCode && <section className="session-table-dock"><div><Radio /><span><b>{roomState?.room?.name || "Session odası"}</b><small>{sessionReady ? "Canlı senkronizasyon açık" : "Odaya bağlanıyor…"}</small></span></div><div className="dock-npcs">{(roomState?.npcs || []).slice(0,3).map((npc:any)=><span key={npc.id}><b>{npc.name}</b><small>{npc.hp}/{npc.maxHp} CP</small></span>)}</div>{roomState?.media?.[0] && <a href={roomState.media[0].url} target="_blank"><img src={roomState.media[0].url} alt={roomState.media[0].title}/><span>GM görselini aç</span></a>}<Link href={`/oda/${roomCode}`}>Oda ekranı</Link></section>}
      <nav className="dashboard-tabs">{tabs.map((entry) => { const Icon = entry.icon; return <button className={tab === entry.id ? "active" : ""} onClick={() => setTab(entry.id)} key={entry.id}><Icon size={16} /> {entry.label}</button>; })}</nav>

      {tab === "masa" && <div className="table-layout"><main className="table-main">
        {character.classId === "buyucu" && (character.cantrips?.length ?? 0) !== 3 && <div className="cantrip-alert"><div><b>Cantrip seçimi eksik</b><p>Büyücünün aktif büyü çubuğu için üç cantrip seçmelisin.</p></div><Link className="button button-primary" href="/karakter?step=class">Cantripleri seç</Link></div>}
        <section className="vital-grid"><Tracker icon={Heart} label="Can Puanı" value={activeRuntime.currentHp} suffix={`/ ${maxHp}`} onMinus={() => adjust("currentHp", -1, 0, maxHp)} onPlus={() => adjust("currentHp", 1, 0, maxHp)} danger={activeRuntime.currentHp <= maxHp / 4} /><Tracker icon={Shield} label="Geçici CP" value={activeRuntime.tempHp} onMinus={() => adjust("tempHp", -1)} onPlus={() => adjust("tempHp", 1)} /><Tracker icon={Sparkles} label="Rün Puanı" value={activeRuntime.rp} suffix="/ 5" onMinus={() => adjust("rp", -1, 0, 5)} onPlus={() => adjust("rp", 1, 0, 5)} /><Tracker icon={CircleDot} label={activeClass.resource} value={activeRuntime.resource} suffix={`/ ${resourceMax}`} onMinus={() => adjust("resource", -1, 0, resourceMax)} onPlus={() => adjust("resource", 1, 0, resourceMax)} /><Tracker icon={Coins} label="Altın" value={activeRuntime.gold} onMinus={() => adjust("gold", -1)} onPlus={() => adjust("gold", 1)} /></section>
        <section className={`action-console table-card ${activeRuntime.inCombat ? "combat-live" : ""}`}><div className="action-console-head"><div><p className="eyebrow">Hızlı kullanım çubuğu</p><h2>Aktif Yetenekler</h2><span>{actions.length} hazırlanmış eylem</span></div><div className="combat-controls"><button className={activeRuntime.inCombat ? "active" : ""} onClick={toggleCombat}><Swords size={14} />{activeRuntime.inCombat ? `Çatışma · Tur ${activeRuntime.turn}` : "Çatışmayı başlat"}</button>{activeRuntime.inCombat && <button onClick={endTurn}><RotateCcw size={14} /> Turu bitir</button>}</div></div>{actions.length ? <div className="action-grid">{actions.map((action) => <ActionCard key={action.id} action={action} cooldown={activeRuntime.cooldowns[action.id]} onUse={() => useAction(action)} />)}</div> : <div className="action-empty"><Zap size={30} /><div><b>Hızlı çubuk boş.</b><p>Yetenek Ağacı’ndan öğrendiğin güçleri hazırla veya Envanter’den bir eşya kuşan.</p></div></div>}</section>
        {character.classId === "buyucu" && <section className="table-card"><div className="table-card-head"><h2>Büyü Yuvaları</h2><span>Yetenek kullanımı uygun yuvayı otomatik tüketir</span></div><div className="slot-grid">{slotsMax.map((max, index) => max > 0 && <Tracker mini key={index} label={`${index + 1}. derece`} value={activeRuntime.spellSlots[index] ?? 0} suffix={`/ ${max}`} onMinus={() => setRun("spellSlots", activeRuntime.spellSlots.map((value, slot) => slot === index ? Math.max(0, value - 1) : value))} onPlus={() => setRun("spellSlots", activeRuntime.spellSlots.map((value, slot) => slot === index ? Math.min(max, value + 1) : value))} />)}</div></section>}
        <section className="table-card"><div className="table-card-head"><h2>Durumlar</h2><span>{activeRuntime.conditions.length ? `${activeRuntime.conditions.length} aktif` : "Temiz"}</span></div><div className="status-grid">{statusOptions.map((condition) => <button className={activeRuntime.conditions.includes(condition) ? "active" : ""} onClick={() => toggleCondition(condition)} key={condition}>{activeRuntime.conditions.includes(condition) && <Check size={11} />}{condition}</button>)}</div></section>
        <section className="table-card"><div className="table-card-head"><h2>Ölüm Kurtarmaları</h2><span>DC 10</span></div><div className="death-saves"><div><b>Başarı</b>{[0,1,2].map((index) => <button aria-label="Başarı" className={activeRuntime.deathSuccess > index ? "success" : ""} onClick={() => setRun("deathSuccess", activeRuntime.deathSuccess === index + 1 ? index : index + 1)} key={index} />)}</div><div><b>Başarısızlık</b>{[0,1,2].map((index) => <button aria-label="Başarısızlık" className={activeRuntime.deathFail > index ? "fail" : ""} onClick={() => setRun("deathFail", activeRuntime.deathFail === index + 1 ? index : index + 1)} key={index} />)}</div></div></section>
      </main><aside className="table-side"><section className="combat-summary"><h2>Çatışma Özeti</h2><div><span>SS</span><b>{defense}</b></div><div><span>İnisiyatif</span><b>{signed(dexMod)}</b></div><div><span>Uzmanlık</span><b>+{prof}</b></div><div><span>Güç DC</span><b>{powerDc}</b></div><div><span>Hız</span><b>9 m</b></div></section><section className="dice-panel"><h2>Hızlı Zar</h2><div>{[4,6,8,10,12,20].map((die) => <button onClick={() => roll(die)} key={die}>d{die}</button>)}</div><ol>{activeRuntime.rolls.map((result, index) => <li key={`${result}-${index}`}>{result}</li>)}</ol></section><section className="next-level-card"><small>Sonraki seviye</small><h2>{nextFeature}</h2><p>Seviye {Math.min(20, character.level + 1)}</p><button disabled={character.level >= 20} onClick={() => setTab("ilerleme")}>İlerlemeyi aç <ChevronRight size={14} /></button></section></aside></div>}

      {tab === "kazanimlar" && <section className="owned-page"><div className="owned-head"><div><p className="eyebrow">Karakter külliyatı</p><h2>Sahip Olduğun Her Şey</h2><p>Seviyelerden, uzmanlıktan, yetenek ağacından ve ekipmandan gelen etkilerin tam listesi.</p></div><div className="owned-count"><strong>{ownedFeatures.length + availableClassActions.length + learnedAbilities.length + (character.cantrips?.length ?? 0) + activeRuntime.inventory.length + (character.ancestry === "havari" ? 1 : 0)}</strong><span>Toplam kazanım</span></div></div>{character.ancestry === "havari" && <OwnedSection title="Soy ve Aşkın Bağ" empty=""><article className="owned-card ability"><div className="owned-card-meta"><span>Havari</span><span>Aktif</span><span><Clock3 size={11} /> Uzun mola</span></div><h3>Aşkın Yankı</h3><small>{faithName} · {selectedPatronDomain?.name ?? "Alan seçilmemiş"} · {character.patronBond || "Bağ seçilmemiş"}</small><p>Seçilen alanla doğrudan ilgili bir Büyü Bilgisi veya İnanç ve Ruhlar kontrolünde avantaj kazanırsın.</p></article></OwnedSection>}<OwnedSection title="Sınıf Teknikleri" empty="Bu sınıf için ayrı teknik kartı yok.">{availableClassActions.map((action) => <article className="owned-card ability" key={action.id}><div className="owned-card-meta"><span>Seviye {action.level}</span><span>Aktif</span><span>{action.cost}</span></div><h3>{action.name}</h3><p>{classActionEffect(action, character.level)}</p></article>)}</OwnedSection><OwnedSection title="Sınıf ve Uzmanlık Özellikleri" empty="Bu seviyede kayıtlı özellik yok.">{ownedFeatures.map((feature) => <article className="owned-card" key={feature.id}><div className="owned-card-meta"><span>Seviye {feature.level}</span><span>{feature.active ? "Aktif" : "Pasif"}</span>{feature.cooldown !== "none" && <span><Clock3 size={11} /> {cooldownLabel(feature.cooldown)}</span>}</div><h3>{feature.name}</h3>{feature.specialization && <small>{feature.specialization}</small>}<p>{feature.effect}</p></article>)}</OwnedSection><OwnedSection title="Öğrenilmiş İmza Yetenekleri" empty="Henüz bir imza yeteneği öğrenmedin.">{learnedAbilities.map((ability) => <article className="owned-card ability" key={ability.id}><div className="owned-card-meta"><span>{ability.tier}</span><span>{ability.action}</span><span>{ability.cost || "Bedelsiz"}</span></div><h3>{ability.name}</h3><p>{ability.effect}</p>{ability.mode === "passive" ? <button disabled><Sparkles size={13} /> Pasif · sürekli etkin</button> : <button className={activeRuntime.prepared.includes(ability.id) ? "prepared" : ""} onClick={() => togglePrepared(ability.id)}>{activeRuntime.prepared.includes(ability.id) ? <><Check size={13} /> Masada hazır</> : <><Plus size={13} /> Masaya hazırla</>}</button>}</article>)}</OwnedSection><OwnedSection title="Cantripler" empty="Cantrip seçilmemiş.">{(character.cantrips ?? []).map((id) => { const cantrip = cantrips.find((entry) => entry.id === id); return cantrip ? <article className="owned-card ability" key={id}><div className="owned-card-meta"><span>Cantrip</span><span>{cantrip.action}</span><span>Yuva harcamaz</span></div><h3>{cantrip.name}</h3><p>{cantripEffect(id, character.level)}</p><button className="prepared" disabled><Check size={13} /> Masada hazır</button></article> : null; })}</OwnedSection><OwnedSection title="Eşyalar ve Etkileri" empty="Envanterin boş.">{activeRuntime.inventory.map((entry) => { const item = items.find((candidate) => candidate.id === entry.id); return item ? <article className="owned-card item" key={item.id}><div className="owned-card-meta"><span>{item.rarity}</span><span>×{entry.quantity}</span>{entry.equipped && <span>Kuşanılmış</span>}{entry.bound && <span>Bağlı</span>}</div><h3>{item.name}</h3><p>{item.effect}</p></article> : null; })}</OwnedSection></section>}

      {tab === "agac" && <section className="skill-tree-page with-library"><aside className="all-abilities-menu"><div className="all-abilities-head"><div><small>GM SERBEST SEÇİMİ</small><h2>Tüm Yetenekler</h2></div><span>987</span></div><p>Sınıf, kademe ve seçim yuvası sınırı olmadan karaktere yetenek ver.</p><label className="search-box"><Search size={15} /><input value={allAbilitySearch} onChange={(event) => setAllAbilitySearch(event.target.value)} placeholder="Tüm yeteneklerde ara…" /></label><div className="ability-source-filters">{(["all", "Temel Runeterra", "League of Legends", "TFT Set 17"] as const).map((source) => <button className={abilitySource === source ? "active" : ""} onClick={() => setAbilitySource(source)} key={source}>{source === "all" ? "Tümü" : source === "Temel Runeterra" ? "Temel" : source === "League of Legends" ? "LoL" : "TFT"}</button>)}</div><div className="all-ability-list">{allAbilityResults.map((ability) => { const learned = activeRuntime.unlocked.includes(ability.id); return <article className={learned ? "learned" : ""} key={ability.id}><button onClick={() => gmToggleAbility(ability)} aria-label={`${ability.name} ${learned ? "kaldır" : "ekle"}`}><span className="gm-ability-icon">{learned ? <Check size={12} /> : <Plus size={12} />}</span><span><small>{ability.sourceSet} · {ability.tier} · {ability.mode === "passive" ? "Pasif" : "Aktif"}</small><b>{ability.name}</b><em>{ability.effect}</em></span></button></article>; })}</div><footer>{allAbilityResults.length === 100 ? "İlk 100 sonuç · Arayarak daralt" : `${allAbilityResults.length} sonuç`}<Link href="/kulliyat/yetenekler">Külliyatı aç <ChevronRight size={12} /></Link></footer></aside><div className="skill-tree-head"><div><p className="eyebrow">{activeClass.name} için önerilen yollar</p><h2>Yetenek Ağacı</h2><p>Yetenek Artışı seviyelerinde puan artışı yerine bir İmza Yeteneği öğrenebilirsin.</p><div className="tag-row"><span className="tag">Sınıf filtresi: {activeClass.name}</span><span className="tag">Soy uyumu: {character.ancestry || "—"}</span>{selectedPatronDomain && <span className="tag">Alan: {selectedPatronDomain.name}</span>}</div></div><div className="skill-slot-counter"><strong>{Math.max(0, choiceSlots - choicesUsed)}</strong><span>Kullanılabilir seçim</span></div></div><label className="search-box tree-search"><Search size={17} /><input value={abilitySearch} onChange={(event) => setAbilitySearch(event.target.value)} placeholder="Ağaçta yetenek ara…" /></label><div className="skill-branches">{branchAbilities.map((branch) => <div className="skill-branch" key={branch.name}><h3>{branch.name}</h3><div className="branch-line" />{branch.abilities.map((ability) => { const tier = tierFromText(ability.tier); const learned = activeRuntime.unlocked.includes(ability.id); const locked = tier > currentTier; return <button className={`skill-node ${learned ? "learned" : ""} ${locked ? "locked" : ""}`} onClick={() => !locked && unlock(ability)} key={ability.id}><span className="node-gem">{learned ? <Check size={13} /> : tier}</span><div><small>Kademe {tier} · {locked ? `Sv. ${[0,4,8,12,16][tier]}` : ability.action}</small><b>{ability.name}</b><p>{ability.effect}</p></div></button>; })}</div>)}</div>{learnedAbilities.length > 0 && <div className="prepared-loadout"><div><h3>Masa Hazırlığı</h3><span>{activeRuntime.prepared.length}/8 yuva</span></div><section>{learnedAbilities.filter((ability) => ability.mode === "active").map((ability) => <button className={activeRuntime.prepared.includes(ability.id) ? "active" : ""} onClick={() => togglePrepared(ability.id)} key={ability.id}>{activeRuntime.prepared.includes(ability.id) ? <Check size={12} /> : <Plus size={12} />}{ability.name}</button>)}</section></div>}<div className="tree-footer"><span>Seviye {character.level} · Kademe {currentTier || "kilitli"}</span><Link href="/kulliyat/yetenekler">987 yeteneğin tamamını aç <ChevronRight size={14} /></Link></div></section>}

      {tab === "envanter" && <div className="inventory-layout"><main><div className="inventory-head"><div><p className="eyebrow">Taşınan ve bağlı eşyalar</p><h2>Envanter</h2></div><div><b>{boundCount}/3</b><span>Eşya Bağı</span></div></div>{activeRuntime.inventory.length ? <div className="inventory-list">{activeRuntime.inventory.map((entry) => { const item = items.find((candidate) => candidate.id === entry.id); if (!item) return null; return <article className="inventory-item" key={entry.id}><div className="item-mark"><Backpack size={18} /></div><div><small>{item.sourceSet} · {item.rarity}</small><h3>{item.name} {entry.quantity > 1 && `×${entry.quantity}`}</h3><p>{item.effect}</p></div><div className="item-actions"><button className={entry.equipped ? "active" : ""} onClick={() => changeItem(entry.id, { equipped: !entry.equipped })}>Kuşan</button><button className={entry.bound ? "bound" : ""} disabled={!entry.bound && boundCount >= 3} onClick={() => changeItem(entry.id, { bound: !entry.bound })}>Bağ</button><button aria-label="Eşyayı sil" onClick={() => setRun("inventory", activeRuntime.inventory.filter((candidate) => candidate.id !== entry.id))}><Trash2 size={14} /></button></div></article>; })}</div> : <div className="inventory-empty"><Backpack size={36} /><h3>Çanta henüz boş.</h3><p>Sağdaki katalogdan eşya ekleyebilirsin.</p></div>}</main><aside className="item-browser"><h2><PackagePlus size={18} /> Eşya Ekle</h2><label className="search-box"><Search size={16} /><input value={itemSearch} onChange={(event) => setItemSearch(event.target.value)} placeholder="466 eşyada ara…" /></label><div>{filteredItems.map((item) => <button onClick={() => addItem(item.id)} key={item.id}><span><b>{item.name}</b><small>{item.sourceSet}</small></span><Plus size={14} /></button>)}</div></aside></div>}

      {tab === "ilerleme" && <section className="progression-page"><div className="level-up-panel"><div><p className="eyebrow">Mevcut seviye</p><strong>{character.level}</strong><h2>{progression[character.classId]?.[character.level - 1]}</h2><p>Sonraki kazanım: {nextFeature}</p></div><div className="level-buttons"><button className="button button-primary" disabled={character.level >= 20} onClick={levelUp}><TrendingUp size={17} /> Seviye atla</button><button className="button button-ghost" disabled={!activeRuntime.levelHistory.length} onClick={undoLevelUp}><RotateCcw size={16} /> Son seviyeyi geri al</button></div></div>{character.level >= 3 && !character.specialization && <div className="specialization-alert"><div><b>Uzmanlık seçimi bekliyor</b><p>3. seviyeye ulaştın. Sınıf yolunu seçerek karakter kaydını tamamla.</p></div><select value={character.specialization} onChange={(event) => setCharacter({ ...character, specialization: event.target.value })}><option value="">Uzmanlık seç</option>{activeClass.specializations.map((value) => <option key={value}>{value}</option>)}</select></div>}<div className="progression-track">{progression[character.classId]?.map((feature, index) => { const level = index + 1; return <div className={level < character.level ? "reached" : level === character.level ? "current" : ""} key={level}><span>{level}</span><i /><section><small>{level <= character.level ? "Kazanıldı" : "Kilitli"}</small><h3>{feature}</h3>{advancementLevels.includes(level) && <button className={activeRuntime.asiLevels.includes(level) ? "active" : ""} onClick={() => setRun("asiLevels", activeRuntime.asiLevels.includes(level) ? activeRuntime.asiLevels.filter((entry) => entry !== level) : [...activeRuntime.asiLevels, level])}>Yetenek puanı kullan</button>}</section></div>; })}</div></section>}

      {tab === "notlar" && <div className="notes-page"><main className="notes-grid"><label><span>Aktif görev</span><textarea value={activeRuntime.quest} onChange={(event) => setRun("quest", event.target.value)} placeholder="Grubun mevcut hedefi…" /></label><label><span>Masa notları</span><textarea className="large" value={activeRuntime.notes} onChange={(event) => setRun("notes", event.target.value)} placeholder="NPC'ler, ipuçları, borçlar ve planlar…" /></label></main><aside><h2>Aspect'ler</h2><div><small>Kimlik</small><p>{character.aspects.identity || "Yazılmamış"}</p></div><div><small>Bölge Bağı</small><p>{character.aspects.region || "Yazılmamış"}</p></div><div><small>Kişisel Çatışma</small><p>{character.aspects.conflict || "Yazılmamış"}</p></div>{character.patronId && <div><small>{character.ancestry === "havari" ? "Aşkın Bağ" : character.classId === "antlasmali" ? "Pakt Kaynağı" : "İnanç Kaynağı"}</small><p>{faithName} · {selectedPatronDomain?.name ?? "Alan seçilmemiş"}<br />{character.patronBond || "Bağ seçilmemiş"}</p></div>}<div className="gold-tracker"><span>Altın</span><button onClick={() => adjust("gold", -1)}><Minus size={12} /></button><b>{activeRuntime.gold}</b><button onClick={() => adjust("gold", 1)}><Plus size={12} /></button></div></aside></div>}
    </div>
  );
}

function ActionCard({ action, cooldown, onUse }: { action: ActionSource; cooldown?: Cooldown; onUse: () => void }) {
  return <article className={`action-card ${cooldown ? "on-cooldown" : ""}`}><div className="action-card-top"><span>{action.kind}</span>{cooldown ? <span className="cooldown"><Clock3 size={11} /> {cooldownLabel(cooldown)}</span> : <span>{cooldownLabel(action.cooldown)}</span>}</div><h3>{action.name}</h3><p>{action.effect}</p><div className="action-card-bottom"><small>{action.cost || (action.kind === "Eşya" ? "Eşya etkisi" : "Bedelsiz")}</small><button disabled={Boolean(cooldown)} onClick={onUse}>{cooldown ? <Clock3 size={14} /> : <Play size={14} />}{cooldown ? "Bekliyor" : "Kullan"}</button></div></article>;
}
function OwnedSection({ title, empty, children }: { title: string; empty: string; children: React.ReactNode }) {
  const count = Array.isArray(children) ? children.filter(Boolean).length : children ? 1 : 0;
  return <div className="owned-section"><div className="owned-section-title"><h3>{title}</h3><span>{count}</span></div>{count ? <div className="owned-grid">{children}</div> : <p className="owned-empty">{empty}</p>}</div>;
}
function Tracker({ icon: Icon, label, value, suffix, onMinus, onPlus, danger, mini }: { icon?: typeof Heart; label: string; value: number; suffix?: string; onMinus: () => void; onPlus: () => void; danger?: boolean; mini?: boolean }) {
  return <div className={`tracker ${danger ? "danger" : ""} ${mini ? "mini" : ""}`}><div className="tracker-label">{Icon && <Icon size={12} />}<span>{label}</span></div><div className="tracker-control"><button onClick={onMinus}><Minus size={11} /></button><strong>{value}<small>{suffix}</small></strong><button onClick={onPlus}><Plus size={11} /></button></div></div>;
}
