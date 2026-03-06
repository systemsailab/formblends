import Link from "next/link";
import { Product } from "@/data/products";
import { StarRating } from "./StarRating";
import { formatPrice, formatNumber, calculateSavings } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image area */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center overflow-hidden">
        {product.badge && (
          <span className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
            {product.badge}
          </span>
        )}
        {product.originalPrice && (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
            {calculateSavings(product.originalPrice, product.price)}% OFF
          </span>
        )}
        {/* Placeholder for product image */}
        <div className="w-32 h-32 bg-gradient-to-br from-brand-200 to-brand-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <span className="text-white font-bold text-2xl">{product.name[0]}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-medium text-brand-600 uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="text-lg font-bold text-gray-900 mt-1 group-hover:text-brand-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-1">
          {product.tagline}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <StarRating rating={product.rating} />
          <span className="text-sm text-gray-500">
            {product.rating} ({formatNumber(product.reviewCount)})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
          <span>{product.unit}</span>
          <span>|</span>
          <span>{product.purity} purity</span>
        </div>

        {/* CTA */}
        <div className="mt-4 bg-brand-600 text-white text-center py-3 rounded-xl font-semibold text-sm group-hover:bg-brand-700 transition-colors">
          View Details
        </div>
      </div>
    </Link>
  );
}
