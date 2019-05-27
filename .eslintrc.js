// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // 要求使用单引号
    "quotes": [
      2,
      "single"
  ],
  // JavaScript代码强制使用一致的缩进：4格缩进
  "indent": [
      2,
      4
  ],
  // 要求使用 === 和 !==
  "eqeqeq": 2,
  // 禁用 eval()
  "no-eval": 2,
  // 禁用 void 操作符
  "no-void": 2,
  // 禁用 with 语句
  "no-with": 2,
  // 禁止出现未使用的变量
  "no-unused-vars": 2,
  // 强制在 JSX 属性中使用一致的单引号或双引号
  "jsx-quotes": [
      2,
      "prefer-double"
  ],
  // 要求对象字面量属性名称用引号括起来
  "quote-props": [
      2,
      "as-needed"
  ],
  // 要求在语句末尾使用分号
  "semi": [
      2,
      "always"
  ],
  // 此规则旨在确保中缀运算符周围有空格
  "space-infix-ops": [
      2,
      {
          "int32Hint": false
      }
  ],
  // 禁止使用var申明变量
  "no-var": 2,
  "react/jsx-uses-vars": 2
  }
}
