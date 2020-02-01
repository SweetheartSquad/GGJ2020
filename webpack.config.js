const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Development',
		}),
	],
	module: {
	  rules: [
		{
		  test: /\.css$/i,
		  use: ['style-loader', 'css-loader'],
		},
	  ],
	},
};
