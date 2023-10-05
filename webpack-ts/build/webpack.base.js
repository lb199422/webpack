console.log('NODE_ENV', process.env.NODE_ENV);
console.log('BASE_ENV', process.env.BASE_ENV);

const path = require('path');
// 配置vue-loader
const { VueLoaderPlugin } = require('vue-loader');
// html
const HtmlWebpackPlugin = require('html-webpack-plugin');
//
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, '../src/index.ts'), // 入口文件
  // 出口文件
  output: {
    filename: 'bundle.[contenthash:8].js', // 输出js的名称
    path: path.join(__dirname, '../disk'), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/', // 打包后文件的公共前缀路径
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // 匹配.vue文件
        use: 'vue-loader', // 用vue-loader去解析vue文件
      },
      {
        test: /\.ts$/, // 匹配.ts文件
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-typescript',
                {
                  allExtensions: true, //支持所有文件扩展名(重要)
                },
              ],
            ],
          },
        },
      },
      // 解析style css scss
      {
        test: /.(css|scss)$/, //匹配 css 文件
        use: [
          'style-loader',
          'css-loader',
          // css自动前缀
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    // ...
    new VueLoaderPlugin(), // vue-loader插件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
    //配置环境变量
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  // 配置extensions
  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
  },
};
