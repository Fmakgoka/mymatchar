const express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "000000",
  database:"mynodedb"
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

// con.connect()
router.register = function(req, res) {

  if (req.method == "POST"){
  console.log(req.body);
  var name = req.body.userName;
  var lastname = req.body.lastName;
  var email = req.body.userEmail;
  var password = req.body.userPassword;
  var confirm = req.body.cuserPassword;
  var gender = req.body.Gender;

  res.write('You sent the name "'+name+'".\n');
  res.write('You sent the lastname "'+lastname+'".\n');
  res.write('You sent the email "'+email+'".\n');
  res.write('You sent the password "'+password+'".\n');
  res.write('You sent the confirm "'+confirm+'".\n');
  res.write('You sent the gender "'+gender+'".\n');

  con.connect(function(err,){
    if (err) throw err;
    var sql = "INSERT INTO users (name, lastname, email, password,confirm, gender) VALUES ('"+name+"', '"+lastname+"', '"+email+"', '"+password+"', '"+confirm+"', '"+gender+"')";
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Inserted");
      console.log(result);
      res.end();
    });
    // con.query(sql, funtion(err, result) {
    //   if (err) throw err;
    //   console.log("inserted");
    //   res.end();
    // });
  })
} else{
  console.log("not post");
}
};
module.exports = router
