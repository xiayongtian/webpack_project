module.exports = {
  extends: ["react-app"], // 继承 react 官方规则
  parserOptions: {
    babelOptions: {
      presets: [
        // 解决页面报错问题
        ["babel-preset-react-app", false],
        "babel-preset-react-app/prod",
      ],
    },
  },
  rules: {  //用户可以自定义规则，弥补继承规则的不足
    "no-var": 2,  //不能使用var定义变量
    "consistent-return": 2,
    "indent": [1, 4],
    "space-unary-ops": 2,
    "no-empty-function": 0,
  },
};