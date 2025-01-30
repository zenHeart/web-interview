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
    'plugin:mdx/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
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
      ],
      rules: {
        // 在此处添加 TypeScript 特定的规则
      }
    }
  ],
  rules: {
    'mocha/no-setup-in-describe': 'off'
  },
  settings: {
    'mdx/code-blocks': true
  }
}
