/**
 * Created by lsl on 2015/5/15.
 */
//初始化：为各个元素添加事件侦听
$(function(){
    $(".addbs,#addbs .affirm,#addbs .cancel").click(function(){
        $("#display_level").val(1);
        if($('.pop_addbs').css('display')=='none'){
            $('.pop_addbs').show()
        }
        else{
            $('.pop_addbs').hide();
        }
    });
    $("#head_add_project").click(function(){
        set_value_for_new_project();
    });
    //添加修改项目处理 write by wsf
    $("#submit_add_project").click(function(){
        add_project();
    });
    $("#submit_edit_project").click(function(){
        edit_project();
    });
    //添加样本 点击提交按钮触发form表单验证：通过combobox，病人号、表现型的值是否可被正确获取
    $("#project_name").focus(function(){
        $("#project_project_name_tag").text("");
    });
    $("#description").focus(function(){
        $("#project_description_tag").text("");
    });
    //展开病人信息用
    $("#dis_ne").click(function(){
        $("#dis_no").slideDown("slow");
        var case_no = $("#sample_patient_no").val();
        $("#sample_case_no").val(case_no);
        var url = "/get/project/"+case_no+"/ajax/";
        //病案号不为空
        if(case_no){
            $.ajax({
                url:url,
                type:"POST",
                data:{},
                success: function (data) {
                    //病案号存在
                    if(data.status == 1){
                        var result = data.data;
                        var patient_name = result.patient_name;
                        var sex = result.sex;
                        var age = result.age;
                        if(sex == 1){
                            $("#sample_patient_sex").val(1);
                            $("#man").attr("src","/static/images/right_green.png");
                            $("#woman").attr("src","/static/images/right_gray.png");
                            $("#sexNone").attr("src","/static/images/right_gray.png");
                        }else if(sex == 2){
                            $("#sample_patient_sex").val(2);
                            $("#woman").attr("src","/static/images/right_green.png");
                            $("#man").attr("src","/static/images/right_gray.png");
                            $("#sexNone").attr("src","/static/images/right_gray.png");
                        }else{
                            $("#sample_patient_sex").val(0);
                            $("#man").attr("src","/static/images/right_gray.png");
                            $("#woman").attr("src","/static/images/right_gray.png");
                            $("#sexNone").attr("src","/static/images/right_green.png");
                        }
                        if( $("#woman").data("click")){
                            $("#woman").unbind("click");
                        }
                        if( $("#man").data("click")){
                            $("#man").unbind("click");
                        }
                        if( $("#sexNone").data("click")){
                            $("#sexNone").unbind("click");
                        }
                        $("#sample_patient_name").val(patient_name);
                        $("#sample_patient_age").val(age);
                        $("#sample_patient_name").attr("disabled","disabled");
                        $("#sample_patient_age").attr("disabled","disabled");
                        $("#sample_case_no").attr("disabled","disabled");
                    }else
                    //病案号不存在
                    {
                        $("#woman").attr("src","/static/images/right_gray.png");
                        $("#man").attr("src","/static/images/right_gray.png");
                        $("#sexNone").attr("src","/static/images/right_gray.png");
                        if(! $("#woman").data("click")){
                            $("#woman").bind("click",function(){
                                $("#sample_patient_sex").val(2);
                                $("#woman").attr("src","/static/images/right_green.png");
                                $("#man").attr("src","/static/images/right_gray.png");
                                $("#sexNone").attr("src","/static/images/right_gray.png");
                            });
                        }
                        if( !$("#man").data("click")){
                            $("#man").bind("click",function(){
                                $("#sample_patient_sex").val(1);
                                $("#man").attr("src","/static/images/right_green.png");
                                $("#woman").attr("src","/static/images/right_gray.png");
                                $("#sexNone").attr("src","/static/images/right_gray.png");
                            });
                        }
                        if(! $("#sexNone").data("click")){
                            $("#sexNone").bind("click",function(){
                                $("#sample_patient_sex").val(0);
                                $("#man").attr("src","/static/images/right_gray.png");
                                $("#woman").attr("src","/static/images/right_gray.png");
                                $("#sexNone").attr("src","/static/images/right_green.png");
                            });
                        }
                        $("#sample_patient_name").val("");
                        $("#sample_patient_age").val("");
                        $("#sample_patient_name").removeAttr("disabled");
                        $("#sample_patient_age").removeAttr("disabled");
                        $("#sample_case_no").removeAttr("disabled");
                    }
                },
                error: function () {
                    swal("Something was wrong!");
                }
            });
        }
        //病案号为空
        else{
            $("#woman").attr("src","/static/images/right_gray.png");
            $("#man").attr("src","/static/images/right_gray.png");
            $("#sexNone").attr("src","/static/images/right_gray.png");
            if(! $("#woman").data("click")){
                $("#woman").bind("click",function(){
                    $("#sample_patient_sex").val(2);
                    $("#woman").attr("src","/static/images/right_green.png");
                    $("#man").attr("src","/static/images/right_gray.png");
                    $("#sexNone").attr("src","/static/images/right_gray.png");
                });
            }
            if( !$("#man").data("click")){
                $("#man").bind("click",function(){
                    $("#sample_patient_sex").val(1);
                    $("#man").attr("src","/static/images/right_green.png");
                    $("#woman").attr("src","/static/images/right_gray.png");
                    $("#sexNone").attr("src","/static/images/right_gray.png");
                });
            }
            if(! $("#sexNone").data("click")){
                $("#sexNone").bind("click",function(){
                    $("#sample_patient_sex").val(0);
                    $("#man").attr("src","/static/images/right_gray.png");
                    $("#woman").attr("src","/static/images/right_gray.png");
                    $("#sexNone").attr("src","/static/images/right_green.png");
                });
            }
            $("#sample_patient_name").val("");
            $("#sample_patient_age").val("");
            $("#sample_patient_name").removeAttr("disabled");
            $("#sample_patient_age").removeAttr("disabled");
            $("#sample_case_no").removeAttr("disabled");
        }
    });
    //样本为私有样本
    $("#sam_private").click(function(){
        $("#sample_display_level").val(2);
        $("#sam_private img").attr("src","/static/images/right_green.png");
        $("#sam_public img").attr("src","/static/images/right_gray.png");
    });
    //样本为公共样本
    $("#sam_public").click(function(){
        $("#sample_display_level").val(0);
        $("#sam_private img").attr("src","/static/images/right_gray.png");
        $("#sam_public img").attr("src","/static/images/right_green.png");
    });

    //添加样本设置：默认情况下都为私有样本，公共项目除外
    $("#sam_private").click();
    // 加载站内信
    get_inside();
    //轮询站内信，30秒发一次请求
    setInterval(get_inside,30000)
});
//added by lsl 在项目页，点击header中我的项目、公共项目时，无需重新加载页面只需切换tab，修改面包屑用即可
function navigate_to_project(state) {
    if (window.location.href.match("/project/#")) {
        var oldState = window.location.href.split("#")[1];
        if(state == 0) {
            $("ol.breadcrumb li:last").replaceWith("<li><a class='active' href='/project/#0'>我的项目</a></li>");
            $("#bt_my_project").addClass("on").addClass("active");
            $("#bt_public_project").removeClass("on").removeClass("active");
            $("#public_project").removeClass("in active");
            $("#my_project").addClass("in active");
            $("#my_project").load("/project/list/mine/", function () {
                project_model_array[0] = 1;
            });
        }else {
            $("ol.breadcrumb li:last").replaceWith("<li><a  class='active' href='/project/#1'>公共项目</a></li>");
            $("#bt_public_project").addClass("on").addClass("active");
            $("#bt_my_project").removeClass("on").removeClass("active");
            $("#my_project").removeClass("in active");
            $("#public_project").addClass("in active");
            $("#public_project").load("/project/list/public/",function(){
                project_model_array[1] = 1;
            });
        }
    }
    location.assign("/project/#" + state);
}

