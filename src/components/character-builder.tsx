"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Download, RotateCcw, Save, ShieldCheck } from "lucide-react";

import { abilityKeys, abilityLabels, ancestries, classes, mageSlots, modifier, packs, proficiency, regions, scoreCosts, type AbilityKey } from "@/lib/character-data";
import { activeCharacterId, newCharacterId, readCharacterSlots, upsertCharacterSlot } from "@/lib/character-storage";
import { cantrips } from "@/lib/cantrips";

type CharacterState = {
  id: string;
  name: string;
  concept: string;
  level: number;
  abilities: Record<AbilityKey, number>;
  ancestry: string;
  ancestryChoice: string;
  region: string;
  regionSkill: string;
  regionGift: string;
  classId: string;
  specialization: string;
  classSkills: string[];
  cantrips: string[];
  pack: string;
  aspects: { identity: string; region: string; conflict: string };
};

const initialState: CharacterState = {
  id: "", name: "", concept: "", level: 1,
  abilities: { guc: 8, ceviklik: 8, dayaniklilik: 8, zeka: 8, sezgi: 8, karizma: 8 },
  ancestry: "", ancestryChoice: "", region: "", regionSkill: "", regionGift: "",
  classId: "", specialization: "", classSkills: [], cantrips: [], pack: "Gezgin",
  aspects: { identity: "", region: "", conflict: "" },
};

const steps = ["Kimlik", "Yetenekler", "Köken", "Sınıf", "Aspect’ler", "Özet"];

function signed(value: number) { return value >= 0 ? `+${value}` : String(value); }

