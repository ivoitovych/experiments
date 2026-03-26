module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'prettier', // must be last — disables ESLint rules that conflict with Prettier
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    // ─── React ───────────────────────────────────────────────────────────────
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

    // ─── TypeScript strict rules ──────────────────────────────────────────────
    '@typescript-eslint/no-explicit-any': 'error',          // zero `any` — use unknown/generics
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-imports': 'error',  // import type { Foo } not import { Foo }
    '@typescript-eslint/no-floating-promises': 'error',     // always handle promise results
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off', // inferred return types are fine in TSX

    // ─── General quality ─────────────────────────────────────────────────────
    'no-console': ['warn', { allow: ['warn', 'error'] }],   // prefer proper logging
    'prefer-const': 'error',
    'no-var': 'error',
  },
};
