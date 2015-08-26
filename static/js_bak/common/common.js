/**
 * Created by shifeng on 2015/6/7.
 */
//*****************************************************************************
//功能：随机数的获取
//参数：整数n
//作者：王世锋 时间：2015/06/07
//修正：
//******************************************************************************
function getRandom(n) {
    return Math.floor(Math.random() * n + 1)
}
//*****************************************************************************
//功能：突变圈圈等待
//参数：整数n
//作者：王世锋 时间：2015/06/26
//修正：
//******************************************************************************
function showWait_for_d3($obj) {
    $("#wait2").css('z-index', '1500');

    $("#wait2").css("left", $obj.position().left + $obj.width() / 2)
        .css("top", $obj.position().top + $obj.height() / 2);

    $("#wait2").show();
}
//*****************************************************************************
//功能：div 的html生成
//参数：par_id:父元素 id
//     text:text
//     id:name
//     name:name
//     style:参数格式：{'color':red}
//     css:class name
//     event: 元素事件，参数是一个数组，[0] 代表click， [1] 代表onmouseover [2] 代表onmouseup
//作者：王世锋 时间：2015/06/18
//修正：
//******************************************************************************
function create_html_div(par_id, text, id, name, style, css, event) {
    var div = $("<div></div>");
    create_html(par_id, div, text, id, name, style, css, event);
}
//*****************************************************************************
//功能：span 的html生成
//参数：par_id:父元素 id
//     text:text
//     id:name
//     name:name
//     style:参数格式：{'color':red}
//     css:class name
//     event: 元素事件，参数是一个数组，[0] 代表click， [1] 代表onmouseover [2] 代表onmouseup
//作者：王世锋 时间：2015/06/18
//修正：
//******************************************************************************
function create_html_span(par_id, text, id, name, style, css, event) {
    var span = $("<span></span>");
    create_html(par_id, span, text, id, name, style, css, event);
}
//*****************************************************************************
//功能：li 的html生成
//参数：par_id:父元素 id
//     text:text
//     id:name
//     name:name
//     style:参数格式：{'color':red}
//     css:class name
//     event: 元素事件，参数是一个数组，[0] 代表click， [1] 代表onmouseover [2] 代表onmouseup
//作者：王世锋 时间：2015/06/18
//修正：
//******************************************************************************
function create_html_li(ul_id, text, id, name, style, css, event) {
    var li = $("<li></li>");
    create_html(ul_id, li, text, id, name, style, css, event);
}
//*****************************************************************************
//功能：table tr 的html生成
//参数：table_id:table id
//     text:text
//     id:name
//     name:name
//     style:参数格式：{'color':red}
//     css:class name
//     event: 元素事件，参数是一个数组，[0] 代表click， [1] 代表onmouseover [2] 代表onmouseup
//作者：王世锋 时间：2015/06/18
//修正：
//******************************************************************************
function create_html_tr(table_id, text, id, name, style, css, event) {
    var tr = $("<tr></tr>");
    create_html(table_id, tr, text, id, name, style, css, event);
}
//*****************************************************************************
//功能：table td 的html生成
//参数：tr_id:tr id
//     text:text
//     id:name
//     name:name
//     style:参数格式：{'color':red}
//     css:class name
//     event: 元素事件，参数是一个数组，[0] 代表click， [1] 代表onmouseover [2] 代表onmouseup
//作者：王世锋 时间：2015/06/18
//修正：
//******************************************************************************
function create_html_td(tr_id, text, id, name, style, css, event) {
    var td = $("<td></td>");
    create_html(tr_id, td, text, id, name, style, css, event);
}
//*****************************************************************************
//功能：随机数的获取
//参数：par_id:父元素的 id
//     text:text，显示的内容
//     id:name
//     name:name
//     style:参数格式：{'color':red}
//     css:class name
//     event: 元素事件，参数是一个数组，[0] 代表click， [1] 代表onmouseover [2] 代表onmouseup
//作者：王世锋 时间：2015/06/18
//作者：王世锋 时间：2015/06/18
//修正：
//******************************************************************************
function create_html(par_id, obj, text, id, name, style, css, event) {
    if (arguments[2] != '') {
        obj.append(text);
    }
    if (arguments[3] != '') {
        obj.attr('id', id);
    }
    if (arguments[4] != '') {
        obj.attr('name', name);
    }
    if (arguments[5] != '') {
        obj.css(style);
    }
    if (arguments[6] != '') {
        obj.addClass('myclass');
    }
    if (arguments[7] instanceof Array) {
        obj.bind('click', function () {
            eval(event[0]);
        });
    }
    var par_obj = $("#" + par_id);

    par_obj.append(obj);
}
//功能：显示错误（红色叹号）
//参数：formSpan:错误信息的span
//     errorText:text，显示的错误内容
//作者：刘一奇 时间：2015/07/06
function showError(formSpan, errorText) {
    $("#" + formSpan + "Tip").empty();
    $("#" + formSpan + "Tip").append("<p></p>" + errorText);
    $("#" + formSpan + "Tip").children("p").addClass("glyphicon glyphicon-exclamation-sign glyphicon-pink");
    $("#" + formSpan + "Tip").css({"display": "inline"});
}
//功能：显示提示（蓝色叹号）
//参数：formSpan:提示信息的span
//     tipText:text，显示的提示内容
//作者：刘一奇 时间：2015/07/06
function showTip(formSpan, tipText) {
    $("#" + formSpan + "Tip").empty();
    $("#" + formSpan + "Tip").append("<p></p>" + tipText);
    $("#" + formSpan + "Tip").children("p").addClass("glyphicon glyphicon-exclamation-sign glyphicon-blue");
    $("#" + formSpan + "Tip").css({"display": "inline"});
}
//功能：显示成功（绿色对勾）
//参数：formSpan:ok信息的span
//作者：刘一奇 时间：2015/07/06
function showOk(formSpan) {
    $("#" + formSpan + "Tip").empty();
    $("#" + formSpan + "Tip").append("<p></p>");
    $("#" + formSpan + "Tip").children("p").addClass("glyphicon glyphicon-ok-sign glyphicon-green");
    $("#" + formSpan + "Tip").css({"display": "inline"});
}
//功能：验证6-16个字符组成，区分大小写，不能为9位以下纯数字
//参数：psw:将被验证的密码
//作者：刘一奇 时间：2015/07/06
function regPsw(psw) {
    var reg = new RegExp(/^(?!\d{6,8}$)[a-zA-Z0-9]{6,16}$/);
    return (reg.test(psw));
}
//功能：检验姓名：姓名是2-15字的汉字
//参数：s:将被验证的姓名
//作者：刘一奇 时间：2015/07/06
function isCardName(s) {
    var patrn = /^\s*[\u4e00-\u9fa5]{1,}[\u4e00-\u9fa5.·]{0,15}[\u4e00-\u9fa5]{1,}\s*$/;
    if (!patrn.exec(s)) {
        return false;
    }
    return true;
}
//功能：检验身份证
//参数：s:将被验证的姓名
//作者：刘一奇 时间：2015/07/06
function isIdCard(s) {
    var patrn = /^\s*\d{15}\s*$/;
    var patrn1 = /^\s*\d{16}[\dxX]{2}\s*$/;
    if (!patrn.exec(s) && !patrn1.exec(s)) {
        return false;
    }
    return true;
}
//功能：检查email邮箱
//参数：str:将被验证的邮箱地址
//作者：刘一奇 时间：2015/07/07
function isEmail(str) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(str);
}
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

