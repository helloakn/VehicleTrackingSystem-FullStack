const TableModel = require("../../models/devicelocation.model.js");
let tableModel = new TableModel();


exports.submitLocation  = async function submitLocationFunction(req, res){
    // flow => declation -> validation -> insert -> output;

    // ---:::  Beign Variable Declaration :::--- //
    const data = req.body;
    let resultData = {};
	const errors = {};
    let insertData = {}; // for vehicletype record creation
    
    // ---:::  END Variable Declaration :::--- //
	
    // ---::: Begin Validation :::--- //
	if (!data.latitude) {
		errors.latitude = ['latitude is required'];
	}

    if (!data.longitude) {
		errors.longitude = ['longitude is required'];
	}
    
    // ---:::  END Variable Declaration :::--- //

    // ---::: Begin Validation :::--- //
    
   
    // Begin to return with output 
    if (Object.keys(errors).length) {
		res.status(400).send({
            code:400,
            status: "failed!",
            error:errors
            });
        return;
	}
	
    // check there is already existed with name
    
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

    // insertData = {
    //     vehicle_id:req.authId,
    //     latitude: req.body.latitude,
    //     longitude: req.body.longitude,
    // }
    //resultData = await tableModel.create(insertData);
    esultData = await tableModel.getRecordByQuery(`
    CALL InsertUpdateLocation(${req.body.latitude},${req.body.longitude},${req.authId});
    `);
    
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