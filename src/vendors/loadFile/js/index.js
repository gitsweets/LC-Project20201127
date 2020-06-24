var htmlPath = "component/tmp.html";
var cssPath = "component/tmp.css";

// 载入HTML
// loadFile(htmlPath, "html");

// 载入CSS
// loadFile(htmlPath, "text");
// loadFile(cssPath, "html");

var aa = reader.singleText(cssPath);
console.log(0, aa);

var bb = reader.mulText(htmlPath);
console.log(1, bb);

//
