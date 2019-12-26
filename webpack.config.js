var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: "./public/index.js",
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: "index_bundle.js"
	},
	module: {
		rules: [
		// 	{
		// 		test: /\.tsx?$/,
		// 		loader: 'babel-loader',
		// 	},
			{ 
				test: /\.(js)$/,
				use: 'babel-loader'
			}
		]
	},
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/index.html'
		})
	]
}