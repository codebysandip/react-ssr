module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    'plugin:react/recommended',
    'standard',
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    "react-hooks",
    "prettier"
  ],
  rules: {
    "no-use-before-define": 0,
    "dot-notation": 0,
    "n/handle-callabck-err": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-empty-interface": 0,
  }
}
