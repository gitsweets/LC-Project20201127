// 第一种计算时间差形式
countDown('.countDown', {
	unit : 'dd',
	endTime : '2020-12-06 17:57:00',
	count: 2,
});


// 第一种时间差形式
// countDown();
// 基本倒计时，结束时无操作
// countDown('.countDown', 10);

// 基本倒计时，结束时执行回调
// countDown('.countDown', {
// 	leftTime: 5,
// 	count: 2,
// 	endCallback: function (obj) {
// 		console.log(obj);
// 		console.log("倒计时结束回调~");
// 	},
// 	// callback: function (el, time, obj) {
// 	// 	console.log(el, time, obj);
// 	// }
// });

