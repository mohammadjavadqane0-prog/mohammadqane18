import React from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { IconArrowRight } from "../components/icons";
import { designers } from "../data/designers";

export default function DesignersPage() {
  return (
    <main>
      <PageHeader
        eyebrow="The Masters"
        title="Designers"
        subtitle="Three voices, one house philosophy — furniture made to be kept."
        image="/images/interior-3.jpg"
      />
      <div className="container-luxe space-y-20 py-16 md:py-24">
        {designers.map((d, i) => (
          <Reveal key={d.id}>
            <article
              className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Link
                to={`/designers/${d.slug}`}
                className="group relative block overflow-hidden"
                aria-label={`View ${d.name}`}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={d.portrait}
                    alt={`Portrait of ${d.name}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deepest/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Link>
              <div>
                <p className="eyebrow">{d.discipline}</p>
                <h2 className="mt-3 font-heading text-3xl font-bold tracking-wide text-ink md:text-4xl">
                  {d.name}
                </h2>
                <p className="mt-2 font-accent text-lg italic text-charcoal/60">
                  {d.location}
                </p>
                <p className="mt-5 max-w-lg font-body text-sm leading-relaxed text-charcoal/75">
                  {d.bio}
                </p>
                <p className="mt-5 font-heading text-[11px] font-semibold uppercase tracking-wide2 text-gold-muted">
                  Signature — {d.signature}
                </p>
                <Link
                  to={`/designers/${d.slug}`}
                  className="btn-outline-gold mt-7"
                >
                  Explore Designer
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
