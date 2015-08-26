/**
 * Created by lsl on 2015/8/11.
 */
$(function(){
    showWait();

    var barData=$("#barData").val();
    var data=JSON.parse(barData);
    console.log(data);

    for(var i=0;i<data["attributes"].length;i++){
        var dataset = [];
        var dataSetX=[];
        var name=data["attributes"][i]["name"]+"柱状图";
        for(var j = 0; j <data["attributes"][i]["data"].length ; j++){
            dataset.push(data["attributes"][i]["data"][j]["count"]);
            dataSetX.push(data["attributes"][i]["data"][j]["key"]);
        }
        drawBar("barDiv",name,dataSetX,dataset,700,600,"bar_"+i);//对应bar_i
    }
    hideWait();
    $("#figure_0").click();
});

//d3画柱状图
function drawBar(fatherID,name,dataSetX,dataset,barWidth,barHeight,id){

    var svg = d3.select("#"+fatherID).append("svg").attr("id",id)
        .attr("width",barWidth)
        .attr("height",barHeight)
        //.append("text")
        //.attr("x" ,barWidth/3)
        //.attr("y",10)
        //.text(name );

    var xAxisScale = d3.scale.ordinal()
        .domain(dataSetX)
        .rangeRoundBands([0,500]);

    var yAxisScale = d3.scale.linear()
        .domain([0,d3.max(dataset)])
        .range([500,0]);

    var xScale = d3.scale.ordinal()// 构造一个序数比例尺。
        .domain(d3.range(dataSetX.length))
        .rangeRoundBands([0,500],0.1);

    var yScale = d3.scale.linear()// 构建一个线性定量比例尺。
        .domain([0,d3.max(dataset)])
        .range([0,500]);

    var xAxis = d3.svg.axis()
        .scale(xAxisScale)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(yAxisScale)
        .orient("left");

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d,i){
            return 30+ xScale(i);
        } )
        .attr("y",function(d,i){
            return 50 + 500 - yScale(d) ;
        })
        .attr("width", function(d,i){
            return xScale.rangeBand();
        })
        .attr("height",function(d,i){
            return yScale(d);
        })
        .attr("fill","steelblue")
        .on("click",function(d,i){
            d3.select(this)
                .attr("fill","green");
        })
        .on("mouseover",function(d,i){
            d3.select(this)
                .attr("fill","yellow");
        })
        .on("mouseout",function(d,i){
            d3.select(this)
                .transition()
                .duration(500)
                .attr("fill","steelblue");
        });

    svg.selectAll("text")
        .data(dataset)
        .enter().append("text")
        .attr("x", function(d,i){
            return 30 + xScale(i);
        } )
        .attr("y",function(d,i){
            return 50 + 500 - yScale(d) ;
        })
        .attr("dx", function(d,i){
            return xScale.rangeBand()/5;
        })
        .attr("dy", 15)
        .attr("text-anchor", "begin")
        .attr("font-size", 14)
        .attr("fill","white")
        .text(function(d,i){
            return d;
        });

    svg.append("g")
        .attr("class","axis")
        .attr("transform","translate(30,550)")
        .call(xAxis);

    svg.append("g")
        .attr("class","axis")
        .attr("transform","translate(30,50)")
        .call(yAxis);
}
//切换柱状图
function showBar(id){
    $(".figureItem").removeClass("current");
    $("#figure_"+id).addClass("current");
    $("#bar_"+id).show()
        .siblings("svg").hide();
}