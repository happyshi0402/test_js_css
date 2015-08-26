/**
 * Created by liuyiqi on 2015/7/4.
 */
var user_info;
var list_city;
$(document).ready(function () {
    //******************************************登录名***********************************************
    var error = false;
//老密码的格式验证
    $("#oldpass").focus(function () {
        showTip('oldpass', '请输入当前密码！')
    });
    $("#oldpass").blur(function () {

        var oldpass = $("#oldpass").val();
        if (oldpass == '') {
            showError('oldpass', '当前密码不能为空！');
            error = true;
            return;
        }
        else {
            showOk('oldpass');
        }
    });
//新密码的格式验证
    $("#newpass").focus(function () {
        showTip('newpass', '密码由6-12位半角字符组成，区分大小写（不能是9位以下纯数字，不能包含空格）。')
    });
    $("#newpass").blur(function () {
        var newpass = $("#newpass").val();
        if (newpass == '') {
            showError('newpass', '新密码不能为空！');
            error = true;
        }
        if (regPsw(newpass)) {
            showOk('newpass');
        } else {
            showError('newpass', '格式错误！');
            error = true;
        }
    });
//再次输入新密码的验证
    $("#newpassAgain").focus(function () {
        showTip('newpassAgain', '请再次输入新密码！');
    });
    $("#newpassAgain").blur(function () {
        var newpass = $("#newpass").val();
        var newpassAgain = $("#newpassAgain").val();
        if (newpassAgain != newpass) {
            showError('newpassAgain', '与输入的新密码不一致！');
            error = true;
        }
        else if (newpassAgain == '') {
            return;

        } else {
            showOk('newpassAgain');
        }
    });
//点击提交按钮的事件
    $("#submit_loginName").click(function () {
        error = false;
        $("#oldpass").blur();
        $("#newpass").blur();
        $("#newpassAgain").blur();

        if (!error) {
            var oldpass = $("#oldpass").val();
            var newpass = $("#newpass").val();
            var pwd = {oldpass: oldpass, newpass: newpass}
            $.ajax({
                url: "/change/password/",
                type: "POST",
                data: pwd,
                success: function (data) {
                    var jsonData = eval("(" + data + ")");
                    //修改成功
                    if (jsonData.status == 0) {
                        sweetAlert(jsonData.message);
                        $("#login-name").collapse("hide");
                    }
                    else if (jsonData.status == 102) {
                        showError('oldpass', '当前密码错误！')
                    }
                    else {
                        showError('submitPass', jsonData.message)
                    }
                },
                error: function (xhr) {
                    sweetAlert("Search Fail:" + xhr.statusText + xhr.status);
                }
            });
        }
    });

    //******************************************个人资料***********************************************
    $("#university").blur(function () {
        var str_eduinfo = $("#university").val();
        if (str_eduinfo.length > 14) {
            showError('university', '不能超过13个字！');
            error = true;
        }
        else if (str_eduinfo == '') {
            showError('university', '教育信息不能为空！');
            error = true;
        }
        else {
            $("#universityTip").css({"display": "none"});
        }
    });
    $("#institute").blur(function () {
        var str_work = $("#institute").val();
        if (str_work.length > 41) {
            showError('institute', '不能超过40个字！');
            error = true;
        }
        else if (str_work == '') {
            showError('institute', '工作单位不能为空！');
            error = true;
        }
        else {
            $("#instituteTip").css({"display": "none"});

        }
    });
    $("#personal_profile").blur(function () {
        var str_resume = $("#personal_profile").val();
        if (str_resume.length > 91 || str_resume.length < 10) {
            showError('personal_profile', '字数范围为10至90字！');
            error = true;
        }
        else if (str_resume == '') {
            showError('personal_profile', '个人简介不能为空！');
            error = true;
        }
        else {
            $("#personal_profileTip").css({"display": "none"});
        }
    });
    //点击提交按钮的事件
    $("#submit_personalData").click(function () {
        error = false;
        $("#university").blur();
        $("#institute").blur();
        $("#personal_profile").blur();

        if (!error) {
            //此处应为ajax
            var formdata = new FormData(document.forms.namedItem("personal_data_form"));
            $.ajax({
                type: "POST",
                url: "/update/user/info/",
                data: formdata,
                cache: false,
                contentType: false,    //告诉jQuery不要去设置Content-Type请求头
                processData: false,    //告诉jQuery不要去处理发送的数据
                success: function (data) {
                    var jsonData = eval("(" + data + ")");
                    if (jsonData.status == 2) {
                        sweetAlert(jsonData.message);
                        $('#user_personal_profile').text($("#personal_profile").val());
                        $("#personal_data").collapse("hide");
                    }
                    else {
                        sweetAlert(jsonData.message);
                    }
                },
                error: function (xhr) {
                    sweetAlert("Search Fail:" + xhr.statusText + xhr.status);
                }
            });
        }
    });
    //******************************************头像上传***********************************************
    $("#upfile").change(function () {
        var formdata = new FormData(document.forms.namedItem("upload_form"));
        if (this.value) {
            $.ajax({
                type: "POST",
                url: "/user/info/avatar/",
                data: formdata,
                cache: false,
                contentType: false,    //告诉jQuery不要去设置Content-Type请求头
                processData: false,    //告诉jQuery不要去处理发送的数据
                success: function (data) {
                    $("#user_avatar2").attr("src", data);
                    $("#user_avatar").attr("src", data);
                },
                error: function (xhr) {
                    sweetAlert("Search Fail:" + xhr.statusText + xhr.status);
                }
            });
        }

    });
    //保存到数据库
    $("#save_avatar").click(function () {
        var iamgeUrl = $("#user_avatar2").attr("src");
        var imageUrlData = "avatar=" + iamgeUrl;
        $.ajax({
            type: "PUT",
            url: "/user/info/avatar/",
            data: imageUrlData,
            success: function (data) {
                var jsonData = eval("(" + data + ")");
                if (jsonData.status == 2) {
                    sweetAlert("修改头像成功！")
                    $("#head-portrait").collapse("hide");
                }
                else {
                    sweetAlert(jsonData.message)
                }
            },
            error: function (xhr) {
                sweetAlert("Search Fail:" + xhr.statusText + xhr.status);
            }
        });
    });
    //******************************************证件资料***********************************************
    $("#real_name").focus(function () {
        showTip('real_name', '请填写你的真实姓名，认证后不能修改。');
    });
    $("#real_name").blur(function () {
        var str_name = $("#real_name").val();
        if (isCardName(str_name)) {
            showOk('real_name');
        }
        else {
            showError('real_name', '格式不对，姓名是2-15字的汉字！');
            error = true;
        }
    });
    $("#id_value").focus(function () {
        showTip('id_value', '请填写你的身份证号码，认证后不能修改。')
    });
    $("#id_value").blur(function () {
        var str_card = $("#id_value").val();
        if (isIdCard(str_card)) {
            showOk('id_value');
        }
        else {
            showError('id_value', '证件格式不对！');
            error = true;
        }
    });
    //点击提交按钮的事件
    $("#submit_certificate").click(function () {
        error = false;
        $("#real_name").blur();
        $("#id_value").blur();
        if (!error) {
            var formdata = new FormData(document.forms.namedItem("certificate_form"))
            $.ajax({
                type: "POST",
                url: "/user/info/id/",
                data: formdata,
                cache: false,
                contentType: false,    //告诉jQuery不要去设置Content-Type请求头
                processData: false,    //告诉jQuery不要去处理发送的数据
                success: function (data) {
                    console.log(data)
                    var jsonData = eval("(" + data + ")");
                    if (jsonData.status == 2) {
                        sweetAlert('证件信息修改成功！');
                        var html_str = '<p>证件信息</p>-姓名：' + $("#real_name").val() + '  身份证号：' + $("#id_value").val() + '<span class="pull-right text-pink">不可编辑</span>'
                        $("#user_certificate").html(html_str)
                        $("#certificate").hide();
                    } else {
                        sweetAlert(jsonData.message);
                    }
                },
                error: function (xhr) {
                    sweetAlert("Search Fail:" + xhr.statusText + xhr.status);
                }
            });
        }
    });
    //******************************************电子邮箱***********************************************
    $("#mail").blur(function () {
        var str_mail = $("#mail").val();
        if (isEmail(str_mail)) {
            showOk('mail');
        }
        else {
            showError('mail', '邮箱格式错误！');
            error = true;
        }
    });
    //点击提交按钮的事件
    $("#submit_mail").click(function (event) {
        error = false;
        $("#mail").blur();
        if (!error) {
            //此处应为ajax
            sweetAlert('电子邮箱填写完成！');
        }
    });


    //*******************LSL*********************app RUN 进入我的分析tab*******************************
    if (window.location.href.split("#")[1] == "2") {
        $("#myTab>li").removeClass("active");
        $("#myTab>li:eq(2)").addClass("active");
        $("#myTabContent>div").removeClass("in active");
        $("#myTabContent>div:eq(2)").addClass("in active");
    }
    //******************************************初始化***********************************************

    $.get('/personal/user_info_conf/', function (user_info_conf_data) {
        console.log('********************开始获取个人信息*********************');
        var user_info_conf_data = eval('(' + user_info_conf_data + ')');
        console.log('用户配置信息获取成功：', user_info_conf_data);
        var user_info_conf = user_info_conf_data.user_info_conf;
        list_city = user_info_conf.list_city;
        set_select_start_option(user_info_conf.list_province, 'province_id');
        set_select_start_option(user_info_conf.list_research_field, 'research_field_id');
        set_select_start_option(user_info_conf.list_profession, 'profession_id');
        user_info = get_user_info();
    });
});
//******************************************以下为方法***********************************************
function get_user_info() {
    var result = eval('(' + $("#saveUserinfo").val() + ')');
    console.log('获取个人信息为：', result);
    if (result.status == 2) {
        user_info = result.data;
        console.log('开始设置个人信息（非下拉框部分）*********************');
        set_user_info(user_info);
        console.log('开始设置个人信息（下拉框部分）*********************');
        set_select_option(user_info.province || '北京市', 'province_id');
        set_select_start_option(list_city, 'city_id', 1, user_info.province_id || '1');
        set_select_option(user_info.city_id || '北京市', 'city_id');
        set_select_option(user_info.degree || '1', 'degree');
        set_select_option(user_info.research_field_id || '系统生物学', 'research_field_id');
        set_select_option(user_info.profession_id || '医生', 'profession_id');
        console.log('********************设置个人信息成功！*********************');
    }
    else {
        sweetAlert('获取用户信息时发生异常：' + result.message);
    }
}
function selectMoreCity(obj) {
    //*
    //根据用户选择的省份更新市
    // */
    var province_id = $(obj).find("option:selected").val();
    set_select_start_option(list_city, 'city_id', 1, province_id);
}
function set_select_option(user_info, id) {
    if (user_info != null) {
        var obj = document.getElementById(id);
        var length = obj.options.length;
        if (id == 'degree') {
            for (var i = 0; i < length; i++) {
                if (user_info == obj.options[i].value) {
                    obj.options[i].selected = true;
                }
            }
        }
        else {
            for (var i = 0; i < length; i++) {
                if (user_info == obj.options[i].text) {
                    obj.options[i].selected = true;
                }
            }
        }
    }
}
//type为1代表设置城市信息，不填代表其他信息
function set_select_start_option(result, id, type, province_id) {
    if (result.error == true) {
    } else {
        if (result.status == 2) {
            var list = result.list;
            var length = list.length;
            var obj = document.getElementById(id);
            obj.innerHTML = "";
            var j = 0;
            for (var i = 0; i < length; i++) {
                if (type == 1) {
                    if (list[i].province_id == province_id) {
                        obj.options[j] = new Option(list[i].name, list[i].id);
                        j++;
                    } else {
                    }
                } else {
                    obj.options[i] = new Option(list[i].name, list[i].id);
                }
            }
        }
    }
}


