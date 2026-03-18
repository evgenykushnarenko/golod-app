import { defineConfig } from 'vite'

export default defineConfig({
  base: '/golod-app/',
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 3000
  }
})
