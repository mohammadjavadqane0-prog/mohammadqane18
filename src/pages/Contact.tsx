import React, { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { IconCheck } from "../components/icons";

const topics = ["General", "Order support", "Trade & contract", "Press"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: topics[0], message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "Please enter a valid email address.";
    if (form.message.trim().length < 12)
      errs.message = "Please write at least a few words (12+ characters).";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSent(true);
  };

  return (
    <main>
      <PageHeader
        eyebrow="We're Listening"
        title="Contact"
        subtitle="Questions, trade enquiries or a room that needs help — write to us."
        image="/images/lamp-corner.jpg"
      />
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
        <Reveal>
          {sent ? (
            <div className="card-line flex flex-col items-center gap-4 px-8 py-16 text-center" role="status">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gold text-forest-deep">
                <IconCheck className="h-5 w-5" />
              </span>
              <h2 className="font-heading text-2xl font-bold tracking-wide text-ink">
                Message received
              </h2>
              <p className="max-w-sm font-body text-sm text-charcoal/65">
                Thank you, {form.name.split(" ")[0]}. Our atelier replies within
                one business day. (Demo submission — nothing was sent externally.)
              </p>
              <button
                className="btn-outline-dark mt-2"
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", email: "", topic: topics[0], message: "" });
                }}
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate aria-label="Contact form">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="eyebrow mb-2 block">
                    Name
                  </label>
                  <input
                    id="c-name"
                    className="input-lux"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "c-name-err" : undefined}
                  />
                  {errors.name && (
                    <p id="c-name-err" className="mt-1.5 font-body text-xs text-red-600" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="c-email" className="eyebrow mb-2 block">
                    Email
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    className="input-lux"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "c-email-err" : undefined}
                  />
                  {errors.email && (
                    <p id="c-email-err" className="mt-1.5 font-body text-xs text-red-600" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="c-topic" className="eyebrow mb-2 block">
                  Topic
                </label>
                <select
                  id="c-topic"
                  className="input-lux"
                  value={form.topic}
                  onChange={(e) => set("topic", e.target.value)}
                >
                  {topics.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="mt-6">
                <label htmlFor="c-message" className="eyebrow mb-2 block">
                  Message
                </label>
                <textarea
                  id="c-message"
                  rows={6}
                  className="input-lux resize-y"
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "c-msg-err" : undefined}
                />
                {errors.message && (
                  <p id="c-msg-err" className="mt-1.5 font-body text-xs text-red-600" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>
              <button type="submit" className="btn-gold mt-8 min-w-[200px]">
                Send Message
              </button>
            </form>
          )}
        </Reveal>

        <Reveal delay={140}>
          <aside className="bg-forest p-9 text-ivory md:p-12">
            <p className="eyebrow !text-gold">The Atelier</p>
            <address className="mt-6 space-y-6 font-body not-italic text-sm leading-relaxed text-ivory/70">
              <div>
                <p className="font-heading text-[10px] uppercase tracking-wide2 text-gold">
                  Flagship & Workshop
                </p>
                <p className="mt-1">Rue du Vieux Marché 14</p>
                <p>1000 Brussels, Belgium</p>
              </div>
              <div>
                <p className="font-heading text-[10px] uppercase tracking-wide2 text-gold">
                  Email
                </p>
                <p className="mt-1">atelier@maisonvert.example</p>
              </div>
              <div>
                <p className="font-heading text-[10px] uppercase tracking-wide2 text-gold">
                  Telephone
                </p>
                <p className="mt-1">+32 2 000 00 00</p>
              </div>
              <div>
                <p className="font-heading text-[10px] uppercase tracking-wide2 text-gold">
                  Opening hours
                </p>
                <p className="mt-1">Mon–Sat, 10:00–19:00</p>
                <p>Sunday by appointment</p>
              </div>
            </address>
          </aside>
        </Reveal>
      </div>
    </main>
  );
}
