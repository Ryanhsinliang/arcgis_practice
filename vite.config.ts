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
  server:{
    proxy:{
      '/api':{
      target:'http://localhost:44388',
      changeOrigin:true,
      rewrite:(path:string)=>path.replace(/^\/api/, ''),
      secure:false
    }
    }
  }
});
