;(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.checkType = factory();
	}
})(this, function() {
	/**
	 * 获取接口请求主域名
	 * @param {Array<{type:number,txt:string}>} list
	 */
	return {
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
		// 判断是对象
		isBoolean : function() {
			return this.isObjFunc("Boolean")(arguments[0]);
		},
	};


});