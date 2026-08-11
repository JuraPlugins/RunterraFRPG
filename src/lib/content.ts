import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type GuideDocument = {
  title: string;
  slug: string;
  url: string;
  order: number;
  version: string;
  status: string;
  category: string;
  sourcePath: string;
  relativePath: string;
  excerpt: string;
  headings: string[];
  ruleIds: string[];
  searchText: string;
  content: string;
};

const projectRoot = process.cwd();
const docsRoot = path.join(projectRoot, "docs");

function walkMarkdown(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkMarkdown(fullPath);
    return entry.isFile() && entry.name.endsWith(".md") ? [fullPath] : [];
  });
}

function cleanText(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\|/g, " ")
    .replace(/[#*_>`\[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function categoryFor(relativePath: string) {
  const normalized = relativePath.replaceAll("\\", "/");
  if (normalized === "README.md" || /^docs\/0\d-/.test(normalized)) return "Temel Kitap";
  if (normalized.includes("/siniflar/")) return "Sınıf Kitapçıkları";
  if (normalized.includes("/itemler/")) return "Eşya Arşivi";
  if (normalized.includes("/yetenekler/")) return "Yetenek Arşivi";
  return "İçerik Ansiklopedisi";
}

export function getAllDocuments(): GuideDocument[] {
  const files = [path.join(projectRoot, "README.md"), ...walkMarkdown(docsRoot)];

  return files
    .map((sourcePath) => {
      const raw = fs.readFileSync(sourcePath, "utf8");
      const parsed = matter(raw);
      const relativePath = path.relative(projectRoot, sourcePath);
      const title = String(parsed.data.title ?? path.basename(sourcePath, ".md"));
      const slug = String(parsed.data.slug ?? `/${relativePath.replaceAll("\\", "/").replace(/\.md$/, "")}`);
      const headings = [...parsed.content.matchAll(/^#{2,3}\s+(.+)$/gm)].map((match) => cleanText(match[1]));
      const ruleIds = [...parsed.content.matchAll(/\*\*([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+)\s+—/g)].map(
        (match) => match[1],
      );
      const plain = cleanText(parsed.content);

      return {
        title,
        slug,
        url: slug === "/" ? "/" : `/rehber${slug}`,
        order: Number(parsed.data.order ?? 999),
        version: String(parsed.data.version ?? "0.1.0"),
        status: String(parsed.data.status ?? "draft"),
        category: categoryFor(relativePath),
        sourcePath,
        relativePath: relativePath.replaceAll("\\", "/"),
        excerpt: plain.slice(0, 190),
        headings,
        ruleIds,
        searchText: [title, headings.join(" "), ruleIds.join(" ")].join(" ").toLocaleLowerCase("tr-TR"),
        content: parsed.content,
      } satisfies GuideDocument;
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, "tr"));
}

export function getDocumentByRoute(route: string[]) {
  const wanted = `/${route.join("/")}`;
  return getAllDocuments().find((document) => document.slug === wanted);
}

function slugifyHeading(value: string) {
  return cleanText(value)
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function renderDocument(document: GuideDocument) {
  const rendered = await remark().use(html, { sanitize: false }).process(document.content);
  const documents = getAllDocuments();
  const fileLookup = new Map(
    documents.map((item) => [path.normalize(item.sourcePath).toLocaleLowerCase("tr-TR"), item.url]),
  );
  const usedHeadings = new Map<string, number>();

  let output = String(rendered);
  output = output.replace(/<h([1-4])>([\s\S]*?)<\/h\1>/g, (_match, level, inner) => {
    const base = slugifyHeading(inner) || "bolum";
    const count = usedHeadings.get(base) ?? 0;
    usedHeadings.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;
    return `<h${level} id="${id}"><a class="heading-anchor" href="#${id}">${inner}</a></h${level}>`;
  });

  output = output.replace(/href="([^"]+)"/g, (full, href: string) => {
    if (/^(https?:|mailto:|#)/.test(href)) return full;
    const [filePart, anchor] = href.split("#");
    if (!filePart.toLowerCase().endsWith(".md")) return full;
    const decoded = decodeURIComponent(filePart);
    const absolute = path.normalize(path.resolve(path.dirname(document.sourcePath), decoded)).toLocaleLowerCase("tr-TR");
    const target = fileLookup.get(absolute);
    return target ? `href="${target}${anchor ? `#${anchor}` : ""}"` : full;
  });

  return output;
}

export function getProjectStats() {
  const documents = getAllDocuments();
  const ids = new Set(documents.flatMap((document) => document.ruleIds));
  return {
    documents: documents.length,
    rules: ids.size,
    classes: 6,
    regions: 12,
    items: 466,
    abilities: 987,
  };
}
