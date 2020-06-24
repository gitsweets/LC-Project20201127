const projectName = require('./project');
// console.log("项目名称", projectName);
const config = {
	// 商品详情
	goodsInfo: {
		localPath:'./src/component/goodsInfo/',
		uploadPath:'/h5/test/cb/',
		commonPath: '../mod_common/goodsInfo.js',
	},
	// 药品详情
	drugInfo:{
		localPath:'./src/component/drugInfo/',
		uploadPath:'/h5/act/tf/',
		commonPath: '../mod_common/drugInfo.js',
	},
	// 支付订单
	paymentOrder:{
		localPath:'./src/component/paymentOrder/',
		uploadPath:'/h5/test/tf/',
		commonPath: '../mod_common/paymentOrder.js',
	},
	// 订单信息和提交支付
	orderDetails:{
		localPath:'./src/component/orderDetails/',
		uploadPath:'/h5/test/tf/',
		commonPath: '../mod_common/orderDetails.js',
	},
	// 订单详情
	orderInfo:{
		localPath:'./src/component/orderDetails/',
		uploadPath:'/h5/test/tf/',
		commonPath: '../mod_common/orderInfo.js',
	},
	// 多页面打包配置
	multiPage : {
		localPath:'./src/component/orderDetails/',
		uploadPath:'/h5/test/tf/',
		commonPath: '../multi_page_common/multiPage.js',
	},
};

const configObj = config[projectName.name];
module.exports = configObj;