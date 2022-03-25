const SqlAdapter = require("./sqlAdapter.js");
const formatDate = require("../functions/dateformat.functions.js");

class Admin extends SqlAdapter{
  constructor() {
    super();
  }

  create = (newAdmin, result) => {
    let now = new Date();
    var formatted_date = formatDate(now,"yyyy-MM-dd h:mm"); //now.toLocaleString(); //moment(now).format('YYYY-MM-DD HH:MM:SS');
    newAdmin.created_at = formatted_date;
    newAdmin.updated_at = formatted_date;
   
    this.sql.query("INSERT INTO Admin SET ?", newAdmin, (err, res) => {
      if (err) {
       // console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newAdmin });
    });
  }//end function

  findByEmail = (email) => {
    return new Promise(resolve => {
      
      this.sql.query(`SELECT * FROM Admin WHERE email = '${email}'`, (err, res) => {
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
  getByEmailAndPassword = (email,password) => {
    return new Promise(resolve => {
      
      this.sql.query(`SELECT * FROM Admin WHERE email = '${email}' AND password='${password}' AND deleted_at IS NULL`, (err, res) => {
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
    return this.paginate("SELECT * FROM Admin ORDER BY id DESC",row_count,page_at);
  } // end async function

  async getDetailById(id){
    //row_count => total records per page.
    //page_at must start from 1;
    // call the function of the parent class
    return this.getRecordByQuery(`SELECT * FROM Admin WHERE id=${id}`);
  } // end async function
}//end class

module.exports = Admin;