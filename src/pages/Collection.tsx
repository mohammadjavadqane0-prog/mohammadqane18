import React, { useMemo, useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { categories } from "../data/categories";
import { products, type CategorySlug } from "../data/products";
import { formatPrice } from "../context/StoreContext";

const allMaterials = Array.from(new Set(products.map((p) => p.material)));
const colorNames = Array.from(
  new Set(products.flatMap((p) => p.colors.map((c) => c.name)))
);

const priceBands = [
  { label: "Under $500", min: 0, max: 500 },
  { label: "$500 – $1,500", min: 500, max: 1500 },
  { label: "$1,500 – $3,000", min: 1500, max: 3000 },
  { label: "$3,000+", min: 3000, max: Infinity },
];

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A–Z" },
];

export default function CollectionPage() {
  const { category } = useParams<{ category?: string }>();
  const [params] = useSearchParams();
  const searchQuery = params.get("q") ?? "";

  const activeCategory: CategorySlug | "all" = (
    categories.some((c) => c.slug === category) ? category : "all"
  ) as CategorySlug | "all";

  const [priceBand, setPriceBand] = useState<number | null>(null);
  const [materials, setMaterials] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sort, setSort] = useState("featured");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  // brief loading state so filtering feels alive on any device
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 320);
    return () => clearTimeout(t);
  }, [activeCategory, priceBand, materials, colors, sort, searchQuery]);

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const results = useMemo(() => {
    let list = [...products];
    if (activeCategory !== "all")
      list = list.filter((p) => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) =>
        `${p.name} ${p.category} ${p.material} ${p.description}`
          .toLowerCase()
          .includes(q)
      );
    }
    if (priceBand !== null) {
      const band = priceBands[priceBand];
      list = list.filter((p) => p.price >= band.min && p.price <= band.max);
    }
    if (materials.length)
      list = list.filter((p) =>
        materials.some((m) => p.material.toLowerCase().includes(m.toLowerCase()))
      );
    if (colors.length)
      list = list.filter((p) => p.colors.some((c) => colors.includes(c.name)));
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  }, [activeCategory, searchQuery, priceBand, materials, colors, sort]);

  const chip = (activeState: boolean) =>
    `rounded-full border px-4 py-2 font-heading text-[11px] font-semibold uppercase tracking-wide2 transition-all duration-300 ${
      activeState
        ? "border-gold bg-gold text-forest-deep"
        : "border-charcoal/15 bg-white text-charcoal/70 hover:border-gold-muted hover:text-gold-muted"
    }`;

  const filterPanel = (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">Category</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link to="/collection" className={chip(activeCategory === "all")}>
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/collection/${c.slug}`}
              className={chip(activeCategory === c.slug)}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow">Price</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {priceBands.map((b, i) => (
            <button
              key={b.label}
              className={chip(priceBand === i)}
              onClick={() => setPriceBand(priceBand === i ? null : i)}
              aria-pressed={priceBand === i}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow">Material</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {allMaterials.map((m) => (
            <button
              key={m}
              className={chip(materials.includes(m))}
              onClick={() => toggle(materials, setMaterials, m)}
              aria-pressed={materials.includes(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow">Color</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {colorNames.map((c) => (
            <button
              key={c}
              className={chip(colors.includes(c))}
              onClick={() => toggle(colors, setColors, c)}
              aria-pressed={colors.includes(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      {(priceBand !== null || materials.length > 0 || colors.length > 0) && (
        <button
          className="btn-outline-dark !px-5 !py-2"
          onClick={() => {
            setPriceBand(null);
            setMaterials([]);
            setColors([]);
          }}
        >
          Clear filters
        </button>
      )}
    </div>
  );

  return (
    <main>
      <PageHeader
        eyebrow={
          activeCategory === "all" ? "The Collection" : categoryMetaLabel(activeCategory)
        }
        title={activeCategory === "all" ? (searchQuery ? `“${searchQuery}”` : "Furniture") : activeCategory}
        subtitle={
          activeCategory === "all"
            ? undefined
            : categories.find((c) => c.slug === activeCategory)?.blurb
        }
        image="/images/interior-minimal.jpg"
      />

      <div className="container-luxe py-12 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden w-64 shrink-0 lg:block">
            {filterPanel}
          </aside>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6">
              <p className="font-body text-sm text-charcoal/60" aria-live="polite">
                {loading ? "Curating…" : `${results.length} piece${results.length === 1 ? "" : "s"}`}
              </p>
              <div className="flex items-center gap-3">
                <button
                  className="rounded-full border border-charcoal/15 bg-white px-4 py-2 font-heading text-[11px] font-semibold uppercase tracking-wide2 lg:hidden"
                  onClick={() => setMobileFilters(true)}
                >
                  Filters
                </button>
                <label className="sr-only" htmlFor="sort">
                  Sort products
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="border border-charcoal/15 bg-white px-4 py-2 font-heading text-[11px] font-semibold uppercase tracking-wide2 text-charcoal focus:border-gold-muted focus:outline-none"
                >
                  {sorts.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <div
                className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3"
                aria-busy="true"
                aria-label="Loading products"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/5] bg-beige/50" />
                    <div className="mt-4 h-3 w-1/3 bg-beige/70" />
                    <div className="mt-2 h-4 w-2/3 bg-beige/70" />
                  </div>
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="card-line flex flex-col items-center gap-3 px-8 py-20 text-center">
                <p className="font-accent text-2xl italic text-charcoal/60">
                  Nothing matches — yet.
                </p>
                <p className="max-w-sm font-body text-sm text-charcoal/55">
                  Try removing a filter, or explore the full collection for
                  inspiration.
                </p>
                <Link to="/collection" className="btn-gold mt-2">
                  View All Furniture
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 3) * 80}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${
          mobileFilters ? "visible" : "invisible"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <div
          className={`absolute inset-0 bg-forest-deepest/60 transition-opacity duration-300 ${
            mobileFilters ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileFilters(false)}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-ivory p-6 transition-transform duration-400 ${
            mobileFilters ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wide2">
              Filters
            </h2>
            <button
              onClick={() => setMobileFilters(false)}
              className="btn-gold !px-5 !py-2 text-[10px]"
            >
              Show results
            </button>
          </div>
          {filterPanel}
        </div>
      </div>
    </main>
  );
}

function categoryMetaLabel(cat: string) {
  return cat.charAt(0).toUpperCase() + cat.slice(1);
}
