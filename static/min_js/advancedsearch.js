en_show=new Array("sample_id","case_no","patient_name","age","sex","subgroup","type","seq","stage","display_level","date_created");ch_show=new Array("样本号","病案号","病人姓名","年龄","性别","亚组","样本类型","测序类型","进度","显示级别","创建日期");$(document).ready(function(){$(".deletd_disc").click(function(){$("#bigsearchbox").val("")})});var searchNode;window.onload=function(){$(".minusBtn").click(function(){$(this).parent().remove()});$(".dropdownmenu").hide();$(".btn-default").click(function(){$(this).next().slideToggle()});$(".addBtn").click(function(){var b=searchNode.clone(true);$(".searchBox").append(b);b.html();var a=1});searchNode=$(".searchBox >.addBox").clone(true)};function change(){var d=document.getElementsByName("input_text1");var j=document.getElementsByName("equal-circle");var l=document.getElementsByName("search-input");var c=document.getElementsByName("input_text2");var g=document.getElementsByName("and_button");var b=document.getElementsByName("input_text3");var a=document.getElementsByName("equal-circle1");var e=document.getElementsByName("input_name4");var h=e.length;var k="(("+d[0].value+" "+j[0].value+" "+l[0].value+") "+c[0].value+" "+b[0].value+" "+a[0].value+" "+e[0].value+") ";var j;for(var f=1;f<h;f++){j[f]=c[f].value+" "+b[f].value+" "+a[f].value+" "+e[f].value+") ";k="("+k+j[f]}k=suffix+k;$("#bigsearchbox").val(k);return false}var suffix="";function load_history(c){var a=c.substr(3);var b="/sample/query/history/"+a+"/";$.ajax({url:b,type:"GET",async:false,success:function(h){if(h.success==false){alert(h)}else{alert(h);var f=JSON.parse(h);var j="query_sql";var g=f.data[0].query_sql;var d=ch_show.length;for(var e=0;e<d;e++){g=g.replace(en_show[e],ch_show[e])}alert(g);$("#bigsearchbox").val(g);suffix=g+" AND "}},error:function(d){alert("Search Fail:"+d.statusText+d.status)}})}$("select").change(function(){$(this).prev().val($(this).val());change()});$(".search-mode").change(function(){$("#search-input").val($(this).val());$("#search-input").val($(this).val())});$("#save_but").click(function(){var f=$("#bigsearchbox").val();var c=$("#input_text6").val();var a="";var b=en_show.length;for(var d=0;d<b;d++){f=f.replace(ch_show[d],en_show[d])}var e="query_name="+c+"&view_condition="+a+"&query_sql="+f;var g="/sample/query/history/";$.ajax({url:g,type:"POST",async:false,data:e,success:function(h){if(h.success==false){alert(h)}else{alert(h);$("#vagaaModal").remove();location.reload();alert("保存成功！")}},error:function(h){alert("Search Fail:"+h.statusText+h.status)}})});$("#analysis_a").click(function(){alert("保存成功！")});$("#history").change(function(){$(".history_att").remove();var b=$("#history").val();var a=$("#project_disease").val();$.ajax({url:"/advancedsearch/"+b+"/"+a+"/",type:"POST",success:function(e){var c=e;console.log(c);for(var d in c){$("#juery").append("<option class='history_att' value="+d+">"+c[d]+"</option>")}}})});$(".testabc").change(function(){$(".history_att1").remove();var b=$(".testabc").val();var a=$("#project_disease").val();$.ajax({url:"/advancedsearch/"+b+"/"+a+"/",type:"POST",success:function(j){var d=j;console.log(d);var g=document.getElementsByName("input_name4");var e=document.getElementsByName("input_text3");var h=g.length;for(var f=1;f<h;f++){}for(var c in d){$(".testabcs").append("<option class='history_att1' value="+c+">"+d[c]+"</option>")}}})});$("#search_jq").click(function(){var c=$("#juery").val();var a=$("#input_sec").val();if(c==""|a==""){swal("请输入至少一个查询条件！");return}var b="/advancedsearch/run/";$.ajax({url:b,type:"POST",async:false,data:{id:c,value:a},success:function(d){if(d.success==false){alert(d.patient_no)}else{alert(d);$("#search_ip").val(d.length)}},error:function(d){alert("Search Fail:"+d.statusText+d.status)}})});