/*样本用*/
//添加样本
function addSample(){
    /*必填项控制************/
    //样本号
    var sample_id = $("#sample_id").val();
    //病案号
    var case_no = $("#sample_case_no").val();
    //获取临床表征
    var phenotype_no="";
    var $tags=$("#phenotype_tag_div li.tag-cloud");
    for(var i=0;i<$tags.length;i++){
        switch(navigator.appCodeName)
        {
            case "Mozilla"://IE  Firefox
            {
                phenotype_no+=$tags[i].textContent.split("(")[0]+";";
                break;
            }
            default://360？
                phenotype_no+=$tags[i].innerText.split("(")[0]+";";
        }
    }
    if(sample_id==""){
        swal("请输入样本号");
    }else if(case_no ==""){
        swal("请输入病案号");
    }else if(phenotype_no==""){
        swal("请输入临床表征");
    }
    /*必填项控制************/
    /*内容格式控制************/
    else if(/[^0-9a-zA-Z_\-]/g.test(sample_id)){
        swal('样本号输入数据格式不正确！')
    }
    /*内容格式项控制************/
    else{
        var patient_name = $("#sample_patient_name").val();
        var patient_age = $("#sample_patient_age").val();
        var patient_sex = $("#sample_patient_sex").val();
        var subgroup = $("#sample_subgroup").val();
        var add_sample_pro = $('#add_sample_project').val();
        var patient_no = $('#sample_patient_no').val();
        var type = $("#sample_type").val();
        //公共样本还是私有样本
        var display_level = $("#sample_display_level").val();
        var project_no = $("#sample_project_no").val();
        if(add_sample_pro==1){
            project_no=-1;
        }
        $.ajax({
            url: "/sample/add/quick/",
            type: "POST",
            data: {sample_patient_no:patient_no,sample_id:sample_id,sample_type:type,
                sample_display_level:display_level,sample_subgroup:subgroup,sample_phenotype_no:phenotype_no,
                sample_project_no:project_no,sample_case_no:case_no,sample_patient_name:patient_name,sample_patient_age:patient_age,sample_patient_sex:patient_sex},
            success: function(data){
                if(data.success==true){
                    $('#myModal').modal('hide');
                    //清除用户所填信息
                    sampleFormReset();

                    swal("样本添加成功");
                    var get_sample_type = $("#get_sample_type").val();
                    var pro_tab_flag = $("#pro_tab_flag").val();  //根据display_level来判断是我的项目还是公共项目
                    var sample_tab_flag = $("#sample_tab_flag").val();
                    if(pro_tab_flag == 3){
                        //dashborad 页项目更新
                        $("#dashboard_header").load("/dashboard/header/",function(){
                            $("#dashboard_sample").load("/dashboard/sample/",function(){
                            });
                        });
                    }else if(sample_tab_flag=="4"){
                        //dashborad 页项目更新
                        //$("#dashboard_project").children().remove();
                        var new_sameple_no = data.sample_no;
                        if(new_sameple_no != null || new_sameple_no != ''){
                            self.location.href = "/variant/mine/";
                        }
                    } else{
                        //样本页项目基本信息革新
                        if (get_sample_type == "mine") {
                            $("#sample_detection").load("/sample/mine/detection/", function () {
                                //页面内容重新加载
                                $("#basicInfo").load("/project/project_no/mine/" + project_no + "/", function () {
                                });

                            });
                        } else if (get_sample_type == "public") {
                            $("#sample_detection").load("/sample/public/detection/", function () {
                                //页面内容重新加载
                                $("#basicInfo").load("/project/project_no/mine/" + project_no + "/", function () {
                                })
                            });
                        } else {
                            if (add_sample_pro != 1) {
                                $("#sample_detection").load('/sample/mine/detection/' + project_no + '/', function () {
                                    //页面内容重新加载
                                    $("#basicInfo").load("/project/project_no/mine/" + project_no + "/", function () {
                                    })
                                });
                            }
                        }
                    }
                }
                else{
                    $('#myModal').modal('hide');
                    swal(data.result.message);
                }
            },
            error: function () {
                $('#myModal').modal('hide');
                swal("Something was wrong!");
            }
        });
    }
}
function add_sample_project(flag){
    $('#add_sample_project').val(flag);
}
//added by lsl  添加表型云标签
function add_phenotype_tag_cloud(Tag){
    var tagClass = "tag-cloud";
    var colorsCSS=new Array(" orange"," darkBlue"," aqua"," brilliantBlue"," red");
    tagClass+=colorsCSS[parseInt(Math.random()*5)];
    $("#tag-info_phenotype_cloud").append('<li onclick="$(this).remove();" class="'+tagClass+'">'+Tag+'</li>')
}
//清除样本表单
function sampleFormReset(){
    document.getElementById("sample_form").reset();
    $("#dis_no").hide();
    $("#phenotype_tag_div ul.tag-info").empty();
}
/*样本用*/

