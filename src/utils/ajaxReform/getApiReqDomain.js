;(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.getApiReqDomain = factory();
	}
})(this, function() {
	/**
	 * 获取接口请求主域名
	 * @param {Array<{type:number,txt:string}>} list
	 */
	return function (siteUrl, isSetDomain) {
		// 初始化标记、获取当前 URL 的主域名
		var isLocal = false,	// 默认标识为非本地
				isSetDomain	= isSetDomain || false,		// 是否设置主域
				_apiUrl = '//www.lk.cn/', // 接口默认地址
				hostname = location.hostname; // 获取主域名

		// 匹配对应返回值
		switch (hostname) {
			case 'localhost':
				// console.log('本地开发~');
				// 判断是否接口请求地址
				_apiUrl = siteUrl ? siteUrl : _apiUrl;
				isLocal = true;
				break;
			case '127.0.0.1':
				// console.log('本地开发~');
				// 判断是否接口请求地址
				_apiUrl = siteUrl ? siteUrl : _apiUrl;
				isLocal = true;
				break;
			case localUrl:
				// console.log('本地开发~');
				// 判断是否接口请求地址
				_apiUrl = siteUrl ? siteUrl : _apiUrl;
				isLocal = true;
				break;
			default:
				console.log('当前开发环境:' + hostname);
				// 判断是否接口请求地址
				_apiUrl = siteUrl ? siteUrl : '//' + hostname + '/';
				break;
		}

		return {
			apiUrl  		: _apiUrl,
			isLocal			: isLocal,
			isSetDomain : isSetDomain,
		}
	};

});