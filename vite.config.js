import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  build: {
    minify: true,
    sourcemap: false,
    lib: {
      entry: 'lib/index.js',
      name: '@abw/scaffold',
      fileName: 'scaffold',
    },
    rollupOptions: {
    },
  },
})
