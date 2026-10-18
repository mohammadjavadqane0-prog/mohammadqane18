// Persian formatting helpers: numerals, Toman currency, Jalali dates and
// Persian-aware text normalization for search.

import { toman } from "./pricing";

export { toman, TOMAN_RATE } from "./pricing";

/** Latin digits → Persian digits (۱۲۳). */
export function faDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) =>
    String.fromCharCode(0x06f0 + Number(d))
  );
}

/** Persian numerals for counts and quantities (no separators). */
export function faNum(n: number): string {
  return faDigits(n);
}

/** Full Toman price, e.g. «۲۵٬۹۰۰٬۰۰۰ تومان». */
export function formatPrice(n: number): string {
  return `${new Intl.NumberFormat("fa-IR").format(toman(n))} تومان`;
}

/** Bare Persian number with separators, no currency word. */
export function faNumber(n: number): string {
  return new Intl.NumberFormat("fa-IR").format(n);
}

/** Jalali (Solar Hijri) date via the fa-IR locale, e.g. «۶ مهر ۱۴۰۵». */
export function faDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" }).format(
      new Date(iso)
    );
  } catch {
    return iso;
  }
}

/**
 * Normalize Persian/Arabic variations for search: ي→ی، ك→ک، أ/إ/آ→ا،
 * Arabic-Indic and Persian digits unified, ZWNJ and tatweel removed,
 * whitespace collapsed.
 */
export function normalizeFa(input: string): string {
  return input
    .toLowerCase()
    .replace(/[ىي]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[أإآ]/g, "ا")
    .replace(/[ۀة]/g, "ه")
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[\u200c\u0640]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
