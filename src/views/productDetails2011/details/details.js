// 模板引用
// 头部模板
var headTpl = require('../../../component/header/header_pd_details.html');
// 底部模板
var footTpl = require('../../../component/footer/footer_pd_details.html');
// 内容模板
var detailsTpl = require('./details.html');

// 组件引用
// ajax组件
var ajax = require('../../../vendors/ajax/js/ajax_jq');
// 加载组件模块
var loadComponent = require('../../../utils/loadComponent/loadComponent');
// 数据解析
var miniTpl = require('../../../vendors/mini-tpl/mini-tpl');
// 模板解析
var tplCompiler = require('../../../vendors/tplCompiler/js/tplCompiler');

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
			// 详情
			details : {
				reqUrl	: 'goods/activityinfo/tab:ajax',
				reqDevUrl	: 'goods/activityinfo/tab:ajax',
				reqJson : "../views/productDetails2011/data/details200.json",
				flag		: true,
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
debugger
			// 请求参数
			var _param = {
				detail_id : detail_id,
			};

			// 请求产品详情
			this.reqInterfaceApi(data.details, _param,function (d, msg, flag) {
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

			// 判断可购买数量为0，不显示购买按钮
			var isFlag = false;
			if (!d.quantity_sur) {
				isFlag = true;
			}

			// 判断是否显示底部
			if (flag) {
				var footData = {
					isFlag: isFlag,
					msg		: msg,
				};
				// 加载底部
				loadComponent(document.getElementById('footer'), footTpl, footData);
			}

			// 加载内容
			this.loadContainer(d, apendEl);

			// 绑定事件
			this.bindEvent(apendEl, d);

		},

		// 绑定事件
		bindEvent : function (apendEl, d) {
			var _this = this;
			// 获取绑定元素
			var $buyNow = document.getElementById("buy_now");								// 立即购买

			// 图片切换
			this.imgslide();

			// 触发懒加载事件
			_this.lazyLoad();

			// 绑定滚动条事件
			apendEl.onscroll = function () {
				console.log("滚动条事件~");
				// 触发懒加载事件
				_this.lazyLoad();
			};

			// 绑定立即购买事件
			$buyNow && ($buyNow.onclick = function () {
				// 立即购买事件
				_this.buyNowEvent();
			});

			// 触发数量加减插件
			this.bindQuantity(d.quantity_sur);
		},

		// 立即购买事件
		buyNowEvent : function () {
			console.log("立即购买事件~");
			var _this = this;

			// 请求参数
			var _param = {
				act_detail_id : detail_id,
				num						: global.num
			};

			// 请求产品详情
			this.reqInterfaceApi(data.buyNow, _param,function (d) {
				console.log(d);
				location.replace(d.url);
			});

		},

		// 触发数量加减插件
		bindQuantity : function (num) {
			// 判断插件关联元素是否存在
			if (document.getElementsByClassName("gc_opt").length < 1) {
				return;
			}
			// 在指定元素能生成并绑定数量操作事件
			quantity(document.getElementsByClassName("gc_opt"), {
				minNum: num && 1,
				maxNum: num,
				addHandle: function (el, v) {
					el.value = v;
					global.num = v;
				},
				cutHandle: function (el, v) {
					el.value = v;
					global.num = v;
				}
			});

			global.num = 0;
			if (num) {
				// 更改默认数量
				$('.text_change').val(1);
				global.num = 1;
			}

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
			var obj = tplCompiler(detailsTpl);
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
			// if (d.status == 200) {
			// 	console.log(d.msg);
			// 	// console.log(d.Result);
			// 	callback && callback(d.data, d.msg);
			// } else if (d.status == 502) {
			// 	console.log(d.msg);
			// 	d.data && location.replace(d.data.url);
			// } else {
			// 	console.log(d.msg);
			// 	alert(d.msg);
			// }
			
			switch (d.status) {
				case 200:
					console.log(d.msg);
					callback && callback(d.data, d.msg, true);
					break;
				case 502:
					console.log(d.msg);
					d.data && location.replace(d.data.url);
					break;
				case 5004:
					console.log(d.msg);
					// alert(d.msg);
					callback && callback(d.data, d.msg);
					break;
				case 5005:
					console.log(d.msg);
					alert(d.msg);
					callback && callback(d.data, d.msg);
					break;
				case 5006:
					console.log(d.msg);
					// alert(d.msg);
					callback && callback(d.data, d.msg, true);
					break;
				default:
					console.log(d.msg);
					alert(d.msg);
					break;
				
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