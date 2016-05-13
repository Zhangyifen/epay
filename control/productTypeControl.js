var productTypeControl =function(){}


productTypeControl.prototype.typeList=function(req,res,next){
	var ep=new EventProxy();
	dataSource.getConn(ep);
	if(req.params.pid){
		adminModule.typeList(ep,[req.params.pid]);
	}else{
		adminModule.typeList(ep);
	}	
	ep.on("success",function(data){
		res.json(data);
	});
	ep.fail(function(err){
		next(err);
	});
}

productTypeControl.prototype.typeAdd=function(req,res,next){
	var ep=new EventProxy();
	dataSource.getConn(ep);
	adminModule.typeAdd(ep,[req.body.tname,req.body.tinfo,req.body.pid]);
	ep.on("success",function(data){
		if(data.insertId){
			res.json(config.info.adminAddsuc).end();
		}else{
			res.json(config.error.typeerr).end();
		}
	});
	ep.fail(function(err){
		next(err);
	});
}
productTypeControl.prototype.typeDel=function(req,res,next){
	var ep=new EventProxy();
	dataSource.getConn(ep);
	adminModule.typeDel(ep,[req.params.id]);
	ep.on("success",function(data){
		res.json(config.info.adminAddsuc).end();
	});
	ep.fail(function(err){
		next(err);
	});
}
module.exports=function(){
	return new productTypeControl();
}
