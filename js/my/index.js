require(["/config.js"],function(){
	require(["jquery","swiper","cookie"],function($,swp,cookie){
		
		$("#common_nav").load("./html/common_top.html",function(){
			$.getScript("./js/my/common_top.js");
		});
		
		$("#common_foot").load("./html/common_foot.html");
		//首页大图换成小图
			setTimeout(function(){
				$(".top_img").animate({"height":0},500,function(){
					$(".top_img img").attr("src","img/index/index_top.jpg");
					$(".top_img").animate({"height":"100px"});
				});
			},1000);
			
		//中间的大的轮播图
		var mySwiper1 = new swp('#swiper-container1',{
			autoplay:2000,
			effect: "fade",
			pagination:'.swiper-pagination',
			prevButton: '.swiper-button-prev',
			nextButton: '.swiper-button-next',
			paginationClickable: true,
			loop:true,
		});
		
		//鼠标划到分页器的时候，图片跟着动
		$('#swiper-container1 .swiper-pagination').on("mouseenter",'span',function(){
			console.log(mySwiper1)
			var index = $(this).index();
			mySwiper1.slideTo(index+1);
		})
		
		//当鼠标滑到图片上的时候，出现点击按钮
		$(".swiper-container").on("mouseenter",function(){
			$(".swiper-button-prev").show();
			$(".swiper-button-next").show();
		});
//		
		$(".swiper-container").on("mouseleave",function(){
			$(".swiper-button-prev").hide();
			$(".swiper-button-next").hide();
		});
		
		//每日劲爆轮播图
		var mySwiper = new swp(".swiper-container2",{
			prevButton: '.swiper-button-prev',
			nextButton: '.swiper-button-next',
			paginationClickable: true,
			loop:true,
//			autoplay:1000
		});
		
		
//		楼层轮播图
		var mySwiper = new swp(".floor_container",{
			prevButton:".swiper-button-prev",
			nextButton:".swiper-button-next",
			pagination: ".swiper-pagination",
			paginationClickable:true,
			loop:true,
		});
	
		
		//楼层的选项卡的切换
		$(".floor_tab").on("mouseenter",function(){
			var a = $(this).parents(".first_floor").find(".first_right .floor_tab_con");
			a.eq($(this).index()-2).show();
			a.eq($(this).index()-2).siblings().hide();
		});
		
		
		
		//轮播图右侧的选项卡
		$(".title a").on("mouseenter",function(){
			$(this).addClass("title_active");
			$(this).siblings().removeClass("title_active");
			$(".tab").find("ul").hide();
			$(".tab ul").eq($(this).index()).show();
		})
		
		
		
		
		scroll();
		navInit();
		back2Top();
		//滚轮事件
		function scroll() {
			$(window).scroll(throttle(function(){
				var _scrollTop = $(this).scrollTop();
				if(_scrollTop > 1000) {
					$(".xiding").fadeIn();
				}
				if(_scrollTop < 1000) {
					$(".xiding").fadeOut();
				}
				var floor_count = $(".floor_nav").children().length;
				if(_scrollTop>1744 && _scrollTop<1744 +floor_count*554) {
					$(".floor_nav").fadeIn();
				}else {
					$(".floor_nav").fadeOut();
				}
				var _index = parseInt((_scrollTop-1944)/554);
				$(".floor_nav").find("li").eq(_index).addClass("active")
				$(".floor_nav").find("li").eq(_index).siblings().removeClass("active")
			},50));
		};
		
		//楼梯导航的
		function navInit() {
			$(".floor_nav li:not(:last)").click(function(){
				var _index = $(this).index();
				$(window).scrollTop(_index*554+1944);
			});
		}
		
		//回到顶部
		function back2Top() {
			$(".floor_nav .last").click(function(){
				$(window).scrollTop(0);
			});
		}
		
		
		//函数节流的函数
		function throttle(cbk,delay) {
			var timeout = null;
			return function() {
				clearTimeout(timeout);
				timeout = setTimeout(function(){
					cbk();
				},delay);
			}
		}
	})

});
