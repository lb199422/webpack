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
  // 入口
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
        use: ['thread-loader', 'vue-loader'], // 用vue-loader去解析vue文件
      },
      {
        test: /\.ts$/,
        use: ['thread-loader', 'babel-loader'], // thread-loader 多线程loader
      },
      // 解析style css  postcss-loader scss
      {
        test: /\.css$/, //匹配所有的 css 文件
        include: [path.resolve(__dirname, '../src')],
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/, //匹配 scss 文件
        include: [path.resolve(__dirname, '../src')],
        use: [
          'style-loader',
          'css-loader',
          // css自动前缀
          'postcss-loader',
          'sass-loader',
        ],
      },
      // 处理文字文件
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: 'fonts.[name][ext]', // 文件输出目录和命名
        },
      },
      // 处理文件
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: '[name][ext]', // 文件输出目录和命名
        },
      },
    ],
  },

  // 插件
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
    alias: {
      '@': path.join(__dirname, '../src'),
    },
    // 如果用的是pnpm 就暂时不要配置这个，会有幽灵依赖的问题，访问不到很多模块。
    // 查找第三方模块只在本项目的node_modules中查找
    modules: [path.resolve(__dirname, '../node_modules')],
  },

  // 缓存
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
};
