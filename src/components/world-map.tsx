"use client";

import Link from "next/link";
import {
  Anchor, BookOpen, Castle, CloudFog, Crosshair, DoorOpen, Eye, EyeOff,
  Footprints, Landmark, LocateFixed, MapPin, Navigation, Pin,
  RotateCcw, Ruler, Search, Sparkles, Trash2, X, ZoomIn, ZoomOut,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { mapPoints, mapRegions, regionById, type MapPointKind } from "@/lib/map-data";

const WORLD = { width: 2048, height: 1536, maxZoom: 4, tileSize: 256 };
const LEVELS = [
  { columns: 1, rows: 1 },
  { columns: 2, rows: 2 },
  { columns: 4, rows: 3 },
  { columns: 8, rows: 6 },
  { columns: 16, rows: 12 },
];
const MIN_SCALE = 0.28;
const MAX_SCALE = 2;
const STORAGE = {
  pins: "runeterra-frp-map-pins",
  explored: "runeterra-frp-map-explored",
  group: "runeterra-frp-map-group",
};

type Point = { x: number; y: number };
type MapMode = "navigate" | "measure" | "pin" | "reveal" | "group";
type GmPin = Point & { id: string; name: string };

const pointIcons: Record<MapPointKind, typeof Castle> = {
  başkent: Castle,
  şehir: Landmark,
  liman: Anchor,
  harabe: Crosshair,
  geçit: DoorOpen,
  gizem: Sparkles,
  zindan: Crosshair,
  mabet: Sparkles,
  kasaba: Landmark,
  kamp: Footprints,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function readStored<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
}

export function WorldMap() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startY: number; panX: number; panY: number; moved: boolean } | null>(null);
  const [scale, setScale] = useState(0.5);
  const [pan, setPan] = useState<Point>({ x: 0, y: 0 });
  const [mode, setMode] = useState<MapMode>("navigate");
  const [query, setQuery] = useState("");
  const [kindFilter, setKindFilter] = useState<MapPointKind | "all">("all");
  const [selectedId, setSelectedId] = useState("demacia-city");
  const [showLabels, setShowLabels] = useState(true);
  const [showFog, setShowFog] = useState(false);
  const [pins, setPins] = useState<GmPin[]>([]);
  const [explored, setExplored] = useState<Point[]>([]);
  const [group, setGroup] = useState<Point | null>(null);
  const [measure, setMeasure] = useState<Point[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const fitMap = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const nextScale = clamp(Math.min(viewport.clientWidth / WORLD.width, viewport.clientHeight / WORLD.height) * 0.92, MIN_SCALE, 1);
    setScale(nextScale);
    setPan({
      x: (viewport.clientWidth - WORLD.width * nextScale) / 2,
      y: (viewport.clientHeight - WORLD.height * nextScale) / 2,
    });
  }, []);

  useEffect(() => {
    setPins(readStored<GmPin[]>(STORAGE.pins, []));
    setExplored(readStored<Point[]>(STORAGE.explored, []));
    setGroup(readStored<Point | null>(STORAGE.group, null));
    setHydrated(true);
    const frame = window.requestAnimationFrame(fitMap);
    return () => window.cancelAnimationFrame(frame);
  }, [fitMap]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(() => fitMap());
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [fitMap]);

  useEffect(() => { if (hydrated) window.localStorage.setItem(STORAGE.pins, JSON.stringify(pins)); }, [hydrated, pins]);
  useEffect(() => { if (hydrated) window.localStorage.setItem(STORAGE.explored, JSON.stringify(explored)); }, [hydrated, explored]);
  useEffect(() => {
    if (!hydrated) return;
    if (group) window.localStorage.setItem(STORAGE.group, JSON.stringify(group));
    else window.localStorage.removeItem(STORAGE.group);
  }, [group, hydrated]);

  const tileLevel = scale < 0.4 ? 2 : scale < 0.75 ? 3 : 4;
  const tileWorldSize = (WORLD.tileSize * 2 ** (WORLD.maxZoom - tileLevel)) / 2;
  const tiles = useMemo(() => {
    const entries: { x: number; y: number }[] = [];
    const level = LEVELS[tileLevel];
    for (let y = 0; y < level.rows; y += 1) for (let x = 0; x < level.columns; x += 1) entries.push({ x, y });
    return entries;
  }, [tileLevel]);

  const selected = mapPoints.find((point) => point.id === selectedId) ?? mapPoints[0];
  const filteredPoints = mapPoints.filter((point) => {
    if (kindFilter !== "all" && point.kind !== kindFilter) return false;
    const needle = query.trim().toLocaleLowerCase("tr-TR");
    if (!needle) return true;
    const region = regionById[point.regionId];
    return `${point.name} ${point.kind} ${region?.name ?? ""}`.toLocaleLowerCase("tr-TR").includes(needle);
  });

  const constrainPan = useCallback((next: Point, nextScale = scale) => {
    const viewport = viewportRef.current;
    if (!viewport) return next;
    const margin = 120;
    const width = WORLD.width * nextScale;
    const height = WORLD.height * nextScale;
    const minX = Math.min(margin, viewport.clientWidth - width - margin);
    const minY = Math.min(margin, viewport.clientHeight - height - margin);
    return {
      x: clamp(next.x, minX, viewport.clientWidth - margin),
      y: clamp(next.y, minY, viewport.clientHeight - margin),
    };
  }, [scale]);

  const zoomAt = useCallback((nextScale: number, screenPoint?: Point) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const target = { x: viewport.clientWidth / 2, y: viewport.clientHeight / 2, ...screenPoint };
    const clamped = clamp(nextScale, MIN_SCALE, MAX_SCALE);
    const worldX = (target.x - pan.x) / scale;
    const worldY = (target.y - pan.y) / scale;
    setScale(clamped);
    setPan(constrainPan({ x: target.x - worldX * clamped, y: target.y - worldY * clamped }, clamped));
  }, [constrainPan, pan, scale]);

  const focusPoint = (point: Point, targetScale = Math.max(scale, 0.86)) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const nextScale = clamp(targetScale, MIN_SCALE, MAX_SCALE);
    setScale(nextScale);
    setPan(constrainPan({
      x: viewport.clientWidth / 2 - point.x * nextScale,
      y: viewport.clientHeight / 2 - point.y * nextScale,
    }, nextScale));
  };

  const screenToWorld = (clientX: number, clientY: number): Point | null => {
    const viewport = viewportRef.current;
    if (!viewport) return null;
    const rect = viewport.getBoundingClientRect();
    return {
      x: clamp((clientX - rect.left - pan.x) / scale, 0, WORLD.width),
      y: clamp((clientY - rect.top - pan.y) / scale, 0, WORLD.height),
    };
  };

  const actOnMap = (clientX: number, clientY: number) => {
    const point = screenToWorld(clientX, clientY);
    if (!point || mode === "navigate") return;
    if (mode === "measure") setMeasure((current) => current.length >= 2 ? [point] : [...current, point]);
    if (mode === "reveal") setExplored((current) => [...current, point]);
    if (mode === "group") { setGroup(point); setMode("navigate"); }
    if (mode === "pin") {
      const name = window.prompt("GM işaretinin adı", "Yeni işaret");
      if (name?.trim()) setPins((current) => [...current, { ...point, id: crypto.randomUUID(), name: name.trim() }]);
      setMode("navigate");
    }
  };

  const measureKm = measure.length === 2
    ? Math.round(Math.hypot(measure[1].x - measure[0].x, measure[1].y - measure[0].y) * 2.45)
    : null;

  return (
    <div className="world-map-app">
      <aside className="map-sidebar">
        <header>
          <p className="eyebrow"><Navigation size={13} /> Dünya atlası</p>
          <h1>Runeterra Haritası</h1>
          <p>Yolları incele, mesafe ölç ve masanın keşfini kaydet.</p>
        </header>

        <label className="map-search">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Şehir veya bölge ara" />
          {query && <button onClick={() => setQuery("")} aria-label="Aramayı temizle"><X size={14} /></button>}
        </label>

        <div className="map-kind-filters" aria-label="Konum türü">
          {([["all", "Tümü"], ["zindan", "Zindan"], ["mabet", "Mabet"], ["kasaba", "Kasaba"], ["kamp", "Kamp"]] as const).map(([value, label]) => (
            <button key={value} className={kindFilter === value ? "active" : ""} onClick={() => setKindFilter(value)}>{label}</button>
          ))}
        </div>

        <div className="map-result-list">
          {filteredPoints.map((point) => {
            const Icon = pointIcons[point.kind];
            return (
              <button key={point.id} className={selectedId === point.id ? "active" : ""} onClick={() => { setSelectedId(point.id); focusPoint(point); }}>
                <span><Icon size={15} /></span>
                <span><b>{point.name}</b><small>{regionById[point.regionId]?.name} · {point.kind}</small></span>
              </button>
            );
          })}
        </div>

        <article className="map-detail-card">
          <div className="detail-kicker"><span style={{ background: regionById[selected.regionId]?.color }} /> {selected.kind} · Tehlike {selected.danger}/5</div>
          <h2>{selected.name}</h2>
          <p>{selected.summary}</p>
          <div className="danger-pips" aria-label={`Tehlike seviyesi ${selected.danger}`}>
            {[1, 2, 3, 4, 5].map((value) => <i key={value} className={value <= selected.danger ? "filled" : ""} />)}
          </div>
          <Link href={`/kulliyat/bolgeler/${selected.regionId}`}><BookOpen size={14} /> Bölge külliyatını aç</Link>
        </article>
      </aside>

      <section className="map-stage">
        <div className="map-toolbar" aria-label="Harita araçları">
          <div className="tool-group">
            <button onClick={() => zoomAt(scale * 1.3)} title="Yakınlaştır"><ZoomIn /></button>
            <button onClick={() => zoomAt(scale / 1.3)} title="Uzaklaştır"><ZoomOut /></button>
            <button onClick={fitMap} title="Haritayı sığdır"><LocateFixed /></button>
          </div>
          <div className="tool-group map-modes">
            <button className={mode === "navigate" ? "active" : ""} onClick={() => setMode("navigate")}><Navigation /> <span>Gez</span></button>
            <button className={mode === "measure" ? "active" : ""} onClick={() => { setMode("measure"); setMeasure([]); }}><Ruler /> <span>Ölç</span></button>
            <button className={mode === "pin" ? "active" : ""} onClick={() => setMode("pin")}><Pin /> <span>GM işareti</span></button>
            <button className={mode === "group" ? "active" : ""} onClick={() => setMode("group")}><Footprints /> <span>Ekip</span></button>
            <button className={mode === "reveal" ? "active" : ""} onClick={() => { setMode("reveal"); setShowFog(true); }}><CloudFog /> <span>Keşfet</span></button>
          </div>
          <div className="tool-group">
            <button className={showLabels ? "active" : ""} onClick={() => setShowLabels((value) => !value)} title="Etiketler">{showLabels ? <Eye /> : <EyeOff />}</button>
            <button className={showFog ? "active" : ""} onClick={() => setShowFog((value) => !value)} title="Keşif sisi"><CloudFog /></button>
          </div>
        </div>

        <div
          ref={viewportRef}
          className={`map-viewport mode-${mode}`}
          onWheel={(event) => {
            event.preventDefault();
            const rect = event.currentTarget.getBoundingClientRect();
            zoomAt(scale * (event.deltaY < 0 ? 1.14 : 0.88), { x: event.clientX - rect.left, y: event.clientY - rect.top });
          }}
          onPointerDown={(event) => {
            if (mode !== "navigate" || event.button !== 0) return;
            event.currentTarget.setPointerCapture(event.pointerId);
            dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, panX: pan.x, panY: pan.y, moved: false };
          }}
          onPointerMove={(event) => {
            const drag = dragRef.current;
            if (!drag || drag.pointerId !== event.pointerId) return;
            const dx = event.clientX - drag.startX;
            const dy = event.clientY - drag.startY;
            if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
            setPan(constrainPan({ x: drag.panX + dx, y: drag.panY + dy }));
          }}
          onPointerUp={(event) => {
            const drag = dragRef.current;
            if (drag?.pointerId === event.pointerId) dragRef.current = null;
            else actOnMap(event.clientX, event.clientY);
          }}
          onPointerCancel={() => { dragRef.current = null; }}
        >
          <div className="map-world" style={{ width: WORLD.width, height: WORLD.height, transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})` }}>
            <div className="map-tiles" aria-hidden="true">
              {tiles.map((tile) => (
                <img
                  key={`${tileLevel}-${tile.x}-${tile.y}`}
                  src={`/map/tiles/${tileLevel}/${tile.x}/${tile.y}.webp?v=detail-v2`}
                  alt=""
                  draggable={false}
                  style={{ left: tile.x * tileWorldSize, top: tile.y * tileWorldSize, width: tileWorldSize, height: tileWorldSize }}
                />
              ))}
            </div>


            {showLabels && mapRegions.map((region) => (
              <button key={region.id} className="region-label" style={{ left: region.x, top: region.y, "--region-color": region.color } as React.CSSProperties} onClick={(event) => { event.stopPropagation(); focusPoint(region, Math.max(scale, 0.72)); }}>
                <b>{region.name}</b><small>{region.terrain}</small>
              </button>
            ))}

            {mapPoints.filter((point) => kindFilter === "all" || point.kind === kindFilter).map((point) => {
              const Icon = pointIcons[point.kind];
              return (
                <button key={point.id} className={`map-point ${selectedId === point.id ? "active" : ""}`} style={{ left: point.x, top: point.y }} title={point.name} onClick={(event) => { event.stopPropagation(); setSelectedId(point.id); }}>
                  <span><Icon /></span><b>{point.name}</b>
                </button>
              );
            })}

            {pins.map((pin) => (
              <div key={pin.id} className="gm-pin" style={{ left: pin.x, top: pin.y }}>
                <Pin /><b>{pin.name}</b>
                <button onClick={() => setPins((current) => current.filter((item) => item.id !== pin.id))} title="İşareti sil"><Trash2 /></button>
              </div>
            ))}

            {group && <div className="group-token" style={{ left: group.x, top: group.y }} title="Ekibin konumu"><Footprints /><span>Ekip</span></div>}

            {measure.length > 0 && (
              <svg className="measure-layer" viewBox={`0 0 ${WORLD.width} ${WORLD.height}`} aria-hidden="true">
                {measure.length === 2 && <line x1={measure[0].x} y1={measure[0].y} x2={measure[1].x} y2={measure[1].y} />}
                {measure.map((point, index) => <circle key={index} cx={point.x} cy={point.y} r="10" />)}
              </svg>
            )}

            {showFog && (
              <svg className="fog-layer" viewBox={`0 0 ${WORLD.width} ${WORLD.height}`} aria-hidden="true">
                <defs><mask id="exploration-mask"><rect width="100%" height="100%" fill="white" />{explored.map((point, index) => <circle key={index} cx={point.x} cy={point.y} r="175" fill="black" />)}{group && <circle cx={group.x} cy={group.y} r="125" fill="black" />}</mask></defs>
                <rect width="100%" height="100%" mask="url(#exploration-mask)" />
              </svg>
            )}
          </div>

          <div className="map-status">
            <span>Yakınlık %{Math.round(scale * 100)}</span>
            <span>Karo Z{tileLevel}</span>
            {measureKm !== null && <b>Yaklaşık {measureKm.toLocaleString("tr-TR")} km</b>}
            {mode !== "navigate" && <strong>{mode === "measure" ? "İki nokta seç" : mode === "pin" ? "İşaret konumunu seç" : mode === "group" ? "Ekibin konumunu seç" : "Açılacak alanlara dokun"}</strong>}
          </div>

          <div className="map-quick-actions">
            {measure.length > 0 && <button onClick={() => setMeasure([])}><RotateCcw /> Ölçümü sil</button>}
            {showFog && explored.length > 0 && <button onClick={() => setExplored([])}><EyeOff /> Keşfi sıfırla</button>}
            {group && <button onClick={() => setGroup(null)}><MapPin /> Ekibi kaldır</button>}
          </div>
        </div>
      </section>
    </div>
  );
}
