import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice, useStore } from "../context/StoreContext";
import { IconClose, IconMinus, IconPlus } from "./icons";

export function CartDrawer() {
  const {
    cartOpen,
    closeCart,
    cartDetailed,
    updateQty,
    removeFromCart,
    cartTotal,
    cartCount,
  } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cartOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-[65] ${cartOpen ? "visible" : "invisible"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      <div
        className={`absolute inset-0 bg-forest-deepest/70 backdrop-blur-sm transition-opacity duration-400 ${
          cartOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeCart}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl transition-transform duration-400 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-5">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wide2 text-ink">
            Shopping Cart{" "}
            <span className="text-gold-muted">({cartCount})</span>
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full border border-charcoal/15 text-charcoal/70 transition-colors hover:bg-charcoal hover:text-ivory"
          >
            <IconClose className="h-4 w-4" />
          </button>
        </div>

        {cartDetailed.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="font-accent text-2xl italic text-charcoal/60">
              Your cart is empty.
            </p>
            <p className="font-body text-sm text-charcoal/50">
              Beautiful rooms begin with a single piece.
            </p>
            <Link to="/collection" className="btn-gold" onClick={closeCart}>
              Explore Collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-charcoal/8 overflow-y-auto px-6">
              {cartDetailed.map(({ product, item }) => (
                <li key={`${item.productId}-${item.color}`} className="flex gap-4 py-5">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-20 w-16 shrink-0 object-cover"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          to={`/product/${product.slug}`}
                          className="font-heading text-sm font-bold tracking-wide text-ink hover:text-gold-muted"
                          onClick={closeCart}
                        >
                          {product.name}
                        </Link>
                        <p className="mt-0.5 font-body text-xs text-charcoal/55">
                          Finish: {item.color}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId, item.color)}
                        aria-label={`Remove ${product.name} from cart`}
                        className="text-charcoal/40 transition-colors hover:text-red-500"
                      >
                        <IconClose className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border border-charcoal/15">
                        <button
                          className="grid h-7 w-7 place-items-center text-charcoal/70 hover:bg-charcoal/5"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQty(item.productId, item.color, item.qty - 1)
                          }
                        >
                          <IconMinus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center font-heading text-xs font-bold" aria-live="polite">
                          {item.qty}
                        </span>
                        <button
                          className="grid h-7 w-7 place-items-center text-charcoal/70 hover:bg-charcoal/5"
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQty(item.productId, item.color, item.qty + 1)
                          }
                        >
                          <IconPlus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="font-heading text-sm font-bold text-ink">
                        {formatPrice(product.price * item.qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-charcoal/10 px-6 py-5">
              <div className="flex items-center justify-between">
                <p className="font-heading text-xs font-semibold uppercase tracking-wide2 text-charcoal/60">
                  Subtotal
                </p>
                <p className="font-heading text-lg font-bold text-ink">
                  {formatPrice(cartTotal)}
                </p>
              </div>
              <p className="mt-1 font-body text-xs text-charcoal/50">
                Shipping and white-glove delivery calculated at checkout.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  className="btn-outline-dark"
                  onClick={() => {
                    closeCart();
                    navigate("/cart");
                  }}
                >
                  View Cart
                </button>
                <button
                  className="btn-gold"
                  onClick={() => {
                    closeCart();
                    navigate("/checkout");
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
