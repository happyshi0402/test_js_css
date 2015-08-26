// JavaScript Document
en_show = new Array('sample_id', 'case_no', 'patient_name', 'age', 'sex', 'subgroup', 'type', 'seq', 'stage', 'display_level', 'date_created')
ch_show = new Array('样本号', '病案号', '病人姓名', '年龄','性别', '亚组', '样本类型', '测序类型', '进度', '显示级别', '创建日期')
//高级搜索页中的输入框“叉号”内容清空的js功能实现  Start
$(document).ready(function(){
    $(".deletd_disc").click(function(){
        $("#bigsearchbox").val("");
    });
});
//高级搜索页中的输入框“叉号”内容清空的js功能实现  End

//高级搜索页中的添加与删除一行的js功能实现
//添加或删除一行内容的代码 Start
var searchNode;  //var一个变量
window.onload = function(){

    $(".minusBtn").click(function(){
        $(this).parent().remove();
    });  //删除一行

    $(".dropdownmenu").hide();
    $(".btn-default").click(function(){
        $(this).next().slideToggle();
    });  //给新添加的每一行的下拉列表框进行的默认展开项选择

    $(".addBtn").click(function(){
        var newNode = searchNode.clone(true);
        $(".searchBox").append(newNode);
        newNode.html();
        var i = 1;

        //$("#input_text2").replaceWith("<input type='hidden' class='form-control' id='input_text22' oninput='change()' >");



    });
    //searchNode = $(".searchBox >div +div").clone(true);  //添加两行的节点 div+div 等于div的next div
    searchNode = $(".searchBox >.addBox").clone(true);  //添加节点
    //添加一行

}//=================================================================
//添加或删除一行内容的代码 End
function change() {
    var result1 = document.getElementsByName("input_text1");
    var equal = document.getElementsByName("equal-circle");
    var search = document.getElementsByName("search-input");
    var result2 = document.getElementsByName("input_text2");
    var and = document.getElementsByName("and_button");
    var result3 = document.getElementsByName("input_text3");
    var equal1 = document.getElementsByName("equal-circle1");
    var els = document.getElementsByName("input_name4");
    var ellen = els.length;
    var result = "((" + result1[0].value + " " + equal[0].value + " " + search[0].value + ") " + result2[0].value +" "+ result3[0].value + " " + equal1[0].value + " " + els[0].value + ") ";
    var equal;
    for (var i = 1; i < ellen; i++) {
        equal[i] = result2[i].value+" " + result3[i].value + " " + equal1[i].value + " " + els[i].value + ") ";
        //if(result2[i].value=="" || result3[i].value==""||equal1[i].value==""||els[i].value=="") {
        //    continue;
        //}
        result= "("  + result + equal[i];
    }
    result = suffix + result;
    $("#bigsearchbox").val(result);


    return false;
}
var suffix = "";
function load_history(id)
{
    var query_name = id.substr(3);
    var m_url  = "/sample/query/history/"+query_name+"/";
    $.ajax({
        url: m_url,
        type: "GET",
        async: false,
        success: function (data) {
            if(data.success == false){
                alert(data);
            }else {
                alert(data);
                var dataObject = JSON.parse(data);
                var query_sql = "query_sql";
                var value = dataObject.data[0].query_sql;
                //if (dataObject.data.message == 1) {
                var ch_len = ch_show.length;
                for(var i=0;i<ch_len;i++) {
                    value = value.replace(en_show[i],ch_show[i])
                }
                alert(value);
                $("#bigsearchbox").val(value);
                suffix = value + " AND ";


            }
        },
        error:function(xhr){
            alert("Search Fail:" + xhr.statusText + xhr.status);
        }
    });
}
//把下拉框内的option值赋值给上层的input输入框 Start
$("select").change(function(){
    $(this).prev().val($(this).val())
    change()
});



//把下拉框内的option值赋值给上层的input输入框 End
//等于号模块 后面的下拉菜单赋值 Start
$(".search-mode").change(function(){
    $("#search-input").val($(this).val());
    $("#search-input").val($(this).val());
});
//等于号模块 后面的下拉菜单赋值 Ends

//将高级搜索页中的searchBox模块所选中的值赋值给input输入框的JS实现  start
//将高级搜索页中的searchBox模块所选中的值赋值给input输入框的JS实现  End



