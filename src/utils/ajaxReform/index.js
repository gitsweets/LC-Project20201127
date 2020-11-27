var data = {
	// 详情
	details : {
		reqUrl	: 'goods/activityinfo/tab:ajax',
		reqDevUrl	: 'goods/activityinfo/tab:ajax',
		reqJson : "../views/productDetails2011/data/details200.json",
		flag		: false,
	},

	// 详情
	// details : {
	// 	reqUrl	: 'goods/activityinfo/tab:ajax',
	// 	reqDevUrl	: 'goods/activityinfo/tab:ajax',
	// 	reqJson : "../views/productDetails2011/data/details200.json",
	// 	flag		: true,
	// },

	vacc_addbaby: {
		reqUrl	: "drugstore/tab:stock_adjust/adjust:output/act:edit",
		reqDevUrl	: "1/vacc_addbaby",
		reqJson : "../../src/data/adjust_output_edit.json",
		flag		: false
	},
};

// 获取接口请求主域名 （方式一）
var obj = getApiReqDomain('//www.lk.cn/', 'test.lk.cn');
console.log('主域名对象：', obj);

// 获取接口请求主域名 （方式二）
// var obj = getApiReqDomain('//m.lk.cn/');
// console.log(obj);

// 设置拼接域名
// obj.isPrototypeOf()

// console.log(getApiReqDomain().flag);
// console.log(getApiReqDomain().apiUrl);
// obj.isLocal = false;
obj.isSetDomain = true;

console.log('isLocal：', obj.isLocal);
console.log('apiUrl：', obj.apiUrl);
console.log('isSetDomain：', obj.isSetDomain);

// 使用默认配置
// var reqUrl = getApiReqUrl(data.details);
// 使用默认配置
var reqUrl = getApiReqUrl(data.details, obj);
console.log('请求地址是：', reqUrl);

// 检验数据类型
console.log('数据类型是：', checkType.isBoolean(false));
var isLock = false;
$.ajaxSetup({
	url:"demo_ajax_load.txt",
	beforeSend: function(XMLHttpRequest){
		console.log("beforeSend");

	},
	complete : function(XMLHttpRequest, textStatus) {
		console.log('完成~');
		isLock = false;
	}
});

/*
// 监听ajax触发开始
$(document).ajaxStart(function(){
	console.log("ajaxStart...");
	// 触发加载中效果
	// myloading = new Loading($('body'),{});
});
// 监听ajax全部执行完成
$(document).ajaxStop(function(){
	console.log("ajaxStop...");
	// 关闭加载中效果
	// myloading.loadingremove();
});
*/

// 请求参数
var _param = {
	detail_id : '53',
};

// 请求URL
ajax.config.url = reqUrl;
// 请求参数
ajax.config.data = _param;

// ajax.config.complete = function () {
// 	console.log(1);
// };

console.log(ajax);

ajax.config.error = function (XMLHttpRequest,textStatus,errorThrown) {
	console.log("Cookie："+ XMLHttpRequest.getResponseHeader("Set-Cookie"));
};

/*
$('.aaa').click(function () {
	console.log(1);
	if (isLock) {
		return;
	}
	console.log(2);
	isLock = true;
	setTimeout(function () {
		ajax.reqDataApi(ajax.config, function (res) {
			console.log(res);
		});
	}, 1000);


});
*/

ajax.reqDataApi(ajax.config, function (res) {
	console.log(res);
});

// $.ajax( );


/*
//设置AJAX的全局默认选项
$.ajaxSetup( {
	url: "/index.html" , // 默认URL
	aysnc: false , // 默认同步加载
	type: "POST" , // 默认使用POST方式
	headers: { // 默认添加请求头
		"Author": "CodePlayer" ,
		"Powered-By": "CodePlayer"
	} ,
	error: function(jqXHR, textStatus, errorMsg){ // 出错时默认的处理函数
		// jqXHR 是经过jQuery封装的XMLHttpRequest对象
		// textStatus 可能为： null、"timeout"、"error"、"abort"或"parsererror"
		// errorMsg 可能为： "Not Found"、"Internal Server Error"等

		// 提示形如：发送AJAX请求到"/index.html"时出错[404]：Not Found
		alert( '发送AJAX请求到"' + this.url + '"时出错[' + jqXHR.status + ']：' + errorMsg );
	}
} );


// 未设置任何参数，但url、async、type、headers、error等参数的默认值均已被$.ajaxSetup()更改(如上)
$.ajax( );
*/





