module.exports = function(app, models) {
  app.get('/documents/', function(req, res, next) {
    models.Test.find(function(err, test) {
      res.render('documents', {title: "Tekstit", documents: test});
    });
  });
};
