/*
* 基于多模板（包含头、内容、底部的模板）的处理
* 1. 需要配置头、尾和内容
* */

// 模板引用
// 内容模板
var container = {
	home 										: require('../tpl/customs_home.html'),
	appointmentInfo 				: require('../tpl/appointment_info.html'),
	appointmentRecord 			: require('../tpl/appointment_record.html'),
	appointmentDetails 			: require('../tpl/appointment_details.html'),
	registerInfo 						: require('../tpl/register_info.html'),
	registerRecord 					: require('../tpl/register_record.html'),
	hotSelling 							: require('../tpl/hot_selling.html'),
	epidemicSurveying 			: require('../tpl/epidemic_surveying.html'),
};
// console.log(content);
// 头部模板
var header = {
	sort1 : require('../tpl/head.html'),
};
// console.log(header);
// 底部模板
var footer = {
	sort1 : require('../tpl/foot.html'),
	appointmentInfo : require('../tpl/appointment_footer.html'),
	registerInfo : require('../tpl/register_footer.html'),
};
// console.log(footer);

;(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.tplMath = factory();
	}
})(this, function() {

	/**
	 * 去左右空格
	 * @param {Object} len 		Hash位数
	 * */
	var trim = function (v) {
		return v.replace(/(^\s*)|(\s*$)/g, "");
	};

	// 获取模板文件
	var getTemplate = function (tag, str) {
		// console.log(str);
		// 判断tag标签是否存在
		if (str.indexOf(tag) === -1) {
			// console.log("tag标签不存在~");
			return "";
		}
		var reg = new RegExp("<" + tag + ">([\\s\\S]*)<\/" + tag + ">");
		var matchs = reg.exec(str);
		return matchs ? trim(matchs[1]) : "";
	};

	// 模板解析器
	var tplCompiler = function (str) {
		// 判断字符串是否存在，不存在直接退出
		if (!str) {
			console.log("模板不存在！");
			return false;
		}
		return {
			template: getTemplate('template', str),
			style:	getTemplate('style', str),
			script:	getTemplate('script', str),
		};
	};

	// 类别1
	var sortTpl = function (container, header, footer) {
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
		// 判断内容是否存在
		if (container) {
			// 判断如果头部和尾部都不存在
			if (!header && !footer) {
				_obj = tplCompiler(container);
			} else {
				_obj.container = tplCompiler(container);
			}
		} else {
			console.log("请正确配置内容模板~");
		}

		return _obj;
	};

	// 根据类别匹配页面模板
	var mathTpl = function (sort) {
		var tpl;
		// 循环判断(根据商品类别进行匹配页面)
		switch (sort) {
			case 'home':		// alert
				// 根据登录状态配置头部和底部(登录判断写在tpl里)
				tpl = sortTpl(header.sort1, container[sort]);
				break;
			case 'appointmentInfo':  // confirm
				tpl = sortTpl(header.sort1, container[sort], footer[sort]);
				break;
			case 'appointmentRecord':  // prompt
				tpl = sortTpl(header.sort1, container[sort]);
				break;
			case 'appointmentDetails':  // prompt
				tpl = sortTpl(header.sort1, container[sort]);
				break;
			case 'registerInfo':  // prompt
				tpl = sortTpl(header.sort1, container[sort], footer[sort]);
				break;
			case 'registerRecord':  // prompt
				tpl = sortTpl(header.sort1, container[sort]);
				break;
			case 'hotSelling':  // prompt
				tpl = sortTpl(header.sort1, container[sort]);
				break;
			case 'epidemicSurveying':  // prompt
				tpl = sortTpl(header.sort1, container[sort]);
				break;
			default:
				tpl = sortTpl(header.sort1, container.sort1, footer.sort1);
				break;
		}
		return tpl;
	};

	return mathTpl;
});



