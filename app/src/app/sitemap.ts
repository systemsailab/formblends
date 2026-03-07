import type { MetadataRoute } from "next";
import { getAllArticleSummaries, getArticleHubs, HUB_META } from "@/lib/articles";
import { products, categories } from "@/data/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://formblends.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/glp1`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/science`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/reviews`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/articles`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  // Product pages
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p.featured ? 0.9 : p.bestseller ? 0.85 : 0.8,
  }));

  // Article hub pages
  const hubPages: MetadataRoute.Sitemap = getArticleHubs().map((hub) => ({
    url: `${SITE_URL}/articles/${hub}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Individual articles
  const articles = getAllArticleSummaries();
  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/articles/${a.hub}/${a.slug}`,
    lastModified: "2026-03-06",
    changeFrequency: "monthly" as const,
    priority: a.h2Count >= 5 ? 0.7 : 0.6,
  }));

  return [...corePages, ...productPages, ...hubPages, ...articlePages];
}
