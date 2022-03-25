
module.exports = (app,prefix,authMiddleWare) => {
  const adminController = require("../../controllers/admin/admin.controller.js");
  app.prefix(`/${prefix}/admin`, function (vehicle) {
    vehicle.route('/').post(authMiddleWare,adminController.index); //other route
    vehicle.route('/create').post(authMiddleWare,adminController.create); // other route
    vehicle.route('/getdetail/:id').post(authMiddleWare,adminController.getDetail); // other route
    vehicle.route('/update/:id').get(authMiddleWare,adminController.update); // other route
  });
};