/*项目用*/
//添加项目时清空表单的值
function set_value_for_new_project(){
    $("#myModalLabel_project").text("新建项目");
    $('#project_name').attr("readonly",false);
    $('#description').attr("readonly",false);
    $('#display_level_readonly').val(1);
    set_pro_display_level(1);
    $("#project_no").val("");
    $("#project_name").val("");
    $("#description").val("");
    $("#display_level").val(1);
    $("#submit_add_project").show();
    $("#submit_edit_project").hide();
}
//新建项目
function add_project(){
    var project_name = $("#project_name").val();
    var description = $("#description").val();
    var display_level = $("#display_level").val();
    var project_no = $("#project_no").val();
    var pro_tab_flag = $("#pro_tab_flag").val();
    //根据project_no来判断提交action,project_no存在则更新，不存在则新规
    if(project_name.trim() == ""){
        //sweetAlert("项目名称不能为空!");
        $("#project_project_name_tag").children().remove();
        $("#project_project_name_tag").append("<span><img src='/static/images/redTip.png'>项目名称不能为空!</span>");

        //$("#project_name").focus();
        return false;
    }else if(project_name.trim().length > 50){
        //sweetAlert("项目名称最大长度为50！");
        $("#project_project_name_tag").children().remove();
        $("#project_project_name_tag").append("<span><img src='/static/images/redTip.png'>项目名称最大长度为50!</span>");
        //$("#project_name").focus();
        return false;
    }
    if(description.trim() == ""){
        //sweetAlert("描述不能为空！");
        $("#project_description_tag").children().remove();
        $("#project_description_tag").append("<span><img src='/static/images/redTip.png'>项目描述不能为空!</span>");
        //$("#description").focus();
        return false;
    }else if(description.trim().length > 255){
        //sweetAlert("描述最大长度为255！");
        $("#project_description_tag").children().remove();
        $("#project_description_tag").append("<span><img src='../static/images/redTip.png'>项目描述不能为空!</span>");
        //$("#description").focus();
        return false;
    }
    //判断是我的项目还是公共项目
    var pro_tab_flag = $("#pro_tab_flag").val();  //根据display_level来判断是我的项目还是公共项目
    var url = "/project/add/";

    $.ajax({
        url: url,
        async:false,
        type: "POST",
        data: {project_no:project_no,project_name:project_name,description:description,display_level:display_level},
        success: function (data) {
            /*将基本信息置为不可编辑状态 结束*/
            if(data.success == true){
                $('#addbss2').modal('hide');

                //var new_project_no = data.project_no;
                //if(new_project_no != '')self.location.href = "/sample/project/"+new_project_no+"/";

                if(pro_tab_flag=="3"){
                    //dashborad 页项目更新
                    //$("#dashboard_project").children().remove();
                    $("#dashboard_header").load("/dashboard/header/",function() {
                        $("#dashboard_project").load("/dashboard/project/", function () {
                        });
                    });
                }else if(pro_tab_flag=="4"){
                    //dashborad 页项目更新
                    //$("#dashboard_project").children().remove();
                    sweetAlert('添加项目成功！');
                    //var new_project_no = data.project_no;
                    //if(new_project_no != '')self.location.href = "/sample/project/"+new_project_no+"/";
                } else {
                    if (pro_tab_flag == 1) {
                        $("#my_project").load("/project/list/mine/", function () {
                        });
                    } else {
                        $("#public_project").load("/project/list/public/", function () {
                        });
                    }
                }
            }
            else{
                sweetAlert(data.result.message);
            }
        },
        error:function(){
            sweetAlert("Something was wrong!");
        }
    });
}
//修改项目
function edit_project(){
    var project_name = $("#project_name").val();
    var description = $("#description").val();
    var display_level = $("#display_level").val();
    var project_no = $("#project_no").val();
    var pro_tab_flag = $("#pro_tab_flag").val();
    //根据project_no来判断提交action,project_no存在则更新，不存在则新规
    var url = "/project/"+project_no+"/update/";

    if(project_name.trim() == ""){
        sweetAlert("项目名称不能为空！");
        $("#project_name").focus();
        return false;
    }else if(project_name.trim().length > 50){
        sweetAlert("项目名称最大长度为50！");
        $("#project_name").focus();
        return false;
    }
    if(description.trim() == ""){
        sweetAlert("描述不能为空！");
        $("#description").focus();
        return false;
    }else if(description.trim().length > 255){
        sweetAlert("描述最大长度为255！");
        $("#description").focus();
        return false;
    }

    //判断是我的项目还是公共项目
    var pro_tab_flag = $("#pro_tab_flag").val();  //根据display_level来判断是我的项目还是公共项目
    $.ajax({
        url: url,
        async:false,
        type: "POST",
        data: {project_no:project_no,project_name:project_name,description:description,display_level:display_level},
        success: function (data) {
            /*将基本信息置为不可编辑状态 结束*/
            if(data.success == true){
                $('#addbss2').modal('hide');
                //self.location.href = "/sample/project/"+project_no+"/";

                var row = $("#id" + project_no).children().select("span");
                $("#project_name").val(row.eq(0).children().select("a").eq(0).attr("title",project_name));
                $("#description").val(row.eq(1).attr("title",description));

                if(project_name.length > 10){
                    project_name = project_name.substr(0,10) + "...";
                }
                if(description.length > 20){
                    description = description.substr(0,20) + "...";
                }

                var row = $("#id"+project_no).children().select("span");
                row.eq(0).children().select("a").eq(0).text(project_name);
                row.eq(1).text(description);
                $("#pro_display_level"+project_no).val(display_level);
            }
            else{
                sweetAlert(data.result.message);
            }
        },
        error:function(){
            sweetAlert("Something was wrong!");
        }
    });
}
//项目删除
function DeleteProject(){
    var page;
    var project_no =  $("#project_no_delete").val();
    var display_level = $("#display_level_delete").val();
    var project_name = $("#project_name").val();
    var pro_tab_flag = $("#pro_tab_flag").val();
    if(pro_tab_flag == "1"){
        page = $("#page_change_page").val();
    }else{
        page = $("#pub_page_change_page").val();
    }

    var search_project_name = $("#project_search").val();
    if(search_project_name == '')search_project_name = "None";
    var flag=$("#delete_project").val();
    var flag1=$("#delete_sample").val();
    if(flag == 1){
        if(flag1==2){
            var del_sam=true;
        }
        else{
            var del_sam=false;
        }
        var row = $("#id"+project_no).children().select("td");
        var project_name = row.eq(0).children().select("a").eq(0).html();
        var url = "/project/delete_ajax/";

        $.ajax({
            url: url,
            type: "POST",
            data: {project_no: project_no,del_sam:del_sam},//project_search: project_name
            success: function (data) {
                if(data.success == true) {
                    if(pro_tab_flag == 1){
                        $("#my_project").load("/project/list/mine/",function(){
                        });
                    }
                }
            },
            error: function(){
                swal("Something was wrong!");
            }
        });
    }

    return false;
}
//删除用户授权
function del_project_user(event,account,project_no, role){
    var flag = confirm('是否删除此用户？');
    if(flag == true){
        var url = "/delete/project/account/"+project_no+"/"+account+"/"+role+"/";
        $.ajax({
            url:url,
            type:"POST",
            data:{project_no:project_no,account:account,role:role},
            success:function(data){
                $(event.target).parents("tr").remove();
                sweetAlert("项目删除用户成功！");
            },
            error:function(){
                swal("Something was wrong!");
            }
        });
    }
}
//*****************************************************************************
//功能：设置添加和编辑项目的项目属性
//参数：属性id obj ,1 私有 0 共有
//作者：王世锋 时间：2015/07/04
//******************************************************************************
function set_pro_display_level(obj){
    var display_level_readonly = $('#display_level_readonly').val();
    if(display_level_readonly == 1){
        if(obj==1){
            $("#display_level").val(1);
            $("#pro_img_label01_a").addClass("proCapacity_green");
            $("#pro_img_label01_a").removeClass("proCapacity_gray");
            $("#pro_img_label02_a").addClass("proCapacity_gray");
            $("#pro_img_label02_a").removeClass("proCapacity_green");
            $("#pro_img_label02").attr("src","/static/images/right_gray.png");
            $("#pro_img_label01").attr("src","/static/images/right_green.png");
            $("#project_display_level_tag").children().remove();
            var img = "<img class=\"pro_blue_tip\" src=\"/static/images/proTip.png\">";
            var span="<span>私有项目其他人将无法搜索到</span>";
            $("#project_display_level_tag").append(img);
            $("#project_display_level_tag").append(span);
        }else{
            $("#display_level").val(0);
            $("#pro_img_label01_a").addClass("proCapacity_gray");
            $("#pro_img_label01_a").removeClass("proCapacity_green");
            $("#pro_img_label02_a").addClass("proCapacity_green");
            $("#pro_img_label02_a").removeClass("proCapacity_gray");
            $("#pro_img_label01").attr("src",'/static/images/right_gray.png');
            $("#pro_img_label02").attr("src",'/static/images/right_green.png');
            $("#project_display_level_tag").children().remove();
            var img = "<img class=\"pro_blue_tip\" src=\"/static/images/proTip.png\">";
            var span="<span>公开项目将对所有人开放</span>";
            $("#project_display_level_tag").append(img);
            $("#project_display_level_tag").append(span);
        }
    }else{
        $("#project_display_level_tag").children().remove();
        var img = "<img class=\"pro_blue_tip\" src=\"/static/images/redTip.png\">";
        var span="<span>项目属性您没有权限修改！</span>";
        $("#project_display_level_tag").append(img);
        $("#project_display_level_tag").append(span);
    }
}
/*项目用*/

