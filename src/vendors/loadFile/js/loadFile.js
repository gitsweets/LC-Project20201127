(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.reader = factory();
	}
})(this, function() {
	// 获取HTML
	var getHtml = function (str) {
		// 判断是否包含HTML
		if (str.indexOf("<template>") > -1) {
			var _start = str.indexOf("<template>") + 10;
			var _end = str.indexOf("</template>");
			return str.substring(_start, _end);
		}
	};

	// 获取Css
	var getCss = function (str) {
		// 判断是否包含CSS
		if (str.indexOf("<style>") > -1) {
			var _start = str.indexOf("<style>") + 6;
			var _end = str.indexOf("</style>");
			return str.substring(_start, _end);
		}
	};

	// 获取Js
	var getJs = function (str) {
		var _start = str.indexOf("<script>") + 8;
		var _end = str.indexOf("</script>");
		return str.substring(_start, _end);
	};

	// 读取多中内容的文本
	var readMulText = function (url, dataType) {
		var d;
		$.ajax({
			type: "GET",
			url: url,
			async: false,
			dataType: dataType,
			success: function(data){
				// console.log(data);
				// 获取html
				var _html = getHtml(data);
				// console.log(_html);

				// 获取Css
				var _css = getCss(data);
				// console.log(_css);

				// 获取Css
				var _js = getJs(data);
				// console.log(_js);

				d = {
					_html,
					_css,
					_js
				}
			}
		});
		return d;
	};

	// 读取单一内容的文本
	var readSingleText = function (url, dataType) {
		var d;
		$.ajax({
			type: "GET",
			url: url,
			async: false,
			dataType: dataType || "html",
			success: function(data){
				// console.log(data);
				// 获取html
				// var _str = data;
				// console.log(data);
				d = data;
			}
		});
		return d;
	};
	// 对外开放方法
	// return {
	// 	singleText 	: readSingleText,
	// 	mulText			: readMulText,
	// };
	return readMulText;
});