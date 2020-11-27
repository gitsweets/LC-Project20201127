// 组件引用
var ajax = require('../../../vendors/ajax/js/ajax_jq');
var miniTpl = require('../../../vendors/mini-tpl/mini-tpl');
var _tpl = require('./tpl');

// 图片引用
var faqImg = require('../../../asset/images/customs/notice.png');

// banner切换
var swipeBanner = require('../../../vendors/banner/js/swipe_banner');

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
		root.customs_home = factory();
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
	var loadCustomsHome = function (d, apendEl) {
		// debugger
		// 判断要插入html位置是否存在
		if (!apendEl) {
			console.log("请配置模块运行id~");
			return;
		}

		// 生成hash
		this.hash = utils.createHash(8);

		// 设置FAQ图片
		d.more.img = faqImg;
		// d.more.boolean_more = true;

		// 设置页面标题
		d.page_title = pageTitle;

		// 设置HASH
		d.hash = this.hash;

		// 获取模板TPL对象
		var tpl = _tpl('home');
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

		// 判断是否有特权
		this.isPrivilege(d);


	};
	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	loadCustomsHome.prototype = {
		// 绑定事件
		bindEvent : function (apendEl, d) {
			var _this = this;
			// 获取绑定元素
			var $nav = apendEl.getElementsByClassName('nav_list')[0].getElementsByTagName('li');
			console.log($nav);
			var bannerNum = document.getElementById('position'),
				bullets	= bannerNum && bannerNum.getElementsByTagName('li'),
				bannerSwipe = document.getElementById('mySwipe');
			console.log(bullets);

			// 绑定banner切换事件
			swipeBanner(bannerSwipe, {
				auto: 10000,
				continuous: true,
				disableScroll:false,
				callback: function(pos) {
					console.log(1);
					var i = bullets.length;
					while (i--) {
						bullets[i].className = ' ';
					}
					bullets[pos].className = 'cur';
				}
			});


			// 定义绑定导航事件参数
			var i = 0, len = $nav.length;
			for (; i<len; i++) {
				var elItem = $nav[i];
				elItem.index = i;
				elItem.onclick = function () {
					// 获取跳转hash
					var linkHash = this.getAttribute("attr_link");
					console.log(linkHash);
					// 判断是不是路由跳转
					if (!linkHash) {
						return;
					}
					// 跳转Hash携带参数
					var linkQuery = 'member_uid=' + userId;
					console.log(linkQuery);
					linkTo(linkHash);
				}
			}

		},

		test : function () {
			alert(1);
		},

		// 判断是否有特权
		isPrivilege : function (d) {
			// 获取缓存中的特权标记
			var isPrivilegeFlag = sessionStorage.getItem("privilege");
			console.log(isPrivilegeFlag);
			// 判断是否有特权
			if (d.is_exist_registration_rights && !isPrivilegeFlag) {
				alert(d.is_exist_registration_rights_notice);
				// 记住特权
				sessionStorage.setItem("privilege", d.is_exist_registration_rights);
			}
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
				is_logged: 1,
				url: '',
				title: d.page_title,
			}, footData = {
				// is_logged: 1 || (d.login_info && d.login_info.is_logged),
				// is_logged: d.login_info && d.login_info.is_logged,
				// url: d.login_info && d.login_info.url,
			};
			return {
				head_html : miniTpl(tpl.header.template, headData),
				container_html : miniTpl(tpl.container.template, d),
			}
		},

	};

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function () {
		console.log(this);
		// debugger
		// console.log(customsHome);
		// console.log(document.getElementById('customs_simp'));
		// console.log(apendEl);
		// 设置页面初始状态
		if (firstFlag) {
			// php赋值时，子页面数据发生变化时。首页需要刷新页面更新数据
			console.log("刷新页面~");
			window.location.reload();
		}
		firstFlag = true;
		// 获取版本号
		// getAppVersion();

		// 载入功能模块
		return new loadCustomsHome(customsHome.Result, document.getElementById('customs_simp'));
	};

	return init;

});