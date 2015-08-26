/**
 * Created by lsl on 2015/8/10.
 */
//选择分组
$(function(){
    $(".group_op").click(function(){
        $("#group_name").val($("#group_select").val());
    });
});
//显示分组
function add_group(){
    if($("#group_name").val()=="")
        swal("请选择分组");
    else{
        $('#add_group_window').modal('hide');
        $("#add_group_button").hide();
        $("#group_"+$("#group_name").val()).show();
        $("#group_name").val("");
    }
}
//删除分组
function delete_group(obj){
    $(obj).parent().parent().parent().hide();
    $("#add_group_button").show();
}
//运行分组
function app0_run(obj){
    $(obj).attr("disabled","disabled");
    showWait();
    var group_no=$("div.showed_group:visible").children().first().children().first().val();
    $.ajax({
        url: "/run/group/" + group_no + "/",
        method: "POST",
        success:function(data){
            if(data.success){
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


