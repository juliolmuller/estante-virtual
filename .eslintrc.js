module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'lacussoft',
    'lacussoft/vue',
    'lacussoft/typescript',
    '@vue/typescript/recommended',
  ],
  ignorePatterns: [
    'public/*',
    '!public/**/*.js',
    '!babel.config.js',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'import-helpers/order-imports': 'off',
    'vue/valid-define-props': 'error',
  },
}
