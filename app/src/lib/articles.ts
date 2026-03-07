import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "..", "content", "articles");
const INDEX_PATH = path.join(process.cwd(), "..", "content", "articles-index.json");

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://formblends.com";

export interface ArticleSummary {
  id: string;
  hub: string;
  slug: string;
  title: string;
  description: string;
  schema: string;
  hasFaq: boolean;
  h2Count: number;
  file: string;
}

export interface Article extends ArticleSummary {
  html: string;
  headings: { level: number; text: string; id: string }[];
}

// Hub display names and descriptions
export const HUB_META: Record<string, { name: string; description: string }> = {
  "glp1-hub": {
    name: "GLP-1 Weight Loss",
    description: "Evidence-based guides on semaglutide, tirzepatide, and GLP-1 medications for weight management.",
  },
  "peptide-hub": {
    name: "Peptide Therapy",
    description: "Physician-reviewed guides on BPC-157, TB-500, GHK-Cu, and 20+ therapeutic peptides.",
  },
  "comparison-hub": {
    name: "Provider Comparisons",
    description: "Side-by-side comparisons of telehealth weight loss providers, pricing, and programs.",
  },
  "local-seo": {
    name: "Telehealth by City",
    description: "Find physician-supervised weight loss and peptide therapy available in your area.",
  },
  "lifestyle-hub": {
    name: "Lifestyle & Wellness",
    description: "Nutrition, exercise, and lifestyle optimization guides for weight loss and health.",
  },
  "biohacking-hub": {
    name: "Biohacking",
    description: "Advanced health optimization: mitochondrial support, CGMs, supplements, and longevity science.",
  },
  "aeo-hub": {
    name: "Quick Answers",
    description: "Fast, physician-reviewed answers to the most common GLP-1 and peptide therapy questions.",
  },
  "retatrutide-hub": {
    name: "Retatrutide",
    description: "Everything about Eli Lilly's triple agonist: clinical trials, timeline, dosing, and comparisons.",
  },
};

let _indexCache: ArticleSummary[] | null = null;

function loadIndex(): ArticleSummary[] {
  if (_indexCache) return _indexCache;
  const raw = fs.readFileSync(INDEX_PATH, "utf-8");
  _indexCache = JSON.parse(raw) as ArticleSummary[];
  return _indexCache;
}

export function getAllArticleSummaries(): ArticleSummary[] {
  return loadIndex();
}

export function getArticlesByHub(hub: string): ArticleSummary[] {
  return loadIndex().filter((a) => a.hub === hub);
}

export function getArticleHubs(): string[] {
  return Object.keys(HUB_META);
}

export function getArticle(hub: string, slug: string): Article | null {
  const index = loadIndex();
  const summary = index.find((a) => a.hub === hub && a.slug === slug);
  if (!summary) return null;

  const filePath = path.join(CONTENT_DIR, hub, summary.file);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");

  // Extract just the article body content
  let html = raw;

  // Remove outer HTML wrapper if present
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch) {
    html = articleMatch[1];
  } else {
    // Strip head/body wrappers
    html = html.replace(/<!DOCTYPE[^>]*>/i, "");
    html = html.replace(/<html[^>]*>/i, "");
    html = html.replace(/<\/html>/i, "");
    html = html.replace(/<head>[\s\S]*?<\/head>/i, "");
    html = html.replace(/<body[^>]*>/i, "");
    html = html.replace(/<\/body>/i, "");
  }

  // Extract headings for table of contents
  const headings: Article["headings"] = [];
  const headingRegex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]+>/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60);
    headings.push({ level: parseInt(match[1]), text, id });
  }

  // Add IDs to headings in the HTML
  html = html.replace(/<h([23])([^>]*)>(.*?)<\/h\1>/gi, (full, level, attrs, content) => {
    const text = content.replace(/<[^>]+>/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60);
    if (attrs.includes("id=")) return full;
    return `<h${level} id="${id}"${attrs}>${content}</h${level}>`;
  });

  return { ...summary, html, headings };
}

