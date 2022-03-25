const SqlAdapter = require("./sqlAdapter.js");


class Owner extends SqlAdapter{
  constructor() {
    super();
    this.tableName = "Owner";
  }


  async create(newRecord){
    // call the function of the parent class
   // newRecord.registered_by = 8;
    return this.insertData(this.tableName,newRecord);
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
      SELECT ow.*,ad.name admin_name
      FROM Owner ow 
      JOIN Admin ad ON ad.id = ow.registered_by
      WHERE 
        ow.deleted_at IS NULL 
      ORDER BY ow.id DESC  
    `,row_count,page_at);
  } // end async function

  async getDetailById(id){
    //row_count => total records per page.
    //page_at must start from 1;
    // call the function of the parent class
    return this.getRecordByQuery(`SELECT * FROM ${this.tableName} WHERE id=${id} AND deleted_at IS NULL`);
  } // end async function
}//end class

module.exports = Owner;