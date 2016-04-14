module.exports = function(app, models, checkLogin) {
  app.get('/ownDocuments/', checkLogin, function(req, res, next) {
    models.Document.find({user: req.user.username}).sort({modifiedDate: 'desc'}).lean().exec(function(err, documents) {
      if (req.query.format === 'json') {
        if (err) {
          console.log(err);
          res.status(404).json(err);
        }
        else {
          res.json({user: 'me', documents: documents});
        }
      }
      else {
        if (err) {
          console.log(err);
          res.render('ownDocuments', {title: err, documents: {}});
        }
        else {
          res.render('ownDocuments', {title: "Omat artikkelit", documents: documents, messages: req.flash()});
        }
      }
    });
  });
};
