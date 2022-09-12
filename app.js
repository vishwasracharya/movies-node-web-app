/* Modules */
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const { flash } = require('express-flash-message');
const compression = require('compression');
require('dotenv').config();

/* Route Handler Constants */
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var moviesRouter = require('./routes/movies');
var authRouter = require('./routes/auth');
var accountRouter = require('./routes/account');

var app = express();

/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Middleware */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
app.use(
  session({
    secret: process.env.FLASH_MESSAGE_SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);
app.use(flash({ sessionKeyName: process.env.FLASH_MESSAGE_SESSION_KEY }));

/* Routes Middleware */
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/movies', moviesRouter);
app.use('/auth', authRouter);
app.use('/account', accountRouter);

/* catch 404 and forward to error handler */
app.use(function(req, res, next) {
  next(createError(404));
});

/* error handler */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
