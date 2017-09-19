require(["http://localhost:8080/config.js"],function(){
	require(["jquery","common"],function($){
		//引入公共的头部和底部
		$("#common_top").load("./common_login_reg_top.html");
		$("#common_foot").load("./common_login_reg_foot.html");
		
		//表单验证
		var aInputs = $("input[name='inputCheck']");
		aInputs = Array.from(aInputs);
		var Regs = {
			mobile:/^[1][0-9]{10}$/,
			passwords:/^[0-9a-zA-Z]{8,16}$/,
//			passwords:/^[a-zA-Z0-9]{6,20}$/,
			username:/^[a-z-A-Z][a-z0-9A-Z]{7,16}$/
		}
		
		//遍历循环每一个需要进行验证的表单
		aInputs.forEach(function(oInput){
			$(oInput).on("keyup",function(){
				var isTrue = Regs[$(oInput).attr("pattern")].test(this.value);
				if(!isTrue) {
					$(this).css("borderColor","#ff8080");
					$(this).siblings().css("visibility","visible");
				}else {
					$(this).siblings().css("visibility","hidden");
					$(this).css("borderColor","#ccc");
					$(this).attr("pass",true);
				}
			})
		});
		
		//提交
		$(".reg").on("click",function(ev){
			var isPass = aInputs.every(function(oInput){
				return $(oInput).attr("pass");
			});
			if(isPass) {
				alert("恭喜你，注册成功，快去购物吧")
				$(this).submit();
			}else {
				alert("请把信息输入完全正确!");
				ev.preventDefault();
				return; 
			}
		})
		
	});
	
})
