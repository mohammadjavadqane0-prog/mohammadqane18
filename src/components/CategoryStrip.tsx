import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import {
  IconArmchair,
  IconCouch,
  IconChair,
  IconLamp,
  IconStorage,
  IconTable,
} from "./icons";
import type { CategorySlug } from "../data/products";

const iconMap: Record<CategorySlug, React.FC<{ className?: string }>> = {
  couches: IconCouch,
  armchairs: IconArmchair,
  chairs: IconChair,
  tables: IconTable,
  lighting: IconLamp,
  storage: IconStorage,
};

/**
 * The reference "PRODUCTS" category strip: three featured categories on desktop
 * joined by thin gold lines; all six in a graceful grid on smaller screens.
 */
export function CategoryStrip() {
  const featured = categories.slice(0, 3);

  return (
    <div>
      {/* Desktop: reference composition */}
      <div className="hidden items-stretch justify-center md:flex">
        {featured.map((c, i) => {
          const Icon = iconMap[c.slug];
          return (
            <React.Fragment key={c.slug}>
              {i > 0 && (
                <div
                  aria-hidden="true"
                  className="mx-2 flex items-center self-[86px] xl:mx-6"
                >
                  <span className="h-px w-16 bg-gold/50 xl:w-28" />
                  <span className="ml-1 h-1.5 w-1.5 rotate-45 border-r border-t border-gold/70" />
                </div>
              )}
              <Link
                to={`/collection/${c.slug}`}
                className="group flex w-56 flex-col items-center px-4 py-2 text-center transition-transform duration-300 hover:-translate-y-1 xl:w-64"
              >
                <span className="text-charcoal transition-colors duration-300 group-hover:text-gold-muted">
                  <Icon className="h-16 w-16" />
                </span>
                <span className="mt-4 font-heading text-base font-bold tracking-wide text-ink group-hover:text-gold-muted">
                  {c.label}
                </span>
                <span className="mt-1.5 max-w-[180px] font-accent text-sm italic text-charcoal/60">
                  {c.blurb}
                </span>
              </Link>
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile / tablet: all six, 2-col grid */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
        {categories.map((c) => {
          const Icon = iconMap[c.slug];
          return (
            <Link
              key={c.slug}
              to={`/collection/${c.slug}`}
              className="group flex flex-col items-center border border-gold/15 bg-white/60 px-4 py-6 text-center transition-colors duration-300 hover:border-gold/50"
            >
              <span className="text-charcoal transition-colors duration-300 group-hover:text-gold-muted">
                <Icon className="h-12 w-12" />
              </span>
              <span className="mt-3 font-heading text-sm font-bold tracking-wide text-ink">
                {c.label}
              </span>
              <span className="mt-1 font-accent text-xs italic text-charcoal/55">
                {c.blurb}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Desktop secondary row for remaining categories */}
      <div className="mt-10 hidden justify-center gap-6 md:flex">
        {categories.slice(3).map((c) => {
          const Icon = iconMap[c.slug];
          return (
            <Link
              key={c.slug}
              to={`/collection/${c.slug}`}
              className="group flex items-center gap-3 border border-gold/15 bg-white/50 px-5 py-3 transition-all duration-300 hover:border-gold/50 hover:bg-white/80"
            >
              <span className="text-charcoal transition-colors duration-300 group-hover:text-gold-muted">
                <Icon className="h-7 w-7" />
              </span>
              <span className="font-heading text-xs font-bold uppercase tracking-wide2 text-ink group-hover:text-gold-muted">
                {c.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
