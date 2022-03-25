const SqlAdapter = require("./sqlAdapter.js");


class DeviceLocation extends SqlAdapter{
  constructor() {
    super();
    this.tableName = "DeviceLocation";
  }


  async create(newRecord,registered_by){
    // call the function of the parent classs
    newRecord
    return this.insertData(this.tableName,newRecord);
  } // end async function

  findByKeyPair=(_key,_value)=>{
    return new Promise(resolve => {
      
      this.sql.query(`SELECT * FROM ${this.tableName} WHERE ${_key} = '${_value}' AND deleted_at IS NULL`, (err, res) => {
        if (err) {
          resolve(null);
          return;
        }
        if (res.length) {
          resolve(res[0]);
          
          return;
        }
        else{
          resolve(null);
          return;
        }
      }); // end sql

    }); // end promise
  }//end function
  
  async getListByPagination(row_count=10,page_at=1){
    //row_count => total records per page.
    //page_at must start from 1;
    // call the function of the parent class
    let query =`
      SELECT 
        v.id,v.vehicle_no,v.created_at,
        o.name owner_name,
        vt.name vehicle_type,
        g.model gps_model,
        a.name admin_name
      FROM Vehicle v
        LEFT JOIN Owner o ON v.owner_id = o.id
        LEFT JOIN VehicleType vt ON v.vehicle_type_id = vt.id
        LEFT JOIN GpsAdapter g ON v.gps_adapter_id = g.id
        LEFT JOIN Admin a ON v.registered_by = a.id
      WHERE
        v.deleted_at IS NULL 
        AND o.deleted_at IS NULL
        AND vt.deleted_at IS NULL
        AND g.deleted_at IS NULL
        AND a.deleted_at IS NULL
      ORDER BY v.id DESC
    `;
    return this.paginate(query,row_count,page_at);
  } // end async function

  async getDetailById(id){
    //row_count => total records per page.
    //page_at must start from 1;
    // call the function of the parent class
    return this.getRecordByQuery(`
    SELECT 
        v.*,
        o.name owner_name,
        vt.name vehicle_type,
        g.model gps_model,
        a.name admin_name
      FROM Vehicle v
        LEFT JOIN Owner o ON v.owner_id = o.id
        LEFT JOIN VehicleType vt ON v.vehicle_type_id = vt.id
        LEFT JOIN GpsAdapter g ON v.gps_adapter_id = g.id
        LEFT JOIN Admin a ON v.registered_by = a.id
      WHERE
        v.deleted_at IS NULL 
        AND o.deleted_at IS NULL
        AND vt.deleted_at IS NULL
        AND g.deleted_at IS NULL
        AND a.deleted_at IS NULL
        AND v.id = ${id}
    `);
  } // end async function

  async getByDeviceKeyAndSecret(key,secret){
    let queryString = `
    SELECT 
        *
      FROM Vehicle 
      WHERE
        deleted_at IS NULL
        AND device_key = '${key}'
        AND device_secret = '${secret}'
    `
    console.log(queryString);
    return this.getRecordByQuery(queryString);
  }
}//end class

module.exports = DeviceLocation;