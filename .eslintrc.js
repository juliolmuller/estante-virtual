module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'lacussoft',
    'lacussoft/vue/v2',
  ],
  ignorePatterns: [
    'public/*',
    '!public/**/*.js',
    '!babel.config.js',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {},
}
