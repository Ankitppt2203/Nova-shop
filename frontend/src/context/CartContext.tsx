/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type Product } from "../lib/products";

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface WishlistItem {
  product: Product;
}

interface ToastState {
  id: number;
  message: string;
}

interface ServerCartItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  wishlistItems: WishlistItem[];
  count: number;
  wishlistCount: number;
  subtotal: number;
  toast: ToastState | null;
  loading: boolean;
  error: string | null;
  refreshCart: () => Promise<void>;
  addToCart: (product: Product, quantity?: number) => Promise<boolean>;
  removeFromCart: (cartItemId: string) => Promise<boolean>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  dismissToast: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";
const WISHLIST_STORAGE_KEY = "nova-shop-wishlist";

const CartContext = createContext<CartContextValue | null>(null);

async function requestJson<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  let data: unknown = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof (data as { message?: unknown }).message === "string"
        ? (data as { message: string }).message
        : `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data as T;
}

function mapServerCartItem(item: ServerCartItem): CartItem {
  const product = getProduct(item.productId);

  if (product) {
    return {
      id: item._id,
      product,
      quantity: item.quantity,
    };
  }

  return {
    id: item._id,
    product: {
      id: item.productId,
      name: item.name,
      category: "Home & Living",
      price: item.price,
      description: "",
      image: item.image,
      rating: 0,
      reviews: 0,
    } as Product,
    quantity: item.quantity,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as WishlistItem[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [toast, setToast] = useState<ToastState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCart = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const cart = await requestJson<ServerCartItem[]>("/api/cart");
      setItems(cart.map(mapServerCartItem));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load cart";
      setError(message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch {
      // Storage unavailable â€” wishlist still works in memory.
    }
  }, [wishlistItems]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    void refreshCart();
  }, [refreshCart]);

  const syncCartItem = useCallback((serverItem: ServerCartItem) => {
    const mappedItem = mapServerCartItem(serverItem);

    setItems((prev) => {
      const index = prev.findIndex(
        (item) =>
          item.id === mappedItem.id || item.product.id === mappedItem.product.id
      );

      if (index === -1) {
        return [...prev, mappedItem];
      }

      const next = [...prev];
      next[index] = mappedItem;
      return next;
    });
  }, []);

  const addToCart = useCallback(
    async (product: Product, quantity = 1) => {
      const normalizedQuantity = Math.max(1, Math.floor(quantity));

      try {
        const serverItem = await requestJson<ServerCartItem>("/api/cart", {
          method: "POST",
          body: JSON.stringify({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: normalizedQuantity,
          }),
        });

        syncCartItem(serverItem);
        setError(null);
        setToast({ id: Date.now(), message: `${product.name} added to cart` });
        return true;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unable to add item to cart";
        setError(message);
        setToast({ id: Date.now(), message });
        return false;
      }
    },
    [syncCartItem]
  );

  const removeFromCart = useCallback(
    async (cartItemId: string) => {
      try {
        await requestJson<{ message: string }>(`/api/cart/${cartItemId}`, {
          method: "DELETE",
        });
        setItems((prev) => prev.filter((item) => item.id !== cartItemId));
        setError(null);
        return true;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unable to remove item";
        setError(message);
        setToast({ id: Date.now(), message });
        return false;
      }
    },
    []
  );

  const updateQuantity = useCallback(
    async (cartItemId: string, quantity: number) => {
      const normalizedQuantity = Math.max(1, Math.floor(quantity));

      try {
        const serverItem = await requestJson<ServerCartItem>(
          `/api/cart/${cartItemId}`,
          {
            method: "PATCH",
            body: JSON.stringify({ quantity: normalizedQuantity }),
          }
        );

        syncCartItem(serverItem);
        setError(null);
        return true;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unable to update quantity";
        setError(message);
        setToast({ id: Date.now(), message });
        return false;
      }
    },
    [syncCartItem]
  );

  const clearCart = useCallback(async () => {
    const currentItems = [...items];

    try {
      const results = await Promise.allSettled(
        currentItems.map((item) =>
          requestJson<{ message: string }>(`/api/cart/${item.id}`, {
            method: "DELETE",
          })
        )
      );

      const failedResult = results.find((result) => result.status === "rejected");
      if (failedResult) {
        await refreshCart();
        const reason =
          failedResult.status === "rejected" && failedResult.reason instanceof Error
            ? failedResult.reason.message
            : "Unable to clear cart";
        setError(reason);
        setToast({ id: Date.now(), message: reason });
        return false;
      }

      setItems([]);
      setError(null);
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to clear cart";
      setError(message);
      setToast({ id: Date.now(), message });
      await refreshCart();
      return false;
    }
  }, [items, refreshCart]);

  const dismissToast = useCallback(() => setToast(null), []);
  const toggleWishlist = useCallback((product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.product.id === product.id);
      const next = exists
        ? prev.filter((item) => item.product.id !== product.id)
        : [...prev, { product }];
      setToast({
        id: Date.now(),
        message: exists
          ? `${product.name} removed from wishlist`
          : `${product.name} added to wishlist`,
      });
      return next;
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  }, []);

  const isInWishlist = useCallback(
    (productId: string) =>
      wishlistItems.some((item) => item.product.id === productId),
    [wishlistItems]
  );

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems]);
  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        wishlistItems,
        count,
        wishlistCount,
        subtotal,
        toast,
        loading,
        error,
        refreshCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
