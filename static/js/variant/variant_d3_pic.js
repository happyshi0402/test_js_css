/**
 * Created by wangshifeng on 2015/5/31.
 */
//加在第一张图
    //window_width common.js
    var window_width = $(window).width();
var int_p = 0.8;
    d3.select("#variant_data_sidebar").style('width',function(){
       if(window_width * 0.2 < 250){
           int_p = 1 - 250 / window_width;
           return '250px';
       } else {return window_width * 0.2 + 'px'};
    });

int_variant_data_table_d3 = parseInt(window_width * int_p * 0.95);
d3.select("#variant_data_table_d3").style('width',int_variant_data_table_d3  + 'px');
get_variant_data_pic1();

function get_variant_data_pic1() {
    var width = int_variant_data_table_d3 / 2 - 5,//600,
        height = width * 1.4,
        pad = width / 50,
        left_pad = width / 12;
    var line_heigth = width / 5;

    //document.write("-s-" + int_variant_data_table_d3 + "--" + width + "--" + height + "--"+ pad + "--"+ left_pad + "--" + line_heigth);
    var x = d3.scale.linear().range([left_pad, width - left_pad]);  //100  880  0.1
    var y = d3.scale.ordinal().rangeRoundBands([pad, height - pad], 0.1);  // 280,20
    var svg = d3.select("#variant_sample_quality_pic1")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", 'variant_sample_quality_pic1_id')
        .style("background-color", "#f7f7f7");
    var sample_no = $("#variant_hid_sample_no").val();
    var arr_data;
    var data2;
    d3.json('/variant/data/qc/pic/' + sample_no + '/', function (pic_data) {
        arr_data = pic_data.pic_data1;
        data2 = pic_data.pic_data2;
        //判断是否有数据
        var has_data1 = 1;
        var has_data2 = 1;
        if(arr_data == ''){
            has_data1 = 0;
        }
        if(data2 == ''){
            has_data2 = 0;
        }

        var arr_data2 = arr_data.split(",");
        var len1 = arr_data2.length;
        arr_data2[0] = arr_data2[0].replace("[","");
        arr_data2[len1 - 1] = arr_data2[len1 - 1].replace("]","");

        var data = [{ "title": "Ti/Tv Genomic",
                              "mean": 1.9,
                              "test": 0,
                              "max": 3.8,
                              "type": 0
                            },{ "title": "Ti/Tv Exonic",
                              "mean": 2.6,
                              "test": 0,
                              "max": 3.8,
                              "type": 0
                            },{ "title": "Median Coverage",
                              "mean": 20,
                              "test": 0,
                              "max": 200,
                              "type": 0
                            },{ "title": "%SNP with QUAL>=40",
                              "mean": 80,
                              "test": 0,
                              "max": 100,
                              "type":1
                            },{ "title": "%Mapping Ratio",
                              "mean": 80,
                              "test": 0,
                              "max": 100,
                              "type":1
                            },{ "title": "%Target Ratio",
                              "mean": 30,
                              "test": 0,
                              "max": 100,
                              "type":1
                            }];

        var flag_gray1 = 0;
        var flag_gray2 = 0;
        for(var i = 0; i < len1; i++){
            var data3 = arr_data2[i];
            if(i<4 && parseFloat(data3) > 0)flag_gray1++;
            if(i>=4 && parseFloat(data3) > 0)flag_gray2++;
            data[i]["test"] = parseFloat(data3);
        }

        var len = data.length;
        try {
            for (var i = 0; i < len; i++) {
                var data_new = [];
                var title = data[i]['title'];
                var mean = data[i]['mean'];
                var test = data[i]['test'];
                var max = data[i]['max'];
                var type = data[i]['type'];
                data_new.push({
                    "title": title,
                    "mean": mean,
                    "test": test,
                    "max": max,
                    "type": type
                });

                x.domain([0, d3.max(data_new, function (d) {
                    return d.max;
                })]);
                var ok_flag = 0;

                svg.selectAll('text_top_text').data(data_new).enter().append('text')
                    .text(function (d) {
                        if (parseFloat(d.test) > parseFloat(d.mean)) {
                            ok_flag = 1;
                        }
                        return d.title;
                    })
                    .attr('x', function (d) {
                        return x(parseFloat(d.max) / 2) - d.title.length * 5;
                    })
                    .attr('y', (parseInt(i) + 1) * line_heigth - 8)
                    .style('font-size', '14px').style('font-weight', 'bold')
                    .attr('fill', 'silver');

                if (ok_flag == 1) {
                    set_variant_pic1_ok(x, svg, data_new, i, line_heigth);
                } else {
                    set_variant_pic1_not_ok(x, svg, data_new, i, line_heigth);
                }

                //绿色条
                svg.selectAll('rect2')
                    .data(data_new)
                    .enter()
                    .append('rect')
                    //.attr('class', 'bar_blue')
                    .attr('x', left_pad)        //柱形图移动从哪里开始
                    .attr('width', function (d) {
                        return x(d.max) - left_pad;
                    })
                    .attr('id', function (d) {
                        return 'bar_a_' + i;
                    })
                    .attr('y', (i + 1) * line_heigth)
                    .attr('height', 30)
                    .style("fill", function (d) {
                        if (has_data1 == 0 || (i < 4 && flag_gray1 == 0) || (i >= 4 && flag_gray2 == 0)) {
                            return "silver";
                        } else {
                            return "#82d0a7";
                        }
                    });
                //中值绿色条
                svg.selectAll('rect_bottom_blue').data(data_new).enter().append('rect')
                    .attr('x', function (d) {
                        return x(d.mean);
                    })
                    //.attr('class', 'bar_blue')
                    .attr('id', 'rect__bottom' + i)
                    .attr('y', (parseInt(i) + 1) * line_heigth + 28)
                    .attr('width', 2).attr('height', 10)
                    .style("fill", function (d) {
                        if (has_data1 == 0 || (i < 4 && flag_gray1 == 0) || (i >= 4 && flag_gray2 == 0)) {
                            return "silver";
                        } else {
                            return "#00CC99";
                        }
                    });

                //下边坐标数字
                var text_data = [{mean: 0}, {mean: data_new[0]["mean"]}, {mean: data_new[0]["max"]}];
                svg.selectAll('text_bottom_text').data(text_data).enter().append('text')
                    .text(function (d) {
                        return (d.mean)
                    })
                    .attr('x', function (d) {
                        var add_bottom = 0;
                        if (d.mean.toString().length >= 0) {
                            add_bottom = 4 * (d.mean.toString().length);
                        }
                        return x(d.mean) - add_bottom;
                    })
                    .attr('y', (parseInt(i) + 1) * line_heigth + 48)
                    .style('font-size', '8px');

                //黄色条

                svg.selectAll('rect3')
                    .data(data_new)
                    .enter()
                    .append('rect')
                    //.attr('class', 'bar_white')
                    .attr('x', left_pad)        //柱形图移动从哪里开始
                    .attr('width', function (d) {
                        return x(d.mean) - left_pad;
                    })
                    .attr('id', function (d) {
                        return 'bar_b_' + i;
                    })
                    .attr('y', (i + 1) * line_heigth)
                    .attr('height', 30)
                    .style("fill", function (d) {
                        if (has_data1 == 0 || (i < 4 && flag_gray1 == 0) || (i >= 4 && flag_gray2 == 0)) {
                            return "silver";
                        } else {
                            return "#fd856d";
                        }
                    });

                //alert(test_data);
                /* if (parseFloat(has_data1) > 0) {
                 set_variant_pic1_test_data(svg, x,y,data_new, i,line_heigth);
                 }*/

                if ((i < 4 && flag_gray1 > 0) || (i >= 4 && flag_gray2 > 0)) {
                    set_variant_pic1_test_data(svg, x, y, data_new, i, line_heigth);
                }
            }
        }finally{
            //加载第二张图片
            svg_variant_pic2_BarChart(data2,has_data2);
        }
    });
}

