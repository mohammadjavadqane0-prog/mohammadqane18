// Price architecture
// ------------------
// Every product price in `src/data/products.ts` is stored as a numeric
// Iranian Toman amount — a single, directly editable source of truth per
// product. Formatting (Persian numerals, thousands separators, «تومان»
// suffix) happens only at display time in `src/lib/fa.ts`.
//
// This is a demonstration project: the amounts below are fictional,
// curated demo prices — not verified market prices.

/** Delivery fee charged for orders below the free-delivery threshold (Toman). */
export const DELIVERY_FEE = 1_900_000;

/** Cart total above which delivery is free (Toman). */
export const FREE_DELIVERY_THRESHOLD = 75_000_000;
