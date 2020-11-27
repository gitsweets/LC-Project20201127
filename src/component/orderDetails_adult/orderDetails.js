// 组件引用
// ajax设置
var ajax = require('../../vendors/ajax/js/ajax_jq');
// 模板渲染
var miniTpl = require('../../vendors/mini-tpl/mini-tpl');
// 价格加减
var Prices = require('../../vendors/Prices/pricesOpt');
// 弹出层
var draw = require('../../vendors/drawer/js/drawer_m_v1.0.0');
// 选项卡
var Tab = require('../../vendors/tab/js/tab');
// 获取模板
var getTpl = require('../../vendors/tools/getTpl/getTpl');
// BASE64解析
var Base64 = require("../../vendors/Base64/Base64");

// 模板文件引用
var header = require('./tpl/head.html');
var footer = require('./tpl/foot.html');
var container = require('./tpl/orderDetails.html');
var selectCoupon = require('./tpl/selectCoupon.html');
var selectPayType = require('./tpl/selectPayType.html');

;(function(root, factory) {
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
			// 加入购物车接口
			couponList : {
				reqUrl	: 'ajax_coupondlist/rand:' + Math.random(),
				reqDevUrl	: 'ajax_coupondlist/rand:' + Math.random(),
				reqJson : "../../data/orderDetails/coupon.json",
				flag		: false,
			},
			// 选优惠卷接口
			checkCoupon : {
				reqUrl	: 'ajax_coupondetail/rand:' + Math.random(),
				reqDevUrl	: 'ajax_coupondetail/rand:' + Math.random(),
				reqJson : "../../data/orderDetails/coupon.json",
				flag		: false,
			},
			// 积分使用接口
			integralUse : {
				reqUrl	: 'ajax/orderjifenpay/rand:' + Math.random(),
				reqDevUrl	: 'ajax/orderjifenpay/rand:' + Math.random(),
				reqJson : "../../data/orderDetails/coupon.json",
				flag		: false,
			},
			// 积分取消接口
			integralCancel : {
				reqUrl	: 'ajax/orderjfcancel/rand:' + Math.random(),
				reqDevUrl	: 'ajax/orderjfcancel/rand:' + Math.random(),
				reqJson : "../../data/orderDetails/coupon.json",
				flag		: false,
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
			// 获取数据
			var orderData = d && d.order_data;		// 订单数据
			var couponData = {										// 优惠卷数据
				coup_detail_id: d && d.order_data && d.order_data.coupondetail_id,
				user_id: d.pay_data && d.pay_data.user_id,
				order_id: d.order_data.oid,
			};
			var payData = d && d.pay_data;		// 支付数据
			var adviceDoctor = d && d.consult_script;		// 咨询家医
			console.log(orderData);
			console.log(couponData);
			console.log(payData);
			console.log(adviceDoctor);
			// 存储(优惠卷数量、积分、金额、总计费用)
			global.orderInfo = {
				goodsAmount: d.order_data.goods_amount,					// 商品总价
				amount: d.order_data.amount,										// 使用优惠卷后的总价
				payAmount: d.order_data.pay_amount,							// 实际支付总价
				couponDiscount : d.order_data.coupon_discount,	// 优惠卷面值
				couponUserCount : d.order_data.count_coupondetail_have_been_used, // 优惠卷使用数量
				couponUserThreshold : d.order_data.count_coupondetail_have_been_used, // 优惠卷使用门槛
				scoreMoney : d.order_data.scorelist_money,			// 已使用积分
				scoreAmount: d.order_data.scoreamount,					// 积分总数
				scoreUseMax: d.order_data.showscore,						// 可用积分最大值积分总数
				inputScore	: d.order_data.showscore,						// 文本框输入积分
			};

			// 获取绑定元素
			var $coupon = document.getElementById("of_coupon"),							// 使用优惠券
					$ig_recharge = document.getElementById("ig_recharge"),				// 积分充值
					$ig_user = document.getElementById("ig_user"),								// 积分使用
					$user_ig 	= $ig_user && $ig_user.parentNode,													// 积分使用父元素
					$ig_cancel = document.getElementById("ig_cancel"),						// 积分取消使用
					$cancel_ig 	= $ig_cancel && $ig_cancel.parentNode,										// 积分取消父元素
					$ig_count = document.getElementById("ig_count"),							// 积分数量操作
					$pay_sure = document.getElementById("f_pay_sure");						// 确认支付

			// 获取APP版本号
			this.getAppVersion();

			// 绑定使用优惠券事件
			$coupon && ($coupon.onclick = function () {
				// 使用优惠券事件
				_this.userCouponEvent(orderData.oid, couponData);
			});

			// 积分数量操作事件
			this.bindScoreOptEvent($ig_count);

			// 绑定积分充值事件
			$ig_recharge && ($ig_recharge.onclick = function () {
				console.log("绑定积分充值事件~");
				// 跳转到积分充值界面
				location.href = d.rechargeurl;
			});

			// 绑定积分使用事件
			$ig_user && ($ig_user.onclick = function () {
				// 使用积分事件
				_this.userScoreEvent(payData, $user_ig, $cancel_ig);
			});

			// 绑定积分取消事件
			$ig_cancel && ($ig_cancel.onclick = function () {
				// 取消积分事件
				_this.scoreCancelEvent(payData, $user_ig, $cancel_ig);
			});

			// 绑定确认支付事件
			$pay_sure.onclick = function () {
				// 确认支付事件
				_this.surePayEvent(payData);
			};

			// 模拟触发绑定
			// $coupon.click();
		},

		// ----------- 确认支付 START ------------------
		// 确认支付事件
		surePayEvent : function (payData) {
			console.log("确认支付事件~");
			var _this = this;

			// 判断实际支付金额为0，直接提交
			if (global.orderInfo.isScore) {
				// 更新form支付方式
				$("#pay_type").val("coupon");
				// 提交form支付
				$("#paying_form").submit();
				return;
			}

			// 获取付款方式模板文件
			var tpl = getTpl(selectPayType);
			console.log(tpl);

			// 触发弹出层事件
			draw({
				title : '请选择支付方式',
				onShow : function (el, obj) {
					// 绑定支付方式选择事件
					_this.bindSelectPayTypeEvent(el, obj, payData);
				},
				onCancel : function () {
					console.log("取消操作~");
				}
			}, tpl.template);
		},
		// 绑定支付方式选择事件
		bindSelectPayTypeEvent : function (el, obj, payData) {
			console.log(el);
			console.log(payData);
			// 获取绑定元素
			var $payTypeDom = el[0].getElementsByTagName("li");
			console.log($payTypeDom);
			// 定义绑定事件参数
			var i = 0, len = $payTypeDom.length;
			for (; i<len; i++) {
				var elItem = $payTypeDom[i];
				elItem.index = i;
				elItem.onclick = function () {
					console.log(this);
					// 获取支付方式
					var pay_type = this.getAttribute("data-pay");
					// 更新form支付方式
					$("#pay_type").val(pay_type);
					// alert(pay_type);

					// 判断是app，更新form信息
					if (android_app || ios_app) {
						// 更新form版本号和包名
						$("#app_name").val(global.appInfo.packageName);
						$("#android_version").val(global.appInfo.version);
					}

					// 更新支付数据
					payData.payType = pay_type;
					payData.packageName = global.appInfo && global.appInfo.packageName;
					payData.version = global.appInfo && global.appInfo.version;
					console.log(payData);

					// alert(payData.version);
					// alert(payData.packageName);

					// 销毁插件
					obj.destroyDraw(el);

					// 提交form支付
					$("#paying_form").submit();
				}
			}

		},
		// ----------- 确认支付 END ------------------

		// ----------- 积分 START ------------------
		// 使用积分事件
		userScoreEvent : function (payData, $user_ig, $cancel_ig) {
			console.log("使用积分事件~");
			var _this = this;
			// 配置请求参数
			var obj = {
				jf 		: global.orderInfo.inputScore,
				oid 	: payData.orderid,
				type 	: ''
			};
			// 请求积分使用接口
			this.reqScoreUseApi(obj, function () {
				// 隐藏使用，显示取消
				$user_ig.style.display = 'none';
				$cancel_ig.style.display = 'block';
				// debugger
				// 更新页面积分
				var scoreAmount = global.orderInfo.scoreAmount - global.orderInfo.inputScore;
				console.log(scoreAmount);
				$(".ig_val").html(scoreAmount);
				// 更新已使用积分数
				$(".ig_state").find("span").html(parseFloat(global.orderInfo.inputScore).toFixed(2));
				// 更新已使用积分
				global.orderInfo.scoreMoney = global.orderInfo.inputScore;
				// 更新页面显示数据
				_this.updatePageContent(global.orderInfo, 2);
			});
		},
		// 请求积分使用接口
		reqScoreUseApi : function (obj, callback) {
			// 判断是请求本地json数据，请求方式设置为GET
			if (data.integralUse.flag && ajax.isLocal()){
				// 请求方式
				ajax.config.type = "get";
			}
			// 请求URL
			ajax.config.url = ajax.reqUrl(data.integralUse, siteUrl);
			// 请求参数
			ajax.config.data = obj;
			// 请求数据
			ajax.reqDataApi(ajax.config,function (res) {
				console.log(res);
				// 判断返回数据是否操作成功
				if (!res.error) {
					// console.log(res.errmsg);
					// 数据返回成功回调方法
					callback && callback();
				} else {
					console.log(res.errmsg);
					alert(res.errmsg);
				}
			});
		},
		// 积分取消事件
		scoreCancelEvent : function (payData, $user_ig, $cancel_ig) {
			console.log("使用积分事件~");
			var _this = this;
			// 配置请求参数
			var obj = {
				del		: '3',
				oid 	: payData.orderid,
				type 	: ''
			};
			// 请求积分取消接口
			this.reqScoreCancelApi(obj, function () {
				// 隐藏使用，显示取消
				$user_ig.style.display = 'block';
				$cancel_ig.style.display = 'none';
				// 更新页面积分
				var scoreAmount = global.orderInfo.scoreAmount;
				console.log(scoreAmount);
				$(".ig_val").html(scoreAmount);
				// 更新存储积分使用数
				global.orderInfo.scoreMoney = global.orderInfo.scoreUseMax;
				// 更新页面显示数据
				_this.updatePageContent(global.orderInfo, 3);
			});
		},
		// 请求积分取消接口
		reqScoreCancelApi : function (obj, callback) {
			// 判断是请求本地json数据，请求方式设置为GET
			if (data.integralCancel.flag && ajax.isLocal()){
				// 请求方式
				ajax.config.type = "get";
			}
			// 请求URL
			ajax.config.url = ajax.reqUrl(data.integralCancel, siteUrl);
			// 请求参数
			ajax.config.data = obj;
			// 请求数据
			ajax.reqDataApi(ajax.config,function (res) {
				console.log(res);
				// 判断返回数据是否操作成功
				if (!res.error) {
					console.log(res.errmsg);
					// 数据返回成功回调方法
					callback && callback();
				} else {
					console.log(res.errmsg);
					alert(res.errmsg);
				}
			});
		},
		// 绑定积分数量操作事件
		bindScoreOptEvent : function ($ig_count) {
			// 积分数量操作事件
			Prices($ig_count, {
				isTpl: false,
				minNum: 0,
				maxNum: global.orderInfo.scoreUseMax,
				stepVal	: 1,					// 每次增加或减少的值
				digit		: 2,					// 小数保留位数
				isDisabled: false,
				addHandle: function (curV, obj) {
					console.log(obj);
					// 判断超出总价
					if (parseFloat(curV) > parseFloat(global.orderInfo.amount)) {
						obj.inputEl.value = global.orderInfo.amount;
					} else {
						obj.inputEl.value = curV;
					}
					// 存储积分使用数
					global.orderInfo.inputScore = obj.inputEl.value;
				},
				inputHandle: function (curV, obj) {
					console.log(obj);
					// 更新积分值
					obj.inputEl.value = parseFloat(curV).toFixed(2);
					// 存储积分使用数
					global.orderInfo.inputScore = obj.inputEl.value;
				},
				cutHandle: function (curV, obj) {
					console.log(obj);
					// 更新积分值
					obj.inputEl.value = parseFloat(curV).toFixed(2);
					// 存储积分使用数
					global.orderInfo.inputScore = obj.inputEl.value;
				},
			});
		},
		// ----------- 积分 END ------------------

		// ----------- 优惠券 START ------------------
		// 使用优惠券事件
		userCouponEvent : function (orderId, couponData) {
			console.log("使用优惠券事件~");
			var _this = this;
			// 获取预约时间模板文件
			var tpl = getTpl(selectCoupon);
			console.log(tpl);
			// 请求优惠券列表数据
			this.reqCouponApi(orderId, function (d) {
				// console.log(d);
				// 触发弹出层事件
				global.draw = draw({
					title : '请选择优惠券',
					data : d,
					onShow : function (el) {
						_this.bindCouponListEvent(el, couponData);
					},
					onSure: function (el, obj) {	// 触发确认后事件
						console.log("确认！");
						// 更新页面显示数据
						_this.updatePageContent(global.orderInfo, 1);
						// 销毁插件
						obj.destroyDraw(el);
					},
					onCancel : function () {
						console.log("取消操作~");
					}
				}, tpl.template);
			});
		},
		// 绑定优惠券列表事件
		bindCouponListEvent : function (el, couponData) {
			console.log("绑定优惠券列表事件~");
			// 获取绑定元素
			var $couponDom = el[0].getElementsByClassName("tab_con")[0].getElementsByTagName("li");		// 优惠卷元素
			console.log($couponDom);
			// 绑定优惠卷选项卡切换事件
			Tab({
				tabMenu 	  			: ".tab_list",
				tabContent				: ".tab_body",
				tabContentChildEl	: ".tab_con",
				curMenuClass 			: "cur",
				curTab						: 0,
				callBack					: function () {
					console.log("回调方法~");
					// 切换后执行操作
				}
			});

			// 绑定优惠卷选中事件
			this.bindCheckCoupon($couponDom, couponData);

		},
		// 绑定优惠卷选中事件
		bindCheckCoupon : function (elArr, d) {
			var _this = this;
			// 定义遍历变量
			var i = 0, len = elArr.length;
			// 遍历优惠卷元素绑定事件
			for (; i<len; i++) {
				var el = elArr[i];
				el.index = i;
				el.onclick = function () {
					// 判断couponData是否存在，先执行删除操作然后执行添加操作
					console.log(this);
					console.log(d);
					// 获取优惠卷信息
					var couponId = $(this).attr("attr_id");
					var couponDiscount = $(this).attr("attr_discount");
					var couponThreshold = $(this).attr("attr_threshold");
					// 优惠卷选中操作
					_this.checkCouponHand(couponId, d, this, couponDiscount, couponThreshold);
				};
			}
		},
		// 优惠卷选中操作
		checkCouponHand : function (couponId, d, el, couponDiscount, couponThreshold) {
			var _this = this;
			console.log(el);
			// 获取选中元素
			var $icon = el.getElementsByClassName("coup_icon")[0];
			console.log($icon);
			// 获取上一次选中元素
			var preEl = "[attr_id='"+d.coup_detail_id+"']";
			var $preEl = $(preEl).find(".coup_icon")[0];
			console.log($preEl);
			// 把接口参数设置成删除
			d.tab = 'del';
			// 判断当前优惠卷是否已选中
			if (d.coup_detail_id == couponId) {
				// 执行移除选中操作
				this.reqCheckCouponApi(d, function () {
					console.log("删除选中");
					// 删除选中
					$icon.innerHTML = '<span class="iconfont iconbuxuanzhong" ></span>';
					// 优惠卷ID改为0
					d.coup_detail_id = 0;
					// 更新优惠卷信息
					global.orderInfo.couponUserCount = 0;
					global.orderInfo.couponDiscount = 0;
					global.orderInfo.couponUserThreshold = 0;
				});
			} else if (d.coup_detail_id == 0) {
				// 把接口参数设置成添加
				d.tab = 'add';
				// 优惠卷ID改为0
				d.coup_detail_id = couponId;
				// 执行选中操作
				_this.reqCheckCouponApi(d, function () {
					console.log("选中");
					// 选中
					$icon.innerHTML = '<span class="iconfont iconiconfontxuanzhong4" ></span>';
					// 更新优惠卷信息
					global.orderInfo.couponUserCount = 1;
					global.orderInfo.couponDiscount = couponDiscount;
					global.orderInfo.couponUserThreshold = couponThreshold;
				});
			} else {
				// 执行移除选中操作
				this.reqCheckCouponApi(d, function () {
					// 把接口参数设置成添加
					d.tab = 'add';
					console.log("删除选中");
					// 删除上一次选中
					$preEl && ($preEl.innerHTML = '<span class="iconfont iconbuxuanzhong" ></span>');
					// 更新优惠卷ID
					d.coup_detail_id = couponId;
					// 执行选中操作
					_this.reqCheckCouponApi(d, function () {
						console.log("选中");
						// 选中
						$icon.innerHTML = '<span class="iconfont iconiconfontxuanzhong4" ></span>';
						// 更新优惠卷信息
						global.orderInfo.couponUserCount = 1;
						global.orderInfo.couponDiscount = couponDiscount;
						global.orderInfo.couponUserThreshold = couponThreshold;
					});
				});
			}
		},
		// 请求优惠券列表数据
		reqCouponApi : function (orderId, callback) {
			// 判断是请求本地json数据，请求方式设置为GET
			if (data.couponList.flag && ajax.isLocal()){
				// 请求方式
				ajax.config.type = "get";
			}
			// 请求URL
			ajax.config.url = ajax.reqUrl(data.couponList, siteUrl);
			// 请求参数
			ajax.config.data = {
				order_id : orderId,
			};
			// 请求数据
			ajax.reqDataApi(ajax.config,function (res) {
				console.log(res);
				// 判断返回数据是否操作成功
				if (res.res) {
					console.log(res.data);
					// alert(res.msg);
					// TODO:判断是否有可使用优惠券（待处理）
					// 数据返回成功回调方法
					callback && callback(res.data);
				} else {
					console.log(res.data);
				}
			});
		},
		// 请求选中优惠卷接口
		reqCheckCouponApi : function (d, callback) {
			// 判断是请求本地json数据，请求方式设置为GET
			if (data.checkCoupon.flag && ajax.isLocal()){
				// 请求方式
				ajax.config.type = "get";
			}
			// 请求URL
			ajax.config.url = ajax.reqUrl(data.checkCoupon, siteUrl);
			// 请求参数
			ajax.config.data = d;
			// 请求数据
			ajax.reqDataApi(ajax.config,function (res) {
				console.log(res);
				// 判断返回数据是否操作成功
				if (!res.error) {
					console.log(res.errmsg);
					// 数据返回成功回调方法
					callback && callback();
				} else {
					console.log(res.errmsg);
					alert(res.errmsg);
				}
			});
		},
		// ----------- 优惠券 END ------------------

		// ----------- 价格计算 START ------------------
		// 更新页面显示数据
		updatePageContent : function (orderInfo, flag) {
			console.log(orderInfo);
			// 计算可使用优惠卷最大值
			var couponUseMax = orderInfo.goodsAmount - orderInfo.scoreMoney;
			// 判断优惠卷的面值是否超出使用最大值
			var couponDiscount = orderInfo.couponDiscount > couponUseMax ? couponUseMax : orderInfo.couponDiscount;
			// 优惠卷状态文字
			var  stateText = "已选" + orderInfo.couponUserCount + "张，省￥" + couponDiscount;

			// 计算总价
			var totalPayAmount = this.totalPrice(orderInfo, flag);
			console.log(totalPayAmount);
			// 计算去除优惠卷的价格
			var totalAmount = orderInfo.goodsAmount - orderInfo.couponDiscount;
			console.log(totalAmount);

			// 判断实际支付总价是否为0
			if (totalPayAmount == 0) {
				global.orderInfo.isScore = true;	// 标记是积分支付
			} else {
				global.orderInfo.isScore = false;	// 标记是积分支付
			}
			console.log(global.orderInfo.isScore);

			// 更新去除优惠卷的价格
			orderInfo.amount = totalAmount;
			// 更新实际支付价格
			orderInfo.payAmount = totalPayAmount;
			// 更新可使用积分最大值
			orderInfo.scoreUseMax = totalAmount;
			// 更新文本框输入积分
			orderInfo.inputScore = totalAmount;

			// 更新优惠卷状态
			$("#state_text").html(stateText);
			// 更新费用总计和实际支付
			$("#f_pay_sure").find("i").html(totalPayAmount);
			$("#total_amount").html(totalAmount);
			// 更新积分数
			$(".text_change").val(parseFloat(totalAmount).toFixed(2));

		},
		// 计算实际字符价格
		totalPrice : function (orderInfo, flag) {
			var payAmount = 0, curPayAmount;
			// 区分是操作优惠卷和积分, 计算总价
			switch (flag) {
				case 1:		// 优惠卷
					curPayAmount = orderInfo.goodsAmount - orderInfo.scoreMoney;	// 计算去除积分后的价格
					// 总价(判断优惠卷金额大于总价，总价为0)
					payAmount = orderInfo.couponDiscount > curPayAmount ? 0 : curPayAmount - orderInfo.couponDiscount;
					break;
				case 2:		// 使用积分
					// 总价(判断优惠卷金额大于总价，总价为0)
					payAmount = orderInfo.amount - orderInfo.scoreMoney;
					break;
				case 3:		// 取消积分
					// 总价(判断优惠卷金额大于总价，总价为0)
					payAmount = orderInfo.amount;
					break;
				default:
					break;
			}
			return payAmount;
		},
		// ----------- 价格计算 END ------------------

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

		// ----------- 获取APP版本号 START ------------------
		getAppVersion : function () {
			if (android_app){
				console.log("安卓 APP内支付");
				// 获取版本号
				var appInfo = window.LanCareWeb.getVersion(),
					jsonobj = jQuery.parseJSON(appInfo);
				// alert(jsonobj);
				// 判断appInfo是否存在
				if (!appInfo) return;
				// alert("appInfo存在！");
				// alert(jsonobj.packageName);
				// alert(jsonobj.ver);
				// 存储版本号和包名信息
				global.appInfo = {
					packageName: jsonobj.packageName,
					version: jsonobj.ver,
				};
				// 页面赋值
				// $("#app_name").val(appInfo.packageName);

			} else if (ios_app){
				console.log("IOS APP内支付");
				window.webkit.messageHandlers.Lancare.postMessage('getVersionAndName');
			} else {
				console.log("非APP内支付");
			}
		},

		// ----------- 获取APP版本号 END ------------------
	};

	// 提升IOS回调方法作用域，解析ios传回的base64编码
	window.getVersionAndNameForIos = function (code) {
		// alert(code);
		// 判断编码不存在并退出
		if (!code) return;
		// 解析base64编码
		var Base = new Base64(),
			jsonobj = jQuery.parseJSON(Base.decode(code));
		console.log("Base", jsonobj);
		// {name: "cn.lancare.lancare", version: "3.0.59/20191014000001"}
		// alert(jsonobj.name);
		// alert(jsonobj.version);
		// 存储版本号和包名信息
		global.appInfo = {
			packageName: jsonobj.name,
			version: jsonobj.version,
		};
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



