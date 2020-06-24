// 功能模块 css
import './index.css';

// 功能模块模板
// import tpl from './tpl/tpl.html';

// import tpl from './tpl.vue';
// 功能模块实现
var goodsInfo = require("./goodsInfo");

// 初始化触发功能模块
// goodsInfo(goods_info, tpl);
goodsInfo(goods_info, document.getElementById('goodsInfo'));


