const mysql = require("mysql");
const mysqlConnectionData = require('./mysqlConnectionData');


const connection = mysql.createConnection(mysqlConnectionData)


const e = {
    findAll : (callback)=>{
        connection.query("SELECT * FROM user", callback);
    }
}


module.exports = e;