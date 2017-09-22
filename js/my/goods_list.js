require(["/config.js"],function(){
	require(["jquery","template","cookie"],function($,tmp,cookie){
		//加载头部
		$("#common_top").load("./common_top.html",function(){
			//商品列表的隐藏与显示
			$.getScript("../js/my/common_top.js");
			
			$(".all_kinds .kinds_ul").css({"display":"none"});
			
			$(".all_kinds").on("mouseenter",function(){
				$(".all_kinds .kinds_ul").fadeIn(15);
			})
			
			
			$(".all_kinds").on("mouseleave",function(){
				$(".all_kinds .kinds_ul").fadeOut(15);
			})
			
			//动态加载数据
			var $goods_wrap = $(".goods_wrap");
			
	
			$.getJSON("/json/index.json",function(data){
				
				$goods_wrap.html(tmp.template("goods_list",data.skulist));
				
				//点击购物车的时候，加购
				$(".add_cart").on("click",function(ev){
					var target = ev.target;
					var _parent = target.parentNode.parentNode;
					add_cart(_parent);
					
					var goods_list = JSON.parse(cookie.get("goods"));
					$(".cart_detail").html(tmp.template("cart_list",goods_list));
						
					
				})
			});
		});
		
		//添加购物车的方法
		function add_cart(obj) {
			var list = [];
			var good = {
				"img_url" : obj.children[0].children[0].src,
				"goods_price" : obj.children[1].innerText,
				"title" : obj.children[2].innerText,
				"num" : 1
			}
			var list_str = cookie.get("goods");
			//如果cookie存在
			if(list_str) {
				list = JSON.parse(list_str);
				var new_array = list.filter(function(item,index,array){
					return item.img_url == good.img_url;
				});
				if(new_array.length == 0) {
					list.push(good);
				}else {
					new_array[0].num++;
				}
				//cookie中不存在
			}else {
				list.push(good);
			}
			var str = JSON.stringify(list);
			cookie.set("goods",str,7);
		}
		
		$("#common_foot").load("./common_foot.html");
		
		
	})
	
});

		