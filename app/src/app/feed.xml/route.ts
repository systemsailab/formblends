import { getAllArticleSummaries, getArticleUrl, HUB_META } from "@/lib/articles";

export async function GET() {
  const articles = getAllArticleSummaries();
  const latest = articles.slice(0, 50);

  const escapeXml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const items = latest
    .map(
      (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${getArticleUrl(a.hub, a.slug)}</link>
      <guid isPermaLink="true">${getArticleUrl(a.hub, a.slug)}</guid>
      <description>${escapeXml(a.description || "")}</description>
      <category>${escapeXml(HUB_META[a.hub]?.name || a.hub)}</category>
      <pubDate>${new Date("2026-03-06").toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FormBlends Articles</title>
    <link>https://formblends.com/articles</link>
    <description>Evidence-based guides on GLP-1 weight loss, peptide therapy, and health optimization from FormBlends.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://formblends.com/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
