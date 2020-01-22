var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "000000",
	database: "mynodedb"
});

router.get('/',(req, res) => {
    var username = req.query.name;
    var token = req.query.token;
    var check = `SELECT * FROM users WHERE name ="${username}" AND token ="${token}"`;
    con.query(check, function(err, results){
        if (err) throw err;
        results.forEach(element =>{
            var sql = `UPDATE users SET verified = 1  WHERE name = "${username}" AND token="${token}"`;
            con.query(sql, function(err, results){
                if (err) throw err;
                console.log('email verified');
                res.redirect('login');
            });
        });    
    });

});
module.exports = router;

