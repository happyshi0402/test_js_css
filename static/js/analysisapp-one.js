/**
 * Created by lsl on 2015/8/11.
 */
$(function(){
// 指标选择 树形菜单
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', '收起这个分支');
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', '扩大这个分支').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
        } else {
            children.show('fast');
            $(this).attr('title', '收起这个分支').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
        }
        e.stopPropagation();
    });
//初始化时 折叠树
    $('.tree li.parent_li > span').click();
});
//选择分组
function setGroupName(value){
    $("#group_name").val(value);
}
//显示分组
function add_group(){
    if($("#group_name").val()=="")
        swal("请选择分组");
    else{
        $('#add_group_window').modal('hide');
        $("#add_group_button").hide();
        $("#group_"+$("#group_name").val()).show();
        $("#group_name").val("");
        ifAbleRun();
    }
}
//删除分组用
function delete_group(){
    var group_name=$("#ctpa_group").val();
    $("#group_"+group_name).hide();
    $("#add_group_button").show();
    $("#ableRun").hide();
    $("#disableRun").show();
}
//向右侧添加指标
function addFigure(obj){
    $("<li>"+$(obj).html()+"</li>").appendTo("#selectedUL");
    ifAbleRun();
}
//从右侧删除指标
function removeFigure(e){
    if(e.target!=$("#selectedUL")[0])
        $(e.target).remove();
    ifAbleRun();
}
//获得指标
function getFigures(){
    var $figures=$("#selectedUL li input");
    var figures="";
    if($figures.length){
        for(var i=0;i<$figures.length;i++){
            figures+=$figures[i].value+",";
        }
        figures=figures.substr(0,figures.length-1);
        return figures;
    }else{
        swal("请选择指标");
    }
}
//运行app
function ifAbleRun(){
    var $figures=$("#selectedUL li");
    var $selectGroup=$("div.showed_group:visible");
    if($figures.length&&$selectGroup.length){
        $("#ableRun").show();
        $("#disableRun").hide();
    }
    else{
        $("#ableRun").hide();
        $("#disableRun").show();
    }
}
function app1_run(obj){
    $(obj).attr("disabled","disabled");
    showWait();
    var group_no=$("div.showed_group:visible").children().first().children().first().val();
    $.ajax({
        url: "/run/group/" + group_no + "/"+getFigures()+"/",
        method: "GET",
        success:function(data){
            if(data.status==001){
                location.assign("/personal/center/#2");
            }else{
                swal(data.message);
            }
        },
        error:function(){
            swal("http request fail");
        }
    });
}




