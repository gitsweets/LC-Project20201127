// 功能模块 css
import './index.css';

// 功能模块实现
var QRcode = require("./js/QRcode");
// console.log(QRcode);

// 初始化触发功能模块
// QRcode(document.getElementById('QRcode'));

// 测试
// var test = require("./js/test");
// console.log(test);
// debugger

import test1 from  './views/test/test';
console.log(test1.created(document.getElementById('QRcode')));


