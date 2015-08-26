/**
 * Created by lsl on 2015/7/10.
 */
// 站内信的tab选项卡特效
$(document).ready(function() {
    jQuery.jqtab = function(tabs_id,tabContent_id,event) {
        //为tab添加响应事件
        $(tabs_id).find("li").bind(event,function(){
            $(this).addClass("thistab").siblings("li").removeClass("thistab");
            var activeIndex = $(tabs_id).find("li").index(this);
            $(tabContent_id).children().eq(activeIndex).show().siblings().hide();
            return false;
        });
        //激活第一个tab
        $(tabs_id).find("li:first").click();
    };
    /*调用方法如下：*/
    $.jqtab("#tabs","#tab_conbox","click");
//收件箱枫分页插件配置
    $('#receive').jplist({
        itemsBox: '.list'
        ,itemPath: '.list-item'
        ,panelPath: '.jplist-panel'
        ,noResults: '.jplist-no-results'
    });
//发件箱枫分页插件配置
    $('#send').jplist({
        itemsBox: '.list'
        ,itemPath: '.list-item'
        ,panelPath: '.jplist-panel'
        ,noResults: '.jplist-no-results'
    });
});
//切换到收件箱tab时，修改配置
function toggleReceive(){
    $('#c_send_all').hide();
    $('#c_receive_all').show();
    $('#m_show_status').val('receive');
    $("#receive_search").show();
    $('#send_search').hide();
    $("#set_read_button").show();
}
//切换到发件箱tab时，修改配置
function toggleSend(){
    $('#c_receive_all').hide();
    $('#c_send_all').show();
    $('#m_show_status').val('send');
    $("#receive_search").hide();
    $('#send_search').show();
    $("#set_read_button").hide();
}
//点击标题展开隐藏全部信息
function toggleContentHeight(obj){
    if($(obj).next().hasClass("mail_row01"))
    {
        $(obj).next().removeClass("mail_row01");
        $(obj).next().addClass("mail_row02");
    }else
    {
        $(obj).next().removeClass("mail_row02");
        $(obj).next().addClass("mail_row01");
    }
}

