import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

const INPUT_FILE_PATH = 'src/index.ts';

const PLUGINS = [
  typescript({
    tsconfig: './tsconfig.build.json',
  }),
  babel({
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
  }),
  resolve({
    browser: true,
    resolveOnly: [/^(?!react$)/, /^(?!react-dom$)/, /^(?!prop-types)/],
  }),
  commonjs(),
];

const OUTPUT_DATA = [
  {
    file: pkg.main,
    format: 'cjs',
  },
  {
    file: pkg.module,
    format: 'es',
  },
];

const config = OUTPUT_DATA.map(({ file, format }) => ({
  input: INPUT_FILE_PATH,
  output: {
    file,
    format,
    sourcemap: true,
  },
  // https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
  external: ['react', 'react-dom', 'prop-types', /@babel\/runtime/],
  plugins: PLUGINS,
}));

export default config;
