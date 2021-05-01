module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@lacussoft',
  ],
  ignorePatterns: [
    'public/*',
    '!public/**/*.js',
    '!babel.config.js',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
}