/*收件箱*/
//搜索
function receive_search(value){
    $("#jp_receive_filter").val(value);
    $("#jp_receive_filter").trigger("keyup");
}
//切换回复框显示与隐藏
function toggleReply(obj){
    //切换内容高度
    //toggleContentHeight(obj);
    //如果不是系统消息，即是用户消息时隐藏显示回复框
    if($(obj).children().first().text()!="发件人：system"){
        $(obj).parent().next().slideToggle();
    }
    //点击完如果为未读就设置为已读
    if(obj.tagName=="H6"){
        var msgNo=$(obj).parent().prev().val();
        setRead(obj,msgNo);
    }
}
//隐藏回复框
function hideReplay(obj){
    $(obj).parent().parent().slideToggle();
}
//全选控制子复选框
function toggleCheckAll(){
    var type=$("#m_show_status").val();
    var $checkBoxs=$("[name="+type+"][value='a']:checkbox");
    for(var i=0;i<$checkBoxs.length;i++){
        $checkBoxs[i].checked=$("[name="+type+"][value='A']:checkbox")[0].checked;
    }
}
//监测子复选框控制全选按钮
function checkAllOrNot(){
    var type=$("#m_show_status").val();
    if($("[name="+type+"][value='a']:checkbox:checked").length==$("[name="+type+"][value='a']:checkbox").length){
        $("[name="+type+"][value='A']:checkbox")[0].checked=true;
    }
    else{
        $("[name="+type+"][value='A']:checkbox")[0].checked=false;
    }
}
//回复信件(回复模块用)
function sendReply(obj){
    var msgNo=$(obj).parent().parent().prev().prev().val();
    var content=$("#m_r_reply_"+msgNo).val();
    var to_list_str=$("#m_r_sender_"+msgNo).text().split("|")[0];
    var subject="回复： "+$("#m_r_subject_"+msgNo).text();
    if(content=="")
        swal("请填写回复内容！");
    else
        $.ajax({
            url: "/message/",
            type: "POST",
            async: true,
            data: {subject: subject, content: content, to_list_str: to_list_str},
            success: function (data) {
                obj.disabled = false;
                var dataObject = JSON.parse(data);
                if (dataObject.status == 001) {
                    swal({
                        title: "发送至" + to_list_str +"成功",
                        text: "窗口将在2秒后消失",
                        type: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    //清空并隐藏回复模块
                    $(obj).parent().parent().slideToggle();
                    $("#m_r_reply_"+msgNo).val("");
                    //无刷新更新发件箱
                    static_addSendItem(dataObject.data.msgNo,to_list_str,subject,content,dataObject.data.date_send);
                }
                else {
                    sweetAlert(dataObject.message);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                obj.disabled = false;
                sweetAlert("回复失败！错误信息：" + XMLHttpRequest.statusText + "错误代码：" + XMLHttpRequest.status);
            }
        });
}
//获得被选择信息的NO.（以‘,'分隔）
function getSelectedNO(){
    var type=$("#m_show_status").val();
    var nos="";
    var $NOs=$("[name="+type+"][value='a']:checkbox:checked").parent().prev("[name='NO.']:hidden");
    for(var i=0;i<$NOs.length;i++){
        nos+=$NOs[i].value+",";
    }
    nos=nos.substr(0,nos.length-1);
    return nos;
}
//删除信息
function deleteMessage(){
    var type=$("#m_show_status").val();
    var url="";
    if(type=="receive")
        url="/message/receive/";
    else if(type=="send")
        url="/message/send/";
    var msgNo=getSelectedNO();
    if(msgNo=="")
        swal("请选择所需删除的信息");
    else{
        swal({
                title: "您确定?",
                text: "即将删除所选信息",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '是的，删除!',
                cancelButtonText: "不，取消 !",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm){
                if (isConfirm){
                    $.ajax({
                            url:url,
                            type:"DELETE",
                            data:{msgNo:msgNo},
                            success:function(data) {
                                var dataObject = JSON.parse(data);
                                if (dataObject.status == 001) {
                                    swal({
                                        title: "成功删除"+dataObject.data+"条信息",
                                        text: "窗口将在2秒后消失",
                                        type: "success",
                                        timer: 2000,
                                        showConfirmButton: false
                                    });
                                    //无刷新更新页面
                                    $("[name="+type+"][value='a']:checkbox:checked").parent().parent().remove();
                                    /*同时也要更新header*/
                                    //清除header列表中包含的已删除的信息
                                    var $ms=$("#m_show_unread a");
                                    for (var i=0;i<$ms.length;i++){
                                        var parts=$ms[i].id.split("_");
                                        if(msgNo.indexOf(parts[parts.length-1])!=-1){
                                            $("#"+$ms[i].id).remove();
                                        }
                                    }
                                    //更新数目
                                    refresh_unread_nums();
                                    /*同时也要更新header*/
                                }
                                else {
                                    sweetAlert(dataObject.message);
                                }
                            },
                            error:function(xhr){
                                sweetAlert("回复失败！错误信息：" + xhr.statusText + "错误代码：" + xhr.status);
                            }
                        }
                    );
                } else {
                    swal("已取消", "您的信息没有被修改)", "error");
                }
            });
    }

}
//置为已读
function setRead(obj,msgNo){
    var m_url = "/message/read/";
    if(arguments.length==2){
        m_url = "/message/read?msgNo=" + msgNo;
    }
    $.ajax({
        url: m_url,
        type: "GET",
        async: false,
        success: function (data) {
            var dataObject = JSON.parse(data);
            if(dataObject.status == 001){
                //多条
                if(m_url == "/message/read/"){
                    //无刷新更新页面    将样式更新为已读
                    static_changeToRead();
                    swal({
                        title: "已成功将"+dataObject.data+"条信息标记为已读",
                        text: "窗口将在2秒后消失",
                        type: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    //同时也要更新header
                    $("#m_show_unread a").remove();
                } //一条
                else{
                    //无刷新更新页面    将样式更新为已读
                    static_changeToRead(msgNo);
                    //同时也要更新header
                    $("#m_msg_"+ msgNo).remove();
                }
                refresh_unread_nums();
            }
            else{
                sweetAlert(dataObject.message);
            }
        },
        error:function(xhr){
            swal("标记失败！错误信息："+xhr.statusText + "错误代码："+xhr.status);
        }
    });
}
//将信息设置为已读样式
function static_changeToRead(msgNo){
    //单条
    if(arguments.length){
        $("#m_r_"+msgNo)[0].outerHTML= $("#m_r_"+msgNo)[0].outerHTML.replace(new RegExp("<h6 ","g"),"<h5 ");
        $("#m_r_"+msgNo)[0].outerHTML= $("#m_r_"+msgNo)[0].outerHTML.replace(new RegExp("/h6>","g"),"/h5>");
    }
    //全部
    else{
        $("#m_receive")[0].outerHTML= $("#m_receive")[0].outerHTML.replace(new RegExp("<h6 ","g"),"<h5 ");
        $("#m_receive")[0].outerHTML= $("#m_receive")[0].outerHTML.replace(new RegExp("/h6>","g"),"/h5>");
    }
}
/*收件箱*/

/*发件箱*/
//搜索
function send_search(value){
    $("#jp_send_filter").val(value);
    $("#jp_send_filter").trigger("keyup");
}
//增加单条信息
function static_addSendItem(msgNo,receiver,subject,content,time){
    //无刷新更新发件箱
    $("#m_send").prepend(
        "<li id='m_s_"+msgNo+"'>" +
        "<input type='hidden' name='NO.' value='"+msgNo+"'>" +
        "<div class='mailSendMode'>" +
        "<strong>"+time+"</strong>" +
        "<input name='send' type='checkbox' value='a' onclick='checkAllOrNot()'/>" +
        "<span class='mail_userImg'><img src='/static/images/user03.png' alt=''></span>" +
        "<h5 onclick='toggleContentHeight(this)'>" +
        "<label id='m_s_receiver_"+msgNo+"'>收件人："+receiver+"</label>" +
        "<label id='m_s_subject_"+msgNo+"' class='subject'>&nbsp;&nbsp;主题："+subject+"</label>" +
        "</h5>" +
        "<span class='mail_row01 content'>"+content+"</span>" +
        "</div>" +
        "</li>"
    );
}
/*发件箱*/

/*站内信设置  start*/
//切换用户站内信设置效果
function toggle_user_message_set(){
    var $src=$("#user_message_true").attr("src");
    $("#user_message_true").attr("src",$("#user_message_false").attr("src"));
    $("#user_message_false").attr("src",$src);
}
//切换系统站内信设置效果
function toggle_sys_message_set(){
    var $src=$("#sys_message_true").attr("src");
    $("#sys_message_true").attr("src",$("#sys_message_false").attr("src"));
    $("#sys_message_false").attr("src",$src);
}
//获得站内信消息设置状态
function get_message_set_status(){
    var status=new Array(2);
    if($("#user_message_true").attr("src")=="/static/images/right_gray.png")
        status[0]=0;
    else
        status[0]=1;
    if($("#sys_message_true").attr("src")=="/static/images/right_gray.png")
        status[1]=0;
    else
        status[1]=1;
    return  status.join("");
}
//修改站内消息设置
function reset_message_settings(){
    $.ajax({
        url:'/message/config/',
        type:"POST",
        data:{user_message:get_message_set_status()},
        success:function(data) {
            if (data.success) {
                sweetAlert("修改设置成功");
                $("#set_close").click();
            }
            else {
                sweetAlert(data.result.message);
            }
        },
        error:function(xhr){
            sweetAlert("回复失败！错误信息：" + xhr.statusText + "错误代码：" + xhr.status);
        }
    })
}
/*站内信设置  end*/