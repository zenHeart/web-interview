module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:mocha/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
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
    }
  ],
  rules: {
    'mocha/no-setup-in-describe': 'off'
  }
}