export function getRelatedArticles(hub: string, slug: string, limit = 6): ArticleSummary[] {
  const index = loadIndex();
  const current = index.find((a) => a.hub === hub && a.slug === slug);
  if (!current) return [];

  // Get articles from same hub first
  const sameHub = index.filter((a) => a.hub === hub && a.slug !== slug);

  // Score by word overlap in slug
  const currentWords = new Set(slug.split("-").filter((w) => w.length > 2));
  const scored = sameHub.map((a) => {
    const words = a.slug.split("-").filter((w) => w.length > 2);
    const overlap = words.filter((w) => currentWords.has(w)).length;
    return { article: a, score: overlap };
  });
  scored.sort((a, b) => b.score - a.score);

  const results = scored.slice(0, limit).map((s) => s.article);

  // If not enough, supplement from other hubs
  if (results.length < limit) {
    const otherHubs = index.filter((a) => a.hub !== hub);
    const otherScored = otherHubs.map((a) => {
      const words = a.slug.split("-").filter((w) => w.length > 2);
      const overlap = words.filter((w) => currentWords.has(w)).length;
      return { article: a, score: overlap };
    });
    otherScored.sort((a, b) => b.score - a.score);
    for (const s of otherScored) {
      if (results.length >= limit) break;
      results.push(s.article);
    }
  }

  return results;
}

export function getArticleUrl(hub: string, slug: string): string {
  return `${SITE_URL}/articles/${hub}/${slug}`;
}

// Internal link resolution: maps keyword phrases to real URLs
let _linkMapCache: Map<string, { url: string; title: string }> | null = null;

