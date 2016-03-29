var passport = require('passport');

module.exports = function(app, models, checkLogin) {
  app.get('/logout/', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};
