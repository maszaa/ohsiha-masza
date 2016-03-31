module.exports = function(app, models, checkLogin) {
  app.get('/ownDocuments/', checkLogin, function(req, res, next) {
    models.Document.find({user: req.user.username}).sort({modifiedDate: 'desc'}).exec(function(err, documents) {
      if (err) {
        console.log(error);
        res.render('ownDocuments', {title: error, documents: {}});
      }
      else {
        res.render('ownDocuments', {title: "Omat artikkelit", documents: documents, messages: req.flash()});
      }
    });
  });
};
