var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var forgotpsswrdRouter = require('./routes/forgotpsswrd');
var registerRouter = require('./routes/register');
var homeRouter = require('./routes/home');
var profileRouter = require('./routes/profile');
var verifyRouter = require('./routes/verify');
var updateRouter = require('./routes/update');
var passwordchaneRouter = require('./routes/passwordchane');
let port = 3000;
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/forgotpsswrd', forgotpsswrdRouter);
app.use('/home',homeRouter);
app.use('/profile',profileRouter);
app.use('/verify', verifyRouter);
app.use('/update', updateRouter);
app.use('/passwordchane', passwordchaneRouter);
//app.post('/register', registerRouter.register);
//app.post('/login', loginRouter.login);
app.post('/forgotpsswrd', forgotpsswrdRouter.forgotpsswrd);
// app.post('/profile', profileRouter.profile);
//app.post('/update', updateRouter.update)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log("listening on port: " + port);
});

module.exports = app;
