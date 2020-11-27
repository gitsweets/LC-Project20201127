(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.appShare = factory();
	}
})(this, function() {
	/**
	 * app分享方法
	 * 参考文档   http://www.mob.com/wiki/detailed?wiki=ShareSDK_Android_APISHARE_title_dsfptfxcssm&id=14
	 * @param {string}  title 标题
	 * @param {string}   content 描述
	 * @param {string}   imgUrl 		图片地址
	 * @param {string}   titleUrl		标题地址(图文、链接、音频)（QQ空间和QQ）
	 * @param {string}  url				跳转地址（分享文本）（有道、明道）
	 * @param {string}  siteUrl		跳转地址
	 * */
	var appShare = function (title, content, imgUrl, titleUrl, url, siteUrl) {
		if(android_app){
			window.LanCareWeb.share(title,content,imgUrl,titleUrl,url,siteUrl);
		}else if(ios_app){
			window.location.href = "objc:://sharesdk::/" + title + "::/" + content +"::/" + imgUrl +"::/" + titleUrl +"::/" +url +"::/" + siteUrl + "::/"+"";
		} else {
			console.log("非APP不能分享");
		}
	};

	// 对外开放方法
	return appShare;
});