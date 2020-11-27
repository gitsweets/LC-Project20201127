;(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.getApiReqUrl = factory();
	}
})(this, function() {

	/**
	 * 获取接口请求主域名
	 * @param {Object} d     	接口数据对象
	 * @param {Object} obj		数据匹配对象
	 */
	return function (d, obj) { //
		// 判断是否有数据
		if (!d) {
			console.log("请配置数据对象~");
			return;
		}

		// 判断是否验证本地操作
		if (!obj) {
			obj = {};
			obj.isLocal = false;
		}
		console.log(obj);

		var reqUrl = '/' + d.reqUrl;

		// 判断是不是本地开发
		if (obj.isLocal) {
			// 判断是否请求本地json文件
			if (d.flag){
				reqUrl = d.reqJson;
			} else if (d.reqDevUrl && d.reqDevUrl.indexOf("//")!=-1){
				reqUrl = d.reqDevUrl;
			} else {
				reqUrl = obj.apiUrl + d.reqDevUrl;
			}
		} else { // 其他(非本地环境)
			// console.log("其他");
			reqUrl = obj.isSetDomain ? obj.apiUrl + d.reqUrl : reqUrl;
			if (d.reqUrl.indexOf("//")!=-1){
				reqUrl = d.reqUrl;
			}
		}

		return reqUrl;
	};

});