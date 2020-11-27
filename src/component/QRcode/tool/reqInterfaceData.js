// 组件引用
// var ajax = require('../../../vendors/ajax/js/ajax_jq');

;(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.reqInterfaceData = factory();
	}
})(this, function() {

	// 请求接口数据
	var reqInterfaceData = function (obj, param, ajax, callback) {
		// 判断是请求本地json数据，请求方式设置为GET
		if (obj.flag && ajax.isLocal()){
			// 请求方式
			ajax.config.type = "get";
		}
		// 请求URL
		ajax.config.url = ajax.reqUrl(obj, siteUrl);
		// 请求参数
		ajax.config.data = param;
		// 请求数据
		ajax.reqDataApi(ajax.config, function (res) {
			console.log(res);
			isCallbackState(res, callback);
			// callback && callback(res);
		});
	};

	// 判断返回数据是否操作成功
	var isCallbackState = function (d, callback) {
		// 判断返回数据是否操作成功
		if (d.ResultCode == 1) {
			console.log(d.ResultDescription);
			// console.log(d.Result);
			callback && callback(d.Result);
		} else {
			console.log(d.ResultDescription);
			alert(d.ResultDescription);
		}
	};

	return reqInterfaceData;
});



