const generateKey = require("../../functions/generatekey.functions.js");
const TableModel = require("../../models/vehicle.model.js");
let tableModel = new TableModel();

async function generatekey(_column,_keyLength){
    let _generateKey = generateKey(_keyLength);
    let isAlready = await tableModel.findByKeyPair(_column,_generateKey);
    if(isAlready){
        return await generatekey(_keyLength);
    }
    else{
        return _generateKey;
    }
}

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

exports.register  = async function registerFunction(req, res){
    // flow => declation -> validation -> insert -> output;
   
    // ---:::  Beign Variable Declaration :::--- //
    const data = req.body;
    let resultData = {};
	const errors = {};
    var isAlready = null; // for name Validation
    let insertData = {}; // for vehicletype record creation
    // ---:::  END Variable Declaration :::--- //
	
    // ---::: Begin Validation :::--- //
	if (!String(data.vehicle_no).trim()) {
		errors.model = ['Vehicle Number is required'];
	}

	
    // check there is already existed with name
    isAlready = await tableModel.findByVehicleNo(req.body.vehicle_no);
    if(isAlready){
        errors.model = ['Vehicle Number is already existed.'];
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
        owner_id:           data.owner_id,
        vehicle_type_id:    data.vehicle_type_id,
        gps_adapter_id:     data.gps_adapter_id,
        vehicle_no:         data.vehicle_no,
        registered_by:      req.authId,
        device_key:         await generatekey("device_key",20),
        device_secret:      await generatekey("device_secret",60)
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
    let params = req.params;
    
	const errors = {};
    let data = req.body;
    let id = params.id;
    let page_at = 1;
    let row_count = 5;
    let from_date = '2000-03-11 08:45:00';
    let to_date = '2222-03-11 08:45:00'
    // ---:::  END Variable Declaration :::--- //
	
    // ---::: Begin Validation :::--- //

    console.log(data);
    console.log(params);
	if (isNaN(params.id)) {
		errors.id = ['id parameter must be number'];
	}

    if(data.page_at){
        if (Number.isInteger(data.page_at)) {
            page_at = data.page_at;
        }
    }
    if(data.row_count){
        if (Number.isInteger(data.row_count)) {
            page_at = data.page_at;
        }
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

    if(data.from_date){
        from_date = data.from_date;
    }
    if(data.to_date){
        to_date = data.to_date;
    }

    data = await tableModel.getDetailById(params.id);
    //getTrackingList(vehicle_id,from_date,to_date,row_count=10,page_at=1
    trackingList = await tableModel.getTrackingList(params.id,from_date,to_date,row_count,page_at);
    
    if(data){
        res.send({
            code:200,
            status : "success!",
            data : data,
            trackingList:trackingList
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


exports.getFilter  = async function getFilterFunction(req, res){
    // flow => declation -> validation -> insert -> output;
   
    // ---:::  Beign Variable Declaration :::--- //
    let ownerList = await tableModel.getRecordsByQuery(`SELECT id,name FROM Owner WHERE deleted_at IS NULL`);
    let gpsAdapterList = await tableModel.getRecordsByQuery(`SELECT id,model FROM GpsAdapter WHERE deleted_at IS NULL`);
    let vehicleTypeList = await tableModel.getRecordsByQuery(`SELECT id,name FROM VehicleType WHERE deleted_at IS NULL`);
    res.send({
        code:200,
        status : "success!",
        data : {
            owner:ownerList,
            gpsAdapter:gpsAdapterList,
            vehicleType:vehicleTypeList
        }
    });
};

exports.update = (req, res) => {
    res.json({ message: "this is list" });
};