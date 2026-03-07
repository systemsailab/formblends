"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import {
  createCart,
  addToCart as shopifyAddToCart,
  updateCartLine,
  removeFromCart as shopifyRemoveFromCart,
  getCart,
  type Cart,
  type CartLine,
} from "@/lib/shopify";

interface CartContextValue {
  cart: Cart | null;
  cartOpen: boolean;
  loading: boolean;
  totalQuantity: number;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_ID_KEY = "formblends_cart_id";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Restore cart from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_ID_KEY);
    if (savedCartId) {
      getCart(savedCartId)
        .then((existingCart) => {
          if (existingCart && existingCart.totalQuantity > 0) {
            setCart(existingCart);
          } else {
            localStorage.removeItem(CART_ID_KEY);
          }
        })
        .catch(() => {
          localStorage.removeItem(CART_ID_KEY);
        });
    }
  }, []);

  const ensureCart = useCallback(async (): Promise<Cart> => {
    if (cart) return cart;
    const newCart = await createCart();
    localStorage.setItem(CART_ID_KEY, newCart.id);
    setCart(newCart);
    return newCart;
  }, [cart]);

  const addToCart = useCallback(async (variantId: string, quantity = 1) => {
    setLoading(true);
    try {
      const currentCart = await ensureCart();
      const updatedCart = await shopifyAddToCart(currentCart.id, variantId, quantity);
      setCart(updatedCart);
      localStorage.setItem(CART_ID_KEY, updatedCart.id);
      setCartOpen(true);
    } finally {
      setLoading(false);
    }
  }, [ensureCart]);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cart) return;
    setLoading(true);
    try {
      const updatedCart = await updateCartLine(cart.id, lineId, quantity);
      setCart(updatedCart);
    } finally {
      setLoading(false);
    }
  }, [cart]);

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart) return;
    setLoading(true);
    try {
      const updatedCart = await shopifyRemoveFromCart(cart.id, lineId);
      setCart(updatedCart);
      if (updatedCart.totalQuantity === 0) {
        setCartOpen(false);
      }
    } finally {
      setLoading(false);
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        loading,
        totalQuantity: cart?.totalQuantity ?? 0,
        openCart: () => setCartOpen(true),
        closeCart: () => setCartOpen(false),
        addToCart,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
