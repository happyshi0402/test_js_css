MyClassSelect = {
    getByClass: function (oPare, cla) {
        var oChild = oPare.getElementsByTagName("*");
        var arr = [];
        for (var i = 0; i < oChild.length; i++) {
            var arrCla = oChild[i].className.split(" ");
            var j;
            for (var j in arrCla) {
                if (arrCla[j] == cla) {
                    arr.push(oChild[i]);
                    break;
                }
            }
        }
        return arr;
    }
}
function showDate(option) {
    this.obj = document.getElementById(option.id);
}
showDate.prototype.init = function () {
    var _self = this;
    _self.btn_selectDate = MyClassSelect.getByClass(_self.obj, "btn_selectDate")[0];
    _self.dateText = MyClassSelect.getByClass(_self.obj, "showDate")[0];
    _self.dateBox = MyClassSelect.getByClass(_self.obj, "calendar_body")[0];
    _self.year_box = MyClassSelect.getByClass(_self.obj, "year")[0];

    _self.dataTable = MyClassSelect.getByClass(_self.dateBox, "month_box")[0];
    _self.li = _self.dataTable.getElementsByTagName("li");
    _self.prevY = MyClassSelect.getByClass(_self.dateBox, "prev_y")[0];
    _self.nextY = MyClassSelect.getByClass(_self.dateBox, "next_y")[0];
    //显示日历
    _self.btn_selectDate.onclick = function () {
        _self.changeDefault2(_self.dateText);
        _self.show();
    }
    //点击空白 隐藏日历
    document.onclick = function (event) {
        event = event || window.event;
        var Target = event.target || event.srcElement;
        _self.hide(event, Target, this);
    }
    //点击选择日期
    for (var i = 0; i < _self.li.length; i++) {
        _self.li[i].onclick = function () {
            var newMn = this.innerHTML;
            var newYear = _self.year_box.value;

            if (newYear.match(/^\s{0}$/g)) {  //如果td有值;
                return false;
            }
            _self.dateText.value = newYear + "年" + newMn;
            _self.dateBox.className += " ";
            _self.dateBox.className += "dn";
        }
        _self.li[i].onmouseover = function () {
            if (this.className.indexOf("hove") == -1) {
                this.className += " hover";
            }
        }
        _self.li[i].onmouseout = function () {
            this.className = this.className.replace("hover", "")
        }
    }

    //点击切换年份
    _self.prevY.onclick = _self.nextY.onclick = function () {
        _self.changeYr(this);
        return this;
    }
}

//点击切换年份
showDate.prototype.changeYr = function (obj) {
    var _self = this;
    var newYear = parseInt(_self.year_box.value, 10);
    if (obj == _self.nextY) {
        newYear++;
    } else {
        newYear--;
    }
    if (newYear < 1900) {
        newYear = 1900;
    } else if (newYear > 2099) {
        newYear = 2099;
    }
    _self.year_box.value = newYear;
}
//文本框 清空初始值
showDate.prototype.changeDefault = function (obj) {
    var _self = this;
    var deVal = obj.defaultValue;
    if (obj.value == deVal) {
        obj.value = "";
    }
}
//文本框 还原初始值
showDate.prototype.changeDefault2 = function (obj) {
    var _self = this;
    var deVal = obj.defaultValue;
    if (obj.value.match(/^\s{0}$/)) {
        obj.value = deVal;
    }
}
//显示日历
showDate.prototype.show = function () {
    var _self = this;
    if (_self.dateBox.className.indexOf("dn") != -1) {
        var cls = _self.dateBox.className;
        _self.dateBox.className = cls.replace("dn", "");
    }
}
//隐藏日历
showDate.prototype.hide = function (event, Target, obj) {
    var _self = this;
    var oPare = Target.parentNode;
    var isChild = true; //默认是子元素
    if (oPare == obj || Target == obj) {
        isChild = false;
    } else {
        loop: while (oPare != _self.obj) {
            oPare = oPare.parentNode;
            if (oPare == obj) {
                isChild = false;
                break loop;
            }
        }
    }
    if (!isChild && _self.dateBox.className.indexOf("dn") == -1) {
        _self.dateBox.className += " ";
        _self.dateBox.className += "dn";
        _self.changeDefault2(_self.dateText);
    }

}
//填充年、月
showDate.prototype.showNow = function (yr, mn) {
    var _self = this;
    var now = new Date();
    var year = yr || now.getFullYear();
    var month = mn - 1 || now.getMonth();
    var dd = now.getDate();
    //填充 年 和 月
    _self.year_box.value = year;

}

//函数调用
$(document).ready(function () {
    var showDate1 = new showDate({id: "calendar_box"});
    showDate1.init();
});