function set_user_info(user_info) {
    if (user_info != null) {
        var sex_value = (user_info.sex ? user_info.sex : 0);
        var sex = document.getElementById('sex');
        var length = sex.length;
        for (var i = 0; i < length; i++) {
            if (sex_value == sex.options[i].value) {
                sex.options[i].selected = true;
            } else {
                sex.options[i].selected = false;
            }
        }
        var degree_val = (user_info.degree ? user_info.degree : 0);
        var degree = document.getElementById('degree');
        length = degree.length;
        for (var i = 0; i < length; i++) {
            if (degree_val = degree.options[i].value) {
                degree.options[i].selected = true;
            } else {
                degree.options[i].selected = false;
            }
        }
        if (user_info.real_name != null || user_info.id_type != null || user_info.id_value != null) {
            var html_str = '<p>证件信息</p>-姓名：' + user_info.real_name + '  身份证号：' + user_info.id_value + '<span class="pull-right text-pink">不可编辑</span>'
            $("#user_certificate").html(html_str);
            $("#certificate").hide();
        }
        $("#user_avatar").attr('src', user_info.avatar ? user_info.avatar : '/static/avatar/null.jpg');
        $("#user_avatar2").attr('src', user_info.avatar ? user_info.avatar : '/static/avatar/null.jpg');
        $('#span_user_account').text(user_info.account);
        $('#span_user_email').text(user_info.email ? user_info.email : '您还没有绑定邮箱！');
        $('#user_account').text(user_info.account);
        $('#user_personal_profile').text(user_info.personal_profile ? user_info.personal_profile : '您还没有填写个人简介！');

        $('#real_name').val(user_info.real_name);
        $('#id_value').val(user_info.id_value);
        $('#university').val(user_info.university);
        $('#institute').val(user_info.institute);
        $('#personal_profile').text(user_info.personal_profile ? user_info.personal_profile : '您还没有填写个人简介！');
    }
}
