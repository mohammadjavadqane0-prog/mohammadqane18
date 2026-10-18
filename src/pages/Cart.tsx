import React from "react";
import { Link } from "react-router-dom";
import { formatPrice, useStore } from "../context/StoreContext";
import { PageHeader } from "../components/PageHeader";
import { IconClose, IconMinus, IconPlus } from "../components/icons";

export function CartLines() {
  const { cartDetailed, updateQty, removeFromCart } = useStore();
  return (
    <ul className="divide-y divide-charcoal/10">
      {cartDetailed.map(({ product, item }) => (
        <li key={`${item.productId}-${item.color}`} className="flex gap-5 py-6">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-24 w-20 shrink-0 object-cover"
            loading="lazy"
          />
          <div className="flex flex-1 flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link
                  to={`/product/${product.slug}`}
                  className="font-heading text-base font-bold tracking-wide text-ink hover:text-gold-muted"
                >
                  {product.name}
                </Link>
                <p className="mt-1 font-body text-xs text-charcoal/55">
                  {product.category} · Finish: {item.color}
                </p>
              </div>
              <p className="whitespace-nowrap font-heading text-sm font-bold">
                {formatPrice(product.price * item.qty)}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center border border-charcoal/15 bg-white">
                <button
                  className="grid h-8 w-8 place-items-center text-charcoal/70 hover:bg-charcoal/5"
                  aria-label="Decrease quantity"
                  onClick={() => updateQty(item.productId, item.color, item.qty - 1)}
                >
                  <IconMinus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center font-heading text-xs font-bold" aria-live="polite">
                  {item.qty}
                </span>
                <button
                  className="grid h-8 w-8 place-items-center text-charcoal/70 hover:bg-charcoal/5"
                  aria-label="Increase quantity"
                  onClick={() => updateQty(item.productId, item.color, item.qty + 1)}
                >
                  <IconPlus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                className="inline-flex items-center gap-1 font-body text-xs text-charcoal/45 transition-colors hover:text-red-600"
                onClick={() => removeFromCart(item.productId, item.color)}
              >
                <IconClose className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function CartPage() {
  const { cartDetailed, cartTotal } = useStore();

  return (
    <main>
      <PageHeader eyebrow="Your Selection" title="Shopping Cart" />
      <div className="container-luxe py-16 md:py-20">
        {cartDetailed.length === 0 ? (
          <div className="card-line flex flex-col items-center gap-4 px-8 py-20 text-center">
            <p className="font-accent text-3xl italic text-charcoal/60">
              Your cart is empty.
            </p>
            <Link to="/collection" className="btn-gold mt-2">
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div className="card-line px-6 md:px-8">
              <CartLines />
            </div>
            <aside className="card-line h-fit p-7">
              <h2 className="font-heading text-sm font-bold uppercase tracking-wide2">
                Order Summary
              </h2>
              <dl className="mt-5 space-y-3 font-body text-sm text-charcoal/70">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="font-heading font-bold text-ink">
                    {formatPrice(cartTotal)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>White-glove delivery</dt>
                  <dd>{cartTotal >= 1000 ? "Included" : formatPrice(120)}</dd>
                </div>
                <div className="flex justify-between border-t border-charcoal/10 pt-3 text-base">
                  <dt className="font-heading font-bold text-ink">Estimated total</dt>
                  <dd className="font-heading font-bold text-ink">
                    {formatPrice(cartTotal + (cartTotal >= 1000 ? 0 : 120))}
                  </dd>
                </div>
              </dl>
              <Link to="/checkout" className="btn-gold mt-7 w-full">
                Proceed to Checkout
              </Link>
              <Link
                to="/collection"
                className="mt-4 block text-center font-heading text-[11px] font-semibold uppercase tracking-wide2 text-gold-muted hover:text-ink"
              >
                Continue browsing
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
