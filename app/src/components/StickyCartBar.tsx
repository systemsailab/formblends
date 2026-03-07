"use client";

import { useState, useEffect } from "react";
import { useCart } from "./CartProvider";

interface StickyCartBarProps {
  productName: string;
  price: number;
  originalPrice?: number;
  shopifyVariantId?: string;
}

export function StickyCartBar({ productName, price, originalPrice, shopifyVariantId }: StickyCartBarProps) {
  const [visible, setVisible] = useState(false);
  const { addToCart, loading } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = async () => {
    if (!shopifyVariantId) return;
    await addToCart(shopifyVariantId);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-900 text-sm">{productName}</span>
          <span className="text-lg font-bold">${price.toFixed(2)}</span>
          {originalPrice !== undefined && (
            <span className="line-through text-gray-400 text-sm">${originalPrice.toFixed(2)}</span>
          )}
        </div>
        <button
          onClick={handleClick}
          disabled={loading || !shopifyVariantId}
          className={`font-semibold px-8 py-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            added
              ? "bg-green-600 text-white"
              : "bg-brand-600 text-white hover:bg-brand-700"
          }`}
        >
          {loading ? "Adding..." : added ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
