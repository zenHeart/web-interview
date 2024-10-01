import path from 'node:path';
import url from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  ...compat.config({
    ignorePatterns: ['book', 'node_modules', '**/tempCodeRunnerFile.js', '**/*.ignore.test.js'],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module' // Use 'module' for ES Modules
    },
    env: {
      node: true
    },
    extends: [
      'eslint-config-standard',
      'plugin:mocha/recommended'
    ],
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'no-restricted-syntax': 'off'
    },
    overrides: [
      {
        files: 'src/**/*.test.js',
        rules: {
          'no-unused-expressions': 'off',
          'mocha/no-setup-in-describe': 'off',
          'mocha/max-top-level-suites': 'off',
          'no-extend-native': 'off'
        }
      }
    ]
  })
];
