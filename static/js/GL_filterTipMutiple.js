/**
 * Created by lsl on 2015/5/27.
 /**/

var currentSelIndexMutiple = -1;
var oldSelIndexMutiple=-1;
$(function(){
    //给文档添加侦听事件，但是要在对应元素阻止事件冒牌
    document.onclick=function(){
        $("ul.GL_filterTipMutiple").hide();
    };
    //初始化生成组件
    var textAreas= $("textArea.GL_filterTipMutiple");
    for(var i=0;i<textAreas.length;i++)
    {
        $("<ul id='"+textAreas[i].id+"_ul' class='GL_filterTipMutiple' onclick='GL_filterTipMutipleOnClickHandler(this,event)'></ul>")
            .insertAfter("#"+textAreas[i].id);
    }
})
function GL_filterTipMutipleClickHandler(obj,event,url,textField){
 //   if (obj.value == "") {
        GL_filterTipMutipleAutoComplete(obj, url, textField);
        GL_filterTipMutipleReSetSelIndex();
//    }
    //阻止事件冒泡
    var ev = event || window.event;
    if(ev.stopPropagation){
        ev.stopPropagation();
    }
    else if(window.event){
        window.event.cancelBubble = true;//兼容IE
    }
}
function GL_filterTipMutipleKeyUpHandler(obj,event,url,textField) {
    //输入为空
    if (obj.value == "") {
        $("#"+obj.id+"_ul").hide();
        GL_filterTipMutipleReSetSelIndex();
    }
    //输入不为空
    else {
        if (!($("#"+obj.id+"_ul").css("display") != "none" && (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13))) {
            GL_filterTipMutipleAutoComplete(obj, url, textField);
            GL_filterTipMutipleReSetSelIndex();
        }
        /*
         else {
         var liLength = $("#"+obj.id+"_ul li").length;
         if (liLength > 0) {
         oldSelIndexMutiple = currentSelIndexMutiple;
         //上移  index--
         if (event.keyCode == 38) {
         if (currentSelIndexMutiple != 0 && currentSelIndexMutiple != -1) {
         currentSelIndexMutiple--;
         }
         //颜色滚动
         $("#"+obj.id+"_ul_li" + oldSelIndexMutiple).css("backgroundColor", "#ffffff");
         $("#"+obj.id+"_ul_li" + currentSelIndexMutiple).css("backgroundColor", "#f5f5f5");
         }
         //下移index++
         else if (event.keyCode == 40) {
         if (currentSelIndexMutiple != liLength - 1) {
         currentSelIndexMutiple++;
         }
         //颜色滚动
         $("#"+obj.id+"_ul_li" + oldSelIndexMutiple).css("backgroundColor", "#ffffff");
         $("#"+obj.id+"_ul_li" + currentSelIndexMutiple).css("backgroundColor", "#f5f5f5");
         }
         //回车键
         else if (event.keyCode == 13) {
         if (currentSelIndexMutiple != -1) {
         //取值
         // $(obj).val($("#"+obj.id+"_ul_li" + currentSelIndexMutiple).text());

         var oldText= $("#"+obj.id.substr(0,obj.id.length-3)).val();
         var oldTextArray=oldText.split(";")
         var newText="";
         if (oldTextArray.length>0){
         for(var i=0;i<oldTextArray.length-1;i++){
         newText+=oldTextArray[i]+";";
         }
         }
         newText+=$("#"+obj.id+"_ul_li" + currentSelIndexMutiple).text()+";";

         $(obj).val(newText);
         $("#"+obj.id+"_ul").hide();
         GL_filterTipMutipleReSetSelIndex();
         }
         }
         }
         }
         */
    }
}
function GL_filterTipMutipleAutoComplete(obj,url,textField) {
    $.ajax({
        url:url,
        type:'POST',
        data:{q:obj.value},
        success:function(data){
            var result=JSON.parse(data);
            $("#"+obj.id+"_ul").empty();
            for(var i=0;i<result.length;i++){
                $("<li id='"+obj.id+"_ul_li"+i+"'>"+result[i][textField]+"</li>").appendTo($("#"+obj.id+"_ul"));
            }
            if(result.length) {
                $("#"+obj.id+"_ul").show();
                $("#"+obj.id+"_ul").show();
            }else
                $("#"+obj.id+"_ul").hide();
        },
        error:function(){
            alert("http request fail");
        }
    });
}
function GL_filterTipMutipleOnClickHandler(obj,event) {
    //不同的浏览器竟然变量内部结构不一样，IE是event.target.innerText；火狐是event.target.textContent
    // alert(navigator.appCodeName);
    var oldText= $("#"+obj.id.substr(0,obj.id.length-3)).val();
    var oldTextArray=oldText.split(";")
    var newText="";
    if (oldTextArray.length>0){
        for(var i=0;i<oldTextArray.length-1;i++){
            newText+=oldTextArray[i]+";";
        }
    }
    switch(navigator.appCodeName)
    {
        case "Mozilla"://IE  Firefox
        {
            //    alert("textContent:"+event.target.textContent);
            newText+=event.target.textContent+";";
            break;
        }
        default://360？
            //   alert("innerText"+event.target.innerText);
            newText+=event.target.innerText+";";
    }

    $("#"+obj.id.substr(0,obj.id.length-3)).val(newText);
    $("#"+obj.id).hide();
    GL_filterTipMutipleReSetSelIndex();
}
function GL_filterTipMutipleReSetSelIndex(){
    currentSelIndexMutiple = -1;
    oldSelIndexMutiple=-1;
}