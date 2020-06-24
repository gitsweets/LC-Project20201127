// 相对路径
const path = require('path');

// 配置common路径
const commonPath = require('../multi_page_config/projectConfig').commonPath;
console.log(commonPath);

// 通用配置
const commonConfig = require(commonPath);
// console.log(__dirname);
// console.log(commonConfig);
// console.log(commonConfig.multiPage);

// 获取多页面入口对象
const getEntryObj = require('../multi_page_config/getEntryObj');
commonConfig.entry = getEntryObj(commonConfig.multiPage, commonConfig.devPath);
// console.log(commonConfig.entry);

// Loaders
const _loaders = require('../multi_page_config/loaders.build');
// plugins
const _plugs = require('../multi_page_config/plugins.build');

module.exports = {
	// 入口
	entry: commonConfig.entry,

	// externals:{
	// 	jquery:'jQuery'
	// },

	// 输出
	output:{
		path: path.resolve(__dirname, commonConfig.buildPath), //将js文件打包到dist/js的目录
		publicPath: commonConfig.buildPublicPath,
		filename: commonConfig.js.buildPath, //使用[name]打包出来的js文件会分别按照入口文件配置的属性来命名
	},

	// 本地开发调试工具
	// devServer: commonConfig.devServer,

	// 模块，各种 loaders
	module: _loaders,

	// plugins
	plugins: _plugs,

};