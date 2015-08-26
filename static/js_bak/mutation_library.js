/**
 * Created by Administrator on 2015/8/18.
 */
function mutation_level(val) {
    if (val == "1") {
        $("ol.breadcrumb li:last").replaceWith("<li><a class='active' href='/mutation_library/#0'>�ҵ�ͻ���</a></li>");
        $("#bt_my_project").addClass("on");
        $("#bt_public_project").removeClass("on");
        if (project_model_array[0] == 0) {
            $("#my_project").load("/mutation_library/list/mine/", function () {
                project_model_array[0] = 1;
            });
        }
    } else {
        $("ol.breadcrumb li:last").replaceWith("<li><a  class='active' href='/mutation_library/#1'>ϵͳͻ���</a></li>");
        $("#bt_public_project").addClass("on");
        $("#bt_my_project").removeClass("on");
        if (project_model_array[1] == 0) {
            $("#public_project").load("/mutation_library/list/public/", function () {
                project_model_array[1] = 1;
            });
        }
    }
    $("#pro_tab_flag").val(val);
}


function mutation_lib2(){
    var name = $("#mutation_name1").val();
    if(name.length==0){
        sweetAlert("������ͻ�������");
        return
    }else if(name.length>40){
        sweetAlert("����������ƹ�������������")
        return
    }
    var description = $("#mutation_text1").val();
    if(description.length==0){
        sweetAlert("������ͻ��������");
        return
    }else if(description.length>40){
        sweetAlert("�������������������������")
        return
    }
    var lib_id =$("#lib_id").val();
    if(lib_id.length==0){
        sweetAlert("û��ѡ��ɾ����Ŀ");
        return
    }
    var url = "/mutation/alter/";
    $.ajax({
        url: url,
        async: false,
        type: "GET",
        data: {name: name, description: description, lib_id: lib_id},
        success: function (data) {
            if (data.status == 0) {
                sweetAlert("�޸ĳɹ�")
                $('#mutation-library3').modal('hide');
                $("#my_project").load("/mutation_library/list/mine/",function(){
                        });

            }else{
                sweetAlert(data.message)
            }
        }
    });
}
function Delete_mutation(int){
    var lib_id = $("#get"+int).val();
    var url = "/mutation/delete/";
    $.ajax({
        url: url,
        async: false,
        type: "GET",
        data: {lib_id: lib_id},
        success: function (data) {
            if (data.status == 1) {
                $("#my_project").load("/mutation_library/list/mine/",function(){
                        });

            }else{
                sweetAlert(data.message)
            }
        }
    });
}
