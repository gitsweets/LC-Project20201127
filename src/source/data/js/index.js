var currYear = 2020;
$('.targetTime').mobiscroll().date({
		 theme: "ios",
		 lang: "zh",
		 mode: "Center",
		 dateFormat: 'yy-mm-dd',
		 startYear: currYear - 10, //开始年份
		 endYear: currYear + 10, //结束年份
		 height:44,
		 onBeforeShow: function (textVale, inst) { //选中时触发事件
				 if($(".targetTime").val()){
						 var value = $(".targetTime").val().replace(/\-/g,'/')
						 value = new Date(value);
						 inst.setVal(value, true);
				 }
		 },

 });