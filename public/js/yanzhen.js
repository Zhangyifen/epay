-function(){
	$.validate={};
	
	$.validate.isEmpty=function(str){
		var reg=/^\S+$/;
		return reg.test(str);
	}
	
	$.validate.isEmail=function(str){
		var reg=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		return reg.test(str);
	}
	$.fn.alertMes=function(option){
		var typeobj={warning:"警告！",danger:"错误！",info:"提示！",success:"成功！"};
		if(!option.type || !typeobj[option.type]){
			option.type="info";
		}
		$(this).addClass("alert-"+option.type);
		$(this).find(".title").html(typeobj[option.type]);
		
		$(this).show("fast");
		$(this).find(".message").html(option.message);
		
		//绑定关闭事件
		var that=$(this);
		$(this).find(".close").click(function(){
			that.removeClass("alert-"+option.type);
			that.hide("fast");
		});
		
		//自动消失
		option.timeout=option.timeout || 2000;
		setTimeout(function(){
			that.removeClass("alert-"+option.type);
			that.hide("fast");
		},option.timeout);
	}
	$._ajax=function(option){
		option.dataType=option.dataType || "json";
		option.type=option.type || "post";
		
		option.statusCode={
			404:function(){
				window.location.href="/404.html";
			},
			500:function(){
				window.location.href="/500.html";
			}
		}
		$.loadingStart();
		return $.ajax(option).always(function(){
			$.loadingEnd();
		});
	}
	$.loadingStart=function(){
		$("body").append("");
	}
	$.loadingEnd=function(){
		$("#loading").remove();
	}
	$.getCookie=function(name){
		var cookie=document.cookie;
		var start=cookie.indexOf(name);
		if(start==-1){
			return "";
		}
		start = start+name.length+1;
		var end=cookie.indexOf(";",start);
		if(end==-1){
			return decodeURIComponent(cookie.slice(start));
			
		}else{
			return decodeURIComponent(cookie.slice(start,end));
		}	
	}
}();

////自定义路由
//-function(){
//	window.onhashchange=function(){
//		if(location.hash=="#/adminList"){
//			$._ajax({
//				url:"/admin/adminList",
//				type:"get"
//			}).done(function(data){
//				$("#container").html(ejs.render($("#adminList").html(),{admins:data}));
//			});
//		}
//	}
//}();

