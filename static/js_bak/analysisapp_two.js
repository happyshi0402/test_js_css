
$(".group_op").click(function(){
    $("#inp_group").val($("#ctpa_group").val());
});
innter = 0;
innter1 = 0;
function add_app2(){
    var group_name=$("#ctpa_group").val();
    if(innter== 0){
        $("#group_").show();
        $("#remove").hide();
        innter=1
    }else{
        $("#group_"+group_name+"1").show();
        $("#remove1").hide();
        innter1=1
    }
    $('#app-zero').modal('hide');
    if (innter==1&innter1==1){
        $(".horizontal-bar").remove();
        $(".vertical-bar2").remove();
        $("#color_1").append("<p class='horizontal-barblue pull-left'></p> <p class='vertical-bar2blue'></p>");
        $(".run-left").remove();
        $(".run-right").remove();
        $("#group_run").append("<button type='button' class='btn btn-default run-left green' disabled='disabled'>群体差异分析</button> <button type='button' class='btn run-right greenTwo' onclick='app2_run()'>RUN</button>")
    }
}

function btn_delete(){
    var group_name=$("#ctpa_group").val();
    $("#group_"+group_name+"1").hide();
    $("#remove1").show();
    $(".run-left").remove();
    $(".run-right").remove();
    $("#group_run").append(" <button type='button' class='btn btn-default run-left' disabled='disabled'>群体差异分析</button><button type='button' class='btn run-right' disabled='disabled'>RUN</button>");
    $(".horizontal-barblue").remove();
    $(".vertical-bar2blue").remove();
    $("#color_1").append("<p class='horizontal-bar pull-left'></p> <p class='vertical-bar2'></p>")
    innter1=0
}
function btn_delete1(){
    var group_name=$("#ctpa_group").val();
    $("#group_").hide();
    $("#remove").show();
    $(".run-left").remove();
    $(".run-right").remove();
    $("#group_run").append(" <button type='button' class='btn btn-default run-left' disabled='disabled'>群体差异分析</button><button type='button' class='btn run-right' disabled='disabled'>RUN</button>");
    //$(".horizontal-barblue").remove();
    //$(".vertical-bar2blue").remove();
    //$("#color_1").append("<p class='horizontal-bar pull-left'></p> <p class='vertical-bar2'></p>")
    innter=0
}
function app2_run(){
    var els = $(".grouping2:visible");
    var els1 = $(".grouping1:visible");
    if(els.length <= 0|els1.length<=0){
        sweetAlert("请至少添加两个分组");
        return false;
    }
    var group_no = els.children().first().children().eq(0).val();
    var task_id = els.children().first().children().eq(1).val();
    var group_no1 = els1.children().first().children().eq(0).val();
    var task_id1 = els1.children().first().children().eq(1).val();
    var rerun
    var rerun1
    if (group_no == group_no1){
        sweetAlert("不能选择相同的分组")
    }
    if (task_id==""){
        rerun = true;
    }else{
        rerun = false;
    }
    if (task_id1==""){
        rerun1 = true;
    }else{
        rerun1 = false;
    }
    $.ajax({
        url: "/analysisapp/two/run/",
        method: "POST",
        data:{group_no:group_no,task_id:task_id,rerun:rerun,group_no1:group_no1,task_id1:task_id1,rerun1:rerun1},
        success:function(data){
            window.open("/personal/center/#2");
        },
        error:function(){
            swal(data.message);
        }
    });
}