import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getArticlesByHub,
  getArticleHubs,
  HUB_META,
} from "@/lib/articles";

export const revalidate = 86400;

export async function generateStaticParams() {
  return getArticleHubs().map((hub) => ({ hub }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ hub: string }>;
}): Promise<Metadata> {
  const { hub } = await params;
  const meta = HUB_META[hub];
  if (!meta) return { title: "Articles | Form Blends" };

  return {
    title: `${meta.name} Articles | Form Blends`,
    description: meta.description,
    alternates: { canonical: `https://formblends.com/articles/${hub}` },
    openGraph: {
      title: `${meta.name} | Form Blends`,
      description: meta.description,
      type: "website",
    },
  };
}

export default async function HubPage({
  params,
}: {
  params: Promise<{ hub: string }>;
}) {
  const { hub } = await params;
  const meta = HUB_META[hub];
  if (!meta) notFound();

  const articles = getArticlesByHub(hub);
  if (articles.length === 0) notFound();

  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-brand-600">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/articles" className="hover:text-brand-600">Articles</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{meta.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {meta.name}
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl">
            {meta.description}
          </p>
          <p className="mt-2 text-sm text-gray-400">
            {articles.length} articles
          </p>
        </header>

        {/* Article grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={`${article.hub}-${article.slug}`}
              href={`/articles/${article.hub}/${article.slug}`}
              className="group block bg-gray-50 rounded-2xl p-6 hover:bg-brand-50 transition-colors border border-gray-100 hover:border-brand-200"
            >
              <h2 className="font-bold text-gray-900 group-hover:text-brand-700 transition-colors leading-snug">
                {article.title}
              </h2>
              {article.description && (
                <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                  {article.description}
                </p>
              )}
            </Link>
          ))}
        </div>

        {/* Back */}
        <div className="mt-12 text-center">
          <Link
            href="/articles"
            className="text-brand-600 font-semibold hover:text-brand-700"
          >
            ← All Article Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
