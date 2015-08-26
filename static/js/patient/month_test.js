/**
 * Created by Administrator on 2015/7/30.
 */
$(function () {
    console.log('*************************************月页面初始化************************************');
    //获取最新日期
    var new_date = $("#new_date").val();
    console.log('获取的最新日期：' + new_date)
    var new_year = myDateClass.getYear(new_date);
    $(".calendar_month_mode .showDate2").val(new_year);
    console.log('将日历2设置为：' + $(".calendar_month_mode .showDate2").val());

    //获取所有的数据,
    var jsondata = eval('(' + $(".saveJson").val() + ')');
    console.log('获取所有的数据为：', jsondata)
    var patient_no = $("#patient_no").val();
    var disease = $("#disease").val();
    var str_date = $(".calendar_month_mode .showDate").val();
    str_date = str_date.replace('年', '-').replace('月', '');
    traversalJson(jsondata, str_date);

    //选择年按钮，跳转年页面
    $('.radio_year').click(function () {
        go_to_year(new_year);
    });
    $(".calendar_month_mode li").click(function () {
        var str_date = $(".calendar_month_mode .showDate").val();
        str_date = str_date.replace('年', '-').replace('月', '');
        traversalJson(jsondata, str_date);
    })
//*******************************************************显示与隐藏****************************************************
    //健康档案显示与隐藏
    //每月病史记录 的伸缩与隐藏
    var int = "1"
    var int_1 = "1"
    $(".pablueDay").click(function () {
        if ($(".pablueBoxDay").is(":visible")) {
            $("#gly_minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
        }
        else {
            $("#gly_minus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
        }
        $(".pablueBoxDay").slideToggle("slow");
        if ($(".purpleBoxDay").is(":visible")) {
            $(".purpleBoxDay").slideToggle("slow");
            $("#gly_plus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
        }
    });
    //每月临床检测 的伸缩与隐藏
    $(".purpleDay").click(function () {
        if ($(".purpleBoxDay").is(":visible")) {
            $("#gly_plus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
        }
        else {
            $("#gly_plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
        }
        $(".purpleBoxDay").slideToggle("slow");
        if ($(".pablueBoxDay").is(":visible")) {
            $(".pablueBoxDay").slideToggle("slow");
            $("#gly_minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
        }
    });

});
//*******************************************************以下是方法****************************************************
function dayCountChage(date) {
    var dateArry = date.split('-');
    //获取当月天数
    var year = parseInt(dateArry[0]);
    var month = parseInt(dateArry[1]);
    var d = new Date(year, month, 0);
    var dayCount = d.getDate();
    //先复原所有格子
    $(".DayHistory a").show();
    $(".DayBox span").show();
    $(".dayPage a").show();
    //隐藏多余的天数
    //隐藏a
    for (var i = 0; i < 17; i++) {
        $(".DayHistory li:eq(" + i + ") a:gt(" + (dayCount - 1) + ")").hide();
    }
    //隐藏span
    for (var i = 0; i < 4; i++) {
        $(".DayHistory").parent("li:eq(" + i + ")").children("span:gt(" + (dayCount - 1) + ")").hide();
    }
    //隐藏dayPage
    $(".dayPage a:gt(" + (dayCount - 1) + ")").hide();
    $(".dayPage strong").html("共" + dayCount + "天");
}
//跳转年页面的函数
function go_to_year(y, m) {
    var patient_no = $("#patient_no").val();
    var disease = $("#disease").val();
    showWait();
    $("#test_data_list").load("/sample/patient/year/" + patient_no + "/", {
        "disease": disease
    }, function () {
        hideWait();
    });
}
//遍历json
function traversalJson(jsondata, calendate) {
    console.log('*************************************刷新页面************************************');
    dayCountChage(calendate);
    console.log('开始清除span和a的class、html、所有事件……')
    $(".DayBox span").removeClass().html('').unbind();
    $(".DayHistory a").removeClass().removeAttr('data-toggle data-content data-original-title ' +
    'data-placement title').html('').unbind();
    console.log('清除完成！')

    console.log('开始进行月页面遍历json日期，并填色……')
    for (o in jsondata.data) {
        if (myDateClass.isInMonth(o, calendate))//在指定范围内
            for (p in jsondata.data[o]) {
                var x = myDateClass.getDay(o);
                test_no = jsondata.data[o][p];
                addColor(x - 1, p, test_no, o);
            }
    }
    console.log('添加鼠标滑过显示弹窗的popover事件……');
    //鼠标滑过显示弹窗用
    options = {
        trigger: 'manual',
        html: true,
        container: '.DayBox'
    };
    $('[data-toggle="popover"]').popover(options).on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(".popover").children().addClass("triangle_box");  //给鼠标移动上去的色块的小三角形添加名为triangle_box的样式
        $(".popover").addClass("blue_border").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide")
            }
        }, 100);
    });
    console.log('popover事件添加完成！')
}
//添加颜色
function addColor(x, id, test_no, date) {
    //************************************span的操作****************************************
    var _span = $("#" + id).parents("li").children("span:eq(" + x + ")");

    //获取当前次数
    if (_span.html() == '')
        var spancount = 0;
    else
        spancount = parseInt(_span.html());
    _span.html(spancount + 1);

    //添加类
    var _strong = $("#" + id).parent().parent();//每行的加减图标元素，用于判断类型
    if (_strong.hasClass('pablueBoxDay'))
        _span.addClass('paBlueTitle');
    else if (_strong.hasClass('purpleBoxDay'))
        _span.addClass('purpleTitle');
    else if (_strong.hasClass('geneticBoxDay'))
        _span.addClass('geneticTitle');
    else if (_strong.hasClass('treatBoxDay'))
        _span.addClass('treatTitle');

    //添加事件
    $("#" + id).parents("li").children("span:eq(" + x + ")").unbind("click").click(function () {
        $("#" + id).parents("li").children("h6").children('a').click();
    })
    //******************************************a的操作***************************************
    var _a = $("#" + id + " a:eq(" + x + ")");
    //获取当前次数
    if (_a.html() == '')
        var count = 0;
    else
        count = parseInt(_a.html());
    _a.html(count + 1);
    //添加类,不同类型不同颜色
    if (_strong.hasClass('pablueBoxDay'))
        _a.addClass('paBlueBlock');
    else if (_strong.hasClass('purpleBoxDay'))
        _a.addClass('purpleBlock');
    else if (_strong.hasClass('geneticBoxDay'))
        _a.addClass('geneticBlock');
    else if (_strong.hasClass('treatBoxDay'))
        _a.addClass('treatBlock');
    //添加属性
    _a.attr('data-toggle', 'popover').attr('data-placement', 'right');
    var content = $("#" + id + " a:eq(" + x + ")").attr('data-content') == undefined ? '' : $("#" + id + " a:eq(" + x + ")").attr('data-content');
    content += '<div class="patient_mouse_content">';
    content += '<p>类型：<span>' + $("#" + id).children('strong').html() + '</span></p>';
    content += '<p style="display:none">编号：<span>' + test_no + '</span></p>';
    content += '<p>时间：<span>' + date + '</span></p><a onclick="triggerMotal(this)">查看详细</a></div>';
    _a.attr('data-content', content);
}

function triggerMotal(obj) {
    var test_no = $(obj).parent(".patient_mouse_content").find("span:eq(1)").html();
    var test_type = $(obj).parent(".patient_mouse_content").find("span:eq(0)").html();
    console.log(test_no + test_type);
    attribute_list(test_no, test_type);
}
//遍历数据弹出模态框
function attribute_list(test_no, mtype) {
    showWait();
    var patient_no = $("#patient_no").val();
    url = "/sample/patient/" + patient_no + "/" + test_no + "/";
    $.ajax({
        url: url,
        type: "POST",
        data: {},
        success: function (data) {
            var result = data.data;
            console.log(result);
            var ul = $("#attributes_listss");
            var ull = $("#attributes_list");
            ull.remove();
            ul.append($("<ul id='attributes_list'></ul>"));
            ull = $("#attributes_list");
            for (key in result) {
                var attribute_name = key;
                var value = result[key];
                var td = $("<li>" + attribute_name + ":" + value + "</li>");
                ull.append(td);
            }
            hideWait();
            $('#attribute_list').modal();
            $(".myMotalTitle").html(mtype);
        },
        error: function () {
            sweetAlert("something was wrong!")
        }

    });

}