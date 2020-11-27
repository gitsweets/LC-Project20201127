(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.qrcodeScan = factory();
	}
})(this, function() {


	// 扫描二维码和条形码
	var qrcodeScan = function (key) {
		if (typeof ios_app != 'undefined' && ios_app) {
			window.location = "objc:://qrcodescan::/barcode::/" + key;
		} else if (typeof android_app != 'undefined' && android_app) {
			window.LanCareWeb.qrcodeScanShape(key);
			// window.LanCareWeb.qrcodeScanShape(""); // 无值时传空
		} else if (typeof is_wx != 'undefined' && is_wx){
			// 调用微信扫一扫事件
			// this.wxScanQRCode(key);
		} else {
			console.log("非APP和微信不能扫码");
			// setValues(1, 'aa');
		}
	};

	// 对外开放方法
	return qrcodeScan;
});