//自定义的命名空间，用来对日期进行操作
myDateClass = {
    //输入json日期获取年
    getYear: function (jsonDate) {
        var dateArry = jsonDate.split('-');
        var jsonyear = parseInt(dateArry[0]);
        return jsonyear;
    },
    //输入json日期获取月
    getMonth: function (jsonDate) {
        var dateArry = jsonDate.split('-');
        var jsonmonth = parseInt(dateArry[1]);
        return jsonmonth;
    },
    //输入json日期获取日
    getDay: function (jsonDate) {
        var dateArry = jsonDate.split('-');
        var jsonday = parseInt(dateArry[2]);
        return jsonday;
    },
    //输入json日期和日历日期（后面的年）,判断json日期是否在两年内
    isInYear: function (jsonDate, calenYear) {
        var jsonArry = jsonDate.split('-');
        var jsonyear = parseInt(jsonArry[0]);
        if (jsonyear == calenYear || jsonyear == (calenYear - 1))
            return true;
        else
            return false;
    },
    //输入json日期和日历日期（年和月），判断json日期是否在日历日期内
    isInMonth: function (jsonDate, calendarDate) {
        var jsonArry = jsonDate.split('-');
        var jsonyear = parseInt(jsonArry[0]);
        var jsonmonth = parseInt(jsonArry[1]);
        var calenArry = calendarDate.split('-');
        var calenyear = parseInt(calenArry[0]);
        var calenmonth = parseInt(calenArry[1]);
        if (jsonyear == calenyear && jsonmonth == calenmonth)
            return true;
        else
            return false;
    }
};