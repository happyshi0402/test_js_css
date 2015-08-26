/**
 * Created by shifeng on 2015/6/6.
 */
    var array_gene_for_d3_json;
    var task_id = $("#variant_hid_task_id").val();
    var max_gene_count = 0;
    var min_gene_count = 0;
    var gene_size;
    //$("#variant_chart1").click(function() {
    //初次加载
    showWait_for_d3($("#variant_d3_table"));//加载圈圈
    if ($("#variant_hid_app2").val()=="5"){
        d3.json("/variant/gene/d3_show_json/analysisapptwo/" + task_id + "/", function (root) {
            $("#wait2").hide();//圈圈隐藏
            array_gene_for_d3_json = root;
            paint_d3_gene_pic_load();
        });
    }else{
        d3.json("/variant/gene/d3_show_json/group/" + task_id + "/", function (root) {
            $("#wait2").hide();//圈圈隐藏
            array_gene_for_d3_json = root;
            paint_d3_gene_pic_load();
        });
    }
    //});

    //var variant_gene_svg_color = ["#d30505","#f92a2a","#fd5454","#d9c201","#f8e22c","#f8e969","#0579d3","#259af5","#67b7f5","#64f360","#B0F353"];
    //Sift = 0   #cc3216   无可救药
    //Sift = 0~0.01   #ee5438   看天意吧
    //Sift = 0.01~0.05  #eeb438   很危险
    //Sift = 0.05 ~ 1   #78d666    健康
    var variant_gene_svg_color = ["#cc3216","#ee5438","#eeb438","#78d666"];

    function color(gene_variant) {
        var gene_variant_percent = gene_variant;
        if(gene_variant_percent == 0){
            return variant_gene_svg_color[0];
        }
        if(gene_variant_percent > 0 && gene_variant_percent <= 0.01){
            return variant_gene_svg_color[1];
        }
        if(gene_variant_percent > 0.01 && gene_variant_percent <= 0.05){
            return variant_gene_svg_color[2];
        }
        if(gene_variant_percent > 0.05 && gene_variant_percent <= 1){
            return variant_gene_svg_color[3];
        }
    }

    var diameter = $(window).width() - 30,
        //  height = 500,
        height = 420;
        format = d3.format(",d");
       // color = category100c();


function paint_d3_gene_pic_load(){
     $("#variant_d3_pic_div1").children().remove();
     $("#variant_d3_pic_div2").children().remove();
     $("#variant_d3_pic_div3").children().remove();

    $("#variant_gene_count").val(1);
    $("#variant_gene_shift_score").val(100);
    var new_array_gene = classes(array_gene_for_d3_json);
    $("#variant_gene_text_count").val(new_array_gene.children.length);
    max_gene_count = d3.max(new_array_gene.children,function(d){
        return d.value;
    });
    min_gene_count = d3.min(new_array_gene.children,function(d){
        return d.value;
    });
    gene_size = parseInt(max_gene_count);
    $("#variant_gene_count").val(parseInt(gene_size/5));

    paint_d3_control_gene_show(array_gene_for_d3_json,"variant_d3_pic_div1","variant_d3_pic_div2","variant_gene_count",gene_size,max_gene_count);

    paint_d3_control_gene_show(array_gene_for_d3_json,"variant_d3_pic_div3","variant_d3_pic_div2","variant_gene_shift_score",100,100);

    $("#variant_gene_shift_score").val(100);
    paint_d3_for_variant_gene("variant_d3_pic_div2",array_gene_for_d3_json,diameter);
}

