module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@lacussoft',
  ],
  ignorePatterns: [
    '!babel.config.js',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
}