export function CharacterBuilder() {
  const [character, setCharacter] = useState<CharacterState>(initialState);
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search); const forceNew = params.get("new") === "1"; if (params.get("step") === "class") setStep(3);
    if (forceNew) { window.localStorage.removeItem("runeterra-frp-runtime"); setCharacter({ ...initialState, id: newCharacterId() }); setHydrated(true); return; }
    const slot = readCharacterSlots().find((entry) => entry.id === activeCharacterId());
    const saved = slot?.character ?? (() => { try { return JSON.parse(window.localStorage.getItem("runeterra-frp-character") ?? "null"); } catch { return null; } })();
    setCharacter(saved ? { ...initialState, ...saved, id: String(saved.id || newCharacterId()) } : { ...initialState, id: newCharacterId() });
    setHydrated(true);
  }, []);
  useEffect(() => { if (hydrated && character.id) { window.localStorage.setItem("runeterra-frp-character", JSON.stringify(character)); upsertCharacterSlot(character as unknown as Record<string, unknown>); } }, [character, hydrated]);

  const selectedClass = classes.find((item) => item.id === character.classId);
  const selectedRegion = regions.find((item) => item.id === character.region);
  const selectedAncestry = ancestries.find((item) => item.id === character.ancestry);
  const spent = abilityKeys.reduce((total, key) => total + scoreCosts[character.abilities[key]], 0);
  const pointsLeft = 27 - spent;
  const prof = proficiency(character.level);
  const conMod = modifier(character.abilities.dayaniklilik);
  const dexMod = modifier(character.abilities.ceviklik);
  const hp = selectedClass ? selectedClass.hpBase + conMod + Math.max(0, character.level - 1) * Math.max(1, selectedClass.hpPerLevel + conMod) : 0;
  const defense = selectedClass ? selectedClass.defense === "medium-shield" ? 15 + Math.min(2, dexMod) : selectedClass.defense === "medium" ? 13 + Math.min(2, dexMod) : selectedClass.defense === "light" ? 11 + dexMod : 10 + dexMod : 10 + dexMod;
  const powerMod = selectedClass ? selectedClass.id === "buyucu" || selectedClass.id === "mucit" ? modifier(character.abilities.zeka) : selectedClass.id === "ruhban" || selectedClass.id === "avci" ? modifier(character.abilities.sezgi) : selectedClass.id === "duzenbaz" ? dexMod : Math.max(modifier(character.abilities.guc), dexMod) : 0;
  const powerDc = 8 + prof + powerMod;

  const resource = useMemo(() => {
    if (!selectedClass) return "—";
    if (selectedClass.resourceBase === "slots") return mageSlots[character.level - 1].map((count, index) => count ? `${index + 1}. derece: ${count}` : "").filter(Boolean).join(" · ");
    const count = selectedClass.resourceBase === "prof+2" ? prof + 2 : selectedClass.id === "ruhban" && character.level >= 9 ? prof + 1 : prof;
    return `${count} ${selectedClass.resource}`;
  }, [selectedClass, character.level, prof]);

  const validSteps = [
    Boolean(character.name.trim()),
    pointsLeft === 0,
    Boolean(character.ancestry && character.region && character.regionSkill && character.regionGift),
    Boolean(selectedClass && character.classSkills.length === selectedClass.skillCount && (selectedClass.id !== "buyucu" || character.cantrips.length === 3) && (character.level < 3 || character.specialization)),
    Boolean(character.aspects.identity.trim() && character.aspects.region.trim() && character.aspects.conflict.trim()),
    true,
  ];

  function update<K extends keyof CharacterState>(key: K, value: CharacterState[K]) { setCharacter((current) => ({ ...current, [key]: value })); }
  function changeScore(key: AbilityKey, direction: number) { const current = character.abilities[key]; const next = Math.min(15, Math.max(8, current + direction)); if (next !== current && (direction < 0 || spent - scoreCosts[current] + scoreCosts[next] <= 27)) update("abilities", { ...character.abilities, [key]: next }); }
  function quickArray() { update("abilities", { guc: 15, ceviklik: 14, dayaniklilik: 13, zeka: 12, sezgi: 10, karizma: 8 }); }
  function chooseClass(id: string) { update("classId", id); update("classSkills", []); update("cantrips", []); update("specialization", ""); const choice = classes.find((item) => item.id === id); if (choice) update("pack", choice.name === "Düzenbaz" ? "Hırsız" : choice.name === "Avcı" ? "Kâşif/Avcı" : choice.name === "Büyücü" ? "Bilgin" : choice.name === "Ruhban" ? "Şifacı" : choice.name === "Mucit" ? "Mucit" : "Gezgin"); }
  function toggleSkill(skill: string) { if (!selectedClass) return; const has = character.classSkills.includes(skill); if (has) update("classSkills", character.classSkills.filter((item) => item !== skill)); else if (character.classSkills.length < selectedClass.skillCount) update("classSkills", [...character.classSkills, skill]); }
  function toggleCantrip(id: string) { const has = character.cantrips.includes(id); if (has) update("cantrips", character.cantrips.filter((entry) => entry !== id)); else if (character.cantrips.length < 3) update("cantrips", [...character.cantrips, id]); }
  function reset() { if (window.confirm("Bu cihazdaki karakter taslağı silinsin mi?")) { window.localStorage.removeItem("runeterra-frp-runtime"); setCharacter({ ...initialState, id: newCharacterId() }); setStep(0); } }
  function download() { const blob = new Blob([JSON.stringify({ system: "Runeterra FRP", version: "0.7.0", character, derived: { hp, defense, proficiency: prof, powerDc, resource } }, null, 2)], { type: "application/json" }); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = `${character.name || "runeterra-karakter"}.json`; link.click(); URL.revokeObjectURL(link.href); }

  return (
    <div className="builder-page shell">
      <div className="builder-title"><div><p className="eyebrow">Kaderini mühürle</p><h1>Karakter Oluşturucu</h1><p>Seçimlerin otomatik kaydedilir; karakterin bu tarayıcıda kalır.</p></div><span className="save-note"><Save size={15} /> {hydrated ? "Taslak kaydediliyor" : "Taslak yükleniyor"}</span></div>
      <div className="builder-progress">{steps.map((label, index) => <button type="button" onClick={() => index <= step || validSteps.slice(0, index).every(Boolean) ? setStep(index) : undefined} className={`progress-step ${step === index ? "active" : ""} ${index < step && validSteps[index] ? "done" : ""}`} key={label}><b><span>{index < step && validSteps[index] ? <Check size={11} /> : index + 1}</span></b><span>{label}</span></button>)}</div>

      <div className="builder-layout">
        <section className="builder-panel">
          <div className="builder-panel-head"><div><h2>{steps[step]}</h2><p>{["Efsanenin nereden başladığını kaydet.", "27 puanını altı yeteneğe dağıt.", "Seni biçimlendiren halkı ve kültürü seç.", "Tehlike karşısındaki mekanik araçlarını belirle.", "Kimliğinin avantajlarını ve bedellerini yaz.", "Karakterini son kez kontrol et."][step]}</p></div><span>{step + 1} / 6</span></div>

          {step === 0 && <div className="form-grid">
            <div className="field full"><label htmlFor="name">Karakter adı</label><input id="name" autoFocus value={character.name} onChange={(e) => update("name", e.target.value)} placeholder="Örn. Lyra Voss" /></div>
            <div className="field"><label htmlFor="level">Başlangıç seviyesi</label><select id="level" value={character.level} onChange={(e) => { const level = Number(e.target.value); update("level", level); if (level < 3) update("specialization", ""); }}>{Array.from({ length: 20 }, (_, i) => <option value={i + 1} key={i + 1}>Seviye {i + 1}</option>)}</select><span className="helper">Varsayılan sıradan maceracı başlangıcı 1. seviyedir.</span></div>
            <div className="field"><label htmlFor="tier">Güç kademesi</label><input id="tier" readOnly value={character.level <= 4 ? "Sıradan maceracı" : character.level <= 10 ? "Bölgesel kahraman" : character.level <= 16 ? "Efsanevi figür" : "Dünyayı etkileyen güç"} /></div>
            <div className="field full"><label htmlFor="concept">Kısa karakter fikri</label><textarea id="concept" value={character.concept} onChange={(e) => update("concept", e.target.value)} placeholder="Kimdi, ne istiyor, neden yola çıktı?" /></div>
          </div>}

          {step === 1 && <><div className="ability-toolbar"><div className={`points ${pointsLeft < 0 ? "over" : ""}`}><strong>{pointsLeft}</strong> / 27 puan kaldı</div><button type="button" className="small-action" onClick={quickArray}>Hızlı dizilimi uygula</button></div><div className="ability-grid">{abilityKeys.map((key) => <div className="ability-control" key={key}><label>{abilityLabels[key]}</label><div className="ability-value"><button onClick={() => changeScore(key, -1)} disabled={character.abilities[key] <= 8}>−</button><strong>{character.abilities[key]}</strong><button onClick={() => changeScore(key, 1)} disabled={character.abilities[key] >= 15 || pointsLeft < scoreCosts[character.abilities[key] + 1] - scoreCosts[character.abilities[key]]}>+</button></div><div className="ability-mod">Mod {signed(modifier(character.abilities[key]))}</div></div>)}</div></>}

          {step === 2 && <div className="form-grid"><div className="field full"><span>Soy</span><div className="choice-grid">{ancestries.map((item) => <button type="button" className={`choice-card ${character.ancestry === item.id ? "selected" : ""}`} onClick={() => update("ancestry", item.id)} key={item.id}><small>{item.size} · {item.speed} m</small><h3>{item.name}</h3><p><b>{item.trait}:</b> {item.description}</p></button>)}</div></div>{character.ancestry === "vastaya" && <div className="field full"><label>Keskin duyu</label><select value={character.ancestryChoice} onChange={(e) => update("ancestryChoice", e.target.value)}><option value="">Duyu seç…</option><option>Görme</option><option>İşitme</option><option>Koku</option></select></div>}<div className="field full"><span>Bölge</span><div className="choice-grid">{regions.map((item) => <button type="button" style={{ "--region-color": item.color } as React.CSSProperties} className={`choice-card region-card ${character.region === item.id ? "selected" : ""}`} onClick={() => { update("region", item.id); update("regionSkill", ""); update("regionGift", ""); }} key={item.id}><small>{item.trait}</small><h3>{item.name}</h3><p>{item.description}</p><div className="tag-row">{item.skills.map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div></button>)}</div></div>{selectedRegion && <><div className="field"><label>Bölge becerisi</label><select value={character.regionSkill} onChange={(e) => update("regionSkill", e.target.value)}><option value="">Beceri seç…</option>{selectedRegion.skills.map((skill) => <option key={skill}>{skill}</option>)}</select></div><div className="field"><label>Bağlantı veya eşya</label><select value={character.regionGift} onChange={(e) => update("regionGift", e.target.value)}><option value="">Seçim yap…</option>{selectedRegion.gifts.map((gift) => <option key={gift}>{gift}</option>)}</select></div></>}</div>}

          {step === 3 && <div className="form-grid"><div className="field full"><span>Sınıf</span><div className="choice-grid">{classes.map((item) => <button type="button" className={`choice-card ${character.classId === item.id ? "selected" : ""}`} onClick={() => chooseClass(item.id)} key={item.id}><small>d{item.hitDie} Can Zarı · {item.resource}</small><h3>{item.name}</h3><p>{item.role}. Ana yetenek: {item.primary}.</p><div className="tag-row"><span className="tag">{item.armor}</span>{item.saves.map((save) => <span className="tag" key={save}>{save} kurtarma</span>)}</div></button>)}</div></div>{selectedClass && <><div className="field full"><span>Sınıf becerileri · {character.classSkills.length}/{selectedClass.skillCount}</span><div className="skill-grid">{selectedClass.skills.map((skill) => { const disabled = !character.classSkills.includes(skill) && character.classSkills.length >= selectedClass.skillCount; return <label className="skill-option" key={skill}><input type="checkbox" checked={character.classSkills.includes(skill)} disabled={disabled} onChange={() => toggleSkill(skill)} /><span>{skill}</span></label>; })}</div></div>{selectedClass.id === "buyucu" && <div className="field full cantrip-selection"><span>Cantripler · {character.cantrips.length}/3</span><p className="helper">Yuva harcamayan üç başlangıç büyüsü seç.</p><div className="choice-grid cantrip-grid">{cantrips.map((cantrip) => { const selected = character.cantrips.includes(cantrip.id); const disabled = !selected && character.cantrips.length >= 3; return <button type="button" disabled={disabled} className={`choice-card ${selected ? "selected" : ""}`} onClick={() => toggleCantrip(cantrip.id)} key={cantrip.id}><small>{cantrip.action} · {cantrip.range}</small><h3>{cantrip.name}</h3><p>{cantrip.effect.replace("{DAMAGE}", cantrip.damageDie ? `1d${cantrip.damageDie.size}` : "")}</p></button>; })}</div></div>}<div className="field"><label>Başlangıç paketi</label><select value={character.pack} onChange={(e) => update("pack", e.target.value)}>{packs.map((pack) => <option key={pack}>{pack}</option>)}</select></div><div className="field"><label>Uzmanlık</label>{character.level >= 3 ? <select value={character.specialization} onChange={(e) => update("specialization", e.target.value)}><option value="">Uzmanlık seç…</option>{selectedClass.specializations.map((spec) => <option key={spec}>{spec}</option>)}</select> : <input readOnly value="3. seviyede seçilecek" />}</div><div className="field full"><span className="helper">Başlangıç: {selectedClass.equipment}.</span></div></>}</div>}

          {step === 4 && <div className="form-grid"><div className="field full"><label>Kimlik Aspect’i</label><input value={character.aspects.identity} onChange={(e) => update("aspects", { ...character.aspects, identity: e.target.value })} placeholder="Örn. Kusursuz Atışı Arayan Eski Sınır Muhafızı" /><span className="helper">Kim olduğunu ve seni yetkin kılan temel gerilimi anlatır.</span></div><div className="field full"><label>Bölge Bağı Aspect’i</label><input value={character.aspects.region} onChange={(e) => update("aspects", { ...character.aspects, region: e.target.value })} placeholder="Bölgenle bağın, eleştirin veya iki kültür arasındaki yerin" />{selectedRegion && <div className="tag-row">{selectedRegion.aspects.map((aspect) => <button className="tag aspect-suggestion" type="button" onClick={() => update("aspects", { ...character.aspects, region: aspect })} key={aspect}>{aspect}</button>)}</div>}</div><div className="field full"><label>Kişisel Çatışma Aspect’i</label><input value={character.aspects.conflict} onChange={(e) => update("aspects", { ...character.aspects, conflict: e.target.value })} placeholder="Örn. Ailemin Borcu Peşimi Bırakmıyor" /><span className="helper">Hem Invoke edilebilmeli hem de gerçek bir Compel komplikasyonu doğurmalıdır.</span></div></div>}

          {step === 5 && <div><div className="completion-banner"><h3><ShieldCheck size={18} /> Karakter mekanik olarak hazır.</h3><p>Seçimlerini aşağıdaki özetten kontrol et. JSON dosyasını daha sonra siteye yeniden aktarmak veya arşivlemek için saklayabilirsin.</p></div><div className="form-grid"><div className="field"><span>Kimlik</span><input readOnly value={`${character.name} · Seviye ${character.level}`} /></div><div className="field"><span>Köken</span><input readOnly value={`${selectedAncestry?.name ?? "—"} · ${selectedRegion?.name ?? "—"}`} /></div><div className="field"><span>Sınıf</span><input readOnly value={`${selectedClass?.name ?? "—"}${character.specialization ? ` — ${character.specialization}` : ""}`} /></div><div className="field"><span>Beceriler</span><input readOnly value={[character.regionSkill, ...character.classSkills].filter(Boolean).join(", ")} /></div><div className="field full"><span>Kaynak</span><input readOnly value={resource} /></div>{selectedClass?.id === "buyucu" && <div className="field full"><span>Cantripler</span><input readOnly value={character.cantrips.map((id) => cantrips.find((entry) => entry.id === id)?.name).filter(Boolean).join(", ")} /></div>}<div className="field full"><span>Başlangıç ekipmanı</span><textarea readOnly value={`${selectedClass?.equipment ?? ""}. ${character.pack} paketi. ${character.regionGift}. 15 altın.`} /></div></div><div className="hero-actions"><Link className="button button-primary" href="/karakter/masa"><ShieldCheck size={17} /> Masa Paneline geç</Link><Link className="button button-ghost" href="/karakterler">Karakterlerim</Link><button className="button button-ghost" type="button" onClick={download}><Download size={17} /> JSON olarak indir</button><button className="button button-ghost danger-link" type="button" onClick={reset}><RotateCcw size={17} /> Yeni karakter</button></div></div>}

          <div className="builder-actions"><button type="button" className="button button-ghost" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}><ArrowLeft size={16} /> Geri</button>{step < 5 && <button type="button" className="button button-primary" disabled={!validSteps[step]} onClick={() => setStep((current) => Math.min(5, current + 1))}>Devam <ArrowRight size={16} /></button>}</div>
        </section>

        <aside className="character-preview"><div className="preview-top"><span className="preview-kicker">Karakter mührü</span><h2>{character.name || "İsimsiz Maceracı"}</h2><p>Seviye {character.level} {selectedClass?.name ?? "Sınıf bekleniyor"}{character.specialization ? ` · ${character.specialization}` : ""}</p></div><div className="preview-stats"><div className="preview-stat"><b>{hp || "—"}</b><span>Can Puanı</span></div><div className="preview-stat"><b>{defense}</b><span>SS</span></div><div className="preview-stat"><b>+{prof}</b><span>Uzmanlık</span></div></div><div className="preview-body"><div className="preview-line"><span>Soy / Bölge</span><b>{selectedAncestry?.name ?? "—"} / {selectedRegion?.name ?? "—"}</b></div><div className="preview-line"><span>Güç DC</span><b>{selectedClass ? powerDc : "—"}</b></div><div className="preview-line"><span>Kaynak</span><b>{resource}</b></div><div className="preview-line"><span>Hız</span><b>{selectedAncestry?.speed ?? 9} m</b></div><div className="preview-line"><span>Rün Puanı</span><b>2 / 5</b></div><div className="mini-abilities">{abilityKeys.map((key) => <div className="mini-ability" key={key}><span>{abilityLabels[key].slice(0, 3).toUpperCase()}</span><b>{character.abilities[key]}</b></div>)}</div><div className="preview-aspects"><h4>Aspect’ler</h4>{Object.values(character.aspects).filter(Boolean).map((aspect) => <p key={aspect}>“{aspect}”</p>)}{!Object.values(character.aspects).some(Boolean) && <p>Aspect’ler henüz yazılmadı.</p>}</div></div></aside>
      </div>
    </div>
  );
}
