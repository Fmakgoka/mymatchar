var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var nodemailer = require('nodemailer');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "000000",
    database: "mynodedb"
});

/* GET home page. */
router.get('/forgotpsswrd', function (req, res, next) {
    res.render('forgotpsswrd');
});

router.forgotpsswrd = function (req, res) {
    var email = req.body.email;
    if (!email) {
        res.status("400");
    }
    else {
        var check = "SELECT * FROM users WHERE email = '" + email + "'";
        con.query(check, function (err, results) {
            results.forEach(element => {
                if (email == element.email) {
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'phyliciadancer@gmail.com',
                            pass: 'Abcd@1234'
                        }
                    });

                    var mailOptions = {
                        from: 'phyliciadancer@gmail.com',
                        to: email,
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
                }
                });
        })
}
}
module.exports = router;