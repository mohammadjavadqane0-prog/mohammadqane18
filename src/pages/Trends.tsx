import React from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { blogPosts } from "../data/editorial";
import { faDate } from "../lib/fa";

const concepts = [
  {
    title: "سالن تیره",
    text: "دیوارهای سبز جنگلی، چرم روشن و یک چراغ برنجی. درام، بی‌هیچ سر و صدایی.",
    image: "/images/collection-comfort.jpg",
    tag: "ایده فضا",
  },
  {
    title: "مینیمالیسم گرم",
    text: "بوله بی‌رنگ، بلوط روشن و نور شمع — اتاق‌هایی آرام که همچنان غنی به نظر می‌رسند.",
    image: "/images/interior-minimal.jpg",
    tag: "گزارش ترند",
  },
  {
    title: "شام، به آهستگی",
    text: "میزهای بلند چوبی، نور کم و صندلی‌هایی که ساعت‌ها می‌توان در آن‌ها نشست.",
    image: "/images/interior-7.jpg",
    tag: "ایده فضا",
  },
  {
    title: "گوشه مطالعه",
    text: "یک صندلی راحتی دربرگیرنده، یک چراغ قوسی و یک میز کوچک. کل دستور همین است.",
    image: "/images/lamp-corner.jpg",
    tag: "ایده",
  },
];

export default function TrendsPage() {
  const posts = blogPosts.filter((p) => p.category === "ترندها");
  return (
    <main>
      <PageHeader
        eyebrow="گزارش تصویری"
        title="ترندها و ایده‌ها"
        subtitle="یادداشت‌های ترند، ایده‌های فضایی برگزیده و ایده‌هایی که می‌ارزد قرض بگیرید."
        image="/images/interior-4.jpg"
      />

      <section className="container-luxe py-16 md:py-24">
        <Reveal>
          <h2 className="font-heading text-2xl font-bold text-ink md:text-3xl">
            ایده‌های فضایی برگزیده
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
                  <p className="font-heading text-[11px] font-semibold text-gold">
                    {c.tag}
                  </p>
                  <h3 className="mt-2 font-heading text-xl font-bold text-ivory md:text-2xl">
                    {c.title}
                  </h3>
                  <p className="mt-2 max-w-md font-body text-[13px] leading-relaxed text-ivory/75">
                    {c.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-bold text-ink md:text-3xl">
            از دفترچه ترند
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
                  <h3 className="mt-2 font-heading text-lg font-bold text-ink transition-colors group-hover:text-gold-muted">
                    {p.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/65">{p.excerpt}</p>
                  <p className="mt-3 font-body text-xs text-charcoal/45">
                    {faDate(p.date)} · {p.readTime}
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
