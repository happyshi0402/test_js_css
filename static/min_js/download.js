$.ajaxTransport("+binary",function(a,c,b){if(window.FormData&&((a.dataType&&(a.dataType=="binary"))||(a.data&&((window.ArrayBuffer&&a.data instanceof ArrayBuffer)||(window.Blob&&a.data instanceof Blob))))){return{send:function(f,j){var i=new XMLHttpRequest(),e=a.url,g=a.type,d=a.responseType||"blob",h=a.data||null;i.addEventListener("load",function(){var k={};k[a.dataType]=i.response;j(i.status,i.statusText,k,i.getAllResponseHeaders())});i.open(g,e,true);i.responseType=d;i.send(h)},abort:function(){b.abort()}}}});