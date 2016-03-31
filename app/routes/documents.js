module.exports = function(app, models, checkLogin) {
  app.get('/documents/', function(req, res, next) {
    models.Document.find({private: false}).sort({modifiedDate: 'desc'}).exec(function(err, documents) {
      if (err) {
        console.log(error);
        res.render('documents', {title: error, documents: {}});
      }
      else {
        res.render('documents', {title: "Artikkelit", documents: documents});
      }
    });
  });
};
