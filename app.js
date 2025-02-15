var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require("http");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bibliothequesRouter = require('./routes/bibliotheque');
var livreRouter = require('./routes/livre');
var app = express();

// To connect to DB
var mongo = require("mongoose");
var mongoConn = require("./config/database.json");

console.log("avant la demande de connection dans le code");

mongo.connect(mongoConn.url)
  .then(() => {
    console.log("connected to db");

    // Only create server and start listening after DB connection is successful
    const server = http.createServer(app);

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'twig');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/bibliotheque', bibliothequesRouter);
    app.use('/livre', livreRouter);

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

    // Start the server now that MongoDB is connected
    server.listen(3000, () => {
      console.log('Server is running on port 3000');
    });

  })
  .catch((err) => {
    console.log("error connecting to db", err);
  });

console.log("apres la demande de connection dans le code ");
module.exports = app;
