define([],function(){
	return {
		ajax:
		function({type="get", url, async=true, params, jsoncallback="callback",success=function(){}}){
		//判断url地址
			if(!(/^https?:\/\/.+(\?.+=.+)?$/.test(url))) {
				console.error("输入的地址不正确哦")
				return;
			}
		
			//根据类型调用不同的函数
			switch(type) {
				case "get": ajaxGet(url,async,success);break;
				//参数顺序一定不要传错
				case "post": ajaxPost(url,async,params,success);break;
				case "jsonP": ajaxJsonp(url,jsoncallback,success);break;
			}
		
			function ajaxGet(url,async,success) {
				var req = getXhr();
				req.open("get",url,async)
				if(req.onload === null) {
					req.onload = function(){
						success(req.response)
					}
				}else {
					req.onreadystatechange = function(){
						if(req.readyState == 4 && req.status == 200) {
							success(req.response);
						}
					};
				}
				req.send();
			}
		
			function ajaxPost(url,async,params,success) {
				var req = getXhr();
				req.open("post",url,async);
				req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				if(req.onload !== null) {
					console.log(req.onload);
					req.onload = function(){
						success(req.response);
					}
				}else {
					req.onreadystatechange = function() {
						if(req.readyState == 4 && req.status == 200) {
							success(req.response);
						}
					};
				}
				req.send(params);
			}
		
			function ajaxJsonp(url,jsoncallback,success) {
				var _script = document.createElement("script");
				
				//随机生成的回调函数的名字
				var cbkfunname = "_ajax_jsonp_callback" + new Date().getTime();
				
				if(/\?([^\?=]+=[^\?=]+)$/.test(url)) {
					_script.src = url + "&" + jsoncallback + "=" + cbkfunname;
				}else {
					_script.src = url + "?" + jsoncallback + "=" + cbkfunname;
					
				}
				
				window[cbkfunname] = function(data){
					success(data);
					delete window[cbkfunname];
					_script.remove();
					
				}
				document.body.appendChild(_script);
			};
		}
	}

//封装一个获得ajax对象的方法
function getXhr() {
	if(window.XMLHttpRequest) {
		return new XMLHttpRequest();
	}else {
		return new ActiveXObject("Microsoft.XMLHTTP")
	}
};
	
});







