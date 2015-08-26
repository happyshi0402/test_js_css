/**
 * Created by lsl on 2015/6/23.
 */
/***面包屑  吕苏利***/
$("#pro_tab_flag").val(4);  //添加项目，url 跳转判断变量
$("#sample_tab_flag").val(4);//添加样本，url 跳转判断变量
//自定义列js  开始 DYP
<!--自定义下拉开始-->
var visMnu = "";
var actMnu, url;
function variant_flipMenu()
{
    var actMnu = $("#Mnu2");
    if (visMnu == "")
        showMenu(actMnu);
    else
    {
        hideMenu(actMnu);
    }
}
function showMenu(actMnu)
{
    actMnu.css({"background-color":"#fff","visibility":"visible"});
    visMnu = actMnu;
}
function hideMenu(actMnu)
{
    actMnu.css({"background-color":"","visibility":"hidden"});
    visMnu = "";
}
<!-- custom 自定义列结束 -->
var arrColumn = new Array("Pathogenic",
        "Gene" ,
        "Position",
        "Change",
        "Consequence",
        "FuncRegion",
        "Exon" ,
        "Zygosity" ,
        "Coverage" ,
        "Frequency",
        "Quality" ,
        "Evidence" ,
        "Transcript",
        "Sift_Score",
        "Polyphen_Score"
);
setDefaultItemForVariant();
function setDefaultItemForVariant(){

    var hid_select_obj = $("#hid_variant").val();
    if(hid_select_obj == "/"){
        hid_select_obj = "";
        for(var i=0;i<11;i++) {
            hid_select_obj += "1";
            $("#c"+arrColumn[i]).attr("checked",true);
        }
        for(var i=11;i<=16;i++) {
            hid_select_obj += "0";
            $("#c"+arrColumn[i]).attr("checked",false);
        }
    }else{
        for(var i = 0; i <= 16; i++){
            if(hid_select_obj.charAt(i) == "1"){
                $("#c"+arrColumn[i]).attr("checked",true);
            }else{
                $("#c"+arrColumn[i]).attr("checked",false);
            }
        }
    }
    for (var i = 0; i <= 16; i++) {
        if(hid_select_obj.charAt(i) == "1"){
            //$("#"+arrColumn[i]).css("visibility","visible");
            //$("."+arrColumn[i]).css("visibility","visible");
            $("#"+arrColumn[i]).show();
            $("."+arrColumn[i]).show();
        } else {
            //$("#"+arrColumn[i]).css("visibility","hidden");
            //$("."+arrColumn[i]).css("visibility","hidden");
            $("#"+arrColumn[i]).hide();
            $("."+arrColumn[i]).hide();
        }
    }
}
function variant_CustomShow(obj) {
    var hid_select_con ="";
    var column_selected = obj.attr("checked");
    if(column_selected == "checked"){
        obj.attr("checked",false);
    }else{
        obj.attr("checked",true);
    }
    for (var i = 0; i <= 16; i++) {
        if ($("#c"+arrColumn[i]).attr("checked")) {
            hid_select_con += "1";
            $("."+arrColumn[i]).show();
        } else {
            hid_select_con += "0";
            $("."+arrColumn[i]).hide();
        }
    }
    $("#hid_variant").val(hid_select_con);
    $.ajax({
        url: "/variant/user/config/",
        type: "POST",
        data: {variant_column:hid_select_con},
        success: function (data) {
            if(data == "True"){

            }else{
                //alert("Return nothing!");
            }
        },
        error:function(){
            alert("Something was wrong!");
        }
    });
}
function getCustomShowInfo()
{
    var customInfo = "";
    var len = arrColumn.length;
    for(var i=0;i<len;i++)
    {
        var sample_el = document.getElementById(arrColumn[i]);
        customInfo += sample_el.checked ? "1" : "0";
    }
    $("#hid_report").val(customInfo);

    return customInfo;
}
//自定义列 结束