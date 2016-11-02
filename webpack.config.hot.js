const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || '8080';
console.log("Listening on", PORT);
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var RemoveWebpackPlugin = require('remove-webpack-plugin');
var autoprefixer = require('autoprefixer');
var functions = require('postcss-functions');
var precss = require('precss');
var atImport = require("postcss-import");
var easyImport = require('postcss-easy-import');
var postCssModules = require('postcss-modules');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var postCssLoader = [
	'css-loader?modules',
	'&importLoaders=1',
	'&localIdentName=[name]__[local]___[hash:base64:5]',
	'&disableStructuralMinification',
	'!postcss-loader'
];

module.exports = {
	devtool: 'source-map',
	entry: [
		'webpack-dev-server/client?http://localhost:' + PORT,
		'webpack/hot/dev-server',
		'./src/index.jsx'
	],
	output: {
		path: './dist',
		filename: 'js/[name].js'
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new webpack.optimize.DedupePlugin(),
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
				loaders: ['style-loader', postCssLoader.join('')]
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
	},
	postcss: function() {
		return [
			atImport({
				plugins: [easyImport],
			}),
			postCssModules({
				generateScopedName: '[name]__[local]___[hash:base64:5]',
			}),
			autoprefixer,
			precss({
				variables: {
					variables: require('./src/styles/vars.css')
				}
			}),
			functions({
				functions: require('./src/styles/funcs.css')
			})
		];
	},
	devServer: {
		contentBase: './dist',
		hot: true,
		host: 'localhost',
		port: PORT
	}
};
