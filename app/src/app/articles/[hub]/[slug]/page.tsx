import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getArticle,
  getAllArticleSummaries,
  getRelatedArticles,
  getArticleUrl,
  resolveInternalLinks,
  HUB_META,
} from "@/lib/articles";
import { HeroImage, getOgImage, getImageSchema } from "@/components/HeroImage";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const articles = getAllArticleSummaries();
  // Pre-render the first 1000 articles at build (rest via ISR)
  return articles.slice(0, 1000).map((a) => ({
    hub: a.hub,
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ hub: string; slug: string }>;
}): Promise<Metadata> {
  const { hub, slug } = await params;
  const article = getArticle(hub, slug);
  if (!article) return { title: "Article Not Found" };

  const url = getArticleUrl(hub, slug);
  const pageId = `${hub}/${slug}`;
  const ogImage = getOgImage(pageId);
  const metaTitle = article.title.length > 45
    ? `${article.title.slice(0, 45).trim()}... | FormBlends`
    : `${article.title} | FormBlends`;
  const metaDesc = article.description.length > 155
    ? `${article.description.slice(0, 152).trim()}...`
    : article.description;
  return {
    title: metaTitle,
    description: metaDesc,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: "article",
      siteName: "FormBlends",
      ...(ogImage && { images: [ogImage] }),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      ...(ogImage && { images: [ogImage.url] }),
    },
  };
}

