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
			{ 
				test: /\.(js)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ "@babel/preset-env"],
						plugins: ['@babel/plugin-proposal-class-properties']
					  }
				}
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