/**
 * Created by Administrator on 2015/7/30.
 */

$(function () {
    console.log('*************************************年页面初始化************************************');
    //获取最新日期
    var new_date = $("#new_date").val();
    console.log('获取的最新日期：' + new_date)
    var new_year = myDateClass.getYear(new_date);

    //设置日历为最新的一年
    $(".calendar_year_mode .showDate2").val((new_year - 1) + '年   至   ' + new_year + '年');
    console.log('将日历设置为：' + $(".calendar_year_mode .showDate2").val());

    //获取所有的数据,并遍历
    var jsondata = eval('(' + $(".saveJson").val() + ')');
    console.log('获取所有的数据为：', jsondata)
    var patient_no = $("#patient_no").val();
    var disease = $("#disease").val();
    traversalJson(jsondata, new_year);

    //选择按月按钮时候当转当前日期的month页面
    $('.radio_month').click(function () {
        go_to_month(new_date);
    });
    //点击最下面的月份跳转
    $('.monthPage a').click(function () {
        var str_date = $(".calendar_year_mode .showDate2").val();
        //获取字符串的第一个年份
        str_date = parseInt(str_date.split('年'), 10);
        var index = $('.monthPage a').index($(this)) + 1;//获取序数
        var y_m = '';
        if (index > 12) {
            var year = str_date + 1;
            var month = index - 12;
            y_m = year + '-' + month;
        }
        else {
            var year = str_date;
            var month = index;
            y_m = year + '-' + month;
        }
        go_to_month(y_m);
    })
    //点击前后年按钮跳转指定年份的12月
    $(".next_y,.prev_y").click(function () {
        var str_date = $(".calendar_year_mode .showDate2").val();
        //获取字符串的第一个年份，并+1，获取endyear的年份
        str_date = parseInt(str_date.split('年'), 10) + 1;
        traversalJson(jsondata, str_date); //鼠标滑过显示弹窗用
    });

//****************************************************显示与隐藏*******************************************************
    //健康档案显示与隐藏
    //每月病史记录 的伸缩与隐藏
    $(".pablue").click(function () {
        if ($(".pablueBox").is(":visible")) {
            $("#gly_history").removeClass("glyphicon-minus").addClass("glyphicon-plus");
        }
        else {
            $("#gly_history").removeClass("glyphicon-plus").addClass("glyphicon-minus");
        }
        $(".pablueBox").slideToggle("slow");
        if ($(".purpleBox").is(":visible")) {
            $(".purpleBox").slideToggle("slow");
            $("#gly_clinic").removeClass("glyphicon-minus").addClass("glyphicon-plus");
        }
    });
    //每月临床检测 的伸缩与隐藏
    $(".purple").click(function () {
        if ($(".purpleBox").is(":visible")) {
            $("#gly_clinic").removeClass("glyphicon-minus").addClass("glyphicon-plus");
        }
        else {
            $("#gly_clinic").removeClass("glyphicon-plus").addClass("glyphicon-minus");
        }
        $(".purpleBox").slideToggle("slow");
        if ($(".pablueBox").is(":visible")) {
            $(".pablueBox").slideToggle("slow");
            $("#gly_history").removeClass("glyphicon-minus").addClass("glyphicon-plus");
        }
    });
     $('#addTestData').modal();
});
//****************************************************以下为方法*******************************************************
function go_to_month(test_time) {
    showWait();
    var patient_no = $("#patient_no").val();
    var disease = $("#disease").val();
    //load月页面
    $("#test_data_list").load("/sample/patient/month/" + patient_no + "/", {
        "month": test_time,
        "disease": disease
    }, function () {
        console.log('load month html ok');
        hideWait();
    });
}
function traversalJson(jsondata, year) {
    console.log('*************************************刷新页面************************************');
    console.log('开始清除span和a的class、html、所有事件……')
    $(".MothBox span").removeClass().html('').unbind();
    $(".PastHistory a").removeClass().removeAttr('data-toggle data-content ' +
    'data-placement data-original-title title').html('').unbind();
    console.log('清除完成！')

    console.log('开始进行年页面遍历json日期，并填色……')
    for (o in jsondata.data) {
        if (myDateClass.isInYear(o, year))//在指定范围内
            for (p in jsondata.data[o]) {
                var x = myDateClass.getMonth(o) + (myDateClass.getYear(o) - year + 1) * 12;//x坐标
                var type = p;//类型
                var test_no = jsondata.data[o][p];//编号
                var y_m_d = o;//日期
                addColor(x - 1, type, test_no, y_m_d);
            }
    }
    console.log('添加鼠标滑过显示弹窗的popover事件……')
    options = {
        trigger: 'manual',
        html: true,
        container: '.MothBox'
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
    if (_strong.hasClass('pablueBox'))
        _span.addClass('paBlueTitle');
    else if (_strong.hasClass('purpleBox'))
        _span.addClass('purpleTitle');
    else if (_strong.hasClass('geneticBox'))
        _span.addClass('geneticTitle');
    else if (_strong.hasClass('treatBox'))
        _span.addClass('treatTitle');

    //添加事件
    _span.unbind("click").click(function () {
        $("#" + id).parents("li").children("h5").children('a').click();
    });
    //******************************************a的操作***************************************
    var _a = $("#" + id + " a:eq(" + x + ")");
    //获取当前次数
    if (_a.html() == '')
        var count = 0;
    else
        count = parseInt(_a.html());
    _a.html(count + 1);
    //添加类,不同类型不同颜色
    if (_strong.hasClass('pablueBox'))
        _a.addClass('paBlueBlock');
    else if (_strong.hasClass('purpleBox'))
        _a.addClass('purpleBlock');
    else if (_strong.hasClass('geneticBox'))
        _a.addClass('geneticBlock');
    else if (_strong.hasClass('treatBox'))
        _a.addClass('treatBlock');
    //添加属性
    _a.attr('data-toggle', 'popover').attr('data-placement', 'right');

    var content = _a.attr('data-content') == undefined ? '' : _a.attr('data-content');
    content += '<div class="patient_mouse_content">';
    content += '<p>类型：<span>' + $("#" + id).children('strong').html() + '</span></p>';
    content += '<p style="display:none">编号：<span>' + test_no + '</span></p>';
    content += '<p>时间：<span>' + date + '</span></p><a onclick="triggerMotal(this)">查看详细</a></div>';
    _a.attr('data-content', content);
}
function triggerMotal(obj) {
    var test_no = $(obj).parent(".patient_mouse_content").find("span:eq(1)").html();
    var test_type = $(obj).parent(".patient_mouse_content").find("span:eq(0)").html();
    console.log('获取的编号和类型为：' + test_no + test_type);
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