function buildJsonLd(article: NonNullable<ReturnType<typeof getArticle>>, url: string, pageId: string) {
  const schemas: Record<string, unknown>[] = [];

  // Primary schema: MedicalWebPage or Article
  schemas.push({
    "@context": "https://schema.org",
    "@type": article.schema === "FAQPage" ? "MedicalWebPage" : article.schema || "MedicalWebPage",
    headline: article.title,
    description: article.description,
    url,
    datePublished: "2026-03-06",
    dateModified: "2026-03-06",
    author: {
      "@type": "Organization",
      name: "FormBlends",
      url: "https://formblends.com",
    },
    publisher: {
      "@type": "Organization",
      name: "FormBlends",
      url: "https://formblends.com",
    },
    reviewedBy: {
      "@type": "Person",
      name: "FormBlends Medical Team",
      jobTitle: "Physician",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    medicalAudience: {
      "@type": "MedicalAudience",
      audienceType: "Patient",
    },
  });

  // Breadcrumb
  const hubMeta = HUB_META[article.hub];
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://formblends.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: hubMeta?.name || article.hub,
        item: `https://formblends.com/articles/${article.hub}`,
      },
      { "@type": "ListItem", position: 3, name: article.title },
    ],
  });

  // FAQPage schema if article has FAQ section
  if (article.hasFaq) {
    const faqPairs: { q: string; a: string }[] = [];
    const faqRegex = /<h3[^>]*>(.*?)<\/h3>\s*<p>(.*?)<\/p>/gi;
    let match;
    // Only look in FAQ section
    const faqSection = article.html.match(
      /(?:<h2[^>]*>.*?(?:FAQ|Frequently Asked).*?<\/h2>)([\s\S]*?)(?=<h2|<section|<footer|$)/i
    );
    const searchIn = faqSection ? faqSection[1] : "";
    while ((match = faqRegex.exec(searchIn)) !== null) {
      const q = match[1].replace(/<[^>]+>/g, "").trim();
      const a = match[2].replace(/<[^>]+>/g, "").replace(/\{\{[^}]+\}\}/g, "").trim();
      if (q && a) faqPairs.push({ q, a });
    }
    if (faqPairs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqPairs.slice(0, 10).map((pair) => ({
          "@type": "Question",
          name: pair.q,
          acceptedAnswer: { "@type": "Answer", text: pair.a },
        })),
      });
    }
  }

  // Speakable
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".article-intro", "h1"],
    },
  });

  // Image schema from media pipeline
  const imageSchema = getImageSchema(pageId);
  if (imageSchema) {
    schemas.push(imageSchema);
  }

  return schemas;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ hub: string; slug: string }>;
}) {
  const { hub, slug } = await params;
  const article = getArticle(hub, slug);
  if (!article) notFound();

  const url = getArticleUrl(hub, slug);
  const pageId = `${hub}/${slug}`;
  const schemas = buildJsonLd(article, url, pageId);
  const related = getRelatedArticles(hub, slug, 6);
  const hubMeta = HUB_META[hub];

  // Clean placeholders and resolve internal links
  const displayHtml = resolveInternalLinks(
    article.html
      .replace(/\{\{CITE:[^}]+\}\}/g, "")
      .replace(/\{\{MEDICAL_REVIEW:[^}]+\}\}/g, "")
      .replace(/\{\{VERIFY_PRICE:[^}]+\}\}/g, "")
  );

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-brand-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href={`/articles/${hub}`}
                  className="hover:text-brand-600 transition-colors"
                >
                  {hubMeta?.name || hub}
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-medium truncate max-w-xs">
                {article.title}
              </li>
            </ol>
          </nav>

          <HeroImage slug={pageId} />

          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Article body */}
            <article className="min-w-0">
              <header className="mb-10">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {article.title}
                </h1>
                {article.description && (
                  <p className="article-intro mt-4 text-xl text-gray-600 leading-relaxed">
                    {article.description}
                  </p>
                )}
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                  <span>Reviewed by FormBlends Medical Team</span>
                  <span>|</span>
                  <time dateTime="2026-03-06">Updated March 2026</time>
                </div>
              </header>

              {/* Mobile TOC */}
              {article.headings.filter((h) => h.level === 2).length > 3 && (
                <details className="lg:hidden mb-8 bg-gray-50 rounded-xl border border-gray-100 p-4">
                  <summary className="text-sm font-bold text-gray-900 cursor-pointer">
                    In This Article
                  </summary>
                  <nav className="mt-3 space-y-2">
                    {article.headings
                      .filter((h) => h.level === 2)
                      .map((h) => (
                        <a
                          key={h.id}
                          href={`#${h.id}`}
                          className="block text-sm text-gray-500 hover:text-brand-600 transition-colors leading-snug"
                        >
                          {h.text}
                        </a>
                      ))}
                  </nav>
                </details>
              )}

              <div
                className="article-content prose prose-lg prose-gray max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-3
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:leading-relaxed prose-p:text-gray-700
                  prose-li:text-gray-700
                  prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900
                  prose-table:border prose-table:border-gray-200
                  prose-th:bg-gray-50 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:text-sm prose-th:font-semibold
                  prose-td:px-4 prose-td:py-3 prose-td:border-t prose-td:border-gray-100 prose-td:text-sm"
                dangerouslySetInnerHTML={{ __html: displayHtml }}
              />

              {/* Medical Disclaimer */}
              <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-500 leading-relaxed">
                  <strong className="text-gray-700">Medical Disclaimer:</strong> This
                  content is for informational purposes only and does not constitute
                  medical advice. Always consult a qualified healthcare provider before
                  starting, stopping, or changing any medication or treatment. FormBlends
                  articles are reviewed by licensed physicians but are not a substitute
                  for a personal medical consultation.
                </p>
              </div>

              {/* Author Box */}
              <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100 flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">FormBlends Medical Team</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Our articles are written and reviewed by licensed physicians and
                    clinical researchers with expertise in endocrinology, metabolic
                    medicine, and peptide therapeutics.
                  </p>
                </div>
              </div>
            </article>

            {/* Sidebar: Table of Contents */}
            {article.headings.length > 3 && (
              <aside className="hidden lg:block">
                <div className="sticky top-32">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                    In This Article
                  </h2>
                  <nav className="space-y-2">
                    {article.headings
                      .filter((h) => h.level === 2)
                      .map((h) => (
                        <a
                          key={h.id}
                          href={`#${h.id}`}
                          className="block text-sm text-gray-500 hover:text-brand-600 transition-colors leading-snug"
                        >
                          {h.text}
                        </a>
                      ))}
                  </nav>

                  {/* CTA */}
                  <div className="mt-8 bg-brand-50 rounded-2xl p-6 border border-brand-100">
                    <p className="font-bold text-gray-900 text-sm">
                      Ready to get started?
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Physician-supervised GLP-1 and peptide therapy, delivered to your door.
                    </p>
                    <Link
                      href="/glp1"
                      className="mt-4 block text-center text-sm font-semibold bg-brand-600 text-white rounded-full py-2.5 hover:bg-brand-700 transition-colors"
                    >
                      Start Your Consultation
                    </Link>
                  </div>
                </div>
              </aside>
            )}
          </div>

          {/* Mobile CTA */}
          <div className="lg:hidden mt-10 bg-brand-50 rounded-2xl p-6 border border-brand-100 text-center">
            <p className="font-bold text-gray-900">Ready to get started?</p>
            <p className="text-sm text-gray-600 mt-1">
              Physician-supervised GLP-1 and peptide therapy, delivered to your door.
            </p>
            <Link
              href="/glp1"
              className="mt-4 inline-block text-sm font-semibold bg-brand-600 text-white rounded-full px-8 py-2.5 hover:bg-brand-700 transition-colors"
            >
              Start Your Consultation
            </Link>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <section className="mt-20 pt-12 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Related Articles
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={`${r.hub}-${r.slug}`}
                    href={`/articles/${r.hub}/${r.slug}`}
                    className="group block bg-gray-50 rounded-2xl p-6 hover:bg-brand-50 transition-colors border border-gray-100 hover:border-brand-200"
                  >
                    <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
                      {HUB_META[r.hub]?.name || r.hub}
                    </span>
                    <h3 className="mt-2 font-bold text-gray-900 group-hover:text-brand-700 transition-colors leading-snug">
                      {r.title}
                    </h3>
                    {r.description && (
                      <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                        {r.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back to hub */}
          <div className="mt-12 text-center">
            <Link
              href={`/articles/${hub}`}
              className="text-brand-600 font-semibold hover:text-brand-700 transition-colors"
            >
              ← Back to {hubMeta?.name || hub}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
