import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "37638591-1f50-4278-b021-09489e580d72-00-3k9a6j8j15ow4.kirk.replit.dev",
    ],
  },
});
