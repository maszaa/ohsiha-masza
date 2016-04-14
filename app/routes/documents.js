module.exports = function(app, models, checkLogin) {
  app.get('/documents/', function(req, res, next) {
    models.Document.find({private: false}).sort({modifiedDate: 'desc'}).lean().exec(function(err, documents) {
      if (req.query.format === 'json') {
        if (err) {
          console.log(err);
          res.status(404).json(err);
        }
        else {
          res.json({documents: documents});
        }
      }
      else {
        if (err) {
          console.log(err);
          res.render('documents', {title: err, documents: {}});
        }
        else {
          res.render('documents', {title: "Artikkelit", documents: documents, categories: models.Document.schema.path('category').enumValues});
        }
      }
    });
  });
};
