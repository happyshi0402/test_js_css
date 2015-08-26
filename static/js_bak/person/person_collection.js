/**
 * Created by Administrator on 2015/7/31.
 */
$(function () {
console.log();
//获取突变筛选列表
    var jsondata = eval('(' + $("#variant_list").val() + ')');
    console.log('突变筛选信息：',jsondata);
    //遍历json，生成li的HTML，装载到页面中
    if (jsondata.data.length == 0) {
        $(".variant_filter").html('<p style="text-align:center;">您并未保存数据！</p>');
    }
    else {
        for (var id in jsondata.data) {
            var html = '<li><label>';
            var content = '';
            var filtername = '';
            for (key in jsondata.data[id]) {
                if (key == 'filtername') {
                    filtername = jsondata.data[id][key];
                    html += jsondata.data[id][key] + '：</label>';
                }
                else if (key == 'account') {
                }
                else if (jsondata.data[id][key]) {
                    content += key + ':' + jsondata.data[id][key] + '; ';
                }
            }
            html += content + '<p class=" pull-right text-pink"><a id="' + filtername + '">删除</a></p></li>';
            $(".variant_filter").append(html)
        }
        console.log('variant append ok')
    }


    //删除突变筛选列表
    $(".variant_filter a").click(function () {
        var _self = this;
        var filtername = $(_self).attr('id');
        $.ajax({
            url: '/collection/variant/',
            type: 'POST',
            data: {filtername: filtername},
            success: function (data) {
                var jsondata = eval('(' + data + ')');
                if (jsondata.status == 2) {
                    sweetAlert(filtername + '删除成功!');//删除成功
                    $(_self).parent().parent('li').remove();
                    console.log(filtername + ' delete ok')
                }
                else
                    sweetAlert(jsondata.message);

            },
            error: function (xhr) {
                sweetAlert("Search Fail:" + xhr.statusText + xhr.status);
            }
        });
    })


//**************************************************geneset***************************************************
//获取geneset列表
    var jsondata = eval('(' + $("#geneset_list").val() + ')');
    console.log('geneset信息：',jsondata);
    //遍历json，生成li的HTML，装载到页面中
    if (jsondata.data.length == 0) {
        $(".geneset").html('<p style="text-align:center;">您并未保存数据！</p>');
    }
    else {
        for (var id in jsondata.data) {
            var html = '<li><label>';
            var content = '';
            var geneset_id = '';
            for (key in jsondata.data[id]) {
                if (key == 'name') {
                    html += jsondata.data[id][key] + '：</label>';
                }
                else if (key == 'id') {
                    geneset_id = jsondata.data[id][key];
                }
                else if (jsondata.data[id][key]) {
                    content += jsondata.data[id][key];
                }
            }
            html += content + '<p class=" pull-right text-pink"><a id="' + geneset_id + '">删除</a></p></li>';
            $(".geneset").append(html)
        }
        console.log('geneset append ok')
    }

    //删除突变筛选列表
    $(".geneset a").click(function () {
        var _self = this;
        var geneset_id = $(_self).attr('id');
        $.ajax({
            url: '/collection/geneset/',
            type: 'POST',
            data: {geneset_id: geneset_id},
            success: function (data) {
                var jsondata = eval('(' + data + ')');
                if (jsondata.status == 1) {
                    sweetAlert('Geneset删除成功！');
                    $(_self).parent().parent('li').remove();
                    console.log('geneset id: ' + geneset_id + ' delete ok')
                }
                else
                    sweetAlert(jsondata.message);

            },
            error: function (xhr) {
                sweetAlert("Search Fail:" + xhr.statusText + xhr.status);
            }
        });

    });

//**************************************************样本分组***************************************************
//获取样本分组列表
    var jsondata = eval('(' + $("#sample_list").val() + ')');
    console.log('突样本分组信息：',jsondata);
    //遍历json，生成li的HTML，装载到页面中
    if (jsondata.status == 120) {
        $(".sample_group").html('<p style="text-align:center;">您并未保存数据！</p>');
    }
    else {
        for (var id in jsondata.data) {
            var html = '<li><label>';
            var description = '';
            var count = '';
            var group_no = '';
            for (key in jsondata.data[id]) {
                if (key == 'group_name') {
                    html += jsondata.data[id][key] + '：</label>';
                }
                else if (key == 'group_no') {
                    group_no = jsondata.data[id][key]
                }
                else if (key == 'description') {
                    description += jsondata.data[id][key];
                }
                else if (key == 'sample_count') {
                    count += jsondata.data[id][key];
                }
            }
            html += description + ',' + '共有' + count + '个样本' + '<p class=" pull-right text-pink"><a id="' + group_no + '">删除</a></p></li>';
            $(".sample_group").append(html)
        }
        console.log('sample_group append ok')
    }

    //删除样本分组
    $(".sample_group a").click(function () {
        var _self = this;
        var group_no = $(_self).attr('id');
        $.ajax({
            url: '/collection/sample_group/',
            type: 'POST',
            data: {group_no: group_no},
            success: function (data) {
                var jsondata = eval('(' + data + ')');
                if (jsondata.status == 2) {
                    sweetAlert('样本分组删除成功！');
                    $(_self).parent().parent('li').remove();
                    console.log('group_no: ' + group_no + ' delete ok')
                }
                else
                    sweetAlert(jsondata.message);

            },
            error: function (xhr) {
                sweetAlert("Search Fail:" + xhr.statusText + xhr.status);
            }
        });

    });
});






