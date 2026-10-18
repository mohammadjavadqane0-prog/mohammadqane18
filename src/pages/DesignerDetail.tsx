import React from "react";
import { Link, useParams } from "react-router-dom";
import { NotFound } from "./NotFound";
import { PageHeader } from "../components/PageHeader";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { getDesigner } from "../data/designers";
import { products } from "../data/products";

export default function DesignerDetail() {
  const { slug } = useParams<{ slug: string }>();
  const designer = slug ? getDesigner(slug) : undefined;
  if (!designer) return <NotFound />;

  const collection = products.filter((p) => p.designerId === designer.id);

  return (
    <main>
      <PageHeader
        eyebrow={designer.discipline}
        title={designer.name}
        subtitle={designer.location}
        image={designer.studioImage}
      />
      <div className="container-luxe grid gap-10 py-16 md:grid-cols-[1fr_1.2fr] md:gap-16 md:py-24">
        <Reveal>
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={designer.portrait}
              alt={`Portrait of ${designer.name}`}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">Biography</p>
          <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-charcoal/75 md:text-base">
            {designer.bio}
          </p>
          <p className="mt-8 border-l-2 border-gold pl-5 font-accent text-2xl italic leading-relaxed text-forest">
            “{designer.philosophy}”
          </p>
          <p className="mt-8 font-heading text-[11px] font-semibold uppercase tracking-wide2 text-gold-muted">
            Signature collection — {designer.signature}
          </p>
          <Link to="/collection" className="btn-outline-dark mt-8">
            Browse All Furniture
          </Link>
        </Reveal>
      </div>

      <section className="bg-cream py-16 md:py-24" aria-label="Featured collection">
        <div className="container-luxe">
          <Reveal>
            <h2 className="font-heading text-2xl font-bold tracking-wide text-ink md:text-3xl">
              {designer.name}'s featured collection
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {collection.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
