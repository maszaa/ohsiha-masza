module.exports = function(app, models, checkLogin) {
  app.get('/category/:name', function(req, res, next) {
    models.Document.find({category: req.params.name, private: false}).sort({modifiedDate: 'desc'}).exec(function(err, documents) {
      if (err) {
        console.log(error);
        res.render('category', {title: error, documents: {}});
      }
      else {
        res.render('category', {title: "Kirjoitukset, kategoria: " + req.params.name, documents: documents});
      }
    });
  });
};
