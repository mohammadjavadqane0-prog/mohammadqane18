import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryStrip } from "../components/CategoryStrip";
import { NewsletterForm } from "../components/NewsletterForm";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { WishlistButton } from "../components/WishlistButton";
import { IconArrowRight, IconHeart } from "../components/icons";
import { useStore, formatPrice } from "../context/StoreContext";
import { products } from "../data/products";
import { designers } from "../data/designers";
import { blogPosts } from "../data/editorial";
import { faNum } from "../lib/fa";

/* ---------------- Section B — Cinematic Hero ---------------- */

function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative flex min-h-[92vh] items-end overflow-hidden bg-forest-deep md:min-h-[100vh]"
      aria-label="میزون ور"
    >
      <div className="absolute inset-0">
        <img
          src="/images/hero-interior.jpg"
          alt="مبل چرم بژ در فضایی جنگلی با نور گرم و چراغ برنجی ایستاده"
          className="h-full w-full object-cover"
        />
        {/* cinematic forest-green grade over the photograph */}
        <div className="absolute inset-0 bg-forest-deep/55 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-nav/90 via-forest-deep/20 to-forest-deepest/85" />
      </div>

      <div className="container-luxe relative z-10 pb-14 pt-32 text-center md:pb-20">
        <p
          className={`eyebrow !text-gold-soft transition-all duration-1000 ${
            ready ? "opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          طراحی ماندگار، تجربه‌ای متفاوت از زندگی
        </p>
        <h1
          className={`display-title mt-4 text-5xl leading-[1.2] text-gold sm:text-6xl md:text-7xl xl:text-8xl transition-all duration-1000 ${
            ready ? "opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          طراحی مبلمان
        </h1>
        <div
          className={`mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 transition-all duration-1000 ${
            ready ? "opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <Link to="/collection" className="btn-gold">
            مشاهده مجموعه‌ها
          </Link>
          <Link to="/about" className="btn-outline-light">
            داستان ما
          </Link>
        </div>
        <div
          className={`mt-10 flex justify-center transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <a
            href="#products"
            className="btn-gold !px-9 !py-2.5 text-[12px]"
            aria-label="رفتن به محصولات"
          >
            مشاهده بیشتر
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section C — Products / Categories ---------------- */

function ProductsIntro() {
  return (
    <section id="products" className="bg-ivory py-20 md:py-28">
      <div className="container-luxe">
        <Reveal className="text-center">
          <h2 className="display-title text-3xl text-ink md:text-5xl">محصولات</h2>
        </Reveal>
        <Reveal delay={120} className="mt-12 md:mt-16">
          <CategoryStrip />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Section D — Featured Product (Drop Chair) ---------------- */

function FeaturedProduct() {
  const { addToCart } = useStore();
  const product = products.find((p) => p.slug === "drop-chair")!;
  const [color, setColor] = useState(product.colors[0].name);

  return (
    <section className="bg-ivory pb-20 pt-4 md:pb-28" aria-label="محصول منتخب">
      <div className="container-luxe">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="relative">
              <img
                src={product.images[0]}
                alt={`${product.name} — نسخه چرم زرد`}
                className="aspect-[4/4.4] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute right-4 top-4">
                <WishlistButton productId={product.id} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="max-w-md">
              <p className="eyebrow">محصول منتخب</p>
              <h3 className="mt-3 font-heading text-4xl font-bold text-ink md:text-5xl">
                {product.name}
              </h3>
              <p className="mt-2 font-accent text-xl text-charcoal/70">
                نسخه چرم زرد
              </p>
              <p className="mt-6 font-body text-sm leading-relaxed text-charcoal/70">
                {product.description}
              </p>
              <p className="mt-5 font-heading text-xl font-bold text-ink">
                {formatPrice(product.price)}
                {product.originalPrice && (
                  <span className="ms-3 text-sm font-medium text-charcoal/40 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </p>
              <div className="mt-5">
                <p className="font-heading text-[11px] font-semibold text-charcoal/60">
                  پرداخت‌های موجود
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
                          ? "scale-110 border-gold"
                          : "border-charcoal/15 hover:border-charcoal/40"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to={`/product/${product.slug}`} className="btn-outline-gold">
                  اطلاعات بیشتر
                </Link>
                <button
                  className="btn-outline-dark"
                  onClick={() => addToCart(product.id, color)}
                >
                  افزودن به سبد خرید
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section E — Signature Collections ---------------- */

const collections = [
  {
    title: "زندگی مدرن",
    text: "سیلوئت‌های کوتاه، مخمل‌های عمیق و نور برنجی — اتاق‌هایی که بعد از تاریکی هم زندگی می‌کنند.",
    image: "/images/collection-modern.jpg",
    to: "/collection/couches",
  },
  {
    title: "راحتی معاصر",
    text: "پوسته‌های مجسمه‌وار و بافت‌های نرم. صندلی‌هایی که در آن‌ها فرو می‌روید و نمی‌خواهید بیرون بیایید.",
    image: "/images/collection-comfort.jpg",
    to: "/collection/armchairs",
  },
  {
    title: "کلاسیک‌های ماندگار",
    text: "چوب صادق، منحنی‌های صبور و اتصالاتی که از دهه‌ها زندگی جلوترند.",
    image: "/images/collection-classics.jpg",
    to: "/collection/tables",
  },
];

function SignatureCollections() {
  return (
    <section className="bg-cream py-20 md:py-28" aria-label="مجموعه‌های امضا">
      <div className="container-luxe">
        <Reveal className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">مجموعه‌های ما</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-ink md:text-4xl">
              مجموعه‌های امضا
            </h2>
          </div>
          <Link
            to="/collection"
            className="group inline-flex items-center gap-2 font-heading text-[12px] font-semibold text-gold-muted transition-colors hover:text-ink"
          >
            مشاهده همه مبلمان
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {collections.map((c, i) => (
            <Reveal key={c.title} delay={i * 120}>
              <Link
                to={c.to}
                className="group relative block overflow-hidden"
                aria-label={`کاوش در ${c.title}`}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deepest/90 via-forest-deep/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="font-heading text-xl font-bold text-ivory">
                    {c.title}
                  </h3>
                  <p className="mt-2 max-w-[280px] font-body text-[13px] leading-relaxed text-ivory/70">
                    {c.text}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 border-b border-gold pb-1 font-heading text-[11px] font-semibold text-gold transition-colors duration-300 group-hover:text-ivory">
                    کاوش
                    <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section F — Bestsellers ---------------- */

function Bestsellers() {
  const items = products.filter((p) => p.bestseller).slice(0, 8);
  return (
    <section className="bg-ivory py-20 md:py-28" aria-label="پرفروش‌ترین مبلمان">
      <div className="container-luxe">
        <Reveal className="text-center">
          <p className="eyebrow">محبوب‌ترین‌ها</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-ink md:text-4xl">
            پرفروش‌ترین‌ها
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 text-center">
          <Link to="/collection" className="btn-outline-dark">
            مشاهده مجموعه کامل
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Section G — Designer Spotlight ---------------- */

function DesignerSpotlight() {
  const designer = designers[1]; // آمارا اوسه‌ای — طراح صندلی دراپ
  return (
    <section className="bg-forest-deep py-20 text-ivory md:py-28" aria-label="نگاهی به طراحان">
      <div className="container-luxe">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="order-2 md:order-1">
            <p className="eyebrow !text-gold">نگاهی به طراحان</p>
            <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
              {designer.name}
            </h2>
            <p className="mt-2 font-accent text-lg text-gold-soft">
              {designer.discipline} · {designer.location}
            </p>
            <p className="mt-6 max-w-lg font-body text-sm leading-relaxed text-ivory/70">
              {designer.bio}
            </p>
            <p className="mt-6 border-s-2 border-gold ps-5 font-accent text-xl text-ivory/85">
              «{designer.philosophy}»
            </p>
            <p className="mt-6 font-heading text-[12px] font-semibold text-gold">
              مجموعه امضا — {designer.signature}
            </p>
            <Link
              to={`/designers/${designer.slug}`}
              className="btn-gold mt-8"
            >
              مشاهده طراح
            </Link>
          </Reveal>
          <Reveal delay={140} className="order-1 md:order-2">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={designer.portrait}
                  alt={`پرتره ${designer.name}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden border border-gold/40 bg-forest-deep px-6 py-4 md:block">
                <p className="font-heading text-[11px] text-gold">
                  در آتلیه
                </p>
                <p className="font-accent text-lg text-ivory/80">
                  {designer.location}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section H — Brand Story ---------------- */

const stats = [
  { value: "۳۸", label: "سال تجربه صنعتگری" },
  { value: "۳", label: "آتلیه در اروپا" },
  { value: "۱۰۰٪", label: "چوب یکپارچه یا تأییدشده" },
  { value: "۲۵ ساله", label: "ضمانت سازه" },
];

function BrandStory() {
  return (
    <section className="bg-ivory py-20 md:py-28" aria-label="داستان برند">
      <div className="container-luxe">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="relative">
              <img
                src="/images/workshop.jpg"
                alt="استادکار در حال کار با چوب در کارگاه میزون ور"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <img
                src="/images/workshop-2.jpg"
                alt="نمای نزدیک از پرداخت دستی در کارگاه"
                loading="lazy"
                className="absolute -bottom-8 -right-4 hidden w-1/2 border-8 border-ivory object-cover md:block"
              />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="eyebrow">فلسفه ما</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-ink md:text-4xl">
              ساخته‌شده برای ماندن، نه برای دور انداختن
            </h2>
            <p className="mt-6 font-body text-sm leading-relaxed text-charcoal/75">
              میزون ور سال ۱۹۸۸ در یک کارگاه کوچک در بروکسل آغاز شد با یک قاعده
              ساده: مبلمان را همان‌گونه بساز که انگار کسی تماشا نمی‌کند. نزدیک به
              چهار دهه بعد، همان قاعده بر همه آنچه می‌سازیم حکم فرماست.
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/75">
              امروز قطعه‌های ما در سه آتلیه خانوادگی در اروپا — بروکسل، میلان و
              کپنهاگ — ساخته می‌شوند؛ هر یک مسئول یک مجموعه، و هر یک امضای خود را
              پای کار می‌گذارد.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
              {stats.map((s) => (
                <div key={s.label} className="border-t border-gold/40 pt-4">
                  <p className="font-heading text-3xl font-bold text-forest">
                    {s.value}
                  </p>
                  <p className="mt-1 font-body text-xs text-charcoal/60">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-outline-dark mt-10">
              داستان ما
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section I — Interior Inspiration ---------------- */

const inspiration = [
  { src: "/images/interior-1.jpg", caption: "سالن نوآر — پاریس", span: "row-span-2" },
  { src: "/images/interior-2.jpg", caption: "بی‌طرف‌های آرام — اسلو", span: "" },
  { src: "/images/interior-3.jpg", caption: "گوشه مطالعه — میلان", span: "" },
  { src: "/images/interior-5.jpg", caption: "چرم و نور — تورین", span: "row-span-2" },
  { src: "/images/interior-6.jpg", caption: "کنار شومینه — کپنهاگ", span: "" },
  { src: "/images/interior-4.jpg", caption: "نور چراغ — بروکسل", span: "" },
  { src: "/images/interior-8.jpg", caption: "شام، به آهستگی — وین", span: "" },
];

function InteriorInspiration() {
  return (
    <section className="bg-cream py-20 md:py-28" aria-label="الهام‌بخش دکوراسیون">
      <div className="container-luxe">
        <Reveal className="text-center">
          <p className="eyebrow">گزارش تصویری</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-ink md:text-4xl">
            الهام‌بخش دکوراسیون
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-accent text-lg text-charcoal/60">
            اتاق‌هایی چیده‌شده توسط استودیوی ما، همان‌طور که در آن‌ها زندگی می‌شود.
          </p>
        </Reveal>
        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[240px] md:grid-cols-4">
          {inspiration.map((img, i) => (
            <Reveal
              key={img.src + i}
              delay={(i % 4) * 90}
              className={`${img.span} ${i % 2 === 0 ? "" : "md:mt-8"}`}
            >
              <figure className="group relative h-full w-full overflow-hidden">
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deepest/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute bottom-0 left-0 p-4 font-heading text-[11px] font-semibold text-ivory opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {img.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Link to="/trends" className="btn-outline-dark">
            ترندها و ایده‌ها
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Section J — Newsletter ---------------- */

function Newsletter() {
  return (
    <section className="relative overflow-hidden bg-forest py-20 md:py-28" aria-label="خبرنامه">
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
      />
      <Reveal className="container-luxe relative text-center">
        <p className="eyebrow !text-gold">خبرنامه</p>
        <h2 className="mt-4 font-accent text-3xl text-ivory md:text-5xl">
          الهام طراحی، مستقیم در ایمیل شما.
        </h2>
        <p className="mx-auto mt-4 max-w-md font-body text-sm text-ivory/65">
          ماهی یک ایمیلِ سنجیده — مجموعه‌های تازه، قصه‌های آتلیه و فضاهایی که
          می‌ارزد از آن‌ها الهام بگیرید.
        </p>
        <div className="mx-auto mt-8 max-w-md">
          <NewsletterForm />
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- Home assembly ---------------- */

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductsIntro />
      <FeaturedProduct />
      <SignatureCollections />
      <Bestsellers />
      <DesignerSpotlight />
      <BrandStory />
      <InteriorInspiration />
      <Newsletter />
    </main>
  );
}
