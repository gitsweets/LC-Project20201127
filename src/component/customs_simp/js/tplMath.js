// 模板解析
var tplCompiler = require('../../../vendors/tplCompiler/js/tplCompiler');

// 页面模板

// 组件模板
var component = {
	select_country 	: require('../tpl/select_country.html'),
};

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
			case 'select_country':		// alert
				// 根据登录状态配置头部和底部(登录判断写在tpl里)
				tpl = sortTpl(component[sort]);
				break;
			case 'appointmentInfo':  // confirm
				tpl = sortTpl(header.sort1, container[sort], footer[sort]);
				break;
			default:
				tpl = sortTpl(header.sort1, container.sort1, footer.sort1);
				break;
		}
		return tpl;
	};

	return mathTpl;
});



