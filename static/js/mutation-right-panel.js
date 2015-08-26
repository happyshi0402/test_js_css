//筛选 右侧展开面板
$(function() {
    $(".floatL").click(function(){
		var i=$("#floatTools").css("right");
		if (i=='0px'){
			$('#floatTools').animate({right:-372}, 200);
		} else {
			$('#floatTools').animate({right:0}, 200);
		}
	});
});

//新建Gene set设置 右侧展开面板
$(function() {
    $(".newGene").click(function(){
		var t=$(".GeneWin").css("right");
		if (t=='0px'){
			$('.GeneWin').animate({right:-400}, 200);
		} else {
			$('.GeneWin').animate({right:0}, 200);
		}
	});
});