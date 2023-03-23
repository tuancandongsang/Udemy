import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "bank-service",
      filename: "remoteEntry.js",
      exposes: {
        "./web-components": "./src/main.jsx",
      },
    }),
  ],
  server: {
    port: 4177,
  },
  build: {
    target: "esnext",
    cssCodeSplit: false
  },
  preview: {
    port: 4177,
  },
});