function paint_d3_control_gene_show(array_data,d3_id_control,d3_id_show,value_id,value,max){
    var local_height = height - 110;
    var svg = d3.select("td#"+d3_id_control).append("svg")
                            .attr("width", 110)
                            .attr("height", local_height)
                            .attr("class", "bubble");

    var data_rect = [{"x":50,"y":local_height * 0.9}];

    var bar_height = local_height * 0.90;
    var start = parseInt(value) * bar_height / max;

    svg.selectAll('rect3')
           .data(data_rect)
           .enter()
           .append('rect')
           .attr({
              id:'rect3'+value_id,
               x: function(d){return d.x},
               y: local_height * 0.05, rx: 5, ry: 5,
               width: 14,  //bands.rangeBand()
               height: local_height * 0.9
           })
           .style({
               'fill': '#e8e8e8'}
            ).on('click',function(){
                    $("#"+d3_id_show).children().remove();
                    var rect4 = d3.select('#rect4'+value_id);
                    //var div_top = $('#rect3'+value_id).offset().top;
                    var div_top = $(document).scrollTop() - 200;

                    if(value_id == "variant_gene_shift_score" ) {
                        var y_h = d3.event.y + div_top - bar_height;
                        var minux = y_h;
                        d = parseInt((start + minux) / (bar_height) * max);
                    }else{
                        var y_h = d3.event.y + div_top - bar_height;
                        var minux = y_h ;
                        d = parseInt((start + minux) / (bar_height) * max);
                    }
                    if(d == 0 || d == max){
                    }
                    if(d < 1 || d >= max){
                        if(d < 1) d =1;
                        if(d > max) d = max;
                    }

                    if(value_id == "variant_gene_shift_score" ){
                        $("#"+value_id).val(d);
                    }else{
                        $("#"+value_id).val(max - d + 1);
                    }

                    rect4.attr('transform', 'translate(0,'+ y_h +')');

                    paint_d3_for_variant_gene("variant_d3_pic_div2",array_data,diameter);
            });


    svg.selectAll('rect4')
               .data(data_rect)
               .enter()
               .append('rect')
               .attr({
                    id:'rect4'+value_id,
                   x: function(d){return d.x-4},rx : 4,ry :4,
                   y: local_height * 0.05 + parseInt(value) * local_height * 0.90 / max - 4,
                   width: 22,  //bands.rangeBand()
                   height: 10
               })
               .style({
                   'fill': '#0cafe2'
               });

    var minux = 0;
    var d = 0;
    var drag = d3.behavior.drag()
            .origin(Object)
            .on('drag', function () {
               if(array_data != null){
                    minux = d3.event.y;
                    d = parseInt((start  + minux)/(bar_height) * max);
                    if(d == 0 || d == max){
                    }
                    if(d < 1 || d >= max){
                        if(d < 1) d =1;
                        if(d > max) d = max;
                    }else{
                        d3.select(this)
                        .attr('transform', 'translate(0,'+d3.event.y+')')
                        .datum({x: 0, y: d3.event.y});
                    }
               }
            }).on('dragend', function () {
                if(array_data != null) {
                    if(value_id == "variant_gene_shift_score" ){
                        $("#"+value_id).val(d);
                    }else{
                        $("#"+value_id).val(max - d + 1);
                    }
                    $("#"+d3_id_show).children().remove();
                    //滑动控制条更新d3图
                    paint_d3_for_variant_gene("variant_d3_pic_div2",array_data,diameter);
                }
            });

    svg.select('#rect4'+value_id)
        .datum({x: 0, y: 0})
        .call(drag);
}

