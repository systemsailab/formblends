"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

interface AddToCartButtonProps {
  /** Shopify variant GID, e.g. "gid://shopify/ProductVariant/12345" */
  variantId: string;
  price: number;
  label?: string;
  className?: string;
  secondary?: boolean;
}

export function AddToCartButton({
  variantId,
  price,
  label,
  className,
  secondary = false,
}: AddToCartButtonProps) {
  const { addToCart, loading } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = async () => {
    if (!variantId) return;
    await addToCart(variantId);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const buttonLabel = added
    ? "Added!"
    : label ?? `Add to Cart - $${price.toFixed(2)}`;

  if (secondary) {
    return (
      <button
        onClick={handleClick}
        disabled={loading || !variantId}
        className={`w-full btn-secondary disabled:opacity-50 disabled:cursor-not-allowed ${className ?? ""}`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Adding...
          </span>
        ) : (
          buttonLabel
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || !variantId}
      className={`w-full btn-primary !text-lg !py-5 disabled:opacity-50 disabled:cursor-not-allowed ${
        added ? "!bg-green-600 hover:!bg-green-600" : ""
      } ${className ?? ""}`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Adding...
        </span>
      ) : added ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Added!
        </span>
      ) : (
        buttonLabel
      )}
    </button>
  );
}
