// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // Always use semicolons
    'semi' : [1, "always"],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // Not using var
    "no-var": 1,
    // Max 2 lines spaces
    "no-multiple-empty-lines": [2, {"max": 2, "maxEOF": 0}],
    // Use tabs only for indentation
    "indent": ["error", "tab"],
    // Enable tabs
    "no-tabs": 0,
  },
  "globals": {
    "Vue": true
  }
}
