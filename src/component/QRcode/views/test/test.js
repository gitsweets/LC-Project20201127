// 获取模板HTML
var getHtml = require('../tool/getHtml');
// 获取匹配模板
var getTpl = require('../tool/tplList');

// 页面模板
var tpl1 = require('./QRcode.html');
// 工具集
var utils = require('../../tool/utils');



var _utils = {
	// 把字符串插入指定元素内
	insertHtmlStr : function (obj, apendEl) {
		var _html = '';
		// 判读插入内容是字符串还是对象
		if (this.isString(obj)) {
			_html = obj;
		} else if (this.isObject(obj)) {
			_html = (obj.head_html||'') + (obj.container_html||'') + (obj.foot_html||'');
		}
		// 字符串插入到页面
		apendEl.innerHTML = _html;
	},
	// 判断数据类型
	isObjFunc : function(type) {
		var _toString = Object.prototype.toString;
		return function() {
			return _toString.call(arguments[0]) === '[object ' + type + ']'
		}
	},
	// 判断是对象
	isObject : function() {
		return this.isObjFunc("Object")(arguments[0]);
	},
	// 判断是字符串
	isString : function() {
		return this.isObjFunc("String")(arguments[0]);
	},
};

// 组件数据
let compData = {
	// url 参数
	// uid-会员 id
	urlQuery: {},
	// 轮播图
	swiperInfo: {
		banners: ['/asset/images/card.jpg', '/asset/images/card.jpg'],
		options: {
			autoplay: 3000,
			initialSlide: 1,
			loop: true,
			pagination: '.swiper-pagination'
			// onSlideChangeEnd: swiper => {
			// console.log('onSlideChangeEnd', swiper.realIndex)
			// }
		}
	},
	// 广告位图片
	navImg: '',
	// 套餐数据
	packageList: [],
	// 未支付数
	readPayCount: 0,
	pollingPayObj: null,
	// 未读报告数
	readReportCount: 0,
	pollingReportObj: null,
	// 轮询标识
	hasInitPolling: false,
	// 监听事件
	hasListenEvent: false
};

// 组件实例
export default {
	data: function () {
		return compData;
	},
	methods: {
		// 初始化
		compInit: function (apendEl) {
			console.log('/member/entrypage init');

			// 获取字符串模板
			if (getTpl("QRcode")) {
				var tpl = getTpl("QRcode");
				// console.log(tpl);
			} else {
				console.log("请正确配置模板");
				return;
			}

			// 获取模板字符串对象
			// var html_obj = getHtml(tpl1, QRcodeInfo, pageTitle);
			// console.log(html_obj);
			var html_obj = getHtml(tpl, QRcodeInfo, pageTitle);
			console.log(html_obj);
			// 判断模板字符串不存在，终止运行
			if (!html_obj) return;

			// 插入HTML字符串
			_utils.insertHtmlStr(html_obj, this.$el);

		},
		test : function () {
			console.log(1);
		}
	},
	created: function (apendEl) {
		var _this = this.methods;
		_this.data = this.data();
		_this.$el = apendEl;
		_this.compInit();

	},
	destroyed: function () {
		// this.pausePolling();
	}
}