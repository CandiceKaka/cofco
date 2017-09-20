require(["/cofco/config.js"],function(){
	
	require(["jquery","template"],function($,tmp){
		
		$("#common_top").load("./common_top.html",function(){
			//商品列表的隐藏与显示
			$(".all_kinds .kinds_ul").css({"display":"none"});
			$(".all_kinds h2").on("mouseenter",function(){
				$(".all_kinds .kinds_ul").show(500,"linear");
			})
			
			$(".all_kinds h2").on("mouseleave",function(){
				$(".all_kinds .kinds_ul").hide(500,"linear");
			});
		});
		
		//放大镜
		$(".big_img").on("mouseenter",function(ev){
			$(".rec").show();
			$(".scale_img").show();
			$(".big_img").mousemove(function(ev){
				var _left = Math.max(0,Math.min(400-148,(ev.clientX - $(this).offset().left - 74)));
				var _top = Math.max(0,Math.min(400-148,(ev.clientY - $(this).offset().top - 74)));
				$(".rec").css({"left":_left,"top":_top});
				
				$(".scale_img img").css({
					"left":-2.7*_left,
					"top":-2.7*_top
				});
			});
			
		});
		$(".big_img").on("mouseleave",function(){
			$(".rec").hide();
			$(".scale_img").hide();
		})
		
		
		//商品规格选择
		$(".choose1 li,.g li").on("mouseenter",function(){
			$(this).css("border","2px solid #c40000");
			$(this).siblings().css("border","1px solid #ccc");
		})
		$(".choose1 li,.g li").on("click",function(){
			$(this).find("i").show();
			$(this).siblings().find("i").hide();
		});
		$(".choose1 li").on("click",function(){
			$(".choose").find("span").eq(0).text($(this).text());
		})
		$(".g li").on("click",function(){
			$(".choose").find("span").eq(1).text($(this).text());
		})
		
//		//自动生成评论
//		$.post("http://m.womai.com/product/getcomments.action",{"pid":80313},function(data){
//			console.log(data);			
//		})
		
//		$.ajax("http://m.womai.com/product/getcomments.action?pid=80313",{
//			dataType:"jsonp",
//			success:function(data){
//				console.log(data);
//			}
//		});
		
		
	});
	
	
});
