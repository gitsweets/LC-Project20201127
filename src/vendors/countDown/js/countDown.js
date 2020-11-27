(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.countDown = factory();
	}
})(this, function() {

	/**
	 * 工具函数
	 * */
	var utils = {
		// 对象合并
		extend: function (o, n, override) {
			for(var key in n){
				if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
					o[key]=n[key];
				}
			}
			return o;
		},
		// 判断数据类型
		isObjFunc : function(type) {
			var _toString = Object.prototype.toString;
			return function() {
				return _toString.call(arguments[0]) === '[object ' + type + ']'
			}
		},
		// 判断是对象
		isObject : function() {
			return isObjFunc("Object")(arguments[0]);
		},
		// 判断是对象
		isNumber : function() {
			return this.isObjFunc("Number")(arguments[0]);
		},
		// 判断是元素节点（即是标签，返回的是标签元素）
		isElementNode: function (node) {
			return node.nodeType == 1;
		},
	};

	/**
	 * 定义构造函数
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var _countDown = function (el, options) {
		// console.log(options);
		// 默认参数
		var def = {
			unit				: 'ss', // 时间单位，默认是秒
			// 提示
			tip 				: '活动倒计时',
			tip_start		: '',
			tip_end			: '',
			tip_type		: 1,
			// 时间差
			leftTime		: 0,
			startTime		: '',
			endTime			: '',
			// 倒计时时间间隔
			count				: 1, // 默认是1秒一次
			// 判断是否补0， 默认值是true 补0
			isZero 			: true,
			// 判断是否有单位
			isUnit			: true,
			// 回调方法
			callback		: null,
			endCallback	: null,

		};
		// 判断dom是否存在
		if (this.getDomEl(el)) return;

		// 合并参数
		this.$options = utils.extend(def, options, true);
		console.log(this.$options);

		// 实例初始化
		this.init();
		return this;
	};

	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	_countDown.fn = _countDown.prototype = {
		constructor : _countDown,
		// 初始化绑定输入事件
		init : function () {
			// console.log("初始化方法~");
			// 判断倒计时剩余时间是否存在
			if (this.getTimeCount(this.$options)) return;
			console.log(this.leftTime);

			// 转化成时分秒格式
			// this.time = this.convertFormat(this.leftTime, this.$options);

			// 获取时间
			this.time = this.mathUnit(this.leftTime, this.$options);

			// 判断是否有回调方法
			if (this.$options.callback) {
				this.$options.callback(this.$el, this.time, this.$options);
			} else {
				// 获取展示内容
				this.tip = this.mathTip(this.$options, this.time);
				// 把时间显示在页面
				this.showTimeToPage(this.$el, this.tip);
			}

			// 绑定事件
			this.bindEvent(this.$options);
			return this;
		},
		// ------------------
		// 绑定事件
		bindEvent : function (obj) {
			var _this = this;
			// 绑定定时器操作
			setTimeout(function () {
				_this.init();
			}, obj.count * 1000);
		},
		// 展示时间
		showTimeToPage : function (el, tip) {

			el.innerText = tip;

		},
		// 匹配展示内容
		mathTip : function (obj, time) {
			var str = '';
			// 判断展示类型匹配展示内容
			switch (obj.tip_type) {
				case 1:
					str = obj.tip + time;
					break;
				case 2:
					str = obj.tip_start + time + obj.tip_end;
					break;
			}
			return str;
		},
		// 匹配时间单位
		mathUnit : function (leftTime, obj) {
			var str = '';
			// 匹配时间单位
			switch (obj.unit) {
				case "mm":
					// 转化成时分秒格式
					var t = this.convertFormat(leftTime, obj);
					str = t.mm + t.ss;
					break;
				case "hh":
					// 转化成时分秒格式
					var t = this.convertFormat(leftTime, obj);
					str = t.hh + t.mm + t.ss;
					break;
				case "dd":
					// 转化成时分秒格式
					var t = this.convertFormat(leftTime, obj);
					str = t.dd + t.hh + t.mm + t.ss;
					break;
				default:
					// 直接读秒
					str = this.setSecond(leftTime, obj);
					break;
			}
			return str;
		},
		// 设置秒格式
		setSecond : function (leftTime, obj) {
			var t = leftTime;
			t = obj.isZero ? this.addZero(t) : t; // 补0
			t = obj.isUnit ? t += "秒" : t; // 补0
			return t;
		},
		// 秒转换成天时分秒
		convertFormat : function (leftTime, obj) {
			// 获取天、小时、分钟、秒 (计算方法计算要取的值取余)
			var dd = parseInt(leftTime/(24*60*60));
			var hh = parseInt(leftTime/(60 * 60) % 24);
			var mm = parseInt(leftTime/60 % 60);
			var ss = parseInt(leftTime % 60);
			// console.log(dd + '-' + hh + '-' + mm + '-' + ss);
			// 判断是否补0
			if (obj.isZero) {
				dd = this.addZero(dd);
				hh = this.addZero(hh);
				mm = this.addZero(mm);
				ss = this.addZero(ss);
			}
			// console.log(dd + '-' + hh + '-' + mm + '-' + ss);
			// 判断是否有单位
			if (obj.isUnit) {
				dd += "天";
				hh += "时";
				mm += "分";
				ss += "秒";
			}
			// console.log(dd + '-' + hh + '-' + mm + '-' + ss);
			return {
				dd, hh, mm, ss
			}
		},
		// 第一位补0
		addZero : function (i) {
			return i < 10 ? "0" + i: i + "";
		},
		// 添加单位
		addUnit : function (t, unit) {
			return t + unit;
		},
		// 获取倒计时
		getTimeCount : function (obj) {
			// 判断倒计时是否存在
			if (obj.leftTime > 0) {
				obj.leftTime = obj.leftTime > obj.count ? (obj.leftTime - obj.count) : 0;
				// 开启倒计时标记
				this.countDownFlag = true;
				// 大于0时，剩余时间存在。返回剩余时间
				this.leftTime = obj.leftTime;
				return false;
			} else if (obj.endTime) {
				// 剩余时间不存在，结束时间存在。可以计算剩余时间
				this.leftTime = this.computeLeftTime(obj.endTime, obj.startTime);
				// 开启倒计时标记
				this.countDownFlag = true;
				return false;
			} else {
				// 判断倒计时结束操作
				if (obj.endCallback) {
					obj.endCallback(this);
				} else {
					console.log("倒计时不存在~");
				}
				return true;
			}
		},
		// 计算剩余时间
		computeLeftTime : function (endTime, startTime) {
			// console.log(endTime, startTime);
			var now_time = new Date().getTime();	// 当前时间时间戳
			var end_time = new Date(endTime).getTime();	// 结束时间时间戳
			var left_time = parseInt((end_time - now_time) / 1000);
			return left_time;
		},

		// 获取dom元素
		getDomEl : function (el) {
			// 判断参数是否存在
			if (!el) {
				console.log("请配置时间展示位置~");
				return true;
			}
			// 验证根节点 （判断是元素还是字符串)
			var dom = utils.isElementNode(el) ? el : document.querySelector(el);
			console.log(dom);
			// 判断触发元素是否存在，不存在不能触发插件
			if (dom) {
				// 存储dom元素
				this.$el = dom;
				return false;
			} else {
				console.log("展示位置DOM不存在~");
				return true;
			}
		},

	};

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function (el, options) {
		// 判断参数是对象还是倒计时
		if (utils.isNumber(options)) {
			var obj = {};
			obj.leftTime = options;
			options = obj;
		}
		return new _countDown(el, options);
	};

	// 对外开放方法
	return init;
});