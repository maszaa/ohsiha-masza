module.exports = function(app, models, checkLogin) {
  app.get('/user/:name/posts', function(req, res, next) {
    if (req.query.format === 'json') {
      models.Document.find({user: req.params.name, private: false}).sort({modifiedDate: 'desc'}).exec(function(err, documents) {
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
      if(req.isAuthenticated() && req.params.name === req.user.username) {
        res.redirect('/ownDocuments/');
      }
      else {
        models.Document.find({user: req.params.name, private: false}).sort({modifiedDate: 'desc'}).exec(function(err, documents) {
          if (err) {
            console.log(err);
            res.render('userDocuments', {title: err, documents: {}});
          }
          else {
            res.render('userDocuments', {title: "Kirjoitukset, kirjoittaja: " + req.params.name, documents: documents});
          }
        });
      }
    }
  });
  app.get('/user/', function(req, res, next) {
    res.redirect('/documents/');
  });
};
