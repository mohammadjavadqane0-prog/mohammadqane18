import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice, useStore } from "../context/StoreContext";
import type { Product } from "../data/products";
import { IconClose, IconMinus, IconPlus } from "./icons";
import { WishlistButton } from "./WishlistButton";

export function QuickViewModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addToCart } = useStore();
  const [color, setColor] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} quick view`}
    >
      <div
        className="absolute inset-0 bg-forest-deepest/75 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative z-10 grid w-full max-w-3xl animate-scale-in overflow-hidden bg-ivory shadow-2xl md:grid-cols-2">
        <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[420px]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute right-3 top-3">
            <WishlistButton productId={product.id} className="!border-white/60" />
          </div>
        </div>
        <div className="relative flex flex-col p-7 md:p-9">
          <button
            onClick={onClose}
            aria-label="Close quick view"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-charcoal/15 text-charcoal/70 transition-colors hover:bg-charcoal hover:text-ivory"
          >
            <IconClose className="h-4 w-4" />
          </button>
          <p className="eyebrow">{product.category}</p>
          <h3 className="mt-2 font-heading text-2xl font-bold tracking-wide text-ink">
            {product.name}
          </h3>
          <p className="mt-2 font-heading text-lg font-bold text-gold-muted">
            {formatPrice(product.price)}
          </p>
          <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/75">
            {product.description}
          </p>

          <div className="mt-5">
            <p className="font-heading text-[10px] font-semibold uppercase tracking-wide2 text-charcoal/60">
              Finish — {color}
            </p>
            <div className="mt-2 flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  title={c.name}
                  aria-label={c.name}
                  aria-pressed={color === c.name}
                  onClick={() => setColor(c.name)}
                  className={`h-7 w-7 rounded-full border-2 transition-all duration-300 ${
                    color === c.name
                      ? "border-gold scale-110"
                      : "border-charcoal/15 hover:border-charcoal/40"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-charcoal/15">
                <button
                  className="grid h-10 w-10 place-items-center text-charcoal/70 transition-colors hover:bg-charcoal/5"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <IconMinus />
                </button>
                <span className="w-8 text-center font-heading text-sm font-bold" aria-live="polite">
                  {qty}
                </span>
                <button
                  className="grid h-10 w-10 place-items-center text-charcoal/70 transition-colors hover:bg-charcoal/5"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(9, q + 1))}
                >
                  <IconPlus />
                </button>
              </div>
              <button
                className="btn-gold flex-1"
                onClick={() => {
                  addToCart(product.id, color, qty);
                  onClose();
                }}
              >
                Add to Cart
              </button>
            </div>
            <Link
              to={`/product/${product.slug}`}
              className="mt-3 block text-center font-heading text-[11px] font-semibold uppercase tracking-wide2 text-gold-muted underline-offset-4 hover:underline"
            >
              View full details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
