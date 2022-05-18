const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const rootDir = process.cwd();
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 自动前缀
const autoprefixer = require("autoprefixer");
// 打包后抽离css 文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  entry: path.resolve(rootDir, "src/index.js"),
  output: {
    path: path.resolve(rootDir, "dist"),
    filename: "bundle.[contenthash:8].js",
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(le|c)ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, "public/index.html"),
      inject: "body",
      scriptLoading: "blocking",
    }),
    //打包时清除上次构建产物
    new CleanWebpackPlugin(),
    // 抽离css 文件
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    //压缩css
    new CssMinimizerPlugin(),
  ],
};
