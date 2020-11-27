// 组件引用
var ajax = require('../../../vendors/ajax/js/ajax_jq');
var miniTpl = require('../../../vendors/mini-tpl/mini-tpl');
var _tpl = require('./tpl');
var utils = require('./utils');
// 修改app标题
var showTitleText = require('../../../vendors/APP/showTitleText/showTitleText');
// 弹出层
var draw = require('../../../vendors/drawer/js/drawer_m_v1.0.0');
// 倒计时
var countDown = require('../../../vendors/countDown/js/countDown');
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
			// 预约初始化信息
			appointmentInit : {
				reqUrl	: '2/lancare_customhouse_interface_Tianjin/api:examination_registration_for_no_charge_booking_service_children_and_list_the_frist_one',
				reqDevUrl	: '2/lancare_customhouse_interface_Tianjin/api:examination_registration_for_no_charge_booking_service_children_and_list_the_frist_one',
				reqJson : "../../data/drugInfo/addpreotc.json",
				flag		: false,
			},
			// 请求预约时间接口
			appointmentTime : {
				reqUrl	: '2/lancare_customhouse_interface_Tianjin/api:no_charge_booking_service_time_table_by_item',
				reqDevUrl	: '2/lancare_customhouse_interface_Tianjin/api:no_charge_booking_service_time_table_by_item',
				reqJson : "../../src/data/customs.json",
				flag		: false
			},
			// 立即预约接口
			appointment : {
				reqUrl	: '2/lancare_customhouse_interface_Tianjin/api:add_examination_registration_for_no_charge_booking_service',
				reqDevUrl	: '2/lancare_customhouse_interface_Tianjin/api:add_examination_registration_for_no_charge_booking_service',
				reqJson : "../../src/data/customs.json",
				flag		: false
			},
		};

	/**
	 * 本地数据
	 */
	var global = {
		isAppointmentLock : false,
	};

	// 载入商品详情页面
	var loadAppointment = function (apendEl, hashName) {
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
	loadAppointment.prototype = {
		init : function (apendEl, hashName) {
			var _this = this;
			// 获取模板TPL对象
			var tpl = _tpl('appointmentInfo');
			console.log('tpl', tpl);

			// 储存预约信息
			global.appointmentInfo = {
				user_id : userId,
				// no_charge_booking_service : {},
			};

			// 请求参数
			var _param = {
				user_id : userId,
				identifier : global.urlParam.identifier,
			};

			// 请求预约信息
			this.reqInterfaceApi(data.appointmentInit, _param,function (d) {
				console.log(d);
				// 判断有没有登记信息
				if (!d.is_exist_application_info) {
					console.log(d.not_exist_application_info_notice);
					alert(d.not_exist_application_info_notice);
					// 跳转到登记页面
					linkTo("#/registerInfo");
					return;
				}
				// 储存体检项目数据
				global.appointmentService = d.no_charge_booking_service;
				global.appointmentUser = d.application_info_list;
				// 更新预约信息
				global.appointmentInfo.application = {
					identifier	: d.application_info_view.application_form_context_identifier,
					userName 		: d.application_info_view.fullname,
				};
				global.appointmentInfo.addition_application = {
					surveyCOVID19identifier	: global.urlParam && global.urlParam.identifier,
					userName 		: d.application_info_view.fullname,
				};
				console.log(global);

				// 模板数据替换
				var html_obj = _this.getHtml(tpl, d, hashName);
				console.log(html_obj);
				// 判断是APP，head_html设为空
				if (android_app || ios_app) {
					html_obj.head_html = '';
				}

				// 修改app标题
				showTitleText(hashName);

				// 插入HTML字符串
				utils.insertHtmlStr(html_obj, apendEl);

				// 绑定点击事件
				_this.bindEvent(apendEl, d, hashName);
			});
		},
		// 绑定事件
		bindEvent : function (apendEl, d, hashName) {
			var _this = this;
			// 获取数据
			// 获取绑定元素
			var $apt_user = document.getElementById("apt_user"),										// 预约人
				$apt_service = document.getElementById("apt_service"),								// 预约项目
				$apt_time = $("#apt_time").find(".input_control"),											// 预约时间
				$appointment = document.getElementById("appointment");								// 立即预约
			console.log($apt_user);
			console.log($apt_time);

			// 绑定预约人事件
			$apt_user.onclick = function () {
				// 预约人事件
				_this.appointmentUserEvent(d.application_info_list, this);
			};

			// 绑定预约项目事件
			$apt_service.onclick = function () {
				// 预约项目事件
				_this.appointmentServiceEvent(d.no_charge_booking_service, this);
			};

			// 绑定预约时间事件
			// $apt_time.click(function () {
			// 	// 请求预约时间数据
			// 	alert("请先选择预约项目~");
			// });
			$("#apt_time").on("click", "#apt_time_input", function () {
				alert("请先选择预约项目~");
			});

			// 绑定立即预约事件
			$appointment.onclick = function () {
				console.log(global.appointmentInfo);
				// 立即预约事件
				_this.appointmentEvent(this);
			};

			if (!d.is_exist_registration_rights_array) return;
			// 倒计时绑定
			countDown('.count_down', {
				unit : 'mm',
				leftTime: d.is_exist_registration_rights_array.time_remaining,
				tip	: d.is_exist_registration_register_notice,
				endCallback: function () {
					// 重新初始化页面
					_this.init(apendEl, hashName);
				}
				// endTime : '2020-12-06 17:57:00',
				// count: 2,
			});

			// $apt_service.click();
		},
		// 预约人事件
		appointmentUserEvent : function (userData, userEl) {
			console.log("预约人事件~");
			console.log(userEl);
			// 获取预约人模板文件
			var tpl = getTpl(selectUser);
			console.log(tpl);
			// 触发弹出层事件
			draw({
				title : '请选择预约人',
				sureTxt : '新增',
				data : userData,
				onShow : function (el, obj) {
					// 获取绑定事件元素
					$userDom = $(el).find("li");
					$addDom = $("#add_user");
					// 选择用户点击事件
					$userDom.click(function () {
						// 获取预约人信息
						var _userName = $(this).attr("attr_fullname");
						var _identifier = $(this).attr("attr_identifier");
						// 更新预约人信息
						global.appointmentInfo.application = {
							identifier	: _identifier,
							userName 		: _userName,
						};
						// 赋值预约人
						console.log(_userName, _identifier);
						userEl.getElementsByClassName("gp_dw_con")[0].innerHTML = _userName;
						$("#apt_user_dummy").val(_userName);
						// 销毁插件
						obj.destroyDraw(el);
					});
					// 新增点击登记点击事件
					$addDom.click(function () {
						console.log("新增登记~");
						// 跳转Hash携带参数
						var linkQuery = 'tab=add&surveyCOVID19identifier=' + global.urlParam.identifier;
						// 配置跳转地址
						linkTo("#/registerInfo", linkQuery);
					});
				},
				onCancel : function () {
					console.log("取消操作~");
				}
			}, tpl.template);
		},
		// 预约项目事件
		appointmentServiceEvent : function (serviceData, serviceEl) {
			console.log("预约项目事件~");
			console.log(serviceEl);
			var _this = this;
			// 获取预约项目模板文件
			var tpl = getTpl(selectService);
			console.log(tpl);
			// 触发弹出层事件
			draw({
				title : '请选择预约项目',
				data : serviceData,
				onShow : function (el, obj) {
					$serviceDom = $(el).find("li");
					$serviceDom.click(function () {
						// 获取预约项目信息
						var _id = parseInt($(this).attr("attr_id"));
						var _service = $(this).attr("attr_service");
						console.log(_id, _service);
						// 更新预约项目信息
						global.appointmentInfo.no_charge_booking_service = {};
						global.appointmentInfo.no_charge_booking_service[_id] = global.appointmentService[_id];
						console.log(global);

						// 清空上一次预约项目选择的时间
						// 更新预约时间信息
						global.appointmentInfo.register = undefined;
						global.appointmentInfo.time_period = undefined;
						// 销毁时间组件
						$('#time_slot').mobiscroll('destroy').remove();
						// 恢复初始值
						$("#apt_time").html('<input type="text" id="apt_time_input" name="" value="" class="input_control" placeholder="请选择预约时间" autocomplete="off" >');

						// 请求预约时间数据
						_this.appointmentTimeEvent(function () {
							// 赋值预约项目
							serviceEl.getElementsByClassName("gp_dw_con")[0].innerHTML = _service;
							$("#apt_service_dummy").val(_service);
							// 销毁插件
							obj.destroyDraw(el);
						});

					});
				},
				onCancel : function () {
					console.log("取消操作~");
				}
			}, tpl.template);
		},

		// 请求预约时间数据
		appointmentTimeEvent : function (callback) {
			var _this = this;
			console.log("预约时间事件~");
			console.log(global.appointmentInfo);
			// 请求参数
			var _param = {
				data : JSON.stringify(global.appointmentInfo),
			};
			console.log(_param);
			// 请求预约时间数据
			this.reqInterfaceApi(data.appointmentTime, _param,function (d) {
				console.log(d);

				// 判断该项目能否再预约
				if (d.is_exist_relevant_no_charge_booking_service.is_exist) {
					console.log(d.is_exist_relevant_no_charge_booking_service.is_exist_notice);
					alert(d.is_exist_relevant_no_charge_booking_service.is_exist_notice);
					return;
				}
				// 判断排班是否存在
				if (d.time_table && d.time_table.length < 1) {
					console.log(d.time_table_notice);
					alert(d.time_table_notice);
					return;
				}
				// 储存预约时间数据
				global.appointmentTime = d.time_table;
				// 储存预约时间已满提示语
				global.appointmentTip = d.time_table_full_notice;
				console.log(global);

				// 预约时间事件
				_this.appointmentTimeHand(d.time_table);
				// 预约时间回调方法
				callback && callback();
			});
		},
		// 预约时间事件
		appointmentTimeHand : function (timeData) {
			console.log("预约时间事件~");
			console.log(timeData);

			// 获取预约项目模板文件
			var tpl = getTpl(selectTime);
			console.log(tpl);

			// 获取模板字符串对象
			var _html = miniTpl(tpl.template, timeData);
			console.log(_html);

			// 插入HTML字符串
			utils.insertHtmlStr(_html, document.getElementById("apt_time"));

			// 绑定下拉选择事件
			this.bindSelectHand();

		},
		// 绑定下拉选择事件
		bindSelectHand : function () {
			var _this = this;
			// 绑定预约时间事件
			$('#time_slot').mobiscroll().treelist({
				theme: "ios",
				lang: "zh",
				display: 'bottom',
				animate: 'fade',
				inputClass: 'input_control',
				mode: "Center",
				width: [180, 210],
				height: 44,
				// headerText:"选择学历",
				placeholder: '请选择预约时间',
				circular : [false, false],
				// labels: ['Region', 'Supervisor', 'Tech'],
				labels: ['日期', '时间段'],
				onInit : function () {
				},
				onItemTap: function (event, inst) {
					console.log(event);
					console.log(inst);
				},
				onBeforeClose: function (event, inst) {
					console.log(event);
					console.log(inst);

					// 判断是确认操作，阻止组件关闭
					if (event.button == "set") {
						// 预约时间选中处理
						return _this.timeFormatHand(inst._tempWheelArray);
					}

				},
				onSet: function (event, inst) {
					// console.log(event);
					// console.log(inst);
					// 更新预约时间值
					$("#time_slot_dummy").val(global.timeText);

				}
			});
		},
		// 预约时间选中处理事件
		timeFormatHand : function (wheelArray) {
			console.log(wheelArray);
			var i = 0, len = wheelArray.length, idArr = [], timeText = "";
			for (; i<len; i++) {
				var curArr = wheelArray[i].split(",");
				// 预约时间id
				idArr[i] = curArr[1];
				// 预约时间
				timeText += (curArr[0]+" ");
				// 判断不是预约时间段，跳出运行
				if (i < 1) continue;
				// 获取已选时间段预约剩余数量
				left_amount = parseInt(curArr[2]);
			}
			console.log(idArr);
			console.log(timeText);
			console.log(left_amount);
			// 判断该预约时间段是否已约满
			if (left_amount < 1) {
				alert(global.appointmentTip);
				return false;
			}
			$("#time_slot_dummy").val(timeText);

			// 储存预约时间文本
			global.timeText = timeText;
			// 更新预约时间信息
			global.appointmentInfo.register = global.appointmentTime[idArr[0]];
			global.appointmentInfo.time_period = global.appointmentTime[idArr[0]].time_period[idArr[1]];
			console.log(global.appointmentInfo);
		},

		// 请求立即预约接口
		appointmentEvent : function (el) {
			var _this = this;
			console.log("立即预约事件~");
			console.log(el);

			// 验证预约信息是否完善
			if (this.checkAppointmentInfo()) {
				console.log("请完善预约信息~");
				return;
			}

			// 请求参数
			var _param = {
				data : JSON.stringify(global.appointmentInfo),
			};
			console.log(_param);
			// 判断预约开启，阻止重复提交
			if (global.isAppointmentLock) {
				return;
			}
			// 预约开启
			global.isAppointmentLock = true;

			// 请求完成操作
			ajax.config.complete = function () {
				global.isAppointmentLock = false;
				console.log(1, global.isAppointmentLock);
			};

			// 请求预约时间数据
			this.reqInterfaceApi(data.appointment, _param,function (d) {
				console.log(d);
				// 弹出反馈
				alert(d.feedback_info);
				// 跳转Hash携带参数
				var linkQuery = 'identifier=' + d.registration_record.identifier;
				// 跳转到预约页面
				linkTo('#/appointmentDetails', linkQuery);
			});
		},

		// 验证预约信息是否完善
		checkAppointmentInfo : function () {
			// 获取预约信息元素
			var $inputArr = $('.input_control');
			console.log($inputArr);
			// 遍历数组获取相应的值
			var i = 0, len = $inputArr.length;
			for (; i<len; i++) {
				var _v 		= $inputArr[i].value;
				var _tip	= $inputArr[i].getAttribute("placeholder");
				console.log(_v);
				if (!_v) {
					_tip && alert(_tip);
					return true;
				}
			}
			return false;
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
			var headData = {
				// is_logged: 1 || (d.login_info && d.login_info.is_logged),
				is_logged: 1,
				url: '',
				title: hashName,
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
		getHtmlObj : function (tpl, d, hashName) {
			// 判断模板配置是否正确
			if (tpl && tpl.container && tpl.header && tpl.footer) {
				// 模板数据替换
				var html_obj = this.getHtml(tpl, d, hashName);
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
	var init = function (obj, hashName) {
		console.log(obj);
		console.log(hashName);
		// 储存路由参数
		global.urlParam = obj.query;
		// console.log("预约！");
		// console.log(d);
		// console.log(apendEl);
		// 获取版本号
		// getAppVersion();
		// 载入功能模块
		return new loadAppointment(document.getElementById('customs_simp'), hashName);
	};

	return init;

});