// 组件引用
var ajax = require('../../../vendors/ajax/js/ajax_jq');
var miniTpl = require('../../../vendors/mini-tpl/mini-tpl');
// 获取匹配模板
var getTpl = require('../tool/tplMath');
// 获取模板HTML
var getHtml = require('../tool/getHtml');
// 工具集
var utils = require('../tool/utils');
// 请求接口数据
var reqInterfaceData = require('../tool/reqInterfaceData');

// APP扫码方法
var qrcodeScan = require('../../../vendors/APP/qrcodeScan/qrCode');

// 表单自动验证
var inputAutoVerify = require('../../../vendors/inputAutoVerify/js/inputAutoVerify_v001');

/**
 * 业务逻辑
 *
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
		root.deviceBind = factory();
	}
})(this, function() {

	/**
	 * 数据
	 */
		// 接口参数和返回数据
	var data = {
			// 绑定设备
			bindDevice : {
				reqUrl	: '2/kangkangbloodpressuremonitor/api:get_device_info_by_sn',
				reqDevUrl	: '2/kangkangbloodpressuremonitor/api:get_device_info_by_sn',
				reqJson : "../../data/drugInfo/addpreotc.json",
				flag		: false,
			},
			// 解绑设备
			unbindDevice : {
				reqUrl	: '2/kangkangbloodpressuremonitor/api:unbind_device_by_sn',
				reqDevUrl	: '2/kangkangbloodpressuremonitor/api:unbind_device_by_sn',
				reqJson : "../../data/drugInfo/addpreotc.json",
				flag		: false,
			},
		};

	/**
	 * 本地数据
	 */
	var global = {
		isBindLock : false,
		isUnbindLock : false,
	};

	// 载入商品详情页面
	var loadDeviceBind = function (apendEl) {
		// debugger
		// 判断要插入html位置是否存在
		if (!apendEl) {
			console.log("请配置模块运行id~");
			return;
		}

		// 生成hash
		this.hash = utils.createHash(8);
		
		// 储存插入元素对象
		this.el = apendEl;

		// 判断是否绑定设备
		this.isBindDevice();
	};
	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	loadDeviceBind.prototype = {
		// 判断是否绑定设备
		isBindDevice : function () {
			// 判断是否绑定设备
			if (device_bind.is_bind) { // 已绑定设备
				this.unbindDeviceHand();
			} else { 			// 未绑定设备
				this.bindDeviceHand();
			}
		},

		// 解绑设备操作
		unbindDeviceHand : function () {
			console.log('解绑设备操作');
			// 获取模板TPL对象
			var tpl = getTpl('removeDevice');
			console.log(tpl);

			// 设置数据对象, 如果数据不存在设置为空对象
			var _data = device_bind.bind || {};

			// 判断是微信端
			_data.is_wx = is_wx;

			// 存储SN信息
			global.sn = _data.sn;

			console.log(_data);
			// 获取模板字符串对象
			var html_obj = getHtml(tpl, _data, pageTitle);
			console.log(html_obj);
			// 判断模板字符串不存在，终止运行
			if (!html_obj) return;

			// 判断是APP，head_html设为空
			if (android_app || ios_app || is_wx) {
				html_obj.head_html = '';
			}

			// 插入HTML字符串
			utils.insertHtmlStr(html_obj, this.el);

			// 绑定事件
			this.bindEvent_un(this.el);

		},

		// 解绑操作绑定事件
		bindEvent_un : function (apendEl, d) {
			var _this = this;
			// 获取绑定元素
			var $submitUnbind = document.getElementById('submitUnbind');
			console.log($submitUnbind);

			// 解绑设备事件
			$submitUnbind.onclick = function () {
				_this.submitUnbindEvent();
			};

		},

		// 提交解绑事件
		submitUnbindEvent : function () {
			console.log('提交解绑事件!');

			// 判断绑定已提交，阻止重复提交
			if (global.isUnbindLock) {
				console.log('解绑已提交，请不要重复提交！');
				return;
			}
			// 绑定已提交
			global.isUnbindLock = true;
			console.log('可以提交！');

			// 发送绑定请求
			this.reqUnbindDeviceApi();

		},
		// 发送解绑请求
		reqUnbindDeviceApi : function (obj) {
			if(typeof userId == 'undefined'){
				userId = '';
			}
			// 请求完成操作
			ajax.config.complete = function () {
				global.isUnbindLock = false;
				console.log(1, global.isUnbindLock);
			};

			// 请求参数
			var _param = {
				user_id : userId,
				sn			: global.sn,
			};
			console.log(_param);
			// return;
			// 提交解绑
			reqInterfaceData(data.unbindDevice, _param, ajax, function (d) {
				console.log(d);
				// 储存体检项目数据
				// global.appointmentService = d.no_charge_booking_service;
				console.log(global);
				// 刷新当前页面
				location.reload();

			});
		},

		// -------------------------------------- 绑定设备 -----------------------------------------------
		// 绑定设备操作
		bindDeviceHand : function () {
			console.log('绑定设备操作');
			// 获取模板TPL对象
			var tpl = getTpl('addDevice');
			console.log(tpl);

			// 设置数据对象, 如果数据不存在设置为空对象
			var _data = device_bind.unbind || {};

			// 判断是微信端
			_data.is_wx = is_wx;
			// 存储通知信息
			global.notice = _data.notice;

			console.log(_data);
			// 获取模板字符串对象
			var html_obj = getHtml(tpl, _data, pageTitle);
			console.log(html_obj);
			// 判断模板字符串不存在，终止运行
			if (!html_obj) return;

			// 插入HTML字符串
			utils.insertHtmlStr(html_obj, this.el);

			// 绑定事件
			this.bindEvent(this.el);

		},
		// 绑定事件
		bindEvent : function (apendEl, d) {
			var _this = this;
			// 获取绑定元素
			var $scanBarcode = document.getElementById('scanBarcode'),
				$sendTextCode = document.getElementById('send_text_code'),
				$submitBind = document.getElementById('submitBind');
			console.log($scanBarcode, $submitBind);

			// 绑定点击扫码事件
			$scanBarcode.onclick = function () {
				qrcodeScan();
			};

			// 绑定输入验证
			global.verify = inputAutoVerify('.db_form');

			// 绑定发送验证码事件
			$sendTextCode && ($sendTextCode.onclick = function () {
				_this.scanBarcodeEvent();
			});

			// 绑定点击提交绑定事件
			$submitBind.onclick = function () {
				_this.submitBindEvent();
			};

		},
		// 扫码事件
		scanBarcodeEvent : function () {
			console.log('扫码事件!');
		},
		// 提交绑定事件
		submitBindEvent : function () {
			console.log('提交绑定事件!');
			// 获取表单验证状态
			var isValidationPassed = global.verify.formSubmit();
			// 判断验证状态是否通过
			if (isValidationPassed) {
				console.log('验证没通过！');
				alert('请输入'+global.notice.barcode_title +'~');
				return;
			}

			// 判断绑定已提交，阻止重复提交
			if (global.isBindLock) {
				console.log('绑定已提交，请不要重复提交！');
				return;
			}
			// 绑定已提交
			global.isBindLock = true;
			console.log('可以提交！');

			// 发送绑定请求
			this.reqBindDeviceApi(global.verify.$elArr);

		},

		// 发送绑定请求
		reqBindDeviceApi : function (obj) {
			// 判断userId不存在，设为空值
			if(typeof userId == 'undefined'){
				userId = '';
			}
			// 请求完成操作
			ajax.config.complete = function () {
				global.isBindLock = false;
				console.log(1, global.isBindLock);
			};

			// 请求参数
			var _param = {
				user_id : userId,
				sn			: obj.sn.value,
			};
			console.log(_param);
			// return;
			// 提交绑定
			reqInterfaceData(data.bindDevice, _param, ajax, function (d, msg) {
				console.log(d);
				alert(msg);
				// 储存体检项目数据
				// global.appointmentService = d.no_charge_booking_service;
				console.log(global);

				// 判断是否有跳转url
				if (d.url) {
					// 跳转数据展示界面
					location.replace(d.url);
				} else {
					// 刷新当前页面
					location.reload();
				}
				// window.location.replace('http://d.zhangjinkai.com/adultvaccine/tab:list');

			});
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

	};

	// 扫码回调
	window.setValues = function(key, code) {
		console.log('扫码回调');
		// 判断是安卓还是ios
		if (typeof ios_app != 'undefined' && ios_app) {
			code = key;
		}
		document.getElementById('scan_code').value = code;
	};

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function (apendEl) {
		console.log(this);
		// debugger
		// 载入功能模块
		return new loadDeviceBind(apendEl);
	};

	return init;

});