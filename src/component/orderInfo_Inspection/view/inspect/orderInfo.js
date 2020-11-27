// 组件引用
// ajax设置
var ajax = require('../../../../vendors/ajax/js/ajax_jq');
// 模板渲染
var miniTpl = require('../../../../vendors/mini-tpl/mini-tpl');
// 价格加减
var Prices = require('../../../../vendors/Prices/pricesOpt');
// 弹出层
var draw = require('../../../../vendors/drawer/js/drawer_m_v1.0.0');
// 选项卡
var Tab = require('../../../../vendors/tab/js/tab');
// 获取模板
var getTpl = require('../../../../vendors/tools/getTpl/getTpl');

// 模板文件引用
var header = require('../../tpl/head.html');
var footer = require('../../tpl/foot.html');
var container = require('../../tpl/orderDetails_inspect.html');

;(function(root, factory) {
	console.log(1);
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.orderDetails = factory();
	}
})(this, function() {

	/**
	 * 数据
	 */
		// 接口参数和返回数据
	var data = {
			// 申请退款接口
			applyRefund : {
				reqUrl	: 'ajax_coupondlist/rand:' + Math.random(),
				reqDevUrl	: 'ajax_coupondlist/rand:' + Math.random(),
				reqJson : "../../data/orderInfo/applyRefund.json",
				flag		: true,
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
	var loadOrderDetails = function (d, apendEl) {

		// 判断要插入html位置是否存在
		if (!apendEl) {
			console.log("请配置模块运行id~");
			return;
		}
		// 生成hash
		this.hash = utils.createHash(8);
		console.log(d);
		// 获取模板TPL对象
		var tpl = this.setTpl();
		console.log(tpl);

		// 模板数据替换
		var html_obj = this.getHtml(tpl, d);
		console.log(html_obj);

		// 判断是APP，head_html设为空
		if (android_app || ios_app) {
			html_obj.head_html = '';
		}

		// 判断是否显示底部
		if (d.allow_refund != 1) {
			html_obj.foot_html = '';
		}

		// 插入HTML字符串
		this.insertHtmlStr(html_obj, apendEl);
		// 绑定点击事件
		this.bindEvent(apendEl, d);

	};
	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	loadOrderDetails.prototype = {
		// 绑定事件
		bindEvent : function (apendEl, d) {
			var _this = this;

			// 更新是否弹出状态
			var alertData = d && d.alert_data;
			// 判断状态是否弹出提示
			if (alertData && alertData.alert_status == 1) {
				alert(alertData.alert_msg);
			}

			// 更新接口数据
			data.applyRefund.reqUrl = d.refund_url;
			data.applyRefund.reqDevUrl = d.refund_url;

			// 获取绑定元素
			var $coupon = document.getElementById("of_coupon"),							// 使用优惠券
					$apply_refund = document.getElementById("apply_refund");						// 确认支付

			// 判断不能申请退款
			if (d.allow_refund != 1) {
				return;
			}

			// 绑定申请退款事件
			$apply_refund.onclick = function () {
				// 申请退款事件
				_this.applyRefundEvent();
			};

			// 模拟触发绑定
			// $coupon.click();
		},

		// ----------- 申请退款 START ------------------
		// 申请退款事件
		applyRefundEvent : function () {
			console.log("申请退款事件~");
			var _this = this;
			// 请求申请退款接口
			this.reqApplyRefundApi(function (d) {
				// 跳转URL
				location.href = d.url;
			});
		},
		// 请求积分使用接口
		reqApplyRefundApi : function (callback) {
			// 判断是请求本地json数据，请求方式设置为GET
			if (data.applyRefund.flag && ajax.isLocal()){
				// 请求方式
				ajax.config.type = "get";
			}
			// 请求URL
			ajax.config.url = ajax.reqUrl(data.applyRefund, siteUrl);
			// 请求参数
			ajax.config.data = {
				hid_refund: 1,
			};
			// 请求数据
			ajax.reqDataApi(ajax.config,function (res) {
				console.log(res);
				// 判断返回数据是否操作成功
				if (res.res == 1) {
					// console.log(res.msg);
					alert(res.msg);
					// 数据返回成功回调方法
					callback && callback(res);
				} else {
					console.log(res.msg);
					alert(res.msg);
				}
			});
		},
		// ----------- 申请退款 START ------------------

		// ----------- 模板替换 START ------------------
		// 设置模板
		setTpl : function () {
			var tpl = {
				header : getTpl(header),
				container : getTpl(container),
				footer : getTpl(footer),
			};
			return tpl;
		},
		// 模板数据替换
		getHtml : function (tpl, d) {
			var headData = {
				is_logged: 1,
				url: '',
				title: d.page_title,
			}, footData = {
				// is_logged: 1 || (d.login_info && d.login_info.is_logged),
				is_logged: 1,
				url: d.login_info && d.login_info.url,
				amount: {
					pay_amount: d.order_data && d.order_data.pay_amount,
					pay_text: "确认支付",
				}
			};
			// d.pre_data = [];
			return {
				head_html : miniTpl(tpl.header.template, headData),
				container_html : miniTpl(tpl.container.template, d),
				foot_html : miniTpl(tpl.footer.template, footData),
			}
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
			console.log(_html);
			// 字符串插入到页面
			apendEl.innerHTML = _html;
		},
		// ----------- 模板替换 END ------------------

	};

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function (d, apendEl) {
		// console.log(d);
		// console.log(apendEl);
		// 获取版本号
		// getAppVersion();
		// 载入功能模块
		return new loadOrderDetails(d, apendEl);
	};

	return init;
});



