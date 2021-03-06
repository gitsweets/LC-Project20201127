// 组件引用
var ajax = require('../../../vendors/ajax/js/ajax_jq');
var miniTpl = require('../../../vendors/mini-tpl/mini-tpl');
var _tpl = require('./tpl');
var utils = require('./utils');
// 修改app标题
var showTitleText = require('../../../vendors/APP/showTitleText/showTitleText');
// 弹出层
var draw = require('../../../vendors/drawer/js/drawer_m_v1.0.0');
// 获取模板
var getTpl = require('../../../vendors/tools/getTpl/getTpl');
// 模板文件引用
var selectUser = require('../tpl/selectUser.html');
var selectService = require('../tpl/selectService.html');
var selectTime = require('../tpl/selectTime.html');

(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.appointment = factory();
	}
})(this, function() {

	/**
	 * 数据
	 */
		// 接口参数和返回数据
	var data = {
			// 登记初始化信息
			registerInit : {
				reqUrl	: '2/lancare_customhouse_interface_Tianjin/api:health_examination_application_form_no_charge',
				reqDevUrl	: '2/lancare_customhouse_interface_Tianjin/api:health_examination_application_form_no_charge',
				reqJson : "../../../data/customs_simp/registerInit.json",
				flag		: false,
			},
			// 提交登记接口
			registerSubmit : {
				reqUrl	: '2/lancare_customhouse_interface_Tianjin/api:add_health_examination_application_form_no_charge_info',
				reqDevUrl	: '2/lancare_customhouse_interface_Tianjin/api:add_health_examination_application_form_no_charge_info',
				reqJson : "../../src/data/customs.json",
				flag		: false
			},
		};

	/**
	 * 本地数据
	 */
	var global = {};

	// 载入商品详情页面
	var loadRegister = function (apendEl) {
		// 判断要插入html位置是否存在
		if (!apendEl) {
			console.log("请配置模块运行id~");
			return;
		}

		// 生成hash
		this.hash = utils.createHash(8);
		console.log("HASH", this.hash);

		// 初始化页面
		this.init(apendEl);
	};
	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	loadRegister.prototype = {
		init : function (apendEl) {
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
			this.reqInterfaceApi(data.registerInit, _param,function (d) {
				console.log(d);
				// 储存登记数据
				global.registerData = d.children;
				// 更新预约信息
				// global.appointmentInfo.application = {
				// 	identifier	: d.application_info_view.application_form_context_identifier,
				// 	userName 		: d.application_info_view.fullname,
				// };
				// console.log(global);

				// 页面展示操作
				_this.initViewHand(d.children, apendEl);

			});
		},
		// 视图展示事件
		initViewHand : function (d, apendEl) {
			console.log(d);
			// d[0].value = "张默默";
			// d[6].value = "张默默";
			// 获取模板TPL对象
			var tpl = _tpl('registerInfo');
			console.log('tpl', tpl);

			// 获取模板字符串对象
			if (this.getHtmlObj(tpl, d)) {
				var html_obj = this.getHtmlObj(tpl, d);
			} else {
				return;
			}

			// 储存登记信息
			global.registerInfo = {

			};

			// 插入HTML字符串
			utils.insertHtmlStr(html_obj, apendEl);

			// 绑定点击事件
			this.bindEvent(apendEl, d);

		},
		// 绑定事件
		bindEvent : function (apendEl, d) {
			var _this = this;
			// 获取数据
			// 获取绑定元素
			var $inputArr = document.getElementsByClassName('input_control'),			// 所有输入框元素
				$nationality = document.getElementById("nationality"),								// 国籍
				$typeofidcard = document.getElementById("typeofidcard"),							// 证件类型
				$gender = document.getElementById("gender"),													// 性别
				$birthday = document.getElementById("birthday"),											// 出生日期
				$register_info = document.getElementById("register_info");						// 提交

			// 绑定下拉选择事件
			this.bindSelectHand();

			// 绑定提交登记事件
			$register_info.onclick = function () {
				// 提交登记事件
				_this.registerEvent(this);
			};

		},
		// 绑定下拉选择事件
		bindSelectHand : function () {
			// 绑定性别事件
			$('#gender').mobiscroll().treelist({
				theme: "ios", // Specify theme like: theme: 'ios' or omit setting to use default
				lang: "zh", // Specify language like: lang: 'pl' or omit setting to use default
				// display: $('#display').val(), // Specify display mode like: display: 'bottom' or omit setting to use default
				display: 'bottom',
				inputClass: 'input_control',
				// inputName: '4',
				// inputId: '4',
				// defaultValue: [5,1],
				mode: "Center", // More info about mode: https://docs.mobiscroll.com/3-0-0_beta5/list#!opt-mode
				width: [90, 160, 170], // More info about width: https://docs.mobiscroll.com/3-0-0_beta5/list#!opt-width
				placeholder: '请选择性别', // More info about placeholder: https://docs.mobiscroll.com/3-0-0_beta5/list#!opt-placeholder
				labels: ['Region', 'Supervisor', 'Tech'], // More info about labels: https://docs.mobiscroll.com/3-0-0_beta5/list#!opt-labels
				onInit : function () {
					$("#gender_dummy").attr("name", "4");
				},
				onSet: function (inst, event) {
					console.log(event);
					console.log(inst);
					var genderArr = inst.valueText.split(",");
					console.log(genderArr);
					$("#gender_dummy").val(genderArr[0]);
					$("#gender_dummy").attr("attr_v", genderArr[1]);
				}
			});

			// 绑定出生日期事件
			$('#birthday').mobiscroll().date({
				theme: "ios",
				lang: "zh",
				mode: "Center",
				dateFormat: 'yy-mm-dd',
				height:44,
				onSet: function (inst, event) {
					// console.log(event);
					// console.log(inst);
					global.registerInfo[7] = inst.valueText;
					// $("#listTreelist-demo_dummy").val(inst.valueText);
				}
			});

			// 绑定证件类型事件
			$('.card_type').mobiscroll().treelist({
				theme: "ios", // Specify theme like: theme: 'ios' or omit setting to use default
				lang: "zh", // Specify language like: lang: 'pl' or omit setting to use default
				display: 'bottom',
				inputClass: 'input_control',
				mode: "Center", // More info about mode: https://docs.mobiscroll.com/3-0-0_beta5/list#!opt-mode
				width: [90, 160, 170], // More info about width: https://docs.mobiscroll.com/3-0-0_beta5/list#!opt-width
				placeholder: '请选择证件类型', // More info about placeholder: https://docs.mobiscroll.com/3-0-0_beta5/list#!opt-placeholder
				labels: ['Region', 'Supervisor', 'Tech'], // More info about labels: https://docs.mobiscroll.com/3-0-0_beta5/list#!opt-labels
				onInit : function () {
					$("#typeofidcard_dummy").attr("name", "117");
				},
				onSet: function (inst, event) {
					// console.log(event);
					// console.log(inst);
					var genderArr = inst.valueText.split(",");
					console.log(genderArr);
					// global.registerInfo[4] = inst.valueText;
					$("#typeofidcard_dummy").val(genderArr[0]);
					$("#typeofidcard_dummy").attr("attr_v", genderArr[1]);
				}
			});
		},

		// 请求提交登记接口
		registerEvent : function (el) {
			var _this = this;
			console.log("提交登记事件~");
			console.log(el);
			// 获取登记信息数据
			if (!this.getRegisterInfo()) {
				console.log("验证没通过~");
				return;
			}
			// 请求参数
			var _param = {
				user_id : userId,
				form		: JSON.stringify(global.registerInfo),
			};
			console.log(_param);
			// 提交登记
			this.reqInterfaceApi(data.registerSubmit, _param,function (d) {
				console.log(d);
				// 储存体检项目数据
				// global.appointmentService = d.no_charge_booking_service;
				console.log(global);
				// 跳转Hash携带参数
				var linkQuery = 'identifier=' + d.identifier;
				// 跳转到预约页面
				linkTo('#/appointmentInfo', linkQuery);

			});
		},
		// 获取登记信息数据
		getRegisterInfo : function () {
			// 获取信息元素
			var $inputArr = document.getElementsByClassName('input_control');			// 所有输入框元素
			console.log($inputArr);
			// 遍历数组获取相应的值
			var i = 0, len = $inputArr.length;
			for (; i<len; i++) {
				var _name = $inputArr[i].getAttribute("name");
				var _v 		= $inputArr[i].value;
				var _tip	= $inputArr[i].getAttribute("placeholder");
				var _id 	= $inputArr[i].getAttribute("id");
				console.log(_name, _v, _id);
				// 根据下拉id，设置name属性
				// if (_id == "gender_dummy") {	// 性别
				// 	_name = "4"
				// }
				// if (_id == "typeofidcard_dummy") {	// 证件类型
				// 	_name = "117"
				// }
				// 判断输入框没有name属性跳出循环
				if (!_name) continue;
				// 判断name属性是15（单位名称），可以为空
				// if (_name == 15)  continue;
				// 判断输入框有name属性，但是没有值(name属性是15（单位名称），可以为空)
				if (!_v && _name != 15) {
					alert(_tip);
					return false;
				}
				// 判断name属性是12（证件号码），可以为空
				if ((_name == 12) && (global.registerInfo[117] == "身份证") && (_v.length < 1))  {
					alert("请输入正确的身份证~");
					return false;
				};
				// 储存当前登记信息
				global.registerInfo[_name] = _v;
			}
			console.log(global.registerInfo);
			return true;
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
		getHtml : function (tpl, d) {
			var headData = {
				// is_logged: 1 || (d.login_info && d.login_info.is_logged),
				is_logged: 1,
				url: '',
				title: '',
			}, footData = {
				is_logged: '',
				url: '',
			};
			return {
				head_html : miniTpl(tpl.header.template, headData),
				container_html : miniTpl(tpl.container.template, d),
				foot_html : miniTpl(tpl.footer.template, footData),
			}
		},
		// 获取模板字符串对象
		getHtmlObj : function (tpl, d) {
			// 判断模板配置是否正确
			if (tpl && tpl.container && tpl.header && tpl.footer) {
				// 模板数据替换
				var html_obj = this.getHtml(tpl, d);
				console.log(html_obj);
				// 判断是APP，head_html设为空
				if (android_app || ios_app) {
					html_obj.head_html = '';
				}
				return html_obj;
			} else {
				console.log("请正确配置模板~");
				return false;
			}
		},

		// 预约初始化数据
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
				callback && callback(d.Result);
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
	var init = function () {
		// console.log("预约！");
		// console.log(d);
		// console.log(apendEl);
		// 获取版本号
		// getAppVersion();
		// 载入功能模块
		return new loadRegister(document.getElementById('customs_simp'));
	};

	return init;

});