// 路由模块
var router = require("../../../vendors/router/js/router");

// 业务组件
import customs_home from './customs_home';
import appointment_record from './appointment_record';
import appointment_details from './appointment_details';
import appointment_info from './appointment_info';
import register_info from './register_info';
import register_record from './register_record';
import hot_selling from './hot_selling';
import epidemic_surveying from './epidemic_surveying';
import select_country from './select_country';

// 配置路由
var routes = [
	{		// 首页
		path: '/',
		name: pageTitleArr["home"],
		callback: customs_home,
	},
	{		// 首页
		path: '/home',
		name: pageTitleArr["home"],
		callback: customs_home,
	},
	{		// 预约
		path: '/appointmentInfo',
		name: pageTitleArr["appointmentInfo"],
		callback: appointment_info,
	},
	{		// 预约记录
		path: '/appointmentRecord',
		name: pageTitleArr["appointmentRecord"],
		callback: appointment_record,
	},
	{		// 预约详情
		path: '/appointmentDetails',
		name: pageTitleArr["appointmentDetails"],
		callback: appointment_details,
	},
	{		// 登记
		path: '/registerInfo',
		name: pageTitleArr["registerInfo"],
		callback: register_info,
	},
	{		// 登记记录
		path: '/registerRecord',
		name: pageTitleArr["registerRecord"],
		callback: register_record,
	},
	{		// 热卖区
		path: '/hotSelling',
		name: pageTitleArr["hotSelling"],
		callback: hot_selling,
	},
	{		// 流行病调查(未做)
		path: '/epidemicSurveying',
		name: pageTitleArr["epidemicSurveying"],
		callback: epidemic_surveying,
	},
	{		// 选择国家
		path: '/selectCountry',
		name: '选择国家',
		callback: select_country,
	},
];

router.init({
	routerViewId	: "#customs_simp",
	animationName : "fade",
	pageBoxClass	: "page-box",
	routerMap 		: routes,
});

router.beforeEach(function(transition) {
	console.log('切换之 前 dosomething', transition);
	setTimeout(function() {
		// 移除弹出状态
		// $(".drawer").remove();
		//模拟切换之前延迟，比如说做个异步登录信息验证
		transition.next();
	}, 100)
});

router.afterEach(function(transition) {
	console.log("切换之 后 dosomething", transition)
});

export default router;

