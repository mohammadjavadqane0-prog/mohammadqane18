import React from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { blogPosts } from "../data/editorial";
import { faDate } from "../lib/fa";

export function BlogGrid() {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((p, i) => (
        <Reveal key={p.slug} delay={(i % 3) * 90}>
          <Link to={`/blog/${p.slug}`} className="group block" aria-label={p.title}>
            <div className="aspect-[4/3] overflow-hidden card-line">
              <img
                src={p.cover}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="eyebrow mt-5">
              {p.category} · {p.readTime}
            </p>
            <h3 className="mt-2 font-heading text-xl font-bold text-ink transition-colors duration-300 group-hover:text-gold-muted">
              {p.title}
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/65">
              {p.excerpt}
            </p>
            <p className="mt-3 font-body text-xs text-charcoal/45">
              {faDate(p.date)}
            </p>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export default function BlogPage() {
  return (
    <main>
      <PageHeader
        eyebrow="مجله"
        title="مجله طراحی"
        subtitle="راهنماها، جستارها و قصه‌های آتلیه از دنیای میزون ور."
        image="/images/interior-6.jpg"
      />
      <div className="container-luxe py-16 md:py-24">
        <BlogGrid />
      </div>
    </main>
  );
}
