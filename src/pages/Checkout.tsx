import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice, useStore } from "../context/StoreContext";
import { PageHeader } from "../components/PageHeader";
import { faNum, normalizeFa } from "../lib/fa";

interface ShippingForm {
  fullName: string;
  phone: string;
  email: string;
  province: string;
  city: string;
  postal: string;
  address: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

// Iranian provinces
const provinces = [
  "تهران", "البرز", "اصفهان", "آذربایجان شرقی", "آذربایجان غربی",
  "اردبیل", "بوشهر", "چهارمحال و بختیاری", "خراسان جنوبی", "خراسان رضوی",
  "خراسان شمالی", "خوزستان", "زنجان", "سمنان", "سیستان و بلوچستان",
  "فارس", "قزوین", "قم", "کردستان", "کرمان",
  "کرمانشاه", "کهگیلویه و بویراحمد", "گلستان", "گیلان", "لرستان",
  "مازندران", "مرکزی", "هرمزگان", "همدان", "یزد",
];

const initial: ShippingForm = {
  fullName: "",
  phone: "",
  email: "",
  province: "تهران",
  city: "",
  postal: "",
  address: "",
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
        <PageHeader eyebrow="ثبت سفارش" title="چیزی برای ثبت نیست" />
        <div className="container-luxe flex flex-col items-center gap-4 py-20 text-center">
          <p className="font-accent text-2xl text-charcoal/60">
            سبد خرید شما خالی است — ابتدا قطعه‌ای انتخاب کنید.
          </p>
          <Link to="/collection" className="btn-gold">
            مشاهده مجموعه‌ها
          </Link>
        </div>
      </main>
    );
  }

  const delivery = cartTotal >= 1000 ? 0 : 120;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<Record<keyof ShippingForm, string>> = {};
    if (form.fullName.trim().length < 3) errs.fullName = "تکمیل این فیلد الزامی است.";
    // Iranian mobile number: 09xxxxxxxxx (Persian digits are normalized first)
    const phone = normalizeFa(form.phone).replace(/\s/g, "");
    if (!/^09\d{9}$/.test(phone)) errs.phone = "شماره موبایل واردشده معتبر نیست.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "لطفاً یک ایمیل معتبر وارد کنید.";
    if (form.address.trim().length < 5) errs.address = "تکمیل این فیلد الزامی است.";
    if (form.city.trim().length < 2) errs.city = "تکمیل این فیلد الزامی است.";
    // Iranian postal code: exactly 10 digits
    const postal = normalizeFa(form.postal);
    if (!/^\d{10}$/.test(postal)) errs.postal = "کد پستی باید ۱۰ رقم باشد.";
    if (form.cardName.trim().length < 3) errs.cardName = "تکمیل این فیلد الزامی است.";
    const digits = normalizeFa(form.cardNumber).replace(/\s/g, "");
    if (!/^\d{16}$/.test(digits)) errs.cardNumber = "شماره کارت باید ۱۶ رقم باشد.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(normalizeFa(form.cardExpiry.trim())))
      errs.cardExpiry = "قالب صحیح: ماه/سال";
    if (!/^\d{3,4}$/.test(normalizeFa(form.cardCvc.trim()))) errs.cardCvc = "۳ یا ۴ رقم";
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
      <PageHeader eyebrow="ثبت سفارش" title="تکمیل سفارش" />
      <div className="container-luxe py-16 md:py-20">
        <div className="mb-8 border border-gold/30 bg-gold/10 px-5 py-3 font-body text-xs text-charcoal/75">
          <strong className="font-heading font-semibold">ثبت سفارش نمایشی.</strong>{" "}
          هیچ پرداخت واقعی انجام نمی‌شود — برای تجربه‌ی کامل فرایند، از مقادیر
          آزمایشی استفاده کنید.
        </div>
        <form onSubmit={submit} noValidate className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            <section aria-label="اطلاعات ارسال" className="card-line p-7">
              <h2 className="font-heading text-sm font-bold">
                ۱ · اطلاعات ارسال
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {field("fullName", "نام و نام خانوادگی")}
                {field("phone", "شماره موبایل", {
                  placeholder: "۰۹۱۲ ۳۴۵ ۶۷۸۹",
                  inputMode: "tel",
                  dir: "ltr",
                })}
                {field("email", "ایمیل", { type: "email", dir: "ltr" })}
                <div>
                  <label htmlFor="co-province" className="eyebrow mb-2 block">
                    استان
                  </label>
                  <select
                    id="co-province"
                    className="input-lux"
                    value={form.province}
                    onChange={(e) => set("province", e.target.value)}
                  >
                    {provinces.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                {field("city", "شهر")}
                {field("postal", "کد پستی", { inputMode: "numeric" })}
                <div className="sm:col-span-2">
                  {field("address", "نشانی کامل")}
                </div>
              </div>
            </section>

            <section aria-label="روش پرداخت" className="card-line p-7">
              <h2 className="font-heading text-sm font-bold">
                ۲ · روش پرداخت
              </h2>
              <p className="mt-2 font-body text-xs text-charcoal/60">
                پرداخت آنلاین (نمایشی) — درگاه واقعی متصل نیست.
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  {field("cardName", "نام روی کارت")}
                </div>
                <div className="sm:col-span-2">
                  {field("cardNumber", "شماره کارت", {
                    placeholder: "6037 9912 3456 7890",
                    inputMode: "numeric",
                    dir: "ltr",
                  })}
                </div>
                {field("cardExpiry", "انقضا (ماه/سال)", { placeholder: "04/07" })}
                {field("cardCvc", "CVV2", { inputMode: "numeric", dir: "ltr" })}
              </div>
            </section>
          </div>

          <aside className="card-line h-fit p-7" aria-label="خلاصه سفارش">
            <h2 className="font-heading text-sm font-bold">
              خلاصه سفارش
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
                      ×{faNum(item.qty)} · {item.color}
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
                <dt>جمع جزء</dt>
                <dd>{formatPrice(cartTotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>هزینه ارسال</dt>
                <dd>{delivery === 0 ? "رایگان" : formatPrice(delivery)}</dd>
              </div>
              <div className="flex justify-between border-t border-charcoal/10 pt-3 text-base">
                <dt className="font-heading font-bold text-ink">مبلغ کل</dt>
                <dd className="font-heading font-bold text-ink">
                  {formatPrice(cartTotal + delivery)}
                </dd>
              </div>
            </dl>
            <button type="submit" className="btn-gold mt-7 w-full">
              ثبت نهایی سفارش — {formatPrice(cartTotal + delivery)}
            </button>
            <p className="mt-4 text-center font-body text-xs text-charcoal/50">
              با ثبت سفارش، شرایط نمایشی ما را می‌پذیرید. هیچ مبلغی کسر نمی‌شود.
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
}

