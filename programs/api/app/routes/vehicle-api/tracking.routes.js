
module.exports = (app,prefix,authMiddleWare) => {
  const Controller = require("../../controllers/vehicle/tracking.controller.js");
  app.prefix(`/${prefix}/submit-location`, function (route) {
    route.route('/').post(authMiddleWare,Controller.submitLocation); //other route
  });
};