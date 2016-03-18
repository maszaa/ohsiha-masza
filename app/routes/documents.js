module.exports = function(app, models) {
  app.get('/documents/', function(req, res, next) {
    models.Test.find(function(err, test) {
      if (err) {
        console.log(error);
        res.render('documents', {title: error, documents: {}});
      }
      else {
        res.render('documents', {title: "Tekstit", documents: test});
      }
    });
  });
};
