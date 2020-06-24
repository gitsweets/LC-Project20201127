// 组件引用
var ajax = require('../../vendors/ajax/js/ajax_jq');
var miniTpl = require('../../vendors/mini-tpl/mini-tpl');
var loadFile = require('../../vendors/loadFile/js/loadFile');
var _tpl = require('./tpl');
var quantity = require('../../vendors/Quantity/quantityOpt');

;(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.goodsInfo = factory();
	}
})(this, function() {

	/**
	 * 数据
	 */
		// 接口参数和返回数据
	var data = {
			// 订单支付信息
			orderInfo : {
				reqUrl	: "2/lancare_customhouse_interface_Tianjin/api:pay_order_package_info",
				reqDevUrl	: "2/lancare_customhouse_interface_Tianjin/api:pay_order_package_info",
				reqJson : "../../service/orderForm/orderInfo.json",
				flag		: true
			},
			// 确认订单支付信息
			sureOrderInfo : {
				reqUrl	: "2/lancare_customhouse_interface_Tianjin/api:pay_submit",
				reqDevUrl	: "2/lancare_customhouse_interface_Tianjin/api:pay_submit",
				reqJson : "../../src/data/customs.json",
				flag		: false
			},
		};

	/**
	 * 本地数据
	 */
	var global = {};

	/**
	 * 工具类
	 * */
	var utils = {
		// 根据参数查找对应元素
		findDom : function (str, dom) {
			var _way;
			// 判断dom不存在设置默认值
			if (dom) {
				if (dom.length > 1) dom = dom[0];
			} else {
				dom = document;
			}
			// 判断是不是特殊字符
			if (this.checkSpecialChar(str)) { // 是特殊字符
				// 判断是id还是class
				_way = this.matchStr1st(str[0]);
			} else if (str === "body"){
				_way = 3;
			} else if (str === "html") {
				_way = 4;
			} else if (this.matchTagStr(str)) {
				_way = 5;
			} else {
				_way = 6;
			}
			// 匹配对应的查找操作
			var newDom = this.matchWay(dom, _way, str);
			console.log(newDom);
			return newDom;
		},
		// 匹配查找数据类型
		matchWay : function (dom, way, str) {
			// 定义默认返回值
			var _dom;
			// 匹配查找方式
			switch (way) {
				case 1:
					_dom = this.hasDOM(document.getElementById(str.substring(1)));
					break;
				case 2:
					_dom = this.hasDOM(dom.getElementsByClassName(str.substring(1)));
					break;
				case 3:
					_dom = this.hasDOM(document.body);
					break;
				case 4:
					_dom = this.hasDOM(document.documentElement);
					break;
				case 5:
					_dom = this.hasDOM(dom.getElementsByTagName(str));
					break;
				default:
					_dom = this.hasDOM(document.getElementsByName(str));
					break;
			}
			return _dom;
		},
		// 判断是不是存在标签数组
		matchTagStr : function (str) {
			// 定义标签字符串数组
			var arr = ["div", "li", "p", "a", "span"];
			if (arr.indexOf(str) != -1) {
				return true;
			};
			return false;
		},
		// 判断id还是class
		matchStr1st : function (str) {
			var flag;
			if (str === ".") {
				flag = 2;
			} else if (str === "#") {
				flag = 1;
			}
			return flag;
		},
		// 判断是否返回dom
		hasDOM : function (dom) {
			if (dom.length < 1) {
				// console.log("没有找到当前DOM");
				return false;
			}
			return dom;
		},
		// 验证特殊字符
		checkSpecialChar : function (str)  {
			var myreg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
			if (!myreg.test(str)) {
				return true;
			} else {
				return false;
			}
		},
		/**
		 * 字符串转DOM
		 * @param {Object} len 		Hash位数
		 * */
		parseDom : function(str){
			var objEl = document.createElement("div");
			objEl.innerHTML = str;
			return objEl.childNodes;
		},
		/**
		 * 生成Hash
		 * @param {Object} len 		Hash位数
		 * */
		createHash : function(len){
			if (!len || typeof(Number(len)) != 'number') {return;}
			var ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
			var hs = [];
			var hl = Number(len);
			var al = ar.length;
			for (var i = 0; i < hl; i++) {
				hs.push(ar[Math.floor(Math.random() * al)]);
			}
			return hs.join('');
		},
	};

	// 载入商品详情页面
	var loadGoodsInfo = function (d, apendEl) {
		// 判断要插入html位置是否存在
		if (!apendEl) {
			return;
		}
		// 判断商品类别是否存在
		if (!d.good_type) return;
		// 生成hash
		this.hash = utils.createHash(8);
		// 获取模板TPL对象
		var tpl = _tpl(d.good_type);
		console.log(tpl);
		console.log(d);
		// 模板数据替换
		var html_obj = this.getHtml(tpl, d);
		console.log(html_obj);
		// 拼接字符串
		var str = html_obj.head_html + html_obj.container_html;
		console.log(str);
		//
		var apendEl = document.getElementById('goodsInfo');
		apendEl.innerHTML = str;
		var dom = utils.parseDom(str);
		console.log(dom);
		/*
		// 字符串模板转DOM元素
		var dom_obj = {
			head_dom : utils.parseDom(html_obj.head_html)[0],
			container_dom : utils.parseDom(html_obj.container_html)[0],
			// foot_dom : utils.parseDom(html_obj.foot_html),
		};
		console.log(dom_obj);
		// 合并DOM
		var _dom = this.mergeDom(dom_obj);
		console.log(_dom);
		// 把html插入到页面
		// this.insertHtml(dom_obj);
		this.appendHtml(dom);
		*/
		// 绑定点击事件
		this.bindEvent();
	};
	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	loadGoodsInfo.prototype = {
		// 绑定事件
		bindEvent : function () {
			// 触发数量加减插件
			this.bindQuantity();
		},
		// 触发数量加减插件
		bindQuantity : function () {
			// 判断插件关联元素是否存在
			if (document.getElementsByClassName("gc_opt").length < 1) {
				return;
			}
			// 在指定元素能生成并绑定数量操作事件
			quantity(document.getElementsByClassName("gc_opt"), {
				minNum: 3,
				maxNum: 10,
				addHandle: function (el, v) {
					el.value = v;
				},
				cutHandle: function (el, v) {
					el.value = v;
				}
			});
		},
		// 合并DOM
		mergeDom : function (obj) {
			console.log(obj);
			var aa = obj.head_dom + obj.container_dom;
			return aa;
		},
		// 把html插入到页面
		insertHtml : function (dom_obj) {
			debugger
			// 插入头部元素
			// this.insertBeforeHtml(dom_obj.head_dom, null, "body", "wui_wrapper");
			this.appendHtml(dom_obj.head_dom);
			// 插入内容元素
			this.appendHtml(dom_obj.container_dom);
			// 插入底部元素

		},
		// 插入到指定元素内
		appendHtml : function (dom, apendEl) {
			// console.log(apendEl);
			// 判断apendEl是否存在, 没有设置默认值为 body
			if (!apendEl || (apendEl == "body")) {
				// 插入到body的最前面
				// var firstEl = document.body.firstChild;//得到页面的第一个元素
				// document.body.insertBefore(html, firstEl);
				document.body.append(dom);
			} else {
				// 判断插入的class是否存在
				if (document.getElementsByClassName(apendEl).length > 0) {
					document.getElementsByClassName(apendEl)[0].append(dom);
				} else {
					console.log("插入class不存在！");
					return;
				}
			}
		},
		// 插入到指定元素之前
		insertBeforeHtml : function (dom, callback, apendEl, siblingEl) {
			// console.log(apendEl);
			// 判断apendEl是否存在, 没有设置默认值为 body
			if (!apendEl || (apendEl == "body")) {
				// 插入到body的最前面
				// var firstEl = document.body.firstChild;//得到页面的第一个元素
				// document.body.insertBefore(html, firstEl);
				document.body.insertBefore(dom, document.getElementsByClassName(siblingEl)[0]);
			} else {
				// 判断插入的class是否存在
				if (document.getElementsByClassName(apendEl).length > 0) {
					document.getElementsByClassName(apendEl)[0].insertBefore(dom, document.getElementsByClassName(siblingEl)[0]);
				} else {
					console.log("插入class不存在！");
					return;
				}
			}
		},
		// 模板数据替换
		getHtml : function (tpl, d) {
			var headData = {
				is_logged: 0 || d.login_info.is_logged,
				url: d.login_info.url,
				title: d.good_data.base_info.good_info.goods_name,
			}, footData = {
				is_logged: d.login_info.is_logged,
				url: d.login_info.url,
			};
			return {
				head_html : miniTpl(tpl.header.template, headData),
				container_html : miniTpl(tpl.container.template, d.good_data),
				// foot_html : miniTpl(tpl.footer.template, d.login_info),
			}
		},
	};

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function (d, apendEl) {
		// 获取版本号
		// getAppVersion();
		// 载入功能模块
		return new loadGoodsInfo(d, apendEl);
	};

	return init;
});


