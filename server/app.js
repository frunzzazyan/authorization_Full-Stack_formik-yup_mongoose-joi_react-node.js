var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require("./auth")
const passport = require("passport")
const session = require("express-session")

const mongoose = require("mongoose")
const cors = require("cors")

const model = require("./models/index.js")

var indexRouter = require('./routes/index');
var passportRouter = require('./routes/passportReg.js');

const AuthorizationServices = require("./services/AuthorizationServices.js")

var app = express();

mongoose.connect("mongodb://localhost:27017/myDB")
.then(()=>console.log("db ok"))
.catch(()=>console.log("db err"))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.models = {
  users : model.users
}

app.locals.services = {
  authorization : new AuthorizationServices(app.locals.models)
}

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(passport.session())
app.use(passport.initialize())


app.use('/', passportRouter);
app.use('/auth', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
