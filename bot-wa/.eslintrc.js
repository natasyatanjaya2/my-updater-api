export default {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@html-eslint/recommended'
  ],
  plugins: ['@html-eslint'],
  overrides: [
    {
      files: ['*.html'],
      parser: '@html-eslint/parser',
      extends: ['plugin:@html-eslint/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Tambahan aturan opsional:
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    'semi': ['error', 'always'],
    'quotes': ['error', 'single']
  }
};
