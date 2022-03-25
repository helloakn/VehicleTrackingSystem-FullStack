module.exports =  (app,prefix,authMiddleWare) => {
    const vehicletypeController = require("../../controllers/admin/vehicletype.controller.js");
    app.prefix(`/${prefix}/vehicletype`, function (vehicleType) {
      vehicleType.route('/').post(authMiddleWare,vehicletypeController.index); //other route
      vehicleType.route('/create').post(authMiddleWare,vehicletypeController.create); // other route
      vehicleType.route('/getdetail/:id').post(authMiddleWare,vehicletypeController.getDetail); // other route
    });
  };