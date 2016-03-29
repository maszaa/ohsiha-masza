module.exports = function(app, models, checkLogin) {
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Tervetuloa' });
  });
};