function paint_d3_for_variant_gene(id,root,diameter){
    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter/3 - 100, height + 200])
        .padding(1.5);

    var svg = d3.select("#"+id).append("svg")
        .attr("width", diameter - 280)
        .attr("height", height)
        .attr("class", "bubble");

    if(root != null) {
         var node = svg.selectAll(".node")
             .data(bubble.nodes(classes(root))
                 .filter(function (d) {
                     return !d.children;
                 }))
             .enter().append("g")
             .attr("class", "node")
             .attr("transform", function (d) {
                 //var d3 = getRandom(1) + 1 ;
                 var d3 = 3;
                 //document.write(d3);
                 return "translate(" + d3*d.x  + "," + 0.7*d.y + ")";
             });

         node.append("title")
             .text(function (d) {
                 return "基因:"+ d.className + ",致病性打分:"+ parseFloat(d.packageName) + ",突变数目: " + format(d.value);
             }).on("click",function(d){
                 //基因名 d.className
                 if(filter_sign == false) {
                    searchGene2(d.className);
                 } else {
                    searchGene(d.className);
                 }
             });

         node.append("circle")
             .attr("r", function (d) {
                 return d.r;
             })
             .attr('class','svg_gene_circle').attr("style", "cursor: pointer;")
             .style("fill", function (d) {
                 return color(d.packageName);
             }).on("click",function(d){
                 //基因名 d.className
                 if(filter_sign == false) {
                    searchGene2(d.className);
                 } else {
                    searchGene(d.className);
                 }
             }).on("mouseover",function(d){
                 d3.select(this).style({'stroke':'green','stroke-width': 5,'fill-opacity': .7});
             }).on("mouseout",function(d){
                 d3.select(this).style({'stroke':'','stroke-width': 0,'fill-opacity': 1});
             });

         //文字显示
         node.append("text")
             .attr("dy", function(d){
                 if( d.r > 50){
                     return ".2em"
                 }else{

                 }
             })
             .style("text-anchor", "middle")
             .text(function (d) {
                 if(d.className == undefined || d.className == null){
                    return '';
                 }else{
                     return d.className.substring(0, d.r / 3);
                 }
             });
     }else{
         alert("data is null!")
     }
}

function paint_d3_for_variant_gene_disease_pack(id,root,gene,diameter,height){
    var variant_gene_svg_color = ["#d30505","#f92a2a","#fd5454","#d9c201","#f8e22c","#f8e969","#0579d3","#259af5","#67b7f5","#64f360","#64f310"];

    function color(gene_variant_percent) {
        for(var i = 0;i <= 10;i++){
           if(gene_variant_percent >= i*10  && gene_variant_percent <= (i + 1)*10){
                return variant_gene_svg_color[10 - i];
           }
        }
    }

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter/3 , height ])
        .padding(1.9);

    var svg = d3.select("#"+id).append("svg")
        .attr("width", diameter - 30)
        .attr("height", height - 40)
        .attr("class", "bubble");

    if(root != null) {
         var node = svg.selectAll(".node")
             .data(bubble.nodes(classes_disease(root,gene))
                 .filter(function (d) {
                     return !d.children;
                 }))
             .enter().append("g")
             .attr("class", "node")
             .attr("transform", function (d) {
                 var d3 = 3 ;
                 return "translate(" + d3*d.x  + "," + 0.7*d.y + ")";
             });

         node.append("title")
             .text(function (d) {
                 if(d.packageName != "100"){
                     return "疾病:"+ d.className + ",相关性打分:0."+ d.packageName + ",文献数: " + format(d.value)+ ",相关类型:" + d.association_type;
                 }else{
                     return "疾病:"+ d.className + ",相关性打分:0.:1.00,文献数:: " + format(d.value)+",相关类型:"+d.association_type;
                 }
             }).on("click",function(d){
                 //基因名 d.className
                 //if(filter_sign == false) {
                 //   searchGene2(d.className);
                 //} else {
                 //   searchGene(d.className);
                 //}
             });

         node.append("circle")
             .attr("r", function (d) {
                 return d.r;
             })
             .attr('class','svg_gene_circle').attr("style", "cursor: pointer;")
             .style("fill", function (d) {
                 return color(d.packageName/10);
             }).on("click",function(d){
                 //基因名 d.className
                 //if(filter_sign == false) {
                 //   searchGene2(d.className);
                 //} else {
                 //   searchGene(d.className);
                 //}
             }).on("mouseover",function(d){
                 d3.select(this).style({'stroke':'green','stroke-width': 5,'fill-opacity': .7});
             }).on("mouseout",function(d){
                 d3.select(this).style({'stroke':'','stroke-width': 0,'fill-opacity': .5});
             });

         //文字显示
         node.append("text")
             .attr("dy", function(d){
                 if( d.r > 50){
                     return ".2em"
                 }else{

                 }
             })
             .style("text-anchor", "middle")
             .text(function (d) {
                 if(d.className == undefined || d.className == null){
                    return '';
                 }else{
                     return d.className.substring(0, d.r / 4);
                 }
             });
     }else{
         alert("data is null!")
     }
}

