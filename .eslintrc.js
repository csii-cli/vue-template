module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    window: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0, // function前面的空格没有必要校验,
    'no-unused-vars': 0,
    eqeqeq: [2, 'allow-null']
  }
}
