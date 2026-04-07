import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // Устанавливаем базовый путь как корневой
  base: "/",
  plugins: [
    react(), 
    tailwindcss()
  ],
  build: {
    // Включаем сжатие обратно (оно нужно для работы Tailwind), 
    // но разделяем код на части, чтобы избежать ошибок загрузки
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Выносим тяжелые библиотеки в отдельный файл
          vendor: ['react', 'react-dom', 'framer-motion'],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
