const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
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
        generator: {
          filename: 'assets/images/[hash].[ext]',
        },
      },

    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new Dotenv(),
    new CleanWebpackPlugin(),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3006,
    historyApiFallback: true,
  },
};
