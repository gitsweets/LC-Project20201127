// 数据解析
var miniTpl = require('../../vendors/mini-tpl/mini-tpl');
// 模板解析
var tplCompiler = require('../../vendors/tplCompiler/js/tplCompiler');

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
		root.loadComponent = factory();
	}
})(this, function() {
	//
	var self = '';
	// 载入商品详情页面
	var _loadComponent = function (apendEl, tpl, d, callback) {
		// 判断要插入html位置是否存在
		if (!apendEl) {
			console.log("请配置模块运行id~");
			return;
		}

		// 初始化组件
		this.init(apendEl, tpl, d, callback);
	};
	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	_loadComponent.prototype = {
		init : function (apendEl, tpl, d, callback) {
			var _obj = tplCompiler(tpl);
			// console.log(_obj);
			var html = miniTpl(_obj.template, d);
			// console.log(html);
			// 字符串插入到页面
			apendEl.innerHTML = html;

			// 回调事件
			callback && callback(apendEl);
		},
	};

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function (apendEl, tpl, d, callback) {

		// 载入功能模块
		return new _loadComponent(apendEl, tpl, d, callback);
	};

	return init;

});