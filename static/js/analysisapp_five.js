/**
 * Created by Administrator on 2015/8/25.
 */

$(".group_op").click(function(){
    $("#inp_group5").val($("#ctpa_group5").val());
});
$(".mun_op").click(function(){
    $("#inp_mun").val($("#ctpa_mun").val());
});
innter = 0;
innter1 = 0;
function add_mun5(){
    var group_name=$("#ctpa_mun").val();
        $("#mutation_"+group_name).show();
        $("#mutation_llp").hide();
        $('#app-five1').modal('hide');
        innter1 = 1
        run_add()

}
function add_app5(){
    var group_name=$("#ctpa_group5").val();
        $("#group5_"+group_name).show();
        $("#remove5").hide();
        $('#app-five').modal('hide');
        innter = 1
        run_add()

}

function btn_delete(){
    var group_name=$("#ctpa_mun").val();
    $("#mutation_"+group_name).hide();
    $("#mutation_llp").show();
    innter1 = 0
    run_add()

}
function btn_delete5(){
    var group_name=$("#ctpa_group5").val();
    $("#group5_"+group_name).hide();
    $("#remove5").show();
    innter=0
    run_add()
}

function run_add(){
    if(innter==1&&innter1==1){
        $(".horizontal-bar").remove();
        $(".vertical-bar2").remove();
        $("#color_num").append("<p class='horizontal-barblue pull-left'></p> <p class='vertical-bar2blue'></p>");
        $(".run-left").remove();
        $(".run-right").remove();
        $("#mun_run").append("<button type='button' class='btn btn-default run-left green' disabled='disabled'>群体差异分析</button> <button type='button' class='btn run-right greenTwo' onclick='app5_run()'>RUN</button>")
    }else{
        $(".run-left").remove();
        $(".run-right").remove();
        $("#mun_run").append(" <button type='button' class='btn btn-default run-left' disabled='disabled'>群体差异分析</button><button type='button' class='btn run-right' disabled='disabled'>RUN</button>");
    }
    if (innter==0&&innter1==0){
        $(".horizontal-barblue").remove();
        $(".vertical-bar2blue").remove();
        $("#color_num").append("<p class='horizontal-bar pull-left'></p> <p class='vertical-bar2'></p>")
    }
}
function app5_run(){
    var els = $(".grouping2:visible");
    var els1 = $(".grouping1:visible");
    if(els.length <= 0|els1.length<=0){
        sweetAlert("请至少添加两个分组");
        return false;
    }
    var group_no = els.children().first().children().eq(0).val();
    var task_id = els.children().first().children().eq(1).val();
    var lib_id = els1.children().first().children().eq(0).val();
    var rerun;
    var rerun1;
    if (task_id==""){
        rerun = true;
    }else{
        rerun = false;
    }
    $.ajax({
        url: "/analysisapp/five/run/",
        method: "POST",
        data:{group_no:group_no,task_id:task_id,rerun:rerun,lib_id:lib_id},
        success:function(data){
            window.open("/personal/center/#2");
        },
        error:function(){
            swal(data.message);
        }
    });
}