### 图片懒加载


兼容性
Echo.js 使用了 HTML5 的 date 属性，并且需要获取该属性的值，所以它并不兼容 IE6、IE7。虽然 Lazy Load 也使用了 HTML5 的 date 属性，但它获取值的方法不一样。

使用方法
1、引入文件

1
<script src="js/echo.min.js"></script>
2、HTML

1
<img src="images/blank.gif" alt="pic" data-echo="img/pic.jpg" width="640" height="480">
blank.gif 是一个 1 x 1 的图片，用做默认图片，data-echo 的属性值是图片的真实地址。同样最好给图片设置宽度和高度，或者在 CSS 中设置也可以，否则似乎很底部很底部的图片才会延迟加载。

3、JavaScript

1
2
3
4
Echo.init({
    offset: 0,
    throttle: 0
});
参数
参数	说明
offset	离可视区域多少像素的图片可以被加载
throttle	图片延迟多少毫秒加载