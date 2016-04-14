module.exports = function(app, models, checkLogin) {
  app.get('/category/:name', function(req, res, next) {
    models.Document.find({category: req.params.name, private: false}).sort({modifiedDate: 'desc'}).lean().exec(function(err, documents) {
      if (req.query.format === 'json') {
        if (err) {
          console.log(err);
          res.status(404).json(err);
        }
        else {
          res.json({category: req.params.name, documents: documents});
        }
      }
      else {
        if (err) {
          console.log(err);
          res.render('category', {title: err, documents: {}});
        }
        else {
          res.render('category', {title: "Kirjoitukset, kategoria: " + req.params.name, documents: documents, categories: models.Document.schema.path('category').enumValues});
        }
      }
    });
  });
  app.get('/category/', function(req, res, next) {
    res.redirect('/documents/');
  });
};
