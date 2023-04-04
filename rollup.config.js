import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json' assert { type: 'json' };

export default [
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'lib/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
        plugins: [terser()]
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
        exports: 'named',
        plugins: [terser()]
      }
    ],
    external: [
      "@abw/badger",
      "@abw/badger-filesystem",
      "@abw/badger-timestamp",
      "@abw/badger-utils",
      "nunjucks",
    ],
    plugins: [
      nodeResolve(),
      copy({
        targets: [
          {
            src: 'scaffold/*',
            dest: 'dist/scaffold',
          },
          {
            src: 'bin/*',
            dest: 'dist/bin',
            transform: (contents, filename) =>
              contents.toString().replace('../lib/index.js', '@abw/scaffold')
          },
        ],
      }),
    ],
  }
];
