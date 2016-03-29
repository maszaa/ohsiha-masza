module.exports = function(app, models, checkLogin) {
  app.get('/ownDocuments/', checkLogin, function(req, res, next) {
    models.Document.find({user: req.user.username}, function(err, documents) {
      if (err) {
        console.log(error);
        res.render('ownDocuments', {title: error, documents: {}});
      }
      else {
        res.render('ownDocuments', {title: "Artikkelit", documents: documents, addMessage: req.flash('add'), modifyMessage: req.flash('modify'), deleteMessage: req.flash('delete')});
      }
    });
  });
};
