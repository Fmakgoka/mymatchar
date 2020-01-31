var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// /* GET login page. */
// router.get('/login', function(req, res, next) {
//   res.render('login');
// });

// // /* GET home page. */
// router.get('/forgotpsswrd', function(req, res, next){
//   res.render('forgotpsswrd');
// });

// /* GET login page. */
// router.get('/', function(req, res, next) {
//   res.render('verify');
// });

// /*GET profile page*/ 
// router.get('/profile', function(req, res, next){
//   res.render('profile');
// });

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('update');
});

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('/register');
});

module.exports = router;
