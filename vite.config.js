import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * STEP 1: Configure Vite with Tailwind CSS and Path Aliases
 * ============================================================
 * This setup achieves multiple goals:
 * 1. Installs Tailwind CSS and its peer dependencies via npm
 * 2. Runs tailwind init to generate tailwind.config.js and postcss.config.js
 * 3. Imports resolve, dirname from 'path' module and fileURLToPath from 'url' module
 * 4. Configures path aliases using Vite's resolve.alias configuration
 *
 * Benefits:
 * - Path aliases enable cleaner imports: '#components' instead of '../../../components'
 * - Improves code readability and maintainability
 * - Makes it easier to refactor folder structures without updating numerous import paths
 * - Aliases configured: #components, #constants, #store, #hoc, #windows
 */
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "#components": resolve(
        dirname(fileURLToPath(import.meta.url)),
        "src/components",
      ),
      "#constants": resolve(
        dirname(fileURLToPath(import.meta.url)),
        "src/constants",
      ),
      "#store": resolve(dirname(fileURLToPath(import.meta.url)), "src/store"),
      "#hoc": resolve(dirname(fileURLToPath(import.meta.url)), "src/hoc"),
      "#windows": resolve(
        dirname(fileURLToPath(import.meta.url)),
        "src/windows",
      ),
    },
  },
});
