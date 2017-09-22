define([],function(){
	return {
			get: function(key) {
				var cookiestr = document.cookie;
				var list = cookiestr.split("; ");
				for(var i=0;i<list.length;i++) {
					var kvs = list[i].split('=');
					if(kvs[0]==key) {
						return kvs[1];
					}
				}
				return null;
			},
			
			set: function(key,value,expires,path) {
				if( (typeof expires == 'number') || (typeof expires == 'string')) {
					expires = Number(expires);
					if(isNaN(expires)) {
						expires = undefined;
					}else {
						var d = new Date();
						d.setDate(d.getDate() + expires);
						expires = d;
					}
				}
				if(!(expires instanceof Date) && typeof expires == 'object') {
					expires = undefined;
				}
				document.cookie = key+"="+value+";" + (expires?"expires="+expires+";":"") + (path?"path="+path+";":"");
			}
			
//			remove:function(key){
//				this.set(key,',',-1);
//			},
	}
})