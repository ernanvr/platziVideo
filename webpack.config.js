const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, './src/index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},

	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
	},

	resolve: {
		extensions: ['.js', '.jsx'],
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
				test: /\.(css|scss)$/,
				use: [
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
					},
				],
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './public/index.html',
		}),
	],
};
