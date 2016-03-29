var passport = require('passport');

module.exports = function(app, models, checkLogin) {
  app.get('/login/', function(req, res) {
    res.render('login', { title: "Kirjaudu sisään", messages: req.flash() });
  });

  app.post('/login/',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login/',
      failureFlash: 'Virheellinen käyttäjätunnus tai salasana!'
    })
  );
};
