/**
 * Created by lsl on 2015/5/27.
 /**/

var currentSelIndex = -1;
var oldSelIndex=-1;
$(function(){
    //给文档添加侦听事件，但是要在对应元素阻止事件冒牌
    $(document).click(function(){
        $("ul.GL_filterTip").hide();
    });
    //初始化生成组件
    var inputs= $("input.GL_filterTip");
    for(var i=0;i<inputs.length;i++)
    {
        $("<ul id='"+inputs[i].id+"_ul' class='GL_filterTip' onclick='GL_filterTipOnClickHandler(this,event)'></ul>")
            .insertAfter("#"+inputs[i].id);
    }
})
function GL_filterTipClickHandler(obj,event,url,textField) {
    //   if (obj.value == "") {
    GL_filterTipAutoComplete(obj, url, textField);
    GL_filterTipReSetSelIndex(obj);
    //   }
    //阻止事件冒泡
    var ev = event || window.event;
    if(ev.stopPropagation){
        ev.stopPropagation();
    }
    else if(window.event){
        window.event.cancelBubble = true;//兼容IE
    }
}
function GL_filterTipKeyUpHandler(obj,event,url,textField) {
    //输入为空
    if (obj.value == "") {
        GL_filterTipAutoComplete(obj, url, textField);
        GL_filterTipReSetSelIndex(obj);

    }
    //输入不为空
    else {
        if (!($("#"+obj.id+"_ul").css("display") != "none" && (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13))) {
            GL_filterTipAutoComplete(obj, url, textField);
            GL_filterTipReSetSelIndex(obj);
        }
        /*  else {
         var liLength = $("#"+obj.id+"_ul li").length;
         if (liLength > 0) {
         oldSelIndex = currentSelIndex;
         //上移  index--
         if (event.keyCode == 38) {
         if (currentSelIndex != 0 && currentSelIndex != -1) {
         currentSelIndex--;
         }
         //颜色滚动
         $("#"+obj.id+"_ul_li" + oldSelIndex).css("backgroundColor", "#ffffff");
         $("#"+obj.id+"_ul_li" + currentSelIndex).css("backgroundColor", "#f5f5f5");
         }
         //下移index++
         else if (event.keyCode == 40) {
         if (currentSelIndex != liLength - 1) {
         currentSelIndex++;
         }
         //颜色滚动
         $("#"+obj.id+"_ul_li" + oldSelIndex).css("backgroundColor", "#ffffff");
         $("#"+obj.id+"_ul_li" + currentSelIndex).css("backgroundColor", "#f5f5f5");
         }
         //回车键
         else if (event.keyCode == 13) {
         if (currentSelIndex != -1) {
         //取值
         $(obj).val($("#"+obj.id+"_ul_li" + currentSelIndex).text());
         $("#"+obj.id+"_ul").hide();
         GL_filterTipReSetSelIndex(obj);
         }
         }
         }
         }*/
    }
}
function GL_filterTipAutoComplete(obj,url,textField) {
    $.ajax({
        url:url,
        type:'POST',
        data:{q:obj.value},
        success:function(data){
            var result=JSON.parse(data);
            $("#"+obj.id+"_ul").empty();
            //新建病号
            if(obj.getAttribute("self_designed_type")=="new_patient"){
                for(var i=0;i<result.length;i++){
                    $("<li id='"+obj.id+"_ul_li"+i+"' alternativeTarget='"+obj.getAttribute("alternativeTarget")+"'>"+result[i][textField]+"</li>").appendTo($("#"+obj.id+"_ul"));
                }
                if($(obj).attr("alternativeTarget"))
                    $("<li id='"+obj.id+"_ul_li_new'  alternativeTarget='"+obj.getAttribute("alternativeTarget")+"'>新建病案号："+obj.value+"</li>").appendTo($("#"+obj.id+"_ul"));
            }//复制样本//移动样本//通常搜索提示
            else{
                for(var i=0;i<result.length;i++){
                    $("<li id='"+obj.id+"_ul_li"+i+"'>"+result[i][textField]+"</li>").appendTo($("#"+obj.id+"_ul"));
                }
            }
            $("#"+obj.id+"_ul").show();
        },
        error:function(){
            alert("http request fail");
        }
    });
}
function GL_filterTipOnClickHandler(obj,event) {
    //不同的浏览器竟然变量内部结构不一样，IE是event.target.innerText；火狐是event.target.textContent
    // alert(navigator.appCodeName);
    //新建病号
    if($("#"+obj.id.substr(0,obj.id.length-3))[0].getAttribute("self_designed_type")=="new_patient"){
        //点击的项目不是新建
        if(event.target.getAttribute("id").split("li_")[1]!="new"){
            switch(navigator.appCodeName)
            {
                case "Mozilla"://IE  Firefox
                {
                    //    alert("textContent:"+event.target.textContent);
                    $("#"+obj.id.substr(0,obj.id.length-3)).val(event.target.textContent);
                    break;
                }
                default://360？
                    //   alert("innerText"+event.target.innerText);
                    $("#"+obj.id.substr(0,obj.id.length-3)).val(event.target.innerText);
            }
            /*
             if(event.target.textContent!=undefined)
             $("#txtKeyword").val(event.target.textContent);
             else(event.target.innerText!=undefined)
             $("#txtKeyword").val(event.target.innerText);
             */
        }else{
            //是新建
            //阻止事件冒泡
            var ev = event || window.event;
            if(ev.stopPropagation){
                ev.stopPropagation();
            }
            else if(window.event){
                window.event.cancelBubble = true;//兼容IE
            }
        }
        $("#"+obj.id).hide();
        GL_filterTipReSetSelIndex($("#"+obj.id.substr(0,obj.id.length-3))[0]);
        //所需执行操作，根据target
        $(event.target.getAttribute("alternativeTarget")).click();
    }//复制样本
    else if($("#"+obj.id.substr(0,obj.id.length-3))[0].getAttribute("self_designed_type")=="copy_sample"){
        switch(navigator.appCodeName)
        {
            case "Mozilla"://IE  Firefox
            {
                $("#"+obj.id.substr(0,obj.id.length-3)).val(event.target.textContent);
                //执行后续操作
                copy(event.target.textContent);
                break;
            }
            default://360？
                $("#"+obj.id.substr(0,obj.id.length-3)).val(event.target.innerText);
                //执行后续操作
                copy(event.target.innerText);
        }
        $("#"+obj.id).hide();
        $("#"+obj.id.substr(0,obj.id.length-3)).val("");
    }//移动样本
    else if($("#"+obj.id.substr(0,obj.id.length-3))[0].getAttribute("self_designed_type")=="move_sample"){
        switch(navigator.appCodeName)
        {
            case "Mozilla"://IE  Firefox
            {
                $("#"+obj.id.substr(0,obj.id.length-3)).val(event.target.textContent);
                //执行后续操作
                move(event.target.textContent);
                break;
            }
            default://360？
                $("#"+obj.id.substr(0,obj.id.length-3)).val(event.target.innerText);
                //执行后续操作
                move(event.target.innerText);
        }
        $("#"+obj.id).hide();
        $("#"+obj.id.substr(0,obj.id.length-3)).val("");
    }
    //添加表型tag-cloud
    else if($("#"+obj.id.substr(0,obj.id.length-3))[0].getAttribute("self_designed_type")=="add_phenotype_tag-cloud"){
        switch(navigator.appCodeName)
        {
            case "Mozilla"://IE  Firefox
            {
                $("#"+obj.id.substr(0,obj.id.length-3)).val(event.target.textContent);
                //执行后续操作
                add_phenotype_tag_cloud(event.target.textContent);
                break;
            }
            default://360？
                $("#"+obj.id.substr(0,obj.id.length-3)).val(event.target.innerText);
                //执行后续操作
                add_phenotype_tag_cloud(event.target.innerText);
        }
        $("#"+obj.id).hide();
        $("#"+obj.id.substr(0,obj.id.length-3)).val("");
    }
    //通常搜索提示
    else{
        switch(navigator.appCodeName)
        {
            case "Mozilla"://IE  Firefox
            {
                $("#"+obj.id.substr(0,obj.id.length-3)).val(event.target.textContent);
                break;
            }
            default://360？
                $("#"+obj.id.substr(0,obj.id.length-3)).val(event.target.innerText);
        }
        $("#"+obj.id).hide();
        GL_filterTipReSetSelIndex($("#"+obj.id.substr(0,obj.id.length-3))[0]);
    }
}
function GL_filterTipReSetSelIndex(obj){
    currentSelIndex = -1;
    oldSelIndex=-1;
}


