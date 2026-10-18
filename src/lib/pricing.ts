// Price display strategy
// ----------------------
// Product prices in `src/data` are stored as base-currency values (USD).
// Customer-facing amounts are shown in Iranian Toman after applying this rate.
//
// TODO(user): set the real USD→Toman rate here (e.g. 62_000). With the
// placeholder value 1 the amounts stay unchanged — they are only formatted
// in Toman with Persian digits until you enter the real rate.
export const TOMAN_RATE = 1;

/** Convert a base-currency amount to its Toman display value. */
export function toman(amount: number): number {
  return Math.round(amount * TOMAN_RATE);
}
