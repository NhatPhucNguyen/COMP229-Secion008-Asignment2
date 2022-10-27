// import third party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

/* app.js - Nhat Phuc Nguyen - 301157980 - September/28/2022 */
// import modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let passportStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

//database setup
let mongoose = require('mongoose');
let db = require('./db');

// point mongoose to the DB URI
mongoose.connect(db.URI);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, "Connection Error !"));
mongoDB.once('open', () => {
  console.log("Connected to MongoDb ...");
});

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let businessContactRouter = require('../routes/business_contacts');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// express session setup
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

//initialize flash
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// create User Model Instance
let User = require('../models/user');

//implement a User Authentication Strategy
passport.use(User.createStrategy());

//serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//router setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/business-contacts', businessContactRouter);

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
  res.render('error', { title: "Not Found" });  
});

module.exports = app;
