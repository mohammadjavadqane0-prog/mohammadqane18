import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Preview-only overrides (BASE44_PREVIEW_MODE == "1", set by the sandbox):
// - poll for file changes (bind mounts don't propagate inotify events)
// - allow the sandbox preview host/origin so Vite serves dev assets to the proxy
// With the flag unset or any other value, stock Vite behavior is preserved.
const isPreview = process.env.BASE44_PREVIEW_MODE === "1";

const allowedHosts: string[] = [];
if (isPreview) {
  if (process.env.BASE44_SANDBOX_HOST_DOMAIN) {
    allowedHosts.push(`.${process.env.BASE44_SANDBOX_HOST_DOMAIN}`);
  }
  if (process.env.BASE44_PUBLIC_HOST_SUFFIX) {
    allowedHosts.push(`.${process.env.BASE44_PUBLIC_HOST_SUFFIX}`);
  }
}

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    ...(isPreview ? { watch: { usePolling: true, interval: 300 } } : {}),
    ...(allowedHosts.length ? { allowedHosts } : {}),
  },
});
