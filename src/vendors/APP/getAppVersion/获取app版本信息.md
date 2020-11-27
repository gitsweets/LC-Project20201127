### 记录 （方式一）
getVersionAndNameForIos

eyJuYW1lIjoiY24ubGFuY2FyZS5sYW5jYXJlIiwidmVyc2lvbiI6IjMuMC44M1wvMjAyMDA5MjgwMDAwMDEifQ==

{"name":"cn.lancare.lancare","version":"3.0.83\/20200928000001"}

### 记录 （方式二）
window.webkit.messageHandlers.Lancare.postMessage('getVersion');
 
function getVersionForIos(v,location_url) {
     ver = v.substr(v.indexOf('/') + 1);
     if(ver >= 20200914000001){
         window.webkit.messageHandlers.Lancare.postMessage({
             "classname": "qrCode",
         })
     }else{
         var key = '';
         window.location = "objc:://qrcodescan::/barcode::/" + key;
     }
 }
 
 
 

