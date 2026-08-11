"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, Shield, Sparkles, Sword, TestTube } from "lucide-react";
import type { ItemEntry } from "@/lib/items";
const PAGE_SIZE = 40;
const labels = { weapon: "Silah", armor: "Zırh", consumable: "Sarf", passive: "Pasif Eşya" } as const;
export function ItemCatalog({ items }: { items: ItemEntry[] }) {
  const [query,setQuery]=useState(""); const [category,setCategory]=useState("all"); const [page,setPage]=useState(1);
  const filtered=useMemo(()=>{const q=query.trim().toLocaleLowerCase("tr-TR");return items.filter((item)=>(category==="all"||item.category===category)&&(!q||`${item.name} ${item.effect} ${item.id} ${item.tags.join(" ")}`.toLocaleLowerCase("tr-TR").includes(q)));},[items,query,category]);
  const pages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE)); const visible=filtered.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE);
  const Icon=({type}:{type:ItemEntry["category"]})=>type==="weapon"?<Sword/>:type==="armor"?<Shield/>:type==="consumable"?<TestTube/>:<Sparkles/>;
  return <div className="ability-catalog item-catalog shell"><div className="catalog-tools"><label className="search-box"><Search size={17}/><input value={query} onChange={(e)=>{setQuery(e.target.value);setPage(1)}} placeholder="Eşya, etki veya etiket ara…"/></label><div className="catalog-result"><b>{filtered.length}</b> sonuç</div></div><div className="category-pills">{[["all","Tümü"],["weapon","Silahlar"],["armor","Zırhlar"],["consumable","Sarf Malzemeleri"],["passive","Pasif Eşyalar"]].map(([value,label])=><button className={category===value?"active":""} onClick={()=>{setCategory(value);setPage(1)}} key={value}>{label}</button>)}</div><div className="item-card-grid">{visible.map((item)=><Link className={`item-compendium-card ${item.mode}`} href={`/kulliyat/esyalar/${item.slug}`} key={item.id}><div className="item-compendium-icon"><Icon type={item.category}/></div><div><small>{item.rarity} · {labels[item.category]}</small><h2>{item.name}</h2><p>{item.effect}</p><footer><span>{item.mode==="active"?"Kullanılabilir":"Sürekli etki"}</span><ArrowUpRight size={14}/></footer></div></Link>)}</div>{pages>1&&<div className="pagination"><button disabled={page===1} onClick={()=>setPage(page-1)}>Önceki</button><span>{page} / {pages}</span><button disabled={page===pages} onClick={()=>setPage(page+1)}>Sonraki</button></div>}</div>;
}
