/**
 * Created by wangshifeng on 2015/5/1.
 */
/**
 * Modified by LvSuli on 2015/5/13.
 */
/**
 * taken over and maintained by LvSuli from about 2015/6/20.
 */
/**
 * Cut and changed by LvSuli on 2015/7/8.
 */

//header中新建项目和新建样本相关参数修改
$("#pro_tab_flag").val(4);  //添加项目，url 跳转判断变量
$("#sample_tab_flag").val(1);//添加样本，url 跳转判断变量

//根据url初始化tab  样本和项目中样本作区分
$(function () {
    //在进入sample时，根据sample_page_check判断是哪个页面，然后选择tab项
    var sample_page_check = $("#hid_sample_page_check").val();
    if (sample_page_check == "1" || sample_page_check == "4" || sample_page_check == "3" || sample_page_check == "6") {
        $("#basic_tab").remove();
        $("#basicInfo").remove();
    }
    var state = this.location.href.split("#")[1];
    switch (state) {
        case "0":
        {
            $("#detect_tab").removeClass("active");
            $("#detection").removeClass("in active");
            $("#basic_tab").addClass("active");
            $("#basicInfo").addClass("in active");
            break;
        }
        case "1":
        {
            $("#basic_tab").removeClass("active");
            $("#basicInfo").removeClass("in active");
            $("#detect_tab").addClass("active");
            $("#detection").addClass("in active");
        }
        default:
        {

        }
    }
});
//通过选中的复选框获得样本号
function getSelectSampleNO() {
    var el = document.getElementsByTagName('input');
    var len = el.length;
    var sample_nos = "";
    var selectNum = 0;
    for (var i = 0; i < len; i++) {
        if ((el[i].type == "checkbox") && (el[i].name == "test")) {
            if (el[i].checked == true && el[i].id != "select_all") {
                selectNum++;
                sample_nos += el[i].id + ",";
            }
        }
    }
    sample_nos = sample_nos.substr(0, sample_nos.length - 1);
    return sample_nos;
}
//移动样本
function move(award) {
    $("#moveButton").trigger("click");
    var sample_nos = getSelectSampleNO();
    if (sample_nos.length <= 0) {
        swal("请选择至少一个样本！");
        return;
    }
    if (arguments.length) {
        var award_project = award;
    } else {
        var award_project = $("#move_award_project").val();
    }

    var project_no = $("#hid_project_no").val();
    var url = "/sample/" + project_no + "/move/";

    swal({
            title: "Are you sure?",
            text: "Will move " + sample_nos + " to project " + award_project,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, move !',
            cancelButtonText: "No, cancel !",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function (isConfirm) {
            if (isConfirm) {
                $.ajax({
                    url: url,
                    type: "POST",
                    async: false,
                    data: {sample_nos: sample_nos, award_project: award_project},
                    success: function (data) {
                        if (data.success == true) {
                            swal({
                                title: "操作成功!",
                                text: "移动成功，窗口将在2秒后消失",
                                type: "success",
                                timer: 2000,
                                showConfirmButton: false
                            });
                            $("[name='test'][value='a']:checked").parent().parent().remove();
                        } else {
                            swal("Move!", data.message, "fail");
                        }
                    },
                    error: function () {
                        swal("Something was wrong!");
                    }
                });
            } else {
                swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
        });
}
//复制样本
function copy(award) {
    $("#copyButton").trigger("click");
    var sample_nos = getSelectSampleNO();
    var project_no = $("#hid_project_no").val();
    if (sample_nos.length <= 0) {
        swal("请选择至少一个样本！");
        return;
    }
    if (arguments.length) {
        var award_project = award;
    }
    else {
        var award_project = $("#copy_award_project").val();
    }
    var url = "/sample/" + project_no + "/copy/";
    swal({
            title: "Are you sure?",
            text: "Will copy sample " + sample_nos + " to project " + award_project,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, copy !',
            cancelButtonText: "No, cancel !",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function (isConfirm) {
            if (isConfirm) {
                $.ajax({
                    url: url,
                    type: "POST",
                    async: false,
                    data: {sample_nos: sample_nos, award_project: award_project},
                    success: function (data) {
                        if (data.success == true) {
                            swal({
                                title: "操作成功!",
                                text: "复制成功，窗口将在2秒后消失",
                                type: "success",
                                timer: 2000,
                                showConfirmButton: false
                            });
                        } else {
                            swal("Copy!", data.message, "fail");
                        }
                    },
                    error: function () {
                        swal("Something was wrong!");
                    }
                });
            } else {
                swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
        });
}
//删除样本
function samples_delete() {
    var sample_nos = getSelectSampleNO();
    if (sample_nos.length <= 0) {
        swal("请选择至少一个样本");
        return;
    }
    swal({
            title: "Are you sure?",
            text: "Will delete sample " + sample_nos,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete !',
            cancelButtonText: "No, cancel !",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function (isConfirm) {
            if (isConfirm) {
                var url = "/samples/delete/";
                $.ajax({
                    url: url,
                    type: "POST",
                    async: false,
                    data: {sample_nos: sample_nos},
                    success: function (data) {
                        if (data.success == true) {
                            swal("Success!");
                            var get_sample_type = $("#get_sample_type").val()
                            if (get_sample_type == "mine") {
                                $("#sample_detection").load("/sample/mine/detection/", function () {
                                });
                            } else if (get_sample_type == "public") {
                                $("#sample_detection").load("/sample/public/detection/", function () {
                                });
                            } else {
                                $("#sample_detection").load('/sample/mine/detection/' + project_no + '/', function () {
                                });
                            }
                        } else {
                            swal(data.message);
                        }
                    },
                    error: function () {
                        swal("Something was wrong!");
                    }
                });
            } else {
                swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
        });
}
//下载注释 vcf
function downVCF() {

    var sample_nos = getSelectSampleNO();
    window.open("/get/annotated/vcf/?sample_nos=" + sample_nos)

    //$.ajax({
    //    url: "/get/annotated/vcf/",
    //    data: {sample_no: sample_nos},
    //    type: "POST",
    //    aysnc: "false",
    //    success: function (data) {
    //        alert(data)
    //        if (data.status == 1) {
    //            $.ajax({
    //                url: data.url,
    //                type: "GET",
    //                dataType: 'binary',
    //                success: function (result) {
    //                    var url = URL.createObjectURL(result);
    //                    var $a = $('<a />', {
    //                        'href': url,
    //                        'download': 'annotation.zip',
    //                        'text': "click"
    //                    }).appendTo("body")[0].click();
    //                    setTimeout(function () {
    //                        URL.revokeObjectURL(url);
    //                    }, 10000);
    //                },
    //                error: function () {
    //                    alert('level2 ajax error!');
    //                }
    //            });
    //        } else {
    //            alert("Please upload your vcf file first !")
    //        }
    //    },
    //    error: function () {
    //        alert("level 1 ajax error!");
    //    }
    //});
}
//点击移动按钮时，及时打开搜索提示列表
function triggerMoveUnfold() {
    $("#move_award_project").trigger("click");
}
//点击复制按钮时，及时打开搜索提示列表
function triggerCopyUnfold() {
    $("#copy_award_project").trigger("click");
}
/***面包屑  吕苏利***/
// 根据url修改面包屑
$(function () {
    var location = this.location.href;
    var pps = this.location.href.split("/");
    var pps2 = this.location.href.split("#");
    if (location.indexOf("project") != -1) {
        /***从项目页进入  开始**/
        var state1 = pps2[pps2.length - 2];
        var state2 = pps2[pps2.length - 1];
        var project_no = pps[pps.length - 2];
        switch (state2) {
            case "0"://样本列表
            {
                $("<li><a class='active' href='#'>样本列表</a></li>").appendTo($("ol.breadcrumb"));
                break;
            }
            case "1"://基本信息
            {
                $("<li><a class='active' href='#'>基本信息</a></li>").appendTo($("ol.breadcrumb"));
                break;
            }
            default:
            {//样本列表
                $("<li><a class='active' href='#'>样本列表</a></li>").appendTo($("ol.breadcrumb"));
                break;
            }
        }
    }
    else {

    }
});
//切换tab修改面包屑
function changeBreadcrum(val, obj) {
    if (val == "1") {//样本列表
        $("ol.breadcrumb li:last").replaceWith("<li><a class='active' href='/project/'>样本列表</a></li>");
    } else if (val == "2") {//项目信息
        $("ol.breadcrumb li:last").replaceWith("<li><a class='active' href='/project/'>项目信息</a></li>");
    }
}
/***面包屑  根据url修改面包屑  吕苏利***/
/***选中复选框  吕苏利***/
//监听是否激活按钮
function checkEnableOrDisable() {
    var $checked = $("[name='test'][value='a']:checked");//被选择的复选框
    if ($checked.length) {
        var num = 0;//没有突变信息的样本数
        for (var i = 0; i < $checked.length; i++) {
            var $stage = $($checked[i]).parent().siblings().last().find("input:hidden");
            if (parseInt($stage.val()) < 2) {
                num++;
            }
        }
        if (num == 0) {
            $("button:disabled").removeAttr("disabled");
        } else {
            $("button:disabled").removeAttr("disabled");
            $("#newGroup").attr("disabled", "disabled");
        }
    } else {
        $("button.if-able").attr("disabled", "disabled");
    }
}
//全选控制子复选框
function toggleCheckAll() {
    var $checkBoxs = $("[name='test'][value='a']");
    for (var i = 0; i < $checkBoxs.length; i++) {
        $checkBoxs[i].checked = $("#select_all")[0].checked;
    }
}
/***选中复选框  吕苏利***/


/**DYP 2015.7.23 样本页保存分组 开始
 * sample_nos  样本号
 * group_name  分组名称
 * description  分组描述
 * **/
function saveGroup() {
    var sample_nos = getSelectSampleNO();
    var group_name = $("#group_name").val();
    var description = $("#group_description").val();
    var project_no = $("#hid_project_no").val();
    var url = "/sample/add/group/";
    $.ajax({
        url: url,
        async: false,
        type: "POST",
        data: {sample_nos: sample_nos, group_name: group_name, description: description, project_no: project_no},
        success: function (data) {
            if (data.success == true) {
                $('#myModal12').modal('hide');
                $("#sample_nos").val("");
                $("#group_name").val("");
                $("#group_description").val("");
                swal({
                        title: "保存分组成功",
                        text: "是否跳转至app分析页面",
                        type: "info",
                        showCancelButton: true,
                        confirmButtonColor: '#DD6B55',
                        confirmButtonText: '是的，跳转至app分析页面',
                        cancelButtonText: "不，停留在此页面",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            location.replace("/analysis/");
                        } else {

                        }
                    });
            } else {
                $('#myModal12').modal('hide');
                if (data.status == "212") {
                    sweetAlert("分组名称重复，请重新添加！");
                } else if (data.status == "208") {
                    sweetAlert("没有对此样本的操作权限！");
                } else if (data.status == "102") {
                    sweetAlert("用户不存在！");
                } else {
                    sweetAlert("内部错误保存失败！");
                }
            }
        }
    });
    return true;
}
/**添加分组结束  DYP* **/

/**高级搜索用  DYP 2015.8.7**/
function Btn_submit() {
    var id = $("#juery").val();
    var value = $("#inp_submit").val();
    if ($(".search-sum").val() == "") {
        $(".search-sum").val("").remove()
    }
    if (id == "" | value == "") {
        alert("请输入至少一个搜索条件！")
        return;
    }
    $("#search_sum").append("<input id=" + id + " class='search-sum search-title' onclick='blue_search(" + id + ")' name='123' value=" + id + ":[" + value + "]" + " type='text' />")
    $("#affirm_sea").removeAttr("disabled");
    $("#history").val("");
    $("#juery").val("");
    $("#inp_submit").val("");
     $("#chan_ser").val("");
}
function check_inp(value, obj) {
    var str = "";
    $("#searchDropmenu :checkbox").each(function () {
        if (this.checked) {
            str += "," + $(this).val();
        }
    })
    str = str.substr(1);
    $("#inp_submit").val(str)
}

function affirm_sea() {
    var project_no = $("#hid_project_no").val();
    var value = ""
    $("#search_sum :input").each(function () {
        value += $(this).val() + ",";
    });
    if (value == "") {
        alert("请输入至少一个查询条件！")
        return;
    }
    var m_url = "/advancedsearch/run/" + project_no + "/" + value + "/";
    $("#sample_detection").load(m_url, function () {
    });
}
function blue_search(id) {
    $("#" + id).removeClass("search-title");
    $("#" + id).addClass("search-blue");
}
