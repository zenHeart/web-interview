module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    'jest/globals': true // 添加 jest 环境
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:jest/recommended',
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
    'jest'
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
    'react/prop-types': 'off',
    'jest/valid-title': 'off'
  },
  settings: {
    'mdx/code-blocks': true
  }
}
