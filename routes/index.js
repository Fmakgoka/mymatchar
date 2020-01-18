var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

// /* GET home page. */
router.get('/forgotpsswrd', function(req, res, next){
  res.render('forgotpsswrd');
});

// /* GET register page. */
// router.get('/register', function(req, res, next) {
//   res.render('/register', { title: 'Express' });
// });

module.exports = router;
