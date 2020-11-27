// import wx from "weixin-js-sdk";
// import $wxConfig from "../../utils/wxConfig";
// import $env from "../../utils/env";
// import $config from '../../utils/config';
// import $polling from '../../utils/polling';
// import $formatUrlQuery from '../../utils/formatUrlQuery';
//
// import '../../asset/images/ad.jpg';
// import '../../asset/images/card.jpg';

// 组件数据
let compData = {
	// url 参数
	// uid-会员 id
	urlQuery: {},
	// 轮播图
	swiperInfo: {
		banners: ['/asset/images/card.jpg', '/asset/images/card.jpg'],
		options: {
			autoplay: 3000,
			initialSlide: 1,
			loop: true,
			pagination: '.swiper-pagination'
			// onSlideChangeEnd: swiper => {
			// console.log('onSlideChangeEnd', swiper.realIndex)
			// }
		}
	},
	// 广告位图片
	navImg: '',
	// 套餐数据
	packageList: [],
	// 未支付数
	readPayCount: 0,
	pollingPayObj: null,
	// 未读报告数
	readReportCount: 0,
	pollingReportObj: null,
	// 轮询标识
	hasInitPolling: false,
	// 监听事件
	hasListenEvent: false
};

// 组件实例
export default {
	data: function () {
		return compData;
	},
	methods: {
		// 初始化
		compInit: function () {
			console.log('/member/entrypage init');
			// url 参数
			this.urlQuery = {
				uid: typeof thirdPartyUserID != 'undefined' ? thirdPartyUserID : ''
			};
			// 加载广告位图片
			this.loadNavImg();
			// 加载热门套餐
			this.loadPackageList();
			// 加载未读数信息
			this.loadNewMsgInfo();
			// if (!this.hasInitPolling) {
			//     // 轮询
			//     this.initPolling();
			// }
			// this.startPolling();

		},

		readyHand: function(data) {
			// 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
			wx.onMenuShareAppMessage({
				title   : data.title, // 分享标题
				desc    : data.desc, // 分享描述
				link    : data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl  : data.imgUrl, // 分享图标
				success : data.success
			}, function(res) {
				console.log("test==========",res)
				//这里是回调函数
			}, function(err){
				console.log('err:', err)
			});
			// 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
			wx.onMenuShareTimeline({
				title   : data.title, // 分享标题
				link    : data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl  : data.imgUrl, // 分享图标
				success : data.success
			});
			wx.hideMenuItems({
				menuList: ["menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:editTag", "menuItem:delete", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:brand"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
			});
		},
		// 加载广告位图片
		loadNavImg: function () {
			const _this = this;
			this.reqNavImgApi(function (res) {
				console.log(res);
				let code = res.res;
				if (code == 1) {
					_this.navImg = res.data;
				}
			});
		},
		// 请求广告位图片接口
		reqNavImgApi: function (callback) {
			let reqData = {
				tab: 'advertisement_picture',
				picture_id: 1
			};
			$.ajax({
				url: $config.apiUrl,
				type: 'POST',
				dataType: 'json',
				data: reqData,
				success: function (res) {
					if (callback) {
						callback(res);
					}
				}
			});
		},
		// 跳转链接
		navTo: function (linkname) {
			const _this = this;
			this.$router.push({
				path: linkname,
				query: {
					uid: _this.urlQuery.uid
				}
			});
		},
		// 加载热门套餐列表
		loadPackageList: function () {
			const _this = this;
			// 加载列表
			this.reqPackageListApi(function (res) {
				console.log(res);
				let code = res && res.res;
				if (code == 1) {
					// 渲染数据
					_this.packageList = res.data;
				}
			});
		},
		// 请求热门套餐列表接口
		reqPackageListApi: function (callback) {
			let reqData = {
				tab: 'test_group_by_memberdoctor',
				user_id: this.urlQuery.uid,
				list_num: 5
			};
			$.ajax({
				url: $config.apiUrl,
				type: 'POST',
				dataType: 'json',
				data: reqData,
				success: function (res) {
					if (callback) {
						callback(res);
					}
				}
			});
		},
		// 套餐详情
		toPackage: function (packageId) {
			const _this = this;
			this.$router.push({
				path: '/member/package_detail',
				query: {
					uid: _this.urlQuery.uid,
					id: packageId
				}
			});
		},
		// 加载未读数信息
		loadNewMsgInfo: function () {
			const _this = this;
			this.reqUnPayCountApi(function (res) {
				console.log(res);
				let code = res && res.res;
				if (code == 1) {
					_this.readPayCount = res.data.num;
				}
			});
			this.reqUnReadCountApi(function (res) {
				console.log(res);
				let code = res && res.res;
				if (code == 1) {
					_this.readReportCount = res.data.num;
				}
			});
		},
		// 请求未支付数接口
		reqUnPayCountApi: function (callback) {
			let reqData = {
				tab: 'member_pay_cancel',
				user_id: this.urlQuery.uid
			};
			$.ajax({
				url: $config.apiUrl,
				type: 'POST',
				dataType: 'json',
				data: reqData,
				success: function (res) {
					if (callback) {
						callback(res);
					}
				}
			});
		},
		// 请求未读报告数接口
		reqUnReadCountApi: function (callback) {
			let reqData = {
				tab: 'member_count_view',
				user_id: this.urlQuery.uid
			};
			$.ajax({
				url: $config.apiUrl,
				type: 'POST',
				dataType: 'json',
				data: reqData,
				success: function (res) {
					if (callback) {
						callback(res);
					}
				}
			});
		},
		// 初始化轮询
		initPolling: function () {
			const _this = this;

			// 轮询未读报告接口
			this.pollingReportObj = new $polling({
				url: $config.apiUrl,
				data: {
					tab: 'member_count_view',
					user_id: this.urlQuery.uid
				},
				timer: 5000,
				step: 5000
			});
			this.pollingReportObj.on('afterfetch', function ($event, data) {
				console.log(data.responseJSON);
				let res = data.responseJSON;
				let code = res && res.res;
				if (code == 1) {
					_this.readReportCount = res.data.num;
				}
			});
			// this.pollingReportObj.run();

			// 轮询未支付接口
			this.pollingPayObj = new $polling({
				url: $config.apiUrl,
				data: {
					tab: 'member_pay_cancel',
					user_id: this.urlQuery.uid
				},
				timer: 5000,
				step: 5000
			});
			this.pollingPayObj.on('afterfetch', function ($event, data) {
				console.log(data.responseJSON);
				let res = data.responseJSON;
				let code = res && res.res;
				if (code == 1) {
					_this.readPayCount = res.data.num;
				}
			});
			// this.pollingPayObj.run();

			this.hasInitPolling = true;
		},
		// 启动轮询
		startPolling: function () {
			this.pollingPayObj && this.pollingPayObj.run();
			this.pollingReportObj && this.pollingReportObj.run();
		},
		// 暂停轮询
		pausePolling: function () {
			this.pollingPayObj && this.pollingPayObj.pause();
			this.pollingReportObj && this.pollingReportObj.pause();
		}
	},
	created: function () {
		this.compInit();
	},
	destroyed: function () {
		// this.pausePolling();
	}
}