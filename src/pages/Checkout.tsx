import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice, useStore } from "../context/StoreContext";
import { PageHeader } from "../components/PageHeader";

interface ShippingForm {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postal: string;
  country: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

const initial: ShippingForm = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  postal: "",
  country: "Belgium",
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
};

export default function CheckoutPage() {
  const { cartDetailed, cartTotal, clearCart, user } = useStore();
  const [form, setForm] = useState<ShippingForm>({
    ...initial,
    email: user?.email ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingForm, string>>>({});
  const navigate = useNavigate();

  const set = (k: keyof ShippingForm, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  if (cartDetailed.length === 0) {
    return (
      <main>
        <PageHeader eyebrow="Checkout" title="Nothing to Check Out" />
        <div className="container-luxe flex flex-col items-center gap-4 py-20 text-center">
          <p className="font-accent text-2xl italic text-charcoal/60">
            Your cart is empty — add a piece first.
          </p>
          <Link to="/collection" className="btn-gold">
            Explore Collection
          </Link>
        </div>
      </main>
    );
  }

  const delivery = cartTotal >= 1000 ? 0 : 120;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<Record<keyof ShippingForm, string>> = {};
    if (form.firstName.trim().length < 2) errs.firstName = "Required";
    if (form.lastName.trim().length < 2) errs.lastName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "Valid email required";
    if (form.address.trim().length < 5) errs.address = "Required";
    if (form.city.trim().length < 2) errs.city = "Required";
    if (form.postal.trim().length < 3) errs.postal = "Required";
    if (form.cardName.trim().length < 3) errs.cardName = "Name on card required";
    const digits = form.cardNumber.replace(/\s/g, "");
    if (!/^\d{13,19}$/.test(digits)) errs.cardNumber = "Enter a valid card number";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.cardExpiry.trim()))
      errs.cardExpiry = "MM/YY";
    if (!/^\d{3,4}$/.test(form.cardCvc.trim())) errs.cardCvc = "3–4 digits";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // Demo checkout: order state only, no real payment is processed.
      sessionStorage.setItem(
        "mv-last-order",
        JSON.stringify({
          number: `MV-${Date.now().toString().slice(-6)}`,
          total: cartTotal + delivery,
          items: cartDetailed.length,
          email: form.email,
        })
      );
      clearCart();
      navigate("/order-confirmation");
    }
  };

  const field = (
    key: keyof ShippingForm,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {}
  ) => (
    <div>
      <label htmlFor={`co-${key}`} className="eyebrow mb-2 block">
        {label}
      </label>
      <input
        id={`co-${key}`}
        className="input-lux"
        value={form[key]}
        onChange={(e) => set(key, e.target.value)}
        aria-invalid={!!errors[key]}
        {...props}
      />
      {errors[key] && (
        <p className="mt-1.5 font-body text-xs text-red-600" role="alert">
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <main>
      <PageHeader eyebrow="Checkout" title="Complete Your Order" />
      <div className="container-luxe py-16 md:py-20">
        <div className="mb-8 border border-gold/30 bg-gold/10 px-5 py-3 font-body text-xs text-charcoal/75">
          <strong className="font-heading font-semibold">Demo checkout.</strong>{" "}
          No real payment is processed — use any test values to complete the
          experience.
        </div>
        <form onSubmit={submit} noValidate className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            <section aria-label="Shipping details" className="card-line p-7">
              <h2 className="font-heading text-sm font-bold uppercase tracking-wide2">
                1 · Shipping Details
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {field("firstName", "First name")}
                {field("lastName", "Last name")}
                {field("email", "Email", { type: "email" })}
                {field("address", "Address")}
                {field("city", "City")}
                {field("postal", "Postal code")}
                <div>
                  <label htmlFor="co-country" className="eyebrow mb-2 block">
                    Country
                  </label>
                  <select
                    id="co-country"
                    className="input-lux"
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                  >
                    {["Belgium", "Germany", "France", "Netherlands", "Denmark", "Italy"].map(
                      (c) => (
                        <option key={c}>{c}</option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </section>

            <section aria-label="Payment" className="card-line p-7">
              <h2 className="font-heading text-sm font-bold uppercase tracking-wide2">
                2 · Payment
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  {field("cardName", "Name on card")}
                </div>
                <div className="sm:col-span-2">
                  {field("cardNumber", "Card number", {
                    placeholder: "4242 4242 4242 4242",
                    inputMode: "numeric",
                  })}
                </div>
                {field("cardExpiry", "Expiry (MM/YY)", { placeholder: "12/29" })}
                {field("cardCvc", "CVC", { inputMode: "numeric" })}
              </div>
            </section>
          </div>

          <aside className="card-line h-fit p-7" aria-label="Order summary">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wide2">
              Order Summary
            </h2>
            <ul className="mt-5 space-y-4">
              {cartDetailed.map(({ product, item }) => (
                <li
                  key={`${item.productId}-${item.color}`}
                  className="flex items-center gap-3"
                >
                  <img
                    src={product.images[0]}
                    alt=""
                    className="h-14 w-12 shrink-0 object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-heading text-sm font-bold">
                      {product.name}
                    </p>
                    <p className="font-body text-xs text-charcoal/55">
                      ×{item.qty} · {item.color}
                    </p>
                  </div>
                  <p className="whitespace-nowrap font-heading text-sm font-bold">
                    {formatPrice(product.price * item.qty)}
                  </p>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-3 border-t border-charcoal/10 pt-5 font-body text-sm text-charcoal/70">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{formatPrice(cartTotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>White-glove delivery</dt>
                <dd>{delivery === 0 ? "Included" : formatPrice(delivery)}</dd>
              </div>
              <div className="flex justify-between border-t border-charcoal/10 pt-3 text-base">
                <dt className="font-heading font-bold text-ink">Total</dt>
                <dd className="font-heading font-bold text-ink">
                  {formatPrice(cartTotal + delivery)}
                </dd>
              </div>
            </dl>
            <button type="submit" className="btn-gold mt-7 w-full">
              Place Order — {formatPrice(cartTotal + delivery)}
            </button>
            <p className="mt-4 text-center font-body text-xs text-charcoal/50">
              By ordering you agree to our demo terms. No card is charged.
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
}
