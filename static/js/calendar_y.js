MyClassSelect={getByClass:function(g,e){var d=g.getElementsByTagName("*");var a=[];for(var c=0;c<d.length;c++){var f=d[c].className.split(" ");var b;for(var b in f){if(f[b]==e){a.push(d[c]);break}}}return a}};function showDate(a){this.obj=document.getElementById(a.id)}showDate.prototype.init=function(){var a=this;a.year_box=MyClassSelect.getByClass(a.obj,"year")[0];a.prevY=MyClassSelect.getByClass(a.obj,"prev_y")[0];a.nextY=MyClassSelect.getByClass(a.obj,"next_y")[0];a.showNow();a.prevY.onclick=a.nextY.onclick=function(){a.changeYr(this);return this}};showDate.prototype.showNow=function(d,e){var a=this;var b=new Date();var c=d||b.getFullYear();a.year_box.value=(c-1)+"年   至   "+c+"年"};showDate.prototype.changeYr=function(c){var a=this;var d=a.year_box.value.split("年   至   年");var b=parseInt(d[0],10);if(c==a.nextY){b++}else{b--}if(b<1900){b=1900}else{if(b>2099){b=2099}}a.year_box.value=b+"年   至   "+(b+1)+"年"};$(document).ready(function(){var a=new showDate({id:"calendar_box"});a.init()});