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
	 * 判断数据类型
	 * @param {Object} len 		Hash位数
	 * */
	var isObjFunc = function(type) {
		var _toString = Object.prototype.toString;
		return function() {
			return _toString.call(arguments[0]) === '[object ' + type + ']'
		}
	};

	// 判断是函数（方法）
	var isFunction = function() {
		return isObjFunc("Function")(arguments[0]);
	};

	// 判断是字符串
	var isString = function() {
		return isObjFunc("String")(arguments[0]);
	};

	// 判断是对象
	var isObject = function() {
		return isObjFunc("Object")(arguments[0]);
	};

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

	//
	var sortTpl = function (header, footer, container) {
		var sortTpl = {
			header: tplCompiler(header),
			container: tplCompiler(container),
			footer: tplCompiler(footer),
		};
		return sortTpl;
	};

	// 判断是多类型还是单类型模板
	var getTpl = function (params) {
		var _tpl;
		// 判断参数数量
		if (isString(params)) {
			console.log("字符串~");
			_tpl = tplCompiler(params);
		} else if (isObject(params)) {
			console.log("对象~");
		}
		return _tpl;
	};

	return getTpl;
});