function paint_d3_for_variant_gene_disease_bar(id,root,gene,diameter,height){
    //var variant_gene_svg_color = ["#d30505","#f92a2a","#fd5454","#d9c201","#f8e22c","#f8e969","#0579d3","#259af5","#67b7f5","#f92a2a","#64f310"];
    //var variant_gene_svg_color = ["#0498ff", "#1da2ff", "#36adff", "#4fb7ff", "#68c1ff", "#81cbff", "#9bd6ff", "#b3e0ff", "#cdeaff", "#e55f4ff", "#cdeaff","#cdeaff"];

    var variant_gene_svg_color = ['#EF3B39', '#FFCD05', '#69C9CA', '#666699', '#CC3366', '#0099CC',
                '#CCCB31', '#009966', '#C1272D', '#F79420', '#445CA9', '#999999',
                '#402312', '#272361', '#A67C52', '#016735', '#F1AAAF', '#FBF5A2',
                '#A0E6DA', '#C9A8E2', '#F190AC', '#7BD2EA', '#DBD6B6', '#6FE4D0'];

    function color(gene_variant_percent) {
        for(var i = 0;i <= 10;i++){
           // document.write(gene_variant_percent + "\n");
           if(gene_variant_percent > (i-1)*10  && gene_variant_percent <= i*10){
                return variant_gene_svg_color[10 - i];
           }
        }
    }

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter/3 , height ])
        .padding(1.9);

    var svg = d3.select("#"+id).append("svg")
        .attr("width", diameter - 30)
        .attr("height", height - 40)
        .attr("class", "bubble");

    if(root != null) {
         var data = classes_disease2(root,gene);

        data.sort(function (a, b) {
          if (a.packageName > b.packageName) {
            return -1;
          }
          if (a.packageName < b.packageName) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });

        if(data.length> 40){
            data = data.slice(0,40);
        }

        data.sort(function (a, b) {
          if (a.value > b.value) {
            return -1;
          }
          if (a.value < b.value) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });

        if(data.length> 20){
            data = data.slice(0,20);
        }

         var width = diameter -  100,
            height = height,
            pad = 20,
            left_pad = 100;

        var x = d3.scale.linear().range([pad,width]);  //100  880  0.1
        var y = d3.scale.ordinal().rangeRoundBands([ pad,height-pad], 0.2);  // 280,20

        x.domain([0,d3.max(data, function (d) {
            return d.value
        })]);
        y.domain(data.map(function (d) { return d.className; }));

        var rect = svg.selectAll('rect')
            .data(data)
            .enter().append("g");

        rect.append('rect')
             .attr('class', 'bar')
             .attr("style", "cursor: pointer;")
             .style("fill", function (d) {
                   // return '#0498ff';
                 return color(d.packageName/10);
             })
            .style('fill-opacity',function(d){
                if(d.packageName == 0){
                    return 0;
                }else{
                    return 1.2;
                }
            })
            .style({'stroke-width':function(d){
                if(d.packageName != 0){
                    return 0;
                }else{
                    return 1;
                }
            },'stroke':function(d){
                return color(d.packageName/10);
            }})
            .attr('x', -width)
            .transition()
            //.delay(function (d) { return d.N*20; })
            .duration(800)
            .attr('rx',function(){
                if(y.rangeBand() > 20){
                    return 20/3;
                }else{
                    return y.rangeBand()/3;
                }
            })
           .attr('ry',function() {
                if (y.rangeBand() > 20) {
                    return 20 / 3;
                } else {
                    return y.rangeBand() / 3;
                }
            }).attr('x', function (d) { return x(
               0
             ); })
            .attr('width',  function (d) {
                if(d.value == 0) return x(0.5);
                else
                return  x(d.value)
            } )
            .attr('id',  function (d) { return  'bar'+parseInt(x(d.className)) } )
            .attr('y', function (d) { return y(d.className) - pad +  y.rangeBand()/2; })
            .attr('height',  function(d){
                if(y.rangeBand() > 20){
                    if(d.packageName != 0){
                        return 20;
                    }else{
                        return 20 - 1;
                    }
                }else{
                     if(d.packageName != 0){
                        return y.rangeBand();
                    }else{
                        return y.rangeBand()- 1;
                    }
                }
            });

        rect.append("title") .attr("fill", function (d) {
                 return color(d.packageName/10);
             }).attr('stroke','black')
             .text(function (d) {
                 if(d.packageName != "100"){
                     return "疾病:"+ d.className + ",相关性打分:0."+ d.packageName + ",文献数: " + format(d.value)+ ",相关类型:" + d.association_type;
                 }else{
                     return "疾病:"+ d.className + ",相关性打分:0.:1.00,文献数:: " + format(d.value)+",相关类型:"+d.association_type;
                 }
             });

        //文字显示
        rect.append("text").attr("dx",x(0) + 10)
             .attr("dy",function (d) { return y(d.className) + y.rangeBand()/2 - pad/3; })
             .style("text-anchor", "right")
             .text(function (d) {
                 if(d.className == undefined || d.className == null){
                     return '';
                 }else{
                     return d.className;
                 }
             });
     }else{
         alert("data is null!")
     }
}

