import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

/**
 * Standalone Vite config for web-only (e.g. Vercel) builds.
 * Uses plain Vite so we only build the renderer app — no electron-vite multi-target.
 */
export default defineConfig({
  root: path.resolve(__dirname, 'src/renderer'),
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@renderer': path.resolve(__dirname, 'src/renderer/src')
    }
  },
  build: {
    outDir: path.resolve(__dirname, 'out/renderer'),
    emptyOutDir: true
  }
})
