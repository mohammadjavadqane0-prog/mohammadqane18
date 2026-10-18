import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { ProductGallery } from "../components/ProductGallery";
import { Reveal } from "../components/Reveal";
import { IconMinus, IconPlus, IconArrowRight } from "../components/icons";
import { formatPrice, useStore } from "../context/StoreContext";
import { getProduct, relatedProducts } from "../data/products";
import { getDesigner } from "../data/designers";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProduct(slug) : undefined;
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"delivery" | "care">("delivery");

  useEffect(() => {
    if (product) {
      setColor(product.colors[0].name);
      setQty(1);
      setTab("delivery");
    }
  }, [product?.id]);

  if (!product) return <NotFound />;

  const designer = getDesigner(product.designerId);
  const related = relatedProducts(product);
  const wishlisted = isWishlisted(product.id);

  return (
    <main className="bg-ivory">
      {/* breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="container-luxe flex flex-wrap items-center gap-2 pt-28 font-body text-xs text-charcoal/55 md:pt-32"
      >
        <Link to="/" className="transition-colors hover:text-gold-muted">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          to={`/collection/${product.category}`}
          className="capitalize transition-colors hover:text-gold-muted"
        >
          {product.category}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-charcoal">{product.name}</span>
      </nav>

      <div className="container-luxe grid gap-10 py-10 md:py-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <ProductGallery images={product.images} name={product.name} />
        </Reveal>

        <Reveal delay={120}>
          <div>
            {product.badge && (
              <span className="inline-block border border-gold/50 bg-forest-deep px-3 py-1 font-heading text-[9px] font-semibold uppercase tracking-wide2 text-gold">
                {product.badge}
              </span>
            )}
            <h1 className="mt-4 font-heading text-4xl font-bold tracking-wide text-ink md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-2 font-accent text-xl italic text-charcoal/65">
              Designed by{" "}
              <Link
                to={`/designers/${designer?.slug}`}
                className="text-gold-muted underline-offset-4 hover:underline"
              >
                {designer?.name}
              </Link>
            </p>
            <p className="mt-5 font-heading text-2xl font-bold text-ink">
              {formatPrice(product.price)}
              {product.originalPrice && (
                <span className="ml-3 text-base font-medium text-charcoal/40 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </p>
            <p className="mt-6 max-w-lg font-body text-sm leading-relaxed text-charcoal/75">
              {product.description}
            </p>

            {/* color variants */}
            <div className="mt-7">
              <p className="font-heading text-[10px] font-semibold uppercase tracking-wide2 text-charcoal/60">
                Finish / Color — <span className="text-ink">{color}</span>
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    aria-label={c.name}
                    aria-pressed={color === c.name}
                    onClick={() => setColor(c.name)}
                    className={`grid h-9 w-9 place-items-center rounded-full border-2 transition-all duration-300 ${
                      color === c.name
                        ? "scale-110 border-gold"
                        : "border-charcoal/15 hover:border-charcoal/40"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* material + dimensions */}
            <dl className="mt-7 grid max-w-lg grid-cols-2 gap-x-8 gap-y-4 border-y border-charcoal/10 py-5">
              <div>
                <dt className="font-heading text-[10px] font-semibold uppercase tracking-wide2 text-charcoal/55">
                  Material
                </dt>
                <dd className="mt-1 font-body text-sm text-ink">{product.material}</dd>
              </div>
              <div>
                <dt className="font-heading text-[10px] font-semibold uppercase tracking-wide2 text-charcoal/55">
                  Dimensions (W×H×D)
                </dt>
                <dd className="mt-1 font-body text-sm text-ink">
                  {product.dimensions.width} × {product.dimensions.height} ×{" "}
                  {product.dimensions.depth} cm
                </dd>
              </div>
            </dl>

            {/* actions */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <div className="flex items-center border border-charcoal/15 bg-white">
                <button
                  className="grid h-11 w-11 place-items-center text-charcoal/70 transition-colors hover:bg-charcoal/5"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <IconMinus />
                </button>
                <span className="w-9 text-center font-heading text-sm font-bold" aria-live="polite">
                  {qty}
                </span>
                <button
                  className="grid h-11 w-11 place-items-center text-charcoal/70 transition-colors hover:bg-charcoal/5"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(9, q + 1))}
                >
                  <IconPlus />
                </button>
              </div>
              <button
                className="btn-gold min-w-[180px] flex-1"
                onClick={() => addToCart(product.id, color, qty)}
              >
                Add to Cart — {formatPrice(product.price * qty)}
              </button>
              <button
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wishlisted}
                onClick={() => toggleWishlist(product.id)}
                className={`grid h-12 w-12 place-items-center rounded-full border transition-all duration-300 ${
                  wishlisted
                    ? "border-gold bg-gold/90 text-forest-deep"
                    : "border-charcoal/20 text-charcoal hover:border-gold hover:text-gold-muted"
                }`}
              >
                ♥
              </button>
            </div>

            {/* tabs */}
            <div className="mt-10 max-w-lg">
              <div className="flex gap-6 border-b border-charcoal/10">
                {(
                  [
                    ["delivery", "Delivery"],
                    ["care", "Care Instructions"],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    aria-selected={tab === key}
                    role="tab"
                    className={`-mb-px border-b-2 pb-3 font-heading text-[11px] font-semibold uppercase tracking-wide2 transition-colors duration-300 ${
                      tab === key
                        ? "border-gold text-ink"
                        : "border-transparent text-charcoal/45 hover:text-charcoal"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="pt-4 font-body text-sm leading-relaxed text-charcoal/70">
                {tab === "delivery" ? (
                  <ul className="list-disc space-y-2 pl-4">
                    <li>
                      White-glove delivery included on orders over $1,000 — we
                      place, assemble and remove all packaging.
                    </li>
                    <li>Standard delivery in 2–4 weeks; made-to-order pieces in 6–8.</li>
                    <li>30-day returns, collected from your door.</li>
                  </ul>
                ) : (
                  <ul className="list-disc space-y-2 pl-4">
                    <li>Dust with a soft dry cloth; avoid direct sunlight and radiators.</li>
                    <li>
                      {product.material.toLowerCase().includes("leather")
                        ? "Condition the leather twice a year with a neutral cream."
                        : "Re-oil wood surfaces every 12–18 months to keep the finish alive."}
                    </li>
                    <li>Blot spills immediately; never rub woven fabrics.</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* story band */}
      <section className="bg-forest py-16 text-ivory md:py-20">
        <div className="container-luxe grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <p className="eyebrow !text-gold">The Making</p>
            <p className="mt-4 max-w-2xl font-accent text-2xl italic leading-relaxed text-ivory/85 md:text-3xl">
              {product.story}
            </p>
            {designer && (
              <Link
                to={`/designers/${designer.slug}`}
                className="group mt-6 inline-flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-wide2 text-gold transition-colors hover:text-ivory"
              >
                Explore {designer.name}
                <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
          </Reveal>
          <Reveal delay={120}>
            <img
              src={product.images[1] ?? product.images[0]}
              alt={`${product.name} styled in an interior`}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* related */}
      <section className="py-16 md:py-24" aria-label="Related products">
        <div className="container-luxe">
          <Reveal>
            <h2 className="font-heading text-2xl font-bold tracking-wide text-ink md:text-3xl">
              You may also love
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