function classes_disease(root,gene) {
    //document.write(root);
    //alert(jinlaile);
    var classes = [];

    function recurse2(name, node) {
        if (node.children){
            if(node.name == gene){
                node.children.forEach(function(child) { recurse2(node.name,child); });
            }
        } else {
            classes.push({packageName: node.score, className: node.name, value: node.size,association_type:node.association_type});
        };
    }
    recurse2(null, root);
    return {children: classes};
}

function classes_disease2(root,gene) {
    //document.write(root);
    //alert(jinlaile);
    var classes = [];

    function recurse2(name, node) {
        if (node.children){
            if(node.name == gene){
                node.children.forEach(function(child) { recurse2(node.name,child); });
            }
        } else {
            classes.push({packageName: node.score, className: node.name, value: node.size,association_type:node.association_type});
        };
    }
    recurse2(null, root);
  return  classes;
}

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
    var d1 = $("#variant_gene_count").val();
    var d2 = 100 - $("#variant_gene_shift_score").val();
    var classes = [];
    //var type1 = $("#variant_gene_count_type").val();
    //var type2 = $("#variant_gene_shift_score_type").val();
    var type1 = ">=";
    var type2 = ">=";
    //if(d2 == 0)d2 = 1;

  function recurse(name, node,d1,d2,type1,type2) {

    if (node.children){
        if(node.name == "gene"){
            node.children.forEach(function(child) { recurse(node.name, child,d1,d2,type1,type2); });
        }else{
            if(type2 == ">="){
                if(parseInt(node.name) >= d2 )
                    node.children.forEach(function(child) { recurse(node.name, child,d1,d2,type1,type2); });
            }else if(type2 == "="){
                if(parseInt(node.name) == d2 )
                    node.children.forEach(function(child) { recurse(node.name, child,d1,d2,type1,type2); });
            }else if(type2 == "<="){
                 if(parseInt(node.name) <= d2 )
                    node.children.forEach(function(child) { recurse(node.name, child,d1,d2,type1,type2); });
            }
        }
    } else {
        //document.write( node.name);
        if(type1 == ">=" && type2 == ">="){
            if(node.size >= d1 && parseInt(node.score) >= d2)
                classes.push({packageName: node.score, className: node.name, value: node.size});
        }else if(type1 == "=" && type2 == ">="){
            if(node.size == d1 && parseInt(node.score) >= d2 )
                classes.push({packageName: node.score, className: node.name, value: node.size});
        }else if(type1 == "<=" && type2 == ">="){
             if(node.size <= d1 && parseInt(node.score) >= d2)
                classes.push({packageName: node.score, className: node.name, value: node.size});
        }
    };
  }

  recurse(null, root,d1,d2,type1,type2);
  return {children: classes};
}

d3.select(self.frameElement).style("height", height  + "px");