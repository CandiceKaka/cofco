require(['/config.js'],function(){
	
	require(['jquery','template','cookie'],function($,tmp,cookie){
		
//		划过Li
		$(".all_kinds").on("mouseenter",function(){
			$(".sub_wrap").show(15);
		});
		
		$(".all_kinds").on("mouseleave",function(){
			$(".sub_wrap").hide(15);
		})
		
		var $inpText = $(".text");
		
		//当搜索框获得焦点的时候，就把里面的内容清空
		$inpText.on("focus",function(){
			if(this.value == "中秋进口礼 橄榄油低至149元") {
				this.value = "";
			}else {
				this.value = this.value;
			}
		})
		
		//搜索的时候,发送ajax出现提示框
		var $data_list = $(".sug_drop_list");
		$(".text").on("keyup",function(){
			$.ajax("http://suggestion.baidu.com/su?wd="+$inpText.val()+"&cb=?",{
				dataType:"jsonp",
				success:function(data){
					$data_list.show();
					$data_list.html(tmp.template("sug_data_list",data.s)); 
				}
			});
		});
		
		//点击出现的提示下拉框消失
		$data_list.on("click",function(ev){
			if(ev.target.nodeName=="LI") {
				$inpText.val(ev.target.innerText);
				$(this).hide();
			}else {
				$(this).hide();
			}
		});
		
		
		//点击导航栏的购物车的时候，购物车详情出现
		var isShow;
		$(".nav_cart").on("click",function(){
			if(isShow) {
				isShow = false; 
				$(".nav_cart_list").hide();
				this.style.border = "none";
			}else {
				isShow=true;
				$(".nav_cart_list").show();
				this.style.border = "1px solid green";
			}
		});
		
		//右侧固定的导航栏出现与消失
		$(".fixed_cart").on("click",function(){
			if( parseInt($(".wm_fixed").css("right"))==0 ) {
				$(".wm_fixed").animate({"right":"-276px"},500);
			}else {
				$(".wm_fixed").animate({"right":"0"},500);
			}
		});

		//固定导航栏中的商品信息
		
		//从cookie中获取数据，然后加入到固定导航栏的购物车列表
		var goods_list = JSON.parse(cookie.get("goods"));
		$(".cart_detail").html(tmp.template("cart_list",goods_list));
		
		//给整个右侧的固定框添加一个委托事件
		$(".right_fixed").on("click",function(ev){
//			console.log(cookie.get("goods"));
			var target = ev.target;
			//删除功能
			if(target.className == "dis") {
				$(target).parent().parent().parent().animate({"right":"-276px"},500);
			}
			if(target.className == "del") {
				var _parent = $(target).parent().children();
				//被删除的商品的名称
				var _title =_parent.eq(0).text();
				//删除节点
				var _money = parseInt(_parent.eq(1).text().substring(1));
				var _num = parseInt(_parent.eq(3).text());
				
				all_num -= _num;
				all_money -= _num*_money;
				$(".all_num").text(all_num);
				$(".all_money").text(all_money);
				
				$(target).parent().parent().remove();
				//从cookie中移除
				//吧名称和删除的节点名称不相等的数据保留
				var new_array = goods_list.filter(function(item,index,array){
					return item.title !== _title;
				});
				
				var str = JSON.stringify(new_array);
				//从数组中删除那个元素
				cookie.set("goods",str,7,'/');
				$(".all_num").text(all_num);
				$(".all_money").text(all_money);
			}
			
			
		});
		
		//更新购物车的数量和价钱
		window.all_num = 0;
		window.all_money = 0;
		window.count = function(){
			for(var i=0;i<goods_list.length;i++) {
				all_num += goods_list[i].num;
				var money = goods_list[i].goods_price.substring(1);
				all_money +=  parseInt(money)* parseInt(goods_list[i].num);
			}
			$(".all_num").text(all_num);
			$(".all_money").text(all_money);
		}
		count();
	});
});
