module.exports = function(app, models, checkLogin) {
  app.get('/document/:id', function(req, res, next) {
    if (req.query.format === 'json') {
      models.Document.findOne({_id: req.params.id}).lean().exec(function(err, document) {
        if (err) {
          console.log(err);
          res.status(404).json(err);
        }
        else if (document === null) {
          res.status(404).json({error: 'Artikkelia ei löytynyt'});
        }
        else {
          if (req.isAuthenticated()) {
            if (document.user === req.user.username) {
              res.json(document);
            }
            else if (document.private === false) {
              res.json(document);
            }
            else {
              res.status(403).json({error: 'Artikkeli ei sallittu'});
            }
          }
          else if (document.private === false) {
            res.json(document);
          }
          else {
            res.status(403).json({error: 'Artikkeli ei sallittu'});
          }
        }
      });
    }
    else {
      models.Document.findOne({_id: req.params.id}, function(err, document) {
        if (err) {
          console.log(err);
          res.render('document', {title: err});
        }
        else if (document === null) {
          res.render('document', {title: 'Artikkelia ei löytynyt'})
        }
        else {
          if (req.isAuthenticated()) {
            if (document.user === req.user.username) {
              res.render('document', {title: document.title, document: document});
            }
            else if (document.private === false) {
              res.render('document', {title: document.title, document: document});
            }
            else {
              res.render('document', {title: 'Artikkeli ei sallittu'});
            }
          }
          else if (document.private === false) {
            res.render('document', {title: document.title, document: document});
          }
          else {
            res.render('document', {title: 'Artikkeli ei sallittu'});
          }
        }
      });
    }
  });
};
