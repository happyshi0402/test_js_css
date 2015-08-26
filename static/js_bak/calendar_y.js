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
    _self.year_box = MyClassSelect.getByClass(_self.obj, "year")[0];
    _self.prevY = MyClassSelect.getByClass(_self.obj, "prev_y")[0];
    _self.nextY = MyClassSelect.getByClass(_self.obj, "next_y")[0];
    //显示日历
    _self.showNow();
    //点击切换年份
    _self.prevY.onclick = _self.nextY.onclick = function () {
        _self.changeYr(this);
        return this;
    }
}
//填充年、月
showDate.prototype.showNow = function (yr, mn) {
    var _self = this;
    var now = new Date();
    var year = yr || now.getFullYear();
    _self.year_box.value = (year-1)+'年   至   '+year+'年';
}
//点击切换年份
showDate.prototype.changeYr = function (obj) {
    var _self = this;
    var str_year=_self.year_box.value.split('年   至   年');
    var newYear = parseInt(str_year[0], 10);
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
    _self.year_box.value = newYear+'年   至   '+(newYear+1)+'年';
}


//函数调用
$(document).ready(function () {
    var showDate1 = new showDate({id: "calendar_box"});
    showDate1.init();
});