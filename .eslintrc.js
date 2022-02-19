module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'lacussoft',
    'lacussoft/vue',
  ],
  ignorePatterns: [
    'public/*',
    '!public/**/*.js',
    '!babel.config.js',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'import-helpers/order-imports': 'off',
  },
}
