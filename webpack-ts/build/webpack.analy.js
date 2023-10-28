// 分析配置
const prodConfig = require('./webpack.prod.js');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // 引入分析打包结果插件

prodConfig.plugins.push(new BundleAnalyzerPlugin());
module.exports = prodConfig;
