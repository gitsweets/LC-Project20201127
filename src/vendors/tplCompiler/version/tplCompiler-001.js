(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.tplCompiler = factory();
	}
})(this, function() {

	// 获取模板文件
	var getTemplate = function (tag, str) {
		// console.log(str);
		var reg = new RegExp("<" + tag + ">([\\s\\S]*)<\/" + tag + ">");
		var matchs = reg.exec(str);
		return matchs[1];
	};

	// js字符串转变量
	var strToVar = function (str) {
		var json = (new Function("return " + str))();
		return json;
	};

	var test = function (str) {
		val = new Function("(function(){console.log('test');})()");
		// console.log(val());
		return new Function(str)();
	};

	// 模板解析器
	var tplCompiler = function (str) {
		// 判断字符串是否存在，不存在直接退出
		if (!str) {
			console.log("模板不存在！");
			return "";
		}
		var _html = getTemplate('template', str),
				_css = getTemplate('style', str),
				_js  = eval(getTemplate('script', str));

		// var test1 = strToVar(_js);
		// console.log(test1); //true,变量已生成，但为赋值。
		// test(_js)
		// console.log("1", test());

		// var aa = new Function('return '+_js);
		// console.log(aa);

		return {
			template: _html,
			style:	_css,
			script:	_js,
		}
	};
	// 对外开放方法
	return tplCompiler;
});