var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');

// Initialize database connection
var dbConfig = require('./config/database.js');
mongoose.connect(dbConfig.uri, dbConfig.options);
var database = mongoose.connection;

var app = express();
// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.pretty = true;

// some parser initializing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var models = {};

// db connection succesful
database.on('open', function (ref) {
  console.log('Connected to mongo server.');

  // read folder 'models' and require all model files
  fs.readdirSync(path.join(__dirname, 'models')).forEach(function(file) {
      var model = require('./models/' + file);
      for (var key in model) {
        models[key] = model[key];
      }
  });

  // read folder 'routes' and require all routes files
  fs.readdirSync(path.join(__dirname, 'routes')).forEach(function(file) {
      require('./routes/' + file)(app, models);
  });
});

// db connection unsuccesful
database.on('error', function (err) {
  console.log('Could not connect to mongo server!');
  console.log(err);
  app.get('/', function(req, res, next) {
    res.render('error', { message: "Tietokantaan ei saada yhteyttä!", error: err });
  });
});

/* not working
// db connection closed
database.on('close', function () {
  console.log('Connection to mongo server closed!');
  app.get('/error/', function(req, res, next) {
    res.render('error', { message: "Yhteys tietokantaan suljettiin!", error: {} });
  });
});

// close db connection when app is terminated
process.on('SIGINT', function() {
  database.close(function () {
    console.log('Connection to database disconnected through app termination');
    process.exit(0);
  });
});*/

app.listen(3000);
