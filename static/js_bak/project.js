/**
 * Created by wangshifeng on 2015/4/24.
 */
$("#sample_tab_flag").val(4);  //add by wangshifeng 添加样本判断
//更新项目时获取行的值
function getProject_no(project_no) {
    $("#myModalLabel_project").text("修改项目");
    $("#project_no").val(project_no);
    var row = $("#id" + project_no).children().select("span");
    //$("#project_name").val(row.eq(0).children().select("a").eq(0).html());
    $("#project_name").val(row.eq(0).children().select("a").eq(0).attr("title"));
    $("#description").val(row.eq(1).attr("title"));
    var display_level = $("#pro_display_level" + project_no).val();
    $("#display_level").val(display_level);
    $("#submit_add_project").hide();
    $("#submit_edit_project").show();
    var project_role = $("#pro_role" + project_no).val();
    if (project_role == 0) {
        $('#project_name').attr("readonly", false);
        $('#description').attr("readonly", false);
        //$('#display_level').attr("disabled",false);
        $('#display_level_readonly').val(1); //1代表项目属性可改变
        $('#project_name').focus();
    } else if (project_role == 1) {
        $('#project_name').attr("readonly", true);
        $('#description').attr("readonly", false);
        //$('#display_level').attr("disabled",false);
        $('#display_level_readonly').val(1);  //1代表项目属性可改变
        $('#description').focus();
    } else if (project_role == 2) {
        $('#project_name').attr("readonly", true);
        $('#description').attr("readonly", false);
        //$('#display_level').attr("disabled",true);
        $('#display_level_readonly').val(2);  //2代表项目属性不可改变
        $('#description').focus();
    } else if (project_role == 3) {
        $('#project_name').attr("readonly", true);
        $('#description').attr("readonly", true);
        // $('#display_level').attr("disabled",true);
        $('#display_level_readonly').val(2);  //2代表项目属性不可改变
    }
    set_pro_display_level(display_level);
}

function set_value_for_new_project2(value) {
    $("#myModalLabel_project").text("新建项目");
    $('#project_name').attr("readonly", false);
    $('#description').attr("readonly", false);
    $('#display_level_readonly').val(1);
    set_pro_display_level(1);
    $("#project_no").val("");
    $("#project_name").val("");
    $("#description").val("");
    $("#display_level").val(value);
    $("#submit_add_project").show();
    $("#submit_edit_project").hide();
}

//显示等级
function setDisplay_level(val) {
    if (val == "1") {
        $("ol.breadcrumb li:last").replaceWith("<li><a class='active' href='/project/#0'>我的项目</a></li>");
        $("#bt_my_project").addClass("on");
        $("#bt_public_project").removeClass("on");
        if (project_model_array[0] == 0) {
            $("#my_project").load("/project/list/mine/", function () {
                project_model_array[0] = 1;
            });
        }
    } else {
        $("ol.breadcrumb li:last").replaceWith("<li><a  class='active' href='/project/#1'>公共项目</a></li>");
        $("#bt_public_project").addClass("on");
        $("#bt_my_project").removeClass("on");
        if (project_model_array[1] == 0) {
            $("#public_project").load("/project/list/public/", function () {
                project_model_array[1] = 1;
            });
        }
    }
    $("#pro_tab_flag").val(val);
}


/***面包屑 added by lsl on2015/6/24 吕苏利***/
$(function () {
    var state = this.location.href.split("#")[1];
    switch (state) {
        case "0":
        {//我的项目
            $("<li><a class='active' href='/project/#0'>我的项目</a></li>").appendTo($("ol.breadcrumb"));
            break;
        }
        case "1":
        {//公共项目
            $("<li><a class='active' href='/project/#1'>公共项目</a></li>").appendTo($("ol.breadcrumb"));
            break;
        }
        default:
        {//我的项目
            $("<li><a class='active' href='/project/#0'>项目</a></li>").appendTo($("ol.breadcrumb"));
            break;
        }
    }
});
/***面包屑  吕苏利***/


