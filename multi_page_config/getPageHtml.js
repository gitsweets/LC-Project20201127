const htmlPlugin = require('html-webpack-plugin');			// HTML插件
/**
 * @param {Array} multiPage 		多页面数组
 * @param {String} mod 		开发和生产环境（dev\build）
 * */
const getPageHtml = function (multiPage, mod) {
	// console.log(multiPage);
	var i = 0, len = multiPage.length, pageHtml = [];
	for (; i < len; i++) {
		pageHtml.push(new htmlPlugin({
			template	: multiPage[i][mod].template,
			filename	: multiPage[i][mod].filename,
			chunks 		: multiPage[i].chunks,
			// inject		: true,
			// hash			: true,
			// cache 		: true,
		}));
	}
	// console.log(pageHtml);
	return pageHtml;
};
module.exports = getPageHtml;