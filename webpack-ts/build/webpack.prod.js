// build/webpack.prod.js
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
// 打包时复制public 下文件
const path = require('path');
// 复制public 下文件
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production', // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  plugins: [
    // 复制文件插件
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'), // 复制public下文件
          to: path.resolve(__dirname, '../disk'), // 复制到dist目录中
          filter: (source) => {
            return !source.includes('index.html'); // 忽略index.html
          },
        },
      ],
    }),
  ],
});
