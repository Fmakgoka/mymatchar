var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "000000",
    database: "mynodedb"
});
/*GET profile page*/ 
router.get('/', function(req, res, next){
    res.render('profile');
});

router.post('/', function(req, res){
    if(req.method == "POST"){
        var interets = req.body.interets;
        var preference = req.body.SelectPreference;
        var city = req.body.City;
        var province = req.body.Province;
        var zip = req.body.Zip;
        var biography = req.body.bio;

        var check = `INSERT INTO profile (interets, preference, city, province, zip, biography)\
                   VALUES("${interets}","${preference}","${city}","${province}","${zip}","${biography}")`;
        con.query(check, (err, result) =>{
            if (err) throw err;
            console.log("inserted");
            res.render('profile');
        })
    }else{
        console.log("not post");
    }
});

module.exports = router;

