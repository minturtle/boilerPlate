const dev = require('./dev.js');

if(process.env.NODE_ENV == 'production'){
	var app = {
	DATABASE_USERNAME : process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD : process.env.DATABASE_PASSWORD,
    DATABASE_NAME : process.env.DATABASE_NAME,
    DATABASE_HOST : process.env.DATABASE_HOST,
	}
}

else{
	var app = {
	DATABASE_USERNAME : dev.username,
    DATABASE_PASSWORD : dev.password,
    DATABASE_NAME : dev.dbname,
    DATABASE_HOST : dev.host
	}
}


module.exports = app;