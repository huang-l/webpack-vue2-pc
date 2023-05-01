const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV === "development";
const { VueLoaderPlugin } = require("vue-loader"); // 引入vue-loader的插件
const getLoader = () =>
  devMode ? "style-loader" : MiniCssExtractPlugin.loader;

module.exports = {
  entry: path.resolve(__dirname, "../src/main.js"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[chunkhash:8].js",
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: [getLoader(), "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [getLoader(), "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/, //匹配图片
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, //匹配文字
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      favicon: path.resolve(__dirname, "../public/logo.svg"),
      title: "webpack-vue2-pc",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: "",
          globOptions: {
            ignore: ["**/*.html"],
          },
        },
      ],
    }),
    new VueLoaderPlugin(),
  ],
  stats: "errors-only",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: [".js", ".json", ".vue"],
  },
  externals: {
    AMap: "AMap", // 高德地图配置
  },
};
