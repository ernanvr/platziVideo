const path = require('path');
const Dotenv = require('dotenv-webpack');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressWebpackPlugin = require('compression-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

require('dotenv').config();

const isDev = (process.env.ENV === 'development');
const entry = ['./src/frontend/index'];

if (isDev) {
  entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true');
  entry.unshift('react-hot-loader/patch');
}

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, 'src/server/public'),
    filename: isDev ? 'assets/app.js' : 'assets/app-[chunkhash].js',
    publicPath: '/',
    assetModuleFilename: 'assets/images/[hash][ext]',
  },

  mode: process.env.ENV,

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
    isDev ? new webpack.HotModuleReplacementPlugin() : () => {},
    new MiniCssExtractPlugin({
      filename: isDev ? 'assets/app.css' : 'assets/app-[chunkhash].css',
    }),
    isDev ? () => {} : new CompressWebpackPlugin({
      test: /\.(js|css)$/,
      filename: '[path][base].gz',
    }),
    new Dotenv(),
    isDev ? () => { } : new WebpackManifestPlugin(),
    isDev ? () => { } : new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: path.resolve(__dirname, 'src/server/public'),
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true,
          priority: 1,
          filename: isDev ? 'assets/vendor.js' : 'assets/vendor-[chunkhash].js',
          enforce: true,
          test(module) {
            const name = module.nameForCondition && module.nameForCondition();
            return (chunk) => chunk.name !== 'vendors' && /[\\/]node_modules[\\/]/.test(name);
          },
        },
      },
    },
  },
};
