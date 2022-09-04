const express = require('express');

const app = express();
const userService = require('./service/userService');

const bodyParser = require('body-parser');
const SERVER_PORT = 5000;

//application/x-www-form-urlencode
app.use(bodyParser.urlencoded({extended:true}));

//application/json
app.use(bodyParser.json());

app.listen(SERVER_PORT , ()=>console.log("server is running at "+ SERVER_PORT));



app.get("/", (req, res)=>{

    sendOkJson({message : "안녕하세요!"}, res)
})

app.post("/register", (req, res)=>{
    let registerJson = req.body;

    userService.register(registerJson, (err)=>{
        if(err) return sendErrorMsg(err, res);
            

        sendOkJson({message : "회원가입 성공"}, res);
    })

    
    
})

app.post("/login", (req, res)=>{
    let loginJson = req.body;

    userService.login(loginJson, (err, userNo)=>{
        if(err) return sendErrorMsg(err, res);
        sendOkJson({message : "로그인 성공", userNo : userNo}, res);
    })
})


function sendErrorMsg(err, res){
        console.log(err);
        res.status(500).json({err : err});
}

function sendOkJson(sendJSON, res){
    res.status(200).json(sendJSON);
}