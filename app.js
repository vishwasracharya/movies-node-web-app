/* Modules */
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const { flash } = require('express-flash-message');
const compression = require('compression');
const winston = require('winston');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');
require('dotenv').config();

const options = require('./config/swaggerOptions');

if (process.env.ENVIRONMENT === 'testing') require('./utils/db');

/* Route Handler Constants */
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const moviesRouter = require('./routes/movies');
const authRouter = require('./routes/auth');
const accountRouter = require('./routes/account');

const specs = swaggerJsDoc(options);

const app = express();

/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Middleware */
app.use(cors());
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
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

/* Logging */
const wlogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
wlogger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
);
app.use((err, req, res, next) => {
  wlogger.error(err.message);
  next(err);
});

/* catch 404 and forward to error handler */
app.use((req, res, next) => {
  next(createError(404));
});

/* error handler */
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
