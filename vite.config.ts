import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 告訴 Vue 這些是自定義元素
          isCustomElement: (tag) => tag.startsWith("arcgis-"),
        },
      },
    }),
  ],
});
