const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../../config/lib.config');
const AdmineModel = require("../../models/admin.model.js");
const AdminTokeneModel = require("../../models/admintoken.model.js");

let adminModel = new AdmineModel();
let adminTokenModel = new AdminTokeneModel();


exports.login = async function list(req, res){
    // flow => declation -> validation -> login -> generate token -> output;

    // ---:::  Beign Variable Declaration :::--- //
    const data = req.body;
    let insertData = {};
	const errors = {};
    // ---:::  END Variable Declaration :::--- //
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      if (data
        && Object.keys(data).length === 0
        && Object.getPrototypeOf(data) === Object.prototype){
        
		errors.data = ['validation failed.'];
	}
    // ---::: Begin Validation :::--- //
	if (!String(req.body.email).trim()) {
		errors.email = ['Email is required'];
	}
    console.log('p');
    if (!data.password) {
		errors.password = ['Password is required'];
	}
    if (!String(req.body.password).trim()) {
		errors.password = ['Password is required'];
	}
    console.log('end p');
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
    console.log(data);
    let loginData = await adminModel.getByEmailAndPassword(
        data.email,
        crypto.createHash('md5').update(data.password).digest("hex")
    );
    
    if(loginData){
        const token = jwt.sign({ authId: loginData.id,authType:"admin" }, config.Secret.admin, { expiresIn: '7d' });
        insertData = {
            admin_id: loginData.id,
            token:token
        }
        let _newAdminToken = await adminTokenModel.create(insertData);
        if(!_newAdminToken.isError){
            res.send({
                code:200,
                status : "success!",
                data :{
                    admin_id:_newAdminToken.data.admin_id,
                    email:loginData.email,
                    name:loginData.name,
                    token:token
                } 
            });
            return;
        }
        else{
            res.send({
                code:400,
                status : "failed!",
                error : {"msg":["something went wrong, pls try again!"]}
            });
            return;
        }
        
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
