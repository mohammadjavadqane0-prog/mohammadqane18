# Yekan Bakh (یکان‌بخ) font files

Upload your licensed Yekan Bakh font files into this folder (`public/fonts/`)
using these exact file names. They are picked up immediately on the next page
load — no code change needed (`font-display: swap` is already configured).

| File name | Weight |
| --- | --- |
| `YekanBakh-Light.woff2` | 300 |
| `YekanBakh-Regular.woff2` | 400 |
| `YekanBakh-Medium.woff2` | 500 |
| `YekanBakh-SemiBold.woff2` | 600 |
| `YekanBakh-Bold.woff2` | 700 |
| `YekanBakh-ExtraBold.woff2` | 800 |

Notes:

- WOFF2 is preferred; a `.woff` version of each weight is also supported as a
  fallback (`YekanBakh-<Weight>.woff`).
- If you only have a subset of weights, upload those — the interface requests
  400, 600 and 700 the most; 300 and 800 are optional.
- Until the files exist, the site renders with the Tahoma fallback stack and
  the browser logs harmless 404s for the font requests.
