module.exports =  (app,prefix,authMiddleWare) => {
  const Controller = require("../../controllers/admin/vehicle.controller.js");
  app.prefix(`/${prefix}/vehicle`, function (route) {
    route.route('/').post(authMiddleWare,Controller.index); //other route
    route.route('/register').post(authMiddleWare,Controller.register); // other route
    route.route('/getdetail/:id').post(authMiddleWare,Controller.getDetail); // other route
    route.route('/getfilter').post(authMiddleWare,Controller.getFilter); 
  });
};