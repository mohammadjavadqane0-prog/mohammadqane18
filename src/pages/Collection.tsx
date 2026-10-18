import React, { useMemo, useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { categories } from "../data/categories";
import {
  products,
  categoryMeta,
  type CategorySlug,
} from "../data/products";
import { faNum, normalizeFa } from "../lib/fa";

const allMaterials = Array.from(new Set(products.map((p) => p.material)));
const colorNames = Array.from(
  new Set(products.flatMap((p) => p.colors.map((c) => c.name)))
);

const priceBands = [
  { label: "زیر ۵۰۰ تومان", min: 0, max: 500 },
  { label: "۵۰۰ تا ۱٬۵۰۰ تومان", min: 500, max: 1500 },
  { label: "۱٬۵۰۰ تا ۳٬۰۰۰ تومان", min: 1500, max: 3000 },
  { label: "بیش از ۳٬۰۰۰ تومان", min: 3000, max: Infinity },
];

const sorts = [
  { value: "featured", label: "منتخب‌ها" },
  { value: "price-asc", label: "قیمت: از کم به زیاد" },
  { value: "price-desc", label: "قیمت: از زیاد به کم" },
  { value: "name", label: "نام (الف تا ی)" },
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
      const q = normalizeFa(searchQuery);
      list = list.filter((p) =>
        normalizeFa(`${p.name} ${p.material} ${p.description}`).includes(q)
      );
    }
    if (priceBand !== null) {
      const band = priceBands[priceBand];
      list = list.filter((p) => p.price >= band.min && p.price <= band.max);
    }
    if (materials.length)
      list = list.filter((p) =>
        materials.some((m) => p.material.includes(m))
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
        list.sort((a, b) => a.name.localeCompare(b.name, "fa"));
        break;
    }
    return list;
  }, [activeCategory, searchQuery, priceBand, materials, colors, sort]);

  const chip = (activeState: boolean) =>
    `rounded-full border px-4 py-2 font-heading text-[12px] font-semibold transition-all duration-300 ${
      activeState
        ? "border-gold bg-gold text-forest-deep"
        : "border-charcoal/15 bg-white text-charcoal/70 hover:border-gold-muted hover:text-gold-muted"
    }`;

  const filterPanel = (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">دسته‌بندی</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link to="/collection" className={chip(activeCategory === "all")}>
            همه دسته‌بندی‌ها
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
        <p className="eyebrow">محدوده قیمت</p>
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
        <p className="eyebrow">جنس</p>
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
        <p className="eyebrow">رنگ</p>
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
          پاک کردن فیلترها
        </button>
      )}
    </div>
  );

  return (
    <main>
      <PageHeader
        eyebrow="مجموعه‌های ما"
        title={
          activeCategory === "all"
            ? searchQuery
              ? `«${searchQuery}»`
              : "مبلمان"
            : categoryMeta[activeCategory].label
        }
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
                {loading ? "در حال انتخاب…" : `${faNum(results.length)} محصول`}
              </p>
              <div className="flex items-center gap-3">
                <button
                  className="rounded-full border border-charcoal/15 bg-white px-4 py-2 font-heading text-[12px] font-semibold lg:hidden"
                  onClick={() => setMobileFilters(true)}
                >
                  فیلتر
                </button>
                <label className="sr-only" htmlFor="sort">
                  مرتب‌سازی محصولات
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="border border-charcoal/15 bg-white px-4 py-2 font-heading text-[12px] font-semibold text-charcoal focus:border-gold-muted focus:outline-none"
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
                aria-label="در حال بارگذاری محصولات"
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
                <p className="font-accent text-2xl text-charcoal/60">
                  محصولی مطابق جستجوی شما پیدا نشد.
                </p>
                <p className="max-w-sm font-body text-sm text-charcoal/55">
                  یکی از فیلترها را بردارید یا برای الهام، مجموعه کامل را ببینید.
                </p>
                <Link to="/collection" className="btn-gold mt-2">
                  مشاهده همه مبلمان
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
        aria-label="فیلترها"
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
            <h2 className="font-heading text-sm font-bold">فیلتر</h2>
            <button
              onClick={() => setMobileFilters(false)}
              className="btn-gold !px-5 !py-2 text-[12px]"
            >
              نمایش نتایج
            </button>
          </div>
          {filterPanel}
        </div>
      </div>
    </main>
  );
}
