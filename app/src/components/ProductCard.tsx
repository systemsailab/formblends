import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { StarRating } from "./StarRating";
import { formatPrice, formatNumber, calculateSavings } from "@/lib/utils";

export function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group bg-white rounded-2xl border border-gray-100 hover:border-brand-200 transition-all duration-500 overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-1 ${featured ? "lg:col-span-2 lg:flex-row" : ""}`}
    >
      {/* Image area */}
      <div className={`relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden ${featured ? "lg:w-1/2 aspect-[4/3]" : "aspect-square"}`}>
        {product.badge && (
          <span className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-md">
            {product.badge}
          </span>
        )}
        {product.originalPrice && (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-md">
            Save {calculateSavings(product.originalPrice, product.price)}%
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className={`p-5 flex flex-col flex-1 ${featured ? "lg:p-8 lg:justify-center" : ""}`}>
        <span className="text-xs font-semibold text-brand-600 uppercase tracking-widest">
          {product.category}
        </span>
        <h3 className={`font-bold text-gray-900 mt-1.5 group-hover:text-brand-700 transition-colors ${featured ? "text-2xl" : "text-lg"}`}>
          {product.name}
        </h3>
        <p className={`text-gray-500 mt-2 flex-1 ${featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"}`}>
          {featured ? product.description : product.tagline}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <StarRating rating={product.rating} />
          <span className="text-sm font-medium text-gray-600">
            {product.rating}
          </span>
          <span className="text-sm text-gray-400">
            ({formatNumber(product.reviewCount)})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className={`font-bold text-gray-900 ${featured ? "text-2xl" : "text-xl"}`}>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="text-xs text-gray-400 ml-auto">{product.purity} pure</span>
        </div>

        {/* CTA */}
        <div className={`mt-4 bg-gray-900 text-white text-center py-3 rounded-xl font-semibold text-sm group-hover:bg-brand-600 transition-colors duration-300 ${featured ? "py-4 text-base" : ""}`}>
          View Product
        </div>
      </div>
    </Link>
  );
}
