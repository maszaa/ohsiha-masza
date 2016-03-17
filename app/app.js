var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');

var app = express();

mongoose.connect('mongodb://localhost/ohsiha');
app.database = mongoose.connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.pretty = true;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var models = {};
fs.readdirSync(path.join(__dirname, 'models')).forEach(function(file) {
    var model = require('./models/' + file);
    for (var key in model) {
      models[key] = model[key];
    }
});

fs.readdirSync(path.join(__dirname, 'routes')).forEach(function(file) {
    require('./routes/' + file)(app, models);
});

app.listen(3000);
