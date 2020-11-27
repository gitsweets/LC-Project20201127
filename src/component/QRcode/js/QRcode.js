// 组件引用
// 获取匹配模板
var getTpl = require('../tool/tplMath');
// 获取模板HTML
var getHtml = require('../tool/getHtml');
// 工具集
var utils = require('../tool/utils');

/**
 * 业务逻辑
 *
 * */
(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.deviceBind = factory();
	}
})(this, function() {

	/**
	 * 数据
	 */
		// 接口参数和返回数据
	var data = {
			// 绑定设备
			bindDevice : {
				reqUrl	: '2/kangkangbloodpressuremonitor/api:get_device_info_by_sn',
				reqDevUrl	: '2/kangkangbloodpressuremonitor/api:get_device_info_by_sn',
				reqJson : "../../data/drugInfo/addpreotc.json",
				flag		: false,
			},
		};

	/**
	 * 本地数据
	 */
	var global = {

	};

	// 载入商品详情页面
	var loadQRcode = function (apendEl) {
		// debugger
		// 判断要插入html位置是否存在
		// if (!apendEl) {
		// 	console.log("请配置模块运行id~");
		// 	return;
		// }

		// 生成hash
		this.hash = utils.createHash(8);
		
		// 储存插入元素对象
		this.el = apendEl;

		// 判断是否绑定设备
		this.init();
	};
	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	loadQRcode.prototype = {
		init : function () {
			console.log('初始化操作~');
			// 获取模板TPL对象
			var tpl = getTpl('QRcode');
			console.log(tpl);

			// 设置数据对象, 如果数据不存在设置为空对象
			var _data = QRcodeInfo || {};

			// 判断是微信端
			// _data.is_wx = is_wx;

			console.log(_data);
			// 获取模板字符串对象
			var html_obj = getHtml(tpl, _data, pageTitle);
			console.log(html_obj);
			// 判断模板字符串不存在，终止运行
			if (!html_obj) return;

			// 判断是APP，head_html设为空
			if (android_app || ios_app || is_wx) {
				html_obj.head_html = '';
			}

			// 子组件中js字符串转对象 (测试)
			var json = (new Function("return " + tpl.header.script))();
			console.log(json);
			var _obj = json();
			console.log(header);



			// 插入HTML字符串
			utils.insertHtmlStr(html_obj, this.el);

			// 判断是否触发过期事件
			if (QRcodeInfo.is_countdown) {
				this.expiredHand(QRcodeInfo);
			}

		},

		// 触发过期操作
		expiredHand : function (obj) {
			console.log("触发过期操作~");
			var _this = this,
				t = parseInt(obj.time_remaining_seconds);
			// 设置过期定时器，自动刷新页面
			setTimeout(function () {
				// 过期自动刷新页面
				location.reload();
				_this.init();
			}, t*1000);
		},

	};

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function (apendEl) {
		console.log(this);
		// debugger
		// 载入功能模块
		return new loadQRcode(apendEl);
	};

	return init;

});