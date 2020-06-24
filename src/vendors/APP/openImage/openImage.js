(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.openImage = factory();
	}
})(this, function() {

	/**
	 * 点击展示图片集事件（根据图片数组集,触发app内预览放大操作）
	 * @param {Object} imgObj 		图片数组对象
	 * @param {string} imgAttribute		图片地址对应的参数
	 * */
	function openImage(imgObj, imgAttribute) {
		// 定义图片数组、循环参数（起始值和长度）
		var imgArr = [], i = 0, len = imgObj.length;
		// 判断图片对象是否存在
		if (len < 1) {
			console.log("请传入图片对象~");
			return;
		}
		// 判断是否配置图片对应的url的标签属性
		if (!imgAttribute) {
			console.log("请配置图片对应的url的标签属性~");
			imgAttribute = 'self_url';
			return;
		}
		// 遍历图片
		for (; i < len; i++) {
			imgArr.push(imgObj[i].attributes['self_url'].value);
			imgObj[i].index = i;
			imgObj[i].onclick = function () {
				var curIndex = this.index;
				if (android_app) {
					window.LanCareWeb.openImage(imgArr.join(","), curIndex);
				} else if (ios_app) {
					window.location.href = "objc:://openImage::/" + imgArr.join(',') + "::/" + curIndex;
				} else {
					console.log("请在app内使用~");
				}
			}
		}
		console.log(imgArr);
		console.log(imgArr.join(","));
	}

	// 对外开放方法
	return openImage;
});