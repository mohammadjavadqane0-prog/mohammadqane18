import React, { useState } from "react";
import { faNum } from "../lib/fa";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-beige/40 md:aspect-[5/5]">
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={`${name} — نمای ${faNum(i + 1)}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== active}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setActive(i)}
            aria-label={`نمایش نمای ${faNum(i + 1)} از ${name}`}
            aria-pressed={i === active}
            className={`aspect-square overflow-hidden border transition-all duration-300 ${
              i === active
                ? "border-gold opacity-100"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
