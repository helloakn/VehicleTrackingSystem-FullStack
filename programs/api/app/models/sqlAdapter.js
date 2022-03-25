const mysql = require("mysql");
const config = require("../config/lib.config.js");
const formatDate = require("../functions/dateformat.functions.js");
// Create a connection to the database
const mysqlConnection = mysql.createConnection({
  host: config.Database.HOST,
  user: config.Database.USER,
  port: config.Database.PORT,
  password: config.Database.PASSWORD,
  database: config.Database.DB
});
// open the MySQL connection
mysqlConnection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});


class SqlAdapter{
  constructor() {
    this.sql = mysqlConnection;
  }

  insertData = (tableName,newRecord) => {
    let now = new Date();
    var formatted_date = formatDate(now,"yyyy-MM-dd h:mm:ss"); //now.toLocaleString(); //moment(now).format('YYYY-MM-DD HH:MM:SS');
    newRecord.created_at = formatted_date;
    newRecord.updated_at = formatted_date;

    return new Promise(resolve => {
      this.sql.query(`INSERT INTO ${tableName} SET ?`, newRecord, (err, res) => {
        if (err) {
          console.log("error: ", err);
          resolve({"isError":true,"data":err});
          return;
        }
        resolve({"isError":false,"data":{ id: res.insertId, ...newRecord }});
      });
    });// end Promise
  }//end getRecordById function

  getRecordByQuery = (query) => {
    //console.log(query);
    return new Promise(resolve => {
      this.sql.query(query, (err, res) => {
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
      });// end sql command
    });// end Promise
  }//end getRecordById function
  getRecordsByQuery = (query) => {
    return new Promise(resolve => {
      this.sql.query(query, (err, res) => {
        if (err) {
          resolve(null);
          return;
        }
        if (res.length) {
          resolve(res);
          return;
        }
        else{
          resolve(null);
          return;
        }
      });// end sql command
    });// end Promise
  }//end getRecordById function

  paginate = (query,row_count,page_at) => {
    page_at = page_at - 1;
    //row_count => total records per page.
    return new Promise(resolve => {
      let totalPage = 0;
      let startFrom = 0;
      let cmdString = `SELECT count(*) as totalCount from (${query}) totalCount;`;
      let paginatecmdString = "";

      this.sql.query(cmdString, (err, res) => {
        if (err) {
          resolve(null);
          return;
        }
        if (res.length) {
          totalPage = Math.ceil(res[0].totalCount / row_count);
          startFrom = page_at * row_count;
          //generate pagination query 
          paginatecmdString = query + ` LIMIT ${startFrom},${row_count}`;
          this.sql.query(paginatecmdString, (er, re) => {
            if (er) {
              resolve(null);
              return;
            }
            else{
              resolve({
                  pagination:{
                    totalRecord:res[0].totalCount,
                    count_per_page:row_count,
                    totalPage:totalPage,
                    current_records:re.length,
                    page_at:page_at+1,
                  },
                  data:re
              });
            }
          });//end pagination data
          return;
        }
        else{
          resolve(null);
          return;
        }
      });//end total record

    });// end Promise

  }//end paginate function
  
}//end class

module.exports = SqlAdapter;