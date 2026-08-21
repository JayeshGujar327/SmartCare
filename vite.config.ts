import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/SmartCare/',

  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },

  server: {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // File watching is disabled when DISABLE_HMR is true.
    hmr: process.env.DISABLE_HMR !== 'true',

    watch: process.env.DISABLE_HMR === 'true'
      ? null
      : {},
  },
})