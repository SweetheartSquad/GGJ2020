const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	plugins: [
		new CleanWebpackPlugin(),
		new CopyPlugin([
		  { from: './src/images', to: './images' },
		]),
		new HtmlWebpackPlugin({
			title: 'Development',
		}),
		new webpack.DefinePlugin({
			PACK: JSON.stringify(process.env.PACK),
		})
	],
	module: {
		rules: [{
			test: /\.css$/i,
			use: ['style-loader', 'css-loader'],
		}, {
			test: /\.(png|jpe?g|gif)$/i,
			use: [{
				loader: 'file-loader',
			}],
		}],
	},
};
