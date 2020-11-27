/**
 * 获取html字符串
 * */
// 模板解析
var miniTpl = require('../../../vendors/mini-tpl/mini-tpl');

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
				_obj.head_html = miniTpl(tpl.header.template, headData);
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
			_obj.foot_html = miniTpl(tpl.footer.template, footData);
		} else {
			console.log("没配置底部模板~");
		}
		// 判断内容模板是否配置
		if (tpl.container) {
			_obj.container_html = miniTpl(tpl.container.template, d);
		} else {
			console.log("请正确配置内容模板~");
			return false;
		}
		return _obj;
	};

	// 获取没有有头部的模板数据替换
	var getComponentHtml = function (tpl, d) {
		// 判断内容模板是否配置
		if (tpl.template) {
			var component_html = miniTpl(tpl.template, d);
		} else {
			console.log("请正确配置内容模板~");
			return false;
		}
		return component_html;
	};

	// 匹配页面Html
	var mathHtml = function (tpl, d, hashName) {
		// 设置数据默认值
		d = d || {};
		// 判断模板是否存在
		if (!tpl) {
			console.log("请正确配置模板");
			return;
		}
		// 判断是有head的html还是没有head的html
		if (tpl.container) {
			return getContainerHtml(tpl, d, hashName);
		} else {
			return getComponentHtml(tpl, d, hashName);
		}
	};

	return mathHtml;
});



