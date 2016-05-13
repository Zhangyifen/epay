var adminRouter=express.Router();

adminRouter.all("/index",adminIndexControl.index);
adminRouter.get("/admin",adminIndexControl.adminList);
adminRouter.post("/admin",adminIndexControl.adminAdd);
adminRouter.delete("/admin/:id",adminIndexControl.adminDel);

//producttype API
adminRouter.get("/productType",productTypeControl.typeList);
adminRouter.get("/productType/:pid",productTypeControl.typeList);
adminRouter.post("/productType",productTypeControl.typeAdd);
adminRouter.delete("/productType/:id",productTypeControl.typeDel);

//product API
adminRouter.get("/product",productControl.proList);
adminRouter.post("/product",upload.single('upfile'),productControl.proAdd);
adminRouter.delete("/product/:id",productControl.proDel);

//news API
adminRouter.get("/news",newsControl.newList);
adminRouter.post("/news",newsControl.newAdd);
adminRouter.delete("/news/:id",newsControl.newDel);

module.exports=adminRouter;