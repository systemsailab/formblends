"use client";

import { useState, useEffect } from "react";

interface StickyCartBarProps {
  productName: string;
  price: number;
  originalPrice?: number;
}

export function StickyCartBar({ productName, price, originalPrice }: StickyCartBarProps) {
  const [visible, setVisible] = useState(false);

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
        <button className="bg-brand-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-700 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
