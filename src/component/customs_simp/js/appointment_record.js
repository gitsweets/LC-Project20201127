// 组件引用
var ajax = require('../../../vendors/ajax/js/ajax_jq');
var miniTpl = require('../../../vendors/mini-tpl/mini-tpl');
var _tpl = require('./tpl');
var utils = require('./utils');
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
		root.appointment_record = factory();
	}
})(this, function() {

	/**
	 * 数据
	 */
		// 接口参数和返回数据
	var data = {
			// 预约记录接口
			appointmentRecord : {
				reqUrl	: '2/lancare_customhouse_interface_Tianjin/api:no_charge_booking_service_list',
				reqDevUrl	: '2/lancare_customhouse_interface_Tianjin/api:no_charge_booking_service_list',
				reqJson : "../../src/data/customs.json",
				flag		: false
			},
			// 预约签到接口
			appointmentSignin : {
				reqUrl	: '2/lancare_customhouse_interface_Tianjin/api:checkin_no_charge_booking_service',
				reqDevUrl	: '2/lancare_customhouse_interface_Tianjin/api:checkin_no_charge_booking_service',
				reqJson : "../../src/data/customs.json",
				flag		: false
			},
			// 取消预约接口
			appointmentCancel : {
				reqUrl	: '2/lancare_customhouse_interface_Tianjin/api:cancel_no_charge_booking_service',
				reqDevUrl	: '2/lancare_customhouse_interface_Tianjin/api:cancel_no_charge_booking_service',
				reqJson : "../../src/data/customs.json",
				flag		: false
			},
		};

	/**
	 * 本地数据
	 */
	var global = {};

	// 载入商品详情页面
	var loadAppointmentRecord = function (apendEl, hashName) {
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
	loadAppointmentRecord.prototype = {
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
			this.reqInterfaceApi(data.appointmentRecord, _param,function (d) {
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
			var tpl = _tpl('appointmentRecord');
			console.log('tpl', tpl);

			// 获取模板字符串对象
			var html_obj = this.getHtml(tpl, d, hashName);
			console.log(html_obj);
			// 判断模板字符串不存在，终止运行
			if (!html_obj) return;

			// 修改app标题
			showTitleText(hashName);

			// 插入HTML字符串
			utils.insertHtmlStr(html_obj, apendEl);

			// 绑定点击事件
			this.bindEvent(apendEl, hashName);

		},
		// 绑定事件
		bindEvent : function (apendEl, hashName) {
			var _this = this;
			// 获取绑定元素
			var $aptDetail = $(".apt_detail"),	// 查看详情
				$aptCancel = $(".apt_cancel"),	// 取消
				$aptSignin = $(".apt_signin");	// 签到
			console.log($aptDetail);

			// 绑定查看详情点击事件
			$aptDetail.click(function () {
				_this.viewDetailHand(this);
			});

			// 绑定取消点击事件
			$aptCancel.click(function () {
				_this.cancelHand(this, apendEl, hashName);
			});

			// 绑定签到点击事件
			$aptSignin.click(function (el) {
				_this.signinHand(this);
			});

		},

		// 绑定取消点击事件
		cancelHand : function (el, apendEl, hashName) {
			var _this = this;
			console.log("绑定取消点击事件~");
			console.log(el);
			// 获取预约标识
			var _identifier = $(el).attr("attr_identifier");
			console.log(_identifier);
			// 请求参数
			var _param = {
				user_id : userId,
				identifier : _identifier,
			};
			console.log(_param);
			// 请求预约信息
			this.reqInterfaceApi(data.appointmentCancel, _param,function (d, msg) {
				console.log(d);
				alert(msg);
				// alert(location.href);
				// 刷新当前页
				_this.init(apendEl, hashName);
			});
		},
		// 绑定签到点击事件
		signinHand : function (el) {
			console.log("绑定签到点击事件~");
			console.log(el);
			// 获取预约标识
			var _identifier = $(el).attr("attr_identifier");
			console.log(_identifier);
			// 请求参数
			var _param = {
				user_id : userId,
				identifier : _identifier,
			};
			console.log(_param);
			// 请求预约信息
			this.reqInterfaceApi(data.appointmentSignin, _param,function (d, msg) {
				console.log(d);
				alert(msg);
				// 刷新当前页
				location.reload();
			});
		},
		// 查看详情点击事件
		viewDetailHand : function (el) {
			console.log("查看详情点击事件~");
			console.log(el);
			// 获取预约标识
			var _identifier = $(el).attr("attr_identifier");
			console.log(_identifier);
			// 跳转Hash携带参数
			var linkQuery = 'identifier=' + _identifier;
			// 跳转到预约详情页面
			linkTo('#/appointmentDetails', linkQuery);
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
		console.log(obj);
		console.log(hashName);
		// 储存路由参数
		global.urlParam = obj && obj.query;
		console.log(global.urlParam);
		// 载入功能模块
		return new loadAppointmentRecord(document.getElementById('customs_simp'), hashName);
	};

	return init;

});