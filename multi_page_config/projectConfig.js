const projectName = require('./project');
// console.log("项目名称", projectName);
const config = {
	// 多页面打包配置
	multiPage : {
		localPath:'./src/component/orderDetails/',
		uploadPath:'/h5/test/tf/',
		commonPath: '../multi_page_common/multiPage.js',
	},
	// 体检页面打包配置
	physical : {
		localPath:'./src/component/orderDetails/',
		uploadPath:'/h5/test/tf/',
		commonPath: '../multi_page_common/physical.js',
	},
	// 订单详情
	orderInfo : {
		localPath:'./src/component/orderInfo_Inspection/',
		uploadPath:'/h5/test/tf/',
		commonPath: '../multi_page_common/orderInfo.js',
	},
};

const configObj = config[projectName.name];
module.exports = configObj;