function set_variant_pic1_test_data(svg,x,y,data_new,i,line_heigth){
    svg.selectAll('rect_test').data(data_new).enter().append('rect').attr('x', function(d){ return x(d.test)})
                .attr('id','rect_test'+i)
                .attr('y', (parseInt(i) + 1) * line_heigth + 25)
                .attr('width', 3).attr('height', 10).style("fill","black");
    svg.selectAll('text_test').data(data_new).enter().append('text')
            .text(function(d){
                return d.test;
            })
            .attr('id','text_test'+i)
            .attr('x', function(d){
                var left_leth  = d.test.toString().length;
                var left_x = 3 * parseInt(left_leth);
                return x(d.test) - left_x;
            })
            .attr('y', (parseInt(i) + 1) * line_heigth + 20) .style('font-size','8px').style('font-color','silver');
}


function set_variant_pic1_ok(x,svg,data_new,i,line_heigth){
    svg.selectAll('text_top_ok1').data(data_new).enter().append('line')
        .attr('x1', function (d) {
            return x(parseFloat(d.max) / 2) + parseFloat(d.title.length) * 5 - 16;
        })
        .attr('y1', (parseInt(i) + 1) * line_heigth - 12)
        .attr('x2', function (d) {
            return x(parseFloat(d.max) / 2) + parseFloat(d.title.length) * 5 - 10;
        })
        .attr('y2', (parseInt(i) + 1) * line_heigth - 6)
        .attr('stroke', '#00CC99').attr('stroke-width', '1.5');

    svg.selectAll('text_top_ok2').data(data_new).enter().append('line')
        .attr('x1', function (d) {
            return x(parseFloat(d.max) / 2) + parseFloat(d.title.length) * 5 - 10 - 0.5;
        })
        .attr('y1', (parseInt(i) + 1) * line_heigth - 6 - 0.5)
        .attr('x2', function (d) {
            return x(parseFloat(d.max) / 2) + parseFloat(d.title.length) * 5 + 2;
        })
        .attr('y2', (parseInt(i) + 1) * line_heigth - 18)
        .attr('stroke', '#00CC99').attr('stroke-width', '1.5');
}

