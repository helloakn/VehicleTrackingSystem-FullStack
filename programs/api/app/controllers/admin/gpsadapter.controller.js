const TableModel = require("../../models/gpsadapter.model.js");
let tableModel = new TableModel();

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
    let returnData = await tableModel.getListByPagination(data.row_count,data.page_at);
    res.json(returnData);

};

exports.create  = async function createFunction(req, res){
    // flow => declation -> validation -> insert -> output;

    // ---:::  Beign Variable Declaration :::--- //
    const data = req.body;
    let resultData = {};
	const errors = {};
    var isAlready = null; // for name Validation
    let insertData = {}; // for vehicletype record creation
    // ---:::  END Variable Declaration :::--- //
	
    // ---::: Begin Validation :::--- //
	if (!String(data.name).trim()) {
		errors.model = ['Model is required'];
	}

	
    // check there is already existed with name
    isAlready = await tableModel.findByModel(req.body.model);
    if(isAlready){
        errors.model = ['Model is already existed.'];
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

    insertData = {
        model: req.body.model,
        created_by:req.authId
    }
    resultData = await tableModel.create(insertData);
    
    if(resultData.isError){
        res.status(500).send({
            code:500,
            message:
            resultData.data || "Some error occurred while creating the Vehicle Type."
        });
    }
    else{
        res.send({
            code:200,
            status : "success!",
            data : resultData.data
        });
    }
    
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
    data = await tableModel.getDetailById(params.id);
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