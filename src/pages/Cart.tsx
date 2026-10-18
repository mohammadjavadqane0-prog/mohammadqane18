import React from "react";
import { Link } from "react-router-dom";
import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  formatPrice,
  useStore,
} from "../context/StoreContext";
import { PageHeader } from "../components/PageHeader";
import { categoryMeta } from "../data/products";
import { faNum } from "../lib/fa";
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
                  className="font-heading text-base font-bold text-ink hover:text-gold-muted"
                >
                  {product.name}
                </Link>
                <p className="mt-1 font-body text-xs text-charcoal/55">
                  {categoryMeta[product.category].label} · پرداخت: {item.color}
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
                  aria-label="کاهش تعداد"
                  onClick={() => updateQty(item.productId, item.color, item.qty - 1)}
                >
                  <IconMinus className="h-3.5 w-3.5" />
                </button>
                <span
                  className="w-8 text-center font-heading text-xs font-bold"
                  aria-live="polite"
                >
                  {faNum(item.qty)}
                </span>
                <button
                  className="grid h-8 w-8 place-items-center text-charcoal/70 hover:bg-charcoal/5"
                  aria-label="افزایش تعداد"
                  onClick={() => updateQty(item.productId, item.color, item.qty + 1)}
                >
                  <IconPlus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                className="inline-flex items-center gap-1 font-body text-xs text-charcoal/45 transition-colors hover:text-red-600"
                onClick={() => removeFromCart(item.productId, item.color)}
              >
                <IconClose className="h-3.5 w-3.5" /> حذف
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
      <PageHeader eyebrow="انتخاب شما" title="سبد خرید" />
      <div className="container-luxe py-16 md:py-20">
        {cartDetailed.length === 0 ? (
          <div className="card-line flex flex-col items-center gap-4 px-8 py-20 text-center">
            <p className="font-accent text-3xl text-charcoal/60">
              سبد خرید شما خالی است.
            </p>
            <Link to="/collection" className="btn-gold mt-2">
              مشاهده مجموعه‌ها
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div className="card-line px-6 md:px-8">
              <CartLines />
            </div>
            <aside className="card-line h-fit p-7">
              <h2 className="font-heading text-sm font-bold">
                خلاصه سفارش
              </h2>
              <dl className="mt-5 space-y-3 font-body text-sm text-charcoal/70">
                <div className="flex justify-between">
                  <dt>جمع جزء</dt>
                  <dd className="font-heading font-bold text-ink">
                    {formatPrice(cartTotal)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>ارسال تشریفاتی</dt>
                  <dd>
                    {cartTotal >= FREE_DELIVERY_THRESHOLD
                      ? "رایگان"
                      : formatPrice(DELIVERY_FEE)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-charcoal/10 pt-3 text-base">
                  <dt className="font-heading font-bold text-ink">مبلغ کل</dt>
                  <dd className="font-heading font-bold text-ink">
                    {formatPrice(
                      cartTotal +
                        (cartTotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE)
                    )}
                  </dd>
                </div>
              </dl>
              <Link to="/checkout" className="btn-gold mt-7 w-full">
                ادامه فرایند خرید
              </Link>
              <Link
                to="/collection"
                className="mt-4 block text-center font-heading text-[12px] font-semibold text-gold-muted hover:text-ink"
              >
                ادامه خرید
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
