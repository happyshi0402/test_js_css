/**
 * Created by wangshifeng on 2015/5/01.
 */

$("#pro_tab_flag").val(4);  //add by wangshifeng 添加项目判断
$("#sample_tab_flag").val(4);  //add by wangshifeng 添加样本判断
$(function () {
    $("#patient_update").hide();
});
//===================================================================================


//新版病人页的网页特效引用 Start

//编辑病人基本信息的特效
$("#pencil").click(function () {
    $(".paInfoText").attr("disabled", false);
    $(".paInfoText").css({
        "border": "1px",
        "border-color": "#ccc",
        "border-style": "solid"
    });
    $("#pencil").hide();
    $("#patient_update").show();
});

$("#patient_update").click(function () {
    $(".paInfoText").attr("disabled", true);
    $(".paInfoText").css({"border": "none"});
    var patient_no = $("#patient_no").val();
    var case_no = $("#case_no").val();
    var patient_name = $("#patient_name").val();
    var patient_tel = $("#patient_tel").val();
    var age = $("#age").val();
    var sex = $("#sex").val();
    var birth = $("#birth").val();
    var nation = $("#nation").val();
    var address = $("#address").val();
    var contacts = $("#contacts").val();
    var contacts_tel = $("#contacts_tel").val();
    var relationship = $("#relationship").val();
    var url = "/sample/patient/update/" + patient_no + "/";
    $.ajax({
        url: url,
        type: "POST",
        data: {
            patient_no: patient_no,
            case_no: case_no,
            patient_name: patient_name,
            patient_tel: patient_tel,
            age: age,
            sex: sex,
            birth: birth,
            nation: nation,
            address: address,
            contacts: contacts,
            contacts_tel: contacts_tel,
            relationship: relationship
        },
        success: function (data) {
            alert(data.result.success);
            alert(data.result.message);
        },
        error: function () {
            alert("Something was wrong!");
        }
    });
    $("#pencil").show();
    $("#patient_update").hide();
});

function mouse_go(){
    //$("#clearfix_dis").append("<div id='clearfix_dis_tow'>13456</div>")
    document.getElementById("clearfix_dis").style.display = 'block';
}
function mouse_out(){
    //$("#clearfix_dis_tow").remove()
    document.getElementById("clearfix_dis").style.display = 'none';
}
