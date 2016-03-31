module.exports = function(app, models, checkLogin) {
  app.get('/user/:name', function(req, res, next) {
    if(req.isAuthenticated() && req.params.name === req.user.username) {
      res.redirect('/ownDocuments/');
    }
    else {
      models.Document.find({user: req.params.name, private: false}).sort({modifiedDate: 'desc'}).exec(function(err, documents) {
        if (err) {
          console.log(error);
          res.render('userDocuments', {title: error, documents: {}});
        }
        else {
          res.render('userDocuments', {title: "Kirjoitukset, kirjoittaja: " + req.params.name, documents: documents});
        }
      });
    }
  });
  app.get('/user/', function(req, res, next) {
    res.redirect('/documents/');
  });
};
