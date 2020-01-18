var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const passwordHash  = require('password-hash');
var nodemailer = require('nodemailer');
const saltRound = 10;

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "000000",
	database: "mynodedb"
});

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('register');
});

// con.connect()
var Users = [];
router.register = function (req, res) {

	if (req.method == "POST") {
		// console.log(req.body);
		var name = req.body.userName;
		var lastname = req.body.lastName;
		var Uemail = req.body.userEmail;
		var password = req.body.userPassword;
		var confirm = req.body.cuserPassword;
		var gender = req.body.Gender;
		if (!name || !lastname || !Uemail || !password || !confirm || !gender) {
			res.status("400");
			// res.send("Invalid details!");
		}
		else {
			emailExists = false;
			nameExists = false;
			var check = "SELECT * FROM users where name ='" + name + "' or email ='" + Uemail + "'";
			con.query(check, function (err, results) {
				console.log(results); 
				results.forEach(element => {
					if (Uemail == element.email) {
						emailExists = true;
					}
					if (name == element.name) {
						nameExists = true;

					}
				});
				if (nameExists == false && emailExists == false) {
					if (password == confirm) {
							password = passwordHash.generate(req.body.userPassword);
							var sql = "INSERT INTO users (name, lastname, email, password,confirm, gender) VALUES ('" + name + "', '" + lastname + "', '" + Uemail + "', '" +password+ "', '" + confirm + "', '" + gender + "')";
							con.query(sql, (err, result) => {
								if (err) throw err;
								var transporter = nodemailer.createTransport({
									service: 'gmail',
									auth: {
										user: 'phyliciadancer@gmail.com',
										pass: 'Abcd@1234'
									}
								});
			
								var mailOptions = {
									from: 'phyliciadancer@gmail.com',
									to: Uemail,
									subject: 'Sending Email using Node.js',
									text: 'That was not that easy!'
								};
			
								transporter.sendMail(mailOptions, function (error, info) {
									if (error) {
										console.log("email doesn't exists");
										console.log(error);
										res.redirect('/forgotpsswrd');
									} else {
										console.log('Email sent: ' + info.response);
									}
								})
								res.end();
							});
					
					} else {
						console.log("password don't match");
					}

				}
				if (nameExists == true) {
					console.log("name already exists");
				}
				if (emailExists == true) {
					console.log("email exists");
				}
				res.render('register');

				console.log(nameExists);
			})
		}
	} else {
		console.log("not post");
	}
};
module.exports = router
