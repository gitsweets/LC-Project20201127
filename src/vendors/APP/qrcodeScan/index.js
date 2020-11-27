var global = {},
		is_member = 0,
		ios_app = false,
		android_app = false;

qrcodeScan();



// qrCode 原生方法回调（需要做判断，ios一个参数，安卓两个参数）
window.setValues = function(key, code) {
	console.log('扫码回调');
	// 判断是安卓还是ios
	if (typeof ios_app != 'undefined' && ios_app) {
		code = key;
	}
	document.getElementById('scan_code').value = code;
};