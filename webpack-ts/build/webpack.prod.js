// build/webpack.prod.js
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
// 打包时复制public 下文件
const path = require('path');
// 复制public 下文件
const CopyPlugin = require('copy-webpack-plugin');
// 抽离css插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// 压缩js
const TerserPlugin = require('terser-webpack-plugin');

// 配置对象
const config = merge(baseConfig, {
  mode: 'production', // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  plugins: [
    // 复制文件插件
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'), // 复制public下文件
          to: path.resolve(__dirname, '../dist'), // 复制到dist目录中
          filter: (source) => {
            return !source.includes('index.html'); // 忽略index.html
          },
        },
      ],
    }),
    // 抽离css插件  兼容写法这里注释
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].[contenthash:8].css', // 抽离css的输出目录和名称
    // }),
  ],
  optimization: {
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(), // 压缩css
      // 压缩js
      new TerserPlugin({
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'], // 删除console.log
          },
        },
      }),
    ],
    splitChunks: {
      // 分隔第三方包和公共模块
      cacheGroups: {
        vendors: {
          // 提取node_modules代码
          test: /node_modules/, // 只匹配node_modules里面的模块
          name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        commons: {
          // 提取页面公共代码
          name: 'commons', // 提取文件命名为commons
          minChunks: 2, // 只要使用两次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
        },
      },
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
// module.exports = config;
