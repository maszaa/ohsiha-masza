module.exports = function(app, models, checkLogin) {
  app.get('/documents/', function(req, res, next) {
    if (req.query.format === 'json') {
      models.Document.find({private: false}).sort({modifiedDate: 'desc'}).lean().exec(function(err, documents) {
        if (err) {
          console.log(err);
          res.status(404).json(err);
        }
        else {
          res.json(documents);
        }
      });
    }
    else {
      models.Document.find({private: false}).sort({modifiedDate: 'desc'}).exec(function(err, documents) {
        if (err) {
          console.log(err);
          res.render('documents', {title: err, documents: {}});
        }
        else {
          res.render('documents', {title: "Artikkelit", documents: documents, categories: models.Document.schema.path('category').enumValues});
        }
      });
    }
  });
};
