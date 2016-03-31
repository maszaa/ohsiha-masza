module.exports = function(app, models, checkLogin) {
  app.get('/modify/', checkLogin, function(req, res, next) {
    models.Document.findOne({_id: req.query.id, user: req.user.username}, function(err, document) {
      if(err) {
        console.log(err);
        req.flash('modify', 'Artikkelin haku epäonnistui');
        res.redirect('/ownDocuments/');
      }
      else {
        if(document === null) {
          req.flash('modify', 'Artikkelin haku epäonnistui');
          res.redirect('/ownDocuments/');
        }
        else {
          res.render('modify', {title: "Muokkaa artikkelia ", document: document, categories: models.Document.schema.path('category').enumValues});
        }
      }
    });
  });

  app.post('/modify/', checkLogin, function(req, res, next) {
    models.Document.findOne({_id: req.body.id, user: req.user.username}, function(err, document) {
      if(err) {
        console.log(err);
        req.flash('modify', 'Artikkelin haku epäonnistui');
        res.redirect('/ownDocuments/');
      }
      else {
        if(document === null) {
          req.flash('modify', 'Artikkelin haku epäonnistui');
          res.redirect('/ownDocuments/');
        }
        else {
          var isPrivate = req.body.private;
          if (isPrivate === undefined) {
            isPrivate = false;
          }
          else {
            isPrivate = true;
          }

          document.title = req.body.title;
          document.text = req.body.text;
          document.category = req.body.category;
          document.private = isPrivate;
          document.modifiedDate = new Date().toJSON();
          document.save(function(err) {
            if(err) {
              console.log(err);
              req.flash('modify', 'Artikkelin muokkaus epäonnistui');
              res.redirect('/ownDocuments/');
            }
            else {
              req.flash('modify', 'Muokattiin artikkelia ' + document.title);
              res.redirect('/ownDocuments/');
            }
          });
        }
      }
    });
  });
};
