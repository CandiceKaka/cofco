//把页面和js结合的模版,注意使用的时候，必须用data。在写html模版的时候
//返回的是有html加服务器返回的数据
define([],function(){
	return {
		template:function(id, data){
			var str = document.getElementById(id).innerText;
			str = "log(`"+str+"`)";
			str = str.replace(/<%=(.+)%>/g, "`); log($1); log(`");
			str = str.replace(/<%(.+)%>/g, "`); $1 log(`");
			var funcstr = `
				(function(data){
					var htmlstr = "";
					function log(str) {
						htmlstr += str;
					}
					${str};
					return htmlstr;
				})
			`;
			var realfunc = eval(funcstr);
			return realfunc(data);
		}
	}
});