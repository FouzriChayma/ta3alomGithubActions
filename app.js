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

// Connect to MongoDB
mongo.connect(mongoConn.url, {
  useNewUrlParser: true, // Fix deprecated warning
  useUnifiedTopology: true, // Fix deprecated warning
})
  .then(() => {
    console.log("connected to db");

    // Set up the server only after DB connection is successful
    const server = http.createServer(app);

    // View engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'twig');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    // Define routes
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/bibliotheque', bibliothequesRouter);
    app.use('/livre', livreRouter);

    // Catch 404 errors and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // Error handler
    app.use(function(err, req, res, next) {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      res.status(err.status || 500);
      res.render('error');
    });

    // Start the server after DB connection is established
    server.listen(process.env.PORT || 3000, () => {
      console.log('Server is running on port ' + (process.env.PORT || 3000));
    });

  })
  .catch((err) => {
    console.log("Error connecting to DB: ", err);
    // Consider adding a process exit after a DB failure
    process.exit(1);
  });

console.log("apres la demande de connection dans le code");

module.exports = app;
