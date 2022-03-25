module.exports =  (app,prefix,authMiddleWare) => {
    const Controller = require("../../controllers/admin/gpsAdapter.controller.js");
    app.prefix(`/${prefix}/gpsAdapter`, function (route) {
      route.route('/').post(authMiddleWare,Controller.index); //other route
      route.route('/create').post(authMiddleWare,Controller.create); // other route
      route.route('/getdetail/:id').post(authMiddleWare,Controller.getDetail); // other route
    });
  };