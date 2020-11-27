(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.showTitleText = factory();
	}
})(this, function() {
	/**
	 * 修改app标题方法
	 * @param {string} txt 		显示的名称
	 * @param {string} callback 		点击回调的函数名称
	 * @param {0or1} showType 	显示还是取消	0为显示；1为取消
	 * */
	var showTitleText = function (title) {
		if(android_app){
			window.LanCareWeb.showTitleText(title);
		} else if(ios_app){
			window.webkit.messageHandlers.Lancare.postMessage({className:'showTitleText', titleText:title});
		} else {
			console.log("非APP直接调用方法！");
		}
	};
	// 对外开放方法
	return showTitleText;
});
