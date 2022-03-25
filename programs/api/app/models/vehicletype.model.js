const SqlAdapter = require("./sqlAdapter.js");


class VehicleType extends SqlAdapter{
  constructor() {
    super();
    this.tableName = "VehicleType";
  }


  async create(newRecord){
    // call the function of the parent class
    //newRecord.created_by = 8;
    return this.insertData("VehicleType",newRecord);
  } // end async function

  findByName = (name) => {
    return new Promise(resolve => {
      
      this.sql.query(`SELECT * FROM ${this.tableName} WHERE name = '${name}'`, (err, res) => {
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
      });

    });

   
  }//end function
  
  async getListByPagination(row_count=10,page_at=1){
    //row_count => total records per page.
    //page_at must start from 1;
    // call the function of the parent class
    return this.paginate(`
      SELECT vt.*,ad.name admin_name
      FROM VehicleType vt 
      JOIN Admin ad ON ad.id = vt.created_by
      WHERE 
        vt.deleted_at IS NULL 
      ORDER BY vt.id DESC 
    `,row_count,page_at);
  } // end async function

  async getDetailById(id){
    //row_count => total records per page.
    //page_at must start from 1;
    // call the function of the parent class
    return this.getRecordByQuery(`SELECT * FROM ${this.tableName} WHERE id=${id} AND deleted_at IS NULL`);
  } // end async function
}//end class

module.exports = VehicleType;