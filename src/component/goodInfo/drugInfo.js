// 组件引用
//
var ajax = require('../../vendors/ajax/js/ajax_jq');
var miniTpl = require('../../vendors/mini-tpl/mini-tpl');
var loadFile = require('../../vendors/loadFile/js/loadFile');
var _tpl = require('./tpl');
var quantity = require('../../vendors/Quantity/quantityOpt');
// 懒加载
var imgLazyLoad = require('../../vendors/imgLazyLoad/imgLazyLoad');
// 弹出层
var draw = require('../../vendors/drawer/js/drawer_m_v1.0.0');
// 获取模板
var getTpl = require('../../vendors/tools/getTpl/getTpl');

// 模板文件引用
var selectTime = require('./tpl/selectTime.html');

;(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.drugInfo = factory();
	}
})(this, function() {

	/**
	 * 数据
	 */
		// 接口参数和返回数据
	var data = {
			// 加入购物车接口
			addCart : {
				reqUrl	: 'ajax/addpreotc/rand:' + Math.random(),
				reqDevUrl	: 'ajax/addpreotc/rand:' + Math.random(),
				reqJson : "../../data/drugInfo/addpreotc.json",
				flag		: false,
			},
			// 提交订单接口
			submitOrder : {
				reqUrl	: 'ajax_otcfavor_pe/rand:' + Math.random(),
				reqDevUrl	: 'ajax_otcfavor_pe/rand:' + Math.random(),
				reqJson : "../../src/data/customs.json",
				flag		: false
			},
		};

	/**
	 * 本地数据
	 */
	var global = {
		isLock : false,
	};

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
	var loadDrugInfo = function (d, apendEl) {
		// 判断要插入html位置是否存在
		if (!apendEl) {
			console.log("请配置模块运行id~");
			return;
		}
		// 判断商品类别是否存在
		// if (!d.good_type) return;
		// 储存信息
		global.gid = d && d.good_data && d.good_data.gid;
		// 生成hash
		this.hash = utils.createHash(8);

		// 获取模板TPL对象
		var tpl = _tpl();
		console.log(tpl);
		console.log(d);
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

		// 默认启用懒加载
		this.lazyLoad();
	};
	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	loadDrugInfo.prototype = {
		// 绑定事件
		bindEvent : function (apendEl, d) {
			var _this = this;
			// 获取数据
			var loginInfo = d && d.login_info;		// 登录信息
			var timeList = d && d.good_data && d.good_data.pre_time_list;	// 时间数据
			var shopInfo = d && d.shop_info;		// 店铺信息
			var adviceDoctor = d && d.consult_script;		// 咨询家医
			console.log(loginInfo);
			console.log(timeList);
			console.log(shopInfo);
			console.log(adviceDoctor);
			// 获取绑定元素
			var $adviceDoctor = document.getElementById("advice_doctor"),		// 咨询家医
					$enterStore = document.getElementById("enter_store"),				// 进入店铺
					$buyNow = document.getElementById("buy_now"),								// 立即购买
					$scrollDom = apendEl.getElementsByTagName("main")[0];								// 滚动条元素

			// 绑定滚动条事件
			$scrollDom.onscroll = function () {
				console.log("滚动条事件~");
				// 触发懒加载事件
				_this.lazyLoad();
			};

			// 绑定咨询家医事件
			$adviceDoctor.onclick = function () {
				// 咨询家医事件
				_this.adviceDoctorEvent(loginInfo, adviceDoctor);
			};

			// 绑定进入店铺事件
			$enterStore.onclick = function () {
				// 进入店铺事件
				_this.enterStoreEvent(shopInfo);
			};

			// 绑定立即购买事件
			$buyNow.onclick = function () {
				// 立即购买事件
				_this.buyNowEvent(loginInfo, timeList);
			};

			// 触发数量加减插件
			this.bindQuantity();
		},
		// 判断是否登录
		isLogged : function (loginInfo) {
			// 判断是否登录，没有登录跳转登录页
			if (!loginInfo.is_logged) {
				console.log("你还没有登录，请先登录！");
				// 判断是app还是wap
				if (android_app || ios_app) {
					alert("请先登录~");
				} else {
					// 手机端跳转地址
					location.href = loginInfo.url;
				}
				return false;
			}
			return true;
		},
		// 咨询家医事件
		adviceDoctorEvent : function (loginInfo, adviceDoctor) {
			console.log("咨询家医事件~");
			// 判断是否登录, 没登录终止操作
			if (!this.isLogged(loginInfo)) return;
			// 执行js字符串语句
			return new Function (adviceDoctor)();
		},
		// 进入店铺事件
		enterStoreEvent : function (shopInfo) {
			console.log("进入店铺事件~");
			location.href = shopInfo.url;
		},
		// 立即购买事件
		buyNowEvent : function (loginInfo, timeList) {
			console.log("立即购买事件~");
			var _this = this;
			// 判断是否登录, 没登录终止操作
			if (!this.isLogged(loginInfo)) return;
			// 获取预约时间模板文件
			var tpl = getTpl(selectTime);
			console.log(tpl);
			// 触发弹出层事件
			draw({
				title : '选择预约时间',
				data : timeList,
				onShow : function (el) {
					$timeDom = $(el).find("li");
					$timeDom.click(function () {
						// 获取预约时间
						var _time = $(this).attr("attr_time");
						var is_allow = $(this).attr("attr_allow");
						// 判断当前时间可不可以预约
						if (is_allow === "1") {
							console.log("可以预约~");
							// 加入购物车并提交订单
							_this.addToCart(_time);
						} else {
							console.log("您选择的时间已约满~");
							alert("您选择的时间已约满~");
						}


					});
				},
				onCancel : function () {
					console.log("取消操作~");
				}
			}, tpl.template);
		},
		// 懒加载事件
		lazyLoad : function () {
			// 默认启用懒加载
			imgLazyLoad.init({
				offset: 0,
				throttle: 0
			});
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
		// 把html插入到页面
		insertHtml : function (dom_obj) {
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
		// 模板数据替换
		getHtml : function (tpl, d) {
			var headData = {
				// is_logged: 1 || (d.login_info && d.login_info.is_logged),
				is_logged: d.login_info && d.login_info.is_logged,
				url: d.login_info && d.login_info.url,
				title: d.good_data.base_info.good_info.goods_name,
			}, footData = {
				// is_logged: 1 || (d.login_info && d.login_info.is_logged),
				is_logged: d.login_info && d.login_info.is_logged,
				url: d.login_info && d.login_info.url,
			};
			return {
				head_html : miniTpl(tpl.header.template, headData),
				container_html : miniTpl(tpl.container.template, d.good_data),
				foot_html : miniTpl(tpl.footer.template, footData),
			}
		},

		// 加入购物车
		addToCart : function (t) {
			var _this = this;
			// 判断是否重复提交
			if (global.isLock) {
				return;
			}
			// 判断是请求本地json数据，请求方式设置为GET
			if (data.addCart.flag && ajax.isLocal()){
				// 请求方式
				ajax.config.type = "get";
			}
			// 请求URL
			ajax.config.url = ajax.reqUrl(data.addCart, siteUrl);
			// 请求参数
			ajax.config.data = {
				gid : global.gid,
				goods_num : 1,
			};

			// 请求完成操作
			ajax.config.complete = function () {
				global.isLock = false;
				console.log(1, global.isLock);
			};

			// 请求头
			// ajax.config.headers = {
			// 	Cookie: 'a9708lankcn=ldge106gtba4mi2ubfa17v3af3',
			// };
			// console.log(ajax.config.data);
			global.isLock = true;
			// 请求数据
			ajax.reqDataApi(ajax.config,function (res) {
				console.log(res);
				// 判断返回数据是否操作成功
				if (!res.error) {
					console.log(res.errmsg);
					// 储存返回数据
					global.cartData = res.data;
					// 请求提交订单接口
					_this.submitOrder(res.data, t);
				} else {
					console.log(res.errmsg);
					// 判断是否有跳转url, 如果有跳转到对应的地址
					if (res.url) {
						location.href = res.url;
					}
				}
			});
		},
		// 提交订单
		submitOrder : function (d, t) {
			// 判断是请求本地json数据，请求方式设置为GET
			if (data.submitOrder.flag && ajax.isLocal()){
				// 请求方式
				ajax.config.type = "get";
			}
			// 请求URL
			ajax.config.url = ajax.reqUrl(data.submitOrder, siteUrl);
			// 请求参数
			ajax.config.data = {
				tab : 'add',
				shops_pids : [{pids: d.id, shop_id: d.shop_id}],
				pre_time : t,
			};
			// 请求头
			// ajax.config.headers = {
			// 	Cookie: 'a9708lankcn=ldge106gtba4mi2ubfa17v3af3',
			// };
			// console.log(ajax.config.data);
			// 请求数据
			ajax.reqDataApi(ajax.config,function (res) {
				console.log(res);
				// 判断返回数据是否操作成功
				if (!res.error) {
					console.log(res.msg);
					alert(res.msg);
					// 跳转到订单详情
					location.href = res.url;
				} else {
					console.log(res.msg);
					alert(res.msg);
				}

			});
		},

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
		return new loadDrugInfo(d, apendEl);
	};

	return init;
});



