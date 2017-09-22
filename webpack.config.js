const path = require('path');
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  entry: './dev/index.js',
  module: {
  loaders: [
		{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
		{
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
			  fallback: 'style-loader',
			  //resolve-url-loader may be chained before sass-loader if necessary
			  use: [{loader:'css-loader', options: {minimize: true}}, 'sass-loader']
			})
		},
		{ test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: "style-loader",use: "css-loader"})}
	  ],
	},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  plugins: [
	new ExtractTextPlugin("styles.css"),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
};