"use client";

import { AddToCartButton } from "./AddToCartButton";

interface ProductActionsProps {
  price: number;
  shopifyVariantId?: string;
}

export function ProductActions({ price, shopifyVariantId }: ProductActionsProps) {
  const variantId = shopifyVariantId ?? "";

  return (
    <div className="mt-8 space-y-3">
      <AddToCartButton
        variantId={variantId}
        price={price}
      />
      <AddToCartButton
        variantId={variantId}
        price={price}
        label="Subscribe & Save 15%"
        secondary
      />
      {!shopifyVariantId && (
        <p className="text-xs text-gray-400 text-center mt-1">
          Coming soon - join waitlist for early access
        </p>
      )}
    </div>
  );
}
