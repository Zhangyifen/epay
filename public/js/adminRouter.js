$(function(){
	var router=new Router({
		container:'#container'
	});
	
	var adminList={
		url: "/adminList",
		className: "adminList",
		ajaxData: function(){
			var that=this;
			return $._ajax({
				url: "/admin/admin",
				type:"get"
			}).done(function(data){
				that.data=data;
			});
		},
		render : function(){
			return ejs.render($("#adminList").html(),{admins:this.data});
		}
	}
	
	var adminAdd={
		url:"/adminAdd",
		render :function(){
			return $("#adminAdd").html();
		},
		bind :function(){
			var t=$(this);
			t.find("#sub").click(function(){
				var aname=t.find("#aname").val();
				var email=t.find("#email").val();
				var password=t.find("#password").val();
				
				if($.validate.isEmpty(aname)==false){
					return t.find(".alert").alertMes({message:"用户名不能为空！"});
				}
				if($.validate.isEmpty(email)==false){
					return t.find(".alert").alertMes({message:"邮箱不能为空！"});
				}
				if($.validate.isEmpty(password)==false){
					return t.find(".alert").alertMes({message:"密码不能为空！"});
				}
				if($.validate.isEmail(email)==false){
					return t.find(".alert").alertMes({message:"邮箱格式错误！"});
				}
				
				//提交ajax
				$._ajax({
					url: "/admin/admin",
					data:{"aname":aname,"email":email,"password":password}
				}).done(function(obj){
					if(obj.code){
						//如增加成功，返回列表
						location.href="/admin/index#/adminList";
					}else{
						t.find(".alert").alertMes({type:"danger",message:obj.msg});
					}
				});
			});
		}
	}
	var adminDel={
		url:"/adminDel/:id",
		ajaxData: function(){
			var t = this;
			$._ajax({
				url: "/admin/admin/" + t.params.id,
				type:"delete"
			}).done(function(data){
				location.href="/admin/index#/adminList";
			});
			return false;
		}
	}
	//producttype
	var typeList={
		url: "/typeList",
		ajaxData: function(){
			var that=this;
			return $._ajax({
				url: "/admin/productType",
				type:"get"
			}).done(function(data){
				that.data=data;
			});
		},
		render : function(){
			return ejs.render($("#typeList").html(),{types:this.data});
		}
	}
	var typeAdd={
		url:"/typeAdd",
		render :function(){
			return ejs.render($("#typeAdd").html(),{types:this.data});
		},
		ajaxData: function(){
			var that=this;
			return $._ajax({
				url: "/admin/productType/0",
				type:"get"
			}).done(function(data){
				that.data=data;
			});
		},
		bind :function(){
			var t=$(this);
			t.find("#sub").click(function(){
				var tname=t.find("#tname").val();
				var tinfo=t.find("#tinfo").val();
				var pid=t.find("#pid").val();
				
				if($.validate.isEmpty(tname)==false){
					return t.find(".alert").alertMes({message:"分类名不能为空！"});
				}
				if($.validate.isEmpty(tinfo)==false){
					return t.find(".alert").alertMes({message:"分类描述不能为空！"});
				}
				
				//提交ajax
				$._ajax({
					url: "/admin/productType",
					data:{"tname":tname,"tinfo":tinfo,"pid":pid}
				}).done(function(obj){
					if(obj.code){
						//如增加成功，返回列表
						location.href="/admin/index#/typeList";
					}else{
						t.find(".alert").alertMes({type:"danger",message:obj.msg});
					}
				});
			});
		}
	}
	var typeDel={
		url:"/typeDel/:id",
		ajaxData: function(){
			var t = this;
			$._ajax({
				url: "/admin/productType/" + t.params.id,
				type:"delete"
			}).done(function(data){
				location.href="/admin/index#/typeList";
			});
			return false;
		}
	}
	//product
	var proList={
		url: "/proList",
		ajaxData: function(){
			var that=this;
			return $._ajax({
				url: "/admin/product",
				type:"get"
			}).done(function(data){
				that.data=data;
			});
		},
		render : function(){
			return ejs.render($("#proList").html(),{pros:this.data});
		}
	}
	
	var proAdd={
		url:"/proAdd",
		ajaxData: function(){
			var that=this;
			return $._ajax({
				url: "/admin/productType",
				type:"get"
			}).done(function(data){
				that.data=data;
			});
		},
		render :function(){
			return ejs.render($("#proAdd").html(),{types:this.data});
		},
		bind :function(){
			var t=$(this);
			t.find("#sub").click(function(){
				var pname=t.find("#pname").val();
				var price=t.find("#price").val();
				var strock=t.find("#strock").val();
				var type=t.find("#type").val();
				
				var data=new FormData();
				data.append("pname",pname);
				data.append("price",price);
				data.append("strock",strock);
				data.append("type",type);
				data.append("upfile",t.find("#imgpath").get(0).files[0]);
				
//				if($.validate.isEmpty(pname)==false){
//					return t.find(".alert").alertMes({message:"商品名不能为空！"});
//				}
//				if($.validate.isEmpty(price)==false){
//					return t.find(".alert").alertMes({message:"价格不能为空！"});
//				}
//				if($.validate.isEmpty(strock)==false){
//					return t.find(".alert").alertMes({message:"库存不能为空！"});
//				}
				
				//提交ajax
				$._ajax({
					url: "/admin/product",
					data: data,
					cache: false,  
		            processData: false,  
		            contentType: false  
				}).done(function(obj){
					if(obj.code){
						//如增加成功，返回列表
						location.href="/admin/index#/proList";
					}else{
						t.find(".alert").alertMes({type:"danger",message:obj.msg});
					}
				});
			});
			t.find("#imgpath").change(function(){
				var file=this.files[0];
				console.log(file);
				if(file.type.indexOf("image")==-1){
					$(this).val("");
					t.find(".alert").alertMes({type:"danger",message:"只能上传图片"});
					return;
				}
				if(file.size>(1024*512)){
					$(this).val("");
					t.find(".alert").alertMes({type:"danger",message:"不能上传大于512k的图片"});
					return;
				}
				var fr=new FileReader();
				fr.readAsDataURL(file);
				fr.onload=function(e){
					$("#showimg").attr("src",fr.result);
				}
			});
		}
	}
	var proDel={
		url:"/proDel/:id",
		ajaxData: function(){
			var t = this;
			$._ajax({
				url: "/admin/product/" + t.params.id,
				type:"delete"
			}).done(function(data){
				location.href="/admin/index#/proList";
			});
			return false;
		}
	}
	//news
	var newList={
		url: "/newList",
		ajaxData: function(){
			var that=this;
			return $._ajax({
				url: "/admin/news",
				type:"get"
			}).done(function(data){
				that.data=data;
			});
		},
		render : function(){
			return ejs.render($("#newList").html(),{newss:this.data});
		}
	}
	var newAdd={
		url:"/newAdd",
		ajaxData: function(){
			var that=this;
			return $._ajax({
				url: "/admin/admin",
				type:"get"
			}).done(function(data){
				that.data=data;
			});
		},
		render :function(){
			return ejs.render($("#newAdd").html(),{admins:this.data});
		},
		bind :function(){
			var t=$(this);
			t.find("#sub").click(function(){

				var ntitle=t.find("#ntitle").val();
				var content=t.find("#content").val();
				var pubtime=t.find("#pubtime").val();
				var aid=t.find("#aid").val();
				
				if($.validate.isEmpty(ntitle)==false){
					return t.find(".alert").alertMes({message:"标题名不能为空！"});
				}
				if($.validate.isEmpty(content)==false){
					return t.find(".alert").alertMes({message:"内容不能为空！"});
				}
				if($.validate.isEmpty(aid)==false){
					return t.find(".alert").alertMes({message:"作者不能为空！"});
				}
				
				//提交ajax
				$._ajax({
					url: "/admin/news",
					data:{"ntitle":ntitle,"content":content,"pubtime":pubtime,"aid":aid}
				}).done(function(obj){
					if(obj.code){
						//如增加成功，返回列表
						location.href="/admin/index#/newList";
					}else{
						t.find(".alert").alertMes({type:"danger",message:obj.msg});
					}
				});
			});
		}
	}
	var newDel={
		url:"/newDel/:id",
		ajaxData: function(){
			var t = this;
			$._ajax({
				url: "/admin/news/" + t.params.id,
				type:"delete"
			}).done(function(data){
				location.href="/admin/index#/newList";
			});
			return false;
		}
	}
	var home={
		url: "/",
		render :function(){
			return "<h2>欢迎进入epay后台管理</h2>"
		}
	}
	router.push(adminList)
		  .push(adminAdd)
		  .push(adminDel)
		  .push(typeList)
		  .push(typeAdd)
		  .push(typeDel)
		  .push(proList)
		  .push(proAdd)
		  .push(proDel)
		  .push(newList)
		  .push(newAdd)
		  .push(newDel)
		  .push(home)
		  .setDefault('/')
		  .init();
});
