(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.inputAutoVerify = factory();
	}
})(this, function() {

	/**
	 * 工具函数
	 * */
	var utils = {
		// 对象合并
		extend : function (o, n, override) {
			for(var key in n){
				if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
					o[key]=n[key];
				}
			}
			return o;
		},
		// 判断是元素节点（即是标签，返回的是标签元素）
		isElementNode: function (node) {
			return node.nodeType == 1;
		},
		// 字符串转数组 (复杂字符串转换)
		strToObj : function (str) {
			// 字符串不存在
			if (!str) {
				console.log('字符串不存在~');
				return false;
			}
			var arr = [], obj = {};
			// 判断输入规则是否存在，存在转成数组
			if (str) {
				arr = str.split(";")
			}
			// 遍历数组
			var i = 0, len = arr.length;
			for (; i < len; i++) {
				var newArr = arr[i].split(":");
				// console.log(arr[i]);
				// console.log(newArr);
				if (newArr.length > 1) {
					obj[newArr[0]] = newArr[1];
				} else {
					obj['type'] = newArr[0];
				}
			}
			return obj;
		}
	};

	/**
	 * replace 验证集合
	 * */
	var replaceUtils = {
		// 手机号
		tel : function (el) {
			// 非法输入正则
			var pattern = new RegExp(/^([^1])|[^\d]+/g);
			// /^[1][3,4,5,6,7,8,9][0-9]{9}$/
			// /^([^1])|[^\d]+/g
			// 获取输入框值
			var inputTxt = el.value;
			// 替换输入框获取的字符
			var str = inputTxt.replace(pattern, '');
			// 替换输入框值
			el.value = str;
		},
		// 证件号码
		cardNumber : function (el) {
			// 非法输入正则
			var pattern = new RegExp(/[^0-9a-zA-Z.]+/g);
			// 获取输入框值
			var inputTxt = el.value;
			// 替换输入框获取的字符
			var str = inputTxt.replace(pattern, '');
			// 替换输入框值
			el.value = str;
		},
		// 特殊字符(默认)
		specialCharacters : function (el) {
			// 非法输入正则
			var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|｛｝【】‘；：”“'。，、？]");
			// 获取输入框值
			var inputTxt = el.value;
			// 替换输入框获取的字符
			var str = inputTxt.replace(pattern, '');
			// 替换输入框值
			el.value = str;
		},
		// 特殊字符(最大范围即所有特殊字符)
		specialCharacters_lg : function (el) {
			// 非法输入正则
			var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|｛｝【】‘；：”“'。，、？]");
			// 获取输入框值
			var inputTxt = el.value;
			// 替换输入框获取的字符
			var str = inputTxt.replace(pattern, '');
			// 替换输入框值
			el.value = str;
		},
		// 特殊字符(适当缩小范围)
		specialCharacters_sm : function (el) {
			// 非法输入正则
			var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|｛｝【】‘；：”“'。，、？]");
			// 获取输入框值
			var inputTxt = el.value;
			// 替换输入框获取的字符
			var str = inputTxt.replace(pattern, '');
			// 替换输入框值
			el.value = str;
		},
		// 特殊字符(最小范围)
		specialCharacters_xs : function (el) {
			// 非法输入正则
			var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|｛｝【】‘；：”“'。，、？]");
			// 获取输入框值
			var inputTxt = el.value;
			// 替换输入框获取的字符
			var str = inputTxt.replace(pattern, '');
			// 替换输入框值
			el.value = str;
		},
	};

	/**
	 * test 验证集合
	 * */
	var testUtils = {
		// 手机号
		tel : function (v) {
			var reg = new RegExp(/^[1][3,4,5,6,7,8,9][0-9]{9}$/);
			console.log(reg.test(v));
			// 判断是否合法
			if (!reg.test(v)) {
				return true;
			} else {
				return false;
			}
		},
		// 邮箱
		email : function (v) {
			//正则表达式
			// var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); // 字符串写法
			var reg = new RegExp(/^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/);
			console.log(reg.test(v));
			// 判断是否合法
			if (!reg.test(v)) {
				return true;
			} else {
				return false;
			}
		},

	};

	/**
	 * 定义构造函数
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var inputAutoVerify = function (el, options) {
		// 默认参数
		var def = {
			isBindBlur : false,
			callBack 	 : null,
		};
		// 判断参数是否存在
		if (!el) return;
		// 验证根节点 （判断是元素还是字符串)
		this.$el = utils.isElementNode(el) ? el : document.querySelector(el);
		// console.log(this.$el);
		// 合并参数
		this.$options = utils.extend(def, options, true);
		// console.log(this.$options);
		// return new inputAutoVerify.fn.init(el);
		this.init(this.$el);
		return this;
	};

	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	inputAutoVerify.fn = inputAutoVerify.prototype = {
		constructor : inputAutoVerify,
		// 初始化绑定输入事件
		init : function (el) {
			// console.log("初始化方法~");

			// 验证根节点
			// this.$el = el;
			// 获取验证元素
			// this.$inputEl 		= el.querySelectorAll("input");
			// this.$textareaEl  = el.querySelectorAll("textarea");

			// 获取元素数组
			// this.$inputArr = {};

			// 绑定输入事件 (input类型非隐藏域)
			this.bindInputEvent(el.querySelectorAll("input[type='text']"), el.querySelectorAll("textarea"));

			// 判断是否绑定失去焦点事件
			if (this.$options.isBindBlur) {
				// 绑定失去焦点事件 (input类型非隐藏域)
				this.setBlurEleHand(el.querySelectorAll("input[type='text']"), el.querySelectorAll("textarea"));
			}

			return this;
		},
		// 表单提交验证方法
		formSubmit : function (el, callback) {
			// console.log('表单提交验证~');

			// 判断参数是否存在
			if (el) {
				// 验证根节点 （判断是元素还是字符串)
				el = utils.isElementNode(el) ? el : document.querySelector(el);
			} else {
				// 参数不存在，设置默认值
				// console.log('参数不存在~');
				el = this.$el;
			}
			// 表单提交回调方法
			this.callback = callback ? callback : null;
			// 获取需要验证元素
			var inputArr = el.querySelectorAll("input[type='text']");
			var textareaArr = el.querySelectorAll("textarea");
			// console.log(inputArr, textareaArr);
			// console.log(this);
			// 遍历验证元素是否合法
			// var flag = this.eachCheckElement(inputArr, textareaArr);
			return this.eachCheckElement(inputArr, textareaArr);

		},
		// 遍历验证元素
		eachCheckElement : function (inputArr, textareaArr) {
			// 遍历输入框元素
			if (this.eachInputElement(inputArr)) {
				return true;
			}
			// 遍历多行文本元素
			if (this.eachInputElement(textareaArr)) {
				return true;
			}
			return false;
		},
		// 遍历输入框元素
		eachInputElement : function (elArr) {
			// 遍历初始化定义
			var i = 0, len = elArr.length, flag = false;
			for (; i < len; i++) {
				// 获取验证元素属性
				// this.getElementAttribute(elArr[i]);
				if (this.checkLegal(this.getElementAttribute(elArr[i])), this.$options.callBack) {
					flag = true;
				}
			}
			return flag;
		},
		// 获取验证元素属性
		getElementAttribute : function (el) {
			var obj = {};
			// 元素名称
			obj.name = el.getAttribute("data-name");
			// 元素值
			obj.value = el.value;
			// 是否必填
			obj.required = (el.getAttribute("required") == "") ? true : false;
			// 元素验证规则
			obj.rule = utils.strToObj(el.getAttribute("data-rule"));
			// console.log(obj);
			return obj;
		},
		// 验证元素是否合法
		checkLegal : function (obj, callback) {
			console.log(obj);
			var flag = false;

			// 验证是否必填
			var isRequired = this.checkRequired(obj);
			if (isRequired) {
				flag = true;
				callback && callback({
					type : 'required',
					tip	: isRequired,
				}, this);
				return flag;
			}
			// return false;
			// 判断是否有正则验证
			if (!obj.rule) return false;
			// 验证长度
			var isLength = this.checkLength(obj);
			if (isLength) {
				flag = true;
				callback && callback({
					type : 'length',
					tip	: isLength,
				}, this);
				return flag;
			}
			// return false;
			// 验证类型
			var isType = this.checkType(obj);
			if (isType) {
				flag = true;
				callback && callback({
					type : 'type',
					tip	: isType,
				}, this);
				return flag;
			}
			// console.log(flag);
			return flag;
		},
		// 验证必填
		checkRequired : function (obj) {
			// 判断是否必填
			if (!obj.required) {
				var str = obj.name + '不是必填~';
				console.log(str);
				return false;
			}
			// 获取元素值
			// var v = el.value;
			// console.log(v);
			if (obj.value.length > 0) {
				var str = obj.name + '不为空~';
				console.log(str);
				return false;
			} else {
				var str = obj.name + '不能为空~';
				console.log(str);
				return str;
			}
		},
		// 验证长度
		checkLength : function (obj) {
			// 判断是否验证长度
			if (!obj.rule.length) {
				var str = obj.name + '不验证长度~';
				console.log(str);
				return false;
			}
			// 判断值为空不验证
			if (obj.value.length < 1) {
				var str = obj.name + '值为空不验证~';
				console.log(str);
				return false;
			}
			// 获取最大值和最小值
			var lenArr = obj.rule.length.split('-');
			var min		= parseInt(lenArr[0]);
			var max		= parseInt(lenArr[1]);
			console.log(lenArr, min, max);

			if (obj.value.length < min) {
				var str = obj.name + '最小长度不能小于' + min;
				console.log(str);
				return str;
			} else if (obj.value.length > max) {
				var str = obj.name + '最小长度不能大于' + max;
				console.log(str);
				return str;
			} else {
				var str = obj.name + '长度合法~';
				console.log(str);
				return false;
			}
		},
		// 验证类型
		checkType : function (obj) {
			var flag = false;
			// 判断是否验证类型
			if (!obj.rule.type) {
				var str = obj.name + '不验证类型~';
				console.log(str);
				return false;
			}
			// 判断值为空不验证
			if (obj.value.length < 1) {
				var str = obj.name + '值为空不验证~';
				console.log(str);
				return false;
			}
			// 遍历当前输入类型
			switch (obj.rule.type) {
				case 'tel':
					flag = testUtils.tel(obj.value);
					break;
				case 'email':
					flag = testUtils.email(obj.value);
					break;
				default:
					break;
			}
			if (!flag) {
				var str = obj.name + '类型合法~';
				console.log(str);
				return flag;
			} else {
				var str = '请输入正确的' + obj.name;
				console.log(str);
				return str;
			}
			// console.log(str);
			// return flag;
		},

		// -------------------------------------------------------------------------------
		// 绑定失去焦点元素方法
		setBlurEleHand : function (inputElArr, textareaElArr) {
			// console.log("绑定元素失去焦点事件");
			// 遍历失去焦点元素
			this.eachBlurElementHand(inputElArr);
			// 绑定文本框失去焦点事件
			// this.textareaHand(textareaElArr);
		},
		// 遍历失去焦点元素方法
		eachBlurElementHand : function (ElArr) {
			// 判断输入框数组是否存在
			if (ElArr.length < 1) {
				console.log("没有失去焦点元素元素~");
				return;
			}
			// 遍历输入框元素
			var i = 0, len = ElArr.length;
			for (; i < len; i++) {
				ElArr[i].index = i;
				this.bindBlurEleEvent(ElArr[i]);
			}
		},
		// 绑定失去焦点元素事件
		bindBlurEleEvent : function (el) {
			// console.log(el);
			var _this = this;
			// 绑定失去焦点事件
			el.onblur = function () {
				console.log(this);
				if (_this.checkLegal(_this.getElementAttribute(this), _this.$options.callBack)) {
					return true;
				}
				return false;
			}
		},
		// -------------------------------------------------------------------------------

		// 绑定输入事件
		bindInputEvent : function (inputElArr, textareaElArr) {
			// console.log(inputElArr);
			// 绑定输入框输入事件
			this.inputHand(inputElArr);
			// 绑定文本框输入事件
			this.textareaHand(textareaElArr);

		},
		// 多行文本框输入事件
		textareaHand : function (textareaElArr) {
			// console.log(textareaElArr);
			// 判断输入框数组是否存在
			if (textareaElArr.length < 1) {
				console.log("没有输入框元素~");
				return;
			}
			// 遍历输入框元素
			var i = 0, len = textareaElArr.length;
			for (; i < len; i++) {
				textareaElArr[i].index = i;
				this.bindInputBoxEvent(textareaElArr[i], this.getTextareaAttribute);
			}

		},
		// 输入框输入事件
		inputHand : function (inputElArr) {
			// console.log($inputEl);
			// 判断输入框数组是否存在
			if (inputElArr.length < 1) {
				console.log("没有输入框元素~");
				return;
			}
			// 遍历输入框元素
			var i = 0, len = inputElArr.length;
			for (; i < len; i++) {
				inputElArr[i].index = i;
				this.bindInputBoxEvent(inputElArr[i], this.getInputBoxAttribute);
			}

		},
		// 绑定输入框输入事件
		bindInputBoxEvent : function (el, callback) {
			var _this = this;
			// console.log(el);
			// 定义输入标记（用于标记是否是非直接的文字输入）
			var flag = false;
			// 注释内容写法不对
			// el.oncompositionstart = function () {
			// 	$('#test').text(this.value+0);
			// 	// 标记中文输入
			// 	flag = true;
			// };
			// 绑定结束中文输入事件
			// el.oncompositionend = function () {
			// 	// 标记不是中文输入
			// 	flag = false;
			// 	// 获取绑定元素参数
			// 	// _this.getElementAttribute(this);
			// 	if(!flag) {
			// 		// 获取绑定元素参数
			// 		// _this.getElementAttribute(this);
			// 		callback && callback.call(_this, this);
			// 		$('#test').text(this.value+1);
			// 	}
			// };

			// 绑定开始中文输入事件
			el.addEventListener('compositionstart', function(e) {
				// 标记中文输入
				flag = true;
				// $('#test').text(this.value+0);
			});
			// 绑定结束中文输入事件
			el.addEventListener('compositionend', function(e) {
				// 标记不是中文输入
				flag = false;
				// 判断输入完成，触发输入事件
				if(!flag) {
					// 获取绑定元素参数
					// _this.getElementAttribute(this);
					callback && callback.call(_this, this);
					// $('#test').text(this.value+1);
				}
			});

			// 绑定输入事件
			el.oninput = function () {
				// 判断是不是中文输入
				if(!flag) {
					// 获取绑定元素参数
					// _this.getElementAttribute(this);
					callback && callback.call(_this, this);
					// $('#test').text(this.value+2);
				}
			};

		},
		// 获取绑定输入框元素参数
		getInputBoxAttribute : function (el) {
			// 获取输入框验证规则
			var obj = {};
			// 输入类型
			obj.rule = el.getAttribute("data-rule");
			// 输入框字段名称
			obj.tip = el.getAttribute("data-name");
			// 输入长度
			obj.len = el.getAttribute("v_len");
			// 输入最大长度
			obj.maxLen = el.getAttribute("maxlength");
			// 输入最小长度
			obj.minLen = el.getAttribute("minlength");
			console.log(obj);
			// 储存元素对应参数
			// this.$inputArr[el.index] = obj;
			// console.log(this.$inputArr);
			// 匹配输入类型
			this.mathInputType(obj, el);

		},
		// 获取绑定多行文本元素参数
		getTextareaAttribute : function (el) {
			// 获取输入框验证规则
			var obj = {};
			// 输入类型
			obj.rule = el.getAttribute("data-rule");
			// 输入框字段名称
			obj.tip = el.getAttribute("data-name");
			// 输入长度
			obj.len = el.getAttribute("v_len");
			// 输入最大长度
			obj.maxLen = el.getAttribute("maxlength");
			// 输入最小长度
			obj.minLen = el.getAttribute("minlength");
			console.log(obj);
			// 储存元素对应参数
			// this.$inputArr[el.index] = obj;
			// console.log(this.$inputArr);
			// 匹配输入类型,并替换不合法输入
			this.mathInputType(obj, el);

		},
		// 匹配对应的规则
		mathInputType : function (obj, el) {
			switch (obj.rule) {
				case "tel":
					console.log("手机号~");
					replaceUtils.tel(el);
					break;
				case "cardNumber":
					console.log("证件号码~");
					replaceUtils.cardNumber(el);
					break;
				default:	// 默认是不能输入非法字符
					console.log("特殊字符~");
					replaceUtils.specialCharacters(el);
					break;
			}
		},
	};

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function (el, options) {
		return new inputAutoVerify(el, options);
	};

	//把构造函数的原型，替换为jQuery工厂的原型
	//这么做的目的是为了实现jQuery的插件机制，让外界可以通过jQuery方便的进行扩展
	// inputAutoVerify.fn.init.prototype = inputAutoVerify.fn;

	// 对外开放方法
	// return new inputAutoVerify(el);
	// return inputAutoVerify;
	return init;
});