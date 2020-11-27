;(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.ajax = factory();
	}
})(this, function() {
	/**
	 * Ajax 基本参数配置
	 * @param {string} url 				接口地址
	 * @param {string} type 			接口请求类型
	 * @param {string} dataType 	接口请求数据类型
	 * @param {Object} data 			接口发送请请求参数
	 *
	 * */
	var ajaxConfig = {
		url: '',
		type: 'POST',
		dataType: 'json',
		data: null,
	};

	/**
	 * AJAX统一请求接口（JQ）
	 * @param {Object} obj 			Ajax 请求参数
	 * @param {function} callback Ajax 请求回调函数
	 * */
	var reqDataApi = function (obj, callback) {
		$.ajax({
			url: obj.url || '',
			type: obj.type || 'post',
			dataType: obj.dataType || "json",
			data: obj.data || null,
			headers : obj.headers || null,
			async: obj.async && true,
			xhrFields: {
				// withCredentials: true
			},
			jsonpCallback: obj.jsonpCallback || 'jQuery' + ('v1.11.1' + Math.random()).replace(/\D/g,'') + '_' + new Date().getTime(), //服务端用于接收callback调用的function名的参数
			contentType: obj.contentType || "application/x-www-form-urlencoded; charset=utf-8",
			beforeSend: obj.beforeSend && obj.beforeSend(XMLHttpRequest),
			success: function (data, textStatus, XMLHttpRequest) {


				console.log("Cookie："+ XMLHttpRequest.getResponseHeader("Set-Cookie"));

				// console.log("success");
				if (callback) {
					callback(data, textStatus, XMLHttpRequest);
				} else if (obj.success) {
					obj.success(data, textStatus, XMLHttpRequest);
				}
			},
			complete: obj.complete && obj.complete(XMLHttpRequest, textStatus),
			error: obj.error,
		});
	};

	/**
	 * 获取接口请求主域名
	 * @param {Object} d     	接口数据对象
	 * @param {Object} obj		数据匹配对象
	 */
	return {
		config			: ajaxConfig,
		reqDataApi	: reqDataApi,
	}

});