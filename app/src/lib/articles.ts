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
