require(["/config.js"],function(){
	
	require(["jquery","cookie","template"],function($,cookie,tmp){
		
		$(".fina_address").on("click",function(){
			$.ajax({
				type:"get",
				url:"http://www.mango918.com/shop/index.php?act=index&op=json_area&_=1506069659105",
				dataType: "jsonp",
				async:true,
				jsonp:"callback",
				jsonpCallback:"jQuery111309533957079228061_1506069659104",
				success:function(data){
					//点击选择区域
					$(".fina_chose").on("click","li",function(){
						var index = $(this).index();
						var id = 0;
						//点击省份
						if(index == 0) {
							$(".chose_address").html(tmp.template("chose_address",data[0]));
							$(".chose_address").on("click","span",function(ev){
								//点击省之后，市出来
								$(".province").text(this.innerText);
								id = this.getAttribute("value");
								$(".chose_address").html(tmp.template("chose_address",data[id]));
								
							});
						}
						if(index == 1) {
							$(".chose_address").html(tmp.template("chose_address",data[id]));
							$(".chose_address").on("click","span",function(ev){
								//点击省之后，市出来
								$(".city").text(this.innerText);
								id = this.getAttribute("value");
								$(".chose_address").html(tmp.template("chose_address",data[id]));
							});
						}
						
					})
					
					
					
				}
			});
		});
		
		
		
	});
	
	
});

