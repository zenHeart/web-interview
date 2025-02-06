module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:mocha/recommended',
    'plugin:mdx/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
      plugins: [
        '@babel/plugin-transform-class-properties',
        '@babel/plugin-transform-private-methods',
        '@babel/plugin-transform-private-property-in-object'
      ]
    }
  },
  plugins: [
    'markdown',
    'mocha'
  ],
  overrides: [
    {
      files: ['**/*.md'],
      processor: 'markdown/markdown'
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
      ]
    }
  ],
  rules: {
    'mocha/no-setup-in-describe': 'off',
    'react/prop-types': 'off'
  },
  settings: {
    'mdx/code-blocks': true
  }
}