/*站内信*/
<!-- Author Zhouheng Begin . taken over and maintained by lsl from 20150707-->
//更新header站内信数目,为0时显示无信息提示div  added by lsl
function refresh_unread_nums(){
    $("#m_unread_num").text($("#m_show_unread>a").length);
    if($("#m_show_unread a").length===0){
        $("#m_unread_num").hide();
        $("#m_no_msg").show();
    }else{
        $("#m_unread_num").show();
        $("#m_no_msg").hide();
    }
}
//邮箱邀请
function request_other(){
    var email=$("#m_email").val();
    var content = $("#m_content").val();
    var re= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if(!re.test(email)){
        sweetAlert("您输入的邮箱格式不正确，请重新输入");
        $("#m_email").focus().select();
        return false;
    }
    if(content.length <= 0){
        sweetAlert("输入的内容不能为空");
        return false;
    }
    var m_url = "/email/";
    $.ajax({
        url: m_url,
        type: "POST",
        async: true,
        data: {email:email,content:content},
        success: function (data) {
            var dataObject = JSON.parse(data);
            if(dataObject.status == 000){
                swal({
                    title: "已邀请您的朋友" + email,
                    text: "窗口将在3秒后消失",
                    type: "success",
                    timer: 3000,
                    showConfirmButton: false
                });
                $("#m_email").val("");
                $("#m_content").val("");
            }
            else{
                sweetAlert(dataObject.message);
            }
        },
        error:function(xhr){
            sweetAlert("邀请失败！错误信息："+xhr.statusText + "错误代码："+xhr.status);
        }
    });

}
//清除已读站内信
function remove_inside(id){
    //全部设置为已读
    if(id == null) {
        $("#m_show_unread a").remove();
    }
    //将单独一个信息设置为已读
    else{
        $("#m_msg_"+ id).slideUp();
        $("#m_msg_"+ id).remove();
    }
    refresh_unread_nums();
}
//初始化时添加站内信到弹窗面板
function add_inside(obj_arr){
    var father = document.getElementById("m_show_unread");
    for(var i=0;i<obj_arr.length;i++) {
        var obj = obj_arr[i];
        var m_a = document.createElement("a");
        m_a.id = "m_msg_" + obj.msgNo;
        m_a.onclick=function(){
            window.location.href='/message/';
        };
        m_a.className = "list-group-item";
        var content = '<table  width="100%" onMouseOver="show_right('+obj.msgNo+')" onMouseOut="hide_right('+obj.msgNo+')"><tr><td rowspan="2" width="52px;"><img class="icon-circularznTwo" src="/static/images/user02.png" width="42px" height="42px"></td><td>';
        content += obj.subject;
        content += '</td><td rowspan="2"><button id="m_set_read_'+obj.msgNo+ '" class="btn pull-right icon-circularzn" onclick="set_read(event,'+obj.msgNo +');" style="display:none"><img src="/static/images/glyphicon-ok.png" title="标为已读"/></button></td></tr><tr><td class="addtime">';
        content += obj.date_send;
        content += '</td></tr></table>';
        m_a.innerHTML = content;
        father.appendChild(m_a);
    }
    refresh_unread_nums();
}
//获得格式化的本地当前时间
var lastTime="2015-8-5 09:00:00";//初始化值，记录上一次请求的站内信截止时间，下次请求这个时间之后的
function updateTime(){
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    if(month<10)
        month="0"+month;
    var day=date.getDate();
    if(day<10)
        day="0"+day;
    var hour=date.getHours();
    if(hour<10)
        hour="0"+hour;
    var minute=date.getMinutes();
    if(minute<10)
        minute="0"+minute;
    var second=date.getSeconds();
    if(second<10)
        second="0"+second;
    var dateString=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
    lastTime=dateString;
}
//初始化时获取站内信数据
function get_inside(){
    $.ajax({
        url: "/message/receive/",
        type: "GET",
        async: true,
        data:{"read":"unread","date_send":lastTime},
        success: function (data) {
            var dataObject = JSON.parse(data);
            if(dataObject.status == 001){
                var len = dataObject.data.length;
                if(len)
                    add_inside(dataObject.data);
                else
                    $("#m_no_msg").show();
                //更新最近的访问时间
                updateTime();
            }
            else{
                sweetAlert(dataObject.message);
            }
        },
        error:function(xhr){
            $("#m_no_msg").html("<a href='javascript:;' onclick='get_inside()'>加载失败，点击刷新</a>");
        }
    });
}
//将站内信设置为已读
function set_read(event,msgNo){
    //阻止事件冒泡
    var ev = event || window.event;
    if(ev.stopPropagation){
        ev.stopPropagation();
    }
    else if(window.event){
        window.event.cancelBubble = true;//兼容IE
    }
    var m_url = "/message/read/";
    if(arguments.length==2){
        m_url = "/message/read?msgNo=" + msgNo;
    }
    $.ajax({
        url: m_url,
        type: "GET",
        async: false,
        success: function (data) {
            var dataObject = JSON.parse(data);
            if(dataObject.status == 001){
                var urlParts=location.href.split("/");
                if(m_url == "/message/read/"){
                    remove_inside();
                    swal({
                        title: "已成功将"+dataObject.data+"条信息标记为已读",
                        text: "窗口将在2秒后消失",
                        type: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    //如果在站内信页面,要呼应更新页面
                    if(urlParts[urlParts.length-2]=="message"){
                        static_changeToRead();
                    }
                } else{
                    remove_inside(msgNo);
                    //如果在站内信页面//如果在站内信页面,要呼应更新页面
                    if(urlParts[urlParts.length-2]=="message"){
                        //setReadSingle(document.getElementById("m_r_"+id),id);
                        static_changeToRead(msgNo);
                    }
                }
            }
            else{
                sweetAlert(dataObject.message);
            }
        },
        error:function(xhr){
            swal("标记失败！错误信息："+xhr.statusText + "错误代码："+xhr.status);
        }
    });
}
//鼠标移动到站内信上时，显示“勾选为已读”对号图标
function show_right(id){
    $("#m_set_read_" + id).show();
}
//鼠标移开站内信时，隐藏“勾选为已读”对号图标 d
function hide_right(id){
    $("#m_set_read_" + id).hide();
}
//新建站内信（弹窗用）(！！！!多用户，英文分号分离)
function sendMessage(obj){
    var receiver=$("#new_receiver").val();
    var subject=$("#new_subject").val();
    var content=$("#new_content").val();
    if(receiver=="")
        swal("请填写收件人！");
    else if(subject=="")
        swal("请填主题！");
    else if(content=="")
        swal("请填写回复内容！");
    else{
        //用户名只能是字母、数字、下划线  正则表达式替换
        receiver= receiver.replace(/[^a-z0-9_\u4e00-\u9fa5]/gi, ',');
        $.ajax({
            url: "/message/",
            type: "POST",
            async: true,
            data: {subject: subject, content: content, to_list_str: receiver},
            success: function (data) {
                obj.disabled = false;
                var dataObject = JSON.parse(data);
                if (dataObject.status == 001) {
                    //用户不存在
                    if(dataObject.data.no_exist_user.length!=0&&dataObject.data.exist_user.length==0){
                        swal( "用户\" " + dataObject.data.no_exist_user +"\" 不存在");
                    }
                    //部分存在
                    else if(dataObject.data.no_exist_user.length!=0&&dataObject.data.exist_user.length!=0){
                        swal( "用户\" " + dataObject.data.no_exist_user +"\" 不存在,已将信息发送至"+dataObject.data.exist_user);
                    }
                    //用户存在
                    else{
                        swal({
                            title: "已将信息发送至" + receiver,
                            text: "窗口将在2秒后消失",
                            type: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                        //清空并隐藏发信弹窗
                        $("#new_receiver").val("");
                        $("#new_subject").val("");
                        $("#new_content").val("");
                        $("#new_close").click();
                    }
                    //无刷新更新收件箱  若是在站内信页面
                    var urlParts=location.href.split("/");
                    if(urlParts[urlParts.length-2]=="message"){
                        static_addSendItem(dataObject.data.MsgNo,receiver,subject,content,"2015-07-24 12:00:00");
                    }
                }
                else {
                    sweetAlert(dataObject.message);
                }
            },
            error: function (xhr) {
                obj.disabled = false;
                sweetAlert("回复失败！错误信息：" + xhr.statusText + "错误代码：" + xhr.status);
            }
        });
    }
}
<!-- Author Zhouheng Begin . taken over and maintained by lsl from 20150707-->
/*站内信*/

/*加载等待用 Created by lsl on 2015/6/23.*/
//用于生成等待图标的随机id
var i=0;
//显示等待图标,参数$obj为需要显示的空间，为jQuery对象
function showWait($obj){
    var scrollTop = $(document).scrollTop();
    var scrollLeft = $(document).scrollLeft();
    if(arguments.length==1){//在容器$obj中央显示
        $wait=$("#wait").clone();
        $wait.removeAttr("id")
            .attr("id","wait"+i)
            .appendTo($obj)
            //relative
            .css({"left":($obj.width()- $("#wait").width())/2 ,
                "top":($obj.height()-$("#wait").height())/2})
            .show();
        i++;
    }else{//在屏幕中央显示
        var top = ($(window).height() - $("#wait").height())/2;
        var left = ($(window).width() - $("#wait").width())/2;
        $("#wait").css({"left":left + scrollLeft,"top":top + scrollTop})
            .show();
    }
}
//隐藏等待图标，参数要和显示函数已一致
function hideWait($obj){
    if(arguments.length){//将容器$obj中央的等待图标隐藏
        $obj.find(".wait").hide().remove();
    }else{//将屏幕中央的等待图标隐藏
        $("#wait").hide();
    }
}
/*加载等待用 Created by lsl on 2015/6/23*/
