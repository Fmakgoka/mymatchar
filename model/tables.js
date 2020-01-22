var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "000000",
	database: "mynodedb"
});

con.connect(function (err) {
	if (err) throw err;
	console.log("connected!");
	var sql1 = "CREATE TABLE IF NOT EXISTS users ( \
				id INT AUTO_INCREMENT PRIMARY KEY, \
				name VARCHAR(255),\
				lastname VARCHAR(255),\
				email VARCHAR(255),\
				password VARCHAR(255), \
				gender VARCHAR(20),\
				verified tinyint(1) NOT NULL DEFAULT '0',\
				token VARCHAR(255) DEFAULT NULL)";
	con.query(sql1, function (err, result) {
		if (err) throw err;
		console.log("Table1 created");
	});
	var sql = 'CREATE TABLE IF NOT EXISTS profile ( \
			   id INT AUTO_INCREMENT PRIMARY KEY, \
			   gender VARCHAR(255),\
			   Preference VARCHAR(255),\
			   City VARCHAR(255),\
			   province VARCHAR(255), \
			   zip VARCHAR(255),\
			   biography VARCHAR(255))';
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Table created");
	});
});