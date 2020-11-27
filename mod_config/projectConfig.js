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
	// 订单信息和提交支付 (成人疫苗)
	orderDetails_adult :{
		localPath:'./src/component/orderDetails_adult/',
		uploadPath:'/h5/test/tf/',
		commonPath: '../mod_common/orderDetails_adult.js',
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
	// 海关预约简化版
	customsSimp : {
		localPath:'./src/component/customs_simp/',
		uploadPath:'/h5/test/tf/',
		commonPath: '../mod_common/customs_simp.js',
	},
	// 康康血压仪设备绑定
	deviceBind_kk : {
		localPath:'./src/component/deviceBind_kk/',
		uploadPath:'/h5/test/tf/',
		commonPath: '../mod_common/deviceBind_kk.js',
	},
	// 二维码展示
	QRcode : {
		localPath:'./src/component/QRcode/',
		uploadPath:'/h5/test/tf/',
		commonPath: '../mod_common/QRcode.js',
	},
	// 产品详情 （活动）
	productDetails2011 : {
		localPath:'./src/views/productDetails2011/',
		uploadPath:'/h5/test/tf/',
		commonPath: '../mod_common/productDetails2011.js',
	},
	// 产品详情 （活动）
	drugInfo2011 : {
		localPath:'./src/views/productDetails2011/',
		uploadPath:'/h5/test/tf/',
		commonPath: '../mod_common/drugInfo2011.js',
	},
	// 药局首页 （20201121）
	internet_pharmacy : {
		localPath:'./src/views/InternetPharmacy/',
		uploadPath:'/h5/test/tf/',
		commonPath: '../mod_common/InternetPharmacy.js',
	},
};

const configObj = config[projectName.name];
module.exports = configObj;