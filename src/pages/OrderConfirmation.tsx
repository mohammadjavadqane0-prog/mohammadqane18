import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../context/StoreContext";
import { IconCheck } from "../components/icons";
import { faNum } from "../lib/fa";

export default function OrderConfirmation() {
  const raw = sessionStorage.getItem("mv-last-order");
  let order: { number: string; total: number; items: number; email: string } | null =
    null;
  try {
    order = raw ? JSON.parse(raw) : null;
  } catch {
    order = null;
  }

  return (
    <main>
      <section className="flex min-h-[70vh] items-center bg-ivory py-24">
        <div className="container-luxe text-center">
          <span className="mx-auto grid h-16 w-16 animate-scale-in place-items-center rounded-full bg-gold text-forest-deep">
            <IconCheck className="h-7 w-7" />
          </span>
          <h1 className="display-title mt-8 text-3xl text-ink md:text-5xl">
            تأیید سفارش
          </h1>
          {order ? (
            <>
              <p className="mt-4 font-accent text-xl text-charcoal/65 md:text-2xl">
                سفارش <span dir="ltr">{order.number}</span> ثبت شد — {faNum(order.items)}{" "}
                قطعه، {formatPrice(order.total)}.
              </p>
              <p className="mt-3 font-body text-sm text-charcoal/55" dir="ltr" style={{ textAlign: "center" }}>
                {order.email}
              </p>
              <p className="mt-3 font-body text-sm text-charcoal/55">
                سفارش نمایشی — هیچ پردازشی انجام نشد و ایمیلی ارسال نشد.
              </p>
            </>
          ) : (
            <p className="mt-4 font-accent text-xl text-charcoal/65">
              سفارش نمایشی شما ثبت شد.
            </p>
          )}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/collection" className="btn-gold">
              ادامه خرید
            </Link>
            <Link to="/account" className="btn-outline-dark">
              حساب کاربری
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
