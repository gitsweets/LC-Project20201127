// 相对路径
const path = require('path');

// 配置common路径
const commonObj = require('../multi_page_config/projectConfig');
if (commonObj == undefined) {
	console.log("common配置不存在, 请配置对应的配置文件~");
}
const commonPath = commonObj.commonPath;
console.log(commonPath);
//
// 通用配置
const commonConfig = require(commonPath);

// 获取多页面入口对象
const getEntryObj = require('../multi_page_config/getEntryObj');
commonConfig.entry = getEntryObj(commonConfig.multiPage, commonConfig.devPath);
// console.log(commonConfig.entry);

// 访问地址
var visitUrl = 'http://'+commonConfig.devServer.host +':'+ commonConfig.devServer.port + '/';
// console.log(visitUrl);
console.log('');
// 获取多页面导航
const getNav = require('../multi_page_config/getNav');
navList = getNav(commonConfig.multiPage, 'dev', visitUrl);
// console.log(commonConfig.entry);
console.log('');

// Loaders
const _loaders = require('../multi_page_config/loaders.dev');
// plugins
const _plugs = require('../multi_page_config/plugins.dev');

module.exports = {
	// 入口
	entry: commonConfig.entry,
	// 输出
	output:{
		path: path.resolve(__dirname, commonConfig.devPath), //将js文件打包到dist/js的目录
		publicPath: commonConfig.devPublicPath,
		filename: commonConfig.js.devPath, //使用[name]打包出来的js文件会分别按照入口文件配置的属性来命名
	},
	// 引入第三方库
	// externals:{
	// 	jquery: window.jQuery
	// },

	// 本地开发调试工具
	devServer: commonConfig.devServer,

	// 模块，各种 loaders
	module: _loaders,

	// 解析
	// resolve: {
	// 	// 别名
	// 	alias: {
	// 		// 默认使用运行时文件 vue.runtime.esm.js
	// 		'$': 'vue/dist/vue.esm.js'
	// 	}
	// },

	// plugins
	plugins: _plugs,

};