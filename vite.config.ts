import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("arcgis-"),
        },
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:44388",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
        secure: false,
      },
      "/nlsc-wmts-proxy": {
        target: "https://wmts.nlsc.gov.tw",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/nlsc-wmts-proxy/, ""),
        headers: {
          Referer: "https://maps.nlsc.gov.tw/",
          Origin: "https://maps.nlsc.gov.tw",
        },
      },
      "/nlsc-wms-proxy": {
        // ← WMS 獨立一個 proxy
        target: "https://wms.nlsc.gov.tw", // ← 注意是 wms 不是 wmts
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/nlsc-wms-proxy/, ""),
        headers: {
          Referer: "https://maps.nlsc.gov.tw/",
          Origin: "https://maps.nlsc.gov.tw",
        },
      },
    },
  },
});
