var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');
const passwordHash = require('password-hash');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "000000",
	database: "mynodedb"
});

/* GET login page. */
router.get('/', function(req, res, next) {
	res.render('update');
  });

console.log("update");
router.post('/', function(req, res){
	console.log("inside update");
	if (req.body.changeFirstName){
		var name = req.body.changeFirstName;

		var email = req.session.email;
		if (!name){
			res.status("400");
		}else{
			var sql = `UPDATE users SET name="${name}" WHERE email="${email}"`;
			con.query(sql, function(err, results){
				if (err) throw err;
				console.log("name changed");
				res.status(200);
				res.redirect('profile');
				res.end();
			});
		}
	}
	if (req.body.changeLastName){
		var lastName = req.body.changeLastName;
		var email = req.session.email;
		console.log(email);
		if (!lastName){
			res.status("400");
		}else{
			var check = `SELECT * FROM users WHERE name="${lastName}"`;
			con.query(check, function(err, results){
				if (err) throw err;
				var sql = `UPDATE users SET lastname="${lastName}" WHERE email="${email}"`;
				con.query(sql, function(err, results){
					if (err) throw err;
					console.log("updated lastname");
					res.redirect('profile');
					res.end();
				});
			});
		}
	}
	if (req.body.password){
		var password = req.body.password;
		var email = req.session.email;
		if (!password){
			res.status("400");
		}else{
			var check = `SELECT password FROM users WHERE email="${email}"`;
			con.query(check, function(err, results){
				results.ForEach(element =>{
					var passworddb = element.password;
					if (passwordHash.verify(password,passworddb)){
						res.redirect('passwordchane');
					}else{
						console.log("password don't match");
					}

				})
			})
		}
	}
});
module.exports = router;
