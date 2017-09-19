require(["http://localhost:8080/config.js"],function(){
	require(["jquery","common"],function($){
		$("#common_top").load("./common_login_reg_top.html");
		$("#common_foot").load("common_login_reg_foot.html");
		
	});
	
});

