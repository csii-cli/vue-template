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
    eqeqeq: [2, 'allow-null'],
    'vue/require-name-property': 'warn', // 在Vue组件中需要一个name属性
    'vue/order-in-components': 'warn', // 强制组件中属性的顺序
    'vue/attribute-hyphenation': 'warn', // 在模板中的自定义组件上强制属性命名样式
    'vue/require-valid-default-prop': 'warn' // 强制props默认值有效
  }
}
