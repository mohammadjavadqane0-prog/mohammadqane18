import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import { NewsletterForm } from "./NewsletterForm";

const support = [
  { label: "Contact", to: "/contact" },
  { label: "Delivery & Returns", to: "/contact" },
  { label: "Care Instructions", to: "/about" },
  { label: "Wishlist", to: "/wishlist" },
];

const company = [
  { label: "About Us", to: "/about" },
  { label: "Designers", to: "/designers" },
  { label: "Trends", to: "/trends" },
  { label: "Blog", to: "/blog" },
];

const legal = ["Privacy Policy", "Terms of Service", "Cookie Settings"];

export function Footer() {
  return (
    <footer className="bg-forest-deep text-ivory">
      <div className="container-luxe py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <span className="font-heading text-xl font-extrabold tracking-wide2 text-ivory">
              MAISON VERT
            </span>
            <p className="mt-1 font-heading text-[9px] font-semibold uppercase tracking-luxe text-gold">
              Furniture Design
            </p>
            <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-ivory/60">
              Timeless pieces for exceptional living. Every MAISON VERT piece is
              designed by a named master and built by hand to be kept, not
              replaced.
            </p>
            <div className="mt-6 flex gap-3">
              {["Instagram", "Pinterest", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={s}
                  className="grid h-9 w-9 place-items-center rounded-full border border-ivory/15 text-[10px] font-heading font-semibold text-ivory/60 transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Furniture categories">
            <p className="eyebrow">Furniture</p>
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

          <nav aria-label="Support and company">
            <p className="eyebrow">Customer Support</p>
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
            <p className="eyebrow mt-8">Company</p>
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
            <p className="eyebrow">Newsletter</p>
            <p className="mt-5 font-accent text-xl italic text-ivory/80">
              Design Inspiration, Delivered.
            </p>
            <p className="mt-2 font-body text-sm text-ivory/55">
              Monthly interiors, trend notes and atelier stories.
            </p>
            <div className="mt-5">
              <NewsletterForm tone="dark" />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-7 md:flex-row">
          <p className="font-body text-xs text-ivory/40">
            © {new Date().getFullYear()} MAISON VERT. All rights reserved.
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
