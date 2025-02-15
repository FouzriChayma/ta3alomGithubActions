var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bibliothequesRouter = require('./routes/bibliotheque');
var livreRouter = require('./routes/livre');
var mongoConn = require('./config/database.json');

var app = express();

console.log('Avant la demande de connexion à la base de données');

mongoose.connect(mongoConn.url)
  .then(() => {
    console.log('Connecté à la base de données');

    // Configuration d'Express
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

    // Gestion des erreurs 404
    app.use((req, res, next) => {
      next(createError(404));
    });

    // Gestion des erreurs générales
    app.use((err, req, res, next) => {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      res.status(err.status || 500);
      res.render('error');
    });

    // Création du serveur HTTP
    const PORT = process.env.PORT || 3000;
    const server = http.createServer(app);

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
    });

    server.on('listening', () => {
      console.log(`Le serveur écoute bien sur le port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données', err);
    process.exit(1); // Quitter en cas d'échec de connexion
  });

console.log('Après la demande de connexion à la base de données');

module.exports = app;