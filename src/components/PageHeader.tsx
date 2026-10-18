import React from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <header className="relative overflow-hidden bg-forest-deep pb-16 pt-32 text-center md:pb-24 md:pt-44">
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-deepest/60 via-forest-deep/70 to-forest-deep" />
        </>
      )}
      <div className="relative animate-fade-up">
        <p className="eyebrow !text-gold">{eyebrow}</p>
        <h1 className="display-title mt-4 text-3xl md:text-5xl text-ivory">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-xl font-accent text-lg italic text-ivory/70 md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
