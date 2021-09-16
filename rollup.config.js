/* eslint-disable @typescript-eslint/no-var-requires */
const { terser } = require('rollup-plugin-terser');

module.exports = [
  {
    input: 'dist/browser/index.js',
    output: {
      file: './dist/browser/rbac.bundle.min.js',
      format: 'iife',
      sourcemap: true,
      name: 'RBAC',
      exports: 'named',
    },
    plugins: [
      terser({
        compress: true,
      }),
    ],
  },
  {
    input: 'dist/browser/index.js',
    output: {
      file: './dist/browser/rbac.bundle.js',
      format: 'iife',
      name: 'RBAC',
      exports: 'named',
    },
  },
];
