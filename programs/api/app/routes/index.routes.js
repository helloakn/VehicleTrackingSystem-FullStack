const {AdminAuthMiddleWare,VehicleAuthMiddleWare} = require('../functions/authmiddleware.function.js');
module.exports = app => {
    var router = require("express").Router();
    let routePrefix = "admin-api";
    //start Admin Routes
    require("./admin-api/authorization.routes.js")(app,routePrefix,AdminAuthMiddleWare);

    require("./admin-api/admin.routes.js")(app,routePrefix,AdminAuthMiddleWare);
    require("./admin-api/vehicle.routes.js")(app,routePrefix,AdminAuthMiddleWare);
    require("./admin-api/vehicletype.routes.js")(app,routePrefix,AdminAuthMiddleWare);
    require("./admin-api/owner.routes.js")(app,routePrefix,AdminAuthMiddleWare);
    require("./admin-api/gpsadapter.routes.js")(app,routePrefix,AdminAuthMiddleWare);
    //end Admin Routes

    //start Vehicle Tracking Routes
    routePrefix = "vehicle-api";
    require("./vehicle-api/vehicleauthorization.routes.js")(app,routePrefix,VehicleAuthMiddleWare);
    require("./vehicle-api/tracking.routes.js")(app,routePrefix,VehicleAuthMiddleWare);

    //end Vehicle Tracking Routes
    
  };