import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
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
  },
};

export default nextConfig;
