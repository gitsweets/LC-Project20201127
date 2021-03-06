// plugins
const extractTextPlugin = require('extract-text-webpack-plugin');
// 配置common路径
const commonPath = require('./projectConfig').commonPath;

// console.log(commonPath);
// 通用配置
const commonConfig = require(commonPath);
// 模块，各种 loaders
let loaders = {
	rules: [
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		},
		// url loader
		// 处理图片
		{
			test: /\.(png|jpg|gif)$/,
			use: [{
				loader: 'url-loader',
				options: {
					name: '[name].[ext]',
					publicPath: commonConfig.publicPath,
					outputPath: commonConfig.images.imgPath,
					limit: commonConfig.images.imgMaxSize,
					fallback: 'file-loader',
					// useRelativePath: true//这个必须与 outputPath 结合使用才可以处理 css 中的引入的图片
				}
			}]
		},
		{
			test: /\.(eot|woff2?|ttf|svg)$/,
			use: [
				{
					loader: "url-loader",
					options: {
						name: "[name]-[hash:5].min.[ext]",
						limit: commonConfig.fonts.fontMaxSize, // fonts file size <= 5KB, use 'base64'; else, output svg file
						publicPath: commonConfig.publicPath,
						outputPath: commonConfig.fonts.imgPath,
					}
				}
			]
		},
		{
			test: /\.html$/,
			use: [{
				loader: 'html-loader',
				options: {
					minimize: true
				}
			}],
		},
		{
			test: /\.vue$/,
			use: ['vue-loader']
		},
		// {
		// 	test: require.resolve('jquery'),
		// 	use: [{
		// 		loader: 'expose-loader',
		// 		options: 'jQuery'
		// 	},{
		// 		loader: 'expose-loader',
		// 		options: '$'
		// 	}]
		// }
	]
}
module.exports = loaders;