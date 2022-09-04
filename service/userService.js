const userDao = require('../dao_mysql/userDao');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const e = {
    login : (loginJSON, callback)=>{
        findOne(loginJSON.userId, (err, rows)=>{
            if(err || rows.length == 0) {return callback(err || "유저 정보를 찾을 수 없습니다.", null);}

            if(!isSamePassword(loginJSON.password, rows[0].password)) return callback("잘못된 비밀번호 입니다.", null);

            callback(null, rows[0].user_no);
        })
    },

    register : (registerJSON, callback)=>{
        findOne(registerJSON.userId, (err, rows)=>{
            if(err || rows.length != 0) {return callback(err || "이미 가입된 유저입니다.");}

            registerJSON.password = bcrypt.hashSync(registerJSON.password, saltRounds);
            userDao.save(registerJSON, callback);
        })
    } 
}

function findOne(userId, callback){
    userDao.findOneById(userId, (err, rows, fields)=>{
        
        if(err) return callback(err, null);
        return callback(null, rows);
    })
}

function isSamePassword(plainPw, dbPw){
    return bcrypt.compareSync(plainPw, dbPw);
}
module.exports = e