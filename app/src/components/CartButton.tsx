"use client";

import { useCart } from "./CartProvider";

export function CartButton() {
  const { openCart, totalQuantity } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
      aria-label={`Cart (${totalQuantity} items)`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      {totalQuantity > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {totalQuantity > 99 ? "99+" : totalQuantity}
        </span>
      )}
    </button>
  );
}
