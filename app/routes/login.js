var passport = require('passport');

module.exports = function(app, models) {
  app.get('/login/', function(req, res) {
      res.render('login', { title: "Kirjaudu sisään" });
  });

  app.post('/login/',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login/'
    })
  );
};