//$("#search_jq").click(function(){
//    var sql ="AND "+ $("#bigsearchbox").val();
//    var en_len = en_show.length;
//    for(var i=0;i<en_len;i++)
//    {
//        sql = sql.replace(ch_show[i],en_show[i]);
//        sql = sql.replace("(","");
//        sql = sql.replace(")","|");
//    }
//    m_data = "advanced_query=  " + sql;
//    alert(sql);
//    if(sql==""){
//        alert("请输入至少一个查询条件！")
//        return;
//    }
//    var m_url  = "/sample/advanced/query/";
//    $.ajax({
//        url: m_url,
//        type: "POST",
//        async: false,
//        data: m_data,
//        success: function (data) {
//            if(data.success == false){
//                alert(data);
//            }else{
//                alert(data);
//                $("#search_ip").val(data.length)
//
//            }
//        },
//        error:function(xhr){
//            alert("Search Fail:" + xhr.statusText + xhr.status);
//        }
//    });
//});

//保存按钮的响应事件
$("#save_but").click(function(){
    var query_sql =  $("#bigsearchbox").val();
    var query_name =  $("#input_text6").val();
    var view_condition="";
    var en_len = en_show.length;
    for(var i=0;i<en_len;i++)
    {
        query_sql = query_sql.replace(ch_show[i],en_show[i])
    }
    var m_data = "query_name=" + query_name+"&view_condition="+view_condition+"&query_sql="+query_sql;

    var m_url  = "/sample/query/history/";
    $.ajax({
        url: m_url,
        type: "POST",
        async: false,
        data:m_data,
        success: function (data) {
            if(data.success == false){
                alert(data);
            }else{
                alert(data);
                $("#vagaaModal").remove();
                location.reload();
                alert("保存成功！")
            }
        },
        error:function(xhr){
            alert("Search Fail:" + xhr.statusText + xhr.status);
        }
    });
});


$("#analysis_a").click(function(){
    alert("保存成功！");
});
$("#history").change(function(){
    $(".history_att").remove();
    var history = $("#history").val();
    var project_disease = $("#project_disease").val();
    $.ajax({
        url: "/advancedsearch/"+history+"/"+project_disease+"/",
        type: "POST",
        success: function (data) {
            var result = data;
            console.log(result);
            for(var i in result){
                $("#juery").append("<option class='history_att' value="+i+">"+ result[i] +"</option>")
            }
        }
    });
});
$(".testabc").change(function(){
    $(".history_att1").remove();
    var history = $(".testabc").val();
    var project_disease = $("#project_disease").val();
    $.ajax({
        url: "/advancedsearch/"+history+"/"+project_disease+"/",
        type: "POST",
        success: function (data) {
            var result = data;
            console.log(result);
            var els = document.getElementsByName("input_name4");
            var result3 = document.getElementsByName("input_text3");
            var ellen = els.length;
            for (var i = 1; i < ellen; i++) {
                //alert(result3[i].value)
            }
            for(var b in result){
                $(".testabcs").append("<option class='history_att1' value="+b+">"+ result[b] +"</option>")
            }
        }
    });
});
//function droupwn_add(){
//    var result3 = document.getElementsByName("input_text3");
//    var equal1 = document.getElementsByName("equal-circle1");
//    var els = document.getElementsByName("input_name4");
//    var ellen = els.length;
//    alert(ellen)
//    //result3[ellen].addClass("tes" + ellen)
//    alert(result3[0].value)
//    $(".tes"+ellen).remove();
//    var history = $(".testabc").val();
//    $.ajax({
//        url: "/advancedsearch/"+history+"/",
//        type: "POST",
//        success: function (data) {
//            var result = data;
//            console.log(result);
//            var els = document.getElementsByName("input_name4");
//            var result3 = document.getElementsByName("input_text3");
//            var ellen = els.length;
//            for (var i = 1; i < ellen; i++) {
//                //alert(result3[i].value)
//            }
//            for(var b in result){
//                $(".tes"+ellen).append("<option class='history_att1'>"+ result[b] +"</option>")
//            }
//        }
//    });
//}
$("#search_jq").click(function(){
    var id = $("#juery").val();
    var value = $("#input_sec").val();
    if(id==""|value==""){
        swal("请输入至少一个查询条件！");
        return;
    }
    var m_url  = "/advancedsearch/run/";
    $.ajax({
        url: m_url,
        type: "POST",
        async: false,
        data:{id:id,value:value},
        success: function (data) {
            if(data.success == false){
                alert(data['patient_no']);
            }else{
                alert(data);
                $("#search_ip").val(data.length)

            }
        },
        error:function(xhr){
            alert("Search Fail:" + xhr.statusText + xhr.status);
        }
    });
});