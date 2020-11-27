(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.getAppVersion = factory();
	}
})(this, function() {

	// 获取版本号
	var getAppVersion = function () {
		if (android_app){
			console.log("安卓版本号~");
			// 获取版本号
			var appInfo = window.LanCareWeb.getVersion();
			// alert(appInfo);
			// 判断appInfo是否存在
			if (!appInfo) return;
			var jsonObj = jQuery.parseJSON(appInfo);
			// 添加全局变量
			window.app = {
				packageName	: appInfo.packageName,
				version			: appInfo.ver,
			};
			// 返回版本号信息
			return  {
				packageName	: appInfo.packageName,
				version			: appInfo.ver,
			};
		} else if (ios_app){
			console.log("IOS版本号~");
			window.webkit.messageHandlers.Lancare.postMessage('getVersionAndName');
		} else {
			console.log("非APP没有版本号~");
		}
	};
	// 提升IOS回调方法作用域，解析ios传回的base64编码
	window.getVersionAndNameForIos = function (code) {
		// 判断编码不存在并退出
		if (!code) return;
		// 解析base64编码
		var Base = new Base64(),
			jsonobj = JSON.parse(Base.decode(code));
			// jsonobj = jQuery.parseJSON(Base.decode(code));
		console.log("IOS Base64 转码", jsonobj);
		// {name: "cn.lancare.lancare", version: "3.0.59/20191014000001"}
		// 添加全局变量
		window.app = {
			packageName	: jsonobj.name,
			version			: jsonobj.version,
		};
		// 返回版本号信息
		return  {
			packageName	: appInfo.name,
			version			: appInfo.version,
		};
	};
	// IOS回调方法
	window.getVersionForIos = function (app_intro) {
		alert(app_intro);
	};
	// 对外开放方法
	return getAppVersion;
});