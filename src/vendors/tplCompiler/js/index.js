var tpl = '<template>\n' +
	'  <div class="account">\n' +
	'    <img class="avator" :src="orderDetailInfo.userInfo.avatarUrl" alt="">\n' +
	'    <div class="name">{{orderDetailInfo.userInfo.name}}</div>\n' +
	'    <div class="ag">\n' +
	'      <span>{{orderDetailInfo.userInfo.gender == \'m\' ? \'男\' : \'女\'}}</span>\n' +
	'      <span>{{orderDetailInfo.userInfo.age}}岁</span>\n' +
	'    </div>\n' +
	'    <div class="id"><span>身份证号</span><span>{{orderDetailInfo.userInfo.cardId}}</span></div>\n' +
	'  </div>\n' +
	'</template>\n' +
	'\n' +
	'<style>\n' +
	'  .swiper-container img {\n' +
	'    width: 100%;\n' +
	'    height: 200px;\n' +
	'  }\n' +
	'</style>\n' +
	'\n' +
	'<script>\n' +
	'\n' +
	'\tobj = {\n' +
	'\t\tdata: function () {\n' +
	'          console.log("数据！");\n' +
	'\t\t\t\t},\n' +
	'      method: {\n' +
	'\t\t\tinit: function () {\n' +
	'              console.log("初始化！");\n' +
	'\t\t\t\t\t\t}\n' +
	'      }\n' +
	'\t\t\t\t\n' +
	'    }\n' +
	'\n' +
	'</script>';

var tpl1 = '';

var aa = tplCompiler(tpl);
console.log(aa);
$("body").append(aa.template);

var style = document.createElement("style");
style.type = "text/css";
style.setAttribute('data_style', this.hash);
style.innerHTML = aa.style;
$("body").append(style);

var scriptEl = document.createElement("script");
scriptEl.innerHTML = aa.script;
// $("body").append(scriptEl);
// f();