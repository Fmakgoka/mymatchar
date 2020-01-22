var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: " localhost",
    user: "root",
    password: "000000",
    database: "mynodedb"
});
/*GET profile page*/ 
router.get('/', function(req, res, next){
    res.render('profile');
});

router.profile = function(req, res){
    if(req.method == "POST"){
        var gender = req.body.gender;
        var preference = req.body.preference;
        var city = req.body.city;
        var province = req.body.province;
        var zip = req.body.zip;
        var check = "INSERT INTO profile (gender, preference, city, province, zip)\
                   VALUES('"+gender+"','"+preference+"', '"+city+"', '"+province+"', '"+zip+"')";
        con.query(check, (err, result) =>{
            if (err) throw err;
            res.redirect('/profile');
        })
    }else{
        console.log("not post");
    }
}

module.exports = router;

