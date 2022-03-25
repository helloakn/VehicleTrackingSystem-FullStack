module.exports =  (app,prefix,authMiddleWare) => {
  const Controller = require("../../controllers/vehicle/authorization.controller.js");
  app.prefix(`/${prefix}/authorization`, function (route) {
    route.route('/login').post(Controller.login); //other route
   
  });
};