import { defineConfig } from "vite";

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
    outDir:  'docs',
  },
  server: {
    host: true,
  }
});
