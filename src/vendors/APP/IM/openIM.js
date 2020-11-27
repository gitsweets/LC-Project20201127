(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.openIM = factory();
	}
})(this, function() {

	// 打开IM会话
	var openIM = function () {
		if(android_app) {
			window.LanCareWeb.openChatRoom(doctorId, doctorName);
		} else if (ios_app) {
			window.location = "objc:://openChatRoom::/" +doctorId+ "::/" + doctorName;
		} else {
			console.log("非APP不能打开IM会话");
		}
	};

	// 对外开放方法
	return openIM;
});





