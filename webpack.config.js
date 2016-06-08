const NODE_ENV = process.env.NODE_ENV || 'development';
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var RemoveWebpackPlugin = require('remove-webpack-plugin');

module.exports = {
    devtool: 'source-map',
	entry: {
		index: './src/index.js'
	},
	output: {
		path: './dist',
		filename: 'js/[name].js'
	},
	plugins: [
		new RemoveWebpackPlugin('./dist'),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("styles.css", {})
    ],
	resolve: {
		moduleDirectories: ['node_modules'],
		extensions: ['', '.js', '.jsx']
	},
	module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/,
                include: __dirname
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
            }, {
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract("style-loader", 'css-loader?sourceMap!stylus-loader?resolve url')
			}, {
                test: /\.png$/,
                loader: "file-loader?name=images/[hash].[ext]"
            }, {
                test: /\.jpg$/,
                loader: "file-loader?name=images/[hash].[ext]"
            }, {
                test: /\.gif$/,
                loader: "file-loader?name=images/[hash].[ext]"
            }, {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[hash].[ext]'
            }
		]
	}
};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}
