import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import { NewsletterForm } from "./NewsletterForm";

const support = [
  { label: "تماس با ما", to: "/contact" },
  { label: "ارسال و بازگشت کالا", to: "/contact" },
  { label: "راهنمای نگهداری", to: "/about" },
  { label: "علاقه‌مندی‌ها", to: "/wishlist" },
];

const company = [
  { label: "درباره ما", to: "/about" },
  { label: "طراحان", to: "/designers" },
  { label: "ترندهای طراحی", to: "/trends" },
  { label: "مجله", to: "/blog" },
];

const legal = ["حریم خصوصی", "قوانین و مقررات", "پیگیری سفارش"];

export function Footer() {
  return (
    <footer className="bg-forest-deep text-ivory">
      <div className="container-luxe py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <span className="font-heading text-xl font-extrabold tracking-[0.2em] text-ivory">
              MAISON VERT
            </span>
            <p className="mt-1 font-heading text-[10px] font-semibold text-gold">
              طراحی مبلمان
            </p>
            <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-ivory/60">
              مبلمانی ماندگار برای زندگی استثنایی. هر قطعه میزون ور توسط یک استاد
              نامدار طراحی و به دست ساخته می‌شود؛ تا نگه داشته شود، نه دور انداخته.
            </p>
            <div className="mt-6 flex gap-3">
              {["اینستاگرام", "پینترست", "یوتیوب"].map((s) => (
                <a
                  key={s}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={s}
                  className="grid h-9 w-9 place-items-center rounded-full border border-ivory/15 font-heading text-[11px] font-semibold text-ivory/60 transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="دسته‌بندی مبلمان">
            <p className="eyebrow">مبلمان</p>
            <ul className="mt-5 space-y-3">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/collection/${c.slug}`}
                    className="font-body text-sm text-ivory/65 transition-colors duration-300 hover:text-gold"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="پشتیبانی و شرکت">
            <p className="eyebrow">پشتیبانی مشتریان</p>
            <ul className="mt-5 space-y-3">
              {support.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="font-body text-sm text-ivory/65 transition-colors duration-300 hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-8">شرکت</p>
            <ul className="mt-5 space-y-3">
              {company.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="font-body text-sm text-ivory/65 transition-colors duration-300 hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow">خبرنامه</p>
            <p className="mt-5 font-accent text-xl text-ivory/80">
              الهام طراحی، مستقیم در ایمیل شما.
            </p>
            <p className="mt-2 font-body text-sm text-ivory/55">
              هر ماه: فضاهای دکوراتیو، یادداشت‌های ترند و قصه‌های آتلیه.
            </p>
            <div className="mt-5">
              <NewsletterForm tone="dark" />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-7 md:flex-row">
          <p className="font-body text-xs text-ivory/40">
            © {new Date().getFullYear()} میزون ور. تمامی حقوق محفوظ است.
          </p>
          <ul className="flex flex-wrap justify-center gap-6">
            {legal.map((l) => (
              <li key={l}>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="font-body text-xs text-ivory/40 transition-colors hover:text-gold"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
