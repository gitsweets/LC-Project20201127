/**
 * 获取html字符串
 * */
// 模板解析
var miniTpl = require('../../../../vendors/mini-tpl/mini-tpl');

// 模板解析
var tplCompiler = require('../../../../vendors/tplCompiler/js/tplCompiler-0.0.1');

;(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.getHtml = factory();
	}
})(this, function() {

	/**
	 * 工具类
	 * */
	var utils = {
		// 判断数据类型
		isObjFunc : function(type) {
			var _toString = Object.prototype.toString;
			return function() {
				return _toString.call(arguments[0]) === '[object ' + type + ']'
			}
		},
		// 判断是对象
		isObject : function() {
			return this.isObjFunc("Object")(arguments[0]);
		},
		// 判断是字符串
		isString : function() {
			return this.isObjFunc("String")(arguments[0]);
		},
	};

	// 页面模板 (有头部和底部)
	var pageTpl = function (container, header, footer) {
		// 判断内容模板不存在，不返回模板
		if (!container) {
			console.log("请正确配置内容模板~");
			return false;
		}
		// 设置初始化对象
		var _obj = {};
		// 判断头部是否存在
		if (header) {
			_obj.header = tplCompiler(header);
		} else {
			console.log("请正确配置头部模板~");
		}

		// 判断尾部是否存在
		if (footer) {
			_obj.footer = tplCompiler(footer);
		} else {
			console.log("请正确配置尾部模板~");
		}

		// 判断如果头部和尾部都不存在
		if (!header && !footer) {
			_obj = tplCompiler(container);
		} else {
			_obj.container = tplCompiler(container);
		}

		return _obj;
	};

	// 组件模板 （没有头部和底部）
	var componentTpl = function (container) {
		// 判断内容模板不存在，不返回模板
		if (!container) {
			console.log("请正确配置内容模板~");
			return false;
		}

		return tplCompiler(container);
	};

	// 获取有头部的模板数据替换
	var getContainerHtml = function (tpl, d, hashName) {
		var _obj = {};
		// 获取是否登录参数
		var isLogged = 1, skipUrl = "";
		if (d.login_info && d.login_info.is_logged) {
			isLogged = d.login_info.is_logged;
		}

		// 判断是APP，不返回headData数据
		if (!(android_app || ios_app)) {
			// 拼接head数据
			var headData = {
				is_logged: isLogged,
				url: skipUrl,
				title: hashName,
			};
			// 获取模板字符串
			if (tpl.header) {
				_obj.head_html = miniTpl(tpl.header, headData);
			} else {
				console.log("没配置头部模板~");
			}
		};

		// 判断是否返回footData
		if (tpl.footer) {
			// 拼接foot数据
			var footData = {
				is_logged: isLogged,
				url: skipUrl,
			};
			// 获取模板字符串
			_obj.foot_html = miniTpl(tpl.footer, footData);
		} else {
			console.log("没配置底部模板~");
		}
		// 判断内容模板是否配置
		if (tpl.container) {
			_obj.container_html = miniTpl(tpl.container, d);
		} else {
			console.log("请正确配置内容模板~");
			return false;
		}
		return _obj;
	};

	// 获取没有有头部的模板数据替换
	var getComponentHtml = function (tpl, d) {
		// 判断内容模板是否配置
		if (tpl) {
			var component_html = miniTpl(tpl, d);
		} else {
			console.log("请正确配置内容模板~");
			return false;
		}
		return component_html;
	};

	// 获取模板内容
	function getHtmlStr (tpl, d, hashName) {
		// 判断模板是字符串还是对象
		if (utils.isObject(tpl)) {
			// 获取对象有多少个属性
			var o_len = Object.getOwnPropertyNames(tpl).length;
			// 判断一个属性和多个属性分别操作
			if (o_len === 1) {
				var tplStr = componentTpl(tpl.container);
				return getComponentHtml(tplStr, d, hashName);
			} else if (o_len > 1) {
				var tplStr = pageTpl(tpl.container, tpl.header, tpl.footer);
				return getContainerHtml(tplStr, d, hashName);
			} else {
				console.log("模板对象不正确~");
			}
		} else if (utils.isString(tpl)) {
			var tplStr = componentTpl(tpl);
			return getComponentHtml(tplStr, d, hashName);
		}
	}

	// 匹配页面Html
	var init = function (tpl, d, hashName) {
		// console.log(tpl);
		// 设置数据默认值
		d = d || {};

		// 返回html元素
		return getHtmlStr(tpl, d, hashName);
	};

	return init;
});



