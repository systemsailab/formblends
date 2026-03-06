"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/data/products";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-brand-700 text-white text-center text-sm py-2 px-4">
        <p>
          Free shipping on orders over $150 | All products third-party tested
          for 99%+ purity{" "}
          <Link href="/products" className="underline font-medium ml-1">
            Shop Now
          </Link>
        </p>
      </div>

      <nav className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Form
              </span>
              <span className="text-xl font-bold text-brand-600 tracking-tight">
                Blends
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/glp1"
              className="text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors flex items-center gap-1"
            >
              <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
              GLP-1 Weight Loss
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-1">
                Products
                <svg
                  className={`w-4 h-4 transition-transform ${productsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {productsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[600px]">
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/products?category=${cat.slug}`}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-brand-200 transition-colors">
                          <span className="text-brand-700 text-lg">
                            {getCategoryIcon(cat.slug)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {cat.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                            {cat.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <Link
                      href="/products"
                      className="col-span-2 text-center text-sm font-semibold text-brand-600 hover:text-brand-700 mt-2 pt-3 border-t border-gray-100"
                    >
                      View All Products
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/articles"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Articles
            </Link>
            <Link
              href="/science"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Science
            </Link>
            <Link
              href="/reviews"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/products"
              className="btn-primary !py-3 !px-6 !text-sm"
            >
              Shop Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-6 border-t border-gray-100 pt-4">
            <div className="flex flex-col gap-3">
              <Link href="/glp1" className="text-base font-semibold text-brand-700 py-2" onClick={() => setMobileOpen(false)}>
                GLP-1 Weight Loss
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/products?category=${cat.slug}`}
                  className="text-base text-gray-700 py-2 pl-4"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <Link href="/articles" className="text-base text-gray-700 py-2" onClick={() => setMobileOpen(false)}>Articles</Link>
              <Link href="/science" className="text-base text-gray-700 py-2" onClick={() => setMobileOpen(false)}>Science</Link>
              <Link href="/reviews" className="text-base text-gray-700 py-2" onClick={() => setMobileOpen(false)}>Reviews</Link>
              <Link href="/about" className="text-base text-gray-700 py-2" onClick={() => setMobileOpen(false)}>About</Link>
              <Link href="/products" className="btn-primary text-center mt-2" onClick={() => setMobileOpen(false)}>
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function getCategoryIcon(slug: string) {
  const icons: Record<string, string> = {
    glp1: "\u2B06",
    recovery: "\u2764",
    growth: "\u26A1",
    "anti-aging": "\u2728",
    cognitive: "\uD83E\uDDE0",
    immune: "\uD83D\uDEE1",
    "skin-hair": "\u2728",
    "sexual-wellness": "\uD83D\uDD25",
  };
  return icons[slug] || "\u2022";
}
