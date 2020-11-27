if(document.getElementById('position')) {
	var bullets = document.getElementById('position').getElementsByTagName('li');
	console.log(bullets);
	var banner = swipeBanner(document.getElementById('mySwipe'), {
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
}