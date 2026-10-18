import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice, useStore } from "../context/StoreContext";
import { categoryMeta, badgeLabels, type Product } from "../data/products";
import { QuickViewModal } from "./QuickViewModal";
import { WishlistButton } from "./WishlistButton";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const [quickView, setQuickView] = useState(false);

  return (
    <>
      <article className="group relative">
        <Link
          to={`/product/${product.slug}`}
          className="block overflow-hidden card-line"
          aria-label={`مشاهده ${product.name}`}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-beige/40">
            <img
              src={product.images[0]}
              alt={`${product.name} — ${categoryMeta[product.category].label} میزون ور`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            {product.badge && (
              <span className="absolute left-3 top-3 border border-gold/50 bg-forest-deep/85 px-2.5 py-1 font-heading text-[10px] font-semibold text-gold backdrop-blur">
                {badgeLabels[product.badge]}
              </span>
            )}
            {/* hover actions */}
            <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-center gap-2 bg-gradient-to-t from-forest-deepest/70 to-transparent p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuickView(true);
                }}
                className="rounded-full border border-gold/70 bg-forest-deep/70 px-4 py-2 font-heading text-[11px] font-semibold text-gold backdrop-blur transition-colors duration-300 hover:bg-gold hover:text-forest-deep"
              >
                نمایش سریع
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product.id, product.colors[0].name);
                }}
                className="rounded-full border border-gold/70 bg-forest-deep/70 px-4 py-2 font-heading text-[11px] font-semibold text-gold backdrop-blur transition-colors duration-300 hover:bg-gold hover:text-forest-deep"
              >
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        </Link>

        <div className="absolute right-3 top-3">
          <WishlistButton productId={product.id} />
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <p className="font-heading text-[11px] font-semibold text-gold-muted">
              {categoryMeta[product.category].label}
            </p>
            <Link
              to={`/product/${product.slug}`}
              className="mt-1 block font-heading text-[16px] font-bold text-ink transition-colors duration-300 hover:text-gold-muted"
            >
              {product.name}
            </Link>
            <div className="mt-2 flex items-center gap-1.5">
              {product.colors.map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="h-3 w-3 rounded-full border border-charcoal/15"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
          <p className="whitespace-nowrap font-heading text-sm font-bold text-ink">
            {formatPrice(product.price)}
          </p>
        </div>
      </article>

      {quickView && (
        <QuickViewModal product={product} onClose={() => setQuickView(false)} />
      )}
    </>
  );
}
