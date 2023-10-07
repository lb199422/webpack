// 分析配置
const prodConfig = require('./webpack.prod.js');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // 引入分析打包结果插件
module.exports = merge(prodConfig, {
  plugins: [
    new BundleAnalyzerPlugin(), // 配置分析打包结果插件
  ],
});
