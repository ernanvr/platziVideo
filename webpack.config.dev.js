const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['react-hot-loader/patch', './src/frontend/index', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/app.js',
    publicPath: '/',
    assetModuleFilename: 'assets/images/[hash][ext]',
  },

  mode: 'development',

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  stats: {
    children: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          // fallback to style-loader in development
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.png$/,
        type: 'asset/resource',
      },

    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/app.css',
    }),
    new Dotenv(),
  ],
};
