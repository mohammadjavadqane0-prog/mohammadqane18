import React, { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { IconCheck } from "../components/icons";

const topics = ["پرسش عمومی", "پیگیری سفارش", "پروژه‌های سازمانی", "رسانه‌ها"];

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
    if (form.name.trim().length < 2) errs.name = "تکمیل این فیلد الزامی است.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "لطفاً یک ایمیل معتبر وارد کنید.";
    if (form.message.trim().length < 12)
      errs.message = "لطفاً چند کلمه بیشتر بنویسید (۱۲ نویسه به بالا).";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSent(true);
  };

  return (
    <main>
      <PageHeader
        eyebrow="گوش می‌دهیم"
        title="تماس با ما"
        subtitle="پرسش، پروژه سازمانی یا فضایی که کمک می‌خواهد — برای ما بنویسید."
        image="/images/lamp-corner.jpg"
      />
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
        <Reveal>
          {sent ? (
            <div className="card-line flex flex-col items-center gap-4 px-8 py-16 text-center" role="status">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gold text-forest-deep">
                <IconCheck className="h-5 w-5" />
              </span>
              <h2 className="font-heading text-2xl font-bold text-ink">
                پیام شما دریافت شد
              </h2>
              <p className="max-w-sm font-body text-sm text-charcoal/65">
                سپاس، {form.name.split(" ")[0]}. آتلیه ما ظرف یک روز کاری پاسخ
                می‌دهد. (ارسال نمایشی — چیزی به بیرون فرستاده نشد.)
              </p>
              <button
                className="btn-outline-dark mt-2"
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", email: "", topic: topics[0], message: "" });
                }}
              >
                ارسال پیام دیگر
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate aria-label="فرم تماس">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="eyebrow mb-2 block">
                    نام و نام خانوادگی
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
                    ایمیل
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    className="input-lux"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "c-email-err" : undefined}
                    dir="ltr"
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
                  موضوع
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
                  پیام
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
                ارسال پیام
              </button>
            </form>
          )}
        </Reveal>

        <Reveal delay={140}>
          <aside className="bg-forest p-9 text-ivory md:p-12">
            <p className="eyebrow !text-gold">آتلیه</p>
            <address className="mt-6 space-y-6 font-body not-italic text-sm leading-relaxed text-ivory/70">
              <div>
                <p className="font-heading text-[11px] text-gold">
                  نمایشگاه و کارگاه
                </p>
                <p className="mt-1">خیابان rue du Vieux Marché ۱۴</p>
                <p>بروکسل ۱۰۰۰، بلژیک</p>
              </div>
              <div>
                <p className="font-heading text-[11px] text-gold">
                  ایمیل
                </p>
                <p className="mt-1" dir="ltr" style={{ textAlign: "start" }}>
                  atelier@maisonvert.example
                </p>
              </div>
              <div>
                <p className="font-heading text-[11px] text-gold">
                  تلفن
                </p>
                <p className="mt-1" dir="ltr" style={{ textAlign: "start" }}>
                  +32 2 000 00 00
                </p>
              </div>
              <div>
                <p className="font-heading text-[11px] text-gold">
                  ساعات کاری
                </p>
                <p className="mt-1">شنبه تا پنجشنبه، ۱۰ تا ۱۹</p>
                <p>جمعه‌ها با وقت قبلی</p>
              </div>
            </address>
          </aside>
        </Reveal>
      </div>
    </main>
  );
}
