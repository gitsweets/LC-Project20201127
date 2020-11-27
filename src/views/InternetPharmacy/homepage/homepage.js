// 模板引用
// 头部模板
var headTpl = require('../../../component/header/header_pd_details.html');
// 底部模板
var footTpl = require('../../../component/footer/footer_internet_pharmacy.html');
// 内容模板
var containerTpl = require('./homepage.html');


// 组件引用
// ajax组件
var ajax = require('../../../vendors/ajax/js/ajax_jq');
// 加载组件模块
var loadComponent = require('../../../utils/loadComponent/loadComponent');
// 数据解析
var miniTpl = require('../../../vendors/mini-tpl/mini-tpl');
// 模板解析
var tplCompiler = require('../../../vendors/tplCompiler/js/tplCompiler');

// APP扫码方法
var qrcodeScan = require('../../../vendors/APP/qrcodeScan/qrCode');

// 懒加载
var imgLazyLoad = require('../../../vendors/imgLazyLoad/imgLazyLoad');
// 数量加减
var quantity = require('../../../vendors/Quantity/quantityOpt');

/**
 * 业务逻辑
 * */
(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.details = factory();
	}
})(this, function() {
	/**
	 * 接口信息
	 * 接口地址（测试和正式）、本地json、是否启用本地json
	 */
	var data = {
			// 药局首页
			homepage : {
				reqUrl	: '2/drugstore',
				reqDevUrl	: '2/drugstore',
				reqJson : "../data/homepage.json",
				flag		: false,
			},
			// 立即购买
			buyNow : {
				reqUrl	: 'ajax_ordering_activity',
				reqDevUrl	: 'ajax_ordering_activity',
				reqJson : "../views/productDetails2011/data/buy502.json",
				flag		: true,
			},

		};

	/**
	 * 组件内数据
	 */
	var global = {};

	// 载入商品详情页面
	var loadDetails = function (apendEl) {
		// debugger

		// 生成hash
		// this.hash = utils.createHash(8);

		// 储存插入元素对象
		this.el = apendEl;

		// 判断是否绑定设备
		this.init(apendEl);
	};
	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	loadDetails.prototype = {
		init : function (apendEl) {
			_this = this;
			// console.log('初始化操作~');

			// 请求参数
			var _param = {
				shopId : shopId,
			};

			// 请求产品详情
			this.reqInterfaceApi(data.homepage, _param,function (d, msg, flag) {
				console.log(d);
				// d.list = [];
				// 页面展示操作
				_this.initViewHand(d, apendEl, msg, flag);

			});

		},

		// 视图展示事件
		initViewHand : function (d, apendEl, msg, flag) {
			var _this = this;

			// 判断是APP，是否加载头部
			if (!(android_app || ios_app || is_wx)) {
				// 拼接head数据
				var headData = {
					is_logged: 1,
					url: '',
					title: pageTitle,
				};

				// 加载头部
				loadComponent(document.getElementById('header'), headTpl, headData, function (el) {
					// console.log(_this);
					// console.log('头部回调方法');
				});
			}

			// 加载底部
			loadComponent(document.getElementById('footer'), footTpl, d.footer);

			// 替换搜索提示
			$(".search_input").attr('placeholder', d.search && d.search.placeholder);
			// 显示搜索
			$(".top_bar").show();

			// 加载内容
			this.loadContainer(d, apendEl);

			// 绑定事件
			this.bindEvent(apendEl, d);

		},

		// 绑定事件
		bindEvent : function (apendEl, d) {
			var _this = this;
			// 获取绑定元素
			var $qrcodeScan = document.getElementById("qrcodeScan");								// 扫一扫
			var $search = document.getElementById("search");								// 搜索

			// 绑定扫一扫事件
			$qrcodeScan && ($qrcodeScan.onclick = function () {
				// 扫一扫事件
				qrcodeScan();
			});

			// 绑定搜索事件
			$search && ($search.onclick = function () {
				// 搜索事件
				_this.searchEvent(d.search);
			});

		},

		// 搜索事件
		searchEvent : function (d) {
			console.log("搜索事件~");
			var _this = this;
			// 获取搜索关键字
			var _key = $.trim( $(".search_input").val());
			// 判断搜索关键字是否为空
			if (!_key) {
				alert(d.error);
				return;
			}
			// 跳转地址
			window.location.href = d.url + '/keywords:' + _key;

		},

		// 懒加载事件
		lazyLoad : function () {
			// 默认启用懒加载
			imgLazyLoad.init({
				offset: 0,
				throttle: 0
			});
		},

		// 图片切换事件
		imgslide : function () {
			var bullets = document.getElementById('position') && document.getElementById('position').getElementsByTagName('li');
			var banner = Swipe(document.getElementById('mySwipe'), {
				auto: 2000,
				continuous: true,
				disableScroll: false,
				callback: function (pos) {
					var i = bullets.length;
					while (i--) {
						bullets[i].className = ' ';
					}
					bullets[pos].className = 'cur';
				}
			});
		},

		// 加载内容
		loadContainer : function (d, apendEl) {
			// 解析模板
			var obj = tplCompiler(containerTpl);
			// 替换数据
			var html = miniTpl(obj.template, d);
			// 插入HTML字符串
			this.insertHtmlStr(html, apendEl);

		},

		// 把字符串插入指定元素内
		insertHtmlStr : function (obj, apendEl) {
			// 遍历HTML对象，拼接字符串
			var i, _html = "";
			for (i in obj) {
				_html += obj[i];
			}
			// // 根据页面排版拼接字符串（优化字符串拼接，新写方法）
			// var str = html_obj.head_html + html_obj.container_html;
			// console.log(_html);
			// 字符串插入到页面
			apendEl.innerHTML = _html;
		},

		// 请求接口数据
		reqInterfaceApi : function (obj, param, callback) {
			var _this = this;
			// 判断是请求本地json数据，请求方式设置为GET
			if (obj.flag && ajax.isLocal()){
				// 请求方式
				ajax.config.type = "get";
			}

			ajax.config.type = "get";

			// 请求URL
			ajax.config.url = ajax.reqUrl(obj, siteUrl);

			// 请求参数
			ajax.config.data = param;
			// 请求数据
			ajax.reqDataApi(ajax.config, function (res) {
				console.log(res);
				_this.isCallbackState(res, callback);
				// callback && callback(res);
			});
		},
		// 判断返回数据是否操作成功
		isCallbackState : function (d, callback) {
			// 判断返回数据是否操作成功
			if (d.res == 1) {
				console.log(d.msg);
				// console.log(d.Result);
				callback && callback(d.data, d.msg);
			} else {
				console.log(d.msg);
				alert(d.msg);
			}

		},



	};

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function (apendEl) {
		// console.log(this);
		// debugger
		// 载入功能模块
		return new loadDetails(apendEl);
	};

	return init;

});