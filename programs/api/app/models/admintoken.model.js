const SqlAdapter = require("./sqlAdapter.js");


class AdminToken extends SqlAdapter{
  constructor() {
    super();
    this.tableName = "AdminToken";
  }


  async create(newRecord){
    // call the function of the parent class
    return this.insertData(this.tableName,newRecord);
  } // end async function

  findByToken = (_token) => {
    return new Promise(resolve => {
      
      this.sql.query(`SELECT * FROM ${this.tableName} WHERE model = '${_token}' AND deleted_at IS NULL`, (err, res) => {
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
  
}//end class

module.exports = AdminToken;