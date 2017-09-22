require(["/config.js"],function(){
	
	require(["jquery","template"],function($,tmp){
		
		//加载公共的头部
		$("#common_top").load("./common_top.html",function(){
			
			$.getScript("/js/my/common_top.js");
			
			//商品列表的隐藏与显示
			$(".all_kinds .kinds_ul").css({"display":"none"});
			$(".all_kinds").on("mouseenter",function(){
				$(".all_kinds .kinds_ul").fadeIn(500);
			})
			
			//一大块详细列表的显示与隐藏
			$(".all_kinds").on("mouseleave",function(){
				$(".all_kinds .kinds_ul").fadeOut(500);
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
			$(this).siblings().css("border","1px solid #ccc");
			$(this).css("border","2px solid #c40000");
			$(this).find("i").show();
			$(this).siblings().find("i").hide();
		});
		
		
		$(".choose1 li").on("click",function(){
			$(".choose").find("span").eq(0).text($(this).text());
		})
		$(".g li").on("click",function(){
			$(".choose").find("span").eq(1).text($(this).text());
		})
		
//		//模版自动生成评论
		$.post("/product/getcomments.action",{"pid":80313},function(data){
			data = JSON.parse(data)
			$(".common_con_wrap").html(tmp.template("common_data",data["questionlist"]));
		})

		//图片的轮播切换
		var timer = setInterval(autoPlay,2000);
		
		$(".small_ico li").on("mouseenter",function(){
			clearInterval(timer);
			var _index = $(this).index();
			
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
			
			$(".big_ico li").eq(_index).show();
			$(".big_ico li").eq(_index).siblings().hide();
		})
		
		$(".small_ico li").on("mouseleave",function(){
			clearInterval(timer);
			timer = setInterval(autoPlay,2000);
		})
		
		var index = 0;
		function autoPlay() {
			var now_current = index % 8;
			$(".big_ico li").eq(now_current).show();
			
			$(".big_ico li").eq(now_current).siblings().hide();
			
			$(".small_ico li").eq(now_current).addClass("active");
			$(".small_ico li").eq(now_current).siblings().removeClass("active");
			index++;
		};
		
		$(window).on("scroll",function(){
			if($(this).scrollTop() > 1000 && $(this).scrollTop()<7000) {
				$(".fixed_common").fadeIn(500);
			}else {
				$(".fixed_common").fadeOut(100);
			}
		})
		
		
		
		//加载尾部
		$("#common_foot").load("./common_foot.html")
	});
	
	
});
