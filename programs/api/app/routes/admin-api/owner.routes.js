module.exports =  (app,prefix,authMiddleWare) => {
    const ownerController = require("../../controllers/admin/owner.controller.js");
    app.prefix(`/${prefix}/owner`, function (owner) {
      owner.route('/').post(authMiddleWare,ownerController.index); //other route
      owner.route('/create').post(authMiddleWare,ownerController.create); // other route
      owner.route('/getdetail/:id').post(authMiddleWare,ownerController.getDetail); // other route
    });
  };