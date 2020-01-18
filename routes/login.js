var express = require('express')
var router = express.Router();
var mysql = require('mysql');
const passwordHash  = require('password-hash');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "000000",
  database: "mynodedb"
});
con.connect();

// /* GET home page. */
// router.get('/login', function(req, res, next) {
//   res.render('login');
// });

router.login = function (req, res) {
  if (req.method == "POST") {
    var email = req.body.user_email;
    var password = req.body.user_password;
    if (!email || !password) {
      res.status("400");
      res.end();
    } else {
      emailExists = false;
      passwordExists = false;
      var passwordMatch = false;
      var check = "SELECT * FROM users WHERE email='" + email + "'";
      //  AND password='" + password + "'";
      con.query(check, function (err, results) {
        results.forEach(element => {
          passwordMatch = passwordHash.verify(password,element.password);
      
          if (email == element.email) {
            emailExists = true;
          }
        });
        if (emailExists == true && passwordMatch == true) {
          req.session.login = true;
          req.session.email = email;
          res.redirect('home');
        } else if (emailExists == false) {
          res.send(500);
          console.log("email doesn't exists");
        } else if (passwordMatch == false) {
          res.send(404);
        }
      })

    }
  }
}

router.get('/', function (req, res) {
  if (!req.session.login) {
    res.redirect('home');
  } else {
    res.send('please login to view this page');
  }
  res.end();
});

module.exports = router;
