import React from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { blogPosts } from "../data/editorial";

const concepts = [
  {
    title: "The Dark Salon",
    text: "Forest-green walls, pale leather, a single brass lamp. Drama without noise.",
    image: "/images/collection-comfort.jpg",
    tag: "Room Concept",
  },
  {
    title: "Warm Minimalism",
    text: "Neutral bouclé, pale oak and candlelight — calm rooms that still feel rich.",
    image: "/images/interior-minimal.jpg",
    tag: "Trend Report",
  },
  {
    title: "Dining, Slowly",
    text: "Long wooden tables, low light and chairs you can sit in for hours.",
    image: "/images/interior-7.jpg",
    tag: "Room Concept",
  },
  {
    title: "The Reading Corner",
    text: "One enveloping armchair, one arc lamp, one small table. That's the whole recipe.",
    image: "/images/lamp-corner.jpg",
    tag: "Idea",
  },
];

export default function TrendsPage() {
  const posts = blogPosts.filter((p) => p.category === "Trends");
  return (
    <main>
      <PageHeader
        eyebrow="Editorial"
        title="Trends & Inspiration"
        subtitle="Trend notes, curated room concepts and ideas worth borrowing."
        image="/images/interior-4.jpg"
      />

      <section className="container-luxe py-16 md:py-24">
        <Reveal>
          <h2 className="font-heading text-2xl font-bold tracking-wide text-ink md:text-3xl">
            Curated room concepts
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {concepts.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 120}>
              <article className="group card-line relative overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deepest/85 via-forest-deep/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-heading text-[10px] font-semibold uppercase tracking-wide2 text-gold">
                    {c.tag}
                  </p>
                  <h3 className="mt-2 font-heading text-xl font-bold tracking-wide text-ivory md:text-2xl">
                    {c.title}
                  </h3>
                  <p className="mt-2 max-w-md font-body text-[13px] text-ivory/75">
                    {c.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-bold tracking-wide text-ink md:text-3xl">
            From the trend journal
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <Link to={`/blog/${p.slug}`} className="group grid gap-5 sm:grid-cols-[200px_1fr]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="eyebrow">{p.category}</p>
                  <h3 className="mt-2 font-heading text-lg font-bold tracking-wide text-ink transition-colors group-hover:text-gold-muted">
                    {p.title}
                  </h3>
                  <p className="mt-2 font-body text-sm text-charcoal/65">{p.excerpt}</p>
                  <p className="mt-3 font-body text-xs text-charcoal/45">
                    {new Date(p.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · {p.readTime}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
