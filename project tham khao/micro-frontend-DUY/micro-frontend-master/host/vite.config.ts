import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        netflix_service: "http://localhost:4176/assets/remoteEntry.js",
        bank_service: "http://localhost:4177/assets/remoteEntry.js",
      },
    }),
  ],
  server: {
    port: 4173,
  },
  build: {
    target: "esnext",
  },
  preview: {
    port: 4173,
  },
});
