require(["http://localhost:8080/config.js"],function(){
	require(["jquery","template"],function($,tmp){
		
		//加载头部
		$("#common_top").load("./common_top.html",function(){
			//商品列表的隐藏与显示
			$(".all_kinds .kinds_ul").css({"display":"none"});
			$(".all_kinds h2").on("mouseenter",function(){
				$(".all_kinds .kinds_ul").show(500,"linear");
			})
			
			$(".all_kinds h2").on("mouseleave",function(){
				$(".all_kinds .kinds_ul").hide(500,"linear");
			})
			
			
			//动态加载数据
			var $goods_wrap = $(".goods_wrap");
			
	
			$.getJSON("/cofco/json/index.json",function(data){
				$goods_wrap.html(tmp.template("goods_list",data.skulist));
			});
			
			
		});
		
		$("#common_foot").load("./common_foot.html");
		
	})
	
	
});


//		$.ajax("http://localhost:8080/json/index.json",{
//			dataType:"jsonp",
//			success:function(data) {
//				console.log(111);
//				console.log(data.skulist);
//				$goods_wrap.html(tmp.template("goods_list",data.skulist));
//			}
//		});
		