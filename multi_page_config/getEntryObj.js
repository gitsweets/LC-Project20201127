/**
 * @param {Array} multiPage 		多页面数组
 * @param {Object} path 		Hash位数
 * */
var getEntryObj = function (multiPage, path) {
	// console.log(multiPage);
	var i = 0, len = multiPage.length, obj = {};
	for (; i < len; i++) {
		// 判断多页面配置是同目录还是不同目录
		if (multiPage[i].isRelative) {
			obj[multiPage[i].name] = path + 'component/' + multiPage[i].path;
		} else {
			obj[multiPage[i].name] = path + 'component/' + multiPage[i].path + 'index.js';
		}

	}
	// console.log(obj);
	return obj;
};

module.exports = getEntryObj;
