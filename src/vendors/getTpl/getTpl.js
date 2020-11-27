;(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.getTpl = factory();
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
	var _getTpl = function (container, header, footer) {
		// 判断头部模板是否存在
		var sortTpl = {
			header: tplCompiler(header),
			container: tplCompiler(container),
			footer: tplCompiler(footer),
		};
		return sortTpl;
	};

	return _getTpl;
});



