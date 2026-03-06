import Link from "next/link";
import type { Metadata } from "next";
import { getArticleHubs, getArticlesByHub, HUB_META } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles & Guides | Form Blends",
  description:
    "Evidence-based articles on GLP-1 weight loss, peptide therapy, and health optimization. Reviewed by licensed physicians.",
  alternates: { canonical: "https://formblends.com/articles" },
};

export default function ArticlesIndex() {
  const hubs = getArticleHubs();

  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
            Resources
          </span>
          <h1 className="mt-3 text-4xl lg:text-5xl font-bold text-gray-900">
            Articles & Guides
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            Evidence-based health information reviewed by licensed physicians.
            Covering GLP-1 medications, peptide therapy, and health optimization.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hubs.map((hub) => {
            const meta = HUB_META[hub];
            const count = getArticlesByHub(hub).length;
            return (
              <Link
                key={hub}
                href={`/articles/${hub}`}
                className="group block bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:from-brand-50 hover:to-brand-100 transition-all border border-gray-100 hover:border-brand-200"
              >
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-brand-700 transition-colors">
                  {meta.name}
                </h2>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                  {meta.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {count} articles
                  </span>
                  <span className="text-brand-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Browse
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
