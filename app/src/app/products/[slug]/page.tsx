import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products, getProductBySlug, getProductsByCategory } from "@/data/products";
import { getTestimonialsByProduct } from "@/data/testimonials";
import { StarRating } from "@/components/StarRating";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, formatNumber, calculateSavings } from "@/lib/utils";
import { StickyCartBar } from "@/components/StickyCartBar";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const url = `https://formblends.com/products/${slug}`;
  return {
    title: `${product.name} | FormBlends`,
    description: product.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${product.name} | FormBlends`,
      description: product.description,
      url,
      type: "website",
      siteName: "FormBlends",
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const reviews = getTestimonialsByProduct(product.slug);
  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://formblends.com${product.image}`,
    brand: { "@type": "Brand", name: "FormBlends" },
    manufacturer: { "@type": "Organization", name: "FormBlends" },
    sku: product.slug,
    url: `https://formblends.com/products/${product.slug}`,
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "FormBlends" },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 5, unitCode: "DAY" },
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toString(),
      reviewCount: product.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: r.rating.toString(), bestRating: "5" },
      author: { "@type": "Person", name: r.name },
      reviewBody: r.longQuote,
      datePublished: "2026-03-01",
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://formblends.com" },
      { "@type": "ListItem", position: 2, name: "Products", item: "https://formblends.com/products" },
      { "@type": "ListItem", position: 3, name: product.category, item: `https://formblends.com/products?category=${product.categorySlug}` },
      { "@type": "ListItem", position: 4, name: product.name },
    ],
  };

  return (
    <div className="pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gray-600">Products</Link>
          <span>/</span>
          <Link href={`/products?category=${product.categorySlug}`} className="hover:text-gray-600">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-700">{product.name}</span>
        </nav>
      </div>

      {/* Product Hero */}
      <section className="container-wide mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image */}
          <div className="relative">
            <div className="sticky top-32">
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl aspect-square overflow-hidden">
                {product.badge && (
                  <span className="absolute top-6 left-6 bg-brand-600 text-white text-sm font-bold px-4 py-2 rounded-full z-10 shadow-md">
                    {product.badge}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="absolute top-6 right-6 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full z-10 shadow-md">
                    Save {calculateSavings(product.originalPrice, product.price)}%
                  </span>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Trust badges under image */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-sm font-bold text-brand-600">{product.purity}</p>
                  <p className="text-xs text-gray-500">HPLC Verified</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-sm font-bold text-brand-600">COA</p>
                  <p className="text-xs text-gray-500">Available</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-sm font-bold text-brand-600">ISO</p>
                  <p className="text-xs text-gray-500">Certified Lab</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
              {product.category}
            </span>

            <h1 className="mt-2 text-4xl lg:text-5xl font-bold text-gray-900">
              {product.name}
            </h1>

            <p className="mt-2 text-xl text-gray-500">{product.tagline}</p>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-3">
              <StarRating rating={product.rating} size="md" />
              <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500">{formatNumber(product.reviewCount)} reviews</span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-end gap-3">
              <span className="text-4xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through mb-1">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full mb-1">
                    Save {calculateSavings(product.originalPrice, product.price)}%
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {product.unit} | {product.concentration}
            </p>

            {/* Add to cart */}
            <div className="mt-8 space-y-3">
              <button className="w-full btn-primary !text-lg !py-5">
                Add to Cart - {formatPrice(product.price)}
              </button>
              <button className="w-full btn-secondary">
                Subscribe & Save 15%
              </button>
            </div>

            {/* Shipping info */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free shipping over $150
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Same-day shipping
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                30-day guarantee
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Temperature controlled
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {product.name}</h2>
              <div className="prose prose-gray max-w-none">
                {product.longDescription.split("\n\n").map((p, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>
                ))}
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Science */}
            <div className="bg-accent-50 rounded-2xl p-6 border border-accent-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Published Research
              </h3>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                {product.scienceNotes}
              </p>
              <Link href="/science" className="text-sm text-accent-600 font-semibold mt-3 inline-flex items-center gap-1 hover:text-accent-700">
                View Full Research Library
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews for this product */}
      {reviews.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-wide mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Customer Reviews for {product.name}
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {reviews.map((r) => (
                <div key={r.id} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={r.rating} />
                    <span className="text-sm text-brand-600 font-medium">Verified Purchase</span>
                  </div>
                  {r.weightLost && (
                    <span className="inline-block bg-brand-100 text-brand-800 text-sm font-bold px-3 py-1 rounded-full mb-3">
                      Lost {r.weightLost}
                    </span>
                  )}
                  <p className="text-gray-700 leading-relaxed">&ldquo;{r.longQuote}&rdquo;</p>
                  <div className="mt-4 flex items-center gap-3 pt-3 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0">
                      <Image src={r.avatar} alt={r.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{r.name}, {r.age}</p>
                      <p className="text-xs text-gray-500">{r.location} | {r.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {related.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-wide mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Related Products
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
      <StickyCartBar productName={product.name} price={product.price} originalPrice={product.originalPrice} />
    </div>
  );
}
