var newsControl=function(){}
newsControl.prototype.newList=function(req,res,next){
	var ep=new EventProxy();
	dataSource.getConn(ep);
	adminModule.newList(ep);
	ep.on("success",function(data){
		res.json(data);
	});
	ep.fail(function(err){
		next(err);
	});
}

newsControl.prototype.newAdd=function(req,res,next){
	var ep=new EventProxy();
	dataSource.getConn(ep);	
	adminModule.newAdd(ep,[req.body.ntitle,req.body.content,req.body.aid]);
	ep.on("success",function(data){
		if(data.insertId){
			res.json(config.info.adminAddsuc).end();
		}else{
			res.json(config.error.newerr).end();
		}
	});
	ep.fail(function(err){
		next(err);
	});
}
newsControl.prototype.newDel=function(req,res,next){
	var ep=new EventProxy();
	dataSource.getConn(ep);
	adminModule.newDel(ep,[req.params.id]);
	ep.on("success",function(data){
		res.json(config.info.adminAddsuc).end();
	});
	ep.fail(function(err){
		next(err);
	});
}
module.exports=function(){
	return new newsControl();
}
