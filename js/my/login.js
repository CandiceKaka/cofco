require(["/config.js"],function(){
	require(["jquery"],function($){
		$("#common_top").load("common_login_reg_top.html");
		$("#common_foot").load("common_login_reg_foot.html");
	});
});

