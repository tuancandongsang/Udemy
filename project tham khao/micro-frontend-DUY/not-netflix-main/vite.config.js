import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({customElement:true}),    
    federation({
    name: "netflix-service",
    filename: "remoteEntry.js",
    exposes: {
      "./web-components": "./src/main.js",
    },
  }),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 4176,
  },
  build: {
    target: "esnext",
  },
  preview: {
    port: 4176,
  },
})
