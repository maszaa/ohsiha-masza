var passport = require('passport');

module.exports = function(app, models) {
  app.get('/logout/', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};
