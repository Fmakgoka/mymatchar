var express = require('express')
var router = express.Router();
var mysql = require('mysql');
const passwordHash = require('password-hash');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "000000",
  database: "mynodedb"
});
//con.connect();

// /* GET home page. */
// router.get('/login', function(req, res, next) {
//   res.render('login');
// });

router.post ('/', function (req, res) {
  console.log("POST TO THE LOGIN PAGE");
  if (req.method == "POST") {
    var email = req.body.user_email;
    var password = req.body.user_password;
    if (!email || !password) {
      res.sendStatus("400");
      res.end();
    } else {
      emailExists = false;
      passwordExists = false;
      var passwordMatch = false;
      var check = `SELECT * FROM users WHERE email="${email}" AND verified ="${1}"`;
      con.query(check, function (err, results) {
        // console.log(req.session);
        results.forEach(element => {
          passwordMatch = passwordHash.verify(password, element.password);

          if (email == element.email) {
            emailExists = true;
          }
          if (emailExists == true && passwordMatch == true) {
            req.session.login = true;
            req.session.email = email;
            req.session.username = element.name;
            //console.log(req.session);
            res.redirect('profile');
          } else if (emailExists == false) {
            res.sendStatus(500);
            console.log("email doesn't exists");
          } else if (passwordMatch == false) {
            res.sendStatus(404);
          }
        });
      })
      //console.log("verify user");
      //res.redirect('login');
    }
  }
});

router.get('/', function (req, res) {
  console.log(req.session);
  if (req.session.login) {
    //res.redirect('');
    res.render('profile');
    res.end();
  } else {
    res.render('login');
  }
  res.end();
});

module.exports = router;