import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"

// This is a vite config file
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9000,
  },
  plugins: [
    // Add vue plugin to vite, so vite can compile .vue file
    vue()
  ]
})
