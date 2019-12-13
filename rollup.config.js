const {terser} = require('rollup-plugin-terser');

module.exports = [
  {
    input: 'dist/browser/index.js',
    output: {
      file: './dist/browser/rbac.bundle.min.js',
      format: 'iife',
    },
    plugins: [
      terser({
        sourcemap: true,
      }),
    ],
  },
  {
    input: 'dist/browser/index.js',
    output: {
      file: './dist/browser/rbac.bundle.js',
      format: 'iife',
    },
  },
];
