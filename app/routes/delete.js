module.exports = function(app, models, checkLogin) {
  app.get('/delete/:id', checkLogin, function(req, res, next) {
    models.Document.findOne({_id: req.params.id, user: req.user.username}, function(err, document) {
      if(err) {
        console.log(err);
        req.flash('delete', 'Artikkelin haku epäonnistui');
        res.redirect('/ownDocuments/');
      }
      else {
        if(document === null) {
          req.flash('delete', 'Artikkelin haku epäonnistui');
          res.redirect('/ownDocuments/');
        }
        else {
          res.render('delete', {title: "Haluatko varmasti poistaa artikkelin ", document: document});
        }
      }
    });
  });

  app.post('/delete/', checkLogin, function(req, res, next) {
    models.Document
          .findOne({_id: req.body.id, user: req.user.username})
          .remove()
          .exec(function(err, data) {
      if(err) {
        console.log(err);
        req.flash('delete', 'Artikkelin poisto epäonnistui');
        res.redirect('/ownDocuments/');
      }
      else {
        if(data.result.ok !== 1) {
          req.flash('delete', 'Artikkelin poisto epäonnistui');
          res.redirect('/ownDocuments/');
        }
        else {
          req.flash('delete', 'Artikkelin poisto onnistui');
          res.redirect('/ownDocuments/');
        }
      }
    });
  });
};
