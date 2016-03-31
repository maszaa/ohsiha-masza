module.exports = function(app, models, checkLogin) {
  app.get('/new/', checkLogin, function(req, res, next) {
    res.render('new', {title: "Lisää uusi", categories: models.Document.schema.path('category').enumValues});
  });

  app.post('/new/', checkLogin, function(req, res, next) {
    var isPrivate = req.body.private;
    if (isPrivate === undefined) {
      isPrivate = false;
    }
    else {
      isPrivate = true;
    }

    var document = new models.Document( { title: req.body.title,
                                      text: req.body.text,
                                      user: req.user.username,
                                      category: req.body.category,
                                      private: isPrivate} );

    document.save(function(err, text) {
      if (err) {
        console.log(err);
        res.render('new', {title: "Artikkelin lisäys epäonnistui, yritä uudestaan", categories: models.Document.schema.path('category').enumValues,
                            textTitle: req.body.title, textText: req.body.text, textCategory: req.body.category, textPrivate: isPrivate});
      }
      else {
        req.flash('add', 'Lisättiin artikkeli ' + document.title);
        res.redirect('/ownDocuments/');
      }
    });
  });
};