function buildLinkMap(): Map<string, { url: string; title: string }> {
  if (_linkMapCache) return _linkMapCache;
  const map = new Map<string, { url: string; title: string }>();

  // Product links
  const productLinks: Record<string, string> = {
    semaglutide: "/products/semaglutide",
    tirzepatide: "/products/tirzepatide",
    liraglutide: "/products/liraglutide",
    retatrutide: "/products/retatrutide",
    cagrilintide: "/products/cagrilintide",
    tesofensine: "/products/tesofensine",
    "aod-9604": "/products/aod-9604",
    "bpc-157": "/products/bpc-157",
    "tb-500": "/products/tb-500",
    "tb-500 fragment": "/products/tb-500-fragment",
    "bpc-157 oral": "/products/pentadecapeptide-bpc",
    ghk: "/products/ghk",
    "ghk-cu": "/products/ghk-cu",
    "cjc-1295": "/products/cjc-1295-ipamorelin",
    "cjc-1295 dac": "/products/cjc-1295-dac",
    ipamorelin: "/products/cjc-1295-ipamorelin",
    sermorelin: "/products/sermorelin",
    tesamorelin: "/products/tesamorelin",
    "ghrp-2": "/products/ghrp-2",
    "ghrp-6": "/products/ghrp-6",
    "mk-677": "/products/mk-677",
    "igf-1": "/products/igf-1-lr3",
    "igf-1 des": "/products/igf-1-des",
    follistatin: "/products/follistatin-344",
    hexarelin: "/products/hexarelin",
    "pt-141": "/products/pt-141",
    selank: "/products/selank",
    semax: "/products/semax",
    "n-acetyl semax": "/products/n-acetyl-semax-amidate",
    "n-acetyl selank": "/products/n-acetyl-selank-amidate",
    dihexa: "/products/dihexa",
    p21: "/products/p21",
    "thymosin-alpha-1": "/products/thymosin-alpha-1",
    thymalin: "/products/ta1-thymalin",
    vip: "/products/vip",
    "ll-37": "/products/ll-37",
    kpv: "/products/kpv",
    epithalon: "/products/epithalon",
    epitalon: "/products/epitalon",
    epithalamin: "/products/epithalamin",
    "nad+": "/products/nad-plus",
    "nad nasal": "/products/nad-nasal",
    "foxo4-dri": "/products/foxo4-dri",
    "ss-31": "/products/ss-31",
    elamipretide: "/products/ss-31",
    humanin: "/products/humanin",
    "5-amino-1mq": "/products/5-amino-1mq",
    "mots-c": "/products/mots-c",
    "melanotan-ii": "/products/melanotan-ii",
    "kisspeptin-10": "/products/kisspeptin-10",
    kisspeptin: "/products/kisspeptin-10",
    gonadorelin: "/products/gonadorelin",
    oxytocin: "/products/oxytocin",
    dsip: "/products/dsip",
    larazotide: "/products/larazotide",
    adipotide: "/products/adipotide",
    aicar: "/products/aicar",
    "hgh fragment": "/products/fragment-176-191",
    "fragment 176-191": "/products/fragment-176-191",
    "ace-031": "/products/ace-031",
    "ahk-cu": "/products/copper-peptide-ahk-cu",
    "snap-8": "/products/snap-8",
    matrixyl: "/products/matrixyl",
    pinealon: "/products/pinealon",
    vesilute: "/products/vesilute",
    "copper-ghk": "/products/ghk-cu",
    "copper peptide": "/products/ghk-cu",
  };
  for (const [key, url] of Object.entries(productLinks)) {
    map.set(key, { url, title: key.toUpperCase() });
  }

  // Key page links
  const pageLinks: Record<string, { url: string; title: string }> = {
    "glp-1 medications": { url: "/glp1", title: "GLP-1 medications" },
    "glp-1 receptor agonist": { url: "/glp1", title: "GLP-1 receptor agonist" },
    "glp-1 weight loss": { url: "/glp1", title: "GLP-1 weight loss" },
    "compounded semaglutide": { url: "/products/semaglutide", title: "compounded semaglutide" },
    "compounded tirzepatide": { url: "/products/tirzepatide", title: "compounded tirzepatide" },
    "semaglutide side effects": { url: "/articles/glp1-hub/semaglutide-side-effects-complete-guide", title: "semaglutide side effects" },
    "best online glp-1 providers 2026": { url: "/articles/comparison-hub/best-online-glp1-providers-2026", title: "best online GLP-1 providers 2026" },
    "best glp-1 programs": { url: "/articles/comparison-hub/best-online-glp1-providers-2026", title: "best GLP-1 programs" },
    "compounded vs brand name glp-1": { url: "/articles/glp1-hub/compounded-vs-brand-name-glp1", title: "compounded vs. brand name GLP-1" },
    "form blends programs": { url: "/glp1", title: "Form Blends programs" },
    "form blends pricing": { url: "/products", title: "Form Blends pricing" },
    "why choose form blends": { url: "/about", title: "why choose Form Blends" },
    "switching to form blends": { url: "/glp1", title: "switching to Form Blends" },
    "wegovy": { url: "/articles/glp1-hub/wegovy-complete-guide", title: "Wegovy" },
    "zepbound": { url: "/articles/glp1-hub/zepbound-complete-guide", title: "Zepbound" },
  };
  for (const [key, val] of Object.entries(pageLinks)) {
    map.set(key, val);
  }

  // Build from article index: use slug words as keys
  const index = loadIndex();
  for (const article of index) {
    const slugKey = article.slug.replace(/-/g, " ");
    if (!map.has(slugKey)) {
      map.set(slugKey, { url: `/articles/${article.hub}/${article.slug}`, title: article.title });
    }
  }

  _linkMapCache = map;
  return map;
}

export function resolveInternalLinks(html: string): string {
  const linkMap = buildLinkMap();

  return html.replace(/\{\{INTERNAL_LINK:([^}]+)\}\}/g, (_match, keyword: string) => {
    const key = keyword.trim().toLowerCase();

    // Direct match
    const direct = linkMap.get(key);
    if (direct) {
      return `<a href="${direct.url}">${direct.title}</a>`;
    }

    // Fuzzy: find best matching article slug
    const keyWords = key.split(/\s+/).filter((w) => w.length > 2);
    let bestUrl = "";
    let bestTitle = "";
    let bestScore = 0;
    for (const [mapKey, val] of linkMap) {
      const mapWords = mapKey.split(/\s+/);
      const overlap = keyWords.filter((w) => mapWords.includes(w)).length;
      if (overlap > bestScore) {
        bestScore = overlap;
        bestUrl = val.url;
        bestTitle = keyword.trim();
      }
    }

    if (bestScore >= 2 && bestUrl) {
      return `<a href="${bestUrl}">${bestTitle}</a>`;
    }

    // Fallback: link to products page with the keyword as anchor text
    return `<a href="/products">${keyword.trim()}</a>`;
  });
}
