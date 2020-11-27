// 组件引用
var ajax = require('../../../vendors/ajax/js/ajax_jq');
var utils = require('./utils');
// 获取匹配模板
var getTpl = require('./tplMath');
// 获取模板HTML
var getHtml = require('./getHtml');
// 修改app标题
var showTitleText = require('../../../vendors/APP/showTitleText/showTitleText');

(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.select_country = factory();
	}
})(this, function() {

	/**
	 * 数据
	 */
		// 接口参数和返回数据
	var data = {
			countryList: {
				reqUrl	: "2/lancare_customhouse_interface_Tianjin/api:nationality_list",
				reqDevUrl	: "2/lancare_customhouse_interface_Tianjin/api:nationality_list",
				reqJson : "../../service/examine/timeSlot.json",
				flag		: false
			},
		};

	/**
	 * 本地数据
	 */
	var global = {};

	// 绑定包含中文输入验证
	var bindZHInput = function (searchEl, callback) {
		/**
		 * @param flag: 用于标记是否是非直接的文字输入
		 */
		var flag = false, isFlag = false;
		searchEl.on({
			// 'keyup' : function(e){
			// 	flag = false;
			// 	console.log("抬起！");
			// 	callback && callback(this, el, d, inputEl);
			// },
			// 'keydown' : function(e){
			// 	// console.log("按下！");
			// 	flag = true;
			// },
			'input propertychange': function(e) {
				if(!flag) {
					console.log("输入！");
					// 验证非法输入
					callback && callback(this);
				}
			},
			'compositionstart': function(e) {
				flag = true;
			},
			'compositionend': function(e) {
				flag = false;
				if(!flag) {
					// 验证非法输入
					callback && callback(this);
				}
			}
		});
	};

	// 载入商品详情页面
	var loadSelectCountry = function (apendEl, hashName) {
		// 判断要插入html位置是否存在
		if (!apendEl) {
			console.log("请配置模块运行id~");
			return;
		}

		// 生成hash
		this.hash = utils.createHash(8);
		console.log("HASH", this.hash);

		// 初始化页面
		this.init(apendEl, hashName);
	};
	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	loadSelectCountry.prototype = {
		init : function (apendEl, hashName) {
			var _this = this;
			// 储存预约信息
			global.appointmentInfo = {
				user_id : userId,
				// no_charge_booking_service : {},
			};
			// 请求参数
			var _param = {
				user_id : userId,
			};

			// 请求预约信息
			this.reqInterfaceApi(data.countryList, _param,function (d) {
				console.log(d);
				// d.list = [];
				// 页面展示操作
				_this.initViewHand(d, apendEl, hashName);

			});
		},
		// 视图展示事件
		initViewHand : function (d, apendEl, hashName) {
			console.log(d);
			// d[0].value = "张默默";
			// d[6].value = "张默默";
			// 获取模板TPL对象
			var tpl = getTpl("select_country");
			console.log('tpl', tpl);

			// 更新data数据
			var newCountryData = {
				country: d,
				curCountry: {
					name: $('#country').find(".gp_dw_con").text()
				}
			};

			// 获取模板字符串对象
			var html_obj = getHtml(tpl, newCountryData, hashName);
			console.log(html_obj);
			// 判断模板字符串不存在，终止运行
			if (!html_obj) return;

			// 修改app标题
			// showTitleText(hashName);

			// 获取模板元素
			var htmlDom = utils.parseDom(html_obj)[0];

			// 插入HTML字符串
			utils.appendHtml(htmlDom);

			// 设置最大高度
			$(htmlDom).find(".dw_body").css("height", "12.2rem");
			var scale = window.screen.availHeight/window.screen.availWidth;
			if(scale < 1.8) {
				$(htmlDom).find(".dw_body").css("height", "7.6rem");
			}

			// 绑定事件
			this.bindEvent(apendEl, htmlDom);

		},
		// 绑定事件
		bindEvent : function (apendEl, htmlDom) {
			var _this = this;
			// 获取绑定元素
			var $country_list = $(htmlDom).find(".search_on"),				// 国家列表
				$search_input = $(".search_val"),				// 搜索输入框
				$cancel = $(htmlDom).find(".cancel"),				// 搜索输入框
				$dw_mask = $(htmlDom).find(".drawer_mask");		// 阴影元素
			console.log($country_list);

			// 绑定列表点击事件
			$country_list.on("click", "li", function () {
				_this.countryListHand(this, htmlDom);
			});

			// 绑定返回点击事件
			$cancel.click(function () {
				// 销毁组件
				$(htmlDom).remove();
			});

			// 绑定阴影点击事件
			$dw_mask.click(function () {
				// 销毁组件
				$(htmlDom).remove();
			});

			// 绑定输入框搜索事件
			$country_list.on("click", "li", function () {

			});
			// 绑定输入联想查询国家
			bindZHInput($search_input, this.inputCountryCallback);

		},
		// 国家输入回调方法
		inputCountryCallback : function (searchEl, el, d, inputEl) {
			// 获取输入框值
			var v = $(searchEl).val(), t;
			console.log(v);

			t && clearTimeout(t);
			t = setTimeout(function(){
				// 筛选新列表
				var newList = $(".search_off").find("li:contains('"+ v +"')").clone();
				console.log(1, newList);
				// 拷贝匹配国家
				$(".search_on").empty().append(newList);

			}, 300);
		},

		// 绑定列表点击事件
		countryListHand : function (el, htmlDom) {
			var _this = this;
			console.log("绑定列表点击事件~");
			console.log(el);
			// 获取点击项的值
			var selectVal = $(el).attr("attr_chinese");
			console.log(selectVal);

			// 国籍赋值
			$("#country_dummy").val(selectVal);
			$("#country").find(".gp_dw_con").text(selectVal);

			// 销毁组件
			$(htmlDom).remove();

			// 跳转Hash携带参数
			// var linkQuery = 'countryName=' + selectVal;
			// console.log(global.urlParam);
			// 跳转到预约详情页面
			// linkTo('#/registerInfo', linkQuery);

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

		// 模板数据替换
		getHtml : function (tpl, d, hashName) {

			var _obj = {};
			// 获取是否登录参数
			var isLogged = 1, skipUrl = "";
			if (d.login_info && d.login_info.is_logged) {
				isLogged = d.login_info.is_logged;
			}

			// 判断是APP，不返回headData数据
			if (!(android_app || ios_app)) {
				// 拼接head数据
				var headData = {
					is_logged: isLogged,
					url: skipUrl,
					title: hashName,
				};
				// 获取模板字符串
				if (tpl.header) {
					_obj.head_html = miniTpl(tpl.header.template, headData);
				} else {
					console.log("没配置头部模板~");
				}
			};

			// 判断是否返回footData
			if (tpl.footer) {
				// 拼接foot数据
				var footData = {
					is_logged: isLogged,
					url: skipUrl,
				};
				// 获取模板字符串
				_obj.foot_html = miniTpl(tpl.footer.template, footData);
			} else {
				console.log("没配置底部模板~");
			}
			// 判断内容模板是否配置
			if (tpl.container) {
				_obj.container_html = miniTpl(tpl.container.template, d);
			} else {
				console.log("请正确配置内容模板~");
				return false;
			}
			return _obj;
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
			if (d.ResultCode == 1) {
				console.log(d.ResultDescription);
				// console.log(d.Result);
				callback && callback(d.Result, d.ResultDescription);
			} else {
				console.log(d.ResultDescription);
				alert(d.ResultDescription);
			}
		},

	};

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function (obj, hashName) {
		// console.log(obj);
		// console.log(hashName);
		// 储存路由参数
		// global.urlParam = obj.query;
		// console.log(global.urlParam);
		// 载入功能模块
		return new loadSelectCountry(document.body, hashName);
	};

	return init;

});