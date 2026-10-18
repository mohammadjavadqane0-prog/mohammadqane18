import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../context/StoreContext";
import { IconCheck } from "../components/icons";

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
            Thank You
          </h1>
          {order ? (
            <>
              <p className="mt-4 font-accent text-xl italic text-charcoal/65 md:text-2xl">
                Order {order.number} is confirmed — {order.items} piece
                {order.items === 1 ? "" : "s"}, {formatPrice(order.total)}.
              </p>
              <p className="mt-3 font-body text-sm text-charcoal/55">
                A confirmation would arrive at {order.email}. (Demo order — no
                payment was processed and no email was sent.)
              </p>
            </>
          ) : (
            <p className="mt-4 font-accent text-xl italic text-charcoal/65">
              Your demo order was placed.
            </p>
          )}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/collection" className="btn-gold">
              Continue Shopping
            </Link>
            <Link to="/account" className="btn-outline-dark">
              View Account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
