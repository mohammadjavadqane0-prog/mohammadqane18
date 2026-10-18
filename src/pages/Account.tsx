import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice, useStore } from "../context/StoreContext";
import { products } from "../data/products";
import { PageHeader } from "../components/PageHeader";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { faNum } from "../lib/fa";

export default function AccountPage() {
  const { user, login, logout, wishlist, cartCount, cartDetailed, cartTotal } =
    useStore();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("لطفاً یک ایمیل معتبر وارد کنید.");
      return;
    }
    if (password.length < 6) {
      setError("رمز عبور باید دست‌کم ۶ نویسه باشد.");
      return;
    }
    setError("");
    login(email.trim(), name.trim() || undefined);
  };

  if (!user) {
    return (
      <main>
        <PageHeader
          eyebrow="میزون ور"
          title={mode === "login" ? "ورود" : "ثبت‌نام"}
        />
        <div className="container-luxe max-w-md py-16 md:py-20">
          <div className="mb-6 border border-gold/30 bg-gold/10 px-5 py-3 font-body text-xs text-charcoal/75">
            <strong className="font-heading font-semibold">حساب نمایشی.</strong>{" "}
            در این پیش‌نمایش، ورود فقط در مرورگر شما ذخیره می‌شود — سرور
            احراز هویتی متصل نیست.
          </div>
          <form onSubmit={submit} noValidate className="card-line p-8">
            {mode === "register" && (
              <div className="mb-5">
                <label htmlFor="a-name" className="eyebrow mb-2 block">
                  نام و نام خانوادگی
                </label>
                <input
                  id="a-name"
                  className="input-lux"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            )}
            <div className="mb-5">
              <label htmlFor="a-email" className="eyebrow mb-2 block">
                ایمیل
              </label>
              <input
                id="a-email"
                type="email"
                className="input-lux"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                dir="ltr"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="a-password" className="eyebrow mb-2 block">
                رمز عبور
              </label>
              <input
                id="a-password"
                type="password"
                className="input-lux"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                dir="ltr"
              />
            </div>
            {error && (
              <p className="mt-2 font-body text-xs text-red-600" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="btn-gold mt-6 w-full">
              {mode === "login" ? "ورود" : "ثبت‌نام"}
            </button>
            <p className="mt-5 text-center font-body text-sm text-charcoal/60">
              {mode === "login" ? "با میزون ور آشنا نیستید؟" : "قبلاً عضو شده‌اید؟"}{" "}
              <button
                type="button"
                className="font-heading text-[12px] font-semibold text-gold-muted hover:text-ink"
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setError("");
                }}
              >
                {mode === "login" ? "ثبت‌نام" : "ورود"}
              </button>
            </p>
            <p className="mt-3 text-center font-body text-xs text-charcoal/45">
              <button
                type="button"
                className="text-gold-muted hover:text-ink"
                onClick={() =>
                  setError("بازیابی رمز عبور در نسخه نمایشی فعال نیست.")
                }
              >
                فراموشی رمز عبور
              </button>
            </p>
          </form>
        </div>
      </main>
    );
  }

  const savedAddresses = [
    {
      label: "خانه",
      lines: ["تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۴", "کد پستی: ۱۹۶۵۸۴۳۳۱۲"],
    },
  ];

  return (
    <main>
      <PageHeader
        eyebrow={`خوش آمدید، ${user.name.split(" ")[0]}`}
        title="حساب کاربری من"
      />
      <div className="container-luxe grid gap-10 py-16 md:grid-cols-[1fr_1.6fr] md:py-20">
        <aside className="card-line h-fit p-7">
          <p className="font-heading text-sm font-bold text-ink">
            {user.name}
          </p>
          <p className="mt-1 font-body text-xs text-charcoal/55" dir="ltr" style={{ textAlign: "start" }}>
            {user.email}
          </p>
          <dl className="mt-6 space-y-3 font-body text-sm text-charcoal/70">
            <div className="flex justify-between border-t border-charcoal/10 pt-3">
              <dt>علاقه‌مندی‌ها</dt>
              <dd className="font-heading font-bold text-ink">{faNum(wishlist.length)}</dd>
            </div>
            <div className="flex justify-between border-t border-charcoal/10 pt-3">
              <dt>سبد خرید</dt>
              <dd className="font-heading font-bold text-ink">{faNum(cartCount)}</dd>
            </div>
            <div className="flex justify-between border-t border-charcoal/10 pt-3">
              <dt>جمع جزء سبد</dt>
              <dd className="font-heading font-bold text-ink">
                {formatPrice(cartTotal)}
              </dd>
            </div>
          </dl>
          <button
            className="btn-outline-dark mt-7 w-full"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            خروج از حساب
          </button>
        </aside>

        <div className="space-y-12">
          <section aria-label="سفارش‌های من">
            <h2 className="font-heading text-xl font-bold text-ink">
              سفارش‌های من
            </h2>
            {cartDetailed.length === 0 ? (
              <p className="mt-4 font-body text-sm text-charcoal/60">
                هنوز سفارشی ثبت نشده — سفارش‌های نمایشی شما اینجا دیده می‌شوند.
              </p>
            ) : (
              <div className="card-line mt-4 px-6">
                <p className="py-4 font-body text-sm text-charcoal/70">
                  سبد فعلی: {faNum(cartCount)} قطعه · {formatPrice(cartTotal)} —{" "}
                  <Link
                    to="/cart"
                    className="font-heading text-[12px] font-semibold text-gold-muted hover:text-ink"
                  >
                    مشاهده سبد
                  </Link>
                </p>
              </div>
            )}
          </section>

          <section aria-label="نشانی‌های ذخیره‌شده">
            <h2 className="font-heading text-xl font-bold text-ink">
              نشانی‌های ذخیره‌شده
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {savedAddresses.map((a) => (
                <div key={a.label} className="card-line p-5">
                  <p className="eyebrow">{a.label}</p>
                  {a.lines.map((l) => (
                    <p key={l} className="mt-1 font-body text-sm text-charcoal/70">
                      {l}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section aria-label="علاقه‌مندی‌های من">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-ink">
                علاقه‌مندی‌های من
              </h2>
              <Link
                to="/wishlist"
                className="font-heading text-[12px] font-semibold text-gold-muted hover:text-ink"
              >
                مشاهده همه
              </Link>
            </div>
            {wishlist.length === 0 ? (
              <p className="mt-4 font-body text-sm text-charcoal/60">
                هنوز چیزی ذخیره نکرده‌اید — روی قلب هر قطعه‌ای که دوست دارید بزنید.
              </p>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3">
                {wishlist
                  .map((id) => products.find((p) => p.id === id))
                  .filter((p): p is NonNullable<typeof p> => !!p)
                  .slice(0, 3)
                  .map((p, i) => (
                    <Reveal key={p.id} delay={i * 80}>
                      <ProductCard product={p} />
                    </Reveal>
                  ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
