$("#sample_tab_flag").val(4);function getProject_no(b){$("#myModalLabel_project").text("修改项目");$("#project_no").val(b);var d=$("#id"+b).children().select("span");$("#project_name").val(d.eq(0).children().select("a").eq(0).attr("title"));$("#description").val(d.eq(1).attr("title"));var a=$("#pro_display_level"+b).val();$("#display_level").val(a);$("#submit_add_project").hide();$("#submit_edit_project").show();var c=$("#pro_role"+b).val();if(c==0){$("#project_name").attr("readonly",false);$("#description").attr("readonly",false);$("#display_level_readonly").val(1);$("#project_name").focus()}else{if(c==1){$("#project_name").attr("readonly",true);$("#description").attr("readonly",false);$("#display_level_readonly").val(1);$("#description").focus()}else{if(c==2){$("#project_name").attr("readonly",true);$("#description").attr("readonly",false);$("#display_level_readonly").val(2);$("#description").focus()}else{if(c==3){$("#project_name").attr("readonly",true);$("#description").attr("readonly",true);$("#display_level_readonly").val(2)}}}}set_pro_display_level(a)}function set_value_for_new_project2(a){$("#myModalLabel_project").text("新建项目");$("#project_name").attr("readonly",false);$("#description").attr("readonly",false);$("#display_level_readonly").val(1);set_pro_display_level(1);$("#project_no").val("");$("#project_name").val("");$("#description").val("");$("#display_level").val(a);$("#submit_add_project").show();$("#submit_edit_project").hide()}function setDisplay_level(a){if(a=="1"){$("ol.breadcrumb li:last").replaceWith("<li><a class='active' href='/project/#0'>我的项目</a></li>");$("#bt_my_project").addClass("on");$("#bt_public_project").removeClass("on");if(project_model_array[0]==0){$("#my_project").load("/project/list/mine/",function(){project_model_array[0]=1})}}else{$("ol.breadcrumb li:last").replaceWith("<li><a  class='active' href='/project/#1'>公共项目</a></li>");$("#bt_public_project").addClass("on");$("#bt_my_project").removeClass("on");if(project_model_array[1]==0){$("#public_project").load("/project/list/public/",function(){project_model_array[1]=1})}}$("#pro_tab_flag").val(a)}$(function(){var a=this.location.href.split("#")[1];switch(a){case"0":$("<li><a class='active' href='/project/#0'>我的项目</a></li>").appendTo($("ol.breadcrumb"));break;case"1":$("<li><a class='active' href='/project/#1'>公共项目</a></li>").appendTo($("ol.breadcrumb"));break;default:$("<li><a class='active' href='/project/#0'>项目</a></li>").appendTo($("ol.breadcrumb"));break}});