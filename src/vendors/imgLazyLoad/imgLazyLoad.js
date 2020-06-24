(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.imgLazyLoad = factory();
	}
})(this, function() {

	var store = [],
		offset,
		throttle,
		poll;

	var _inView = function(el) {
		var coords = el.getBoundingClientRect();
		return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset));
	};

	var _pollImages = function() {
		for (var i = store.length; i--;) {
			var self = store[i];
			if (_inView(self)) {
				self.src = self.getAttribute('data-echo');
				store.splice(i, 1);
			}
		}
	};

	var _throttle = function() {
		//alert(1);
		clearTimeout(poll);
		poll = setTimeout(_pollImages, throttle);
	};

	var init = function(obj) {
		var nodes = document.querySelectorAll('[data-echo]');
		var opts = obj || {};
		offset = opts.offset || 0;
		throttle = opts.throttle || 250;

		for (var i = 0; i < nodes.length; i++) {
			store.push(nodes[i]);
		}

		_throttle();

		if (document.addEventListener) {
			window.addEventListener('scroll', _throttle, false);
			//document.getElementById("wrapper").addEventListener('scroll', _throttle, false);

		} else {
			window.attachEvent('onscroll', _throttle);
			//document.getElementById("wrapper").attachEvent('onscroll', _throttle);
		}
	};

	return {
		init: init,
		render: _throttle
	};

	var imgLazyLoad = function (str, callback) {
		// hash跳转
		window.location.hash = str;
	};
	// 对外开放方法
	return init;
});