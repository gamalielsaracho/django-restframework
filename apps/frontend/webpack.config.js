var webpack = require('webpack')
var path = require('path')
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// var autoprefixer = require('autoprefixer');
console.log('__dirname ------------------')
console.log(path.resolve(__dirname, 'static/dist'))

var browserConfig = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'static/dist'), 
		filename:'bundle.js',
		publicPath: '/'
	},

	module: {
		rules: [
			{
				test:/\.(js)$/,
				loader: 'babel-loader'				
			},
		    {
		    	test: /\.css$/,
		    	use: ['style-loader', 'css-loader?url=false']
		    }
		]

	}
}

module.exports = [browserConfig]