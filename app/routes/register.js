var passport = require('passport');

module.exports = function(app, models) {
  app.get('/register/', function(req, res, next) {
    res.render('register', { title: 'Rekisteröidy' });
  });

  app.post('/register/', function(req, res, next) {
    models.User.register(new models.User({username : req.body.username}), req.body.password, function(err, account) {
      if (err) {
        res.render('register', { tittle: "Rekisteröityminen epäonnistui!" });
      }
      else {
        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
      }
    });
  });
};
