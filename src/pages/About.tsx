import React from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { IconCheck } from "../components/icons";

const values = [
  {
    title: "Named designers",
    text: "Every piece is designed by a master we name, pay and credit — not a studio ghost.",
  },
  {
    title: "Honest materials",
    text: "Solid and certified woods, full-grain leather, weaves milled for us. No shortcuts, no veneer pretending.",
  },
  {
    title: "Repairable by design",
    text: "Standard fixings, replaceable covers, spare parts kept for 25 years. Furniture should outlive trends.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Since 1988"
        title="Our Story"
        subtitle="Craftsmanship, philosophy and the pursuit of rooms that feel right."
        image="/images/workshop-2.jpg"
      />

      <section className="container-luxe py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <img
              src="/images/workshop.jpg"
              alt="Craftsman at work in the MAISON VERT atelier"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Heritage</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-wide text-ink md:text-4xl">
              One workshop, three ateliers, no hurry
            </h2>
            <p className="mt-6 font-body text-sm leading-relaxed text-charcoal/75 md:text-base">
              MAISON VERT was founded in Brussels in 1988 as a two-bench
              workshop with one rule: build furniture the way it would be built
              if nobody was watching. Almost four decades later that rule still
              governs everything we make.
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/75 md:text-base">
              Today our pieces are made by three family-owned European ateliers —
              in Brussels, Milan and Copenhagen — each responsible for a single
              collection and each signing the work it finishes.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 120}>
              <div className="card-line h-full p-8">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold-muted">
                  <IconCheck />
                </span>
                <h3 className="mt-5 font-heading text-lg font-bold tracking-wide text-ink">
                  {v.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/70">
                  {v.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <div className="relative overflow-hidden">
            <img
              src="/images/interior-5.jpg"
              alt="Leather sofa and armchair in warm lamplight"
              loading="lazy"
              className="aspect-[16/9] w-full object-cover md:aspect-[21/9]"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-forest-deepest/80 via-transparent to-transparent p-8 md:p-14">
              <p className="max-w-2xl font-accent text-2xl italic text-ivory md:text-4xl">
                “We don't design furniture for seasons. We design it for the
                next thirty winters.”
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-16 text-center">
          <h2 className="font-heading text-2xl font-bold tracking-wide text-ink">
            See it in person, or let us show you here
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link to="/collection" className="btn-gold">
              Explore Collection
            </Link>
            <Link to="/contact" className="btn-outline-dark">
              Contact the Atelier
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
