module.exports = function(app, models, checkLogin) {
  app.get('/new/', checkLogin, function(req, res, next) {
    res.render('new', {title: "Lisää uusi"});
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
                                      private: isPrivate} );

    document.save(function(err, text) {
      if (err) {
        console.log(err);
        res.render('new', {title: err});
      }
      else {
        res.render('new', {title: "Teksti " + document.title + " lisätty, lisää seuraava"});
      }
    });
  });
};
