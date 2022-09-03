const express = require('express');

const app = express();
const userDao = require('./dao_mysql/userDao');
const bodyParser = require('body-parser');
const SERVER_PORT = 5000;


//application/x-www-form-urlencode
app.use(bodyParser.urlencoded({extended:true}));

//application/json
app.use(bodyParser.json());

app.listen(SERVER_PORT , ()=>console.log("server is running at "+ SERVER_PORT));



app.get("/", (req, res)=>{

    res.status(200).json({data : "hello world!"})
})

app.get("/users", (req, res)=>{
    userDao.findAll((err, rows, fields)=>{
        if(err) { 
            sendErrorMsg(err, res);
            return;
        }
        res.status(200).json(rows);
    })

})

app.post("/register", (req, res)=>{
    const registerJson = req.body;
    userDao.save(registerJson, (err, rows, fields)=>{
        if(err) { 
            sendErrorMsg(err, res);
            return;
        }
        res.redirect("/");
    })

})


function sendErrorMsg(err, res){
        console.log(err);
        res.status(500).json({err : "서버 오류입니다."})
}