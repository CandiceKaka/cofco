require(['http://localhost:8080/config.js'],function(){
	
	require(['jquery','template'],function($,tmp){
		
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
		
	
	});
	
	
	
});
