const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "production",
  devtool: "hidden-source-map",
  // 缓存配置
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  //代码拆分
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
});
