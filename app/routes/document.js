module.exports = function(app, models, checkLogin) {
  app.get('/document/:id', function(req, res, next) {
    /*if (req.isAuthenticated()) {
      if (req.query.format === 'json') {
        models.Document.findOne({_id: req.params.id, user: req.user.username}).lean().exec(function(err, document) {
          if (err) {
            console.log(err);
            res.status(404).json(err);
          }
          else if (document === null) {
            res.status(404).json({error: 'Artikkelia ei löytynyt'});
          }
          else {
            if(req.isAuthenticated() && document.user === req.user.username) {
              res.json(document);
            }
            else if(req.isAuthenticated() && document.user !== req.user.username && document.private === true) {
              res.status(404).json({error: 'Artikkeli on yksityinen'});
            }
            else if (document.private === false) {
              res.json(document);
            }
          }
          else {
            res.json(document);
          }
        });
      }
      else {
        models.Document.findOne({_id: req.params.id, user: req.user.username}, function(err, document) {
          if (err) {
            console.log(err);
            res.render('document', {title: err, documents: {}});
          }
          else if (document === null) {
            res.render('document', {title: 'Artikkelia ei löytynyt'})
          }
          else {
            res.render('document', {title: document.title, document: document});
          }
        });
      }
    }
    else {*/
      if (req.query.format === 'json') {
        models.Document.findOne({private: false, _id: req.params.id}).lean().exec(function(err, document) {
          if (err) {
            console.log(err);
            res.status(404).json(err);
          }
          else if (document === null) {
            res.status(404).json({error: 'Artikkelia ei löytynyt'});
          }
          else {
            res.json(document);
          }
        });
      }
      else {
        models.Document.findOne({private: false, _id: req.params.id}, function(err, document) {
          if (err) {
            console.log(err);
            res.render('document', {title: err, documents: {}});
          }
          else if (document === null) {
            res.render('document', {title: 'Artikkelia ei löytynyt'})
          }
          else {
            res.render('document', {title: document.title, document: document});
          }
        });
      }
    //}
  });
};
