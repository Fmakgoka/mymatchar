var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "000000",
	database:"mynodedb"
});

con.connect(function(err){
	if (err) throw err;
	console.log("connected!");
	var sql = 'CREATE TABLE users ( \
				id INT AUTO_INCREMENT PRIMARY KEY, \
				name VARCHAR(255),\
				lastname VARCHAR(255),\
				email VARCHAR(255),\
				password VARCHAR(255), \
				confirm VARCHAR(255), \
				gender VARCHAR(20))';
	con.query(sql, function(err, result){
		if (err) throw err;
		console.log("Table created");
	});
});