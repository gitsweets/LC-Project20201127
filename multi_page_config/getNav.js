let fs = require('fs');
// console.log("__dirname", __dirname);
/**
 * @param {Array} multiPage 		多页面数组
 * @param {String} mod 		开发和生产环境（dev\build）
 * @param {String} visitUrl 		访问地址
 * */
var getNav = function (multiPage, mod, visitUrl) {
	// console.log(multiPage);
	var i = 0, len = multiPage.length, navList = [];
	for (; i < len; i++) {
		navList.push({
			name 	: multiPage[i].title,
			href	: visitUrl + multiPage[i][mod].filename,
		});
		var devURL = multiPage[i][mod].filename;
		var _title = multiPage[i].title;
		var outputNav = _title + ':  ' + visitUrl + devURL;
		console.log(outputNav);
	}
	// console.log(navList);
	fs.writeFileSync('./multi_page_config/Navigation.json', JSON.stringify(navList, null, 2));
	return navList;
};

module.exports = getNav;
