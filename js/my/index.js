require(["http://localhost:8080/config.js"],function(){
	require(["jquery","swiper"],function($,swp){
		$("#common_nav").load("./html/common_top.html",function(){
			
		});
		$("#common_foot").load("./html/common_foot.html");
		
		//中间的大的轮播图
		var mySwiper = new swp('#swiper-container1',{
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
			var index = $(this).index();
			mySwiper.slideTo(index+1)
		})
		
		//当鼠标滑到图片上的时候，出现点击按钮
//		$(".swiper-wrapper").on("mouseenter",function(){
//			$(".swiper-button-prev").show();
//			$(".swiper-button-next").show();
//		});
//		
//		$(".swiper-wrapper").on("mouseleave",function(){
//			$(".swiper-button-prev").hide();
//			$(".swiper-button-next").hide();
//		});
//		
		
		//轮播图右侧的选项卡
		$(".title a").on("mouseenter",function(){
			$(this).addClass("title_active");
			$(this).siblings().removeClass("title_active");
			$(".tab").find("ul").hide();
			$(".tab ul").eq($(this).index()).show();
		})
		
		
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
			$(".floor_tab_con").eq($(this).index()-2).show();
			$(".floor_tab_con").eq($(this).index()-2).siblings().hide();
		});
		
		
		//楼梯导航
//		function scroll() {
//			$(window).scroll(
//				throttle(function(){
//				console.log(1111);
//			}),500)
//		}
//		
		
		scroll();
		navInit();
		back2Top();
		//滚轮事件
		function scroll() {
			$(window).scroll(throttle(function(){
				var _scrollTop = $(this).scrollTop();
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
