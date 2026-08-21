import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  // GitHub Pages uses /SmartCare/
  // Netlify uses /
  base: process.env.NETLIFY ? '/' : '/SmartCare/',

  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },

  server: {
    hmr: process.env.DISABLE_HMR !== 'true',

    watch: process.env.DISABLE_HMR === 'true'
      ? null
      : {},
  },
})