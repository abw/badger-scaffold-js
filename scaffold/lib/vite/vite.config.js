import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import define from  './vite.defs.js'

export default defineConfig({
  plugins: [react()],
  define,
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.js',
    include: ['test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['test/setup.js', 'test/lib']
  },
  build: {
    minify: true,
    sourcemap: false,
    lib: {
      entry: "{{entry}}",
      name: '{{dist}}',
      fileName: '{{name}}',
    },
    rollupOptions: {
      external: [
{%- for module, symbol in external %}
        "{{module}}"{{',' if not loop.last }}
{%- endfor %}
      ],
      output: {
        globals: {
{%- for module, symbol in external %}
          "{{module}}": "{{symbol}}"{{',' if not loop.last }}
{%- endfor %}
        },
      },
    },
  },
})
