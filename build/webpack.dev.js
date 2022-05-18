const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    port: "3001",
    hot: true,
    // 终端仅打印error
    // stats: "errors-only",
    compress: true, // 启用gzip 压缩
    proxy: {
      "/api": {
        target: "http://0.0.0.0:80",
        pathRewrite: {
          "/api": "",
        },
      },
    },
  },
});
