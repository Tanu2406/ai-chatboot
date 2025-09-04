import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        darkMode: "class",   // ✅ important
        content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // ✅ this tells Tailwind to scan src
        theme: { extend: {} },
        plugins: [],
      },
    }),
  ],
});
