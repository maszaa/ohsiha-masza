module.exports = function(app, models, checkLogin) {
  app.get('/user/:name', function(req, res, next) {
    models.Document.find({user: req.params.name, private: false}).sort({modifiedDate: 'desc'}).exec(function(err, documents) {
      if (err) {
        console.log(error);
        res.render('userDocuments', {title: error, documents: {}});
      }
      else {
        res.render('userDocuments', {title: "Kirjoitukset, kirjoittaja: " + req.params.name, documents: documents});
      }
    });
  });
};
