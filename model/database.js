//node.js use this module to manipulate the mySQL database 
var mysql = require('mysql');

//connect to the database
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "000000"

});

con.connect(function(err){
	if(err) throw err;
	console.log("connect!");
	//create a database named "mynodedb"
	con.query("CREATE DATABASE mynodedb", function(err,
		result){
			if (err) throw err;
			console.log("Database created");
		});
}); 
module.exports = con;