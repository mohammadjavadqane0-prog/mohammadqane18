import React from "react";
import { Link, useParams } from "react-router-dom";
import { NotFound } from "./NotFound";
import { BlogGrid } from "./Blog";
import { Reveal } from "../components/Reveal";
import { blogPosts } from "../data/editorial";
import { faDate } from "../lib/fa";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts.find((p) => p.slug === slug) : undefined;
  if (!post) return <NotFound />;

  return (
    <main className="bg-ivory">
      <article>
        <header className="relative overflow-hidden bg-forest-deep pb-20 pt-32 text-center md:pt-44">
          <img
            src={post.cover}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-deepest/60 via-forest-deep/75 to-forest-deep" />
          <div className="relative animate-fade-up">
            <p className="eyebrow !text-gold">
              {post.category} · {post.readTime}
            </p>
            <h1 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-bold text-ivory md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 font-body text-sm text-ivory/60">
              {faDate(post.date)}
            </p>
          </div>
        </header>

        <div className="container-luxe max-w-3xl py-14 md:py-20">
          <img
            src={post.cover}
            alt={post.title}
            className="aspect-[16/9] w-full object-cover"
          />
          <div className="mt-10 space-y-6">
            {post.content.map((para, i) => (
              <Reveal key={i} delay={i * 60}>
                <p
                  className={`font-body leading-loose text-charcoal/80 ${
                    i === 0 ? "text-lg" : "text-[15px]"
                  }`}
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 border-t border-charcoal/10 pt-8">
            <Link
              to="/blog"
              className="font-heading text-[12px] font-semibold text-gold-muted hover:text-ink"
            >
              ← بازگشت به مجله
            </Link>
          </div>
        </div>
      </article>

      <section className="bg-cream py-16 md:py-24" aria-label="مقاله‌های بیشتر">
        <div className="container-luxe">
          <h2 className="font-heading text-2xl font-bold text-ink">
            ادامه مطالعه
          </h2>
          <div className="mt-10">
            <BlogGrid />
          </div>
        </div>
      </section>
    </main>
  );
}
