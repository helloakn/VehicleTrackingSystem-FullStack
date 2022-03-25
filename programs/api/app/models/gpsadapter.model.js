const SqlAdapter = require("./sqlAdapter.js");


class GpsAdapter extends SqlAdapter{
  constructor() {
    super();
    this.tableName = "GpsAdapter";
  }


  async create(newRecord){
    // call the function of the parent class
    //newRecord.created_by = 8;
    return this.insertData(this.tableName,newRecord);
  } // end async function

  findByModel = (model) => {
    return new Promise(resolve => {
      
      this.sql.query(`SELECT * FROM ${this.tableName} WHERE model = '${model}'`, (err, res) => {
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
      SELECT ga.*,ad.name admin_name
      FROM GpsAdapter ga 
      JOIN Admin ad ON ad.id = ga.created_by
      WHERE 
        ga.deleted_at IS NULL 
      ORDER BY ga.id DESC  
    `,row_count,page_at);
  } // end async function

  async getDetailById(id){
    //row_count => total records per page.
    //page_at must start from 1;
    // call the function of the parent class
    return this.getRecordByQuery(`SELECT * FROM ${this.tableName} WHERE id=${id} AND deleted_at IS NULL`);
  } // end async function
}//end class

module.exports = GpsAdapter;