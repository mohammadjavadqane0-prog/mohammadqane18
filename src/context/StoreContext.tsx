import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { products, type Product } from "../data/products";

export interface CartItem {
  productId: string;
  color: string;
  qty: number;
}

interface DemoUser {
  name: string;
  email: string;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  user: DemoUser | null;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (productId: string, color: string, qty?: number) => void;
  updateQty: (productId: string, color: string, qty: number) => void;
  removeFromCart: (productId: string, color: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  cartDetailed: { product: Product; item: CartItem }[];
  cartCount: number;
  cartTotal: number;
}

const StoreContext = createContext<StoreState | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => load("mv-cart", []));
  const [wishlist, setWishlist] = useState<string[]>(() =>
    load("mv-wishlist", [])
  );
  const [user, setUser] = useState<DemoUser | null>(() =>
    load("mv-user", null)
  );
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("mv-cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("mv-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    localStorage.setItem("mv-user", JSON.stringify(user));
  }, [user]);

  const addToCart = useCallback(
    (productId: string, color: string, qty = 1) => {
      setCart((prev) => {
        const existing = prev.find(
          (i) => i.productId === productId && i.color === color
        );
        if (existing) {
          return prev.map((i) =>
            i === existing ? { ...i, qty: i.qty + qty } : i
          );
        }
        return [...prev, { productId, color, qty }];
      });
      setCartOpen(true);
    },
    []
  );

  const updateQty = useCallback((productId: string, color: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.productId === productId && i.color === color))
        : prev.map((i) =>
            i.productId === productId && i.color === color ? { ...i, qty } : i
          )
    );
  }, []);

  const removeFromCart = useCallback((productId: string, color: string) => {
    setCart((prev) =>
      prev.filter((i) => !(i.productId === productId && i.color === color))
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const login = useCallback((email: string, name?: string) => {
    setUser({
      name: name || email.split("@")[0].replace(/[._]/g, " "),
      email,
    });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const cartDetailed = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return product ? { product, item } : null;
        })
        .filter((x): x is { product: Product; item: CartItem } => x !== null),
    [cart]
  );

  const cartCount = cartDetailed.reduce((sum, x) => sum + x.item.qty, 0);
  const cartTotal = cartDetailed.reduce(
    (sum, x) => sum + x.item.qty * x.product.price,
    0
  );

  const value: StoreState = {
    cart,
    wishlist,
    user,
    cartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    isWishlisted: (id) => wishlist.includes(id),
    login,
    logout,
    cartDetailed,
    cartCount,
    cartTotal,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}
