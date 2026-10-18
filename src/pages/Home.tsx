import React, { useEffect, useRef, useState } from "react";
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
      aria-label="MAISON VERT hero"
    >
      <div className="absolute inset-0">
        <img
          src="/images/hero-interior.jpg"
          alt="Beige leather sofa in a warmly lit forest-green interior with a brass floor lamp"
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
          Timeless Pieces. Exceptional Living.
        </p>
        <h1
          className={`display-title mt-4 text-4xl leading-[1.05] text-gold sm:text-6xl md:text-7xl xl:text-8xl transition-all duration-1000 ${
            ready ? "opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          Furniture
          <br />
          Design
        </h1>
        <div
          className={`mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 transition-all duration-1000 ${
            ready ? "opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <Link to="/collection" className="btn-gold">
            Explore Collection
          </Link>
          <Link to="/about" className="btn-outline-light">
            Discover Our Story
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
            className="btn-gold !px-9 !py-2.5 text-[10px]"
            aria-label="Scroll to products"
          >
            Show More
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
          <h2 className="display-title text-3xl text-ink md:text-5xl">Products</h2>
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
    <section className="bg-ivory pb-20 pt-4 md:pb-28" aria-label="Featured product">
      <div className="container-luxe">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="relative">
              <img
                src={product.images[0]}
                alt={`${product.name} — ${product.colors[0].name} leather edition`}
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
              <p className="eyebrow">Featured Piece</p>
              <h3 className="mt-3 font-heading text-4xl font-bold tracking-wide text-ink md:text-5xl">
                {product.name}
              </h3>
              <p className="mt-2 font-accent text-xl italic text-charcoal/70">
                The {product.colors[0].name} Leather Edition
              </p>
              <p className="mt-6 font-body text-sm leading-relaxed text-charcoal/70">
                {product.description}
              </p>
              <p className="mt-5 font-heading text-xl font-bold text-ink">
                {formatPrice(product.price)}
                {product.originalPrice && (
                  <span className="ml-3 text-sm font-medium text-charcoal/40 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </p>
              <div className="mt-5">
                <p className="font-heading text-[10px] font-semibold uppercase tracking-wide2 text-charcoal/60">
                  Available finishes
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
                  Learn More
                </Link>
                <button
                  className="btn-outline-dark"
                  onClick={() => addToCart(product.id, color)}
                >
                  Add to Cart
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
    title: "Modern Living",
    text: "Low silhouettes, deep velours and brass light — rooms that live after dark.",
    image: "/images/collection-modern.jpg",
    to: "/collection/couches",
  },
  {
    title: "Contemporary Comfort",
    text: "Sculpted shells and soft weaves. Chairs you sink into and never want to leave.",
    image: "/images/collection-comfort.jpg",
    to: "/collection/armchairs",
  },
  {
    title: "Timeless Classics",
    text: "Honest wood, patient curves and joinery built to outlive the decade.",
    image: "/images/collection-classics.jpg",
    to: "/collection/tables",
  },
];

function SignatureCollections() {
  return (
    <section className="bg-cream py-20 md:py-28" aria-label="Signature collections">
      <div className="container-luxe">
        <Reveal className="flex flex-col items-end justify-between gap-4 md:flex-row">
          <div>
            <p className="eyebrow">Collections</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-wide text-ink md:text-4xl">
              Signature Collections
            </h2>
          </div>
          <Link
            to="/collection"
            className="group inline-flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-wide2 text-gold-muted transition-colors hover:text-ink"
          >
            View all furniture
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {collections.map((c, i) => (
            <Reveal key={c.title} delay={i * 120}>
              <Link
                to={c.to}
                className="group relative block overflow-hidden"
                aria-label={`Explore ${c.title}`}
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
                  <h3 className="font-heading text-xl font-bold tracking-wide text-ivory">
                    {c.title}
                  </h3>
                  <p className="mt-2 max-w-[260px] font-body text-[13px] leading-relaxed text-ivory/70">
                    {c.text}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 border-b border-gold pb-1 font-heading text-[10px] font-semibold uppercase tracking-wide2 text-gold transition-colors duration-300 group-hover:text-ivory">
                    Explore
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
    <section className="bg-ivory py-20 md:py-28" aria-label="Bestselling furniture">
      <div className="container-luxe">
        <Reveal className="text-center">
          <p className="eyebrow">Most Loved</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-wide text-ink md:text-4xl">
            Bestselling Furniture
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
            View Full Collection
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Section G — Designer Spotlight ---------------- */

function DesignerSpotlight() {
  const designer = designers[1]; // Amara Osei — author of the Drop Chair
  return (
    <section className="bg-forest-deep py-20 text-ivory md:py-28" aria-label="Designer spotlight">
      <div className="container-luxe">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="order-2 md:order-1">
            <p className="eyebrow !text-gold">Designer Spotlight</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-wide md:text-4xl">
              {designer.name}
            </h2>
            <p className="mt-2 font-accent text-lg italic text-gold-soft">
              {designer.discipline} · {designer.location}
            </p>
            <p className="mt-6 max-w-lg font-body text-sm leading-relaxed text-ivory/70">
              {designer.bio}
            </p>
            <p className="mt-6 border-l-2 border-gold pl-5 font-accent text-xl italic text-ivory/85">
              “{designer.philosophy}”
            </p>
            <p className="mt-6 font-heading text-[11px] font-semibold uppercase tracking-wide2 text-gold">
              Signature collection — {designer.signature}
            </p>
            <Link
              to={`/designers/${designer.slug}`}
              className="btn-gold mt-8"
            >
              Explore Designer
            </Link>
          </Reveal>
          <Reveal delay={140} className="order-1 md:order-2">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={designer.portrait}
                  alt={`Portrait of ${designer.name}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden border border-gold/40 bg-forest-deep px-6 py-4 md:block">
                <p className="font-heading text-[10px] uppercase tracking-wide2 text-gold">
                  At the atelier
                </p>
                <p className="font-accent text-lg italic text-ivory/80">
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
  { value: "38", label: "Years of craft" },
  { value: "3", label: "European ateliers" },
  { value: "100%", label: "Solid or certified wood" },
  { value: "25y", label: "Structural warranty" },
];

function BrandStory() {
  return (
    <section className="bg-ivory py-20 md:py-28" aria-label="Brand story">
      <div className="container-luxe">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="relative">
              <img
                src="/images/workshop.jpg"
                alt="Craftsman shaping wood in the MAISON VERT workshop"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <img
                src="/images/workshop-2.jpg"
                alt="Detail of hand-finishing in the workshop"
                loading="lazy"
                className="absolute -bottom-8 -right-4 hidden w-1/2 border-8 border-ivory object-cover md:block"
              />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="eyebrow">Our Philosophy</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-wide text-ink md:text-4xl">
              Made to be kept, not replaced
            </h2>
            <p className="mt-6 font-body text-sm leading-relaxed text-charcoal/75">
              MAISON VERT began in a single Brussels workshop in 1988. We still
              build the way we began: solid and certified woods, joinery over
              staples, finishes applied by hand and signed by the maker. A piece
              of furniture should record the life lived around it — and survive
              it beautifully.
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/75">
              We work with three family-owned ateliers across Europe, each
              responsible for a single collection, each committed to our
              25-year structural warranty.
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
              Discover Our Story
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section I — Interior Inspiration ---------------- */

const inspiration = [
  { src: "/images/interior-1.jpg", caption: "Salon Noir — Paris", span: "row-span-2", seed: 0 },
  { src: "/images/interior-2.jpg", caption: "Quiet Neutrals — Oslo", span: "", seed: 1 },
  { src: "/images/interior-3.jpg", caption: "The Reading Corner — Milan", span: "", seed: 2 },
  { src: "/images/interior-5.jpg", caption: "Leather & Light — Turin", span: "row-span-2", seed: 3 },
  { src: "/images/interior-6.jpg", caption: "Fireside — Copenhagen", span: "", seed: 4 },
  { src: "/images/interior-4.jpg", caption: "Lamplight — Brussels", span: "", seed: 5 },
  { src: "/images/interior-8.jpg", caption: "Dining, Slowly — Vienna", span: "", seed: 6 },
];

function InteriorInspiration() {
  return (
    <section className="bg-cream py-20 md:py-28" aria-label="Interior inspiration">
      <div className="container-luxe">
        <Reveal className="text-center">
          <p className="eyebrow">Editorial</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-wide text-ink md:text-4xl">
            Interior Inspiration
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-accent text-lg italic text-charcoal/60">
            Rooms styled by our studio, photographed as they are lived in.
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
                <figcaption className="absolute bottom-0 left-0 p-4 font-heading text-[11px] font-semibold uppercase tracking-wide2 text-ivory opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {img.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Link to="/trends" className="btn-outline-dark">
            Explore Trends & Ideas
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Section J — Newsletter ---------------- */

function Newsletter() {
  return (
    <section className="relative overflow-hidden bg-forest py-20 md:py-28" aria-label="Newsletter">
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
      />
      <Reveal className="container-luxe relative text-center">
        <p className="eyebrow !text-gold">Newsletter</p>
        <h2 className="mt-4 font-accent text-3xl italic text-ivory md:text-5xl">
          Design Inspiration, Delivered.
        </h2>
        <p className="mx-auto mt-4 max-w-md font-body text-sm text-ivory/65">
          One considered email a month — new collections, atelier stories and
          interiors worth stealing.
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
