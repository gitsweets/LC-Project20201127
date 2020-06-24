const projectName = require('./project');
// console.log("项目名称", projectName);
const config = {
	// 多页面打包配置
	multiPage : {
		localPath:'./src/component/orderDetails/',
		uploadPath:'/h5/test/tf/',
		commonPath: '../multi_page_common/multiPage.js',
	},
};

const configObj = config[projectName.name];
module.exports = configObj;