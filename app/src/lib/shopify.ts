/**
 * Shopify Storefront API client
 *
 * Setup:
 * 1. Create a Shopify store (or use an existing one)
 * 2. Go to Settings > Apps and sales channels > Develop apps
 * 3. Create a new app, enable Storefront API access
 * 4. Grant these scopes: unauthenticated_read_product_listings,
 *    unauthenticated_write_checkouts, unauthenticated_read_checkouts
 * 5. Copy the Storefront access token
 * 6. Add to .env.local:
 *    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
 *    NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-token
 */

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || "";
const apiVersion = "2024-10";

export function getStorefrontUrl() {
  return `https://${domain}/api/${apiVersion}/graphql.json`;
}

export function getStorefrontHeaders() {
  return {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": token,
  };
}

export async function storefrontFetch<T = unknown>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const res = await fetch(getStorefrontUrl(), {
    method: "POST",
    headers: getStorefrontHeaders(),
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Shopify Storefront API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(", "));
  }

  return json.data as T;
}

// ---- Cart Mutations ----

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              image {
                url
                altText
              }
              price {
                amount
                currencyCode
              }
              product {
                title
                handle
              }
            }
          }
        }
      }
    }
  }
`;

export interface CartLine {
  id: string;
  quantity: number;
  cost: { totalAmount: { amount: string; currencyCode: string } };
  merchandise: {
    id: string;
    title: string;
    image?: { url: string; altText?: string };
    price: { amount: string; currencyCode: string };
    product: { title: string; handle: string };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: { amount: string; currencyCode: string };
    subtotalAmount: { amount: string; currencyCode: string };
  };
  lines: { edges: { node: CartLine }[] };
}

export async function createCart(): Promise<Cart> {
  const data = await storefrontFetch<{ cartCreate: { cart: Cart } }>(`
    mutation {
      cartCreate {
        cart { ...CartFields }
      }
    }
    ${CART_FRAGMENT}
  `);
  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<Cart> {
  const data = await storefrontFetch<{ cartLinesAdd: { cart: Cart } }>(`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
      }
    }
    ${CART_FRAGMENT}
  `, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });
  return data.cartLinesAdd.cart;
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const data = await storefrontFetch<{ cartLinesUpdate: { cart: Cart } }>(`
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
      }
    }
    ${CART_FRAGMENT}
  `, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(
  cartId: string,
  lineId: string
): Promise<Cart> {
  const data = await storefrontFetch<{ cartLinesRemove: { cart: Cart } }>(`
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
      }
    }
    ${CART_FRAGMENT}
  `, {
    cartId,
    lineIds: [lineId],
  });
  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await storefrontFetch<{ cart: Cart | null }>(`
    query getCart($cartId: ID!) {
      cart(id: $cartId) { ...CartFields }
    }
    ${CART_FRAGMENT}
  `, { cartId });
  return data.cart;
}

// ---- Product Queries ----

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        price: { amount: string; currencyCode: string };
        availableForSale: boolean;
      };
    }[];
  };
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await storefrontFetch<{ productByHandle: ShopifyProduct | null }>(`
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        handle
        title
        variants(first: 10) {
          edges {
            node {
              id
              title
              price { amount currencyCode }
              availableForSale
            }
          }
        }
      }
    }
  `, { handle });
  return data.productByHandle;
}
