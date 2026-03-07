import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  outputFileTracingRoot: path.join(__dirname, ".."),
  outputFileTracingIncludes: {
    "/articles/\\[hub\\]/\\[slug\\]": [
      "../content/articles/**/*.html",
      "../content/articles-index.json",
    ],
    "/articles/\\[hub\\]": [
      "../content/articles-index.json",
    ],
    "/articles": [
      "../content/articles-index.json",
    ],
    "/sitemap.xml": [
      "../content/articles-index.json",
    ],
    "/feed.xml": [
      "../content/articles-index.json",
    ],
  },
};

export default nextConfig;