function set_variant_pic1_not_ok(x,svg,data_new,i,line_heigth){
    svg.selectAll('text_top_not_ok1'+i).data(data_new).enter().append('line')
        .attr('x1', function (d) {
            return x(parseFloat(d.max) / 2) + parseFloat(d.title.length) * 5 - 12;
        })
        .attr('y1', (parseInt(i) + 1) * line_heigth - 18)
        .attr('x2', function (d) {
            return x(parseFloat(d.max) / 2) + parseFloat(d.title.length) * 5 - 2;
        })
        .attr('y2', (parseInt(i) + 1) * line_heigth - 8)
        .attr('stroke', 'silver').attr('stroke-width', '1.5');

    svg.selectAll('text_top_not_ok2'+i).data(data_new).enter().append('line')
        .attr('x1', function (d) {
            return x(parseFloat(d.max) / 2) + parseFloat(d.title.length) * 5 - 12;
        })
        .attr('y1', (parseInt(i) + 1) * line_heigth - 8)
        .attr('x2', function (d) {
            return x(parseFloat(d.max) / 2) + parseFloat(d.title.length) * 5 - 2;
        })
        .attr('y2', (parseInt(i) + 1) * line_heigth - 18)
        .attr('stroke', 'silver').attr('stroke-width', '1.5');
}

function svg_variant_pic2_BarChart(data1,has_data2){

    if(has_data2 == 0){
        var per_data = [];
        var x_data = [];
        var x_per = 5;
        for(var i = 0; i < 50; i++){
             per_data.push({
                'to':(i + 1) * x_per,
                'per':0
            });
        }

        for(var i = 25; i < 250;i++){
            if(i % 25 == 0){
                x_data.push(i);
            }
        }
    }else{
        var data2 = jQuery.parseJSON(data1);
        var data = data2[0]["data"];
        var x_label = data2[0]["x-lable"];
        var y_label = data2[0]["y-lable"];
        var length = data.length;

        var per_data = [];
        var x_data = [];
        var x_per = 5;
        for(var i = 0; i < length; i++){
             per_data.push({
                        'to':(i + 1) * x_per,
                        'per':data[i]["y"]
            });
        }

        for(var i = 25; i < 250;i++){
            if(i % 25 == 0){
                x_data.push(i);
            }
        }
    }

    set_variant_pic2_method(per_data,x_data,x_label,y_label);
}

function set_variant_pic2_method(data,x_data,x_label,y_label){
     var width = int_variant_data_table_d3 / 2 - 5, //600,
         height = width * 0.92,
         pad = 20,
         left_pad = 80;

    var x = d3.scale.ordinal().rangeBands([left_pad - pad, width - pad], 0.1);
    var y = d3.scale.linear().range([height - pad, pad]);

    var yAxis = d3.svg.axis().scale(y).orient("left");

    var svg = d3.select("#variant_sample_quality_pic2")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    x.domain(data.map(function (d) {
        return d.to;
    }));

    y.domain([0, d3.max(data, function (d) {
        return d.per;
    })]);

    var x2 = d3.scale.ordinal().rangeRoundBands([left_pad - pad, width - pad], 1);
    var xAxis2 = d3.svg.axis().scale(x2).orient("bottom");
    x2.domain(x_data.map(function (d) {
        return d;
    }));

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0, " + (height - pad) + ")")
        .call(xAxis2);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (left_pad - pad) + ", 0)")
        .call(yAxis);

    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .style('fill','#61B8DC')
        .attr('x', function (d) {
            return x(
                d.to
            );
        })
        .attr('width', x.rangeBand())
        .attr('y', height - pad)
        .transition("translate(" + (left_pad - pad) + ", 0)")
        .duration(800)
        .attr('y', function (d) {
            return y(d.per);
        })
        .attr('height', function (d) {
            return height - pad - y(d.per);
        });

}
