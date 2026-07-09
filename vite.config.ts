import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/FINA_WEBSITE/",
  plugins: [react()],
  server: { port: 5173 },
});
