import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Copy public folder to dist
    copyPublicDir: true
  },
  // Base URL - important for Vercel
  base: '/',
  server: {
    port: 3000,
    open: true
  }
})