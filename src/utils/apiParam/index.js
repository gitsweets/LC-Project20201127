var data = {
	// 详情
	details : {
		reqUrl	: 'goods/activityinfo/tab:ajax',
		reqDevUrl	: 'goods/activityinfo/tab:ajax',
		reqJson : "../views/productDetails2011/data/details200.json",
		flag		: false,
	},
};

// 获取接口请求主域名 （方式一）
var obj = getApiReqDomain();
console.log('主域名对象：', obj);

// 获取接口请求主域名 （方式二）
// var obj = getApiReqDomain('//m.lk.cn/');
// console.log(obj);

// 设置拼接域名
// obj.isPrototypeOf()

// console.log(getApiReqDomain().flag);
// console.log(getApiReqDomain().apiUrl);
obj.isLocal = false;
obj.isSetDomain = true;

console.log('isLocal：', obj.isLocal);
console.log('apiUrl：', obj.apiUrl);
console.log('isSetDomain：', obj.isSetDomain);

// 使用默认配置
var reqUrl = getApiReqUrl(data.details);
// 使用默认配置
// var reqUrl = getApiReqUrl(data.details, obj);
console.log('请求地址是：', reqUrl);

// 检验数据类型
console.log('数据类型是：', checkType.isBoolean(false));






