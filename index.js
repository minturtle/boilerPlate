const express = require('express');

const app = express();
const userDao = require('./dao_mysql/userDao');

const SERVER_PORT = 5000;



app.listen(SERVER_PORT , ()=>console.log("server is running at "+ SERVER_PORT));


app.get("/", (req, res)=>{

    res.status(200).json({data : "hello world!"})
})

app.get("/users", (req, res)=>{
    userDao.findAll((err, rows, fields)=>{
        if(err) throw err;
        res.status(200).json(rows)
    })

})