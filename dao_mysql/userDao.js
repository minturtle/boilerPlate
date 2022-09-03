const mysql = require("mysql");
const mysqlConnectionData = require('./mysqlConnectionData');

const util = require('util');
const connection = mysql.createConnection(mysqlConnectionData)


const e = {
    findAll : (callback)=>{
        connection.query("SELECT * FROM user", callback);
    },


    //registerJson : {userId, password, userName}
    save : (registerJson , callback)=>{
        const insertQuery = createInsertQuery(registerJson);

        connection.query(insertQuery, callback);
    }
}

function createInsertQuery(registerjson){

    return util.format("INSERT INTO user(user_id, user_name, password) VALUES ('%s', '%s', '%s');"
    , registerjson.userId, registerjson.userName, registerjson.password);
}

module.exports = e;