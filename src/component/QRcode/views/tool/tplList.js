// 头部模板
var header = require('../test/head.html');
var footer = require('../test/foot.html');

// 页面模板
var views = {
	QRcode 	: require('../test/QRcode.html'),
	QRcode1 	: require('../test/QRcode.html'),
};

;(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.getTpl = factory();
	}
})(this, function() {

	// 根据类别匹配页面模板
	var setTpl = function (sort) {
		var tpl;
		// 循环判断(根据商品类别进行匹配页面)
		switch (sort) {
			case 'addDevice':		// alert
				// 根据登录状态配置头部和底部(登录判断写在tpl里)
				tpl = {
					container : views[sort],
					header		: header,
				};
				break;
			case 'QRcode1':  // confirm
				tpl = {
					container : views[sort],
					header		: header,
					footer		: footer,
				};
				break;
			default:
				tpl = {
					container : views[sort],
				};
				break;
		}
		return tpl;
	};

	return setTpl;
});



