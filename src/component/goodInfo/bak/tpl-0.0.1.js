// 模板引用
// 内容模板
var container = {
		sort1 : require('./tpl/drugInfo.html'),
};
// console.log(content);
// 头部模板
var header = {
	sort1 : require('./tpl/head.html'),
};
// console.log(header);
// 底部模板
var footer = {
	sort1 : require('./tpl/foot.html'),
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
		root.tpl = factory();
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
			return;
		}
		return {
			template: getTemplate('template', str),
			style:	getTemplate('style', str),
			script:	getTemplate('script', str),
		};
	};

	// 类别1
	var sortTpl = function (header, footer, container) {
		var sortTpl = {
			header: tplCompiler(header),
			container: tplCompiler(container),
			footer: tplCompiler(footer),
		};
		return sortTpl;
	};
	
	// 根据类别匹配页面模板
	var mathTpl = function (sort) {
		var tpl;
		// 循环判断(根据商品类别进行匹配页面)
		switch (sort) {
			case 1:		// alert
				// 根据登录状态配置头部和底部(登录判断写在tpl里)
				tpl = sortTpl(header.sort1, footer.sort1, container.sort1);
				break;
			case 2:  // confirm
				tpl = sortTpl(header.sort1, footer.sort1, container.sort1);
				break;
			case 3:  // prompt
				tpl = sortTpl(header.sort1, footer.sort1, container.sort1);
				break;
			default:
				tpl = sortTpl(header.sort1, footer.sort1, container.sort1);
				break;
		}
		return tpl;
	};

	// 判断是多类型还是单类型模板
	var tpl = function (sort) {
		var _tpl;
		// 判断是多类型，根据类型进行匹配模板
		if (sort) {
			_tpl = mathTpl(sort);
		} else {	// 单类型直接返回模板
			_tpl = sortTpl(header.sort1, footer.sort1, container.sort1);
		}
		return _tpl;
	};

	return tpl;
});



