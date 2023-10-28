const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
// 抽取css 样式
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 合并公共配置,并添加开发环境配置
const config = merge(baseConfig, {
  mode: 'development', // 开发模式,打包更加快速,省了代码优化步骤
  devtool: 'eval-cheap-module-source-map', // 源码调试模式,后面会讲
  devServer: {
    port: 3000, // 服务端口号
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    hot: true, // 开启热更新，后面会讲vue3模块热替换具体配置
    historyApiFallback: true, // 解决history路由404问题
    static: {
      directory: path.join(__dirname, '../public'), //托管静态资源public文件夹
    },
    client: {
      logging: 'info',
      overlay: {
        errors: true,
        warnings: true,
      },
      progress: true,
    },
  },
});

// 时间分析工具 speed-measure-webpack-plugin
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
// 兼容MiniCssExtractPlugin  SpeedMeasurePlugin
let SpeedMeasurePluginConfig = smp.wrap(config);
SpeedMeasurePluginConfig.plugins.push(
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css', // 抽离css的输出目录和名称
  })
);
module.exports = SpeedMeasurePluginConfig;
