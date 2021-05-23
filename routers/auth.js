const express = require('express');
const pw = require('../secret/passwords.js');
const bcrypt = require('bcrypt');
const router = express.Router();
const userModel = require('../models').user_info; 
var jwt = require('jsonwebtoken'); 


const privateKey = "11aa";



//login form
router.get('/', (req,res)=>{
	res.send('<<login form>>');
})


//local-login 시도
router.post('/locallogin', function(req,res){
	userModel.findOne({
		where : {
			email : req.body.email
		}
	}).then((user)=>{
		if(!user) return res.status(404).send("존재하지 않은 이메일입니다.");
		
		bcrypt.compare(req.body.password,user.password, function(err, result) {
    		if(!result) return res.status(404).send("비밀번호가 틀렸습니다.");
			
			jwt.sign(String(user.email), privateKey, function(err, token){
				userModel.update({token : token}, {where : {
					id : user.id
				}}).then(()=>{
					res.cookie('x_auth', token);
					res.redirect('/');
				})
			});
			
			
		});
		
	})
	
	
})

router.get('/auth', function(req,res){
	
})

//logout
router.post('/logout', function(req, res){
	var token = req.cookies.x_auth;
	
	jwt.verify(token, privateKey, function(err, email) {
 		if(err) res.status(404).send("err");
		userModel.findOne({where :{
			email : email,
			token : token
		}}).then(user=>{
			if(!user) res.status(404).send("token err");
			
			user.token = null;
			res.clearCookie('x_auth');
			res.redirect('/');
		})
		
	});
});










module.exports = router;