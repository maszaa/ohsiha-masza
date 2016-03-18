module.exports = function(app, models) {
  app.get('/new/', function(req, res, next) {
    res.render('new', {title: "Lisää uusi"});
  });

  app.post('/new/', function(req, res, next) {
    var text = new models.Test( {title: req.body.title,
                                text: req.body.text} );

    text.save(function(err, text) {
      if (err) {
        console.log(err);
        res.render('new', {title: err});
      }
      else {
        res.render('new', {title: "Teksti " + text.title + " lisätty, lisää seuraava"});
      }
    });
  });
};
