const jwt = require('jsonwebtoken');
const config = require('../../config/lib.config');
const VehicleModel = require("../../models/vehicle.model.js");

let vehicleModel = new VehicleModel();

exports.login = async function list(req, res){
    // flow => declation -> validation -> login -> generate token -> output;

    // ---:::  Beign Variable Declaration :::--- //
    const data = req.body;
	const errors = {};
    // ---:::  END Variable Declaration :::--- //
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    if (Object.keys(data).length === 0 && empty.constructor === Object) {
        
		errors.data = ['validation failed.'];
	}
    // ---::: Begin Validation :::--- //
    if (!data.device_key) {
		errors.device_key = ['Device Key is required'];
	}
	if (!String(req.body.device_key).trim()) {
		errors.device_key = ['Device Key is required'];
	}
    if (!data.device_secret) {
		errors.device_secret = ['Device Secret is required'];
	}
    if (!String(req.body.device_secret).trim()) {
		errors.device_secret = ['Device Secret is required'];
	}
    // Begin to return with output 
    if (Object.keys(errors).length) {
		res.status(400).send({
            code:400,
            status: "failed!",
            error:errors
            });
        return;
	}
    // ---::: END Validation :::--- //

    // validation is passed
    let loginData = await vehicleModel.getByDeviceKeyAndSecret(
        data.device_key,
        data.device_secret
    );
    console.log(loginData);
    if(loginData){
        const token = jwt.sign({ authId: loginData.id,authType:"vehicle" }, config.Secret.vehicle, { expiresIn: '7d' });
        
        res.send({
            code:200,
            status : "success!",
            data :{
                vehicle_id:loginData.id,
                device_secret:loginData.device_secret,
                device_key:loginData.device_key,
                token:token
            } 
        });
        return;
        
        
    }
    else{
        res.status(400).send({
            code:400,
            status: "failed!",
            error:{"msg":["Incorrected Login Information!"]}
        });
        return;
    }


};
