const AdminModule = require("../../models/admin.model.js");
const crypto = require('crypto');
let admin = new AdminModule();

exports.index = async function list(req, res){
    // flow => declation -> validation -> retrieve -> output;

    // ---:::  Beign Variable Declaration :::--- //
    const data = req.body;
    
	const errors = {};
    // ---:::  END Variable Declaration :::--- //

    // ---::: Begin Validation :::--- //
	if (!Number.isInteger(data.row_count)) {
		errors.row_count = ['row_count must be number!'];
	}
    if (!Number.isInteger(data.page_at)) {
		errors.page_at = ['page_at must be number!'];
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
    let returnData = await admin.getListByPagination(data.row_count,data.page_at);
    res.json(returnData);

};

exports.create  = async function createFunction(req, res){
    // flow => declation -> validation -> insert -> output;

    // ---:::  Beign Variable Declaration :::--- //
    const data = req.body;
    
	const errors = {};
    var isAlready = null; // for email Validation
    let hash =  null; //for password
    let insertData = {}; // for admin record creation
    // ---:::  END Variable Declaration :::--- //
	
    // ---::: Begin Validation :::--- //
    if (data
        && Object.keys(data).length === 0
        && Object.getPrototypeOf(data) === Object.prototype){
        
		errors.data = ['validation failed.'];
	}
	if (!String(data.name).trim()) {
		errors.name = ['Name is required'];
	}

    if (!String(data.password).trim()) {
		errors.password = ['Password is required'];
	}
	
	if (!(/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(String(data.email))) {
		errors.email = ['Email is not valid.'];
	}
	
    // check there is already existed with email account
    isAlready = await admin.findByEmail(req.body.email);
    if(isAlready){
        errors.email = ['Email is already existed.'];
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

    hash = crypto.createHash('md5').update(req.body.password).digest("hex"); // for password
    insertData = {
        name: req.body.name,
        email: req.body.email,
        password: hash
    }
    admin.create(insertData, (err, data) => {
        if (err){
            res.status(500).send({
                code:500,
                message:
                err.message || "Some error occurred while creating the Admin Account."
            });
        }
        else{
            res.send({
                code:200,
                status : "success!",
                data : data
            });
        } 
    });
};


exports.getDetail  = async function getDetailFunction(req, res){
    //res.json({ message: req.params.id});
    // flow => declation -> validation -> insert -> output;

    // ---:::  Beign Variable Declaration :::--- //
    const params = req.params;
    
	const errors = {};
    let data = {};
    let id = params.id;
    // ---:::  END Variable Declaration :::--- //
	
    // ---::: Begin Validation :::--- //
	if (isNaN(params.id)) {
		errors.id = ['id parameter must be number'];
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
    data = await admin.getDetailById(params.id);
    if(data){
        res.send({
            code:200,
            status : "success!",
            data : data
        });
        return;
    }
    else{
        res.status(400).send({
            code:400,
            status: "failed!",
            error:[{"msg":`record not found for id ${params.id}`}]
        });
        return;
    }
    
};

exports.update = (req, res) => {
    res.json({ message: "this is list" });
};