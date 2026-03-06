import Link from "next/link";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata = {
  title: "All Products | FormBlends",
  description: "Browse our complete catalog of pharmaceutical-grade peptides. GLP-1 weight loss, recovery, performance, anti-aging, and more. 99%+ purity, third-party tested.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category;
  const filtered = activeCategory
    ? products.filter((p) => p.categorySlug === activeCategory)
    : products;

  const activeCategoryInfo = categories.find((c) => c.slug === activeCategory);

  return (
    <div className="pt-32">
      <section className="container-wide mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {activeCategoryInfo ? activeCategoryInfo.name : "All Products"}
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl">
            {activeCategoryInfo
              ? activeCategoryInfo.description
              : "Pharmaceutical-grade peptides for weight loss, recovery, performance, and longevity. Every product third-party tested with 99%+ purity."}
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/products"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !activeCategory
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All ({products.length})
          </Link>
          {categories.map((cat) => {
            const count = products.filter((p) => p.categorySlug === cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.slug
                    ? "bg-brand-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.name} ({count})
              </Link>
            );
          })}
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
            <Link href="/products" className="btn-primary mt-4">View All Products</Link>
          </div>
        )}
      </section>
    </div>
  );
}
