import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/EstateManager/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "EstateFlow",
        short_name: "EstateFlow",
        description: "Real estate agency operations — agents, listings, commissions, and live ops.",
        theme_color: "#102022",
        background_color: "#f6f4ee",
        display: "standalone",
        orientation: "portrait",
        scope: "/EstateManager/",
        start_url: "/EstateManager/",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          { src: "pwa-maskable-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,webp,woff,woff2}"],
        navigateFallback: "/EstateManager/index.html",
      },
      devOptions: { enabled: false },
    }),
  ],
});
