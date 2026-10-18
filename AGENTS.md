# Base44 setup notes

- **Stack:** Vite 5 + React 18 + TypeScript + Tailwind CSS 3 SPA, react-router-dom 6.
  No backend — product/designer/blog data lives in `src/data/*.ts`; cart,
  wishlist and the demo account persist in `localStorage` (`mv-*` keys);
  the last demo order lives in `sessionStorage` (`mv-last-order`).
- **Run:** `docker compose -f docker-compose.base44.yml up -d --build`.
  The single `web` service (node:22) bind-mounts the repo at `/workspace`,
  runs `npm install` then `npm run dev` (vite on 0.0.0.0:5173, published at
  host port 3000). `node_modules` lives in the `mv_node_modules` named volume.
- **Live reload:** vite polling is enabled only when `BASE44_PREVIEW_MODE == "1"`
  (set in `vite.config.ts`) because bind-mount inotify doesn't fire in the
  sandbox. With the flag unset, default inotify watching is used.
- **Allowed hosts:** the platform-provided `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`
  env var is passed through; Vite appends it to the dev server allowedHosts.
- **Secrets:** none required — the app has no external integrations.
- **Localization (fa-IR):** the site is fully Persian/RTL — `index.html` is
  `lang="fa" dir="rtl"`. Typography is Yekan Bakh (یکان‌بخ): the licensed
  WOFF2 files must sit in `public/fonts/` with the exact names listed in
  `public/fonts/README.md`; until then Tahoma renders as a fallback and the
  font requests 404 harmlessly. Prices are stored as numeric Toman amounts
  directly in `src/data/products.ts` (fictional demo values, one editable
  source of truth per product); `src/lib/fa.ts#formatPrice` formats them
  with `Intl.NumberFormat("fa-IR")` + «تومان». Delivery fee / free-delivery
  threshold live in `src/lib/pricing.ts` (`DELIVERY_FEE`,
  `FREE_DELIVERY_THRESHOLD`). Jalali dates and Persian digits come from
  `Intl` fa-IR via `faDate`/`faNum`. Search normalization (ی/ي، ک/ك،
  digits, ZWNJ) lives in `normalizeFa`.
- **Honesty notes (by design):** checkout, account sign-in, newsletter and the
  contact form are demo flows — they validate locally and say so in the UI;
  no real payment/auth/email provider is wired.
- **Verify:** `curl http://localhost:3000/` should return the SPA index.html;
  check `/collection`, `/product/drop-chair`, add-to-cart (cart badge in navbar).
- Unrelated legacy repo files (`DESIGN.md`, `code.html`, `screen.png`,
  `stitch_ (1).zip`) belong to an earlier project and are unused by the app.
