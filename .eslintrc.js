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
  globals: {
  },
  // required to lint *.vue files
  plugins: [
    // 'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // my：分号结尾 无
    'semi': ['error', 'always'],
    // my：声明未使用 警告
    'no-unused-vars': 1,
    // my：缩进 无
    'indent': 0,
    // my: 允许对象尾逗号
    "comma-dangle": ["error", {
      "objects": "only-multiline"
    }]
  }
};
